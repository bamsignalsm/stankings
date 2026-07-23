import { describe, expect, it } from "vitest";
import { canSupervise, hasPermission, hierarchyRank } from "./rbac";

describe("workforce RBAC", () => {
  it("ranks hierarchy", () => {
    expect(hierarchyRank("ceo")).toBeGreaterThan(hierarchyRank("staff"));
  });

  it("allows company head to supervise same company", () => {
    expect(
      canSupervise(
        {
          hierarchy_level: "company_head",
          company_id: "bamsignal",
          department_slug: "executive",
        },
        {
          hierarchy_level: "staff",
          company_id: "bamsignal",
          department_slug: "customer-support",
        }
      )
    ).toBe(true);
  });

  it("blocks cross-company supervision", () => {
    expect(
      canSupervise(
        {
          hierarchy_level: "company_head",
          company_id: "bamsignal",
          department_slug: "executive",
        },
        {
          hierarchy_level: "staff",
          company_id: "yike",
          department_slug: "customer-support",
        }
      )
    ).toBe(false);
  });

  it("checks permission grants", () => {
    expect(hasPermission(["office.access", "support.write"], "support.write")).toBe(
      true
    );
    expect(hasPermission(["office.access"], "support.write")).toBe(false);
  });
});
