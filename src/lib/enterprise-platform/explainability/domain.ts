import type { CreateExplanationInput, ExplanationHistoryEntry, ExplanationRecord } from "./types";
import { EXPLAINABILITY_SCHEMA_VERSION } from "./types";
import { validateExplanationRecord } from "./validation";
import { createAuditRecord, type EnterpriseAuditRecord } from "@/lib/enterprise-platform/quality/audit";

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function buildExplainabilityAudit(
  record: ExplanationRecord,
  action: "create" | "supersede",
): EnterpriseAuditRecord {
  return createAuditRecord({
    capability: "explainability",
    action: `explainability.${action}`,
    entityType: "explanation_record",
    entityId: record.explanationId,
    actorSystem: "enterprise-explainability",
    afterVersion: record.version,
    metadata: {
      subjectId: record.subjectId,
      capabilityId: record.decision.capabilityId,
      decisionType: record.decision.decisionType,
      decisionRef: record.decision.decisionRef,
    },
  });
}

export function createExplanationRecord(input: CreateExplanationInput): ExplanationRecord {
  const now = input.now ?? new Date().toISOString();
  const record: ExplanationRecord = {
    explanationId: input.explanationId ?? newId("exp"),
    subjectId: input.subjectId,
    decision: { ...input.decision },
    assessmentRef: input.assessmentRef,
    passportRef: input.passportRef,
    consentRef: input.consentRef,
    evidenceRefs: (input.evidenceRefs ?? []).map((e) => ({ ...e })),
    policyRefs: (input.policyRefs ?? []).map((p) => ({ ...p })),
    humanSummary: input.humanSummary,
    machineExplanation: {
      ...input.machineExplanation,
      factors: input.machineExplanation.factors.map((f) => ({ ...f })),
      riskIndicators: input.machineExplanation.riskIndicators
        ? [...input.machineExplanation.riskIndicators]
        : undefined,
      rationaleKeys: [...input.machineExplanation.rationaleKeys],
    },
    confidence: input.confidence ? { ...input.confidence } : undefined,
    version: 1,
    schemaVersion: EXPLAINABILITY_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    platformId: input.platformId,
    metadata: input.metadata,
  };
  const check = validateExplanationRecord(record);
  if (!check.valid) throw new Error(`Invalid explanation: ${check.errors.join("; ")}`);
  return record;
}

export function historyCreated(
  record: ExplanationRecord,
  at = record.createdAt,
): ExplanationHistoryEntry {
  return {
    explanationId: record.explanationId,
    action: "created",
    at,
    actorSystem: "enterprise-explainability",
  };
}
