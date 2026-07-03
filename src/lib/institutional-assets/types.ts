export type AssetCategory =
  | "constitutional"
  | "knowledge"
  | "trust"
  | "technology"
  | "brand"
  | "ai"
  | "data"
  | "financial"
  | "process";

export type CriticalityRating = "critical" | "high" | "medium" | "forming";

export type SecurityClassification = "public" | "internal" | "confidential" | "restricted";

export type BackupStatus = "verified" | "partial" | "planned" | "not_applicable";

export interface AssetLink {
  title: string;
  href?: string;
  identifier?: string;
}

export interface InstitutionalAsset {
  assetId: string;
  slug: string;
  name: string;
  category: AssetCategory;
  categoryLabel: string;
  description: string;
  owningInstitution: string;
  steward: string;
  constitutionArticle: string;
  canonReferences: string[];
  criticality: CriticalityRating;
  securityClassification: SecurityClassification;
  backupStatus: BackupStatus;
  recoveryObjective: string;
  dependencies: string[];
  annualReviewDate: string;
  riskAssessment: string;
  knowledgeObjects: AssetLink[];
  dashboardTags: string[];
  status: "active" | "forming" | "archived";
}
