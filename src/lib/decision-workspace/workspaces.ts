/**
 * Constitutional Decision Workspaces — Article VI / FRAMEWORK-CDW-001
 */

import type { ConstitutionalDecisionWorkspace } from "@/lib/decision-workspace/types";
import {
  CDW_WORKFLOW_SECTIONS,
} from "@/lib/frameworks/constitutional-decision-workspace";
import { CONSTITUTIONAL_DECISION_HIERARCHY } from "@/lib/constitution/articles/article-vi";

export const DECISION_WORKSPACE_PORTAL_IDENTIFIER = "FRAMEWORK-CDW-001";

const ARTICLE_VI_REFS = [
  "Art. VI § 6.01 — Principle of Constitutional Decision-Making",
  "Art. VI § 6.02 — Constitutional Decision Hierarchy",
  "Art. VI § 6.04 — Documentation of Decisions",
];

function hierarchyApproved(): ConstitutionalDecisionWorkspace["hierarchyChecks"] {
  return CONSTITUTIONAL_DECISION_HIERARCHY.map((criterion) => ({
    criterion,
    status: "complete" as const,
    summary: "Evaluated per constitutional sequence.",
  }));
}

function workflow(
  completed: string[],
  inProgress: string[] = [],
): ConstitutionalDecisionWorkspace["workflowSections"] {
  return CDW_WORKFLOW_SECTIONS.map((s) => ({
    sectionId: s.id,
    status: completed.includes(s.id)
      ? ("complete" as const)
      : inProgress.includes(s.id)
        ? ("in_progress" as const)
        : ("pending" as const),
    href: s.href,
  }));
}

export const DECISION_WORKSPACES: ConstitutionalDecisionWorkspace[] = [
  {
    slug: "four-gate-workflow",
    title: "Four-Gate Proposal Workflow (PAF → TIA → EIA → GRF)",
    status: "approved",
    proposalSummary:
      "Establish a mandatory four-gate assessment workflow for major proposals before financial modelling and implementation.",
    responsibleAuthority: "Library Council",
    decisionIdentifier: "IDR-GATES-001",
    hierarchyChecks: hierarchyApproved(),
    workflowSections: workflow(
      ["proposal", "cae", "canon-matrix", "paf", "tia", "eia", "hir", "risk", "idr", "llr"],
      ["post-review"],
    ),
    constitutionArticles: [...ARTICLE_VI_REFS, "Art. II § 2.08 — Constitutional Compliance"],
    canonReferences: ["CANON-002", "CANON-003", "CANON-005", "CANON-006", "CANON-007"],
    similarDecisions: [
      { title: "IDR-IKI-001 — IKI Naming", href: "/library/decisions/IDR-IKI-001", identifier: "IDR-IKI-001" },
    ],
    knowledgeObjects: [
      { title: "FRAMEWORK-PAF-001", href: "/library/frameworks/purpose-assessment" },
      { title: "FRAMEWORK-TIA-001", href: "/library/frameworks/trust-impact-assessment" },
      { title: "FRAMEWORK-EIA-001", href: "/library/frameworks/ecosystem-impact-assessment" },
      { title: "FRAMEWORK-GRF-001", href: "/library/frameworks/generational-review" },
    ],
    postImplementationReview: {
      status: "In progress",
      summary: "Frameworks operational; IDR capture strengthening per Canon 007.",
      href: "/library/decisions/IDR-GATES-001",
    },
    lessonsLearned: [
      "Gate order matters: PAF → TIA → EIA → GRF before financial modelling.",
      "Process friction is acceptable when it prevents institutional harm.",
    ],
    createdAt: "2026-06-27",
    updatedAt: "2026-06-27",
  },
  {
    slug: "bambet-decline",
    title: "Decline BamBet Partnership Proposal",
    status: "declined",
    proposalSummary:
      "Evaluate partnership with BamBet — a sports betting platform — against constitutional purpose, trust, and institutional principles.",
    responsibleAuthority: "Stanley Ukeje",
    decisionIdentifier: "JR-BAMBET-001",
    hierarchyChecks: [
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[0], status: "complete", summary: "Lawful to decline." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[1], status: "complete", summary: "Conflict with constitutional purpose." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[2], status: "complete", summary: "Multiple Canon conflicts identified." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[3], status: "complete", summary: "Does not align with institutional purpose." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[4], status: "complete", summary: "Long-term trust erosion foreseeable." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[5], status: "complete", summary: "Material negative trust impact." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[6], status: "complete", summary: "Human impact of gambling promotion." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[7], status: "not_applicable", summary: "Financial advantage insufficient to override." },
      { criterion: CONSTITUTIONAL_DECISION_HIERARCHY[8], status: "not_applicable" },
    ],
    workflowSections: workflow(
      ["proposal", "cae", "canon-matrix", "paf", "tia", "hir", "risk", "idr", "llr"],
      ["eia"],
    ),
    constitutionArticles: [...ARTICLE_VI_REFS, "Art. II § 2.04 — Constitutional Objectives"],
    canonReferences: ["CANON-001", "CANON-002", "CANON-003", "CANON-018"],
    similarDecisions: [{ title: "IDR-GATES-001 — Gate workflow", href: "/library/decisions/IDR-GATES-001" }],
    knowledgeObjects: [
      { title: "JR-BAMBET-001", href: "/library/decision-intelligence", identifier: "JR-BAMBET-001" },
      { title: "FRAMEWORK-PAR-001", href: "/library/frameworks/principles-alignment-review" },
    ],
    lessonsLearned: [
      "Financial opportunity does not override constitutional principles.",
      "Judgment Records preserve reasoning for future custodians.",
      "Custodian Programme case study candidate.",
    ],
    createdAt: "2026-06-27",
    updatedAt: "2026-06-27",
  },
  {
    slug: "volume-zero-v1",
    title: "Seal Volume 0 — Twenty-Five Canons at Version 1.0",
    status: "implemented",
    proposalSummary:
      "Formally approve and seal Volume 0 (The Stankings Canons) at Version 1.0 as the philosophical foundation of the institution.",
    responsibleAuthority: "Library Council",
    hierarchyChecks: hierarchyApproved(),
    workflowSections: workflow(
      ["proposal", "cae", "canon-matrix", "paf", "tia", "eia", "risk", "idr", "post-review", "llr"],
    ),
    constitutionArticles: [...ARTICLE_VI_REFS, "Preamble — Canon interpretation"],
    canonReferences: ["CANON-001", "CANON-025", "CANON-023"],
    similarDecisions: [],
    knowledgeObjects: [
      { title: "Volume 0 — The Stankings Canons", href: "/library/first-principles" },
      { title: "FRAMEWORK-CMD-001", href: "/library/canon-maturity" },
    ],
    postImplementationReview: {
      status: "Complete",
      summary: "25 Canons sealed; Canon Maturity Dashboard operational.",
      href: "/library/canon-maturity",
    },
    lessonsLearned: [
      "Deliberate maturity cap (25–30 Canons) preserves application quality.",
      "Philosophy must precede constitutional law.",
    ],
    createdAt: "2026-06-27",
    updatedAt: "2026-06-27",
  },
  {
    slug: "hypothetical-acquisition",
    title: "Custodian Case Study — Proposed Ecosystem Acquisition",
    status: "draft",
    proposalSummary:
      "Training workspace: evaluate a hypothetical acquisition of a regional logistics company for constitutional alignment, trust impact, and generational effects.",
    responsibleAuthority: "Custodian Programme (training)",
    hierarchyChecks: CONSTITUTIONAL_DECISION_HIERARCHY.map((criterion) => ({
      criterion,
      status: "pending" as const,
    })),
    workflowSections: workflow([], ["proposal", "cae", "paf"]),
    constitutionArticles: ARTICLE_VI_REFS,
    canonReferences: ["CANON-005", "CANON-006", "CANON-016", "CANON-017", "CANON-018"],
    similarDecisions: [
      { title: "BamBet decline — principles over profit", href: "/library/decision-workspace/bambet-decline" },
      { title: "Four-gate workflow", href: "/library/decision-workspace/four-gate-workflow" },
    ],
    knowledgeObjects: [
      { title: "FRAMEWORK-ISA-001", href: "/library/frameworks/institutional-strength-assessment" },
      { title: "FRAMEWORK-EIA-001", href: "/library/frameworks/ecosystem-impact-assessment" },
    ],
    lessonsLearned: [],
    createdAt: "2026-06-27",
    updatedAt: "2026-06-27",
  },
];

export function getDecisionWorkspace(slug: string): ConstitutionalDecisionWorkspace | undefined {
  return DECISION_WORKSPACES.find((w) => w.slug === slug);
}

export function getDecisionWorkspaceStats() {
  const total = DECISION_WORKSPACES.length;
  const approved = DECISION_WORKSPACES.filter((w) => w.status === "approved" || w.status === "implemented").length;
  const withIdr = DECISION_WORKSPACES.filter((w) => w.decisionIdentifier).length;
  const training = DECISION_WORKSPACES.filter((w) => w.status === "draft").length;
  return { total, approved, withIdr, training };
}
