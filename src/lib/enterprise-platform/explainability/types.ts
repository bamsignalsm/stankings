/**
 * Enterprise Explainability Runtime — first-class transparent reasoning service.
 *
 * Answers "why was this decision reached?" without re-evaluating business logic.
 * Consumes Trust / Passport / Consent (and future) decision records as inputs.
 * Not a UI layer and not product-specific explanation copy.
 */

export const EXPLAINABILITY_RUNTIME_VERSION = "1.0.0";
export const EXPLAINABILITY_SCHEMA_VERSION = 1;

export type ExplainabilityCapability =
  | "trust"
  | "passport"
  | "consent"
  | "identity"
  | "enterprise"
  | "other";

export interface ExplanationDecisionRef {
  capabilityId: ExplainabilityCapability;
  /** Machine decision type, e.g. trust.assessment, passport.state, consent.grant */
  decisionType: string;
  /** Opaque id of the decision artifact */
  decisionRef: string;
}

export interface ExplanationEvidenceRef {
  provider: string;
  assertionType: string;
  assertionRef: string;
  status?: string;
  dimension?: string;
}

export interface ExplanationPolicyRef {
  policyId: string;
  policyVersion: string;
}

export interface ExplanationFactor {
  key: string;
  detail: string;
  contribution?: number;
  satisfied?: boolean;
  weight?: number;
}

export interface MachineExplanation {
  factors: ExplanationFactor[];
  outcome?: string;
  state?: string;
  riskIndicators?: string[];
  rationaleKeys: string[];
}

export interface ExplanationConfidence {
  band: "low" | "medium" | "high";
  score?: number;
}

export interface ExplanationRecord {
  explanationId: string;
  subjectId: string;
  decision: ExplanationDecisionRef;
  assessmentRef?: string;
  passportRef?: string;
  consentRef?: string;
  evidenceRefs: ExplanationEvidenceRef[];
  policyRefs: ExplanationPolicyRef[];
  humanSummary: string;
  machineExplanation: MachineExplanation;
  confidence?: ExplanationConfidence;
  version: number;
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
  platformId?: string;
  metadata?: Record<string, string>;
  auditRef?: string;
}

export interface ExplanationHistoryEntry {
  explanationId: string;
  action: "created" | "superseded";
  at: string;
  reason?: string;
  actorSystem?: string;
}

export interface CreateExplanationInput {
  subjectId: string;
  decision: ExplanationDecisionRef;
  assessmentRef?: string;
  passportRef?: string;
  consentRef?: string;
  evidenceRefs?: ExplanationEvidenceRef[];
  policyRefs?: ExplanationPolicyRef[];
  humanSummary: string;
  machineExplanation: MachineExplanation;
  confidence?: ExplanationConfidence;
  platformId?: string;
  metadata?: Record<string, string>;
  now?: string;
  explanationId?: string;
}
