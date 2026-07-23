/**
 * Launch job catalogue — LEGACY seed catalogue.
 * Authoritative roles + vacancies now live in `@/lib/organization/registry` (ORG_ROLE_TEMPLATES).
 * WorkspaceKey type and permission defaults remain here for shared typing.
 */

export type WorkspaceKey =
  | "executive"
  | "people_ops"
  | "editorial"
  | "public_relations"
  | "customer_support"
  | "moderation"
  | "operations"
  | "risk_ops"
  | "engineering"
  | "education_ops"
  | "foundation_ops"
  | "sales"
  | "verification"
  | "design"
  | "growth";

export interface JobCatalogueEntry {
  catalogueKey: string;
  title: string;
  companyId: string;
  companyArea: string;
  departmentSlug: string;
  roleKey: string;
  workspaceKey: WorkspaceKey;
  employmentType: string;
  location: string;
  responsibilities: string;
  requiredSkills: string;
  reportingManagerTitle: string;
  description: string;
  permissionKeys: string[];
  hierarchyLevel: "ceo" | "company_head" | "department_manager" | "staff";
}

const LOC = "Stankings HQ, Abia State, Nigeria / Hybrid";

function job(
  partial: Omit<JobCatalogueEntry, "employmentType" | "location" | "permissionKeys" | "hierarchyLevel"> &
    Partial<Pick<JobCatalogueEntry, "employmentType" | "location" | "permissionKeys" | "hierarchyLevel">>
): JobCatalogueEntry {
  const ws = partial.workspaceKey;
  const defaults: Record<string, string[]> = {
    executive: ["office.access", "tasks.read", "tasks.write", "team.read", "company.analytics", "supervise.company"],
    people_ops: ["office.access", "tasks.read", "tasks.write", "team.read"],
    editorial: ["office.access", "tasks.read", "editorial.read", "editorial.write", "editorial.publish"],
    public_relations: ["office.access", "tasks.read", "pr.read", "pr.write"],
    customer_support: ["office.access", "tasks.read", "support.read", "support.write", "support.escalate"],
    moderation: ["office.access", "tasks.read", "moderation.read", "moderation.write"],
    operations: ["office.access", "tasks.read", "ops.read", "ops.write"],
    risk_ops: ["office.access", "tasks.read", "ops.read", "ops.write", "company.analytics"],
    engineering: ["office.access", "tasks.read", "eng.read", "eng.write"],
    education_ops: ["office.access", "tasks.read", "ops.read", "ops.write"],
    foundation_ops: ["office.access", "tasks.read", "ops.read", "ops.write", "pr.read"],
    sales: ["office.access", "tasks.read", "ops.read", "ops.write"],
    verification: ["office.access", "tasks.read", "ops.read", "ops.write", "moderation.read"],
    design: ["office.access", "tasks.read", "editorial.read", "editorial.write"],
    growth: ["office.access", "tasks.read", "ops.read", "ops.write", "company.analytics"],
  };
  return {
    employmentType: "full-time",
    location: LOC,
    hierarchyLevel: "staff",
    permissionKeys: defaults[ws] ?? ["office.access", "tasks.read"],
    ...partial,
  };
}

function area(companyId: string): string {
  const map: Record<string, string> = {
    hq: "Stankings Legacy Ltd (Corporate)",
    "stankings-times": "Media & Communications",
    bamsignal: "Relationship and Community Services",
    yike: "Marketplace Services",
    bayright: "Financial Services",
    stanhan: "Property Development and Real Estate Services",
    "stankings-auto-hub": "Automotive Services",
    "hannahkings-education": "Education",
    "hannahkings-gadgets": "Technology Procurement and Digital Infrastructure",
    "stankings-foundation": "Community Development and Philanthropy",
  };
  return map[companyId] ?? companyId;
}

function mk(
  companyId: string,
  departmentSlug: string,
  title: string,
  workspaceKey: WorkspaceKey,
  extras?: Partial<JobCatalogueEntry>
): JobCatalogueEntry {
  const roleKey = `${companyId}.${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const base = {
    catalogueKey: roleKey,
    title,
    companyId,
    companyArea: area(companyId),
    departmentSlug,
    roleKey,
    workspaceKey,
    reportingManagerTitle: extras?.reportingManagerTitle ?? "Department Manager",
    responsibilities:
      extras?.responsibilities ??
      `Deliver excellence as ${title} for the company.`,
    requiredSkills:
      extras?.requiredSkills ??
      "Professional communication, institutional discipline, digital literacy",
    description:
      extras?.description ??
      `${title} — ${area(companyId)}. Join Stankings Legacy Ltd ecosystem.`,
  };
  return job({
    ...base,
    ...(extras?.hierarchyLevel ? { hierarchyLevel: extras.hierarchyLevel } : {}),
    ...(extras?.permissionKeys ? { permissionKeys: extras.permissionKeys } : {}),
    ...(extras?.employmentType ? { employmentType: extras.employmentType } : {}),
    ...(extras?.location ? { location: extras.location } : {}),
  });
}

export const LAUNCH_JOB_CATALOGUE: JobCatalogueEntry[] = [
  // Group
  mk("hq", "executive", "Chief Operating Officer", "executive", { hierarchyLevel: "company_head", reportingManagerTitle: "CEO", responsibilities: "Lead Group operations across subsidiaries; own operational cadence and cross-company delivery." }),
  mk("hq", "executive", "Executive Assistant", "executive", { reportingManagerTitle: "CEO" }),
  mk("hq", "human-resources", "Human Resources Manager", "people_ops", { hierarchyLevel: "department_manager", reportingManagerTitle: "COO" }),
  mk("hq", "finance", "Finance Manager", "operations", { hierarchyLevel: "department_manager", reportingManagerTitle: "COO" }),
  mk("hq", "legal-compliance", "Legal & Compliance Officer", "operations", { reportingManagerTitle: "COO" }),
  mk("hq", "administration", "Administrative Officer", "operations"),
  mk("hq", "business-development", "Business Development Manager", "growth", { hierarchyLevel: "department_manager" }),
  mk("hq", "executive", "Executive Secretary", "executive"),
  mk("hq", "administration", "Reception Officer", "operations"),

  // Times
  mk("stankings-times", "editorial", "Editor-in-Chief", "editorial", { hierarchyLevel: "company_head", reportingManagerTitle: "CEO", permissionKeys: ["office.access", "tasks.read", "editorial.read", "editorial.write", "editorial.publish", "pr.read", "supervise.company", "company.analytics"] }),
  mk("stankings-times", "editorial", "Managing Editor", "editorial", { hierarchyLevel: "department_manager", reportingManagerTitle: "Editor-in-Chief" }),
  mk("stankings-times", "content", "Content Manager", "editorial", { hierarchyLevel: "department_manager", responsibilities: "Own draft-to-publish news workflow, categories, featured stories, media library, social posts, SEO checklist, and editorial calendar." }),
  mk("stankings-times", "editorial", "News Editor", "editorial"),
  mk("stankings-times", "editorial", "Journalist", "editorial"),
  mk("stankings-times", "editorial", "Investigative Reporter", "editorial"),
  mk("stankings-times", "editorial", "Business Reporter", "editorial"),
  mk("stankings-times", "editorial", "Technology Reporter", "editorial"),
  mk("stankings-times", "editorial", "Entertainment Reporter", "editorial"),
  mk("stankings-times", "marketing", "Social Media Manager", "growth"),
  mk("stankings-times", "public-relations", "Public Relations Manager", "public_relations", { hierarchyLevel: "department_manager", responsibilities: "Press requests, media contacts, campaign calendar, statements, events, crisis queue." }),
  mk("stankings-times", "design", "Graphic Designer", "design"),
  mk("stankings-times", "media", "Video Editor", "design"),
  mk("stankings-times", "media", "Photographer", "design"),
  mk("stankings-times", "marketing", "Community Manager", "growth"),
  mk("stankings-times", "content", "SEO Content Specialist", "editorial"),

  // BamSignal
  mk("bamsignal", "customer-support", "Customer Support Specialist", "customer_support"),
  mk("bamsignal", "customer-support", "Senior Customer Support", "customer_support", { hierarchyLevel: "department_manager" }),
  mk("bamsignal", "moderation-trust", "Trust & Safety Moderator", "moderation"),
  mk("bamsignal", "moderation-trust", "Content Moderator", "moderation"),
  mk("bamsignal", "moderation-trust", "Profile Verification Officer", "verification"),
  mk("bamsignal", "growth", "Community Manager", "growth"),
  mk("bamsignal", "growth", "Growth Marketing Executive", "growth"),
  mk("bamsignal", "customer-success", "CRM Specialist", "customer_support"),

  // Yike
  mk("yike", "customer-support", "Customer Support Specialist", "customer_support"),
  mk("yike", "moderation-trust", "Marketplace Moderator", "moderation"),
  mk("yike", "moderation-trust", "Listing Verification Officer", "verification"),
  mk("yike", "customer-success", "Dealer Success Manager", "customer_support", { hierarchyLevel: "department_manager" }),
  mk("yike", "moderation-trust", "Fraud Review Officer", "moderation"),
  mk("yike", "moderation-trust", "Trust & Safety Officer", "moderation"),
  mk("yike", "operations", "Operations Coordinator", "operations"),

  // BayRight
  mk("bayright", "customer-support", "Customer Support Specialist", "customer_support"),
  mk("bayright", "operations", "Settlement Operations Officer", "risk_ops"),
  mk("bayright", "operations", "Payment Operations Officer", "risk_ops"),
  mk("bayright", "operations", "Risk Analyst", "risk_ops"),
  mk("bayright", "operations", "Fraud Monitoring Officer", "risk_ops"),
  mk("bayright", "legal-compliance", "Compliance Officer", "operations"),

  // Stanhan
  mk("stanhan", "operations", "Property Verification Officer", "verification"),
  mk("stanhan", "sales", "Property Consultant", "sales"),
  mk("stanhan", "sales", "Sales Executive", "sales"),
  mk("stanhan", "operations", "Inspection Officer", "verification"),
  mk("stanhan", "customer-success", "Client Success Officer", "customer_support"),

  // Auto Hub
  mk("stankings-auto-hub", "operations", "Vehicle Verification Officer", "verification"),
  mk("stankings-auto-hub", "operations", "Inspection Officer", "verification"),
  mk("stankings-auto-hub", "sales", "Sales Consultant", "sales"),
  mk("stankings-auto-hub", "customer-success", "Customer Success Officer", "customer_support"),
  mk("stankings-auto-hub", "operations", "Fleet Coordinator", "operations"),

  // Education
  mk("hannahkings-education", "administration", "Academic Administrator", "education_ops", { hierarchyLevel: "department_manager" }),
  mk("hannahkings-education", "administration", "Admissions Officer", "education_ops"),
  mk("hannahkings-education", "customer-success", "Student Success Officer", "education_ops"),
  mk("hannahkings-education", "operations", "Learning Coordinator", "education_ops"),
  mk("hannahkings-education", "operations", "Community Officer", "education_ops"),

  // Gadgets
  mk("hannahkings-gadgets", "sales", "Sales Executive", "sales"),
  mk("hannahkings-gadgets", "operations", "Procurement Officer", "operations"),
  mk("hannahkings-gadgets", "customer-support", "Customer Support", "customer_support"),
  mk("hannahkings-gadgets", "operations", "Inventory Officer", "operations"),

  // Foundation
  mk("stankings-foundation", "operations", "Programme Coordinator", "foundation_ops"),
  mk("stankings-foundation", "operations", "Volunteer Coordinator", "foundation_ops"),
  mk("stankings-foundation", "marketing", "Community Engagement Officer", "foundation_ops"),
  mk("stankings-foundation", "public-relations", "Communications Officer", "public_relations"),

  // GENERAL engineering under hq
  mk("hq", "engineering", "UI/UX Designer", "design"),
  mk("hq", "engineering", "Frontend Engineer", "engineering"),
  mk("hq", "engineering", "Backend Engineer", "engineering"),
  mk("hq", "engineering", "Full Stack Engineer", "engineering"),
  mk("hq", "engineering", "DevOps Engineer", "engineering"),
  mk("hq", "quality-assurance", "QA Engineer", "engineering"),
  mk("hq", "engineering", "Cloud Engineer", "engineering"),
  mk("hq", "security", "Cybersecurity Engineer", "engineering"),
  mk("hq", "engineering", "AI Engineer", "engineering"),
  mk("hq", "data-analytics", "Data Analyst", "engineering"),
];

export const WORKFORCE_COMPANY_IDS = [
  "hq",
  "stankings-times",
  "bamsignal",
  "yike",
  "bayright",
  "stanhan",
  "stankings-auto-hub",
  "hannahkings-education",
  "hannahkings-gadgets",
  "stankings-foundation",
] as const;

export const DEPARTMENT_CATALOGUE: { slug: string; name: string }[] = [
  { slug: "executive", name: "Executive" },
  { slug: "administration", name: "Administration" },
  { slug: "operations", name: "Operations" },
  { slug: "finance", name: "Finance" },
  { slug: "technology", name: "Technology" },
  { slug: "engineering", name: "Engineering" },
  { slug: "customer-success", name: "Customer Success" },
  { slug: "customer-support", name: "Customer Support" },
  { slug: "moderation-trust", name: "Moderation & Trust" },
  { slug: "editorial", name: "Editorial" },
  { slug: "marketing", name: "Marketing" },
  { slug: "public-relations", name: "Public Relations" },
  { slug: "sales", name: "Sales" },
  { slug: "business-development", name: "Business Development" },
  { slug: "legal-compliance", name: "Legal & Compliance" },
  { slug: "human-resources", name: "Human Resources" },
  { slug: "people-operations", name: "People Operations" },
  { slug: "content", name: "Content" },
  { slug: "media", name: "Media" },
  { slug: "design", name: "Design" },
  { slug: "creative", name: "Creative" },
  { slug: "growth", name: "Growth" },
  { slug: "product", name: "Product" },
  { slug: "quality-assurance", name: "Quality Assurance" },
  { slug: "security", name: "Security" },
  { slug: "data-analytics", name: "Data & Analytics" },
];
