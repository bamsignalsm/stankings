/**
 * Book I — Governance Bodies
 * Architecture locked — Session LIB-2026-06-27-005
 * Book → Foundational Charter → Parts → Chapters → Sections
 */

import type { GovernanceChapterShell } from "@/lib/governance-code/types";
import { EDITOR_DECISION_49 } from "@/lib/editorial/decisions";

export const BOOK_I_ID = "book-i" as const;

export const BOOK_I_CENTRAL_QUESTION =
  "Who has authority to make which decisions?" as const;

export const BOOK_I_SCOPE_INCLUDES = "What governance bodies exist." as const;

export const BOOK_I_SCOPE_EXCLUDES = [
  "Board meetings (Book II)",
  "CEO responsibilities and duties (Book III)",
  "Committee operations and charters (Book IV)",
  "Voting procedures",
  "Performance management",
  "Board calendars",
] as const;

export const CONSTITUTIONAL_COUNCIL_PRINCIPLE = `The Constitutional Council is a governance body created under the authority of the Governance Code — not a constitutional amendment.

${EDITOR_DECISION_49}` as const;

const BOOK_I_SESSIONS: GovernanceChapterShell["sessionHistory"] = [
  {
    sessionId: "LIB-2026-06-27-004",
    title: "Book I Architecture Approved for Review",
    href: "/library/sessions/LIB-2026-06-27-004",
    date: "2026-06-27",
  },
  {
    sessionId: "LIB-2026-06-27-005",
    title: "Governance Architecture Refined",
    href: "/library/sessions/LIB-2026-06-27-005",
    date: "2026-06-27",
  },
  {
    sessionId: "LIB-2026-06-27-012",
    title: "Chapter 1 Architecture — Constitutional Governance Structure",
    href: "/library/sessions/LIB-2026-06-27-012",
    date: "2026-06-27",
  },
];

const BOOK_I_REVIEW: GovernanceChapterShell["reviewHistory"] = [
  {
    date: "2026-06-27",
    phase: "Architecture Locked",
    note: "Four Parts adopted. Chapters reordered. Constitutional Council under Editorial Decision No. 49.",
  },
];

function ch(
  num: number,
  partId: string,
  partLabel: string,
  partTitle: string,
  title: string,
  purpose: string,
  scope: string,
  scopeExcludes: string[],
  constitutionalRefs: string[],
  canonRefs: string[],
  relatedBookRefs: GovernanceChapterShell["relatedBookRefs"],
  builderNotes: string[],
  status: GovernanceChapterShell["status"] = "planned",
): GovernanceChapterShell {
  const id = `book-i-ch-${String(num).padStart(2, "0")}`;
  return {
    id,
    chapter: `Chapter ${num}`,
    title,
    status,
    href: `/library/governance-code/book-i/chapters/${id}`,
    partId,
    partLabel,
    partTitle,
    purpose,
    scope,
    scopeExcludes,
    constitutionalRefs,
    canonRefs,
    relatedBookRefs,
    builderNotes,
    sessionHistory: BOOK_I_SESSIONS,
    reviewHistory: BOOK_I_REVIEW,
  };
}

export const BOOK_I_CHAPTERS: GovernanceChapterShell[] = [
  ch(
    1,
    "part-i",
    "Part I",
    "Governance Foundations",
    "Constitutional Governance Structure",
    "Explain how constitutional authority flows from founding principles to daily decision-makers — hierarchy and constitutional relationships.",
    "Governance hierarchy, sources of authority, and constitutional relationships only.",
    [
      "Body-specific definitions (Part II–III)",
      "Operational procedures (Books II–IV)",
      "Board procedures, committee charters, executive duties, voting rules",
    ],
    ["CONSTITUTION-ARTICLE-II", "CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-VIII"],
    ["CANON-002", "CANON-004"],
    [
      { identifier: "book-ii", title: "Book II — Board Operations", href: "/library/governance-code/book-ii" },
      { identifier: "book-iv", title: "Book IV — Governance Committees", href: "/library/governance-code/book-iv" },
    ],
    [
      "Foundational chapter — architecture proposed (Session LIB-2026-06-27-012).",
      "Eight sections. Three diagrams. CEF-001 education footer.",
      "No prose until architecture approved by Founder.",
    ],
    "architecture_review",
  ),
  ch(
    2,
    "part-i",
    "Part I",
    "Governance Foundations",
    "Governance Principles",
    "Short principles governing how governance is exercised — transparency, accountability, stewardship, merit, trust, long-term thinking.",
    "Principles only — not procedures.",
    ["Detailed standards (later Books)", "Canon text (Volume 0)"],
    ["CONSTITUTION-ARTICLE-II", "CONSTITUTION-ARTICLE-III"],
    ["CANON-002", "CANON-003", "CANON-004", "CANON-006"],
    [],
    ["Keep short — principles, not policy."],
  ),
  ch(
    3,
    "part-ii",
    "Part II",
    "Governance Authorities",
    "Board of Directors",
    "Define the Board's purpose, authority, reserved powers, and responsibilities — identity only.",
    "Board identity and constitutional authority.",
    ["Meeting procedures (Book II)", "Board papers and minutes (Book II)", "Board evaluations (Book II)"],
    ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-V"],
    ["CANON-004", "CANON-016"],
    [{ identifier: "book-ii", title: "Book II — Board Operations", href: "/library/governance-code/book-ii" }],
    ["Reserved Powers Register referenced — operations defined in Book II."],
  ),
  ch(
    4,
    "part-ii",
    "Part II",
    "Governance Authorities",
    "Executive Leadership",
    "Define Group CEO, CFO, CTO, COO, and future CKO — constitutional identity only.",
    "Executive leadership roles at Group level.",
    ["CEO duties and decision limits (Book III)", "Performance management (Book IX)"],
    ["CONSTITUTION-ARTICLE-V", "CONSTITUTION-ARTICLE-VI"],
    ["CANON-004", "CANON-020"],
    [{ identifier: "book-iii", title: "Book III — Executive Leadership", href: "/library/governance-code/book-iii" }],
    ["Future CKO reserved — identity only, not operational charter."],
  ),
  ch(
    5,
    "part-ii",
    "Part II",
    "Governance Authorities",
    "Institutional Leadership",
    "Define leadership of each ecosystem institution while remaining accountable to Group governance.",
    "Head-of-institution roles — Yike, BayRight, BamSignal, Stanhan, Auto Hub, Logistics, Gadgets, Education, Institute, Foundation.",
    ["Institution operations", "Product governance", "Company charters (Institution Lifecycle Register)"],
    ["CONSTITUTION-ARTICLE-I", "CONSTITUTION-ARTICLE-IX", "CONSTITUTION-ARTICLE-X"],
    ["CANON-005", "CANON-017"],
    [
      { identifier: "book-iii", title: "Book III — Executive Leadership", href: "/library/governance-code/book-iii" },
      { identifier: "FRAMEWORK-ILR-001", title: "Institution Lifecycle Register", href: "/library/institution-lifecycle" },
    ],
    ["Each institution accountable upward — not autonomous from Group governance."],
  ),
  ch(
    6,
    "part-iii",
    "Part III",
    "Governance Support",
    "Constitutional Council",
    "Protect the Constitution, the Canons, and constitutional integrity — not run the business.",
    "Constitutional Council identity and mandate — established under Governance Code authority.",
    ["Council meeting procedures (Book IV)", "Amendment mechanics (Article XV, Constitution Centre)"],
    ["CONSTITUTION-ARTICLE-II", "CONSTITUTION-ARTICLE-XV", "CONSTITUTION-ARTICLE-XVI"],
    ["CANON-002", "CANON-025"],
    [
      { identifier: "book-iv", title: "Book IV — Governance Committees", href: "/library/governance-code/book-iv" },
      { identifier: "constitution-centre", title: "Constitution Centre", href: "/library/constitution-centre" },
    ],
    [
      CONSTITUTIONAL_COUNCIL_PRINCIPLE,
      "Tagged: Governance Code authority — not a constitutional organ.",
    ],
  ),
  ch(
    7,
    "part-iii",
    "Part III",
    "Governance Support",
    "Governance Committees",
    "List every governance committee — existence and mandate summary only.",
    "Committee inventory and governance role.",
    ["Committee charters (Book IV)", "Meeting cadence and quorum (Book IV)"],
    ["CONSTITUTION-ARTICLE-IV"],
    ["CANON-004"],
    [{ identifier: "book-iv", title: "Book IV — Governance Committees", href: "/library/governance-code/book-iv" }],
    ["Names and existence only — charters deferred to Book IV."],
  ),
  ch(
    8,
    "part-iii",
    "Part III",
    "Governance Support",
    "Delegated Authority",
    "Who may delegate, what may be delegated, limits, and accountability.",
    "Delegation framework and limits.",
    ["Delegation register operations (Chapter 10)", "CEO delegations detail (Book III)"],
    ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-VI"],
    ["CANON-004", "CANON-007"],
    [{ identifier: "book-iii", title: "Book III — Executive Leadership", href: "/library/governance-code/book-iii" }],
    ["Accountability cannot be delegated — only authority."],
  ),
  ch(
    9,
    "part-iv",
    "Part IV",
    "Governance Framework",
    "Governance Relationships",
    "Show how Board, CEO, institutions, and operating teams relate — primarily diagrammatic.",
    "Governance relationship map and reporting lines.",
    ["Operational team management (Book IX)", "Committee reporting detail (Book IV)"],
    ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-IX"],
    ["CANON-005"],
    [
      { identifier: "book-ii", title: "Book II — Board Operations", href: "/library/governance-code/book-ii" },
      { identifier: "book-iii", title: "Book III — Executive Leadership", href: "/library/governance-code/book-iii" },
    ],
    ["Diagram-first chapter — complements Governance Map opening."],
  ),
  ch(
    10,
    "part-iv",
    "Part IV",
    "Governance Framework",
    "Governance Registers",
    "Introduce Board, Committee, Leadership, Delegation, Appointment, and Meeting registers — existence only.",
    "Register inventory and purpose.",
    ["Register operations and maintenance (Books II–IV, portals)", "Data fields and workflows"],
    ["CONSTITUTION-ARTICLE-VI", "CONSTITUTION-ARTICLE-XV"],
    ["CANON-007", "CANON-020"],
    [
      { identifier: "FRAMEWORK-CGOV-001", title: "Constitutional Governance Portal", href: "/library/governance" },
      { identifier: "FRAMEWORK-CDW-001", title: "Decision Workspace", href: "/library/decision-workspace" },
      { identifier: "FRAMEWORK-LGOV-001", title: "Leadership Governance Portal", href: "/library/leadership" },
    ],
    ["Introduce registers — operational detail lives in portals and later Books."],
  ),
];

export function getBookIChapter(chapterId: string): GovernanceChapterShell | undefined {
  return BOOK_I_CHAPTERS.find((c) => c.id === chapterId);
}

export function getBookIChapterSummaries() {
  return BOOK_I_CHAPTERS.map(({ id, chapter, title, status, href, partId, partLabel }) => ({
    id,
    chapter,
    title,
    status,
    href,
    partId,
    partLabel,
  }));
}

export function getBookIChaptersByPart(partId: string): GovernanceChapterShell[] {
  return BOOK_I_CHAPTERS.filter((c) => c.partId === partId);
}
