/**
 * Book I — Foundational Charter v1.0 RC1
 * First published draft — Session LIB-2026-06-27-011
 */

import type { GovernanceFoundationalCharter } from "@/lib/governance-code/types";
import {
  BOOK_I_FOUNDATIONAL_CHARTER_HREF,
  BOOK_I_FOUNDATIONAL_CHARTER_KO_ID,
} from "@/lib/governance-code/books/book-i/charter-content";
import {
  BOOK_I_FOUNDATIONAL_CHARTER_SESSION,
  BOOK_I_FOUNDATIONAL_CHARTER_VERSION,
} from "@/lib/governance-code/books/book-i/foundational-charter-sections";

const SESSIONS: GovernanceFoundationalCharter["sessionHistory"] = [
  {
    sessionId: "LIB-2026-06-27-005",
    title: "Governance Architecture Refined",
    href: "/library/sessions/LIB-2026-06-27-005",
    date: "2026-06-27",
  },
  {
    sessionId: "LIB-2026-06-27-010",
    title: "Foundational Charter Adopted",
    href: "/library/sessions/LIB-2026-06-27-010",
    date: "2026-06-27",
  },
  {
    sessionId: "LIB-2026-06-27-011",
    title: "First Published Draft of the Foundational Charter",
    href: "/library/sessions/LIB-2026-06-27-011",
    date: "2026-06-27",
  },
];

export const BOOK_I_FOUNDATIONAL_CHARTER: GovernanceFoundationalCharter = {
  bookId: "book-i",
  bookLabel: "Book I",
  bookTitle: "Governance Bodies",
  href: BOOK_I_FOUNDATIONAL_CHARTER_HREF,
  purpose:
    "Translate constitutional principles into disciplined governance practice by defining the bodies through which authority is exercised.",
  scope: "Governance bodies — identity, constitutional standing, and authority boundaries.",
  scopeExcludes: [
    "Board meeting procedures",
    "Committee operating rules",
    "Executive performance management",
    "Voting procedures",
    "Risk, financial, and technology governance procedures",
  ],
  constitutionalAuthority: [
    "Volume I — The Stankings Group Constitution",
    "The Stankings Canons",
    "Executive Decisions under the Governance Framework",
  ],
  constitutionalRefs: ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-V", "CONSTITUTION-ARTICLE-VIII"],
  canonRefs: ["CANON-002", "CANON-004", "CANON-006", "CANON-020"],
  relatedBooks: [
    { identifier: "book-ii", title: "Book II — Board Operations", href: "/library/governance-code/book-ii" },
    { identifier: "book-iii", title: "Book III — Executive Leadership", href: "/library/governance-code/book-iii" },
    { identifier: "book-iv", title: "Book IV — Governance Committees", href: "/library/governance-code/book-iv" },
  ],
  version: BOOK_I_FOUNDATIONAL_CHARTER_VERSION,
  status: "Draft – Editorial Review",
  editorialNotes: [
    "First substantive governance publication under SLPS-001.",
    "Orient readers — do not govern them.",
    "Submitted for Founder Review — LIB-2026-06-27-011.",
  ],
  sessionHistory: SESSIONS,
  reviewHistory: [
    {
      date: "2026-06-27",
      phase: "First Draft",
      note: "Foundational Charter v1.0 RC1 — ten sections. Editorial review.",
    },
  ],
};

export const BOOK_I_CHARTER = BOOK_I_FOUNDATIONAL_CHARTER;

export { BOOK_I_FOUNDATIONAL_CHARTER_KO_ID };
