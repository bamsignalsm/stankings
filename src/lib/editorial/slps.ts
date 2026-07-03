/**
 * Stankings Library Publishing Standard (SLPS-001)
 * Editorial Decision No. 50 — Session LIB-2026-06-27-007
 */

export const SLPS_IDENTIFIER = "SLPS-001" as const;
export const SLPS_FRAMEWORK_ID = "FRAMEWORK-SLPS-001" as const;
export const SLPS_VERSION = "1.0";

/** @deprecated Use SLPS_IDENTIFIER — FRAMEWORK-LPS-001 aliases SLPS-001 */
export const LPS_LEGACY_ID = "FRAMEWORK-LPS-001" as const;

export const SLPS_PURPOSE = `The Stankings Library Publishing Standard (SLPS) defines the mandatory structure, metadata, publication lifecycle, and presentation requirements for every official publication issued by the Stankings Library.

This is a publishing constitution for the institution itself — not document creation, but institutional publishing.`;

export const SLPS_APPLIES_TO = [
  "Volume 0 — The Canons",
  "Volume I — Constitution",
  "Volume II — Governance Code",
  "Engineering Standards",
  "Technology Standards",
  "Family Constitution",
  "Family Trust Blueprint",
  "Venture Studio Manual",
  "Institutional History",
  "Research Papers",
  "White Papers",
  "Knowledge Objects (where appropriate)",
] as const;

export const SLPS_HUB_SECTIONS = [
  { number: 1, id: "purpose", title: "Purpose" },
  { number: 2, id: "lifecycle", title: "Publication Lifecycle" },
  { number: 3, id: "structure", title: "Standard Publication Structure" },
  { number: 4, id: "publication-metadata", title: "Metadata Standards — Publication" },
  { number: 5, id: "chapter-metadata", title: "Chapter Standards" },
  { number: 6, id: "diagram-metadata", title: "Diagram Standards" },
  { number: 7, id: "review", title: "Review & Approval Workflow" },
  { number: 8, id: "version-control", title: "Version Control" },
  { number: 9, id: "visual-design", title: "Visual Design System" },
  { number: 10, id: "cross-references", title: "Cross-Reference Requirements" },
  { number: 11, id: "session-history", title: "Session History Requirements" },
  { number: 12, id: "revision-history", title: "Revision History Requirements" },
] as const;

export const SLPS_PUBLICATION_STRUCTURE = [
  { step: 1, id: "cover", title: "Cover" },
  { step: 2, id: "publication-info", title: "Publication Information" },
  { step: 3, id: "publishers-note", title: "Publisher's Note" },
  { step: 4, id: "foundational-charter", title: "Foundational Charter" },
  { step: 5, id: "architecture-map", title: "Visual Architecture Map" },
  { step: 6, id: "toc", title: "Table of Contents" },
  { step: 7, id: "main-content", title: "Main Content" },
  { step: 8, id: "cross-references", title: "Cross References" },
  { step: 9, id: "knowledge-objects", title: "Knowledge Objects" },
  { step: 10, id: "appendices", title: "Appendices" },
  { step: 11, id: "glossary", title: "Glossary / Definitions" },
  { step: 12, id: "revision-history", title: "Revision History" },
  { step: 13, id: "session-history", title: "Session History" },
  { step: 14, id: "index", title: "Index" },
  { step: 15, id: "back-matter", title: "Back Matter" },
] as const;

export const SLPS_PUBLICATION_STATUSES = [
  "Concept",
  "Architecture",
  "Draft",
  "Editorial Review",
  "Convention Review",
  "Founder Approval",
  "Published",
  "Archived",
] as const;

export type SLPSPublicationStatus = (typeof SLPS_PUBLICATION_STATUSES)[number];

export const SLPS_PUBLICATION_METADATA_FIELDS = [
  "Publication ID",
  "Volume",
  "Book",
  "Part",
  "Edition",
  "Version",
  "Status",
  "Classification",
  "Owner",
  "Founder",
  "Editor-in-Chief",
  "Authority",
  "Authoritative Source",
  "Publisher",
  "Review Status",
  "Convention Status",
  "Publication Date",
  "Last Reviewed",
  "Next Review",
  "Review Cycle",
  "Related Volumes",
  "Related Canons",
  "Related Constitution Articles",
  "Knowledge Objects",
  "License",
  "Digital Signature",
] as const;

export const SLPS_CHAPTER_METADATA_FIELDS = [
  "Chapter ID",
  "Book",
  "Part",
  "Version",
  "Status",
  "Owner",
  "Review Cycle",
  "Dependencies",
  "Constitution References",
  "Canon References",
  "Knowledge Objects",
  "Engineering Standards",
  "Session History",
] as const;

export const SLPS_DIAGRAM_METADATA_FIELDS = [
  "Diagram ID",
  "Title",
  "Purpose",
  "Version",
  "Owner",
  "Source Chapters",
  "Related Articles",
  "Last Reviewed",
  "Export Formats (SVG, PDF, PNG)",
] as const;

export const SLPS_VISUAL_IDENTITY = [
  "Dark background (Obsidian Black)",
  "Legacy Gold accents — not generic gold",
  "Clean typography — serif for titles, sans for body",
  "Generous spacing",
  "Consistent icons and section headers",
  "Identical headers and footers across publications",
  "Institution first — decoration second",
] as const;

export const SLPS_MIGRATION_REGISTRY = [
  { volume: "Volume 0", slug: "first-principles", status: "migration_planned", href: "/library/first-principles" },
  { volume: "Volume I", slug: "constitution", status: "migration_planned", href: "/library/constitution" },
  { volume: "Volume II", slug: "governance-code", status: "in_progress", href: "/library/governance-code", note: "Book I — SLPS scaffold active" },
  { volume: "Engineering Standards", slug: "engineering-standards", status: "not_started", href: "/library/volumes/engineering-standards" },
  { volume: "Editorial Standards", slug: "editorial-standards", status: "published", href: "/library/editorial-standards" },
] as const;

// Re-export Foundational Charter constants used across SLPS
export {
  FOUNDATIONAL_CHARTER_PRINCIPLE,
  FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT,
  FOUNDATIONAL_CHARTER_QUESTION,
  FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS,
  SLPS_WRITING_RULES,
  CHAPTER_APPROVAL_TESTS,
  BOOK_CHARTER_PRINCIPLE,
  BOOK_CHARTER_PROBLEM_STATEMENT,
  BOOK_CHARTER_QUESTION,
} from "@/lib/editorial/foundational-charter";
