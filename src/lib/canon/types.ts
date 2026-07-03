/**
 * Shared Canon types — Volume 0 · The Stankings Canon
 */

export interface CanonSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface CanonDecisionExamples {
  good: string[];
  poor: string[];
}

export interface CanonHistoricalLessons {
  lostTrust: string[];
  strengthenedTrust: string[];
}

export interface CanonAISummaries {
  oneParagraph: string;
  fiveMinute: string;
  fifteenMinute: string;
}

export interface CanonDependencyNode {
  identifier: string;
  title: string;
  href: string;
  relationship: "supports" | "depends_on" | "references";
}

export interface CanonExtendedMetadata {
  identifier: string;
  sections: CanonSection[];
  institutionalApplications: string[];
  /** Upstream — what this canon depends on / is supported by */
  dependencyUpstream: CanonDependencyNode[];
  /** Downstream — what this canon supports */
  dependencyDownstream: CanonDependencyNode[];
  decisionExamples: CanonDecisionExamples;
  historicalLessons: CanonHistoricalLessons;
  aiSummaries: CanonAISummaries;
}

export const DEFAULT_INSTITUTIONAL_APPLICATIONS = [
  "Constitution",
  "Governance Code",
  "Engineering Standards",
  "HR Handbook",
  "Product Development",
  "Procurement",
  "Risk Management",
  "Vendor Selection",
  "Customer Service",
  "AI Policies",
  "Marketing",
  "Legal",
] as const;
