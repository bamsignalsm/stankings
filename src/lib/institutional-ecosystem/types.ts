export type GovernanceStatus = "approved" | "forming" | "admission_review";

export interface EcosystemLink {
  title: string;
  href?: string;
  identifier?: string;
}

export interface ConstitutionalEcosystemProfile {
  slug: string;
  name: string;
  excellence: string;
  constitutionalPurpose: string;
  strategicRole: string;
  primaryCustomers: string[];
  coreCapabilities: string[];
  sharedPlatformsUsed: string[];
  trustDependencies: string[];
  aiServicesUsed: string[];
  apisConsumed: string[];
  apisExposed: string[];
  knowledgeObjects: EcosystemLink[];
  constitutionArticles: string[];
  canonReferences: string[];
  strengthens: string[];
  dependsOn: string[];
  sharedCapabilitiesProvided: string[];
  governanceStatus: GovernanceStatus;
  color: string;
  icon: string;
  isLive?: boolean;
}

export interface EcosystemGraphNode {
  id: string;
  label: string;
  type: "group" | "institution" | "platform";
  color?: string;
  href?: string;
}

export interface EcosystemGraphEdge {
  from: string;
  to: string;
  relationship: "strengthens" | "depends" | "platform";
}
