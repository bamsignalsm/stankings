import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import type { ExplanationRecord } from "./types";

export function validateExplanationRecord(
  record: ExplanationRecord,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!record.explanationId?.trim()) errors.push("explanationId required");
  if (!/^sid_[a-zA-Z0-9-]{8,128}$/.test(record.subjectId ?? "")) {
    errors.push("subjectId must be a Shared Identity sid_*");
  }
  if (!record.decision?.capabilityId) errors.push("decision.capabilityId required");
  if (!record.decision?.decisionType?.trim()) errors.push("decision.decisionType required");
  if (!record.decision?.decisionRef?.trim()) errors.push("decision.decisionRef required");
  if (!record.humanSummary?.trim()) errors.push("humanSummary required");
  if (!record.machineExplanation?.rationaleKeys) {
    errors.push("machineExplanation.rationaleKeys required");
  }
  if (!Number.isInteger(record.version) || record.version < 1) {
    errors.push("version must be integer >= 1");
  }
  return errors.length ? validationFail(errors) : validationOk();
}
