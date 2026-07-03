/**
 * Constitutional Decision Workspace — FRAMEWORK-CDW-001
 * Derived from Constitution Article VI
 * Executive Decision No. 34 — Institutional Decision Register
 */

import {
  CONSTITUTIONAL_DECISION_HIERARCHY,
  DECISION_EVIDENCE_TYPES,
  DECISION_RECORD_FIELDS,
} from "@/lib/constitution/articles/article-vi";

export const CDW_FRAMEWORK = {
  identifier: "FRAMEWORK-CDW-001",
  title: "Constitutional Decision Workspace",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-VI",
    "CANON-002",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-007",
    "CANON-009",
    "CANON-010",
    "CANON-017",
    "CANON-020",
    "FRAMEWORK-CAE-001",
    "FRAMEWORK-IDR-001",
    "FRAMEWORK-PAF-001",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-EIA-001",
    "FRAMEWORK-GRF-001",
    "FRAMEWORK-ISA-001",
    "FRAMEWORK-HIR-001",
    "FRAMEWORK-LLR-001",
    "FRAMEWORK-IDI-001",
  ],
} as const;

export const CDW_PURPOSE = `Significant decisions shall follow a constitutional workflow — not personality, convenience, or financial advantage alone.

The Constitutional Decision Workspace operationalizes Article VI — disciplined, evidence-based decision-making with permanent institutional memory.`;

export const CDW_WORKFLOW_SECTIONS: ReadonlyArray<{
  id: string;
  label: string;
  frameworkId: string | null;
  href?: string;
}> = [
  { id: "proposal", label: "Proposal Summary", frameworkId: null },
  { id: "cae", label: "Constitutional Compliance Statement", frameworkId: "FRAMEWORK-CAE-001", href: "/library/constitutional-alignment" },
  { id: "canon-matrix", label: "Canon Alignment Matrix", frameworkId: null, href: "/library/first-principles" },
  { id: "paf", label: "Purpose Assessment", frameworkId: "FRAMEWORK-PAF-001", href: "/library/frameworks/purpose-assessment" },
  { id: "tia", label: "Trust Impact Assessment", frameworkId: "FRAMEWORK-TIA-001", href: "/library/frameworks/trust-impact-assessment" },
  { id: "isa", label: "Institutional Strength Assessment", frameworkId: "FRAMEWORK-ISA-001", href: "/library/frameworks/institutional-strength-assessment" },
  { id: "hir", label: "Human Impact Review", frameworkId: "FRAMEWORK-HIR-001", href: "/library/frameworks/human-impact-review" },
  { id: "eia", label: "Ecosystem Impact Assessment", frameworkId: "FRAMEWORK-EIA-001", href: "/library/frameworks/ecosystem-impact-assessment" },
  { id: "financial", label: "Financial Review", frameworkId: null },
  { id: "risk", label: "Risk Register", frameworkId: null },
  { id: "idr", label: "Decision Record", frameworkId: "FRAMEWORK-IDR-001", href: "/library/frameworks/institutional-decision-record" },
  { id: "post-review", label: "Post-Implementation Review", frameworkId: "FRAMEWORK-ASR-001", href: "/library/frameworks/annual-stewardship-review" },
  { id: "llr", label: "Lessons Learned", frameworkId: "FRAMEWORK-LLR-001", href: "/library/frameworks/lessons-learned" },
];

export const CDW_BODY = `${CDW_PURPOSE}

## Constitutional Decision Hierarchy (Art. VI § 6.02)

${CONSTITUTIONAL_DECISION_HIERARCHY.map((item, i) => `${i + 1}. ${item}`).join("\n")}

No decision approved solely for financial advantage if it materially conflicts with higher constitutional principles.

## Decision Workspace Workflow

${CDW_WORKFLOW_SECTIONS.map((s) => `- ${s.label}${s.frameworkId ? ` (${s.frameworkId})` : ""}`).join("\n")}

Each workspace links to Constitution Articles, Canons, prior decisions, governance policies, Knowledge Objects, and Stewardship Reports.

## Evidence Types (Art. VI § 6.03)

${DECISION_EVIDENCE_TYPES.map((e) => `- ${e}`).join("\n")}

## Institutional Decision Register (ED 34)

${DECISION_RECORD_FIELDS.map((f) => `- ${f}`).join("\n")}

The Register preserves not only what was decided, but why — searchable institutional reasoning across generations.`;
