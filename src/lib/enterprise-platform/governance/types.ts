/**
 * Shared governance primitives — no product business policies.
 */

export const GOVERNANCE_RUNTIME_VERSION = "1.0.0";

export type PolicyEffect = "allow" | "deny" | "require";

export interface PolicyDefinition {
  policyId: string;
  name: string;
  version: string;
  /** Machine-readable requirement key */
  requirementKey: string;
  effect: PolicyEffect;
  description: string;
  appliesToCapabilities?: string[];
  metadata?: Record<string, string>;
}

export interface FeatureGate {
  gateId: string;
  featureId: string;
  enabled: boolean;
  requiresCapabilities?: string[];
  requiresPolicies?: string[];
  notes?: string;
}

export interface PolicyEvaluationInput {
  platformId: string;
  capabilityId?: string;
  featureId?: string;
  subjectId?: string;
  attributes?: Record<string, string>;
}

export interface PolicyEvaluationResult {
  allowed: boolean;
  effect: PolicyEffect | "none";
  matchedPolicies: string[];
  deniedBy: string[];
  warnings: string[];
  evaluatedAt: string;
}

export interface ComplianceMetadata {
  frameworkRefs: string[];
  notes?: string;
}
