/**
 * Constitutional Alignment Engine (CAE)
 * FRAMEWORK-CAE-001 — derived from Constitution Article II
 * Executive Decision No. 30
 */

export const CAE_FRAMEWORK = {
  identifier: "FRAMEWORK-CAE-001",
  title: "Constitutional Alignment Engine",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-I",
    "CONSTITUTION-ARTICLE-II",
    "CANON-001",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-011",
    "FRAMEWORK-PAF-001",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-EIA-001",
    "FRAMEWORK-ISA-001",
    "FRAMEWORK-HIR-001",
    "FRAMEWORK-GRF-001",
  ],
} as const;

export const CAE_PURPOSE = `Every significant proposal presented to the Board shall be evaluated for constitutional alignment before final approval.

The Constitutional Alignment Engine operationalizes Article II — Purpose, Mission & Constitutional Objectives.

If a proposal cannot answer "Does this align with Article II?", it does not proceed without constitutional review.`;

export const CAE_ALIGNMENT_QUESTION = "Does this align with Article II?";

export const CONSTITUTIONAL_CHAIN_OF_AUTHORITY = [
  "The Stankings Canons",
  "The Constitution",
  "Governance Code",
  "Institutional Strategy",
  "Operating Standards",
  "Engineering Standards",
  "Technology",
  "Products",
  "Customer Experience",
] as const;

export const CAE_COMPLIANCE_GATES = [
  {
    id: "article-i",
    label: "Article I — Identity",
    articleRef: "CONSTITUTION-ARTICLE-I",
    href: "/library/constitution/article-i",
    frameworkId: "FRAMEWORK-IIS-001",
    frameworkHref: "/library/frameworks/institutional-identity-statement",
  },
  {
    id: "article-ii",
    label: "Article II — Purpose",
    articleRef: "CONSTITUTION-ARTICLE-II",
    href: "/library/constitution/article-ii",
    frameworkId: "FRAMEWORK-PAF-001",
    frameworkHref: "/library/frameworks/purpose-assessment",
  },
  {
    id: "canons",
    label: "Canon References",
    frameworkId: "FRAMEWORK-PAR-001",
    frameworkHref: "/library/frameworks/principles-alignment-review",
  },
  {
    id: "trust",
    label: "Trust Impact",
    frameworkId: "FRAMEWORK-TIA-001",
    frameworkHref: "/library/frameworks/trust-impact-assessment",
  },
  {
    id: "ecosystem",
    label: "Ecosystem Impact",
    frameworkId: "FRAMEWORK-EIA-001",
    frameworkHref: "/library/frameworks/ecosystem-impact-assessment",
  },
  {
    id: "strength",
    label: "Institutional Strength",
    frameworkId: "FRAMEWORK-ISA-001",
    frameworkHref: "/library/frameworks/institutional-strength-assessment",
  },
  {
    id: "human",
    label: "Human Impact",
    frameworkId: "FRAMEWORK-HIR-001",
    frameworkHref: "/library/frameworks/human-impact-review",
  },
  {
    id: "generational",
    label: "Generational Review",
    frameworkId: "FRAMEWORK-GRF-001",
    frameworkHref: "/library/frameworks/generational-review",
  },
] as const;

export type ComplianceStatus = "pass" | "review" | "fail";

export interface ConstitutionalComplianceCheck {
  gateId: (typeof CAE_COMPLIANCE_GATES)[number]["id"];
  status: ComplianceStatus;
  notes?: string;
}

export interface ConstitutionalComplianceStatement {
  constitutionalArticles: string[];
  canonReferences: string[];
  objectivesAdvanced: string[];
  constitutionalRisks: string[];
  complianceChecks: ConstitutionalComplianceCheck[];
}

export type ProposalBoardStatus =
  | "approved"
  | "flagged_for_review"
  | "under_review"
  | "declined";

export interface BoardProposal {
  identifier: string;
  slug: string;
  title: string;
  summary: string;
  institution: string;
  category: string;
  status: ProposalBoardStatus;
  submittedAt: string;
  compliance: ConstitutionalComplianceStatement;
  recommendation?: string;
}

export function evaluateProposalReadiness(
  compliance: ConstitutionalComplianceStatement,
): { ready: boolean; failed: number; review: number } {
  const failed = compliance.complianceChecks.filter((c) => c.status === "fail").length;
  const review = compliance.complianceChecks.filter((c) => c.status === "review").length;
  return { ready: failed === 0 && review === 0, failed, review };
}

export const CAE_BODY = `${CAE_PURPOSE}

## Alignment Question

${CAE_ALIGNMENT_QUESTION}

## Constitutional Chain of Authority

${CONSTITUTIONAL_CHAIN_OF_AUTHORITY.map((layer, i) => `${i === 0 ? "" : "↓\n"}${layer}`).join("\n")}

Strategy serves the Constitution. Technology serves strategy. Products serve technology. Everything serves the Canons.

## Compliance Gates

${CAE_COMPLIANCE_GATES.map((g) => `- ${g.label}`).join("\n")}

Any gate marked for review or failure flags the proposal before Board approval.`;
