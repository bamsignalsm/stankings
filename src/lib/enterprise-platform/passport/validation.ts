import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import type {
  PassportEvidenceRef,
  PassportRecord,
  PassportVerificationStatus,
} from "./types";
import { canTransitionPassportState } from "./lifecycle";

const PROVIDERS = new Set([
  "identity",
  "consent",
  "bayright",
  "yike",
  "bamsignal",
  "enterprise",
  "other",
]);

export function validatePassportEvidence(
  evidence: PassportEvidenceRef,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!evidence.evidenceId?.trim()) errors.push("evidenceId required");
  if (!evidence.passportId?.trim()) errors.push("evidence.passportId required");
  if (!PROVIDERS.has(evidence.provider)) {
    errors.push(`unknown evidence provider: ${evidence.provider}`);
  }
  if (!evidence.assertionType?.trim()) errors.push("assertionType required");
  if (!evidence.assertionRef?.trim()) errors.push("assertionRef required");
  return errors.length ? validationFail(errors) : validationOk();
}

export function validatePassportRecord(record: PassportRecord): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!record.passportId?.trim()) errors.push("passportId required");
  if (!/^sid_[a-zA-Z0-9-]{8,128}$/.test(record.subjectId ?? "")) {
    errors.push("subjectId must be a Shared Identity sid_*");
  }
  if (!Number.isInteger(record.version) || record.version < 1) {
    errors.push("version must be integer >= 1");
  }
  if (!Number.isInteger(record.schemaVersion) || record.schemaVersion < 1) {
    errors.push("schemaVersion must be integer >= 1");
  }
  for (const ev of record.evidenceRefs ?? []) {
    const check = validatePassportEvidence(ev);
    if (!check.valid) errors.push(...check.errors);
    if (ev.passportId !== record.passportId) {
      errors.push(`evidence ${ev.evidenceId} passportId mismatch`);
    }
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function validatePassportTransition(
  from: PassportRecord["state"],
  to: PassportRecord["state"],
): EnterpriseValidationResult {
  if (!canTransitionPassportState(from, to)) {
    return validationFail([`illegal passport transition ${from} → ${to}`]);
  }
  return validationOk();
}

export function deriveVerificationStatus(
  evidence: PassportEvidenceRef[],
): PassportVerificationStatus {
  if (!evidence.length) return "unverified";
  if (evidence.some((e) => e.status === "rejected")) return "contested";
  if (evidence.some((e) => e.status === "asserted")) return "pending";
  if (evidence.every((e) => e.status === "verified" || e.status === "withdrawn" || e.status === "expired")) {
    const active = evidence.filter((e) => e.status === "verified");
    return active.length ? "verified" : "unverified";
  }
  return "pending";
}
