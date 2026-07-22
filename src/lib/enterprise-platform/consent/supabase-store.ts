/**
 * Supabase ConsentStore adapter — mirrors Identity durable adapter pattern.
 */

import type { ConsentHistoryEntry, ConsentRecord } from "./types";
import type { ConsentStore } from "./store";
import { validateConsentRecord } from "./validation";
import { CONSENT_SCHEMA_VERSION } from "./types";

/** Minimal client surface for tests and adapters. */
export interface ConsentSupabaseClient {
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

const TABLE = "shared_consent_records";
const HISTORY = "shared_consent_history";

function rowToRecord(row: Record<string, unknown>): ConsentRecord {
  return {
    consentId: String(row.consent_id),
    subjectId: String(row.subject_id),
    definitionId: String(row.definition_id),
    purposeKey: String(row.purpose_key),
    state: row.state as ConsentRecord["state"],
    version: Number(row.version),
    definitionVersion: String(row.definition_version),
    grantedAt: row.granted_at ? String(row.granted_at) : undefined,
    revokedAt: row.revoked_at ? String(row.revoked_at) : undefined,
    expiresAt: row.expires_at ? String(row.expires_at) : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    platformId: row.platform_id ? String(row.platform_id) : undefined,
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
    supersedes: (row.supersedes as string[] | null) ?? undefined,
    auditRef: row.audit_ref ? String(row.audit_ref) : undefined,
  };
}

function recordToRow(record: ConsentRecord): Record<string, unknown> {
  return {
    consent_id: record.consentId,
    subject_id: record.subjectId,
    definition_id: record.definitionId,
    purpose_key: record.purposeKey,
    state: record.state,
    version: record.version,
    definition_version: record.definitionVersion,
    schema_version: CONSENT_SCHEMA_VERSION,
    granted_at: record.grantedAt ?? null,
    revoked_at: record.revokedAt ?? null,
    expires_at: record.expiresAt ?? null,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
    platform_id: record.platformId ?? null,
    metadata: record.metadata ?? {},
    supersedes: record.supersedes ?? [],
    audit_ref: record.auditRef ?? null,
  };
}

export class SupabaseConsentStore implements ConsentStore {
  readonly providerId = "supabase";

  constructor(private readonly client: ConsentSupabaseClient) {}

  async get(consentId: string): Promise<ConsentRecord | null> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("consent_id", consentId)
      .maybeSingle();
    if (error) throw new Error(`SupabaseConsentStore.get: ${error.message}`);
    return data ? rowToRecord(data) : null;
  }

  async listBySubject(subjectId: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("subject_id", subjectId);
    if (error) throw new Error(`SupabaseConsentStore.listBySubject: ${error.message}`);
    return (data ?? []).map(rowToRecord);
  }

  async put(record: ConsentRecord) {
    const check = validateConsentRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = await this.get(record.consentId);
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    const { error } = await this.client
      .from(TABLE)
      .upsert(recordToRow(record), { onConflict: "consent_id" });
    if (error) return { ok: false, errors: [`upsert failed: ${error.message}`] };
    return { ok: true, errors: [], record: { ...record } };
  }

  async appendHistory(entry: ConsentHistoryEntry): Promise<void> {
    const { error } = await this.client.from(HISTORY).insert({
      consent_id: entry.consentId,
      from_state: entry.fromState,
      to_state: entry.toState,
      at: entry.at,
      reason: entry.reason ?? null,
    });
    if (error) throw new Error(`SupabaseConsentStore.appendHistory: ${error.message}`);
  }

  async listHistory(consentId: string): Promise<ConsentHistoryEntry[]> {
    const { data, error } = await this.client
      .from(HISTORY)
      .select("*")
      .eq("consent_id", consentId);
    if (error) throw new Error(`SupabaseConsentStore.listHistory: ${error.message}`);
    return (data ?? []).map((row) => ({
      consentId: String(row.consent_id),
      fromState: row.from_state as ConsentHistoryEntry["fromState"],
      toState: row.to_state as ConsentHistoryEntry["toState"],
      at: String(row.at),
      reason: row.reason ? String(row.reason) : undefined,
    }));
  }
}

export function createSupabaseConsentStore(client: ConsentSupabaseClient): ConsentStore {
  return new SupabaseConsentStore(client);
}
