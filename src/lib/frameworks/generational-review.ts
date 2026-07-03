/**
 * Generational Review Framework (GRF)
 * Decision gate derived from CANON-006 — Executive Decision No. 8
 */

export const GRF_FRAMEWORK = {
  identifier: "FRAMEWORK-GRF-001",
  title: "Generational Review Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-004",
    "CANON-005",
    "CANON-006",
    "LEX-LEGACY",
    "LEX-STEWARDSHIP",
    "LEX-CUSTODIAN",
  ],
} as const;

export const GRF_PURPOSE = `Every major decision shall include a long-term generational assessment as part of the proposal record — alongside PAF, TIA, and EIA.

The GRF operationalizes CANON-006 — Think in Generations, Act in the Present.

Long-term thinking does not excuse inaction. It demands disciplined action today in service of tomorrow.`;

export const GRF_GENERATIONAL_TEST =
  "Will this decision make the institution stronger for those who come after us? Are we solving today's problem while preserving tomorrow's opportunities?";

export const EXECUTIVE_DECISION_8 = `Every proposal that materially affects ownership, governance, technology architecture, institutional reputation, or strategic direction must include a Generational Review before final approval.

This is not intended to slow decisions.

It is intended to ensure that today's convenience does not become tomorrow's burden.`;

export const GRF_MANDATORY_TRIGGERS = [
  "Ownership or capital structure",
  "Governance and constitutional matters",
  "Technology architecture",
  "Institutional reputation",
  "Strategic direction",
] as const;

export const GRF_DECISION_HORIZONS = [
  {
    id: "immediate",
    label: "Immediate",
    range: "0–12 months",
    description: "Near-term execution, delivery, and operational impact.",
  },
  {
    id: "strategic",
    label: "Strategic",
    range: "1–5 years",
    description: "Market position, capability building, and five-year outcomes.",
  },
  {
    id: "institutional",
    label: "Institutional",
    range: "5–25 years",
    description: "Resilience, adaptability, and twenty-five-year capability.",
  },
  {
    id: "generational",
    label: "Generational",
    range: "25–100 years",
    description: "Continuity, stewardship, and century-scale institutional health.",
  },
] as const;

export const GRF_QUESTIONS = [
  {
    id: "irreversible_risk",
    label: "Does this create irreversible risk?",
    description: "Decisions that cannot be undone may burden future custodians.",
  },
  {
    id: "resilience",
    label: "Does this strengthen institutional resilience?",
    description: "Will the institution endure changing markets, technologies, and leadership?",
  },
  {
    id: "flexibility",
    label: "Does this increase or reduce future flexibility?",
    description: "Future generations must retain room to adapt.",
  },
  {
    id: "knowledge",
    label: "What knowledge must be preserved?",
    description: "Documentation, governance rationale, and institutional memory.",
  },
  {
    id: "assumptions",
    label: "What assumptions may future generations challenge?",
    description: "Explicit assumptions enable wiser inheritance.",
  },
] as const;

export const GRF_SECTIONS = [
  {
    id: "horizons",
    label: "Decision Horizons",
    description: "Assessment across immediate, strategic, institutional, and generational timeframes.",
  },
  {
    id: "questions",
    label: "Generational Questions",
    description: "Irreversible risk, resilience, flexibility, knowledge preservation, challenged assumptions.",
  },
  {
    id: "time_outcomes",
    label: "Time Horizon Outcomes",
    description: "Five, ten, twenty-five, fifty, and one-hundred-year considerations.",
  },
  {
    id: "successors",
    label: "Successor Impact",
    description: "Will future custodians thank us or struggle because of this decision?",
  },
  {
    id: "technical_debt",
    label: "Technical & Institutional Debt",
    description: "Debt created or reduced — engineering and governance obligations passed forward.",
  },
  {
    id: "canons",
    label: "Canon Alignment",
    description: "References to CANON-001 through CANON-006.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    description: "Proceed, reflect further, or reject.",
  },
] as const;

export interface GenerationalHorizonAssessment {
  horizonId: (typeof GRF_DECISION_HORIZONS)[number]["id"];
  summary: string;
  impact: "positive" | "neutral" | "negative" | "uncertain";
}

export interface GenerationalReview {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  status: "draft" | "in_review" | "approved" | "rejected" | "reflect";
  mandatoryTrigger: (typeof GRF_MANDATORY_TRIGGERS)[number];
  horizonAssessments: GenerationalHorizonAssessment[];
  createsIrreversibleRisk: boolean;
  strengthensResilience: boolean;
  flexibilityImpact: "increases" | "neutral" | "reduces";
  knowledgeToPreserve: string[];
  assumptionsFutureMayChallenge: string[];
  generationalTestAnswer: "strengthens" | "uncertain" | "burdens";
  canonReferences: string[];
  recommendation: string;
}

export const GRF_EXAMPLE_APPROVED: GenerationalReview = {
  id: "grf-iki-platform",
  proposalTitle: "IKI — Institutional Knowledge Infrastructure",
  proposalSummary:
    "Central knowledge platform preserving canons, frameworks, and institutional memory across generations.",
  status: "approved",
  mandatoryTrigger: "Technology architecture",
  horizonAssessments: [
    { horizonId: "immediate", summary: "Library and decision engines operational for current teams.", impact: "positive" },
    { horizonId: "strategic", summary: "PAF, TIA, EIA, GRF embedded in governance workflow.", impact: "positive" },
    { horizonId: "institutional", summary: "Knowledge Objects survive leadership transitions.", impact: "positive" },
    { horizonId: "generational", summary: "Century-scale institutional memory for future custodians.", impact: "positive" },
  ],
  createsIrreversibleRisk: false,
  strengthensResilience: true,
  flexibilityImpact: "increases",
  knowledgeToPreserve: [
    "Canon text and versioning",
    "Decision framework rationale",
    "Executive decision history",
    "Lexicon definitions",
  ],
  assumptionsFutureMayChallenge: [
    "Digital-first knowledge storage remains appropriate",
    "Structured metadata format remains accessible",
  ],
  generationalTestAnswer: "strengthens",
  canonReferences: ["CANON-006", "CANON-004", "CANON-001"],
  recommendation:
    "APPROVED — Invests in futures we may never witness. Future custodians will inherit documented institutional wisdom.",
};

export const GRF_EXAMPLE_REFLECT: GenerationalReview = {
  id: "grf-short-term-debt",
  proposalTitle: "Defer Security Audit to Meet Launch Deadline",
  proposalSummary:
    "Skip comprehensive security audit to accelerate marketplace feature launch by six weeks.",
  status: "reflect",
  mandatoryTrigger: "Institutional reputation",
  horizonAssessments: [
    { horizonId: "immediate", summary: "Faster launch, short-term revenue.", impact: "positive" },
    { horizonId: "strategic", summary: "Security incident risk increases materially.", impact: "negative" },
    { horizonId: "institutional", summary: "Trust damage may take decades to repair.", impact: "negative" },
    { horizonId: "generational", summary: "One breach could define institutional reputation for a generation.", impact: "negative" },
  ],
  createsIrreversibleRisk: true,
  strengthensResilience: false,
  flexibilityImpact: "reduces",
  knowledgeToPreserve: ["Audit scope deferred", "Risk acceptance rationale if proceeding"],
  assumptionsFutureMayChallenge: [
    "Launch timing outweighs security investment",
    "Incident probability is acceptably low",
  ],
  generationalTestAnswer: "burdens",
  canonReferences: ["CANON-006", "CANON-002"],
  recommendation:
    "REFLECT — Today's convenience becomes tomorrow's burden. Future custodians would struggle to repair trust lost for six weeks of speed.",
};

export const GRF_EXAMPLES = [GRF_EXAMPLE_APPROVED, GRF_EXAMPLE_REFLECT] as const;
