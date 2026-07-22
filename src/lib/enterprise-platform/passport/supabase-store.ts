/**
 * Supabase PassportStore adapter — mirrors Consent durable adapter pattern.
 */

import type { PassportEvidenceRef, PassportHistoryEntry, PassportRecord } from "./types";
import type { PassportStore } from "./store";
import { validatePassportEvidence, validatePassportRecord } from "./validation";
import { PASSPORT_SCHEMA_VERSION } from "./types";

export interface PassportSupabaseClient {
  from: (table: string) => {
    select: (columns?: string) => {
      eq: (
        column: string,
        value: string,
      ) => {
        maybeSingle: () => Promise<{
          data: Record<string, unknown> | null;
          error: { message: string } | null;
        }>;
        then: Promise<{
          data: Record<string, unknown>[] | null;
          error: { message: string } | null;
        }>["then"];
      } & PromiseLike<{
        data: Record<string, unknown>[] | null;
        error: { message: string } | null;
      }>;
    };
    upsert: (
      row: Record<string, unknown>,
      opts?: { onConflict?: string },
    ) => Promise<{ error: { message: string } | null }>;
    insert: (
      row: Record<string, unknown>,
    ) => Promise<{ error: { message: string } | null }>;
  };
}

const TABLE = "shared_passport_records";
const EVIDENCE = "shared_passport_evidence";
const HISTORY = "shared_passport_history";

function rowToRecord(
  row: Record<string, unknown>,
  evidence: PassportEvidenceRef[] = [],
): PassportRecord {
  const issuanceRaw = row.issuance as Record<string, string> | null;
  return {
    passportId: String(row.passport_id),
    subjectId: String(row.subject_id),
    state: row.state as PassportRecord["state"],
    verificationStatus: row.verification_status as PassportRecord["verificationStatus"],
    version: Number(row.version),
    schemaVersion: Number(row.schema_version),
    evidenceRefs: evidence,
    issuance: issuanceRaw
      ? {
          issuedByRuntime: issuanceRaw.issuedByRuntime ?? "enterprise-passport",
          issuedByPlatformId: issuanceRaw.issuedByPlatformId,
          issuanceReason: issuanceRaw.issuanceReason,
          expirationPolicy: issuanceRaw.expirationPolicy,
        }
      : undefined,
    issuedAt: row.issued_at ? String(row.issued_at) : undefined,
    activatedAt: row.activated_at ? String(row.activated_at) : undefined,
    suspendedAt: row.suspended_at ? String(row.suspended_at) : undefined,
    revokedAt: row.revoked_at ? String(row.revoked_at) : undefined,
    expiresAt: row.expires_at ? String(row.expires_at) : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    platformId: row.platform_id ? String(row.platform_id) : undefined,
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
    auditRef: row.audit_ref ? String(row.audit_ref) : undefined,
    renewsPassportId: row.renews_passport_id ? String(row.renews_passport_id) : undefined,
  };
}

function recordToRow(record: PassportRecord): Record<string, unknown> {
  return {
    passport_id: record.passportId,
    subject_id: record.subjectId,
    state: record.state,
    verification_status: record.verificationStatus,
    version: record.version,
    schema_version: record.schemaVersion ?? PASSPORT_SCHEMA_VERSION,
    issuance: record.issuance ?? {},
    issued_at: record.issuedAt ?? null,
    activated_at: record.activatedAt ?? null,
    suspended_at: record.suspendedAt ?? null,
    revoked_at: record.revokedAt ?? null,
    expires_at: record.expiresAt ?? null,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
    platform_id: record.platformId ?? null,
    metadata: record.metadata ?? {},
    audit_ref: record.auditRef ?? null,
    renews_passport_id: record.renewsPassportId ?? null,
  };
}

function evidenceToRow(evidence: PassportEvidenceRef): Record<string, unknown> {
  return {
    evidence_id: evidence.evidenceId,
    passport_id: evidence.passportId,
    provider: evidence.provider,
    assertion_type: evidence.assertionType,
    assertion_ref: evidence.assertionRef,
    status: evidence.status,
    verified_at: evidence.verifiedAt ?? null,
    expires_at: evidence.expiresAt ?? null,
    created_at: evidence.createdAt,
    updated_at: evidence.updatedAt,
    metadata: evidence.metadata ?? {},
    audit_ref: evidence.auditRef ?? null,
  };
}

function rowToEvidence(row: Record<string, unknown>): PassportEvidenceRef {
  return {
    evidenceId: String(row.evidence_id),
    passportId: String(row.passport_id),
    provider: row.provider as PassportEvidenceRef["provider"],
    assertionType: String(row.assertion_type),
    assertionRef: String(row.assertion_ref),
    status: row.status as PassportEvidenceRef["status"],
    verifiedAt: row.verified_at ? String(row.verified_at) : undefined,
    expiresAt: row.expires_at ? String(row.expires_at) : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
    auditRef: row.audit_ref ? String(row.audit_ref) : undefined,
  };
}

export class SupabasePassportStore implements PassportStore {
  readonly providerId = "supabase";

  constructor(private readonly client: PassportSupabaseClient) {}

  private async loadEvidence(passportId: string): Promise<PassportEvidenceRef[]> {
    const { data, error } = await this.client
      .from(EVIDENCE)
      .select("*")
      .eq("passport_id", passportId);
    if (error) throw new Error(`SupabasePassportStore.listEvidence: ${error.message}`);
    return (data ?? []).map(rowToEvidence);
  }

  async get(passportId: string): Promise<PassportRecord | null> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("passport_id", passportId)
      .maybeSingle();
    if (error) throw new Error(`SupabasePassportStore.get: ${error.message}`);
    if (!data) return null;
    const evidence = await this.loadEvidence(passportId);
    return rowToRecord(data, evidence);
  }

  async listBySubject(subjectId: string): Promise<PassportRecord[]> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("subject_id", subjectId);
    if (error) throw new Error(`SupabasePassportStore.listBySubject: ${error.message}`);
    const rows = data ?? [];
    const out: PassportRecord[] = [];
    for (const row of rows) {
      const passportId = String(row.passport_id);
      out.push(rowToRecord(row, await this.loadEvidence(passportId)));
    }
    return out;
  }

  async put(record: PassportRecord) {
    const check = validatePassportRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = await this.get(record.passportId);
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    const { error } = await this.client
      .from(TABLE)
      .upsert(recordToRow(record), { onConflict: "passport_id" });
    if (error) return { ok: false, errors: [`upsert failed: ${error.message}`] };
    for (const ev of record.evidenceRefs) {
      const evWrite = await this.putEvidence(ev);
      if (!evWrite.ok) return { ok: false, errors: evWrite.errors };
    }
    return { ok: true, errors: [], record: { ...record } };
  }

  async putEvidence(evidence: PassportEvidenceRef) {
    const check = validatePassportEvidence(evidence);
    if (!check.valid) return { ok: false, errors: check.errors };
    const { error } = await this.client
      .from(EVIDENCE)
      .upsert(evidenceToRow(evidence), { onConflict: "evidence_id" });
    if (error) return { ok: false, errors: [`evidence upsert failed: ${error.message}`] };
    return { ok: true, errors: [] };
  }

  async listEvidence(passportId: string) {
    return this.loadEvidence(passportId);
  }

  async appendHistory(entry: PassportHistoryEntry): Promise<void> {
    const { error } = await this.client.from(HISTORY).insert({
      passport_id: entry.passportId,
      from_state: entry.fromState,
      to_state: entry.toState,
      at: entry.at,
      reason: entry.reason ?? null,
      actor_system: entry.actorSystem ?? null,
    });
    if (error) throw new Error(`SupabasePassportStore.appendHistory: ${error.message}`);
  }

  async listHistory(passportId: string): Promise<PassportHistoryEntry[]> {
    const { data, error } = await this.client
      .from(HISTORY)
      .select("*")
      .eq("passport_id", passportId);
    if (error) throw new Error(`SupabasePassportStore.listHistory: ${error.message}`);
    return (data ?? []).map((row) => ({
      passportId: String(row.passport_id),
      fromState: row.from_state as PassportHistoryEntry["fromState"],
      toState: row.to_state as PassportHistoryEntry["toState"],
      at: String(row.at),
      reason: row.reason ? String(row.reason) : undefined,
      actorSystem: row.actor_system ? String(row.actor_system) : undefined,
    }));
  }
}

export function createSupabasePassportStore(client: PassportSupabaseClient): PassportStore {
  return new SupabasePassportStore(client);
}
