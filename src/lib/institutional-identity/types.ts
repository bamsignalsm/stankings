export interface InstitutionalIdentityStatement {
  slug: string;
  institutionName: string;
  founded: string;
  purpose: string;
  mission: string;
  coreCapabilities: string[];
  sharedPlatformsUsed: string[];
  institutionsStrengthened: string[];
  primaryCustomers: string[];
  constitutionArticles: string[];
  constitutionArticlesII?: string[];
  constitutionArticlesIII?: string[];
  institutionPurposeStatement: string;
  canonReferences: string[];
  strategicRole: string;
  longTermVision: string;
  stewardshipResponsibilities: string[];
  status: "approved" | "draft";
  excellence: string;
  color: string;
  icon: string;
  isLive?: boolean;
  website?: string;
}
