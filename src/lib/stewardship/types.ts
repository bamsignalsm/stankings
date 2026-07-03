export type SuccessionStatus = "documented" | "in_progress" | "required";

export type DeclarationStatus = "submitted" | "pending" | "overdue";

export interface StewardshipLink {
  title: string;
  href?: string;
  identifier?: string;
}

export interface AnnualStewardshipDeclaration {
  year: string;
  status: DeclarationStatus;
  submittedAt?: string;
  affirmations: readonly string[];
  improvementsIdentified?: string[];
}

export interface StewardshipProfile {
  slug: string;
  name: string;
  role: string;
  title: string;
  status: "active" | "emeritus" | "custodian-in-formation";
  currentResponsibilities: string[];
  institutionsOverseen: string[];
  successionStatus: {
    label: string;
    detail: string;
    status: SuccessionStatus;
  };
  knowledgeContributions: StewardshipLink[];
  decisionsAuthored: StewardshipLink[];
  lessonsLearnedPublished: StewardshipLink[];
  canonReferences: string[];
  constitutionArticles: string[];
  stewardshipReviews: { period: string; status: string; href?: string }[];
  trainingCompleted: string[];
  custodianProgrammeProgress?: number;
  annualDeclaration: AnnualStewardshipDeclaration;
}
