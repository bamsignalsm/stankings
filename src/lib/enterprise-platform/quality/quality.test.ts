import { describe, expect, it } from "vitest";
import {
  compareSemVer,
  checkContractCompatibility,
  createEnterpriseError,
  ENTERPRISE_ERROR_CODES,
  evaluateEightGates,
  validationOk,
  validationFail,
  mergeValidationResults,
} from "@/lib/enterprise-platform/quality";

describe("quality foundation", () => {
  it("compares semver", () => {
    expect(compareSemVer("1.0.0", "1.0.1")).toBe(-1);
    expect(compareSemVer("2.0.0", "1.9.9")).toBe(1);
    expect(compareSemVer("1.2.3", "1.2.3")).toBe(0);
  });

  it("checks contract compatibility on major", () => {
    expect(checkContractCompatibility("0.1.0", "0.1.0").compatible).toBe(true);
    expect(checkContractCompatibility("0.1.0", "1.0.0").compatible).toBe(false);
  });

  it("creates enterprise errors", () => {
    const err = createEnterpriseError({
      code: ENTERPRISE_ERROR_CODES.IDENTITY_VERSION_CONFLICT,
      message: "conflict",
      capability: "identity",
      retryable: true,
    });
    expect(err.retryable).toBe(true);
    expect(err.code).toBe("IDENTITY_VERSION_CONFLICT");
  });

  it("merges validation results", () => {
    const merged = mergeValidationResults(
      validationOk(["w1"]),
      validationFail(["e1"], ["w2"]),
    );
    expect(merged.valid).toBe(false);
    expect(merged.errors).toEqual(["e1"]);
    expect(merged.warnings).toEqual(["w1", "w2"]);
  });

  it("evaluates eight gates incomplete when partial", () => {
    const report = evaluateEightGates("demo", [
      {
        gateId: "G1_executable_runtime",
        status: "satisfied",
        evidence: "ok",
        gaps: [],
      },
      {
        gateId: "G2_stable_public_contracts",
        status: "partial",
        evidence: "partial",
        gaps: ["sdk"],
      },
    ]);
    expect(report.complete).toBe(false);
  });
});
