/**
 * Implementation Readiness — required before Builder's Notes reach Cursor
 * Adopted 2026-06-27 · Session LIB-2026-06-27-003
 */

export const IMPLEMENTATION_READINESS_TITLE = "Implementation Readiness Checklist";

export const IMPLEMENTATION_READINESS_INTRO = `Before anything reaches Cursor, it must pass Implementation Readiness.

If any item fails, we refine the Builder's Notes — we do not guess.`;

export const IMPLEMENTATION_READINESS_CHECKS = [
  {
    id: "objective",
    label: "Clear Objective",
    question: "What problem are we solving?",
  },
  {
    id: "scope",
    label: "Defined Scope",
    question: "What is included — and explicitly excluded?",
  },
  {
    id: "ambiguity",
    label: "No Ambiguity",
    question: "Could two engineers build different things from the same note?",
  },
  {
    id: "dependencies",
    label: "Dependencies Listed",
    question: "What existing volumes, canons, or systems does it rely on?",
  },
  {
    id: "acceptance",
    label: "Acceptance Criteria",
    question: "How do we know it is done?",
  },
  {
    id: "compatibility",
    label: "Future Compatibility",
    question: "Will this still fit the architecture five years from now?",
  },
] as const;

export const IMPLEMENTATION_READINESS_CHECKLIST = IMPLEMENTATION_READINESS_CHECKS.map(
  (c) => `□ ${c.label} — ${c.question}`,
);
