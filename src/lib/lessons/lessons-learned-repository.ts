/**
 * Lessons Learned Repository — structured institutional memory per CANON-009
 */

export type LLRApprovalStatus = "draft" | "under_review" | "approved";
export type LLRProjectCategory = (typeof LLR_PROJECT_CATEGORIES)[number];

export const LLR_PROJECT_CATEGORIES = [
  "Software release or platform launch",
  "Property development or major transaction",
  "Logistics rollout or operational expansion",
  "Customer incident or service failure",
  "Governance or constitutional review",
  "Strategic project or institutional initiative",
] as const;

export interface LessonsLearnedRecord {
  identifier: string;
  title: string;
  approvalStatus: LLRApprovalStatus;
  category: LLRProjectCategory;
  projectSummary: string;
  objectives: string[];
  outcomes: string[];
  successes: string[];
  challenges: string[];
  rootCauses: string[];
  lessonsLearned: string[];
  recommendedImprovements: string[];
  relatedCanons: string[];
  relatedKnowledgeObjects: { identifier: string; title: string; href: string }[];
  teamsInvolved: string[];
  reviewDate: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export const LLR_EXAMPLE_IKI: LessonsLearnedRecord = {
  identifier: "LLR-IKI-001",
  title: "Volume 0 Canon Chain & IKI Platform Foundation",
  approvalStatus: "approved",
  category: "Strategic project or institutional initiative",
  projectSummary:
    "Implementation of CANON-002 through CANON-008, decision frameworks (PAF, TIA, EIA, GRF, IDR, EXF), the Lexicon Engine, Ecosystem Map, Excellence Standards, and IKI institutional graph — establishing the Institutional Knowledge Infrastructure beneath the Stankings Library.",
  objectives: [
    "Transform Volume 0 philosophy into operational decision and culture systems",
    "Establish LS-001 Knowledge Objects and LS-002 Lexicon as authoritative sources",
    "Build searchable, cross-referenced institutional memory within IKI",
    "Create repeatable patterns for future canon and framework implementation",
  ],
  outcomes: [
    "Eight canons operational with frameworks, registries, and UI",
    "Decision stack PAF → TIA → EIA → GRF enforced in institutional rules",
    "IDR and Excellence Standards registries live for members",
    "Institutional graph connects canons, frameworks, companies, and capabilities",
  ],
  successes: [
    "Consistent implementation pattern across canons reduced delivery friction",
    "Route groups and static seed enabled development without blocking on DB migrations",
    "Cross-linking between canons, frameworks, and registries strengthened discoverability",
    "Executive Decisions documented alongside frameworks created clear governance trail",
  ],
  challenges: [
    "Volume of interconnected content required careful dependency ordering",
    "Balancing editorial completeness with shipping incremental value",
    "Remote Supabase migrations sometimes behind static seed — dual-source complexity",
  ],
  rootCauses: [
    "Greenfield IKI architecture with no prior pattern library in codebase",
    "Philosophy-to-operations gap required both content and engineering simultaneously",
  ],
  lessonsLearned: [
    "Canon → Framework → Registry is the correct implementation sequence for Volume 0",
    "Static seed in library-engine enables member experience before DB catch-up",
    "Each canon should declare upstream/downstream dependencies in extended metadata from day one",
    "Executive Decisions should ship with their operational framework, not after",
    "IKI graph edges should be updated with every new canon — search intelligence compounds",
  ],
  recommendedImprovements: [
    "Automate knowledge object seed sync verification against Supabase",
    "Template generator for new canon/framework/registry triplets",
    "Learning Path in Custodian Programme should reference completed LLRs",
    "Apply LLR to every future canon implementation before closing the initiative",
  ],
  relatedCanons: ["CANON-006", "CANON-007", "CANON-008", "CANON-009"],
  relatedKnowledgeObjects: [
    { identifier: "LS-001", title: "Knowledge Object Standard", href: "/library/standards/ls-001" },
    { identifier: "LS-002", title: "The Stankings Lexicon", href: "/library/standards/ls-002" },
    { identifier: "IDR-IKI-001", title: "IKI Naming Decision", href: "/library/decisions/IDR-IKI-001" },
    { identifier: "FRAMEWORK-IDR-001", title: "Institutional Decision Record", href: "/library/frameworks/institutional-decision-record" },
  ],
  teamsInvolved: ["Library Council", "Institutional Builder (IKI)", "Engineering"],
  reviewDate: "2026-06-27",
  approvedBy: "Library Council",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",
};

export const LLR_EXAMPLE_AUTH: LessonsLearnedRecord = {
  identifier: "LLR-AUTH-001",
  title: "Member & Energy Console Authentication Routing",
  approvalStatus: "approved",
  category: "Software release or platform launch",
  projectSummary:
    "Separation of member authentication (/auth/login, /auth/register) from discreet energy console access (/energy/auth), migration of administration from /admin to /energy/*, and env-driven credential seeding for staging.",
  objectives: [
    "Protect institutional documents with member approval workflow",
    "Provide discreet super-admin entrance not linked from public navigation",
    "Enable credential rotation at go-live via environment variables",
    "Preserve legacy /login and /signup redirects for bookmarks",
  ],
  outcomes: [
    "Member and admin auth paths fully separated in middleware",
    "Energy console at /energy with route group layout excluding auth page",
    "seed:auth script for admin and temp member accounts",
    "No public navigation links to energy console",
  ],
  successes: [
    "auth-paths.ts centralised URL constants — single source for routing",
    "Route group (console) cleanly separated login from panel layout",
    "Middleware resolveEnergyNext prevents invalid post-login redirects",
  ],
  challenges: [
    "Service role key required for user seeding — not always in local env",
    "Many scattered /admin links required systematic migration",
  ],
  rootCauses: [
    "Initial admin at /admin was discoverable and conflated with public site",
    "Auth grew organically before discreet operations model was defined",
  ],
  lessonsLearned: [
    "Security through discretion: admin paths should not appear in public nav",
    "Centralise auth path constants before multiplying link references",
    "Seed scripts should load .env.local and document required keys explicitly",
    "CANON-007 applies to auth: document routing decisions in an IDR",
  ],
  recommendedImprovements: [
    "Create IDR-AUTH-001 for routing architecture decision",
    "Add health check that verifies seed:auth prerequisites in dev onboarding",
    "Document energy console access in internal onboarding only",
  ],
  relatedCanons: ["CANON-002", "CANON-007", "CANON-009"],
  relatedKnowledgeObjects: [
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007" },
  ],
  teamsInvolved: ["Engineering", "Library Council"],
  reviewDate: "2026-06-27",
  approvedBy: "Library Council",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",
};

export const LLR_EXAMPLE_RETRO: LessonsLearnedRecord = {
  identifier: "LLR-ENG-001",
  title: "Incident Retrospective — Staging Deployment Configuration",
  approvalStatus: "approved",
  category: "Customer incident or service failure",
  projectSummary:
    "Near-miss during staging deployment where environment variables were incomplete, causing auth seed failure and member redirect loops. Resolved before production impact.",
  objectives: [
    "Identify root cause of auth middleware redirect loop in staging",
    "Document configuration requirements for future deployments",
    "Strengthen pre-deployment checklist without blame",
  ],
  outcomes: [
    "Missing SUPABASE_SERVICE_ROLE_KEY identified as seed blocker",
    "Middleware matcher updated to include /energy root path",
    "Pre-deploy checklist item added for auth env verification",
    "No production customer impact",
  ],
  successes: [
    "Issue caught in staging — Learning Test worked as near-miss capture",
    "Team focused retrospective on systems, not individuals",
    "Fix applied to middleware and documentation same day",
  ],
  challenges: [
    "Redirect loop difficult to diagnose without clear error surface",
    "Local .env.local incomplete compared to deployment target",
  ],
  rootCauses: [
    "No automated verification that required auth env vars are present",
    "Middleware matcher edge case for exact /energy path",
  ],
  lessonsLearned: [
    "Near misses deserve LLRs as much as failures — CANON-009 requires studying both",
    "Auth systems need startup validation, not silent failure",
    "Staging environments must mirror production env var contract",
  ],
  recommendedImprovements: [
    "Add npm run seed:auth prerequisite check to dev setup docs",
    "Consider env validation script run in CI before deploy",
    "Log middleware redirect reasons in development mode",
  ],
  relatedCanons: ["CANON-007", "CANON-008", "CANON-009", "CANON-015"],
  relatedKnowledgeObjects: [
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009" },
    { identifier: "INC-ENG-001", title: "Production Auth Outage", href: "/library/incidents" },
    { identifier: "FRAMEWORK-EXF-001", title: "Excellence Framework", href: "/library/frameworks/excellence" },
  ],
  teamsInvolved: ["Engineering"],
  reviewDate: "2026-06-27",
  approvedBy: "Chief Technology Officer",
  createdAt: "2026-06-27",
  updatedAt: "2026-06-27",
};

export const LLR_EXAMPLE_YIKE: LessonsLearnedRecord = {
  identifier: "LLR-YIKE-001",
  title: "Verification Bypass Incident — Fraudulent Property Listing",
  approvalStatus: "approved",
  category: "Customer incident or service failure",
  projectSummary:
    "Post-incident review following INC-YIKE-001 — forged documents bypassed expedited verification queue, impacting customer confidence.",
  objectives: [
    "Understand root cause without blame",
    "Restore customer trust through fair resolution",
    "Prevent recurrence through systemic controls",
    "Feed institutional memory per CANON-015",
  ],
  outcomes: [
    "Secondary validation deployed on expedited path",
    "Customer resolution completed",
    "Trust Platform fraud signals integrated",
    "Incident Knowledge Object executive sign-off",
  ],
  successes: [
    "Blameless review focused on queue design, not individuals",
    "Prompt customer communication per CANON-014",
    "Lessons linked to Incident Center and Canon Dashboard",
  ],
  challenges: [
    "Balancing verification speed with trust requirements",
    "Customer confidence recovery after near-transaction",
  ],
  rootCauses: [
    "Queue overload triggered expedited path without secondary checks",
    "Missing queue depth alert before bypass mode",
  ],
  lessonsLearned: [
    "Speed without controls erodes trust faster than delays",
    "Accountability means fixing systems, not denying responsibility",
    "Every customer-impacting incident requires LLR before closure",
  ],
  recommendedImprovements: [
    "Mandatory dual-review for high-value listings",
    "Real-time queue health dashboard for Trust operations",
  ],
  relatedCanons: ["CANON-015", "CANON-002", "CANON-014", "CANON-009"],
  relatedKnowledgeObjects: [
    { identifier: "INC-YIKE-001", title: "Verification Bypass Incident", href: "/library/incidents" },
    { identifier: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015" },
  ],
  teamsInvolved: ["Yike Trust", "Group Platform", "Customer Operations"],
  reviewDate: "2025-11-20",
  approvedBy: "Yike Managing Director",
  createdAt: "2025-11-20",
  updatedAt: "2025-11-20",
};

export const LLR_EXAMPLE_BAYRIGHT: LessonsLearnedRecord = {
  identifier: "LLR-BAYRIGHT-001",
  title: "Settlement Delay Incident — Reconciliation Failure",
  approvalStatus: "approved",
  category: "Customer incident or service failure",
  projectSummary:
    "Post-incident review following INC-BAYRIGHT-001 — 36-hour settlement delay affecting Yike escrow clients.",
  objectives: [
    "Acknowledge and resolve customer impact transparently",
    "Identify technical root cause",
    "Strengthen settlement pipeline resilience",
  ],
  outcomes: [
    "All settlements released within 52 hours of incident start",
    "Integration test gate added to settlement pipeline",
    "Customer communications aligned with CANON-014 commitments",
  ],
  successes: [
    "Honest partner communication within 18 hours",
    "Manual settlement path prevented extended customer harm",
    "Incident fed Commitment Registry review for CR-003",
  ],
  challenges: [
    "Silent batch failure delayed detection",
    "Cross-institution coordination between BayRight and Yike",
  ],
  rootCauses: [
    "Dependency upgrade without integration test coverage",
    "Insufficient settlement monitoring alerts",
  ],
  lessonsLearned: [
    "Financial platform silence damages ecosystem trust",
    "Settlement changes require Platform Assessment and generational review",
    "Accountability includes honest communication during difficulty",
  ],
  recommendedImprovements: [
    "Customer-facing settlement status page",
    "Escrow API hardening per CANON-012 roadmap",
  ],
  relatedCanons: ["CANON-015", "CANON-014", "CANON-012", "CANON-002"],
  relatedKnowledgeObjects: [
    { identifier: "INC-BAYRIGHT-001", title: "Settlement Delay Incident", href: "/library/incidents" },
    { identifier: "CR-003", title: "BayRight Escrow API", href: "/library/commitments" },
  ],
  teamsInvolved: ["BayRight Engineering", "Yike Operations", "Group Platform"],
  reviewDate: "2026-04-10",
  approvedBy: "BayRight Platform Lead",
  createdAt: "2026-04-10",
  updatedAt: "2026-04-10",
};

export const LESSONS_LEARNED_RECORDS: LessonsLearnedRecord[] = [
  LLR_EXAMPLE_IKI,
  LLR_EXAMPLE_AUTH,
  LLR_EXAMPLE_RETRO,
  LLR_EXAMPLE_YIKE,
  LLR_EXAMPLE_BAYRIGHT,
];

export function getLessonsLearnedRecord(
  identifier: string
): LessonsLearnedRecord | undefined {
  return LESSONS_LEARNED_RECORDS.find((r) => r.identifier === identifier);
}

export function getAllLessonsLearnedRecords(): LessonsLearnedRecord[] {
  return LESSONS_LEARNED_RECORDS;
}

export function searchLessonsLearned(query: string): LessonsLearnedRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return LESSONS_LEARNED_RECORDS;

  return LESSONS_LEARNED_RECORDS.filter((r) => {
    const haystack = [
      r.identifier,
      r.title,
      r.projectSummary,
      r.category,
      ...r.lessonsLearned,
      ...r.relatedCanons,
      ...r.teamsInvolved,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterLessonsByCanon(canonId: string): LessonsLearnedRecord[] {
  return LESSONS_LEARNED_RECORDS.filter((r) =>
    r.relatedCanons.includes(canonId)
  );
}

export function filterLessonsByCategory(
  category: LLRProjectCategory
): LessonsLearnedRecord[] {
  return LESSONS_LEARNED_RECORDS.filter((r) => r.category === category);
}
