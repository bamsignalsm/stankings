/**
 * Knowledge Challenge Process (KCP)
 * Derived from CANON-023 — Executive Decision No. 25
 */

export const KCP_FRAMEWORK = {
  identifier: "FRAMEWORK-KCP-001",
  title: "Knowledge Challenge Process",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-007",
    "CANON-009",
    "CANON-020",
    "CANON-022",
    "CANON-023",
    "FRAMEWORK-LLR-001",
    "FRAMEWORK-IDI-001",
    "LEX-HUMILITY",
    "LEX-LEARNING",
    "LS-001",
  ],
} as const;

export const KCP_PURPOSE = `Any employee may respectfully challenge a policy, workflow, technical standard, governance practice, engineering decision, or customer process.

The Knowledge Challenge Process operationalizes CANON-023 — Remain Humble Enough to Learn.

Challenges are reviewed professionally—not personally. The objective is institutional improvement, not defending tradition for its own sake.`;

export const HUMILITY_TEST =
  "Have we understood it fully? Could this improve the institution? Are we protecting a principle or merely defending tradition? If new evidence strengthens our understanding, we should have the courage to improve accordingly.";

export const KCP_CHALLENGE_TYPES = [
  { id: "policy", label: "Policy", description: "Institutional policy or rule." },
  { id: "workflow", label: "Workflow", description: "Operational or business process." },
  { id: "technical_standard", label: "Technical Standard", description: "Engineering or architecture standard." },
  { id: "governance_practice", label: "Governance Practice", description: "Review, approval, or oversight practice." },
  { id: "engineering_decision", label: "Engineering Decision", description: "Prior technical or architectural decision." },
  { id: "customer_process", label: "Customer Process", description: "Customer-facing procedure or experience." },
] as const;

export type KnowledgeChallengeType = (typeof KCP_CHALLENGE_TYPES)[number]["id"];

export const KCP_REQUIRED_FIELDS = [
  { id: "evidence", label: "Evidence", description: "Facts, data, or examples supporting the challenge." },
  { id: "proposedImprovement", label: "Proposed Improvement", description: "What should change and how." },
  { id: "risks", label: "Risks", description: "What could go wrong if the change is adopted." },
  { id: "expectedBenefits", label: "Expected Benefits", description: "How the institution strengthens if accepted." },
  { id: "canonReferences", label: "Canon References", description: "Which Canons support the improvement." },
] as const;

export type KnowledgeChallengeStatus =
  | "submitted"
  | "under_review"
  | "accepted"
  | "accepted_with_conditions"
  | "declined";

export interface KnowledgeChallenge {
  id: string;
  slug: string;
  title: string;
  challengeType: KnowledgeChallengeType;
  institution: string;
  institutionSlug?: string;
  challengedArtifact: string;
  submittedBy: string;
  submittedByRole: string;
  submittedAt: string;
  status: KnowledgeChallengeStatus;
  evidence: string;
  proposedImprovement: string;
  risks: string;
  expectedBenefits: string;
  canonReferences: string[];
  reviewOutcome?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  knowledgeObjectsUpdated?: { identifier: string; title: string; href: string }[];
}
