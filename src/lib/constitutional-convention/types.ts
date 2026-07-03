export type AuditStatus = "pass" | "warning" | "note" | "pending";
export type ArticleVerificationStatus = "verified" | "review" | "pending";

export interface AuditCheck {
  id: string;
  question: string;
  status: AuditStatus;
  finding: string;
}

export interface ArticleAudit {
  articleId: string;
  article: string;
  title: string;
  checks: AuditCheck[];
  overallStatus: ArticleVerificationStatus;
}

export interface CrossLinkRef {
  id: string;
  label: string;
  href: string;
}

export interface ArticleCrossLinks {
  articleId: string;
  canons: CrossLinkRef[];
  articles: CrossLinkRef[];
  schedules: CrossLinkRef[];
  governanceCodes: CrossLinkRef[];
  policies: CrossLinkRef[];
  engineeringStandards: CrossLinkRef[];
  companies: CrossLinkRef[];
  knowledgeObjects: CrossLinkRef[];
}

export interface ArticleCommentary {
  articleId: string;
  whyItExists: string;
  historicalBackground: string;
  examples: string[];
  engineeringImplications: string[];
  caseStudies: string[];
  relatedAiSystems: string[];
  questions: string[];
  futureNotes: string[];
  status: "draft" | "forming" | "published";
}

export interface ConstitutionalDiagram {
  articleId: string;
  title: string;
  ascii: string;
}

export interface ConstitutionalIndexTerm {
  term: string;
  slug: string;
  definition: string;
  articleIds: string[];
  canonRefs?: string[];
  href?: string;
}

export interface ConstitutionalDefinition {
  term: string;
  definition: string;
  articleRefs: string[];
  scheduleRef?: string;
  lexiconRef?: string;
}

export interface ConstitutionalLearningModule {
  articleId: string;
  lessons: string[];
  quizPrompts: string[];
  caseStudy: string;
  boardScenario: string;
  engineeringScenario: string;
  ceoScenario: string;
  custodianScenario: string;
  status: "forming" | "available";
}

export interface ConventionPhase {
  phase: number;
  id: string;
  title: string;
  objective: string;
  status: "active" | "forming" | "planned";
  href?: string;
}

export interface ConstitutionalSearchResult {
  kind: "article" | "canon" | "term" | "commentary" | "framework" | "company";
  id: string;
  label: string;
  href: string;
  excerpt: string;
}
