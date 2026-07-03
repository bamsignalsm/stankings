/**
 * Book I — progress tracking
 */

export const BOOK_I_PROGRESS = {
  book: "Book I — Governance Bodies",
  status: "Editorial Review",
  phases: {
    architecture: 100,
    foundationalCharterDesign: 100,
    foundationalCharterWriting: 100,
    founderReview: 0,
    chapter1Architecture: 100,
    chapter1Writing: 0,
    chapterDrafting: 0,
    convention: 0,
    publication: 0,
  },
  nextMilestone: "Founder approval of Chapter 1 architecture",
  thenBegin: "Section 1 — Purpose of Governance",
} as const;

export function formatBookIProgressText(): string {
  const p = BOOK_I_PROGRESS;
  return `══════════════════════════════════════

VOLUME II — GOVERNANCE CODE

Book I — Governance Bodies

Foundational Charter

✓ First Draft Complete (v1.0 RC1)

──────────────────────────────────────

Chapter 1 — Constitutional Governance Structure

Status

🟡 Architecture Review

Progress

Architecture        ██████████ 100%

Writing             ░░░░░░░░░░ 0%

Review              ░░░░░░░░░░ 0%

Publication         ░░░░░░░░░░ 0%

Next Milestone

${p.nextMilestone}

Then draft:
${p.thenBegin}

══════════════════════════════════════`;
}
