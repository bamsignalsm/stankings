import type {
  FeatureGate,
  PolicyDefinition,
  PolicyEvaluationInput,
  PolicyEvaluationResult,
} from "./types";
import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type MemoryEventCollector,
} from "@/lib/enterprise-platform/events";

export function validatePolicyDefinition(policy: PolicyDefinition): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!policy.policyId?.trim()) errors.push("policyId required");
  if (!policy.requirementKey?.trim()) errors.push("requirementKey required");
  if (!policy.version?.trim()) errors.push("version required");
  return errors.length ? validationFail(errors) : validationOk();
}

/** Built-in enterprise prerequisite policies (not product rules). */
export function defaultEnterprisePolicies(): PolicyDefinition[] {
  return [
    {
      policyId: "pol.identity.required",
      name: "Identity capability required",
      version: "1.0.0",
      requirementKey: "capability.identity.production",
      effect: "require",
      description: "Consumers requiring shared identity must see Identity at production readiness.",
      appliesToCapabilities: ["passport", "trust", "consent"],
    },
    {
      policyId: "pol.no_interface_only_production",
      name: "Block interface-only production calls",
      version: "1.0.0",
      requirementKey: "runtime.not_interface_only",
      effect: "deny",
      description: "Deny production consumption when capability readiness is interface_only.",
    },
  ];
}

export function defaultFeatureGates(): FeatureGate[] {
  return [
    {
      gateId: "fg.identity.sdk",
      featureId: "sdk.identity",
      enabled: true,
      requiresCapabilities: ["identity"],
    },
    {
      gateId: "fg.passport.runtime",
      featureId: "runtime.passport",
      enabled: true,
      requiresCapabilities: ["passport", "identity"],
      notes: "Passport Eight-Gate complete — consumers may read behind product feature flags",
    },
    {
      gateId: "fg.consent.runtime",
      featureId: "runtime.consent",
      enabled: true,
      requiresCapabilities: ["consent", "identity"],
      notes: "Consent Eight-Gate complete",
    },
    {
      gateId: "fg.trust.runtime",
      featureId: "runtime.trust",
      enabled: true,
      requiresCapabilities: ["trust", "passport", "identity"],
      notes: "Trust Eight-Gate complete — consumers may assess behind product feature flags",
    },
    {
      gateId: "fg.explainability.runtime",
      featureId: "runtime.explainability",
      enabled: true,
      requiresCapabilities: ["explainability", "trust", "identity"],
      notes:
        "Explainability Eight-Gate complete — consumers may record explanations behind product flags; migration pending review",
    },
  ];
}

export function evaluatePolicies(
  input: PolicyEvaluationInput,
  policies: PolicyDefinition[] = defaultEnterprisePolicies(),
  options?: {
    capabilityReadiness?: Record<string, string>;
    events?: MemoryEventCollector;
  },
): PolicyEvaluationResult {
  const matched: string[] = [];
  const deniedBy: string[] = [];
  const warnings: string[] = [];
  let effect: PolicyEvaluationResult["effect"] = "none";

  for (const policy of policies) {
    if (
      input.capabilityId &&
      policy.appliesToCapabilities &&
      !policy.appliesToCapabilities.includes(input.capabilityId)
    ) {
      continue;
    }

    if (policy.requirementKey === "capability.identity.production") {
      matched.push(policy.policyId);
      const readiness = options?.capabilityReadiness?.identity ?? "unknown";
      if (readiness !== "production") {
        deniedBy.push(policy.policyId);
        effect = "deny";
      } else if (effect === "none") {
        effect = "require";
      }
    }

    if (policy.requirementKey === "runtime.not_interface_only" && input.capabilityId) {
      matched.push(policy.policyId);
      const readiness = options?.capabilityReadiness?.[input.capabilityId];
      if (readiness === "interface_only" || readiness === "contract_only") {
        deniedBy.push(policy.policyId);
        effect = "deny";
      }
    }
  }

  const result: PolicyEvaluationResult = {
    allowed: deniedBy.length === 0,
    effect,
    matchedPolicies: matched,
    deniedBy,
    warnings,
    evaluatedAt: new Date().toISOString(),
  };

  options?.events?.publish(
    createEnterpriseEvent({
      eventType: ENTERPRISE_EVENT_TYPES.GOVERNANCE_POLICY_EVALUATED,
      domain: "governance",
      sourceRuntime: "enterprise-governance",
      capabilityId: input.capabilityId,
      platformId: input.platformId,
      subjectId: input.subjectId,
      payload: {
        allowed: result.allowed,
        effect: result.effect,
        matchedPolicies: result.matchedPolicies,
        deniedBy: result.deniedBy,
      },
    }),
  );

  return result;
}

export function isFeatureEnabled(
  featureId: string,
  gates: FeatureGate[] = defaultFeatureGates(),
): boolean {
  const gate = gates.find((g) => g.featureId === featureId);
  return gate?.enabled ?? false;
}
