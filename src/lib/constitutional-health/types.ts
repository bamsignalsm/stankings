export interface HealthDimensionScore {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  trend: "improving" | "stable" | "declining";
  evidence: string[];
  recommendations: string[];
  relatedCanons: string[];
  relatedArticles: string[];
  improvementPlan?: string;
  priorScore?: number;
}

export interface MaturityAssessment {
  domain: string;
  maturity: "forming" | "developing" | "established" | "exemplary";
  score: number;
  note: string;
}

export interface HealthReviewRecommendation {
  category: string;
  items: string[];
}

export interface ConstitutionalHealthReview {
  reviewId: string;
  period: string;
  overallScore: number;
  summary: string;
  status: "draft" | "published";
}
