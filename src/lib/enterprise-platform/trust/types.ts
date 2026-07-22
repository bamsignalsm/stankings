/**
 * Enterprise Trust Runtime — policy-driven evidence evaluation (not a product scorer).
 *
 * Aggregates verified evidence references bound to Identity + Passport.
 * Produces explainable assessment outcomes via versioned policies.
 * Does not implement Explainability Runtime or product-specific trust logic.
 */

export const TRUST_RUNTIME_VERSION = "1.0.0";
export const TRUST_SCHEMA_VERSION = 1;

export type TrustAssessmentState =
  | "draft"
  | "assessing"
  | "assessed"
  | "superseded"
  | "invalidated";

export type TrustOutcome =
  | "eligible"
  | "review_required"
  | "ineligible"
  | "insufficient_evidence";

export type TrustConfidenceBand = "low" | "medium" | "high";

export type TrustDimension =
  | "identity"
  | "consent"
  | "passport"
  | "financial"
  | "marketplace"
  | "relationship"
  | "institutional"
  | "other";

export type TrustEvidenceProvider =
  | "identity"
  | "consent"
  | "passport"
  | "bayright"
  | "yike"
  | "bamsignal"
  | "enterprise"
  | "other";

export type TrustEvidenceStatus =
  | "asserted"
  | "verified"
  | "rejected"
  | "withdrawn"
  | "expired";

export interface TrustEvidenceRef {
  evidenceId: string;
  assessmentId: string;
  provider: TrustEvidenceProvider;
  assertionType: string;
  assertionRef: string;
  /** Optional Passport evidence id when mirroring passport refs */
  passportEvidenceId?: string;
  status: TrustEvidenceStatus;
  dimension?: TrustDimension;
  verifiedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, string>;
  auditRef?: string;
}

export interface TrustDimensionResult {
  dimension: TrustDimension;
  weight: number;
  contribution: number;
  satisfied: boolean;
  evidenceIds: string[];
  notes?: string;
}

export interface TrustConfidenceMetadata {
  band: TrustConfidenceBand;
  /** 0–1 aggregate from weighted policy contribution */
  score: number;
  evidenceCount: number;
  verifiedCount: number;
}

export interface TrustPolicyRef {
  policyId: string;
  policyVersion: string;
}

export interface TrustAssessment {
  assessmentId: string;
  subjectId: string;
  passportId: string;
  state: TrustAssessmentState;
  outcome?: TrustOutcome;
  confidence?: TrustConfidenceMetadata;
  dimensions: TrustDimensionResult[];
  evidenceRefs: TrustEvidenceRef[];
  riskIndicators: string[];
  policy: TrustPolicyRef;
  version: number;
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
  assessedAt?: string;
  platformId?: string;
  metadata?: Record<string, string>;
  auditRef?: string;
  supersedesAssessmentId?: string;
}

export interface TrustHistoryEntry {
  assessmentId: string;
  fromState: TrustAssessmentState;
  toState: TrustAssessmentState;
  at: string;
  reason?: string;
  actorSystem?: string;
}

export type TrustRuleEffect = "require" | "contribute" | "risk_flag";

export interface TrustPolicyRule {
  ruleId: string;
  dimension: TrustDimension;
  effect: TrustRuleEffect;
  weight: number;
  /** Minimum verified evidence matching provider/assertion filters */
  minVerifiedEvidence?: number;
  providers?: TrustEvidenceProvider[];
  assertionTypes?: string[];
  /** When effect=risk_flag, emit this indicator if matched */
  riskIndicator?: string;
  description?: string;
}

export interface TrustPolicyDefinition {
  policyId: string;
  name: string;
  version: string;
  description: string;
  /** eligible if score >= this */
  eligibleThreshold: number;
  /** review if score >= this but < eligible */
  reviewThreshold: number;
  rules: TrustPolicyRule[];
  metadata?: Record<string, string>;
}

export interface RequestTrustAssessmentInput {
  subjectId: string;
  passportId: string;
  platformId?: string;
  policyId?: string;
  policyVersion?: string;
  evidence?: Omit<
    TrustEvidenceRef,
    "evidenceId" | "assessmentId" | "createdAt" | "updatedAt"
  >[];
  metadata?: Record<string, string>;
  now?: string;
  assessmentId?: string;
  supersedesAssessmentId?: string;
}

export interface IngestTrustEvidenceInput {
  assessmentId: string;
  provider: TrustEvidenceProvider;
  assertionType: string;
  assertionRef: string;
  status?: TrustEvidenceStatus;
  dimension?: TrustDimension;
  passportEvidenceId?: string;
  verifiedAt?: string;
  expiresAt?: string;
  metadata?: Record<string, string>;
  evidenceId?: string;
  now?: string;
}
