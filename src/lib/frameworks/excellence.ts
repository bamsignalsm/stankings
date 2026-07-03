/**
 * Excellence Framework (EXF)
 * Culture operationalized from CANON-008 — Executive Decision No. 10
 */

export const EXF_FRAMEWORK = {
  identifier: "FRAMEWORK-EXF-001",
  title: "Excellence Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-004",
    "CANON-005",
    "CANON-006",
    "CANON-007",
    "CANON-008",
    "LEX-EXCELLENCE",
  ],
} as const;

export const EXF_PURPOSE = `Every department and recurring operational process shall define what excellence looks like — making quality repeatable, not accidental.

The EXF operationalizes CANON-008 — Excellence Is a Discipline, Not an Event.

This is not micromanagement. It is institutional discipline that protects against bureaucracy and appearances over substance.`;

export const EXF_EXCELLENCE_TEST =
  "Does this represent the standard we wish future generations to inherit? If our name appeared beside this work permanently, would we remain proud of it?";

export const EXECUTIVE_DECISION_10 = `Every recurring operational process within Stankings Group should have a documented Standard of Excellence.

If a process cannot describe what "excellent" looks like, it cannot consistently produce excellent outcomes.

The Standard of Excellence should become part of onboarding, training, quality assurance and continuous improvement across the ecosystem.`;

export const EXF_DEPARTMENT_REQUIREMENTS = [
  { id: "standards", label: "Standards of Excellence", description: "What excellent looks like — specific, observable, non-negotiable." },
  { id: "kpis", label: "Key Performance Indicators", description: "Measurable outcomes that reflect sustained quality." },
  { id: "checklist", label: "Quality Checklists", description: "Repeatable verification before work is considered complete." },
  { id: "improvement", label: "Continuous Improvement Plans", description: "How standards rise over time — not perfectionism, but discipline." },
  { id: "audit", label: "Audit Frequency", description: "How often excellence is reviewed against reality." },
  { id: "lessons", label: "Lessons Learned", description: "Institutional memory from failures and improvements." },
  { id: "canons", label: "Canon References", description: "Alignment with CANON-001 through CANON-008." },
] as const;
