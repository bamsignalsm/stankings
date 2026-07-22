/**
 * Explanation generation — narrates existing decision records; does not re-evaluate.
 */

import type { ConsentRecord } from "@/lib/enterprise-platform/consent/types";
import type { PassportRecord } from "@/lib/enterprise-platform/passport/types";
import type { TrustAssessment } from "@/lib/enterprise-platform/trust/types";
import type { CreateExplanationInput, ExplanationFactor } from "./types";

export function generateTrustExplanation(
  assessment: TrustAssessment,
  platformId?: string,
  now?: string,
): CreateExplanationInput {
  const factors: ExplanationFactor[] = assessment.dimensions.map((d) => ({
    key: `dimension.${d.dimension}`,
    detail: d.notes ?? `Dimension ${d.dimension} ${d.satisfied ? "satisfied" : "not satisfied"}`,
    contribution: d.contribution,
    satisfied: d.satisfied,
    weight: d.weight,
  }));

  if (assessment.riskIndicators.length) {
    for (const risk of assessment.riskIndicators) {
      factors.push({
        key: `risk.${risk}`,
        detail: `Risk indicator present: ${risk}`,
        satisfied: true,
      });
    }
  }

  const outcome = assessment.outcome ?? "unknown";
  const band = assessment.confidence?.band ?? "low";
  const score = assessment.confidence?.score;
  const humanSummary =
    `Trust assessment ${assessment.assessmentId} for subject ${assessment.subjectId} ` +
    `bound to passport ${assessment.passportId} reached outcome "${outcome}" ` +
    `under policy ${assessment.policy.policyId}@${assessment.policy.policyVersion}` +
    (score !== undefined ? ` with confidence ${band} (${score}).` : ` with confidence ${band}.`) +
    ` ${assessment.dimensions.filter((d) => d.satisfied).length} of ${assessment.dimensions.length} dimension rules contributed.`;

  return {
    subjectId: assessment.subjectId,
    decision: {
      capabilityId: "trust",
      decisionType: "trust.assessment",
      decisionRef: assessment.assessmentId,
    },
    assessmentRef: assessment.assessmentId,
    passportRef: assessment.passportId,
    evidenceRefs: assessment.evidenceRefs.map((e) => ({
      provider: e.provider,
      assertionType: e.assertionType,
      assertionRef: e.assertionRef,
      status: e.status,
      dimension: e.dimension,
    })),
    policyRefs: [
      {
        policyId: assessment.policy.policyId,
        policyVersion: assessment.policy.policyVersion,
      },
    ],
    humanSummary,
    machineExplanation: {
      factors,
      outcome,
      state: assessment.state,
      riskIndicators: [...assessment.riskIndicators],
      rationaleKeys: [
        "trust.policy_applied",
        "trust.evidence_referenced",
        "trust.dimensions_reported",
        ...(assessment.riskIndicators.length ? ["trust.risk_indicators"] : []),
      ],
    },
    confidence: assessment.confidence
      ? { band: assessment.confidence.band, score: assessment.confidence.score }
      : undefined,
    platformId: platformId ?? assessment.platformId,
    now,
    metadata: {
      sourceRuntime: "enterprise-trust",
      assessmentVersion: String(assessment.version),
    },
  };
}

export function generatePassportExplanation(
  passport: PassportRecord,
  platformId?: string,
  now?: string,
): CreateExplanationInput {
  const factors: ExplanationFactor[] = [
    {
      key: "passport.state",
      detail: `Passport state is ${passport.state}`,
      satisfied: passport.state === "active",
    },
    {
      key: "passport.verification",
      detail: `Verification status is ${passport.verificationStatus}`,
      satisfied: passport.verificationStatus === "verified",
    },
    {
      key: "passport.evidence_count",
      detail: `${passport.evidenceRefs.length} evidence reference(s) attached`,
      contribution: passport.evidenceRefs.length,
    },
  ];

  const humanSummary =
    `Passport ${passport.passportId} for subject ${passport.subjectId} is in state ` +
    `"${passport.state}" with verification status "${passport.verificationStatus}". ` +
    `It carries ${passport.evidenceRefs.length} evidence reference(s)` +
    (passport.issuance?.expirationPolicy
      ? ` under expiration policy ${passport.issuance.expirationPolicy}.`
      : ".");

  return {
    subjectId: passport.subjectId,
    decision: {
      capabilityId: "passport",
      decisionType: "passport.state",
      decisionRef: passport.passportId,
    },
    passportRef: passport.passportId,
    evidenceRefs: passport.evidenceRefs.map((e) => ({
      provider: e.provider,
      assertionType: e.assertionType,
      assertionRef: e.assertionRef,
      status: e.status,
    })),
    policyRefs: passport.issuance?.expirationPolicy
      ? [{ policyId: passport.issuance.expirationPolicy, policyVersion: "1.0.0" }]
      : [],
    humanSummary,
    machineExplanation: {
      factors,
      state: passport.state,
      outcome: passport.verificationStatus,
      rationaleKeys: [
        "passport.state_reported",
        "passport.verification_reported",
        "passport.evidence_referenced",
      ],
    },
    confidence:
      passport.verificationStatus === "verified"
        ? { band: "high" }
        : passport.verificationStatus === "pending"
          ? { band: "medium" }
          : { band: "low" },
    platformId: platformId ?? passport.platformId,
    now,
    metadata: {
      sourceRuntime: "enterprise-passport",
      passportVersion: String(passport.version),
    },
  };
}

export function generateConsentExplanation(
  consent: ConsentRecord,
  platformId?: string,
  now?: string,
): CreateExplanationInput {
  const factors: ExplanationFactor[] = [
    {
      key: "consent.state",
      detail: `Consent state is ${consent.state}`,
      satisfied: consent.state === "granted",
    },
    {
      key: "consent.purpose",
      detail: `Purpose key ${consent.purposeKey} (definition ${consent.definitionId}@${consent.definitionVersion})`,
      satisfied: true,
    },
  ];

  const humanSummary =
    `Consent ${consent.consentId} for subject ${consent.subjectId} is "${consent.state}" ` +
    `for purpose ${consent.purposeKey} under definition ${consent.definitionId}@${consent.definitionVersion}.`;

  return {
    subjectId: consent.subjectId,
    decision: {
      capabilityId: "consent",
      decisionType: "consent.decision",
      decisionRef: consent.consentId,
    },
    consentRef: consent.consentId,
    evidenceRefs: [
      {
        provider: "consent",
        assertionType: consent.purposeKey,
        assertionRef: consent.consentId,
        status: consent.state,
      },
    ],
    policyRefs: [
      {
        policyId: consent.definitionId,
        policyVersion: consent.definitionVersion,
      },
    ],
    humanSummary,
    machineExplanation: {
      factors,
      state: consent.state,
      outcome: consent.state,
      rationaleKeys: ["consent.state_reported", "consent.purpose_bound", "consent.definition_referenced"],
    },
    confidence: consent.state === "granted" ? { band: "high" } : { band: "medium" },
    platformId: platformId ?? consent.platformId,
    now,
    metadata: {
      sourceRuntime: "enterprise-consent",
      consentVersion: String(consent.version),
    },
  };
}
