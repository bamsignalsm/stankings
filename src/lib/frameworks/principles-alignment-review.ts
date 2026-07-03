/**
 * Principles Alignment Review (PAR)
 * Derived from CANON-018 — Executive Decision No. 20
 */

export const PAR_FRAMEWORK = {
  identifier: "FRAMEWORK-PAR-001",
  title: "Principles Alignment Review",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-007",
    "CANON-014",
    "CANON-016",
    "CANON-017",
    "CANON-018",
    "FRAMEWORK-PAF-001",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-EIA-001",
    "FRAMEWORK-ISA-001",
    "FRAMEWORK-URF-001",
    "LEX-PRINCIPLE",
    "LS-001",
  ],
} as const;

export const PAR_PURPOSE = `Every acquisition, strategic partnership, investment, new company, or major institutional initiative shall complete a Principles Alignment Review before final approval.

The objective is not to prevent innovation or growth.

The objective is to ensure that growth never requires abandoning the principles that give the institution its identity.

The Principles Alignment Review operationalizes CANON-018 — Principles Before Opportunity.`;

export const PAR_PRINCIPLE_TEST =
  "Does this require compromising one or more institutional principles? Would we remain comfortable explaining this decision to future custodians? Will this strengthen or weaken confidence in the Stankings name?";

export const PAR_REVIEW_FIELDS = [
  {
    id: "proposal-summary",
    label: "Proposal Summary",
    description: "What is being proposed — acquisition, partnership, investment, new company, or major initiative.",
  },
  {
    id: "paf-reference",
    label: "Purpose Assessment Reference",
    description: "Link or summary of completed Purpose Assessment (PAF) — meaningful problem solved.",
  },
  {
    id: "tia-reference",
    label: "Trust Impact Reference",
    description: "Link or summary of Trust Impact Assessment (TIA) — effect on institutional trust.",
  },
  {
    id: "eia-reference",
    label: "Ecosystem Impact Reference",
    description: "Link or summary of Ecosystem Impact Assessment (EIA) — effect on the wider ecosystem.",
  },
  {
    id: "isa-reference",
    label: "Institutional Strength Assessment Reference",
    description: "Link or summary of ISA where applicable — institutional capability impact.",
  },
  {
    id: "canon-matrix",
    label: "Canon Alignment Matrix",
    description: "Alignment status for each Volume 0 Canon — auditable record of consistency.",
  },
  {
    id: "conflicts",
    label: "Potential Principle Conflicts",
    description: "Explicit identification of any material conflicts with Canons, Constitution, or purpose.",
  },
  {
    id: "mitigation",
    label: "Mitigation Measures",
    description: "How conflicts will be resolved — or why the opportunity must be declined.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    description: "Proceed, proceed with conditions, defer, or decline — with rationale.",
  },
  {
    id: "final-approval",
    label: "Final Approval",
    description: "Board or delegated authority record — date, approver, and conditions.",
  },
] as const;

export type CanonAlignmentStatus = "aligned" | "partial" | "conflict" | "not_applicable";

export interface CanonAlignmentRow {
  canonId: string;
  title: string;
  href: string;
  status: CanonAlignmentStatus;
  notes: string;
}

/** Volume 0 Canons 001–018 for the alignment matrix */
export const PAR_CANON_ALIGNMENT_TEMPLATE: Omit<CanonAlignmentRow, "status" | "notes">[] = [
  { canonId: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001" },
  { canonId: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002" },
  { canonId: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003" },
  { canonId: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004" },
  { canonId: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005" },
  { canonId: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006" },
  { canonId: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007" },
  { canonId: "CANON-008", title: "Excellence Is a Discipline, Not an Event", href: "/library/canon/CANON-008" },
  { canonId: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009" },
  { canonId: "CANON-010", title: "People Are Ends, Never Merely Means", href: "/library/canon/CANON-010" },
  { canonId: "CANON-011", title: "Simplicity Creates Strength", href: "/library/canon/CANON-011" },
  { canonId: "CANON-012", title: "Build Platforms, Not Silos", href: "/library/canon/CANON-012" },
  { canonId: "CANON-013", title: "Innovate with Purpose", href: "/library/canon/CANON-013" },
  { canonId: "CANON-014", title: "Our Word Is a Commitment", href: "/library/canon/CANON-014" },
  { canonId: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015" },
  { canonId: "CANON-016", title: "Build for Institutional Strength", href: "/library/canon/CANON-016" },
  { canonId: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017" },
  { canonId: "CANON-018", title: "Principles Before Opportunity", href: "/library/canon/CANON-018" },
  { canonId: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019" },
  { canonId: "CANON-020", title: "Exercise Sound Judgment", href: "/library/canon/CANON-020" },
  { canonId: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021" },
  { canonId: "CANON-022", title: "Create Value That Outlasts Us", href: "/library/canon/CANON-022" },
  { canonId: "CANON-023", title: "Remain Humble Enough to Learn", href: "/library/canon/CANON-023" },
  { canonId: "CANON-024", title: "Raise the Standard", href: "/library/canon/CANON-024" },
  { canonId: "CANON-025", title: "Be Worthy of Endurance", href: "/library/canon/CANON-025" },
];

export type PrinciplesAlignmentRecommendation =
  | "proceed"
  | "proceed_with_conditions"
  | "defer"
  | "decline";

export interface PrinciplesAlignmentReview {
  id: string;
  proposalTitle: string;
  proposalType: string;
  proposalSummary: string;
  frameworkReferences: {
    paf?: string;
    tia?: string;
    eia?: string;
    isa?: string;
    urf?: string;
  };
  canonAlignment: CanonAlignmentRow[];
  principleConflicts: string[];
  mitigationMeasures: string[];
  recommendation: PrinciplesAlignmentRecommendation;
  recommendationRationale: string;
  notes: string;
}

function statusLabel(status: CanonAlignmentStatus): string {
  const map: Record<CanonAlignmentStatus, string> = {
    aligned: "Aligned",
    partial: "Partial",
    conflict: "Conflict",
    not_applicable: "N/A",
  };
  return map[status];
}

export { statusLabel as parAlignmentStatusLabel };

export const PAR_EXAMPLE_BAMBET_DECLINED: PrinciplesAlignmentReview = {
  id: "par-bambet-declined",
  proposalTitle: "BamBet — ecosystem gambling platform",
  proposalType: "New company / revenue opportunity",
  proposalSummary:
    "Proposal to launch a gambling platform generating significant revenue within the Stankings ecosystem, leveraging existing user base and payment infrastructure.",
  frameworkReferences: {
    paf: "PAF-2024-BAMBET — revenue generation cited; meaningful problem for vulnerable users not addressed",
    tia: "TIA-2024-BAMBET — material negative trust impact for families, faith communities, and ecosystem partners",
    eia: "EIA-2024-BAMBET — conflicts with trust-oriented identity of Yike, BayRight, BamSignal",
  },
  canonAlignment: [
    { canonId: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", status: "conflict", notes: "Harm to vulnerable users outweighs revenue service" },
    { canonId: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", status: "conflict", notes: "Gambling erodes trust-oriented ecosystem identity" },
    { canonId: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", status: "conflict", notes: "Revenue without meaningful institutional purpose" },
    { canonId: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", status: "partial", notes: "Short-term gain vs generational stewardship" },
    { canonId: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", status: "conflict", notes: "Would damage trust across entire ecosystem" },
    { canonId: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", status: "conflict", notes: "Future custodians would inherit compromised identity" },
    { canonId: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", status: "aligned", notes: "Honest assessment of harms led to decline" },
    { canonId: "CANON-008", title: "Excellence Is a Discipline, Not an Event", href: "/library/canon/CANON-008", status: "not_applicable", notes: "" },
    { canonId: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", status: "aligned", notes: "Decision recorded as institutional lesson" },
    { canonId: "CANON-010", title: "People Are Ends, Never Merely Means", href: "/library/canon/CANON-010", status: "conflict", notes: "Exploits addiction vulnerability for revenue" },
    { canonId: "CANON-011", title: "Simplicity Creates Strength", href: "/library/canon/CANON-011", status: "not_applicable", notes: "" },
    { canonId: "CANON-012", title: "Build Platforms, Not Silos", href: "/library/canon/CANON-012", status: "partial", notes: "Would reuse platforms for misaligned purpose" },
    { canonId: "CANON-013", title: "Innovate with Purpose", href: "/library/canon/CANON-013", status: "conflict", notes: "Innovation without institutional purpose" },
    { canonId: "CANON-014", title: "Our Word Is a Commitment", href: "/library/canon/CANON-014", status: "partial", notes: "Contradicts public trust commitments" },
    { canonId: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015", status: "aligned", notes: "Transparent reasoning documented" },
    { canonId: "CANON-016", title: "Build for Institutional Strength", href: "/library/canon/CANON-016", status: "conflict", notes: "Weakens long-term institutional character" },
    { canonId: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017", status: "conflict", notes: "Increases harmful uncertainty for vulnerable users" },
    { canonId: "CANON-018", title: "Principles Before Opportunity", href: "/library/canon/CANON-018", status: "aligned", notes: "Opportunity declined — principles protected" },
  ],
  principleConflicts: [
    "Material conflict with trust-oriented ecosystem identity",
    "Revenue opportunity requires abandoning institutional purpose standards",
    "Would create precedent for commercial pressure overriding Canons",
    "Cannot be explained comfortably to future custodians",
  ],
  mitigationMeasures: [
    "No mitigation sufficient — fundamental principle conflicts",
    "Alternative: invest declined revenue opportunity into aligned institutions",
  ],
  recommendation: "decline",
  recommendationRationale:
    "Principle Test failed. Multiple Canon conflicts. Growth must not require abandoning principles. Declined per CANON-018.",
  notes:
    "Foundational PAR example — captures reasoning behind declining BamBet. Future leaders reference Canons, not individual precedent.",
};

export const PAR_EXAMPLE_YIKE_PROCEED: PrinciplesAlignmentReview = {
  id: "par-yike-verification-proceed",
  proposalTitle: "Yike Trust Verification rollout",
  proposalType: "Major product initiative",
  proposalSummary:
    "Enterprise-wide verification for property and vehicle listings — identity, documents, trust scores.",
  frameworkReferences: {
    paf: "PAF-YIKE-VER-001 — reduces fraud uncertainty in commerce",
    tia: "TIA-YIKE-VER-001 — strengthens buyer and seller trust",
    eia: "EIA-YIKE-VER-001 — strengthens Yike, BayRight, Stanhan ecosystem",
    urf: "URF-YIKE-VER-001 — measurable uncertainty reduction",
  },
  canonAlignment: PAR_CANON_ALIGNMENT_TEMPLATE.map((row) => ({
    ...row,
    status: ["CANON-008", "CANON-011"].includes(row.canonId)
      ? ("not_applicable" as const)
      : ("aligned" as const),
    notes: row.canonId === "CANON-017" ? "Core uncertainty reduction in commerce" : row.canonId === "CANON-018" ? "Strengthens principle adherence" : "",
  })),
  principleConflicts: [],
  mitigationMeasures: ["Phased rollout with privacy review", "Clear customer communication on verification scope"],
  recommendation: "proceed",
  recommendationRationale:
    "Full Canon alignment. Strengthens institutional principles. No material conflicts identified.",
  notes: "Example of proposal that passes PAR — auditable matrix shows why approval is consistent with philosophy.",
};

export const PAR_EXAMPLE_REVIEWS: PrinciplesAlignmentReview[] = [
  PAR_EXAMPLE_BAMBET_DECLINED,
  PAR_EXAMPLE_YIKE_PROCEED,
];
