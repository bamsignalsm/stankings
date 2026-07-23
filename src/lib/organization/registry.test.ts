import { describe, expect, it } from "vitest";
import { COMPANY_REGISTRY } from "@/lib/shared/company/registry";
import {
  ORG_ROLE_TEMPLATES,
  PHASE1_RECRUITING_COMPANY_IDS,
  defaultRecruitmentStatus,
  getOrgCompanies,
  getPhase1Roles,
} from "./registry";

describe("Organization Registry", () => {
  it("includes every COMPANY_REGISTRY company", () => {
    const ids = new Set(getOrgCompanies().map((c) => c.id));
    for (const c of COMPANY_REGISTRY) {
      expect(ids.has(c.id)).toBe(true);
    }
  });

  it("marks Phase 1 companies as recruiting", () => {
    for (const id of PHASE1_RECRUITING_COMPANY_IDS) {
      expect(defaultRecruitmentStatus(id)).toBe("recruiting");
    }
  });

  it("exposes exactly the Founder Phase 1 launch roles as publishable", () => {
    const roles = getPhase1Roles();
    expect(roles).toHaveLength(12);
    expect(roles.every((r) => r.publishVacancy && r.phase === 1)).toBe(true);
  });

  it("keeps Phase 2 templates unpublished", () => {
    const phase2 = ORG_ROLE_TEMPLATES.filter((r) => r.phase === 2);
    expect(phase2.length).toBeGreaterThan(0);
    expect(phase2.every((r) => !r.publishVacancy)).toBe(true);
  });
});
