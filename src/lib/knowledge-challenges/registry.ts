/**
 * Knowledge Challenge Process registry
 * Per CANON-023 / FRAMEWORK-KCP-001 / Executive Decision No. 25
 */

import type { KnowledgeChallenge } from "@/lib/frameworks/knowledge-challenge-process";

export const KNOWLEDGE_CHALLENGE_REGISTRY: KnowledgeChallenge[] = [
  {
    id: "KCP-AUTO-001",
    slug: "vehicle-history-verification-redesign",
    title: "Redesign vehicle history verification pipeline",
    challengeType: "engineering_decision",
    institution: "Stankings Auto Hub",
    institutionSlug: "stankings-auto-hub",
    challengedArtifact: "Legacy VIN lookup workflow (manual registry cross-check)",
    submittedBy: "Engineering — Vehicle Trust",
    submittedByRole: "Junior Engineer",
    submittedAt: "2058-03-14",
    status: "accepted",
    evidence:
      "Blockchain-linked service records + insurer API integration reduce false negatives by 41% in pilot. Current manual workflow misses 18% of accident history within 90-day window.",
    proposedImprovement:
      "Replace manual registry cross-check with automated multi-source verification graph; retain human review only for contested records.",
    risks:
      "Insurer API dependency; initial integration cost; training for verification reviewers on new dispute workflow.",
    expectedBenefits:
      "Faster, more accurate vehicle histories; reduced buyer fraud; reusable verification capability across ecosystem.",
    canonReferences: ["CANON-023", "CANON-009", "CANON-017", "CANON-008"],
    reviewOutcome:
      "Accepted — evidence reviewed by Platform Architecture and Trust teams. Pilot approved for Lagos and Abuja markets. Principle preserved (trust in vehicles); method improved.",
    reviewedBy: "Auto Hub Engineering Lead + Library Council delegate",
    reviewedAt: "2058-04-02",
    knowledgeObjectsUpdated: [
      { identifier: "IIR-AUTO-001", title: "Vehicle Verification Redesign", href: "/library/improvements" },
    ],
  },
  {
    id: "KCP-YIKE-001",
    slug: "listing-approval-sla-challenge",
    title: "Reduce listing approval SLA from 72 to 24 hours",
    challengeType: "customer_process",
    institution: "Yike",
    institutionSlug: "yike",
    challengedArtifact: "Listing approval workflow — 72-hour manual review SLA",
    submittedBy: "Customer Operations",
    submittedByRole: "Operations Analyst",
    submittedAt: "2026-05-10",
    status: "accepted",
    evidence:
      "Seller churn survey: 34% cite approval delays. Automated pre-screening catches 78% of policy violations without human review.",
    proposedImprovement:
      "Tiered approval: automated pre-screen for verified sellers; 24-hour SLA for flagged listings only.",
    risks: "Fraudulent listings if pre-screen rules too permissive; reviewer workload redistribution.",
    expectedBenefits: "Faster time-to-market for legitimate sellers; improved seller NPS; reduced ops cost per listing.",
    canonReferences: ["CANON-023", "CANON-010", "CANON-011", "CANON-017"],
    reviewOutcome: "Accepted — IIR-YIKE-002 filed. Trust Verification rules extended to pre-screen engine.",
    reviewedBy: "Yike Trust + Operations",
    reviewedAt: "2026-05-28",
  },
  {
    id: "KCP-ENG-001",
    slug: "auth-middleware-matcher-policy",
    title: "Broaden auth middleware matcher exclusions",
    challengeType: "technical_standard",
    institution: "Group Platform",
    challengedArtifact: "Engineering Standard — Auth middleware matcher configuration",
    submittedBy: "Platform Engineering",
    submittedByRole: "Senior Engineer",
    submittedAt: "2026-04-18",
    status: "accepted_with_conditions",
    evidence:
      "INC-ENG-001 root cause: overly broad matcher caught static assets. Industry pattern: explicit public route registry vs negative matcher list.",
    proposedImprovement:
      "Adopt explicit public route registry; deprecate negative matcher exclusions except for documented exceptions.",
    risks: "Migration effort across 12 services; temporary dual-configuration period.",
    expectedBenefits: "Fewer auth regressions; clearer security boundary; easier onboarding for new services.",
    canonReferences: ["CANON-023", "CANON-015", "CANON-011", "CANON-007"],
    reviewOutcome:
      "Accepted with conditions — migrate identity-critical services first; 6-month deprecation window for legacy matcher pattern.",
    reviewedBy: "Platform Architecture Council",
    reviewedAt: "2026-05-01",
    knowledgeObjectsUpdated: [
      { identifier: "LLR-ENG-001", title: "Deployment Configuration Lesson", href: "/library/lessons/LLR-ENG-001" },
    ],
  },
  {
    id: "KCP-GOV-001",
    slug: "par-threshold-for-internal-tools",
    title: "Lower PAR threshold for internal-only tools",
    challengeType: "governance_practice",
    institution: "Stankings Group",
    challengedArtifact: "PAR review threshold — all new capabilities regardless of audience",
    submittedBy: "IKI Engineering",
    submittedByRole: "Institutional Builder",
    submittedAt: "2026-06-20",
    status: "under_review",
    evidence:
      "Internal admin tools delayed 3–4 weeks for full PAR cycle; no customer or ecosystem exposure. CANON-011 supports proportionate process.",
    proposedImprovement:
      "Tiered PAR: lightweight alignment check for employee-only tools with no customer data; full PAR unchanged for external-facing capabilities.",
    risks: "Scope creep — internal tools later exposed externally without full PAR.",
    expectedBenefits: "Faster internal iteration; PAR resources focused on material external impact.",
    canonReferences: ["CANON-023", "CANON-018", "CANON-011", "CANON-003"],
    reviewOutcome: undefined,
    reviewedBy: undefined,
    reviewedAt: undefined,
  },
  {
    id: "KCP-BAYRIGHT-001",
    slug: "settlement-notification-workflow",
    title: "Proactive settlement delay notifications",
    challengeType: "workflow",
    institution: "BayRight",
    institutionSlug: "bayright",
    challengedArtifact: "Settlement notification workflow — reactive only",
    submittedBy: "Customer Support",
    submittedByRole: "Support Lead",
    submittedAt: "2026-03-22",
    status: "accepted",
    evidence:
      "INC-BAYRIGHT-001: customers learned of delays before internal teams. Post-incident survey: 89% want proactive status updates.",
    proposedImprovement:
      "Automated customer notification at T+15min if settlement batch not confirmed; internal escalation parallel.",
    risks: "False-positive notifications if monitoring thresholds too sensitive.",
    expectedBenefits: "Customer trust preserved during incidents; reduced support ticket volume.",
    canonReferences: ["CANON-023", "CANON-014", "CANON-002", "CANON-010"],
    reviewOutcome: "Accepted — deployed with settlement SLA monitoring (IIR-BAYRIGHT-001).",
    reviewedBy: "BayRight Product + Engineering",
    reviewedAt: "2026-04-15",
  },
];

export function getKnowledgeChallenge(slug: string): KnowledgeChallenge | undefined {
  return KNOWLEDGE_CHALLENGE_REGISTRY.find((c) => c.slug === slug || c.id === slug);
}

export function searchKnowledgeChallenges(query: string): KnowledgeChallenge[] {
  const q = query.toLowerCase().trim();
  if (!q) return KNOWLEDGE_CHALLENGE_REGISTRY;
  return KNOWLEDGE_CHALLENGE_REGISTRY.filter((c) => {
    const haystack = [
      c.id,
      c.title,
      c.institution,
      c.challengedArtifact,
      c.evidence,
      c.proposedImprovement,
      c.submittedBy,
      c.challengeType,
      ...c.canonReferences,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getKnowledgeChallengeStats() {
  const total = KNOWLEDGE_CHALLENGE_REGISTRY.length;
  const accepted = KNOWLEDGE_CHALLENGE_REGISTRY.filter(
    (c) => c.status === "accepted" || c.status === "accepted_with_conditions"
  ).length;
  const underReview = KNOWLEDGE_CHALLENGE_REGISTRY.filter(
    (c) => c.status === "under_review" || c.status === "submitted"
  ).length;
  const institutions = new Set(KNOWLEDGE_CHALLENGE_REGISTRY.map((c) => c.institution)).size;
  return { total, accepted, underReview, institutions };
}
