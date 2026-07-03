export type GovernanceBodyType =
  | "board"
  | "ceo"
  | "executive-leadership"
  | "committee"
  | "owner";

export interface GovernanceLink {
  title: string;
  href?: string;
}

export interface AuthorityMatrixEntry {
  domain: string;
  authority: string;
}

export interface GovernanceBodyProfile {
  slug: string;
  type: GovernanceBodyType;
  name: string;
  subtitle: string;
  status: "active" | "forming" | "advisory";
  mandate?: string;
  constitutionalResponsibilities?: string[];
  reservedPowers?: string[];
  activeCommittees?: GovernanceLink[];
  decisions?: GovernanceLink[];
  stewardshipReviews?: { period: string; status: string; href?: string }[];
  delegatedAuthority?: string[];
  strategicObjectives?: string[];
  constitutionalDuties?: string[];
  decisionRegistry?: GovernanceLink[];
  annualStewardshipDeclaration?: { year: string; status: string; href?: string };
  functionalResponsibilities?: string[];
  authorityMatrix?: AuthorityMatrixEntry[];
  kpis?: string[];
  knowledgeContributions?: GovernanceLink[];
  successionStatus?: string;
  membership?: string[];
  meetingRecords?: GovernanceLink[];
  recommendations?: string[];
  canonReferences: string[];
  constitutionArticles: string[];
}
