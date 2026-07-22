import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import type {
  TrustAssessment,
  TrustEvidenceRef,
  TrustPolicyDefinition,
  TrustPolicyRule,
} from "./types";
import { canTransitionTrustState } from "./lifecycle";

const PROVIDERS = new Set([
  "identity",
  "consent",
  "passport",
  "bayright",
  "yike",
  "bamsignal",
  "enterprise",
  "other",
]);

export function validateTrustEvidence(evidence: TrustEvidenceRef): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!evidence.evidenceId?.trim()) errors.push("evidenceId required");
  if (!evidence.assessmentId?.trim()) errors.push("assessmentId required");
  if (!PROVIDERS.has(evidence.provider)) {
    errors.push(`unknown evidence provider: ${evidence.provider}`);
  }
  if (!evidence.assertionType?.trim()) errors.push("assertionType required");
  if (!evidence.assertionRef?.trim()) errors.push("assertionRef required");
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateTrustPolicyRule(rule: TrustPolicyRule): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!rule.ruleId?.trim()) errors.push("ruleId required");
  if (!rule.dimension) errors.push("dimension required");
  if (!Number.isFinite(rule.weight) || rule.weight < 0) errors.push("weight must be >= 0");
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateTrustPolicy(
  policy: TrustPolicyDefinition,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!policy.policyId?.trim()) errors.push("policyId required");
  if (!policy.version?.trim()) errors.push("policy version required");
  if (!Number.isFinite(policy.eligibleThreshold) || policy.eligibleThreshold < 0) {
    errors.push("eligibleThreshold must be >= 0");
  }
  if (!Number.isFinite(policy.reviewThreshold) || policy.reviewThreshold < 0) {
    errors.push("reviewThreshold must be >= 0");
  }
  if (policy.reviewThreshold > policy.eligibleThreshold) {
    errors.push("reviewThreshold must be <= eligibleThreshold");
  }
  if (!policy.rules?.length) errors.push("at least one rule required");
  for (const rule of policy.rules ?? []) {
    const check = validateTrustPolicyRule(rule);
    if (!check.valid) errors.push(...check.errors.map((e) => `${rule.ruleId}: ${e}`));
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateTrustAssessment(
  assessment: TrustAssessment,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!assessment.assessmentId?.trim()) errors.push("assessmentId required");
  if (!/^sid_[a-zA-Z0-9-]{8,128}$/.test(assessment.subjectId ?? "")) {
    errors.push("subjectId must be a Shared Identity sid_*");
  }
  if (!assessment.passportId?.trim()) errors.push("passportId required");
  if (!Number.isInteger(assessment.version) || assessment.version < 1) {
    errors.push("version must be integer >= 1");
  }
  if (!assessment.policy?.policyId?.trim()) errors.push("policy.policyId required");
  for (const ev of assessment.evidenceRefs ?? []) {
    const check = validateTrustEvidence(ev);
    if (!check.valid) errors.push(...check.errors);
    if (ev.assessmentId !== assessment.assessmentId) {
      errors.push(`evidence ${ev.evidenceId} assessmentId mismatch`);
    }
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateTrustTransition(
  from: TrustAssessment["state"],
  to: TrustAssessment["state"],
): EnterpriseValidationResult {
  if (!canTransitionTrustState(from, to)) {
    return validationFail([`illegal trust transition ${from} → ${to}`]);
  }
  return validationOk();
}
