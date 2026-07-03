/**
 * Constitutional Health Dashboard — Article XIV / FRAMEWORK-CHD-001 / ED 42
 */

import type {
  ConstitutionalHealthReview,
  HealthDimensionScore,
  HealthReviewRecommendation,
  MaturityAssessment,
} from "@/lib/constitutional-health/types";

export const CHD_IDENTIFIER = "FRAMEWORK-CHD-001";

export const CURRENT_HEALTH_REVIEW: ConstitutionalHealthReview = {
  reviewId: "CHR-2026-001",
  period: "H1 2026 — Core Constitution Formation",
  overallScore: 4.6,
  summary:
    "Institutional health strong during Volume I adoption. Leadership and culture forming deliberately; technology and people development maturing with ecosystem growth.",
  status: "published",
};

export const HEALTH_DIMENSION_SCORES: HealthDimensionScore[] = [
  {
    id: "purpose",
    label: "Purpose Alignment",
    score: 5,
    maxScore: 5,
    trend: "improving",
    priorScore: 4,
    evidence: ["Articles I–II adopted", "PAF gate operational", "Constitutional Alignment Engine live"],
    recommendations: ["Maintain purpose-before-expansion discipline across new institutions"],
    relatedCanons: ["CANON-003", "CANON-005"],
    relatedArticles: ["Art. I", "Art. II"],
    improvementPlan: "FRAMEWORK-CAE-001 quarterly review",
  },
  {
    id: "trust",
    label: "Trust",
    score: 5,
    maxScore: 5,
    trend: "improving",
    priorScore: 4,
    evidence: ["Article XII adopted", "Trust Centre operational", "YIKE Passport forming"],
    recommendations: ["Complete Safe Haven verification pathway documentation"],
    relatedCanons: ["CANON-002", "CANON-007"],
    relatedArticles: ["Art. VI", "Art. XII"],
  },
  {
    id: "leadership",
    label: "Leadership",
    score: 4,
    maxScore: 5,
    trend: "stable",
    priorScore: 4,
    evidence: ["Article V standards adopted", "Annual leadership reviews mandated"],
    recommendations: ["Expand constitutional leadership review coverage to forming institutions"],
    relatedCanons: ["CANON-004", "CANON-020"],
    relatedArticles: ["Art. V"],
    improvementPlan: "FRAMEWORK-LGOV-001 rollout",
  },
  {
    id: "governance",
    label: "Governance",
    score: 5,
    maxScore: 5,
    trend: "improving",
    evidence: ["Articles IV & VIII adopted", "Reserved Powers Register active"],
    recommendations: ["Form Audit & Risk Committee per Schedule C"],
    relatedCanons: ["CANON-016", "CANON-015"],
    relatedArticles: ["Art. IV", "Art. VIII"],
  },
  {
    id: "innovation",
    label: "Innovation",
    score: 5,
    maxScore: 5,
    trend: "improving",
    evidence: ["Article X lifecycle", "Innovation Portal", "Venture Studio forming"],
    recommendations: ["Document BamBet lifecycle as constitutional precedent"],
    relatedCanons: ["CANON-013", "CANON-018"],
    relatedArticles: ["Art. X"],
  },
  {
    id: "knowledge",
    label: "Knowledge",
    score: 5,
    maxScore: 5,
    trend: "improving",
    evidence: ["Article XIII adopted", "Library Portal", "IKG operational"],
    recommendations: ["Increase Knowledge Object coverage for forming platforms"],
    relatedCanons: ["CANON-021", "CANON-009"],
    relatedArticles: ["Art. XIII", "Art. VII"],
  },
  {
    id: "technology",
    label: "Technology",
    score: 4,
    maxScore: 5,
    trend: "stable",
    evidence: ["Platform Registry discipline", "Shared identity architecture constitutionalized"],
    recommendations: ["Complete platform assessment for Logistics and Auto Hub"],
    relatedCanons: ["CANON-012"],
    relatedArticles: ["Art. IX", "Art. XII"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    score: 5,
    maxScore: 5,
    trend: "improving",
    evidence: ["Art. XII § 12.07 constitutionalized", "Trust team oversight forming"],
    recommendations: ["Board periodic cybersecurity posture reporting"],
    relatedCanons: ["CANON-002", "CANON-015"],
    relatedArticles: ["Art. XII § 12.07"],
  },
  {
    id: "people",
    label: "People Development",
    score: 4,
    maxScore: 5,
    trend: "stable",
    evidence: ["Custodian Programme forming", "Learning path in Library"],
    recommendations: ["Launch Institute leadership curriculum"],
    relatedCanons: ["CANON-004", "CANON-023"],
    relatedArticles: ["Art. XIII § 13.04"],
  },
  {
    id: "customer",
    label: "Customer Confidence",
    score: 5,
    maxScore: 5,
    trend: "improving",
    evidence: ["HIR framework operational", "Trust infrastructure forming"],
    recommendations: ["Expand human impact review to BamSignal launch"],
    relatedCanons: ["CANON-010", "CANON-002"],
    relatedArticles: ["Art. VI"],
  },
  {
    id: "culture",
    label: "Culture",
    score: 4,
    maxScore: 5,
    trend: "stable",
    evidence: ["Part IV integrity framework", "Annual Integrity Declarations mandated"],
    recommendations: ["Embed constitutional culture in onboarding for all institutions"],
    relatedCanons: ["CANON-004", "CANON-025"],
    relatedArticles: ["Art. XI"],
  },
  {
    id: "resilience",
    label: "Institutional Resilience",
    score: 5,
    maxScore: 5,
    trend: "improving",
    evidence: ["Four Parts adopted", "Ecosystem register", "Lifecycle engine"],
    recommendations: ["Complete Constitutional Health Review calendar per Schedule G"],
    relatedCanons: ["CANON-006", "CANON-015"],
    relatedArticles: ["Art. III", "Art. X"],
  },
];

export const MATURITY_ASSESSMENTS: MaturityAssessment[] = [
  { domain: "The Constitution", maturity: "established", score: 4.5, note: "Articles I–XIII adopted; XIV onward planned" },
  { domain: "The Stankings Canons", maturity: "exemplary", score: 5, note: "Volume 0 v1.0 sealed — 25 Canons" },
  { domain: "Governance standards", maturity: "established", score: 4.5, note: "CGOV, LGOV, CDW operational" },
  { domain: "Knowledge management", maturity: "established", score: 4.5, note: "Library Portal and IKG live" },
  { domain: "Decision quality", maturity: "developing", score: 4, note: "IDR and Judgment Records forming" },
  { domain: "Stewardship", maturity: "established", score: 4.5, note: "Stewardship Portal and ASR mandated" },
  { domain: "Innovation", maturity: "developing", score: 4, note: "Innovation Portal forming; Venture Studio planned" },
  { domain: "Institutional learning", maturity: "developing", score: 4, note: "LLR and KCP operational; coverage expanding" },
];

export const HEALTH_RECOMMENDATIONS: HealthReviewRecommendation[] = [
  {
    category: "Strengths",
    items: [
      "Core Constitution adopted with operational portals for every Article",
      "Trust and knowledge layers constitutionalized before scale",
      "Decision discipline and framework ecosystem mature for institution age",
    ],
  },
  {
    category: "Weaknesses",
    items: [
      "Some forming institutions lack complete Knowledge Object coverage",
      "Committee structures in Schedule C still forming",
    ],
  },
  {
    category: "Emerging risks",
    items: [
      "Revenue growth without trust monitoring — Year Two scenario vigilance",
      "Knowledge concentration in founding team before succession depth",
    ],
  },
  {
    category: "Improvement priorities",
    items: [
      "Complete Article XIV–XV and Constitutional Congress",
      "Formalize Annual Constitutional Stewardship Report cycle",
      "Expand Custodian Programme enrollment",
    ],
  },
  {
    category: "Knowledge gaps",
    items: [
      "Engineering standards ES-014 linkage to trust chain documentation",
      "Independent review protocols for cybersecurity",
    ],
  },
  {
    category: "Leadership opportunities",
    items: [
      "Institute curriculum for constitutional stewardship",
      "Cross-institutional knowledge sharing champions",
    ],
  },
];

export function renderStars(score: number, maxScore = 5): string {
  const filled = Math.round(score);
  return "★".repeat(filled) + "☆".repeat(maxScore - filled);
}

export function getHealthDashboardStats() {
  const dimensions = HEALTH_DIMENSION_SCORES;
  const overall =
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length;
  return {
    overallScore: Math.round(overall * 10) / 10,
    dimensions: dimensions.length,
    improving: dimensions.filter((d) => d.trend === "improving").length,
    declining: dimensions.filter((d) => d.trend === "declining").length,
    maturityDomains: MATURITY_ASSESSMENTS.length,
    recommendations: HEALTH_RECOMMENDATIONS.reduce((s, r) => s + r.items.length, 0),
  };
}
