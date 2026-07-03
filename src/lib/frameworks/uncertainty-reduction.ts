/**
 * Uncertainty Reduction Framework (URF)
 * Derived from CANON-017 — Executive Decision No. 19
 */

export const URF_FRAMEWORK = {
  identifier: "FRAMEWORK-URF-001",
  title: "Uncertainty Reduction Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-007",
    "CANON-012",
    "CANON-016",
    "CANON-017",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-PAF-001",
    "LEX-UNCERTAINTY",
    "LS-001",
  ],
} as const;

export const URF_PURPOSE = `Every new company, product, service, platform or strategic initiative proposed within Stankings Group shall demonstrate how it meaningfully reduces uncertainty and increases confidence.

The Uncertainty Reduction Framework operationalizes CANON-017 — Reduce Uncertainty.

Every product begins with one question: What uncertainty are we reducing?`;

export const URF_UNCERTAINTY_TEST =
  "What uncertainty does this reduce? How will people become more confident because this exists? Can the reduction in uncertainty be measured?";

export const URF_ASSESSMENT_FIELDS = [
  {
    id: "uncertainty-exists",
    label: "What uncertainty currently exists?",
    description: "Describe the specific doubt, risk, or information gap — be concrete.",
  },
  {
    id: "who-experiences",
    label: "Who experiences it?",
    description: "Customers, partners, employees, institutions, or society — name the audience.",
  },
  {
    id: "severity",
    label: "How severe is it?",
    description: "Qualitative and quantitative evidence — impact on decisions and wellbeing.",
  },
  {
    id: "evidence",
    label: "What evidence supports this?",
    description: "Research, incidents, customer feedback, market data — not assumption alone.",
  },
  {
    id: "how-reduced",
    label: "How does the proposal reduce it?",
    description: "Mechanism: verification, transparency, expertise, technology, education, governance.",
  },
  {
    id: "confidence-improvement",
    label: "How will confidence improve?",
    description: "Describe the before/after customer or stakeholder experience.",
  },
  {
    id: "measurable",
    label: "Can improvement be measured?",
    description: "Metrics, surveys, trust scores, conversion confidence, error rates, NPS variants.",
  },
  {
    id: "canons",
    label: "Which Canons support this?",
    description: "Explicit alignment with Volume 0 Canons guiding the proposal.",
  },
  {
    id: "platforms",
    label: "Which platform capabilities are involved?",
    description: "Identity, Trust, Payments, Knowledge, AI — reuse from Platform Registry.",
  },
  {
    id: "long-term",
    label: "Long-term impact",
    description: "Will this still reduce uncertainty in ten and fifty years?",
  },
] as const;

export type UncertaintyReductionVerdict = "proceed" | "refine" | "reconsider";

export interface UncertaintyReductionAssessment {
  id: string;
  proposalTitle: string;
  proposalType: string;
  institution: string;
  uncertaintyExists: string;
  whoExperiences: string;
  severity: "low" | "medium" | "high" | "critical";
  howReduced: string;
  confidenceImprovement: string;
  measurableMetrics: string[];
  platformCapabilities: string[];
  canonReferences: string[];
  verdict: UncertaintyReductionVerdict;
  notes: string;
}

export const URF_EXAMPLE_YIKE: UncertaintyReductionAssessment = {
  id: "urf-yike-verification",
  proposalTitle: "Yike Trust Verification for property listings",
  proposalType: "Product capability",
  institution: "Yike",
  uncertaintyExists:
    "Buyers uncertain whether listings are genuine, documents authentic, and sellers trustworthy.",
  whoExperiences: "Property buyers, renters, and legitimate sellers harmed by fraud.",
  severity: "high",
  howReduced:
    "Document verification, seller identity via Stankings Passport, trust score, audit trail.",
  confidenceImprovement:
    "Buyers proceed with greater confidence; sellers distinguished from fraudulent actors.",
  measurableMetrics: [
    "Fraud report rate",
    "Buyer confidence survey score",
    "Time-to-transaction confidence index",
    "Verification completion rate",
  ],
  platformCapabilities: ["Identity Platform", "Trust Platform", "Knowledge Platform"],
  canonReferences: ["CANON-017", "CANON-002", "CANON-012"],
  verdict: "proceed",
  notes: "Core Yike purpose — reduces uncertainty in commerce, not merely lists property.",
};

export const URF_EXAMPLE_BAYRIGHT: UncertaintyReductionAssessment = {
  id: "urf-bayright-escrow",
  proposalTitle: "BayRight escrow for marketplace transactions",
  proposalType: "Platform / service",
  institution: "BayRight",
  uncertaintyExists:
    "Buyers and sellers uncertain funds will be released fairly; payment fraud risk.",
  whoExperiences: "Marketplace participants across Yike and future institutions.",
  severity: "critical",
  howReduced:
    "Escrow holds funds until conditions met; settlement audit; identity-linked accounts.",
  confidenceImprovement:
    "Parties transact knowing payment is protected — confidence in money.",
  measurableMetrics: [
    "Dispute rate vs non-escrow baseline",
    "Settlement time predictability",
    "Customer trust in payment flow (survey)",
  ],
  platformCapabilities: ["Payments Platform", "Trust Platform", "Identity Platform"],
  canonReferences: ["CANON-017", "CANON-002", "CANON-014"],
  verdict: "proceed",
  notes: "BayRight exists to reduce financial uncertainty — not merely process payments.",
};

export const URF_EXAMPLE_RECONSIDER: UncertaintyReductionAssessment = {
  id: "urf-gamification-badge",
  proposalTitle: "Gamified engagement badges across ecosystem apps",
  proposalType: "Feature",
  institution: "Group Platform",
  uncertaintyExists: "Unclear — proposal does not identify a specific uncertainty to reduce.",
  whoExperiences: "N/A — engagement metrics cited, not uncertainty reduction.",
  severity: "low",
  howReduced:
    "Proposal claims 'fun' increases usage — does not reduce buyer, financial, or trust uncertainty.",
  confidenceImprovement: "No meaningful confidence improvement identified.",
  measurableMetrics: ["Daily active users only — not uncertainty metrics"],
  platformCapabilities: [],
  canonReferences: ["CANON-017", "CANON-011"],
  verdict: "reconsider",
  notes:
    "Fails Uncertainty Test. Does not reduce unnecessary uncertainty. Reconsider or tie to measurable confidence outcome.",
};

export const URF_EXAMPLE_ASSESSMENTS: UncertaintyReductionAssessment[] = [
  URF_EXAMPLE_YIKE,
  URF_EXAMPLE_BAYRIGHT,
  URF_EXAMPLE_RECONSIDER,
];
