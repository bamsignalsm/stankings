/**
 * Constitutional Alignment Engine — proposal registry
 */

import type { BoardProposal } from "@/lib/frameworks/constitutional-alignment-engine";

export const BOARD_PROPOSAL_REGISTRY: BoardProposal[] = [
  {
    identifier: "PROP-YIKE-VER-001",
    slug: "yike-trust-verification",
    title: "Yike Trust Verification — national phased rollout",
    summary:
      "Expand mandatory seller verification across Yike marketplaces to reduce fraud and increase buyer confidence.",
    institution: "Yike",
    category: "Product / major launch",
    status: "approved",
    submittedAt: "2026-06-27",
    compliance: {
      constitutionalArticles: [
        "Art. I § 1.03 — Institutional Purpose",
        "Art. II § 2.01 — Constitutional Purpose",
        "Art. II § 2.04 — Strengthen trust in markets",
        "Art. II § 2.08 — Purpose before expansion",
      ],
      canonReferences: ["CANON-001", "CANON-002", "CANON-003", "CANON-011", "CANON-017"],
      objectivesAdvanced: [
        "Strengthen trust within every market in which the Group operates",
        "Reduce unnecessary uncertainty",
        "Develop platforms that increase institutional capability",
      ],
      constitutionalRisks: [],
      complianceChecks: [
        { gateId: "article-i", status: "pass", notes: "Strengthens marketplace identity without compromising neutrality." },
        { gateId: "article-ii", status: "pass", notes: "Directly advances constitutional mission and trust objectives." },
        { gateId: "canons", status: "pass" },
        { gateId: "trust", status: "pass", notes: "TIA documents measurable trust improvement." },
        { gateId: "ecosystem", status: "pass", notes: "Strengthens BayRight, BamSignal, and sibling institutions." },
        { gateId: "strength", status: "pass" },
        { gateId: "human", status: "review", notes: "Seller onboarding friction — mitigated through phased rollout." },
        { gateId: "generational", status: "pass", notes: "Long-term trust infrastructure worthy of generational stewardship." },
      ],
    },
    recommendation: "Proceed with phased rollout per JR-YIKE-VER-001.",
  },
  {
    identifier: "PROP-BAMBET-001",
    slug: "bambet-gambling-platform",
    title: "BamBet — gambling platform opportunity",
    summary:
      "Launch a gambling platform leveraging existing user base and payment infrastructure.",
    institution: "Stankings Group",
    category: "Strategic / new company",
    status: "declined",
    submittedAt: "2026-06-27",
    compliance: {
      constitutionalArticles: ["Art. I § 1.04 — Institutional Character", "Art. II § 2.01 — Constitutional Purpose"],
      canonReferences: ["CANON-002", "CANON-003", "CANON-018"],
      objectivesAdvanced: ["Short-term commercial revenue"],
      constitutionalRisks: [
        "Material conflict with trust-building constitutional purpose",
        "Erodes institutional character defined in Article I § 1.04",
        "Undermines long-term public confidence objective in Article II § 2.01",
        "PAR documents multiple Canon conflicts",
      ],
      complianceChecks: [
        { gateId: "article-i", status: "fail", notes: "Conflicts with trust-oriented ecosystem identity." },
        { gateId: "article-ii", status: "fail", notes: "Revenue pursued without constitutional purpose alignment." },
        { gateId: "canons", status: "fail", notes: "CANON-018 — Principles Before Opportunity." },
        { gateId: "trust", status: "fail", notes: "TIA identifies long-term trust erosion." },
        { gateId: "ecosystem", status: "fail", notes: "Weakens sibling institutions dependent on trust." },
        { gateId: "strength", status: "review" },
        { gateId: "human", status: "fail", notes: "HIR identifies dignity and addiction risks." },
        { gateId: "generational", status: "fail", notes: "Future custodians inherit compromised identity." },
      ],
    },
    recommendation: "Decline. Constitutional review confirms misalignment with Article II.",
  },
  {
    identifier: "PROP-STANHAN-002",
    slug: "stanhan-regional-expansion",
    title: "Stanhan — regional property development expansion",
    summary:
      "Accelerate property development into three new states without full verification infrastructure.",
    institution: "Stanhan",
    category: "Strategic / expansion",
    status: "flagged_for_review",
    submittedAt: "2026-06-27",
    compliance: {
      constitutionalArticles: [
        "Art. II § 2.05 — Strategic Direction",
        "Art. II § 2.08 — Purpose Before Expansion",
      ],
      canonReferences: ["CANON-003", "CANON-006", "CANON-011"],
      objectivesAdvanced: [
        "Contribute to economic development",
        "Expand property verification capability",
      ],
      constitutionalRisks: [
        "Expansion pace may outrun verification standards",
        "Trust impact uncertain in new markets",
      ],
      complianceChecks: [
        { gateId: "article-i", status: "pass" },
        { gateId: "article-ii", status: "review", notes: "Purpose aligned but expansion criteria incomplete." },
        { gateId: "canons", status: "pass" },
        { gateId: "trust", status: "review", notes: "Verification infrastructure not yet operational in target states." },
        { gateId: "ecosystem", status: "pass", notes: "Strengthens Yike property marketplace." },
        { gateId: "strength", status: "review", notes: "Operational capacity assessment pending." },
        { gateId: "human", status: "pass" },
        { gateId: "generational", status: "review", notes: "GRF required before final approval." },
      ],
    },
    recommendation: "Flagged — complete Trust and Generational reviews before Board final approval.",
  },
];

export function getBoardProposal(slug: string): BoardProposal | undefined {
  return BOARD_PROPOSAL_REGISTRY.find((p) => p.slug === slug || p.identifier === slug);
}

export function getConstitutionalAlignmentStats() {
  const total = BOARD_PROPOSAL_REGISTRY.length;
  const approved = BOARD_PROPOSAL_REGISTRY.filter((p) => p.status === "approved").length;
  const flagged = BOARD_PROPOSAL_REGISTRY.filter((p) => p.status === "flagged_for_review").length;
  const declined = BOARD_PROPOSAL_REGISTRY.filter((p) => p.status === "declined").length;
  return { total, approved, flagged, declined };
}
