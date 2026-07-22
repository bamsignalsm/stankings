import { describe, expect, it } from "vitest";
import {
  buildEnterpriseRegistryCatalogue,
  validateCrossRegistryConsistency,
  listCompanyIds,
  getCompanyById,
} from "@/lib/enterprise-platform/registry";

describe("enterprise registry runtime", () => {
  it("builds catalogues with capabilities and services", () => {
    const cat = buildEnterpriseRegistryCatalogue();
    expect(cat.capabilities.some((c) => c.capabilityId === "identity")).toBe(true);
    expect(cat.services.length).toBeGreaterThan(0);
    expect(cat.versions.some((v) => v.artifactId === "identity-runtime")).toBe(true);
  });

  it("passes cross-registry consistency", () => {
    const result = validateCrossRegistryConsistency();
    expect(result.valid).toBe(true);
  });

  it("reads company registry via service surface", () => {
    const ids = listCompanyIds();
    expect(ids.length).toBeGreaterThan(0);
    expect(getCompanyById(ids[0])?.id).toBe(ids[0]);
  });
});
