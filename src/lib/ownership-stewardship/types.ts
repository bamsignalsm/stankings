export type GovernanceLayerAccess = "constitutional" | "legal";

export type RegisterEntryStatus = "active" | "forming" | "planned" | "restricted";

export interface GovernanceArchitectureEntry {
  id: string;
  domain: string;
  layer: string;
  description: string;
  access: GovernanceLayerAccess;
  status: RegisterEntryStatus;
  constitutionalLink?: string;
  legalNote?: string;
  relatedObjects: { title: string; href?: string }[];
}

export interface OwnershipStructureOverview {
  id: string;
  title: string;
  summary: string;
  constitutionalPrinciple: string;
  legalStatus: RegisterEntryStatus;
  steward: string;
  constitutionArticles: string[];
  canonReferences: string[];
}
