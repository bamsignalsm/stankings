import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import type { ConsentDefinition, ConsentRecord } from "./types";
import { canTransitionConsentState } from "./lifecycle";

export function validateConsentDefinition(
  def: ConsentDefinition,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!def.definitionId?.trim()) errors.push("definitionId required");
  if (!def.purposeKey?.trim()) errors.push("purposeKey required");
  if (!def.version?.trim()) errors.push("definition version required");
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateConsentRecord(record: ConsentRecord): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!record.consentId?.trim()) errors.push("consentId required");
  if (!/^sid_[a-zA-Z0-9-]{8,128}$/.test(record.subjectId ?? "")) {
    errors.push("subjectId must be a Shared Identity sid_*");
  }
  if (!record.definitionId?.trim()) errors.push("definitionId required");
  if (!record.purposeKey?.trim()) errors.push("purposeKey required");
  if (!Number.isInteger(record.version) || record.version < 1) {
    errors.push("version must be integer >= 1");
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateConsentTransition(
  from: ConsentRecord["state"],
  to: ConsentRecord["state"],
): EnterpriseValidationResult {
  if (!canTransitionConsentState(from, to)) {
    return validationFail([`illegal consent transition ${from} → ${to}`]);
  }
  return validationOk();
}
