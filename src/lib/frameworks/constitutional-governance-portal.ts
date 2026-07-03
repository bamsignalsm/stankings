/**
 * Constitutional Governance Portal — FRAMEWORK-CGOV-001
 * Derived from Constitution Article IV
 * Executive Decision No. 32 — Reserved Powers Register
 */

export const CGOV_FRAMEWORK = {
  identifier: "FRAMEWORK-CGOV-001",
  title: "Constitutional Governance Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-IV",
    "CANON-004",
    "CANON-007",
    "CANON-015",
    "CANON-016",
    "CANON-020",
    "FRAMEWORK-IDR-001",
    "FRAMEWORK-LSF-001",
    "LEX-STEWARDSHIP",
  ],
} as const;

export const CGOV_PURPOSE = `Governance shall be documented, bounded and accountable.

Every governance body maintains a constitutional profile — responsibilities, delegated authority, decisions, and links to the Constitution and Canons. Power always has a boundary.`;

export const CONSTITUTIONAL_GOVERNANCE_HIERARCHY = [
  "The Stankings Canons",
  "The Constitution",
  "Applicable Law",
  "Board of Directors",
  "Chief Executive Officer",
  "Executive Leadership",
  "Operating Institutions",
  "Operational Teams",
] as const;

export const RESERVED_POWERS_REGISTER = [
  "Constitutional amendments.",
  "Admission of new institutions into the Group.",
  "Major acquisitions or disposals.",
  "Significant capital allocation.",
  "Appointment or removal of the Group CEO.",
  "Approval of long-term institutional strategy.",
  "Adoption of new Canons.",
  "Approval of Annual Stewardship Reports.",
  "Changes to institutional identity or purpose.",
] as const;

export const CGOV_BODY_TYPES = [
  { type: "board", label: "Board of Directors" },
  { type: "ceo", label: "Group Chief Executive Officer" },
  { type: "executive-leadership", label: "Executive Leadership" },
  { type: "committee", label: "Governance Committees" },
  { type: "owner", label: "Constitutional Owner(s)" },
] as const;

export const CGOV_BODY_PROFILE_FIELDS: Record<string, string[]> = {
  board: [
    "Constitutional Responsibilities",
    "Reserved Powers",
    "Active Committees",
    "Decisions",
    "Stewardship Reviews",
  ],
  ceo: [
    "Delegated Authority",
    "Strategic Objectives",
    "Constitutional Duties",
    "Decision Registry",
    "Annual Stewardship Declaration",
  ],
  "executive-leadership": [
    "Functional Responsibilities",
    "Authority Matrix",
    "KPIs",
    "Knowledge Contributions",
    "Succession Status",
  ],
  committee: ["Mandate", "Membership", "Meeting Records", "Decisions", "Recommendations"],
  owner: ["Lawful ownership structure", "Constitutional oversight", "Reserved matters"],
};

export const CGOV_BODY = `${CGOV_PURPOSE}

## Constitutional Hierarchy

${CONSTITUTIONAL_GOVERNANCE_HIERARCHY.join("\n↓\n")}

Nobody governs above the Constitution.

## Reserved Powers Register (ED 32)

${RESERVED_POWERS_REGISTER.map((p) => `- ${p}`).join("\n")}

Decisions in the Reserved Powers Register cannot be delegated without explicit Board approval.`;
