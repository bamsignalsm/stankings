/**
 * Human Impact Review (HIR)
 * Operational gate derived from CANON-010 — Executive Decision No. 12
 */

export const HIR_FRAMEWORK = {
  identifier: "FRAMEWORK-HIR-001",
  title: "Human Impact Review",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-004",
    "CANON-005",
    "CANON-006",
    "CANON-007",
    "CANON-008",
    "CANON-009",
    "CANON-010",
    "LEX-DIGNITY",
    "LEX-CUSTOMER",
  ],
} as const;

export const HIR_PURPOSE = `Every significant customer-facing product, policy or operational change shall be evaluated for its effect upon human dignity and fairness.

The Human Impact Review (HIR) operationalizes CANON-010 — People Are Ends, Never Merely Means.

Stankings Group shall never become an institution that is efficient but indifferent.`;

export const HIR_PEOPLE_TEST =
  "Does this decision respect the dignity of the people affected? Would we regard this decision as fair if we ourselves were in their position? Does it create lasting value rather than merely extracting short-term benefit?";

export const HIR_MANDATORY_TRIGGERS = [
  "Customer-facing product or feature launch",
  "Policy affecting customers, employees, or partners",
  "Operational process change affecting service experience",
  "AI or automation affecting human judgment or interaction",
  "Marketing, pricing, or sales practice change",
  "HR policy or workplace practice change",
] as const;

export const HIR_REQUIRED_FIELDS = [
  { id: "affected", label: "Who is affected?", description: "Customers, employees, partners, communities, vulnerable groups." },
  { id: "benefits", label: "What benefits are created?", description: "Concrete value for people — not only institutional metrics." },
  { id: "burdens", label: "What burdens are created?", description: "Costs, friction, risks, or disadvantages imposed on people." },
  { id: "vulnerable", label: "Vulnerable groups", description: "Are any groups disproportionately affected? How is that mitigated?" },
  { id: "simplicity", label: "Can the experience be simpler?", description: "Complexity shifted onto people deserves scrutiny." },
  { id: "dignity", label: "Dignity impact", description: "Does the proposal increase or reduce human dignity?" },
  { id: "relationships", label: "Long-term relationships", description: "Does it strengthen trust and relationships over time?" },
  { id: "canons", label: "Related Canons", description: "Especially CANON-001, CANON-002, CANON-010." },
  { id: "approval", label: "Approval", description: "Governance sign-off before implementation." },
] as const;

export type HIRApprovalStatus = "draft" | "under_review" | "approved" | "rejected";
export type HIRDignityImpact = "increases" | "neutral" | "reduces" | "unclear";

export interface HumanImpactReview {
  id: string;
  proposalTitle: string;
  proposalSummary: string;
  institution: string;
  status: HIRApprovalStatus;
  whoIsAffected: string[];
  benefitsCreated: string[];
  burdensCreated: string[];
  vulnerableGroupsNotes: string;
  experienceSimplification: string;
  dignityImpact: HIRDignityImpact;
  dignityNotes: string;
  relationshipImpact: string;
  canonReferences: { identifier: string; relevance: string }[];
  peopleTestAnswer: "yes" | "no" | "needs_review";
  peopleTestNotes: string;
  approvalNotes?: string;
}

export const HIR_EXAMPLE_YIKE: HumanImpactReview = {
  id: "hir-yike-verification",
  proposalTitle: "Mandatory seller identity verification before listing",
  proposalSummary:
    "Require verified identity for all property listings on Yike to reduce fraud and protect buyers.",
  institution: "Yike",
  status: "approved",
  whoIsAffected: [
    "Property sellers (including first-time listers)",
    "Buyers and families searching for homes",
    "Yike verification and support teams",
  ],
  benefitsCreated: [
    "Buyers gain confidence that listings represent real properties and sellers",
    "Reduced fraud protects families making major financial decisions",
    "Institutional trust strengthens the Yike marketplace",
  ],
  burdensCreated: [
    "Additional steps for sellers before first listing",
    "Support volume may increase during rollout",
  ],
  vulnerableGroupsNotes:
    "First-time sellers and those with limited digital literacy may find verification intimidating. Mitigation: clear guidance, human support channel, and respectful language — verification as protection, not suspicion.",
  experienceSimplification:
    "Single guided flow with progress indicator; optional assisted verification for edge cases.",
  dignityImpact: "increases",
  dignityNotes:
    "Framed as protecting buyers and honest sellers. Avoid language that treats unverified users as criminals by default.",
  relationshipImpact:
    "Long-term buyer and seller trust increases when fraud decreases. Short-term friction accepted for generational marketplace integrity.",
  canonReferences: [
    { identifier: "CANON-010", relevance: "People Test — families behind every purchase" },
    { identifier: "CANON-002", relevance: "Trust capital in property marketplace" },
    { identifier: "CANON-001", relevance: "Institution serves buyers and sellers" },
  ],
  peopleTestAnswer: "yes",
  peopleTestNotes:
    "Verification respects buyer dignity (safety) and seller dignity (fair marketplace). Fair if we were buying property ourselves.",
  approvalNotes: "Approved with requirement for accessible verification UX review before launch.",
};

export const HIR_EXAMPLE_BAMSIGNAL: HumanImpactReview = {
  id: "hir-bamsignal-matching",
  proposalTitle: "AI-assisted match recommendations",
  proposalSummary:
    "Introduce algorithmic match scoring to surface compatible profiles on BamSignal.",
  institution: "BamSignal",
  status: "under_review",
  whoIsAffected: [
    "Members seeking marriage partners",
    "Families involved in traditional matchmaking contexts",
    "Moderation and safety teams",
  ],
  benefitsCreated: [
    "Members may discover compatible matches more efficiently",
    "Human moderators supported by transparent scoring rationale",
  ],
  burdensCreated: [
    "Risk of reducing people to scores",
    "Potential bias in training data",
    "Members may feel ranked rather than respected",
  ],
  vulnerableGroupsNotes:
    "New members and those from underserved demographics may be disadvantaged by opaque algorithms. Requires bias audit and appeal path.",
  experienceSimplification:
    "Members can always browse without algorithm; AI suggestions optional and explainable.",
  dignityImpact: "unclear",
  dignityNotes:
    "Every match could become a marriage — scoring must never feel dehumanizing. Pending ethics review.",
  relationshipImpact:
    "If implemented transparently, may strengthen long-term platform trust. If opaque, damages dignity and retention.",
  canonReferences: [
    { identifier: "CANON-010", relevance: "People as ends — not data points" },
    { identifier: "CANON-007", relevance: "Truth about how matching works" },
    { identifier: "CANON-002", relevance: "Trust in sensitive personal context" },
  ],
  peopleTestAnswer: "needs_review",
  peopleTestNotes:
    "Cannot answer confidently until explainability, opt-out, and bias audit complete.",
};

export const HIR_EXAMPLE_SUPPORT: HumanImpactReview = {
  id: "hir-support-automation",
  proposalTitle: "Tier-1 customer support chatbot",
  proposalSummary:
    "Deploy AI chatbot for initial customer support across ecosystem platforms.",
  institution: "Stankings Group (Shared Services)",
  status: "approved",
  whoIsAffected: [
    "Customers contacting support",
    "Support agents",
    "Institutions using shared support infrastructure",
  ],
  benefitsCreated: [
    "Faster response to common questions",
    "Agents freed for complex, high-empathy cases",
    "24/7 availability for basic inquiries",
  ],
  burdensCreated: [
    "Customers with complex issues may face friction reaching humans",
    "Risk of frustrating loops if bot cannot resolve issue",
  ],
  vulnerableGroupsNotes:
    "Elderly customers, those in distress (e.g. failed transaction), and low-literacy users need immediate human escalation path.",
  experienceSimplification:
    "One-tap 'speak to a person' always visible; bot declares itself non-human in first message.",
  dignityImpact: "neutral",
  dignityNotes:
    "Automation acceptable when human path is obvious and fast. Rejected: hiding human availability.",
  relationshipImpact:
    "Strengthens if customers feel heard quickly; weakens if trapped in bot loops during crises.",
  canonReferences: [
    { identifier: "CANON-010", relevance: "Systems serve people" },
    { identifier: "CANON-008", relevance: "Support quality standard" },
    { identifier: "CANON-002", relevance: "Trust in resolution" },
  ],
  peopleTestAnswer: "yes",
  peopleTestNotes:
    "Approved with mandatory human escalation SLA and prohibition on dark-pattern bot retention.",
};

export const HIR_EXAMPLE_REVIEWS: HumanImpactReview[] = [
  HIR_EXAMPLE_YIKE,
  HIR_EXAMPLE_BAMSIGNAL,
  HIR_EXAMPLE_SUPPORT,
];
