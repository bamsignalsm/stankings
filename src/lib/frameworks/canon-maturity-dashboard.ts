/**
 * Canon Maturity Dashboard (CMD)
 * Derived from CANON-025 — Executive Decision No. 27
 */

export const CMD_FRAMEWORK = {
  identifier: "FRAMEWORK-CMD-001",
  title: "Canon Maturity Dashboard",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-021",
    "CANON-025",
    "CONSTITUTION-ARTICLE-XIV",
    "FRAMEWORK-IKG-001",
    "FRAMEWORK-LEGACY-001",
    "LEX-ENDURANCE",
    "LS-001",
    "volume-0",
  ],
} as const;

export const CMD_PURPOSE = `Volume 0 shall be a living operating system — not a static book.

The Canon Maturity Dashboard tracks every Canon's version, review status, related frameworks, knowledge objects, and implementation maturity across the Stankings Library.

Volume 0 is required reading for directors, trustees, executive leadership, senior managers, principal engineers, institutional architects, and Custodian Programme members per Executive Decision No. 27.`;

export const ENDURANCE_TEST =
  "Will this help future generations believe that Stankings Group deserved to endure? Will this strengthen the institution's legitimacy? Will this honour those who built before us and those who will inherit after us?";

export const VOLUME_0_REQUIRED_READING_ROLES = [
  "Directors",
  "Trustees",
  "Executive Leadership",
  "Senior Managers",
  "Principal Engineers",
  "Institutional Architects",
  "Custodian Programme Members",
] as const;

export type CanonReviewStatus = "approved" | "due_for_review" | "in_review";
export type CanonPrintStatus = "available" | "preview" | "forthcoming";

export interface CanonMaturityRecord {
  canonId: string;
  title: string;
  href: string;
  category: string;
  version: string;
  approvalDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
  reviewStatus: CanonReviewStatus;
  printStatus: CanonPrintStatus;
  implementationStatus: "active" | "in_progress" | "planned";
  platformFeature: string;
  platformHref?: string;
  relatedFrameworks: { identifier: string; title: string; href: string }[];
  relatedPolicies: { identifier: string; title: string; href?: string }[];
  relatedCompanies: string[];
  relatedBooks: string[];
  relatedFounderLetters: string[];
  relatedKnowledgeObjects: string[];
}

export interface Volume0MaturityMetrics {
  totalCanons: number;
  supportingFrameworks: number;
  governanceObjects: number;
  knowledgeObjects: number;
  crossReferences: number;
  constitutionReferences: number;
  engineeringStandardsLinked: number;
  policiesDerived: number;
  trainingModulesCreated: number;
  aiPromptsLinked: number;
  volumeReviewStatus: string;
  printStatus: string;
  activeImplementations: number;
}
