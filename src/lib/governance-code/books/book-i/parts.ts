/**
 * Book I — Parts (architecture locked)
 */

import type { GovernanceBookPart } from "@/lib/governance-code/types";

export const BOOK_I_PARTS: GovernanceBookPart[] = [
  {
    id: "part-i",
    part: "Part I",
    title: "Governance Foundations",
    subtitle: "Constitutional context and principles",
    href: "/library/governance-code/book-i/parts/part-i",
    chapterIds: ["book-i-ch-01", "book-i-ch-02"],
  },
  {
    id: "part-ii",
    part: "Part II",
    title: "Governance Authorities",
    subtitle: "Bodies that exercise decision authority",
    href: "/library/governance-code/book-i/parts/part-ii",
    chapterIds: ["book-i-ch-03", "book-i-ch-04", "book-i-ch-05"],
  },
  {
    id: "part-iii",
    part: "Part III",
    title: "Governance Support",
    subtitle: "Guardianship, committees, and delegation",
    href: "/library/governance-code/book-i/parts/part-iii",
    chapterIds: ["book-i-ch-06", "book-i-ch-07", "book-i-ch-08"],
  },
  {
    id: "part-iv",
    part: "Part IV",
    title: "Governance Framework",
    subtitle: "Relationships and registers",
    href: "/library/governance-code/book-i/parts/part-iv",
    chapterIds: ["book-i-ch-09", "book-i-ch-10"],
  },
];

export function getBookIPart(partId: string): GovernanceBookPart | undefined {
  return BOOK_I_PARTS.find((p) => p.id === partId);
}
