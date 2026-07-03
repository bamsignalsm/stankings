/**
 * Book I — Chapter 1 architecture
 * Constitutional Governance Structure — Session LIB-2026-06-27-012
 *
 * Architecture only. No governance prose drafted.
 */

import type { ChapterEducationFooterArchitecture } from "@/lib/editorial/chapter-education";
import type { GovernanceKnowledgeRef } from "@/lib/governance-code/types";

export const BOOK_I_CHAPTER_01_ID = "book-i-ch-01" as const;
export const BOOK_I_CHAPTER_01_HREF =
  "/library/governance-code/book-i/chapters/book-i-ch-01" as const;
export const BOOK_I_CHAPTER_01_ARCHITECTURE_HREF =
  "/library/governance-code/book-i/chapters/book-i-ch-01/architecture" as const;

export const BOOK_I_CHAPTER_01_ARCHITECTURE_STATUS = "proposed" as const;
export const BOOK_I_CHAPTER_01_ARCHITECTURE_VERSION = "1.0" as const;
export const BOOK_I_CHAPTER_01_SESSION = "LIB-2026-06-27-012" as const;

export const BOOK_I_CHAPTER_01_PROBLEM_STATEMENT = `How does constitutional authority flow from the founding principles of Stankings Group to the people making decisions every day?` as const;

export const BOOK_I_CHAPTER_01_OBJECTIVES = [
  "Where authority originates.",
  "How authority is delegated.",
  "Why governance exists.",
  "How every governance body relates to the Constitution.",
  "Why governance is different from management.",
] as const;

export const BOOK_I_CHAPTER_01_SUMMARY_POINTS = [
  "Governance exists to steward.",
  "Authority flows from principles.",
  "Management executes within governance.",
  "Trust is preserved through disciplined governance.",
] as const;

export const BOOK_I_CHAPTER_01_CONTENT_RULES = [
  "Explain concepts only.",
  "No Board procedures.",
  "No committee charters.",
  "No executive duties.",
  "No voting rules.",
  "No operational processes.",
] as const;

export interface ChapterSectionArchitecture {
  id: string;
  anchor: string;
  number: number;
  title: string;
  description: string;
  fields: string[];
  diagramId?: "sources-of-authority" | "governance-hierarchy" | "decision-flow";
  draftStatus: "architecture_only";
}

export const BOOK_I_CHAPTER_01_SECTIONS: ChapterSectionArchitecture[] = [
  {
    id: "purpose-of-governance",
    anchor: "purpose-of-governance",
    number: 1,
    title: "Purpose of Governance",
    description: "Why governance exists. Not rules — purpose.",
    fields: [
      "Why governance exists within Stankings Group",
      "Governance as institutional preservation",
      "Relationship to trust and continuity",
    ],
    draftStatus: "architecture_only",
  },
  {
    id: "sources-of-authority",
    anchor: "sources-of-authority",
    number: 2,
    title: "Sources of Authority",
    description:
      "The hierarchy from Canons through Operating Procedures. One of the most important diagrams in the Library.",
    fields: [
      "Canons → Constitution → Governance Code → Executive Decisions → Policies → Standards → Operating Procedures",
      "Precedence rule when sources conflict",
      "Cross-links to each authority layer",
    ],
    diagramId: "sources-of-authority",
    draftStatus: "architecture_only",
  },
  {
    id: "governance-vs-management",
    anchor: "governance-vs-management",
    number: 3,
    title: "Governance vs Management",
    description: "Governance sets direction. Management executes. Simple. Timeless.",
    fields: [
      "Definition of governance in institutional terms",
      "Definition of management in institutional terms",
      "Why the distinction prevents confusion",
    ],
    draftStatus: "architecture_only",
  },
  {
    id: "governance-hierarchy",
    anchor: "governance-hierarchy",
    number: 4,
    title: "Governance Hierarchy",
    description: "Institutional authority. No job descriptions — just the hierarchy.",
    fields: [
      "Board through operating leadership",
      "Advisory and oversight bodies",
      "Distinction from org chart",
    ],
    diagramId: "governance-hierarchy",
    draftStatus: "architecture_only",
  },
  {
    id: "stewardship",
    anchor: "stewardship",
    number: 5,
    title: "Stewardship",
    description: "Authority is stewardship. Never ownership. Tied to Constitution and Canons.",
    fields: [
      "Stewardship as constitutional principle",
      "Authority exercised on behalf of the institution",
      "Canon and Constitution references",
    ],
    draftStatus: "architecture_only",
  },
  {
    id: "decision-flow",
    anchor: "decision-flow",
    number: 6,
    title: "Decision Flow",
    description: "How major institutional decisions move through governance. Conceptual flow only.",
    fields: [
      "Matter identification",
      "Authority determination",
      "Governance deliberation",
      "Decision recording and execution boundary",
    ],
    diagramId: "decision-flow",
    draftStatus: "architecture_only",
  },
  {
    id: "constitutional-alignment",
    anchor: "constitutional-alignment",
    number: 7,
    title: "Constitutional Alignment",
    description: "The alignment test — every governance action must remain consistent with founding authority.",
    fields: [
      "Alignment test against Constitution",
      "Alignment test against Canons",
      "Alignment test against Governance Code",
      "When alignment fails — escalation path (conceptual)",
    ],
    draftStatus: "architecture_only",
  },
  {
    id: "chapter-summary",
    anchor: "chapter-summary",
    number: 8,
    title: "Chapter Summary",
    description: "One page. No new ideas. Concise recap of the chapter.",
    fields: [
      "Governance exists to steward",
      "Authority flows from principles",
      "Management executes within governance",
      "Trust preserved through disciplined governance",
    ],
    draftStatus: "architecture_only",
  },
];

export const BOOK_I_CHAPTER_01_FOOTER_ARCHITECTURE: ChapterEducationFooterArchitecture = {
  reflectionQuestions: [
    "What is the purpose of governance?",
    "Where does authority originate?",
    "Why is stewardship different from ownership?",
    "How does governance differ from management?",
    "What is the constitutional alignment test?",
  ],
  practicalExample: {
    title: "Board considers launching a new company",
    scenario:
      "The Board wants to launch a new operating company within Stankings Group. Which governance bodies become involved? Walk through the conceptual governance flow from constitutional authority to execution.",
    fieldsToDraft: [
      "Which authority layer authorizes new institutions",
      "Board role vs CEO role vs committee role",
      "Constitutional alignment check before decision",
      "How the decision is recorded and handed to management",
    ],
  },
  relatedReading: [
    {
      identifier: "foundational-charter",
      label: "Book I — Foundational Charter",
      href: "/library/governance-code/book-i/foundational-charter",
    },
    {
      identifier: "constitutional-commentary",
      label: "The Constitutional Commentary",
      href: "/library/constitutional-convention",
    },
    {
      identifier: "book-ii",
      label: "Book II — Board Operations (forthcoming)",
      href: "/library/governance-code/book-ii",
    },
  ],
  constitutionArticles: [
    {
      identifier: "CONSTITUTION-ARTICLE-II",
      label: "Article II — Purpose and Principles",
      href: "/library/constitution/article-ii",
    },
    {
      identifier: "CONSTITUTION-ARTICLE-IV",
      label: "Article IV — Governance",
      href: "/library/constitution/article-iv",
    },
    {
      identifier: "CONSTITUTION-ARTICLE-VIII",
      label: "Article VIII — Executive Leadership",
      href: "/library/constitution/article-viii",
    },
  ],
  canons: [
    {
      identifier: "CANON-002",
      label: "Canon II — Stewardship",
      href: "/library/canon/CANON-002",
    },
    {
      identifier: "CANON-004",
      label: "Canon IV — Institutional Continuity",
      href: "/library/canon/CANON-004",
    },
  ],
  knowledgeObjects: [
    {
      identifier: "BOOK-I-FOUNDATIONAL-CHARTER",
      label: "BOOK-I-FOUNDATIONAL-CHARTER",
      href: "/library/governance-code/book-i/foundational-charter",
    },
    {
      identifier: "FRAMEWORK-CEF-001",
      label: "Chapter Education Standard (CEF-001)",
      href: "/library/editorial-standards/chapter-education",
    },
    {
      identifier: "VOLUME-II-GOVERNANCE-CODE",
      label: "Volume II — Governance Code",
      href: "/library/governance-code",
    },
  ],
  librarySessions: [
    {
      identifier: "LIB-2026-06-27-012",
      label: "LIB-2026-06-27-012 — Chapter 1 Architecture",
      href: "/library/sessions/LIB-2026-06-27-012",
    },
    {
      identifier: "LIB-2026-06-27-011",
      label: "LIB-2026-06-27-011 — Foundational Charter First Draft",
      href: "/library/sessions/LIB-2026-06-27-011",
    },
  ],
};

export const BOOK_I_CHAPTER_01_PUBLICATION_STATUS = [
  { field: "Publication", value: "Volume II — Governance Code" },
  { field: "Book", value: "Book I — Governance Bodies" },
  { field: "Chapter", value: "Chapter 1 — Constitutional Governance Structure" },
  { field: "Architecture Version", value: BOOK_I_CHAPTER_01_ARCHITECTURE_VERSION },
  { field: "Status", value: "Architecture Review" },
  { field: "Prose", value: "Not drafted" },
  { field: "Session", value: BOOK_I_CHAPTER_01_SESSION },
  { field: "Next Stage", value: "Founder approval → Section 1 drafting" },
] as const;

export const BOOK_I_CHAPTER_01_KO_REFS: GovernanceKnowledgeRef[] = [
  {
    identifier: "BOOK-I-CH-01-ARCHITECTURE",
    title: "Chapter 1 Architecture",
    href: BOOK_I_CHAPTER_01_ARCHITECTURE_HREF,
  },
];
