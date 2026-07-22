import type {
  IngestTrustEvidenceInput,
  RequestTrustAssessmentInput,
  TrustAssessment,
  TrustEvidenceRef,
  TrustHistoryEntry,
  TrustPolicyDefinition,
} from "./types";
import { TRUST_SCHEMA_VERSION } from "./types";
import { createTrustEvidenceRef } from "./evidence";
import {
  defaultTrustPolicies,
  evaluateTrustPolicy,
  getTrustPolicy,
} from "./policy";
import {
  validateTrustAssessment,
  validateTrustTransition,
} from "./validation";
import { createAuditRecord, type EnterpriseAuditRecord } from "@/lib/enterprise-platform/quality/audit";

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function buildTrustAudit(
  assessment: TrustAssessment,
  action: "assess" | "reassess" | "invalidate" | "ingest_evidence" | "register_policy",
): EnterpriseAuditRecord {
  return createAuditRecord({
    capability: "trust",
    action: `trust.${action}`,
    entityType: "trust_assessment",
    entityId: assessment.assessmentId,
    actorSystem: "enterprise-trust",
    afterVersion: assessment.version,
    metadata: {
      subjectId: assessment.subjectId,
      passportId: assessment.passportId,
      state: assessment.state,
      outcome: assessment.outcome ?? "none",
      policyId: assessment.policy.policyId,
      policyVersion: assessment.policy.policyVersion,
    },
  });
}

export function createDraftAssessment(
  input: RequestTrustAssessmentInput,
  policy: TrustPolicyDefinition,
): TrustAssessment {
  const now = input.now ?? new Date().toISOString();
  const assessmentId = input.assessmentId ?? newId("tas");
  const evidence = (input.evidence ?? []).map((e) =>
    createTrustEvidenceRef({
      ...e,
      assessmentId,
      now,
    }),
  );

  const assessment: TrustAssessment = {
    assessmentId,
    subjectId: input.subjectId,
    passportId: input.passportId,
    state: "draft",
    dimensions: [],
    evidenceRefs: evidence,
    riskIndicators: [],
    policy: { policyId: policy.policyId, policyVersion: policy.version },
    version: 1,
    schemaVersion: TRUST_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    platformId: input.platformId,
    metadata: input.metadata,
    supersedesAssessmentId: input.supersedesAssessmentId,
  };
  const check = validateTrustAssessment(assessment);
  if (!check.valid) throw new Error(`Invalid trust assessment: ${check.errors.join("; ")}`);
  return assessment;
}

export function runAssessment(
  assessment: TrustAssessment,
  policy: TrustPolicyDefinition,
  now = new Date().toISOString(),
): { assessment: TrustAssessment; history: TrustHistoryEntry[] } {
  const history: TrustHistoryEntry[] = [];
  let current = assessment;

  if (current.state === "draft") {
    const toAssessing = validateTrustTransition(current.state, "assessing");
    if (!toAssessing.valid) throw new Error(toAssessing.errors.join("; "));
    history.push({
      assessmentId: current.assessmentId,
      fromState: current.state,
      toState: "assessing",
      at: now,
      actorSystem: "enterprise-trust",
    });
    current = { ...current, state: "assessing", version: current.version + 1, updatedAt: now };
  }

  const result = evaluateTrustPolicy(policy, current.evidenceRefs);
  const toAssessed = validateTrustTransition(current.state, "assessed");
  if (!toAssessed.valid) throw new Error(toAssessed.errors.join("; "));
  history.push({
    assessmentId: current.assessmentId,
    fromState: current.state,
    toState: "assessed",
    at: now,
    actorSystem: "enterprise-trust",
  });

  const next: TrustAssessment = {
    ...current,
    state: "assessed",
    outcome: result.outcome,
    confidence: result.confidence,
    dimensions: result.dimensions,
    riskIndicators: result.riskIndicators,
    version: current.version + 1,
    updatedAt: now,
    assessedAt: now,
  };
  const check = validateTrustAssessment(next);
  if (!check.valid) throw new Error(`Invalid assessed trust: ${check.errors.join("; ")}`);
  return { assessment: next, history };
}

export function attachTrustEvidence(
  assessment: TrustAssessment,
  input: IngestTrustEvidenceInput,
): TrustAssessment {
  if (assessment.assessmentId !== input.assessmentId) {
    throw new Error("assessmentId mismatch on attachTrustEvidence");
  }
  if (
    assessment.state === "invalidated" ||
    assessment.state === "superseded" ||
    assessment.state === "assessed"
  ) {
    throw new Error(
      `cannot attach evidence to ${assessment.state} assessment — use reassess`,
    );
  }
  const evidence = createTrustEvidenceRef(input);
  const evidenceRefs = [...assessment.evidenceRefs, evidence];
  const next: TrustAssessment = {
    ...assessment,
    evidenceRefs,
    version: assessment.version + 1,
    updatedAt: input.now ?? new Date().toISOString(),
  };
  const check = validateTrustAssessment(next);
  if (!check.valid) throw new Error(`Invalid trust after evidence: ${check.errors.join("; ")}`);
  return next;
}

export function invalidateAssessment(
  assessment: TrustAssessment,
  now = new Date().toISOString(),
  reason?: string,
): { assessment: TrustAssessment; history: TrustHistoryEntry } {
  const transition = validateTrustTransition(assessment.state, "invalidated");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  const next: TrustAssessment = {
    ...assessment,
    state: "invalidated",
    version: assessment.version + 1,
    updatedAt: now,
    metadata: {
      ...assessment.metadata,
      ...(reason ? { invalidateReason: reason } : {}),
    },
  };
  return {
    assessment: next,
    history: {
      assessmentId: assessment.assessmentId,
      fromState: assessment.state,
      toState: "invalidated",
      at: now,
      reason,
      actorSystem: "enterprise-trust",
    },
  };
}

export function markSuperseded(
  assessment: TrustAssessment,
  now = new Date().toISOString(),
): { assessment: TrustAssessment; history: TrustHistoryEntry } {
  const transition = validateTrustTransition(assessment.state, "superseded");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  return {
    assessment: {
      ...assessment,
      state: "superseded",
      version: assessment.version + 1,
      updatedAt: now,
    },
    history: {
      assessmentId: assessment.assessmentId,
      fromState: assessment.state,
      toState: "superseded",
      at: now,
      actorSystem: "enterprise-trust",
    },
  };
}

export function resolvePolicyForRequest(
  input: RequestTrustAssessmentInput,
  catalogue: TrustPolicyDefinition[] = defaultTrustPolicies(),
): TrustPolicyDefinition {
  const policyId = input.policyId ?? "trust.ecosystem.baseline";
  const policy = getTrustPolicy(policyId, input.policyVersion, catalogue);
  if (!policy) {
    throw new Error(`unknown trust policy: ${policyId}@${input.policyVersion ?? "latest"}`);
  }
  return policy;
}

export type { TrustEvidenceRef };
