/**
 * Organization Registry — authoritative enterprise structure.
 *
 * Stankings Group → Company → Department → Team → Role → Employee → Workspace
 * Consumed by RBAC, Careers, routing, charts, and future HR modules.
 */

import { COMPANY_REGISTRY, type CompanyRecord } from "@/lib/shared/company/registry";
import type { WorkspaceKey } from "@/lib/workforce/job-catalogue";

export type RecruitmentStatus =
  | "recruiting"
  | "hiring_soon"
  | "internal_only"
  | "not_recruiting";

export const RECRUITMENT_STATUS_LABELS: Record<RecruitmentStatus, string> = {
  recruiting: "Recruiting",
  hiring_soon: "Hiring Soon",
  internal_only: "Internal Recruitment Only",
  not_recruiting: "Not Recruiting",
};

export interface OrgCompany {
  id: string;
  name: string;
  legalName: string;
  recruitmentStatus: RecruitmentStatus;
  registry: CompanyRecord;
}

export interface OrgDepartment {
  companyId: string;
  slug: string;
  name: string;
}

export interface OrgTeam {
  companyId: string;
  departmentSlug: string;
  slug: string;
  name: string;
}

export interface OrgRoleTemplate {
  companyId: string;
  departmentSlug: string;
  teamSlug: string;
  roleKey: string;
  title: string;
  workspaceKey: WorkspaceKey;
  hierarchyLevel: "ceo" | "company_head" | "department_manager" | "staff";
  phase: 1 | 2;
  /** When true, seed as published recruiting vacancy */
  publishVacancy: boolean;
}

/** Phase 1 companies actively recruiting with full workspaces */
export const PHASE1_RECRUITING_COMPANY_IDS = [
  "hq",
  "stankings-times",
  "bamsignal",
  "yike",
  "bayright",
] as const;

/** Default recruitment status by company */
export function defaultRecruitmentStatus(companyId: string): RecruitmentStatus {
  if ((PHASE1_RECRUITING_COMPANY_IDS as readonly string[]).includes(companyId)) {
    return "recruiting";
  }
  if (companyId === "hq") return "recruiting";
  return "hiring_soon";
}

export function getOrgCompanies(): OrgCompany[] {
  return COMPANY_REGISTRY.map((c) => ({
    id: c.id,
    name: c.name,
    legalName: c.legalName,
    recruitmentStatus: defaultRecruitmentStatus(c.id),
    registry: c,
  }));
}

/** Subsidiary + HQ for workforce org (exclude nothing — all registry) */
export function getWorkforceOrgCompanies(): OrgCompany[] {
  return getOrgCompanies();
}

export const ORG_DEPARTMENT_CATALOGUE: OrgDepartment[] = [
  // HQ
  { companyId: "hq", slug: "human-resources", name: "Human Resources" },
  { companyId: "hq", slug: "people-operations", name: "People Operations" },
  { companyId: "hq", slug: "administration", name: "Administration" },
  { companyId: "hq", slug: "executive", name: "Executive" },
  { companyId: "hq", slug: "engineering", name: "Engineering" },
  // Times
  { companyId: "stankings-times", slug: "content", name: "Content" },
  { companyId: "stankings-times", slug: "public-relations", name: "Public Relations" },
  { companyId: "stankings-times", slug: "marketing", name: "Marketing" },
  { companyId: "stankings-times", slug: "editorial", name: "Editorial" },
  // BamSignal
  { companyId: "bamsignal", slug: "customer-support", name: "Customer Support" },
  { companyId: "bamsignal", slug: "moderation-trust", name: "Moderation & Trust" },
  // Yike
  { companyId: "yike", slug: "customer-support", name: "Customer Support" },
  { companyId: "yike", slug: "moderation-trust", name: "Moderation & Trust" },
  // BayRight
  { companyId: "bayright", slug: "customer-support", name: "Customer Support" },
  { companyId: "bayright", slug: "operations", name: "Operations" },
  // Phase 2 defaults for remaining companies
  ...COMPANY_REGISTRY.filter(
    (c) =>
      ![
        "hq",
        "stankings-times",
        "bamsignal",
        "yike",
        "bayright",
      ].includes(c.id)
  ).flatMap((c) => [
    { companyId: c.id, slug: "operations", name: "Operations" },
    { companyId: c.id, slug: "administration", name: "Administration" },
    { companyId: c.id, slug: "customer-support", name: "Customer Support" },
  ]),
];

export function defaultTeamFor(
  companyId: string,
  departmentSlug: string
): OrgTeam {
  return {
    companyId,
    departmentSlug,
    slug: "core",
    name: "Core Team",
  };
}

/**
 * Phase 1 launch vacancies (publish) + Phase 2 role templates (no public vacancy).
 */
export const ORG_ROLE_TEMPLATES: OrgRoleTemplate[] = [
  // Phase 1 — HQ
  {
    companyId: "hq",
    departmentSlug: "people-operations",
    teamSlug: "core",
    roleKey: "hq.hr-people-operations",
    title: "HR / People Operations",
    workspaceKey: "people_ops",
    hierarchyLevel: "department_manager",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "hq",
    departmentSlug: "human-resources",
    teamSlug: "core",
    roleKey: "hq.recruitment-officer",
    title: "Recruitment Officer",
    workspaceKey: "people_ops",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "hq",
    departmentSlug: "administration",
    teamSlug: "core",
    roleKey: "hq.administrative-officer",
    title: "Administrative Officer",
    workspaceKey: "operations",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  // Phase 1 — Times
  {
    companyId: "stankings-times",
    departmentSlug: "content",
    teamSlug: "core",
    roleKey: "stankings-times.content-manager",
    title: "Content Manager",
    workspaceKey: "editorial",
    hierarchyLevel: "department_manager",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "stankings-times",
    departmentSlug: "public-relations",
    teamSlug: "core",
    roleKey: "stankings-times.public-relations-officer",
    title: "Public Relations Officer",
    workspaceKey: "public_relations",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "stankings-times",
    departmentSlug: "marketing",
    teamSlug: "core",
    roleKey: "stankings-times.social-media-manager",
    title: "Social Media Manager",
    workspaceKey: "growth",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  // Phase 1 — BamSignal
  {
    companyId: "bamsignal",
    departmentSlug: "customer-support",
    teamSlug: "core",
    roleKey: "bamsignal.customer-support",
    title: "Customer Support",
    workspaceKey: "customer_support",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "bamsignal",
    departmentSlug: "moderation-trust",
    teamSlug: "core",
    roleKey: "bamsignal.trust-safety-moderator",
    title: "Trust & Safety Moderator",
    workspaceKey: "moderation",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  // Phase 1 — Yike
  {
    companyId: "yike",
    departmentSlug: "customer-support",
    teamSlug: "core",
    roleKey: "yike.customer-support",
    title: "Customer Support",
    workspaceKey: "customer_support",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "yike",
    departmentSlug: "moderation-trust",
    teamSlug: "core",
    roleKey: "yike.marketplace-moderator",
    title: "Marketplace Moderator",
    workspaceKey: "moderation",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  // Phase 1 — BayRight
  {
    companyId: "bayright",
    departmentSlug: "customer-support",
    teamSlug: "core",
    roleKey: "bayright.customer-support",
    title: "Customer Support",
    workspaceKey: "customer_support",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  {
    companyId: "bayright",
    departmentSlug: "operations",
    teamSlug: "core",
    roleKey: "bayright.risk-operations-officer",
    title: "Risk & Operations Officer",
    workspaceKey: "risk_ops",
    hierarchyLevel: "staff",
    phase: 1,
    publishVacancy: true,
  },
  // Phase 2 — template roles for remaining companies (no public vacancy)
  ...COMPANY_REGISTRY.filter(
    (c) =>
      ![
        "hq",
        "stankings-times",
        "bamsignal",
        "yike",
        "bayright",
      ].includes(c.id)
  ).flatMap((c): OrgRoleTemplate[] => [
    {
      companyId: c.id,
      departmentSlug: "operations",
      teamSlug: "core",
      roleKey: `${c.id}.operations-coordinator`,
      title: "Operations Coordinator",
      workspaceKey: "operations",
      hierarchyLevel: "staff",
      phase: 2,
      publishVacancy: false,
    },
    {
      companyId: c.id,
      departmentSlug: "administration",
      teamSlug: "core",
      roleKey: `${c.id}.company-head`,
      title: "Company Head",
      workspaceKey: "executive",
      hierarchyLevel: "company_head",
      phase: 2,
      publishVacancy: false,
    },
  ]),
];

export function getPhase1Roles(): OrgRoleTemplate[] {
  return ORG_ROLE_TEMPLATES.filter((r) => r.phase === 1 && r.publishVacancy);
}

export function getOrgDepartmentsForCompany(companyId: string): OrgDepartment[] {
  return ORG_DEPARTMENT_CATALOGUE.filter((d) => d.companyId === companyId);
}

export const ORGANIZATION_REGISTRY_MANIFEST = {
  registryId: "organization-registry",
  name: "Organization Registry",
  owner: "Stankings Legacy Ltd",
  version: "1.0.0",
  isSingleSourceOfTruth: true,
  notes:
    "Authoritative for RBAC, careers, routing, org charts, and future HR modules. Do not fork org trees in product repos.",
} as const;
