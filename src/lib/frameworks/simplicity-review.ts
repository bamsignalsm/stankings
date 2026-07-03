/**
 * Simplicity Review (SR)
 * Operational gate derived from CANON-011 — Executive Decision No. 13
 */

export const SR_FRAMEWORK = {
  identifier: "FRAMEWORK-SR-001",
  title: "Simplicity Review",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-003",
    "CANON-007",
    "CANON-008",
    "CANON-010",
    "CANON-011",
    "LEX-SIMPLICITY",
    "LEX-SINGLE-SOURCE-OF-TRUTH",
    "LS-001",
  ],
} as const;

export const SR_PURPOSE = `Every engineering pull request, architecture proposal and major product feature shall be evaluated for unnecessary complexity.

The Simplicity Review (SR) operationalizes CANON-011 — Simplicity Creates Strength.

Complexity shall never be accepted merely because it is clever. Every additional layer, dependency, workflow or policy must justify the value it introduces.`;

export const SR_SIMPLICITY_TEST =
  "Can this be made simpler without reducing quality, safety or integrity?";

export const SR_DEFAULT_POSITION =
  "Simple where possible. Sophisticated only where necessary.";

export const SR_MANDATORY_TRIGGERS = [
  "Engineering pull request",
  "Architecture proposal or ADR",
  "Major product feature or UI workflow",
  "New policy or governance process",
  "Organizational or process change",
  "Acquisition or new institution proposal",
] as const;

export const SR_REVIEW_QUESTIONS = [
  { id: "explain", label: "Can this be explained in one paragraph?", description: "If not, simplify or document until it can be." },
  { id: "first-use", label: "Can a first-time user understand it?", description: "Applies to products, APIs, policies, and onboarding." },
  { id: "steps", label: "Does it remove or add unnecessary steps?", description: "Every step must earn its place." },
  { id: "cognitive", label: "Does it reduce cognitive load?", description: "Respect for attention — customer and engineer alike." },
  { id: "reuse", label: "Does it reuse existing capabilities?", description: "Prefer extension over duplication." },
  { id: "merge", label: "Could two systems become one?", description: "Consolidation often strengthens the ecosystem." },
  { id: "essential", label: "What complexity is essential?", description: "Name what must remain complex and why." },
  { id: "accidental", label: "What complexity is accidental?", description: "Name what can be removed without loss." },
] as const;

export type SRApprovalStatus = "draft" | "under_review" | "approved" | "needs_simplification";
export type SRComplexityVerdict = "justified" | "simplify" | "reject";

export interface SimplicityReview {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  domain: string;
  status: SRApprovalStatus;
  oneParagraphExplanation: string;
  firstTimeUnderstandable: boolean;
  stepsAssessment: "removes" | "neutral" | "adds_unnecessary";
  reducesCognitiveLoad: boolean;
  reusesExistingCapabilities: boolean;
  consolidationOpportunity?: string;
  essentialComplexity: string[];
  accidentalComplexity: string[];
  simplicityTestAnswer: "yes" | "no" | "needs_refinement";
  simplicityTestNotes: string;
  verdict: SRComplexityVerdict;
  canonReferences: { identifier: string; relevance: string }[];
}

export const SR_EXAMPLE_YIKE: SimplicityReview = {
  id: "sr-yike-platform",
  proposalTitle: "Yike unified marketplace architecture",
  proposalSummary:
    "Consolidate dozens of listing ideas into one marketplace with shared trust, passport, identity, and escrow.",
  domain: "Yike · Product",
  status: "approved",
  oneParagraphExplanation:
    "Yike is one property marketplace where verified sellers list, buyers search with confidence, and BayRight escrow protects transactions — all through one Yike Passport identity.",
  firstTimeUnderstandable: true,
  stepsAssessment: "removes",
  reducesCognitiveLoad: true,
  reusesExistingCapabilities: true,
  consolidationOpportunity: "Merged fragmented listing concepts into single marketplace surface.",
  essentialComplexity: [
    "Verification pipeline behind listings",
    "Escrow integration with BayRight",
    "Multi-institution ecosystem map",
  ],
  accidentalComplexity: [
    "Separate apps per property type — removed",
    "Duplicate identity flows — removed in favour of Yike Passport",
  ],
  simplicityTestAnswer: "yes",
  simplicityTestNotes:
    "Customer sees one marketplace; complexity hidden where it serves trust and safety.",
  verdict: "justified",
  canonReferences: [
    { identifier: "CANON-011", relevance: "Simplicity creates strength — one ecosystem surface" },
    { identifier: "CANON-005", relevance: "Ecosystem coherence" },
    { identifier: "CANON-002", relevance: "One trust system" },
  ],
};

export const SR_EXAMPLE_IKI: SimplicityReview = {
  id: "sr-iki-library",
  proposalTitle: "IKI — single Library and Knowledge Object model",
  proposalSummary:
    "Replace scattered PDFs, docs, Notion, and email with one Library governed by LS-001 Knowledge Objects.",
  domain: "IKI · Institutional Knowledge",
  status: "approved",
  oneParagraphExplanation:
    "All institutional knowledge lives in The Stankings Library as versioned Knowledge Objects — one authoritative source per topic, searchable and cross-referenced.",
  firstTimeUnderstandable: true,
  stepsAssessment: "removes",
  reducesCognitiveLoad: true,
  reusesExistingCapabilities: true,
  consolidationOpportunity: "One Library replaces multiple documentation silos.",
  essentialComplexity: [
    "Canon dependency graph and frameworks",
    "Approval and versioning workflow",
    "Member access tiers",
  ],
  accidentalComplexity: [
    "Parallel doc stores — deprecated",
    "Duplicate canon copies in slide decks — redirected to Library",
  ],
  simplicityTestAnswer: "yes",
  simplicityTestNotes: "LS-001 complexity is essential; scattered docs were accidental.",
  verdict: "justified",
  canonReferences: [
    { identifier: "CANON-011", relevance: "One Library, one KO — Canon 011 in practice" },
    { identifier: "CANON-007", relevance: "Single Source of Truth" },
    { identifier: "LS-001", relevance: "Knowledge Object standard" },
  ],
};

export const SR_EXAMPLE_PR: SimplicityReview = {
  id: "sr-microservice-split",
  proposalTitle: "Split member auth into separate microservice",
  proposalSummary:
    "Extract authentication into a new standalone service with separate deployment pipeline.",
  domain: "Engineering",
  status: "needs_simplification",
  oneParagraphExplanation:
    "Proposal would run auth as isolated service with new API boundary, separate monitoring, and cross-service session sync.",
  firstTimeUnderstandable: false,
  stepsAssessment: "adds_unnecessary",
  reducesCognitiveLoad: false,
  reusesExistingCapabilities: false,
  consolidationOpportunity: "Extend existing Supabase auth integration within monolith boundary.",
  essentialComplexity: ["Member approval workflow", "Energy console separation"],
  accidentalComplexity: [
    "New service boundary without scale justification",
    "Duplicate session management",
    "Additional deployment and observability surface",
  ],
  simplicityTestAnswer: "needs_refinement",
  simplicityTestNotes:
    "Cannot simplify to yes without removing the split. Current scale does not justify operational complexity.",
  verdict: "simplify",
  canonReferences: [
    { identifier: "CANON-011", relevance: "Reject clever complexity without value" },
    { identifier: "CANON-008", relevance: "Maintainability over unnecessary sophistication" },
  ],
};

export const SR_EXAMPLE_REVIEWS: SimplicityReview[] = [
  SR_EXAMPLE_YIKE,
  SR_EXAMPLE_IKI,
  SR_EXAMPLE_PR,
];
