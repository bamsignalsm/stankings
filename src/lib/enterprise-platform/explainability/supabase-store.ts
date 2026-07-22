/**
 * Supabase ExplainabilityStore adapter.
 */

import type { ExplanationHistoryEntry, ExplanationRecord } from "./types";
import type { ExplainabilityStore } from "./store";
import { validateExplanationRecord } from "./validation";
import { EXPLAINABILITY_SCHEMA_VERSION } from "./types";

export interface ExplainabilitySupabaseClient {
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

const TABLE = "shared_explainability_records";
const HISTORY = "shared_explainability_history";

function rowToRecord(row: Record<string, unknown>): ExplanationRecord {
  return {
    explanationId: String(row.explanation_id),
    subjectId: String(row.subject_id),
    decision: row.decision as ExplanationRecord["decision"],
    assessmentRef: row.assessment_ref ? String(row.assessment_ref) : undefined,
    passportRef: row.passport_ref ? String(row.passport_ref) : undefined,
    consentRef: row.consent_ref ? String(row.consent_ref) : undefined,
    evidenceRefs: (row.evidence_refs as ExplanationRecord["evidenceRefs"]) ?? [],
    policyRefs: (row.policy_refs as ExplanationRecord["policyRefs"]) ?? [],
    humanSummary: String(row.human_summary),
    machineExplanation:
      (row.machine_explanation as ExplanationRecord["machineExplanation"]) ?? {
        factors: [],
        rationaleKeys: [],
      },
    confidence: (row.confidence as ExplanationRecord["confidence"]) ?? undefined,
    version: Number(row.version),
    schemaVersion: Number(row.schema_version),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    platformId: row.platform_id ? String(row.platform_id) : undefined,
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
    auditRef: row.audit_ref ? String(row.audit_ref) : undefined,
  };
}

function recordToRow(record: ExplanationRecord): Record<string, unknown> {
  return {
    explanation_id: record.explanationId,
    subject_id: record.subjectId,
    decision: record.decision,
    decision_ref: record.decision.decisionRef,
    capability_id: record.decision.capabilityId,
    assessment_ref: record.assessmentRef ?? null,
    passport_ref: record.passportRef ?? null,
    consent_ref: record.consentRef ?? null,
    evidence_refs: record.evidenceRefs,
    policy_refs: record.policyRefs,
    human_summary: record.humanSummary,
    machine_explanation: record.machineExplanation,
    confidence: record.confidence ?? {},
    version: record.version,
    schema_version: record.schemaVersion ?? EXPLAINABILITY_SCHEMA_VERSION,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
    platform_id: record.platformId ?? null,
    metadata: record.metadata ?? {},
    audit_ref: record.auditRef ?? null,
  };
}

export class SupabaseExplainabilityStore implements ExplainabilityStore {
  readonly providerId = "supabase";

  constructor(private readonly client: ExplainabilitySupabaseClient) {}

  async get(explanationId: string): Promise<ExplanationRecord | null> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("explanation_id", explanationId)
      .maybeSingle();
    if (error) throw new Error(`SupabaseExplainabilityStore.get: ${error.message}`);
    return data ? rowToRecord(data) : null;
  }

  async listBySubject(subjectId: string): Promise<ExplanationRecord[]> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("subject_id", subjectId);
    if (error) throw new Error(`SupabaseExplainabilityStore.listBySubject: ${error.message}`);
    return (data ?? []).map(rowToRecord);
  }

  async listByDecision(decisionRef: string): Promise<ExplanationRecord[]> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("decision_ref", decisionRef);
    if (error) throw new Error(`SupabaseExplainabilityStore.listByDecision: ${error.message}`);
    return (data ?? []).map(rowToRecord);
  }

  async put(record: ExplanationRecord) {
    const check = validateExplanationRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = await this.get(record.explanationId);
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    const { error } = await this.client
      .from(TABLE)
      .upsert(recordToRow(record), { onConflict: "explanation_id" });
    if (error) return { ok: false, errors: [`upsert failed: ${error.message}`] };
    return { ok: true, errors: [], record: { ...record } };
  }

  async appendHistory(entry: ExplanationHistoryEntry): Promise<void> {
    const { error } = await this.client.from(HISTORY).insert({
      explanation_id: entry.explanationId,
      action: entry.action,
      at: entry.at,
      reason: entry.reason ?? null,
      actor_system: entry.actorSystem ?? null,
    });
    if (error) throw new Error(`SupabaseExplainabilityStore.appendHistory: ${error.message}`);
  }

  async listHistory(explanationId: string): Promise<ExplanationHistoryEntry[]> {
    const { data, error } = await this.client
      .from(HISTORY)
      .select("*")
      .eq("explanation_id", explanationId);
    if (error) throw new Error(`SupabaseExplainabilityStore.listHistory: ${error.message}`);
    return (data ?? []).map((row) => ({
      explanationId: String(row.explanation_id),
      action: row.action as ExplanationHistoryEntry["action"],
      at: String(row.at),
      reason: row.reason ? String(row.reason) : undefined,
      actorSystem: row.actor_system ? String(row.actor_system) : undefined,
    }));
  }
}

export function createSupabaseExplainabilityStore(
  client: ExplainabilitySupabaseClient,
): ExplainabilityStore {
  return new SupabaseExplainabilityStore(client);
}
