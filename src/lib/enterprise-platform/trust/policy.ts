/**
 * Trust policy engine — configurable evaluation (not product scoring).
 */

import type {
  TrustConfidenceBand,
  TrustConfidenceMetadata,
  TrustDimensionResult,
  TrustEvidenceRef,
  TrustOutcome,
  TrustPolicyDefinition,
  TrustPolicyRule,
} from "./types";
import { validateTrustPolicy } from "./validation";

export function defaultTrustPolicies(): TrustPolicyDefinition[] {
  return [
    {
      policyId: "trust.ecosystem.baseline",
      name: "Ecosystem Baseline Trust Policy",
      version: "1.0.0",
      description:
        "Requires Identity + Passport evidence; optional Consent and consumer provider signals contribute weight.",
      eligibleThreshold: 0.5,
      reviewThreshold: 0.3,
      rules: [
        {
          ruleId: "require.identity.active",
          dimension: "identity",
          effect: "require",
          weight: 0.25,
          minVerifiedEvidence: 1,
          providers: ["identity"],
          assertionTypes: ["identity.subject.active"],
          description: "Identity subject must be active",
        },
        {
          ruleId: "require.passport.active",
          dimension: "passport",
          effect: "require",
          weight: 0.25,
          minVerifiedEvidence: 1,
          providers: ["passport"],
          assertionTypes: ["passport.active"],
          description: "Passport must be active",
        },
        {
          ruleId: "contribute.consent",
          dimension: "consent",
          effect: "contribute",
          weight: 0.1,
          minVerifiedEvidence: 1,
          providers: ["consent"],
          description: "Consent evidence contributes",
        },
        {
          ruleId: "contribute.financial",
          dimension: "financial",
          effect: "contribute",
          weight: 0.15,
          minVerifiedEvidence: 1,
          providers: ["bayright"],
          description: "BayRight financial evidence contributes",
        },
        {
          ruleId: "contribute.marketplace",
          dimension: "marketplace",
          effect: "contribute",
          weight: 0.15,
          minVerifiedEvidence: 1,
          providers: ["yike"],
          description: "Yike marketplace verification contributes",
        },
        {
          ruleId: "contribute.relationship",
          dimension: "relationship",
          effect: "contribute",
          weight: 0.1,
          minVerifiedEvidence: 1,
          providers: ["bamsignal"],
          description: "BamSignal relationship verification contributes",
        },
        {
          ruleId: "risk.rejected_evidence",
          dimension: "other",
          effect: "risk_flag",
          weight: 0,
          riskIndicator: "rejected_evidence_present",
          description: "Flag when any evidence is rejected",
        },
      ],
    },
  ];
}

function matchesRule(evidence: TrustEvidenceRef, rule: TrustPolicyRule): boolean {
  if (rule.providers?.length && !rule.providers.includes(evidence.provider)) {
    return false;
  }
  if (
    rule.assertionTypes?.length &&
    !rule.assertionTypes.includes(evidence.assertionType)
  ) {
    return false;
  }
  return true;
}

function confidenceBand(score: number): TrustConfidenceBand {
  if (score >= 0.5) return "high";
  if (score >= 0.3) return "medium";
  return "low";
}

export interface TrustPolicyEvaluationResult {
  outcome: TrustOutcome;
  confidence: TrustConfidenceMetadata;
  dimensions: TrustDimensionResult[];
  riskIndicators: string[];
  requiredFailed: string[];
}

export function evaluateTrustPolicy(
  policy: TrustPolicyDefinition,
  evidence: TrustEvidenceRef[],
): TrustPolicyEvaluationResult {
  const check = validateTrustPolicy(policy);
  if (!check.valid) {
    throw new Error(`Invalid trust policy: ${check.errors.join("; ")}`);
  }

  const verified = evidence.filter((e) => e.status === "verified");
  const dimensions: TrustDimensionResult[] = [];
  const riskIndicators: string[] = [];
  const requiredFailed: string[] = [];
  let earned = 0;
  let possible = 0;

  for (const rule of policy.rules) {
    if (rule.effect === "risk_flag") {
      const hit =
        rule.riskIndicator === "rejected_evidence_present"
          ? evidence.some((e) => e.status === "rejected")
          : verified.some((e) => matchesRule(e, rule));
      if (hit && rule.riskIndicator) riskIndicators.push(rule.riskIndicator);
      continue;
    }

    const matching = verified.filter((e) => matchesRule(e, rule));
    const min = rule.minVerifiedEvidence ?? 1;
    const satisfied = matching.length >= min;
    const contribution = satisfied ? rule.weight : 0;
    possible += rule.weight;
    earned += contribution;
    dimensions.push({
      dimension: rule.dimension,
      weight: rule.weight,
      contribution,
      satisfied,
      evidenceIds: matching.map((e) => e.evidenceId),
      notes: rule.description,
    });

    if (rule.effect === "require" && !satisfied) {
      requiredFailed.push(rule.ruleId);
    }
  }

  const score = possible > 0 ? earned / possible : 0;
  const confidence: TrustConfidenceMetadata = {
    band: confidenceBand(score),
    score: Number(score.toFixed(4)),
    evidenceCount: evidence.length,
    verifiedCount: verified.length,
  };

  let outcome: TrustOutcome;
  if (requiredFailed.length || confidence.verifiedCount === 0) {
    outcome = "insufficient_evidence";
  } else if (riskIndicators.length && score < policy.eligibleThreshold) {
    outcome = "review_required";
  } else if (score >= policy.eligibleThreshold) {
    outcome = "eligible";
  } else if (score >= policy.reviewThreshold) {
    outcome = "review_required";
  } else {
    outcome = "ineligible";
  }

  return { outcome, confidence, dimensions, riskIndicators, requiredFailed };
}

export function getTrustPolicy(
  policyId: string,
  version?: string,
  catalogue: TrustPolicyDefinition[] = defaultTrustPolicies(),
): TrustPolicyDefinition | undefined {
  return catalogue.find(
    (p) => p.policyId === policyId && (version ? p.version === version : true),
  );
}
