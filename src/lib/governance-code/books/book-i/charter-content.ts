/**
 * Book I — Foundational Charter v1.0 (drafted prose)
 * Session LIB-2026-06-27-009 · ED 52 · ED 53
 */

import { EDITOR_DECISION_49, EDITOR_DECISION_52, EDITOR_DECISION_53 } from "@/lib/editorial/decisions";
import {
  FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS,
  SLPS_WRITING_RULES,
} from "@/lib/editorial/foundational-charter";
import type { GovernanceKnowledgeRef } from "@/lib/governance-code/types";
import {
  BOOK_I_CENTRAL_QUESTION,
  BOOK_I_SCOPE_EXCLUDES,
} from "@/lib/governance-code/books/book-i/chapters";

export const BOOK_I_FOUNDATIONAL_CHARTER_HREF =
  "/library/governance-code/book-i/foundational-charter" as const;

/** @deprecated Use BOOK_I_FOUNDATIONAL_CHARTER_HREF */
export const BOOK_I_CHARTER_HREF = BOOK_I_FOUNDATIONAL_CHARTER_HREF;

export const BOOK_I_CHARTER_VERSION = "1.0" as const;
export const BOOK_I_CHARTER_STATUS = "Draft — Editorial Review" as const;
export const BOOK_I_CHARTER_SESSION = "LIB-2026-06-27-009" as const;

export const BOOK_I_FOUNDATIONAL_CHARTER_KO_ID = "BOOK-I-FOUNDATIONAL-CHARTER" as const;

/** @deprecated Use BOOK_I_FOUNDATIONAL_CHARTER_KO_ID */
export const BOOK_I_CHARTER_KO_ID = BOOK_I_FOUNDATIONAL_CHARTER_KO_ID;

export { FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS as BOOK_CHARTER_TEMPLATE_SECTIONS };

export interface FoundationalCharterSectionContent {
  id: string;
  number: number;
  title: string;
  paragraphs: string[];
}

/** @deprecated */
export type BookCharterSectionContent = FoundationalCharterSectionContent;

export const BOOK_I_CHARTER_PURPOSE: FoundationalCharterSectionContent = {
  id: "purpose",
  number: 1,
  title: "Purpose",
  paragraphs: [
    "You are about to study how Stankings Group governs itself. Before you read a single chapter on boards, executives, or committees, you need to know why this Book exists and how to use it. That is what the Foundational Charter is for.",
    "The Foundational Charter is the governing introduction to Book I — Governance Bodies. It is the first page of Volume II, not the first chapter. It exists to orient you before you study governance. It is the front door — not the living room. It does not assign duties, convene meetings, or prescribe procedures.",
    "Book I answers one institutional question: who has authority to make which decisions? This Charter answers the question that must come first: before I study governance, how should I understand this Book?",
    "A director joining the Board, an executive assuming institutional leadership, an engineer building governance-aware systems, or a future custodian inheriting this institution in 2126 should be able to read this Foundational Charter in fifteen minutes and know where to go next.",
    "If you leave this page understanding why Book I exists, how to use it, and how it connects to the rest of the Stankings Library, it has done its work.",
  ],
};

export const BOOK_I_CHARTER_SCOPE: FoundationalCharterSectionContent = {
  id: "scope",
  number: 2,
  title: "Scope",
  paragraphs: [
    "Governance fails when nobody knows who decides what. Book I exists to prevent that failure by naming the governance bodies of Stankings Group and drawing clear authority boundaries.",
    "This Book defines governance bodies — their identity, constitutional standing, and the limits of their authority. It establishes who governs, not how meetings are run.",
    "This Book includes: the constitutional governance structure; governance principles; the Board of Directors; executive leadership; institutional leadership bodies; the Constitutional Council; governance committees; delegated authority; governance relationships; and governance registers.",
    "This Book explicitly excludes: board meeting procedures (Book II); executive duties and performance (Book III); committee operations and charters (Book IV); voting mechanics; calendars; and day-to-day management processes.",
    "Book I names the bodies and draws the authority lines. Later Books in the Governance Code operationalize how those bodies work.",
  ],
};

export const BOOK_I_CHARTER_CONSTITUTIONAL_AUTHORITY: FoundationalCharterSectionContent = {
  id: "constitutional-authority",
  number: 3,
  title: "Constitutional Authority",
  paragraphs: [
    "Stankings Group does not invent governance in operational manuals. Constitutional law authorizes governance; the Governance Code implements it.",
    "The Governance Code is the authoritative operational governance manual of Stankings Group. It is subordinate to Volume I — the Constitution. Where this Book and the Constitution diverge, the Constitution prevails.",
    "Book I draws authority from Articles IV (Board Governance), V (Leadership Governance), VI (Institutional Decision Discipline), VIII (Governance Architecture), and IX (Institutional Ecosystem). These Articles authorize the Board, executive leadership, governance architecture, and the ecosystem of institutions within Stankings Group.",
    "Volume 0 — The Canons — supplies the philosophical foundation. CANON-002 (Trust), CANON-004 (Leadership as Stewardship), CANON-016 (Institutional Strength), and CANON-020 (Judgment Records) inform how governance bodies exercise authority responsibly.",
    "The Constitutional Council is established under the authority of this Governance Code — not by constitutional amendment. This preserves constitutional stability while allowing governance structures to evolve responsibly.",
  ],
};

export const BOOK_I_CHARTER_GOVERNANCE_PHILOSOPHY: FoundationalCharterSectionContent = {
  id: "governance-philosophy",
  number: 4,
  title: "Governance Philosophy",
  paragraphs: [
    "Stankings Group governs through defined bodies exercising defined authority under constitutional law. Governance is not hierarchy for its own sake — it is the disciplined allocation of decision rights so that trust is preserved, stewardship is accountable, institutional memory survives leadership transitions, and future custodians inherit clarity rather than confusion. Every governance body exists to serve the institution first.",
  ],
};

export const BOOK_I_CHARTER_BOOK_STRUCTURE_INTRO =
  "Book I is organized in four Parts and ten Chapters. Read this Foundational Charter first, then follow the path suited to your role in the Reading Guide below.";

export const BOOK_I_READING_GUIDE = [
  {
    audience: "Directors",
    path: "Read this Foundational Charter, then Part I (Foundations) and Part II (Authorities) in full. Chapters 3–5 define the bodies you oversee.",
    chapters: ["Ch 1–5", "Ch 9–10"],
  },
  {
    audience: "Executives",
    path: "Begin with Part II (Governance Authorities), especially Chapters 4–5 on executive and institutional leadership. Return to Part I for constitutional context.",
    chapters: ["Ch 4–5", "Ch 1–2"],
  },
  {
    audience: "Engineers",
    path: "Start with Chapter 9 — Governance Relationships. It maps how authority flows into systems, registers, and platforms you build.",
    chapters: ["Ch 9", "Ch 10"],
  },
  {
    audience: "Governance Professionals",
    path: "Sections 3–4 of this Foundational Charter, then Part I and Part IV. Chapters 6–8 cover support structures and delegated authority.",
    chapters: ["Ch 1–2", "Ch 6–8", "Ch 10"],
  },
  {
    audience: "Future Custodians",
    path: "Read the entire Book — Foundational Charter through Chapter 10. Book I is the authority map every later generation inherits.",
    chapters: ["Foundational Charter", "Ch 1–10"],
  },
  {
    audience: "New Employees",
    path: "Read this Foundational Charter and Part I only. You need to know who governs before you need operational detail.",
    chapters: ["Foundational Charter", "Ch 1–2"],
  },
] as const;

export const BOOK_I_CHARTER_RELATED_RESOURCES: GovernanceKnowledgeRef[] = [
  { identifier: "volume-zero", title: "Volume 0 — The Canons", href: "/library/first-principles" },
  { identifier: "constitution", title: "Volume I — Constitution", href: "/library/constitution" },
  { identifier: "CONSTITUTION-ARTICLE-IV", title: "Article IV — Board Governance", href: "/library/constitution/article-iv" },
  { identifier: "CONSTITUTION-ARTICLE-V", title: "Article V — Leadership Governance", href: "/library/constitution/article-v" },
  { identifier: "CONSTITUTION-ARTICLE-VIII", title: "Article VIII — Governance Architecture", href: "/library/constitution/article-viii" },
  { identifier: "constitutional-convention", title: "Constitutional Convention", href: "/library/constitutional-convention" },
  { identifier: "VOLUME-II-GOVERNANCE-CODE", title: "Volume II — Governance Code", href: "/library/governance-code" },
  { identifier: "FRAMEWORK-SLPS-001", title: "Publishing Standard (SLPS-001)", href: "/library/editorial-standards/publishing-standard" },
  { identifier: "FRAMEWORK-FC-001", title: "Foundational Charter Standard", href: "/library/editorial-standards/foundational-charter" },
  { identifier: "library-sessions", title: "Library Session Records", href: "/library/sessions" },
  { identifier: "LIB-2026-06-27-010", title: "Session 010 — Foundational Charter Adopted", href: "/library/sessions/LIB-2026-06-27-010" },
];

export const BOOK_I_CHARTER_SUCCESS_CRITERIA = [
  "Every governance body has a clearly defined identity.",
  "Every governance body has a defined authority boundary.",
  "No overlap of responsibility between bodies.",
  "No contradiction with the Constitution.",
  "Every reader can identify where governance authority originates.",
  "Every later Book in the Governance Code can build on Book I without redefining governance bodies.",
  "Cross-references to the Constitution, Canons, and related volumes are complete.",
  "Authority boundaries are unambiguous enough for engineers to implement and auditors to verify.",
] as const;

export const BOOK_I_FOUNDATIONAL_CHARTER_PUBLICATION_STATUS = {
  version: BOOK_I_CHARTER_VERSION,
  charterStatus: BOOK_I_CHARTER_STATUS,
  bookArchitecture: "Locked",
  charterArchitecture: "Approved — Ten sections",
  founderApproval: "Pending",
  editorialApproval: "In review",
  conventionStatus: "Not started",
  publicationStatus: "Not published",
  centralQuestion: BOOK_I_CENTRAL_QUESTION,
  sessionId: BOOK_I_CHARTER_SESSION,
  publishingStandard: "SLPS-001",
} as const;

/** @deprecated Use BOOK_I_FOUNDATIONAL_CHARTER_PUBLICATION_STATUS */
export const BOOK_I_CHARTER_BOOK_STATUS = BOOK_I_FOUNDATIONAL_CHARTER_PUBLICATION_STATUS;

export const BOOK_I_CHARTER_EDITORIAL_NOTES = [
  EDITOR_DECISION_49,
  EDITOR_DECISION_52,
  EDITOR_DECISION_53,
  "Foundational Charter orients readers — it does not govern them.",
  ...SLPS_WRITING_RULES.map((r) => `${r.title}: ${r.rule}`),
  `Excluded from Book I: ${BOOK_I_SCOPE_EXCLUDES.slice(0, 3).join("; ")}.`,
] as const;

export const BOOK_I_CHARTER_ALL_SECTIONS: FoundationalCharterSectionContent[] = [
  BOOK_I_CHARTER_PURPOSE,
  BOOK_I_CHARTER_SCOPE,
  BOOK_I_CHARTER_CONSTITUTIONAL_AUTHORITY,
  BOOK_I_CHARTER_GOVERNANCE_PHILOSOPHY,
];
