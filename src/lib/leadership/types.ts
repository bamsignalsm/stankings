import type { CompetencyAssessmentStatus } from "@/lib/frameworks/leadership-governance-portal";

export type LeadershipOfficeType =
  | "board"
  | "ceo"
  | "executive"
  | "subsidiary-ceo"
  | "committee"
  | "custodian";

export type LeadershipReviewStatus = "submitted" | "pending" | "overdue" | "forming" | "current";

export interface LeadershipLink {
  title: string;
  href?: string;
}

export interface CompetencyAssessment {
  standard: string;
  status: CompetencyAssessmentStatus;
  period?: string;
  note?: string;
}

export interface LeadershipEvaluationRecord {
  period: string;
  status: LeadershipReviewStatus;
  summary?: string;
  href?: string;
}

export interface LeadershipProfile {
  slug: string;
  name: string;
  constitutionalOffice: string;
  officeType: LeadershipOfficeType;
  status: "active" | "forming" | "emeritus";
  stewardshipResponsibilities: string[];
  delegatedAuthority: string[];
  annualStewardshipDeclaration?: { year: string; status: string; href?: string };
  leadershipEvaluations: LeadershipEvaluationRecord[];
  knowledgeContributions: LeadershipLink[];
  decisionsAuthored: LeadershipLink[];
  successorDevelopment: {
    label: string;
    detail: string;
    status: "documented" | "in_progress" | "required";
  };
  competencyAssessments: CompetencyAssessment[];
  canonReferences: string[];
  constitutionArticles: string[];
  requiredTraining: string[];
}
