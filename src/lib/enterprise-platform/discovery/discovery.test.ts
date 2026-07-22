import { describe, expect, it } from "vitest";
import {
  buildDiscoverySnapshot,
  queryDiscovery,
  negotiateCapabilities,
  assessDiscoveryEightGates,
} from "@/lib/enterprise-platform/discovery";

describe("discovery runtime", () => {
  it("builds a healthy snapshot with identity + discovery contracts", () => {
    const snap = buildDiscoverySnapshot();
    expect(snap.health).toBe("healthy");
    expect(snap.capabilities.some((c) => c.capabilityId === "identity")).toBe(true);
    expect(snap.contracts.some((c) => c.contractId === "discovery.runtime")).toBe(true);
    expect(snap.sdk.packageName).toBe("@stankings/platform-sdk");
  });

  it("filters production-ready capabilities", () => {
    const snap = queryDiscovery({ requireProductionReady: true });
    expect(snap.capabilities.every((c) => c.runtimeReadiness === "production")).toBe(true);
    expect(snap.capabilities.some((c) => c.capabilityId === "identity")).toBe(true);
  });

  it("negotiates core enterprise capabilities including explainability", () => {
    const result = negotiateCapabilities({
      platformId: "bamsignal",
      requiredCapabilities: ["identity", "passport", "trust", "explainability"],
      declaredContractVersions: {
        identity: "1.0.0",
        passport: "1.0.0",
        trust: "1.0.0",
        explainability: "1.0.0",
      },
    });
    expect(result.granted).toEqual(
      expect.arrayContaining(["identity", "passport", "trust", "explainability"]),
    );
    expect(result.ok).toBe(true);
  });

  it("denies unknown capabilities", () => {
    const result = negotiateCapabilities({
      platformId: "bamsignal",
      requiredCapabilities: ["identity", "not_a_real_capability"],
      declaredContractVersions: { identity: "1.0.0" },
    });
    expect(result.granted).toContain("identity");
    expect(result.denied.some((d) => d.capabilityId === "not_a_real_capability")).toBe(true);
    expect(result.ok).toBe(false);
  });

  it("clears eight gates with G3 N/A", () => {
    const report = assessDiscoveryEightGates();
    expect(report.complete).toBe(true);
  });
});
