/**
 * Book I — Foundational Charter sections (versioned blocks)
 * v1.0 RC1 — Session LIB-2026-06-27-011
 *
 * Each section is individually addressable for versioning, commentary, and cross-links.
 */

export const BOOK_I_FOUNDATIONAL_CHARTER_VERSION = "1.0 RC1" as const;
export const BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION = "1.0" as const;
export const BOOK_I_FOUNDATIONAL_CHARTER_SESSION = "LIB-2026-06-27-011" as const;

export type FoundationalCharterSectionKind =
  | "prose"
  | "lists"
  | "links"
  | "philosophy"
  | "map"
  | "parts"
  | "reading-guide"
  | "resources"
  | "publication-status"
  | "criteria"
  | "principle";

export interface FoundationalCharterSectionBlock {
  id: string;
  anchor: string;
  number: number;
  title: string;
  version: string;
  status: "draft" | "published";
  kind: FoundationalCharterSectionKind;
}

export const BOOK_I_FOUNDATIONAL_CHARTER_PRINCIPLE = `Strong governance begins with clear structure. Clear structure begins with shared understanding. This Book exists to provide that understanding.` as const;

export const BOOK_I_FC_SECTION_PURPOSE: FoundationalCharterSectionBlock & {
  paragraphs: string[];
} = {
  id: "purpose",
  anchor: "purpose",
  number: 1,
  title: "Purpose",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "prose",
  paragraphs: [
    "The Governance Code exists to translate the enduring principles established by the Stankings Group Constitution into disciplined governance practice.",
    "Book I, Governance Bodies, establishes the institutional governance structure of Stankings Group by defining the bodies through which constitutional authority is exercised.",
    "It identifies the principal governance bodies of the Group, explains their place within the governance framework, and provides the foundation upon which subsequent Books define governance procedures, responsibilities and operational practices.",
    "This Book does not regulate how governance bodies perform their duties. Rather, it establishes who they are, why they exist and how they relate to one another.",
    "Every subsequent Book within the Governance Code assumes the governance architecture established here.",
  ],
};

export const BOOK_I_FC_SECTION_SCOPE: FoundationalCharterSectionBlock & {
  includes: string[];
  excludes: string[];
  closing: string;
} = {
  id: "scope",
  anchor: "scope",
  number: 2,
  title: "Scope",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "lists",
  includes: [
    "The constitutional governance structure of Stankings Group.",
    "Governance principles.",
    "The Board of Directors.",
    "Executive Leadership.",
    "Institutional Leadership.",
    "Governance Committees.",
    "The Constitutional Council.",
    "Delegated Authority.",
    "Governance Relationships.",
    "Governance Registers.",
  ],
  excludes: [
    "Board meeting procedures.",
    "Committee operating rules.",
    "Executive performance management.",
    "Voting procedures.",
    "Risk management processes.",
    "Financial governance procedures.",
    "Technology governance standards.",
  ],
  closing: "Those matters are addressed in subsequent Books of the Governance Code.",
};

export const BOOK_I_FC_SECTION_CONSTITUTIONAL_AUTHORITY: FoundationalCharterSectionBlock & {
  paragraphs: string[];
  authoritySources: { label: string; href: string; identifier: string }[];
} = {
  id: "constitutional-authority",
  anchor: "constitutional-authority",
  number: 3,
  title: "Constitutional Authority",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "links",
  paragraphs: [
    "Where any provision of this Book conflicts with the Constitution, the Constitution shall prevail.",
    "Where uncertainty exists, interpretation shall favour constitutional continuity, institutional stewardship and long-term trust.",
  ],
  authoritySources: [
    {
      identifier: "constitution",
      label: "Volume I — The Stankings Group Constitution",
      href: "/library/constitution",
    },
    {
      identifier: "volume-zero",
      label: "The Stankings Canons",
      href: "/library/first-principles",
    },
    {
      identifier: "governance-framework",
      label: "Executive Decisions adopted under the Governance Framework",
      href: "/library/decisions",
    },
  ],
};

export const BOOK_I_FC_SECTION_GOVERNANCE_PHILOSOPHY: FoundationalCharterSectionBlock & {
  principles: string[];
} = {
  id: "governance-philosophy",
  anchor: "governance-philosophy",
  number: 4,
  title: "Governance Philosophy",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "philosophy",
  principles: [
    "Governance within Stankings Group exists to preserve the institution rather than any individual.",
    "Authority is exercised as a form of stewardship.",
    "Leadership exists to strengthen trust.",
    "Governance exists to protect continuity.",
    "Knowledge exists to outlive its creators.",
    "Every governance body described in this Book exists to support those objectives.",
  ],
};

export const BOOK_I_FC_SECTION_GOVERNANCE_MAP: FoundationalCharterSectionBlock = {
  id: "governance-map",
  anchor: "governance-map",
  number: 5,
  title: "Governance Map",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "map",
};

export const BOOK_I_FC_SECTION_BOOK_STRUCTURE: FoundationalCharterSectionBlock & {
  intro: string;
  parts: { part: string; title: string; description: string; href: string }[];
  closing: string;
} = {
  id: "book-structure",
  anchor: "book-structure",
  number: 6,
  title: "Book Structure",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "parts",
  intro: "This Book is organised into four Parts:",
  parts: [
    {
      part: "Part I",
      title: "Governance Foundations",
      description: "Establishes the constitutional governance framework and guiding principles.",
      href: "/library/governance-code/book-i/parts/part-i",
    },
    {
      part: "Part II",
      title: "Governance Authorities",
      description: "Defines the principal governance bodies responsible for institutional leadership.",
      href: "/library/governance-code/book-i/parts/part-ii",
    },
    {
      part: "Part III",
      title: "Governance Support",
      description: "Defines advisory, oversight and delegated governance structures.",
      href: "/library/governance-code/book-i/parts/part-iii",
    },
    {
      part: "Part IV",
      title: "Governance Framework",
      description: "Defines governance relationships and institutional registers.",
      href: "/library/governance-code/book-i/parts/part-iv",
    },
  ],
  closing: "Each Part builds upon the one before it.",
};

export const BOOK_I_FC_SECTION_READING_GUIDE: FoundationalCharterSectionBlock & {
  intro: string;
  entries: { audience: string; guidance: string }[];
} = {
  id: "reading-guide",
  anchor: "reading-guide",
  number: 7,
  title: "Reading Guide",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "reading-guide",
  intro: "Different readers may approach this Book from different responsibilities.",
  entries: [
    { audience: "Directors", guidance: "Read the Book in full before participating in governance." },
    {
      audience: "Executives",
      guidance: "Begin with Parts II and III, then study the complete Book.",
    },
    {
      audience: "Engineers",
      guidance:
        "Focus on Governance Relationships to understand institutional authority before implementing systems.",
    },
    {
      audience: "Governance Professionals",
      guidance: "Read alongside the Constitution and the Canons.",
    },
    {
      audience: "Future Custodians",
      guidance: "Study the complete Book as part of the Custodian Programme.",
    },
    {
      audience: "New Employees",
      guidance:
        "Use the Governance Map and Purpose sections to understand how the institution is organised before exploring role-specific materials.",
    },
  ],
};

export const BOOK_I_FC_SECTION_RELATED_RESOURCES: FoundationalCharterSectionBlock & {
  intro: string;
  resources: { label: string; href: string; identifier: string }[];
  closing: string;
} = {
  id: "related-resources",
  anchor: "related-resources",
  number: 8,
  title: "Related Library Resources",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "resources",
  intro: "This Book should be read together with:",
  resources: [
    {
      identifier: "volume-zero",
      label: "Volume 0 — The Stankings Canons",
      href: "/library/first-principles",
    },
    {
      identifier: "constitution",
      label: "Volume I — The Stankings Group Constitution",
      href: "/library/constitution",
    },
    {
      identifier: "constitutional-convention",
      label: "The Constitutional Commentary",
      href: "/library/constitutional-convention",
    },
    {
      identifier: "FRAMEWORK-EDW-001",
      label: "The Editorial Workflow Standard",
      href: "/library/editorial-standards/editorial-workflow",
    },
    {
      identifier: "FRAMEWORK-SLPS-001",
      label: "The Stankings Library Publishing Standard (SLPS-001)",
      href: "/library/editorial-standards/publishing-standard",
    },
    {
      identifier: "library-engine",
      label: "Knowledge Objects and Executive Decisions referenced throughout this Book",
      href: "/library/stankings-library",
    },
  ],
  closing: "Together, these publications form a unified governance framework.",
};

export const BOOK_I_FC_PUBLICATION_STATUS_ROWS = [
  { field: "Publication", value: "Volume II — Governance Code" },
  { field: "Book", value: "Book I — Governance Bodies" },
  { field: "Version", value: BOOK_I_FOUNDATIONAL_CHARTER_VERSION },
  { field: "Status", value: "Draft – Editorial Review" },
  { field: "Classification", value: "Internal Governance" },
  { field: "Authority", value: "Constitution of Stankings Group" },
  { field: "Founder", value: "Stanley Ukeje" },
  { field: "Editor-in-Chief", value: "Stankings Library Editorial Office" },
  { field: "Review Cycle", value: "Constitutional Convention" },
  { field: "Next Stage", value: "Founder Approval" },
] as const;

export const BOOK_I_FC_SECTION_PUBLICATION_STATUS: FoundationalCharterSectionBlock & {
  rows: typeof BOOK_I_FC_PUBLICATION_STATUS_ROWS;
} = {
  id: "publication-status",
  anchor: "publication-status",
  number: 9,
  title: "Publication Status",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "publication-status",
  rows: BOOK_I_FC_PUBLICATION_STATUS_ROWS,
};

export const BOOK_I_FC_SECTION_SUCCESS_CRITERIA: FoundationalCharterSectionBlock & {
  intro: string;
  criteria: string[];
} = {
  id: "success-criteria",
  anchor: "success-criteria",
  number: 10,
  title: "Success Criteria",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "criteria",
  intro: "Book I shall be considered complete when:",
  criteria: [
    "Every governance body is clearly defined.",
    "Authority boundaries are unambiguous.",
    "Governance relationships are visually and textually consistent.",
    "Cross-references to the Constitution and Canons are complete.",
    "No provision duplicates later Books.",
    "The governance architecture enables subsequent Books to define procedures without redefining institutional structures.",
    "A new director, executive or custodian can understand the governance framework within a single reading.",
  ],
};

export const BOOK_I_FC_SECTION_PRINCIPLE: FoundationalCharterSectionBlock & {
  text: string;
} = {
  id: "foundational-principle",
  anchor: "foundational-principle",
  number: 0,
  title: "Foundational Principle",
  version: BOOK_I_FOUNDATIONAL_CHARTER_SECTION_VERSION,
  status: "draft",
  kind: "principle",
  text: BOOK_I_FOUNDATIONAL_CHARTER_PRINCIPLE,
};

/** Ordered registry — ten sections plus closing principle. */
export const BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS = [
  BOOK_I_FC_SECTION_PURPOSE,
  BOOK_I_FC_SECTION_SCOPE,
  BOOK_I_FC_SECTION_CONSTITUTIONAL_AUTHORITY,
  BOOK_I_FC_SECTION_GOVERNANCE_PHILOSOPHY,
  BOOK_I_FC_SECTION_GOVERNANCE_MAP,
  BOOK_I_FC_SECTION_BOOK_STRUCTURE,
  BOOK_I_FC_SECTION_READING_GUIDE,
  BOOK_I_FC_SECTION_RELATED_RESOURCES,
  BOOK_I_FC_SECTION_PUBLICATION_STATUS,
  BOOK_I_FC_SECTION_SUCCESS_CRITERIA,
] as const;

export function getFoundationalCharterSection(
  anchor: string,
): FoundationalCharterSectionBlock | undefined {
  return BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS.find((s) => s.anchor === anchor);
}
