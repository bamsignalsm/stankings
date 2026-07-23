/**
 * Enterprise RBAC — resolve grants with hierarchy inheritance metadata.
 * Permissions are stored in workforce_grants / role templates (not hardcoded in UI alone).
 */

import type { HierarchyLevel, WorkforceEmployee } from "./types";

const HIERARCHY_RANK: Record<HierarchyLevel, number> = {
  staff: 1,
  department_manager: 2,
  company_head: 3,
  ceo: 4,
};

export function hierarchyRank(level: HierarchyLevel): number {
  return HIERARCHY_RANK[level] ?? 0;
}

export function canSupervise(
  actor: Pick<WorkforceEmployee, "hierarchy_level" | "company_id" | "department_slug">,
  target: Pick<WorkforceEmployee, "hierarchy_level" | "company_id" | "department_slug">
): boolean {
  if (actor.hierarchy_level === "ceo") return true;
  if (actor.company_id !== target.company_id) return false;
  if (actor.hierarchy_level === "company_head") return true;
  if (
    actor.hierarchy_level === "department_manager" &&
    actor.department_slug === target.department_slug &&
    hierarchyRank(actor.hierarchy_level) > hierarchyRank(target.hierarchy_level)
  ) {
    return true;
  }
  return false;
}

export function hasPermission(
  granted: Iterable<string>,
  permissionKey: string
): boolean {
  const set = granted instanceof Set ? granted : new Set(granted);
  return set.has(permissionKey) || set.has("supervise.company");
}

export function requirePermission(
  granted: Iterable<string>,
  permissionKey: string
): void {
  if (!hasPermission(granted, permissionKey)) {
    throw new Error(`Missing permission: ${permissionKey}`);
  }
}

/** Default template permissions by workspace — seeded into DB at provision time */
export const WORKSPACE_PERMISSION_TEMPLATES: Record<string, string[]> = {
  executive: [
    "office.access",
    "tasks.read",
    "tasks.write",
    "team.read",
    "company.analytics",
    "supervise.company",
  ],
  people_ops: ["office.access", "tasks.read", "tasks.write", "team.read"],
  editorial: [
    "office.access",
    "tasks.read",
    "editorial.read",
    "editorial.write",
    "editorial.publish",
  ],
  public_relations: ["office.access", "tasks.read", "pr.read", "pr.write"],
  customer_support: [
    "office.access",
    "tasks.read",
    "support.read",
    "support.write",
    "support.escalate",
  ],
  moderation: [
    "office.access",
    "tasks.read",
    "moderation.read",
    "moderation.write",
  ],
  operations: ["office.access", "tasks.read", "ops.read", "ops.write"],
  risk_ops: [
    "office.access",
    "tasks.read",
    "ops.read",
    "ops.write",
    "company.analytics",
  ],
  engineering: ["office.access", "tasks.read", "eng.read", "eng.write"],
  education_ops: ["office.access", "tasks.read", "ops.read", "ops.write"],
  foundation_ops: [
    "office.access",
    "tasks.read",
    "ops.read",
    "ops.write",
    "pr.read",
  ],
  sales: ["office.access", "tasks.read", "ops.read", "ops.write"],
  verification: [
    "office.access",
    "tasks.read",
    "ops.read",
    "ops.write",
    "moderation.read",
  ],
  design: ["office.access", "tasks.read", "editorial.read", "editorial.write"],
  growth: [
    "office.access",
    "tasks.read",
    "ops.read",
    "ops.write",
    "company.analytics",
  ],
};
