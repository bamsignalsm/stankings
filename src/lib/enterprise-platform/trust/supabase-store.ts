/**
 * Supabase TrustStore adapter — mirrors Passport durable adapter pattern.
 */

import type {
  TrustAssessment,
  TrustEvidenceRef,
  TrustHistoryEntry,
  TrustPolicyDefinition,
} from "./types";
import type { TrustStore } from "./store";
import { validateTrustAssessment, validateTrustEvidence, validateTrustPolicy } from "./validation";
import { TRUST_SCHEMA_VERSION } from "./types";

export interface TrustSupabaseClient {
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
    } & PromiseLike<{
      data: Record<string, unknown>[] | null;
      error: { message: string } | null;
    }>;
    upsert: (
      row: Record<string, unknown>,
      opts?: { onConflict?: string },
    ) => Promise<{ error: { message: string } | null }>;
    insert: (
      row: Record<string, unknown>,
    ) => Promise<{ error: { message: string } | null }>;
  };
}

const TABLE = "shared_trust_assessments";
const EVIDENCE = "shared_trust_evidence";
const HISTORY = "shared_trust_history";
const POLICIES = "shared_trust_policies";

function rowToAssessment(
  row: Record<string, unknown>,
  evidence: TrustEvidenceRef[] = [],
): TrustAssessment {
  return {
    assessmentId: String(row.assessment_id),
    subjectId: String(row.subject_id),
    passportId: String(row.passport_id),
    state: row.state as TrustAssessment["state"],
    outcome: row.outcome ? (row.outcome as TrustAssessment["outcome"]) : undefined,
    confidence: (row.confidence as TrustAssessment["confidence"]) ?? undefined,
    dimensions: (row.dimensions as TrustAssessment["dimensions"]) ?? [],
    evidenceRefs: evidence,
    riskIndicators: (row.risk_indicators as string[]) ?? [],
    policy: {
      policyId: String(row.policy_id),
      policyVersion: String(row.policy_version),
    },
    version: Number(row.version),
    schemaVersion: Number(row.schema_version),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    assessedAt: row.assessed_at ? String(row.assessed_at) : undefined,
    platformId: row.platform_id ? String(row.platform_id) : undefined,
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
    auditRef: row.audit_ref ? String(row.audit_ref) : undefined,
    supersedesAssessmentId: row.supersedes_assessment_id
      ? String(row.supersedes_assessment_id)
      : undefined,
  };
}

function assessmentToRow(assessment: TrustAssessment): Record<string, unknown> {
  return {
    assessment_id: assessment.assessmentId,
    subject_id: assessment.subjectId,
    passport_id: assessment.passportId,
    state: assessment.state,
    outcome: assessment.outcome ?? null,
    confidence: assessment.confidence ?? {},
    dimensions: assessment.dimensions,
    risk_indicators: assessment.riskIndicators,
    policy_id: assessment.policy.policyId,
    policy_version: assessment.policy.policyVersion,
    version: assessment.version,
    schema_version: assessment.schemaVersion ?? TRUST_SCHEMA_VERSION,
    created_at: assessment.createdAt,
    updated_at: assessment.updatedAt,
    assessed_at: assessment.assessedAt ?? null,
    platform_id: assessment.platformId ?? null,
    metadata: assessment.metadata ?? {},
    audit_ref: assessment.auditRef ?? null,
    supersedes_assessment_id: assessment.supersedesAssessmentId ?? null,
  };
}

function evidenceToRow(evidence: TrustEvidenceRef): Record<string, unknown> {
  return {
    evidence_id: evidence.evidenceId,
    assessment_id: evidence.assessmentId,
    provider: evidence.provider,
    assertion_type: evidence.assertionType,
    assertion_ref: evidence.assertionRef,
    passport_evidence_id: evidence.passportEvidenceId ?? null,
    status: evidence.status,
    dimension: evidence.dimension ?? null,
    verified_at: evidence.verifiedAt ?? null,
    expires_at: evidence.expiresAt ?? null,
    created_at: evidence.createdAt,
    updated_at: evidence.updatedAt,
    metadata: evidence.metadata ?? {},
    audit_ref: evidence.auditRef ?? null,
  };
}

function rowToEvidence(row: Record<string, unknown>): TrustEvidenceRef {
  return {
    evidenceId: String(row.evidence_id),
    assessmentId: String(row.assessment_id),
    provider: row.provider as TrustEvidenceRef["provider"],
    assertionType: String(row.assertion_type),
    assertionRef: String(row.assertion_ref),
    passportEvidenceId: row.passport_evidence_id
      ? String(row.passport_evidence_id)
      : undefined,
    status: row.status as TrustEvidenceRef["status"],
    dimension: row.dimension
      ? (row.dimension as TrustEvidenceRef["dimension"])
      : undefined,
    verifiedAt: row.verified_at ? String(row.verified_at) : undefined,
    expiresAt: row.expires_at ? String(row.expires_at) : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
    auditRef: row.audit_ref ? String(row.audit_ref) : undefined,
  };
}

function policyToRow(policy: TrustPolicyDefinition): Record<string, unknown> {
  return {
    policy_id: policy.policyId,
    policy_version: policy.version,
    name: policy.name,
    description: policy.description,
    eligible_threshold: policy.eligibleThreshold,
    review_threshold: policy.reviewThreshold,
    rules: policy.rules,
    metadata: policy.metadata ?? {},
  };
}

function rowToPolicy(row: Record<string, unknown>): TrustPolicyDefinition {
  return {
    policyId: String(row.policy_id),
    version: String(row.policy_version),
    name: String(row.name),
    description: String(row.description),
    eligibleThreshold: Number(row.eligible_threshold),
    reviewThreshold: Number(row.review_threshold),
    rules: (row.rules as TrustPolicyDefinition["rules"]) ?? [],
    metadata: (row.metadata as Record<string, string> | null) ?? undefined,
  };
}

export class SupabaseTrustStore implements TrustStore {
  readonly providerId = "supabase";

  constructor(private readonly client: TrustSupabaseClient) {}

  private async loadEvidence(assessmentId: string): Promise<TrustEvidenceRef[]> {
    const { data, error } = await this.client
      .from(EVIDENCE)
      .select("*")
      .eq("assessment_id", assessmentId);
    if (error) throw new Error(`SupabaseTrustStore.listEvidence: ${error.message}`);
    return (data ?? []).map(rowToEvidence);
  }

  async get(assessmentId: string): Promise<TrustAssessment | null> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("assessment_id", assessmentId)
      .maybeSingle();
    if (error) throw new Error(`SupabaseTrustStore.get: ${error.message}`);
    if (!data) return null;
    return rowToAssessment(data, await this.loadEvidence(assessmentId));
  }

  async listBySubject(subjectId: string): Promise<TrustAssessment[]> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("subject_id", subjectId);
    if (error) throw new Error(`SupabaseTrustStore.listBySubject: ${error.message}`);
    const out: TrustAssessment[] = [];
    for (const row of data ?? []) {
      const id = String(row.assessment_id);
      out.push(rowToAssessment(row, await this.loadEvidence(id)));
    }
    return out;
  }

  async listByPassport(passportId: string): Promise<TrustAssessment[]> {
    const { data, error } = await this.client
      .from(TABLE)
      .select("*")
      .eq("passport_id", passportId);
    if (error) throw new Error(`SupabaseTrustStore.listByPassport: ${error.message}`);
    const out: TrustAssessment[] = [];
    for (const row of data ?? []) {
      const id = String(row.assessment_id);
      out.push(rowToAssessment(row, await this.loadEvidence(id)));
    }
    return out;
  }

  async put(assessment: TrustAssessment) {
    const check = validateTrustAssessment(assessment);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = await this.get(assessment.assessmentId);
    if (existing && existing.version > assessment.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${assessment.version}`],
      };
    }
    const { error } = await this.client
      .from(TABLE)
      .upsert(assessmentToRow(assessment), { onConflict: "assessment_id" });
    if (error) return { ok: false, errors: [`upsert failed: ${error.message}`] };
    for (const ev of assessment.evidenceRefs) {
      const evWrite = await this.putEvidence(ev);
      if (!evWrite.ok) return { ok: false, errors: evWrite.errors };
    }
    return { ok: true, errors: [], assessment: { ...assessment } };
  }

  async putEvidence(evidence: TrustEvidenceRef) {
    const check = validateTrustEvidence(evidence);
    if (!check.valid) return { ok: false, errors: check.errors };
    const { error } = await this.client
      .from(EVIDENCE)
      .upsert(evidenceToRow(evidence), { onConflict: "evidence_id" });
    if (error) return { ok: false, errors: [`evidence upsert failed: ${error.message}`] };
    return { ok: true, errors: [] };
  }

  async listEvidence(assessmentId: string) {
    return this.loadEvidence(assessmentId);
  }

  async appendHistory(entry: TrustHistoryEntry): Promise<void> {
    const { error } = await this.client.from(HISTORY).insert({
      assessment_id: entry.assessmentId,
      from_state: entry.fromState,
      to_state: entry.toState,
      at: entry.at,
      reason: entry.reason ?? null,
      actor_system: entry.actorSystem ?? null,
    });
    if (error) throw new Error(`SupabaseTrustStore.appendHistory: ${error.message}`);
  }

  async listHistory(assessmentId: string): Promise<TrustHistoryEntry[]> {
    const { data, error } = await this.client
      .from(HISTORY)
      .select("*")
      .eq("assessment_id", assessmentId);
    if (error) throw new Error(`SupabaseTrustStore.listHistory: ${error.message}`);
    return (data ?? []).map((row) => ({
      assessmentId: String(row.assessment_id),
      fromState: row.from_state as TrustHistoryEntry["fromState"],
      toState: row.to_state as TrustHistoryEntry["toState"],
      at: String(row.at),
      reason: row.reason ? String(row.reason) : undefined,
      actorSystem: row.actor_system ? String(row.actor_system) : undefined,
    }));
  }

  async putPolicy(policy: TrustPolicyDefinition) {
    const check = validateTrustPolicy(policy);
    if (!check.valid) return { ok: false, errors: check.errors };
    const { error } = await this.client
      .from(POLICIES)
      .upsert(policyToRow(policy), { onConflict: "policy_id,policy_version" });
    if (error) return { ok: false, errors: [`policy upsert failed: ${error.message}`] };
    return { ok: true, errors: [] };
  }

  async getPolicy(policyId: string, version?: string) {
    if (version) {
      const { data, error } = await this.client
        .from(POLICIES)
        .select("*")
        .eq("policy_id", policyId);
      if (error) throw new Error(`SupabaseTrustStore.getPolicy: ${error.message}`);
      const match = (data ?? []).find((r) => String(r.policy_version) === version);
      return match ? rowToPolicy(match) : null;
    }
    const { data, error } = await this.client
      .from(POLICIES)
      .select("*")
      .eq("policy_id", policyId);
    if (error) throw new Error(`SupabaseTrustStore.getPolicy: ${error.message}`);
    const list = (data ?? []).map(rowToPolicy);
    return list.sort((a, b) => b.version.localeCompare(a.version))[0] ?? null;
  }

  async listPolicies() {
    const { data, error } = await this.client.from(POLICIES).select("*");
    if (error) throw new Error(`SupabaseTrustStore.listPolicies: ${error.message}`);
    return (data ?? []).map(rowToPolicy);
  }
}

export function createSupabaseTrustStore(client: TrustSupabaseClient): TrustStore {
  return new SupabaseTrustStore(client);
}
