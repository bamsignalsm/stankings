/**
 * Institutional Strength Assessment (ISA)
 * Derived from CANON-016 — Executive Decision No. 18
 */

export const ISA_FRAMEWORK = {
  identifier: "FRAMEWORK-ISA-001",
  title: "Institutional Strength Assessment",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-012",
    "CANON-016",
    "FRAMEWORK-PAF-001",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-EIA-001",
    "FRAMEWORK-GRF-001",
    "LEX-STRENGTH",
    "LS-001",
  ],
} as const;

export const ISA_PURPOSE = `Every acquisition, strategic partnership, new company, major capital investment and platform initiative shall be evaluated for institutional strength before approval.

The Institutional Strength Assessment operationalizes CANON-016 — Build for Institutional Strength.

Financial performance remains important. Financial performance alone shall never justify a decision that weakens the institution's long-term strength.`;

export const ISA_STRENGTH_TEST =
  "Will this make Stankings Group stronger? Will future generations inherit a more capable institution? Does this strengthen multiple parts of the ecosystem?";

export const ISA_SCORE_DIMENSIONS = [
  {
    id: "capability",
    label: "Capability Score",
    description: "Does this create a new capability or materially strengthen an existing one?",
    scale: "1–5",
  },
  {
    id: "resilience",
    label: "Resilience Score",
    description: "Does it reduce institutional risk and increase long-term resilience?",
    scale: "1–5",
  },
  {
    id: "knowledge",
    label: "Knowledge Score",
    description: "Will the institution become smarter — new learning preserved in IKI?",
    scale: "1–5",
  },
  {
    id: "trust",
    label: "Trust Score",
    description: "Does it strengthen public and customer confidence?",
    scale: "1–5",
  },
  {
    id: "ecosystem",
    label: "Ecosystem Score",
    description: "How many institutions benefit? Does it strengthen the ecosystem map?",
    scale: "1–5",
  },
  {
    id: "strategic",
    label: "Strategic Score",
    description: "Does it align with long-term institutional direction and purpose?",
    scale: "1–5",
  },
  {
    id: "generational",
    label: "Generational Score",
    description: "Will this still matter in fifty years?",
    scale: "1–5",
  },
] as const;

export const ISA_INTEGRATED_GATEWAYS = [
  {
    id: "paf",
    label: "Purpose Assessment",
    framework: "FRAMEWORK-PAF-001",
    href: "/library/frameworks/purpose-assessment",
    role: "Does this serve a clear institutional purpose?",
  },
  {
    id: "tia",
    label: "Trust Impact Assessment",
    framework: "FRAMEWORK-TIA-001",
    href: "/library/frameworks/trust-impact-assessment",
    role: "Trust dimension validated independently.",
  },
  {
    id: "eia",
    label: "Ecosystem Impact Assessment",
    framework: "FRAMEWORK-EIA-001",
    href: "/library/frameworks/ecosystem-impact-assessment",
    role: "Ecosystem dimension and duplication check.",
  },
  {
    id: "grf",
    label: "Generational Review",
    framework: "FRAMEWORK-GRF-001",
    href: "/library/frameworks/generational-review",
    role: "Generational score validated for major initiatives.",
  },
] as const;

export type StrengthAssessmentVerdict = "proceed" | "refine" | "reject";

export interface InstitutionalStrengthAssessment {
  id: string;
  proposalTitle: string;
  proposalType: string;
  proposalSummary: string;
  scores: {
    capability: number;
    resilience: number;
    knowledge: number;
    trust: number;
    ecosystem: number;
    strategic: number;
    generational: number;
  };
  pillarsStrengthened: string[];
  verdict: StrengthAssessmentVerdict;
  canonReferences: string[];
  financialNote: string;
  notes: string;
}

function averageScore(scores: InstitutionalStrengthAssessment["scores"]): number {
  const values = Object.values(scores);
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

export function getStrengthAssessmentAverage(assessment: InstitutionalStrengthAssessment): number {
  return averageScore(assessment.scores);
}

export const ISA_EXAMPLE_LOGISTICS: InstitutionalStrengthAssessment = {
  id: "isa-logistics-launch",
  proposalTitle: "Stankings Logistics — ecosystem fleet and dispatch platform",
  proposalType: "New company / platform initiative",
  proposalSummary:
    "Establish logistics as shared infrastructure — fleet, dispatch, tracking for Yike, Stanhan, and enterprise clients.",
  scores: {
    capability: 5,
    resilience: 4,
    knowledge: 4,
    trust: 4,
    ecosystem: 5,
    strategic: 5,
    generational: 5,
  },
  pillarsStrengthened: [
    "Institutional Capability",
    "Institutional Resilience",
    "Institutional Service",
    "Institutional Sustainability",
  ],
  verdict: "proceed",
  canonReferences: ["CANON-016", "CANON-005", "CANON-012"],
  financialNote: "Positive ROI projected — but ISA proceed verdict driven by institutional strength, not finance alone.",
  notes: "Adds movement capability no other institution provides. Platform Assessment aligned. EIA confirms ecosystem strengthening.",
};

export const ISA_EXAMPLE_REJECT: InstitutionalStrengthAssessment = {
  id: "isa-duplicate-marketplace",
  proposalTitle: "Acquire regional classifieds platform — duplicate marketplace",
  proposalType: "Acquisition",
  proposalSummary:
    "Acquire high-traffic classifieds site with strong short-term revenue. Overlaps Yike property and vehicle listings.",
  scores: {
    capability: 2,
    resilience: 2,
    knowledge: 2,
    trust: 2,
    ecosystem: 1,
    strategic: 2,
    generational: 2,
  },
  pillarsStrengthened: [],
  verdict: "reject",
  canonReferences: ["CANON-016", "CANON-005", "CANON-011"],
  financialNote: "Financially attractive — rejected on institutional weakness. Duplication weakens coherence.",
  notes: "EIA flags capability duplication. Weakens platform thinking. Reject regardless of revenue.",
};

export const ISA_EXAMPLE_REFINE: InstitutionalStrengthAssessment = {
  id: "isa-education-expansion",
  proposalTitle: "Hannahkings Education — national online degree partnership",
  proposalType: "Strategic partnership",
  proposalSummary:
    "Partner with external university for online degrees under Hannahkings Education brand.",
  scores: {
    capability: 4,
    resilience: 3,
    knowledge: 4,
    trust: 3,
    ecosystem: 3,
    strategic: 4,
    generational: 5,
  },
  pillarsStrengthened: [
    "Institutional Knowledge",
    "Institutional Service",
    "Institutional Reputation",
  ],
  verdict: "refine",
  canonReferences: ["CANON-016", "CANON-003", "CANON-006"],
  financialNote: "Partnership terms favourable — refine trust and quality controls before proceed.",
  notes: "Strengthens generational mission. Refine: HIR on student experience, TIA on brand association, quality standards per CANON-008.",
};

export const ISA_EXAMPLE_ASSESSMENTS: InstitutionalStrengthAssessment[] = [
  ISA_EXAMPLE_LOGISTICS,
  ISA_EXAMPLE_REJECT,
  ISA_EXAMPLE_REFINE,
];
