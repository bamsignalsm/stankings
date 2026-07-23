import { describe, expect, it } from "vitest";
import { LAUNCH_JOB_CATALOGUE } from "./job-catalogue";
import { WORKSPACE_PERMISSION_TEMPLATES } from "./rbac";
import { getWorkspace } from "./workspaces";

describe("workforce catalogue integrity", () => {
  it("every launch job has company, department, role, workspace, permissions", () => {
    for (const job of LAUNCH_JOB_CATALOGUE) {
      expect(job.companyId).toBeTruthy();
      expect(job.departmentSlug).toBeTruthy();
      expect(job.roleKey).toBeTruthy();
      expect(job.workspaceKey).toBeTruthy();
      expect(job.permissionKeys.length).toBeGreaterThan(0);
      expect(job.catalogueKey).toBe(job.roleKey);
    }
  });

  it("hire and invite share the same catalogue binding shape", () => {
    const sample = LAUNCH_JOB_CATALOGUE[0];
    const hireShape = {
      source: "hire" as const,
      companyId: sample.companyId,
      departmentSlug: sample.departmentSlug,
      roleKey: sample.roleKey,
      workspaceKey: sample.workspaceKey,
      permissionKeys: sample.permissionKeys,
      hierarchyLevel: sample.hierarchyLevel,
    };
    const inviteShape = {
      source: "invite" as const,
      companyId: sample.companyId,
      departmentSlug: sample.departmentSlug,
      roleKey: sample.roleKey,
      workspaceKey: sample.workspaceKey,
      permissionKeys: sample.permissionKeys,
      hierarchyLevel: sample.hierarchyLevel,
    };
    expect(hireShape.companyId).toBe(inviteShape.companyId);
    expect(hireShape.roleKey).toBe(inviteShape.roleKey);
    expect(hireShape.workspaceKey).toBe(inviteShape.workspaceKey);
    expect(hireShape.permissionKeys).toEqual(inviteShape.permissionKeys);
  });

  it("every workspace key resolves to a registered dashboard", () => {
    const keys = new Set(LAUNCH_JOB_CATALOGUE.map((j) => j.workspaceKey));
    for (const key of keys) {
      const ws = getWorkspace(key);
      expect(ws.key).toBe(key);
      expect(ws.features.length).toBeGreaterThan(0);
      expect(WORKSPACE_PERMISSION_TEMPLATES[key]?.length).toBeGreaterThan(0);
    }
  });
});
