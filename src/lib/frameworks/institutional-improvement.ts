/**
 * Institutional Improvement Register (IIR) + Annual Stewardship Review (ASR)
 * Derived from CANON-019 — Executive Decision No. 21
 */

export const IIR_FRAMEWORK = {
  identifier: "FRAMEWORK-IIR-001",
  title: "Institutional Improvement Register",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-004",
    "CANON-006",
    "CANON-009",
    "CANON-016",
    "CANON-018",
    "CANON-019",
    "FRAMEWORK-LLR-001",
    "LEX-IMPROVEMENT",
    "LEX-STEWARDSHIP",
    "LS-001",
  ],
} as const;

export const ASR_FRAMEWORK = {
  identifier: "FRAMEWORK-ASR-001",
  title: "Annual Stewardship Review",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: ["CANON-004", "CANON-006", "CANON-019", "FRAMEWORK-IIR-001", "LS-001"],
} as const;

export const IIR_PURPOSE = `Every department, company and platform shall maintain a living register of improvements — a visible history of how the institution has matured over decades.

The Institutional Improvement Register operationalizes CANON-019 — Leave It Better Than You Found It.`;

export const ASR_PURPOSE = `Every department and operating institution shall conduct an Annual Stewardship Review.

Reviews become permanent Knowledge Objects within the Stankings Library — auditable records of what each generation preserved, improved, learned, and passed forward.`;

export const IIR_IMPROVEMENT_TEST =
  "What is measurably better because we were here? Which future burdens have we reduced? Which future opportunities have we created? Will those who follow inherit a stronger foundation?";

export const ASR_STEWARDSHIP_QUESTIONS = [
  {
    id: "preserve",
    question: "What did we preserve?",
    description: "Principles, capabilities, relationships, and knowledge entrusted to this generation.",
  },
  {
    id: "improve",
    question: "What did we improve?",
    description: "Measurable improvements recorded in the Institutional Improvement Register.",
  },
  {
    id: "learn",
    question: "What did we learn?",
    description: "Lessons, incidents, and reflections that strengthen future decisions.",
  },
  {
    id: "foundation",
    question: "What stronger foundation have we left for those who follow?",
    description: "Systems, people, culture, and opportunities the next generation inherits.",
  },
] as const;

export const IIR_RECORD_FIELDS = [
  { id: "improvement-id", label: "Improvement ID", description: "Unique identifier — e.g. IIR-YIKE-001." },
  { id: "area", label: "Area Improved", description: "Department, company, platform, or domain." },
  { id: "problem", label: "Problem Identified", description: "What was wrong, missing, or weaker than required." },
  { id: "improvement", label: "Improvement Made", description: "What changed — concrete and specific." },
  { id: "reason", label: "Reason for Change", description: "Why this improvement mattered institutionally." },
  { id: "outcome", label: "Measured Outcome", description: "Evidence the institution is stronger — metrics, feedback, capability." },
  { id: "canons", label: "Related Canons", description: "Volume 0 Canons this improvement supports." },
  { id: "knowledge", label: "Knowledge Objects Updated", description: "Library records, standards, or lessons updated." },
  { id: "teams", label: "Teams Involved", description: "Who contributed to the improvement." },
  { id: "implemented", label: "Date Implemented", description: "When improvement went live or was completed." },
  { id: "review", label: "Review Date", description: "When improvement outcome will be reassessed." },
] as const;

export type ImprovementCategory =
  | "customer"
  | "engineering"
  | "governance"
  | "community"
  | "learning"
  | "operations";

export const IIR_CATEGORY_LABELS: Record<ImprovementCategory, string> = {
  customer: "Customer-Driven",
  engineering: "Engineering",
  governance: "Governance",
  community: "Community",
  learning: "Learning",
  operations: "Operations",
};

export const IIR_DASHBOARD_METRICS = [
  "Improvements This Quarter",
  "Improvements This Year",
  "Customer-Driven Improvements",
  "Engineering Improvements",
  "Governance Improvements",
  "Community Improvements",
] as const;
