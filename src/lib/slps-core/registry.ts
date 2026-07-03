/**
 * SLPS-CORE — Stankings Library Publishing System
 * Editorial Decision No. 51 — Session LIB-2026-06-27-008
 *
 * The Standard (SLPS-001) says what. SLPS-CORE makes it happen.
 */

export const SLPS_CORE_IDENTIFIER = "SLPS-CORE" as const;
export const SLPS_CORE_FRAMEWORK_ID = "FRAMEWORK-SLPS-CORE-001" as const;
export const SLPS_CORE_VERSION = "1.0";

export type SLPSCoreModuleStatus =
  | "approved"
  | "implemented"
  | "planned"
  | "future_ready";

export interface SLPSCoreModule {
  id: string;
  number: number;
  title: string;
  description: string;
  status: SLPSCoreModuleStatus;
  route?: string;
  enforces: string;
}

export const SLPS_CORE_PURPOSE = `SLPS-CORE is the publishing engine that enforces the Stankings Library Publishing Standard (SLPS-001) across every present and future publication.

Publishing Standard (rules) → Publishing System (engine) → Publication Generator → Volumes → Books → Chapters → Knowledge Objects.`;

export const SLPS_CORE_ARCHITECTURE = [
  "Publishing Standard (SLPS-001) — Rules",
  "Publishing System (SLPS-CORE) — Engine",
  "Publication Generator — Scaffold",
  "Volumes → Books → Chapters → Knowledge Objects",
] as const;

export const SLPS_CORE_IMPLEMENTATION_RULES = [
  "Every publication must originate from the Publication Generator.",
  "Metadata is system-managed — never edited manually.",
  "Cross-references are generated automatically where possible.",
  "Every publication maintains immutable revision and session histories.",
  "Existing volumes migrate progressively to SLPS-CORE.",
  "Platform architecture is frozen — no new platform features unless they unblock real publishing work.",
] as const;

export const SLPS_CORE_MODULES: readonly SLPSCoreModule[] = [
  {
    id: "publication-generator",
    number: 1,
    title: "Publication Generator",
    description:
      "Scaffolds new publications from SLPS-001 — structure, metadata, navigation, and status tracking. Never starts with a blank page.",
    status: "implemented",
    route: "/library/editorial-standards/publishing-standard/generator",
    enforces: "Standard Publication Structure",
  },
  {
    id: "metadata-engine",
    number: 2,
    title: "Metadata Engine",
    description:
      "Centralizes publication metadata — IDs, versions, editions, status, review dates, authors, editors, approvals, and digital signatures.",
    status: "implemented",
    enforces: "Metadata Standards",
  },
  {
    id: "cross-reference-engine",
    number: 3,
    title: "Cross-Reference Engine",
    description:
      "Resolves institutional references automatically — Canons, Constitution, Governance Code, commentary, sessions, decisions, and Knowledge Objects.",
    status: "implemented",
    enforces: "Cross-Reference Requirements",
  },
  {
    id: "review-engine",
    number: 4,
    title: "Review Engine",
    description:
      "Tracks publication lifecycle — Architecture through Draft, Editorial Review, Convention Review, Founder Approval, Published, and Archived.",
    status: "implemented",
    enforces: "Review & Approval Workflow",
  },
  {
    id: "publishing-engine",
    number: 5,
    title: "Publishing Engine",
    description:
      "Single source, multiple outputs — Web, print-ready PDF, EPUB, DOCX, and hardcover layout.",
    status: "planned",
    enforces: "Visual Design System",
  },
  {
    id: "institutional-search",
    number: 6,
    title: "Institutional Search",
    description:
      "Unified search across the entire Library — volumes, books, chapters, canons, standards, sessions, decisions, and Knowledge Objects.",
    status: "implemented",
    enforces: "Discoverability",
  },
  {
    id: "institutional-ai",
    number: 7,
    title: "Institutional AI Layer",
    description:
      "Future-ready interfaces for conversational Library queries — governance decisions, version diffs, and contextual answers with citations.",
    status: "future_ready",
    enforces: "Knowledge Governance (Art. XIII)",
  },
] as const;

export function getSLPSCoreModule(id: string): SLPSCoreModule | undefined {
  return SLPS_CORE_MODULES.find((m) => m.id === id);
}
