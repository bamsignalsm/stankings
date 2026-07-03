/**
 * Purpose Assessment Framework (PAF)
 * Decision gate derived from CANON-003 — Executive Decision No. 5
 */

export const PAF_FRAMEWORK = {
  identifier: "FRAMEWORK-PAF-001",
  title: "Purpose Assessment Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: ["CANON-001", "CANON-002", "CANON-003"],
} as const;

export const PAF_PURPOSE = `Every new company, product, feature, or strategic initiative shall require a Purpose Assessment before development begins.

The Purpose Assessment Framework (PAF) operationalizes CANON-003 — Purpose Precedes Profit.

Profitability alone shall never become sufficient reason to establish or continue an institution within Stankings Group.`;

export const PAF_PURPOSE_TEST =
  "Does this exist because it meaningfully improves people's lives — or merely because it appears commercially attractive?";

export const PAF_SECTIONS = [
  { id: "problem", label: "Problem Statement", description: "What meaningful problem does this solve?" },
  { id: "beneficiaries", label: "Who Benefits?", description: "Individuals, families, businesses, or society served." },
  { id: "why_now", label: "Why Now?", description: "Why is this needed at this moment?" },
  { id: "ecosystem", label: "Ecosystem Contribution", description: "Does it strengthen the wider Stankings ecosystem?" },
  { id: "long_term", label: "Long-Term Value", description: "Can future generations preserve and improve it?" },
  { id: "alternatives", label: "Alternatives Considered", description: "What was rejected and why?" },
  { id: "canons", label: "Alignment with Existing Canons", description: "CANON-001, 002, 003 references." },
  { id: "purpose_score", label: "Purpose Score", description: "0–100 composite score." },
  { id: "recommendation", label: "Recommendation", description: "Proceed, examine further, or reject." },
] as const;

export interface PurposeAssessmentScores {
  problemClarity: number;
  beneficiaryValue: number;
  ecosystemFit: number;
  longTermViability: number;
  canonAlignment: number;
  purposeOverall: number;
}

export interface PurposeAssessment {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  status: "draft" | "in_review" | "approved" | "rejected";
  problemStatement: string;
  whoBenefits: string;
  whyNow: string;
  ecosystemContribution: string;
  longTermValue: string;
  alternativesConsidered: string;
  canonReferences: { identifier: string; relevance: string }[];
  scores: PurposeAssessmentScores;
  purposeTestAnswer: "justified" | "uncertain" | "commercial_only";
  recommendation: string;
}

function avg(nums: number[]): number {
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export function computePurposeOverall(scores: Omit<PurposeAssessmentScores, "purposeOverall">): number {
  return avg([
    scores.problemClarity,
    scores.beneficiaryValue,
    scores.ecosystemFit,
    scores.longTermViability,
    scores.canonAlignment,
  ]);
}

export const PAF_EXAMPLE_APPROVED: PurposeAssessment = {
  id: "paf-yike-verification",
  proposalTitle: "Yike High-Value Asset Verification",
  proposalSummary: "Reduce uncertainty in buying, selling and renting high-value assets.",
  status: "approved",
  problemStatement: "Nigerian property and vehicle markets suffer from information asymmetry and fraud.",
  whoBenefits: "Buyers, sellers, renters, and families making life-changing financial decisions.",
  whyNow: "Digital marketplaces exist but trust infrastructure does not scale with transaction value.",
  ecosystemContribution: "Strengthens BamSignal identity, BayRight escrow, and Stanhan property lifecycle.",
  longTermValue: "Verification standards can be preserved and improved across generations.",
  alternativesConsidered: "Listing fees without verification — rejected as purpose-insufficient.",
  canonReferences: [
    { identifier: "CANON-003", relevance: "Solves meaningful problem — reduces uncertainty." },
    { identifier: "CANON-002", relevance: "Builds institutional trust through verification." },
    { identifier: "CANON-001", relevance: "Serves customers faithfully in high-stakes moments." },
  ],
  scores: {
    problemClarity: 94,
    beneficiaryValue: 92,
    ecosystemFit: 96,
    longTermViability: 90,
    canonAlignment: 95,
    purposeOverall: 93,
  },
  purposeTestAnswer: "justified",
  recommendation: "APPROVED — Purpose clearly precedes profit. Proceed to Trust Impact Assessment.",
};

export const PAF_EXAMPLE_REJECTED: PurposeAssessment = {
  id: "paf-gambling",
  proposalTitle: "Stankings Gambling Vertical",
  proposalSummary: "High-revenue gambling platform — commercially attractive, purpose unclear.",
  status: "rejected",
  problemStatement: "Claimed: entertainment revenue opportunity.",
  whoBenefits: "Shareholders primarily; community harm likely.",
  whyNow: "Market appears profitable.",
  ecosystemContribution: "Weakens trust capital across ecosystem.",
  longTermValue: "Difficult for custodians to defend across generations.",
  alternativesConsidered: "Entertainment without exploitation — not adequately explored.",
  canonReferences: [
    { identifier: "CANON-003", relevance: "Fails Purpose Test — commercially attractive only." },
  ],
  scores: {
    problemClarity: 25,
    beneficiaryValue: 18,
    ecosystemFit: 12,
    longTermViability: 15,
    canonAlignment: 10,
    purposeOverall: 16,
  },
  purposeTestAnswer: "commercial_only",
  recommendation: "REJECTED — Fails CANON-003. Purpose does not justify existence.",
};

export const PAF_EXAMPLES = [PAF_EXAMPLE_APPROVED, PAF_EXAMPLE_REJECTED];
