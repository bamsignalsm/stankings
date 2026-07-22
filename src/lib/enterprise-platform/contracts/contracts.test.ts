import { describe, expect, it } from "vitest";
import {
  listEnterpriseContracts,
  negotiateContract,
  validateEnterpriseContract,
  IDENTITY_PUBLIC_CONTRACT,
  CONTRACT_FRAMEWORK,
} from "@/lib/enterprise-platform/contracts";

describe("enterprise contract framework", () => {
  it("lists identity public contract", () => {
    const contracts = listEnterpriseContracts();
    expect(contracts.some((c) => c.contractId === "identity.subject")).toBe(true);
    expect(CONTRACT_FRAMEWORK.version).toBe("1.0.0");
  });

  it("validates identity contract meta", () => {
    expect(validateEnterpriseContract(IDENTITY_PUBLIC_CONTRACT).valid).toBe(true);
  });

  it("negotiates compatible consumer version", () => {
    const result = negotiateContract({
      consumerPlatformId: "bamsignal",
      requestedContractId: "identity.subject",
      declaredVersion: "1.0.0",
    });
    expect(result.ok).toBe(true);
    expect(result.negotiatedVersion).toBe("1.0.0");
  });

  it("rejects major mismatch", () => {
    const result = negotiateContract({
      consumerPlatformId: "yike",
      requestedContractId: "identity.subject",
      declaredVersion: "2.0.0",
    });
    expect(result.ok).toBe(false);
  });
});
