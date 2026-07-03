import { GOVERNANCE_CODE_BOOKS, GOVERNANCE_CODE_STATUS } from "@/lib/governance-code/volume-ii";
import { VOLUME_I_ARTICLE_COUNT } from "@/lib/constitution/article-registry";
import { VOLUME_ZERO_CANON_COUNT } from "@/lib/volume-zero/version";
import type { LibraryProgressReport } from "@/lib/library-sessions/types";

const BOOKS_ARCHITECTED = GOVERNANCE_CODE_BOOKS.length;

export function getLibraryProgressReport(): LibraryProgressReport {
  return {
    generatedAt: "2026-06-27",
    volumesCompleted: [
      { label: "Volume 0 — The Canons", href: "/library/first-principles" },
      { label: "Volume I — Constitution", href: "/library/constitution" },
      { label: "Constitutional Convention", href: "/library/constitutional-convention" },
      { label: "Editorial Workflow Standard", href: "/library/editorial-standards/editorial-workflow" },
      { label: "Publishing Standard (SLPS-001)", href: "/library/editorial-standards/publishing-standard" },
      { label: "Publishing System (SLPS-CORE)", href: "/library/editorial-standards/publishing-system" },
    ],
    volumeInProgress: {
      label: "Volume II — Governance Code",
      href: "/library/governance-code",
      detail: "Book I — Foundational Charter v1.0 RC1 editorial review; Chapter 1 architecture review",
    },
    currentBook: {
      label: "Book I — Governance Bodies",
      status: "Chapter 1 Architecture Review",
      href: "/library/governance-code/book-i/chapters/book-i-ch-01",
    },
    booksCompleted: { completed: 0, total: BOOKS_ARCHITECTED },
    constitution: {
      completed: VOLUME_I_ARTICLE_COUNT,
      total: VOLUME_I_ARTICLE_COUNT,
      status: "Complete — Convention review",
    },
    canons: { approved: VOLUME_ZERO_CANON_COUNT, status: "Version 1.0 sealed" },
    knowledgeObjects: { label: "IKI / Library Engine", status: "Growing" },
    convention: { status: "Active", href: "/library/constitutional-convention" },
    editorialMotto: "Slow enough to think. Fast enough to build.",
  };
}

export const FUTURE_VOLUMES = [
  "Engineering Standards",
  "Technology Standards",
  "Operating Policies",
  "Family Constitution",
  "Family Trust Blueprint",
  "Venture Studio Manual",
  "Library Commentary",
  "Institutional History",
] as const;

export function formatProgressReportText(report: LibraryProgressReport): string {
  return `══════════════════════════════════════

STANKINGS LIBRARY

MASTER PROGRESS REPORT

══════════════════════════════════════

FOUNDATIONAL STANDARDS

${report.volumesCompleted.map((v) => `✓ ${v.label}`).join("\n")}
✓ Implementation Readiness (EDW-001)
✓ Foundational Charter Standard (FC-001)
✓ Chapter Education Standard (CEF-001)

──────────────────────────────────────

CURRENT WORK

▶ ${report.volumeInProgress.label}
  ${report.volumeInProgress.detail}

Book I — Governance Bodies

Foundational Charter

First Draft (v1.0 RC1) — Editorial Review

Founder Review

Pending

Chapter 1 — Constitutional Governance Structure

Architecture Review

Next: Founder approval → Section 1 drafting

──────────────────────────────────────

PLATFORM STATUS

Publication Generator
Approved

Metadata Engine
Approved

Cross-Reference Engine
Approved

Review Engine
Approved

Publishing Engine
Planned

Institutional Search
Approved

Institutional AI
Future Ready

──────────────────────────────────────

Editorial Standards

Workflow
Published

Publishing Standard (SLPS-001)
Published

Publishing System (SLPS-CORE)
Published

Publication Generator
Published

──────────────────────────────────────

Future Volumes

${FUTURE_VOLUMES.map((v) => `□ ${v}`).join("\n")}

──────────────────────────────────────

Institutional Status

Canons
${report.canons.approved} Approved

Constitution
${report.constitution.completed} Articles Complete

Convention
${report.convention.status}

Volume II
${GOVERNANCE_CODE_STATUS}

Editorial Motto

"${report.editorialMotto}"

══════════════════════════════════════`;
}
