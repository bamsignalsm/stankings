/**
 * Book I — Foundational Charter architecture (ten sections — permanent template)
 * Architecture approved — v1.0 drafted — Session LIB-2026-06-27-010
 */

import type { GovernanceKnowledgeRef } from "@/lib/governance-code/types";
import {
  FOUNDATIONAL_CHARTER_PRINCIPLE,
  FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT,
  FOUNDATIONAL_CHARTER_QUESTION,
  FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS,
} from "@/lib/editorial/foundational-charter";
import { BOOK_I_FOUNDATIONAL_CHARTER_HREF } from "@/lib/governance-code/books/book-i/charter-content";

export const BOOK_I_CHARTER_ARCHITECTURE_STATUS = "approved" as const;

export const BOOK_I_CHARTER_META = {
  bookId: "book-i",
  bookLabel: "Book I",
  bookTitle: "Governance Bodies",
  href: BOOK_I_FOUNDATIONAL_CHARTER_HREF,
  version: "1.0 RC1",
  architectureVersion: "1.2",
  sectionCount: 10,
  problemStatement: FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT,
  principle: FOUNDATIONAL_CHARTER_PRINCIPLE,
  centralQuestion: FOUNDATIONAL_CHARTER_QUESTION,
  publishingStandardVersion: "SLPS-001",
  draftStatus: "drafted" as const,
  sessionId: "LIB-2026-06-27-011",
} as const;

export interface FoundationalCharterSectionArchitecture {
  id: string;
  number: number;
  title: string;
  description: string;
  fields: string[];
  draftStatus: "not_started" | "drafted";
}

/** @deprecated */
export type BookCharterSectionArchitecture = FoundationalCharterSectionArchitecture;

export const BOOK_CHARTER_PERMANENT_TEMPLATE = FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS;
export const FOUNDATIONAL_CHARTER_PERMANENT_TEMPLATE = FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS;

export const BOOK_I_CHARTER_SECTIONS: FoundationalCharterSectionArchitecture[] = [
  {
    id: "purpose",
    number: 1,
    title: "Purpose",
    description: "Why this Book exists. Answers: Why does this publication exist?",
    fields: ["Institutional problem solved", "Why Book I exists", "What readers should do after reading"],
    draftStatus: "drafted",
  },
  {
    id: "scope",
    number: 2,
    title: "Scope",
    description: "What belongs in this Book. What explicitly does not.",
    fields: ["Included topics", "Excluded topics", "Boundary with Books II–IV"],
    draftStatus: "drafted",
  },
  {
    id: "constitutional-authority",
    number: 3,
    title: "Constitutional Authority",
    description: "Which Articles authorize this Book. Governance Code authority under the Constitution.",
    fields: ["Related Constitution Articles", "Related Canons", "Governance Code authority statement"],
    draftStatus: "drafted",
  },
  {
    id: "governance-philosophy",
    number: 4,
    title: "Governance Philosophy",
    description: "One paragraph of institutional philosophy. No operational procedures.",
    fields: ["Single philosophy paragraph", "Trust, stewardship, accountability, continuity"],
    draftStatus: "drafted",
  },
  {
    id: "governance-map",
    number: 5,
    title: "Governance Map",
    description: "Visual anchor — authority flow and advisory bodies. Positioned after Governance Philosophy.",
    fields: ["Authority flow diagram", "Advisory and oversight bodies", "Print export"],
    draftStatus: "drafted",
  },
  {
    id: "book-structure",
    number: 6,
    title: "Book Structure",
    description: "Parts and chapters — where everything lives.",
    fields: ["Part I through Part IV", "Chapter navigation tree", "Reading order"],
    draftStatus: "drafted",
  },
  {
    id: "reading-guide",
    number: 7,
    title: "Reading Guide",
    description: "Recommended paths by audience. Answers: How should this Book be used?",
    fields: [
      "Director path",
      "Executive path",
      "Engineer path",
      "Governance Professional path",
      "Future Custodian path",
      "New Employee path",
    ],
    draftStatus: "drafted",
  },
  {
    id: "related-resources",
    number: 8,
    title: "Related Library Resources",
    description: "Everything connected. Answers: How does this relate to the rest of the Library?",
    fields: ["Volume I", "Volume 0", "Commentary", "Knowledge Objects", "Session Records"],
    draftStatus: "drafted",
  },
  {
    id: "publication-status",
    number: 9,
    title: "Publication Status",
    description: "Version, convention, publication, review, editorial and founder approval.",
    fields: ["Version", "Status", "Founder approval", "Editorial approval", "Convention status"],
    draftStatus: "drafted",
  },
  {
    id: "success-criteria",
    number: 10,
    title: "Success Criteria",
    description: "Measurable definition of when this Book is complete — not page count.",
    fields: [
      "Governance bodies clearly identified",
      "Authority boundaries unambiguous",
      "No constitutional conflicts",
      "Later Books can build without redefining bodies",
    ],
    draftStatus: "drafted",
  },
];

export const BOOK_I_READING_GUIDE_ARCHITECTURE = [
  { audience: "Directors", recommendedPath: "Foundational Charter → Part I → Part II (Ch 1–5)" },
  { audience: "Executives", recommendedPath: "Part II first (Ch 4–5), then Part I" },
  { audience: "Engineers", recommendedPath: "Chapter 9 — Governance Relationships" },
  { audience: "Governance Professionals", recommendedPath: "Sections 3–4, Part I, Part IV" },
  { audience: "Future Custodians", recommendedPath: "Entire Book — Foundational Charter through Chapter 10" },
  { audience: "New Employees", recommendedPath: "Foundational Charter, then Part I" },
] as const;

export const BOOK_I_RELATED_RESOURCES: GovernanceKnowledgeRef[] = [
  { identifier: "constitution", title: "Volume I — Constitution", href: "/library/constitution" },
  { identifier: "volume-zero", title: "Volume 0 — The Canons", href: "/library/first-principles" },
  { identifier: "constitutional-convention", title: "Constitutional Convention", href: "/library/constitutional-convention" },
  { identifier: "FRAMEWORK-FC-001", title: "Foundational Charter Standard", href: "/library/editorial-standards/foundational-charter" },
  { identifier: "FRAMEWORK-SLPS-001", title: "Publishing Standard (SLPS-001)", href: "/library/editorial-standards/publishing-standard" },
  { identifier: "library-sessions", title: "Library Session Records", href: "/library/sessions" },
];

export const BOOK_I_BOOK_STATUS_FIELDS = [
  { field: "Charter version", value: "1.0" },
  { field: "Charter status", value: "Draft — Editorial Review" },
  { field: "Book architecture", value: "Locked" },
  { field: "Charter architecture", value: "Approved — Ten sections" },
  { field: "Founder approval", value: "Pending" },
  { field: "Editorial approval", value: "In review" },
  { field: "Convention status", value: "Not started" },
  { field: "Publication status", value: "Not published" },
] as const;
