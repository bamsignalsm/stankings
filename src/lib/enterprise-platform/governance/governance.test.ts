import { describe, expect, it } from "vitest";
import {
  evaluatePolicies,
  defaultFeatureGates,
  isFeatureEnabled,
  listEventDefinitions,
  negotiateEventCompatibility,
  ENTERPRISE_EVENT_TYPES,
} from "@/lib/enterprise-platform";

describe("governance + events maturity", () => {
  it("denies interface-only production policy", () => {
    const result = evaluatePolicies(
      { platformId: "yike", capabilityId: "passport" },
      undefined,
      { capabilityReadiness: { passport: "interface_only", identity: "production" } },
    );
    expect(result.allowed).toBe(false);
  });

  it("allows identity-backed feature gate", () => {
    expect(isFeatureEnabled("sdk.identity", defaultFeatureGates())).toBe(true);
    expect(isFeatureEnabled("runtime.passport", defaultFeatureGates())).toBe(false);
  });

  it("lists reserved passport/trust/explainability events", () => {
    const defs = listEventDefinitions();
    expect(defs.some((d) => d.eventType === ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED)).toBe(true);
    expect(defs.some((d) => d.eventType === "explainability.decision.recorded")).toBe(true);
    expect(negotiateEventCompatibility(ENTERPRISE_EVENT_TYPES.CONSENT_GRANTED, 1).ok).toBe(true);
  });
});
