export type CustodianStage =
  | "foundation"
  | "leadership"
  | "technology"
  | "enterprise"
  | "society"
  | "readiness"
  | "graduated";

export type GraduationStatus = "in_formation" | "readiness_review" | "graduated" | "alumni";

export interface CustodianRecord {
  custodianId: string;
  name: string;
  cohort: string;
  currentStage: CustodianStage;
  mentor: string;
  learningProgress: number;
  constitutionModulesCompleted: number;
  constitutionModulesTotal: number;
  canonModulesCompleted: number;
  canonModulesTotal: number;
  caseStudiesCompleted: number;
  leadershipAssessments: number;
  knowledgeContributions: number;
  innovationContributions: number;
  stewardshipProjects: number;
  communityService: boolean;
  researchPublished: number;
  readinessReviews: { period: string; status: string }[];
  graduationStatus: GraduationStatus;
  href?: string;
}

export interface CurriculumModule {
  id: string;
  track: string;
  title: string;
  status: "available" | "forming" | "required";
}

export interface CustodianCaseStudy {
  id: string;
  title: string;
  track: string;
  moduleId: string;
  summary: string;
  href: string;
  knowledgeObjectId: string;
  status: "approved" | "draft";
}
