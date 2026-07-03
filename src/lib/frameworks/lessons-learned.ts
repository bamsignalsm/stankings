/**
 * Lessons Learned Repository (LLR)
 * Operational system derived from CANON-009 — Executive Decision No. 11
 */

export const LLR_FRAMEWORK = {
  identifier: "FRAMEWORK-LLR-001",
  title: "Lessons Learned Repository",
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
    "CANON-009",
    "LEX-LEARNING",
    "LS-001",
  ],
} as const;

export const LLR_PURPOSE = `Every significant initiative shall conclude with a Lessons Learned Review — transforming experience into institutional knowledge.

The LLR operationalizes CANON-009 — Learn Continuously, Improve Deliberately.

This is not blame assignment. It is how Stankings Group becomes a learning institution capable of spanning technology, real estate, finance, education, logistics and institutions yet to be founded.`;

export const LLR_LEARNING_TEST =
  "What have we learned? What should we preserve? What should we improve? How will future teams benefit from this experience?";

export { EXECUTIVE_DECISION_11 } from "@/lib/iki";

export const LLR_MANDATORY_TRIGGERS = [
  "Software release or platform launch",
  "Property development or major transaction",
  "Logistics rollout or operational expansion",
  "Customer incident or service failure",
  "Governance or constitutional review",
  "Strategic project or institutional initiative",
] as const;

export const LLR_REQUIRED_FIELDS = [
  { id: "summary", label: "Project Summary", description: "What the initiative was — context, scope, and timeline." },
  { id: "objectives", label: "Objectives", description: "What the project intended to achieve." },
  { id: "outcomes", label: "Outcomes", description: "What actually happened — measured where possible." },
  { id: "successes", label: "Successes", description: "What worked and should be preserved or repeated." },
  { id: "challenges", label: "Challenges", description: "Difficulties, setbacks, and unexpected conditions." },
  { id: "root-causes", label: "Root Causes", description: "Underlying reasons — not symptoms alone." },
  { id: "lessons", label: "Lessons Learned", description: "Institutional insights future teams should inherit." },
  { id: "improvements", label: "Recommended Improvements", description: "Concrete actions for future initiatives." },
  { id: "canons", label: "Related Canons", description: "Which Canons were strengthened or tested." },
  { id: "kos", label: "Related Knowledge Objects", description: "Cross-references to Library objects." },
  { id: "teams", label: "Teams Involved", description: "Institutions and roles that contributed." },
  { id: "review", label: "Review Date", description: "When the Lessons Learned Review was conducted." },
  { id: "approval", label: "Approval Status", description: "Governance state — draft, under review, or approved." },
] as const;

export const LLR_CLOSING_QUESTIONS = [
  "What worked?",
  "What didn't?",
  "What surprised us?",
  "What should become a Library Knowledge Object?",
  "Which Canon did we strengthen?",
  "Which Canon did we violate?",
  "What should future teams know?",
] as const;
