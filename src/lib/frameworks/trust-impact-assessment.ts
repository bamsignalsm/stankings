/**
 * Trust Impact Assessment (TIA) Framework
 * Decision-making machinery derived from CANON-002.
 */

export const TIA_FRAMEWORK = {
  identifier: "FRAMEWORK-TIA-001",
  title: "Trust Impact Assessment Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: ["CANON-001", "CANON-002", "LEX-TRUST"],
} as const;

export const TIA_PURPOSE = `Every significant institutional proposal shall be evaluated not only for financial return, but for its effect upon institutional trust.

The Trust Impact Assessment (TIA) ensures that governance, engineering, and leadership decisions are measured against Canon 002 — Trust Is Institutional Capital.

A proposal that increases revenue while materially damaging trust shall be regarded as strategically unsound.`;

export const TIA_TRUST_TEST_QUESTION =
  "Will this decision strengthen or weaken the confidence that people place in the Stankings name?";

export type ImpactDimension =
  | "financial"
  | "customer"
  | "operational"
  | "engineering"
  | "community"
  | "trust"
  | "long_term";

export interface ImpactDimensionDef {
  id: ImpactDimension;
  label: string;
  description: string;
  canonReference?: string;
}

export const TIA_IMPACT_DIMENSIONS: ImpactDimensionDef[] = [
  {
    id: "financial",
    label: "Financial Impact",
    description: "Revenue, cost, capital allocation, and return on investment.",
  },
  {
    id: "customer",
    label: "Customer Impact",
    description: "Effect on customer confidence, service quality, and relationship trust.",
    canonReference: "CANON-002 — Customer Implications",
  },
  {
    id: "operational",
    label: "Operational Impact",
    description: "Effect on institutional capacity, processes, and execution reliability.",
  },
  {
    id: "engineering",
    label: "Engineering Impact",
    description: "Effect on security, privacy, transparency, auditability, and system resilience.",
    canonReference: "CANON-002 — Engineering Implications",
  },
  {
    id: "community",
    label: "Community Impact",
    description: "Effect on society, stakeholders, and the communities we serve.",
  },
  {
    id: "trust",
    label: "Trust Impact",
    description:
      "Effect upon institutional trust — the greatest form of institutional capital.",
    canonReference: "CANON-002",
  },
  {
    id: "long_term",
    label: "Long-Term Impact",
    description: "Projected effect at 10, 25, and 50 year horizons.",
  },
];

export type ImpactRating = 1 | 2 | 3 | 4 | 5;

/** Numeric score 0–100 for board comparison */
export interface ImpactScores {
  financial: number;
  customer: number;
  operational: number;
  engineering: number;
  community: number;
  trust: number;
  long_term: number;
  overall: number;
}

export function ratingToScore(rating: ImpactRating): number {
  return rating * 20;
}

export function computeTIAOverall(scores: Omit<ImpactScores, "overall">): number {
  const weights = {
    financial: 0.1,
    customer: 0.15,
    operational: 0.1,
    engineering: 0.15,
    community: 0.1,
    trust: 0.25,
    long_term: 0.15,
  };
  return Math.round(
    scores.financial * weights.financial +
      scores.customer * weights.customer +
      scores.operational * weights.operational +
      scores.engineering * weights.engineering +
      scores.community * weights.community +
      scores.trust * weights.trust +
      scores.long_term * weights.long_term
  );
}

export function scoresFromRatings(impacts: Record<ImpactDimension, ImpactRating>): ImpactScores {
  const base = {
    financial: ratingToScore(impacts.financial),
    customer: ratingToScore(impacts.customer),
    operational: ratingToScore(impacts.operational),
    engineering: ratingToScore(impacts.engineering),
    community: ratingToScore(impacts.community),
    trust: ratingToScore(impacts.trust),
    long_term: ratingToScore(impacts.long_term),
  };
  return { ...base, overall: computeTIAOverall(base) };
}

export function overallRecommendation(overall: number, trust: number): "APPROVED" | "EXAMINE" | "REJECTED" {
  if (trust < 40 || overall < 50) return "REJECTED";
  if (trust < 60 || overall < 70) return "EXAMINE";
  return "APPROVED";
}

export interface LongTermHorizon {
  years: 10 | 25 | 50;
  assessment: string;
  rating?: ImpactRating;
}

export interface CanonReference {
  identifier: string;
  title: string;
  relevance: string;
}

export interface TrustImpactAssessment {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  status: "draft" | "in_review" | "approved" | "rejected";
  impacts: Record<ImpactDimension, ImpactRating>;
  scores: ImpactScores;
  longTermHorizons: LongTermHorizon[];
  canonReferences: CanonReference[];
  trustTestAnswer: "strengthen" | "uncertain" | "weaken";
  trustTestNotes: string;
  recommendation: string;
  submittedBy?: string;
  reviewedBy?: string;
}

/** Illustrative examples — not real proposals */
export const TIA_EXAMPLE_PROPOSALS: TrustImpactAssessment[] = [
  {
    id: "example-approved",
    proposalTitle: "Launch New Product",
    proposalSummary:
      "Introduce a verified marketplace product aligned with existing trust infrastructure.",
    status: "approved",
    impacts: {
      financial: 5,
      customer: 4,
      operational: 4,
      engineering: 5,
      community: 4,
      trust: 5,
      long_term: 5,
    },
    scores: {
      financial: 82,
      customer: 88,
      operational: 91,
      engineering: 88,
      community: 79,
      trust: 97,
      long_term: 95,
      overall: 91,
    },
    longTermHorizons: [
      { years: 10, assessment: "Strengthens ecosystem trust through verified commerce.", rating: 5 },
      { years: 25, assessment: "Establishes durable institutional reputation.", rating: 5 },
      { years: 50, assessment: "Aligns with generational stewardship of trust capital.", rating: 5 },
    ],
    canonReferences: [
      { identifier: "CANON-001", title: "Institutions Exist to Serve", relevance: "Product serves customer needs faithfully." },
      { identifier: "CANON-002", title: "Trust Is Institutional Capital", relevance: "Strengthens institutional trust." },
    ],
    trustTestAnswer: "strengthen",
    trustTestNotes: "Increases transparency and verified commerce within the ecosystem.",
    recommendation: "Approved — trust impact aligns with institutional capital strategy.",
  },
  {
    id: "example-rejected",
    proposalTitle: "Launch Gambling Company",
    proposalSummary:
      "Enter high-revenue gambling vertical despite material trust and community concerns.",
    status: "rejected",
    impacts: {
      financial: 5,
      customer: 2,
      operational: 3,
      engineering: 3,
      community: 1,
      trust: 1,
      long_term: 1,
    },
    scores: {
      financial: 95,
      customer: 35,
      operational: 55,
      engineering: 50,
      community: 18,
      trust: 12,
      long_term: 15,
      overall: 38,
    },
    longTermHorizons: [
      { years: 10, assessment: "Short-term revenue at cost of institutional reputation.", rating: 1 },
      { years: 25, assessment: "Generational trust erosion difficult to reverse.", rating: 1 },
      { years: 50, assessment: "Conflicts with custodial stewardship of trust capital.", rating: 1 },
    ],
    canonReferences: [
      { identifier: "CANON-002", title: "Trust Is Institutional Capital", relevance: "Materially damages institutional trust." },
    ],
    trustTestAnswer: "weaken",
    trustTestNotes: "High financial return cannot justify material trust damage per Canon 002.",
    recommendation: "Rejected — fails Canon 002. Revenue without trust is strategically unsound.",
  },
];

export const TIA_REQUIRED_FIELDS = [
  "Proposal title and summary",
  "Financial Impact (1–5)",
  "Customer Impact (1–5)",
  "Operational Impact (1–5)",
  "Engineering Impact (1–5)",
  "Community Impact (1–5)",
  "Trust Impact (1–5)",
  "Long-Term Impact (10, 25, 50 years)",
  "Canon References",
  "Trust Test answer and notes",
] as const;
