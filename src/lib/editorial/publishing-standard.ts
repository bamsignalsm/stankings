/**
 * Library Publishing Standard — every Book in the Stankings Library
 * Session LIB-2026-06-27-006 · Foundational Charter — ED 53
 */

import {
  FOUNDATIONAL_CHARTER_PRINCIPLE,
  FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT,
  FOUNDATIONAL_CHARTER_QUESTION,
} from "@/lib/editorial/foundational-charter";

export const LIBRARY_PUBLISHING_STANDARD_VERSION = "1.0";

export const LIBRARY_PUBLISHING_STANDARD_PRINCIPLE =
  "Every Book in the Stankings Library follows the same publishing hierarchy so every volume feels like it belongs to one institution." as const;

export const LIBRARY_PUBLISHING_HIERARCHY = [
  { step: 1, id: "cover", title: "Cover Page", description: "Title, volume, book, version, status." },
  {
    step: 2,
    id: "foundational-charter",
    title: "Foundational Charter",
    description: "Governing introduction — orients readers before detailed content.",
  },
  { step: 3, id: "map", title: "Governance / Knowledge Map", description: "Visual anchor — authority flow or knowledge structure." },
  { step: 4, id: "toc", title: "Table of Contents", description: "Parts, chapters, and navigation." },
  { step: 5, id: "content", title: "Main Content", description: "The substantive body of the Book." },
  { step: 6, id: "appendices", title: "Appendices", description: "Optional supporting material." },
  { step: 7, id: "sessions", title: "Session History", description: "Institutional memory — why decisions were made." },
  { step: 8, id: "revisions", title: "Revision History", description: "Version lineage and amendments." },
  { step: 9, id: "index", title: "Cross-Reference Index", description: "Links to Constitution, Canons, and related volumes." },
] as const;

export {
  FOUNDATIONAL_CHARTER_PRINCIPLE,
  FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT,
  FOUNDATIONAL_CHARTER_QUESTION,
  BOOK_CHARTER_PRINCIPLE,
  BOOK_CHARTER_PROBLEM_STATEMENT,
  BOOK_CHARTER_QUESTION,
} from "@/lib/editorial/foundational-charter";
