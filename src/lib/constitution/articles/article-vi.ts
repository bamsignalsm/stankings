/**
 * Volume I — Article VI
 * Constitutional Decision-Making
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_VI_ID = "article-vi" as const;

export const CONSTITUTIONAL_DECISION_HIERARCHY = [
  "Consistency with applicable law.",
  "Consistency with this Constitution.",
  "Consistency with the Stankings Canons.",
  "Alignment with institutional purpose.",
  "Long-term institutional impact.",
  "Trust implications.",
  "Human impact.",
  "Financial sustainability.",
  "Operational feasibility.",
] as const;

export const DECISION_EVIDENCE_TYPES = [
  "Operational data.",
  "Financial analysis.",
  "Risk assessments.",
  "Engineering reviews.",
  "Legal advice.",
  "Customer research.",
  "Independent expertise.",
  "Institutional knowledge.",
] as const;

export const DECISION_RECORD_FIELDS = [
  "Decision identifier.",
  "Decision summary.",
  "Responsible authority.",
  "Evidence considered.",
  "Alternatives evaluated.",
  "Risks identified.",
  "Constitutional references.",
  "Canon references.",
  "Expected outcomes.",
  "Review schedule.",
  "Lessons learned following implementation.",
] as const;

export const LONG_TERM_DECISION_EFFECTS = [
  "Institutional continuity.",
  "Future generations.",
  "Public trust.",
  "Technology.",
  "People.",
  "Knowledge.",
  "Financial resilience.",
  "The wider ecosystem.",
] as const;

export const ARTICLE_VI = {
  id: ARTICLE_VI_ID,
  article: "Article VI",
  title: "Constitutional Decision-Making",
  canonRefs: [
    "CANON-002",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-007",
    "CANON-009",
    "CANON-010",
    "CANON-017",
    "CANON-020",
  ],
  sections: [
    {
      id: "section-6-01",
      number: "Section 6.01",
      title: "Principle of Constitutional Decision-Making",
      paragraphs: [
        "Every significant institutional decision shall be made in accordance with this Constitution, the Stankings Canons, applicable law and the delegated authority established by the governance framework.",
        "Decision-making shall be disciplined, evidence-based, transparent and accountable.",
      ],
    },
    {
      id: "section-6-02",
      number: "Section 6.02",
      title: "Constitutional Decision Hierarchy",
      paragraphs: [
        "Significant decisions shall ordinarily be evaluated in the following order:",
        "No decision shall be approved solely because it offers financial advantage if it materially conflicts with higher constitutional principles.",
      ],
      listItems: CONSTITUTIONAL_DECISION_HIERARCHY.map((item, i) => `${i + 1}. ${item}`),
    },
    {
      id: "section-6-03",
      number: "Section 6.03",
      title: "Evidence-Based Decision-Making",
      paragraphs: [
        "Material decisions shall be supported by appropriate evidence.",
        "Evidence may include:",
        "Where evidence is incomplete, uncertainty shall be acknowledged and managed responsibly.",
      ],
      listItems: [...DECISION_EVIDENCE_TYPES],
    },
    {
      id: "section-6-04",
      number: "Section 6.04",
      title: "Documentation of Decisions",
      paragraphs: [
        "Every material decision shall be documented within the Institutional Decision Register.",
        "The record should ordinarily include:",
        "Decision records form part of the permanent institutional memory.",
      ],
      listItems: [...DECISION_RECORD_FIELDS],
    },
    {
      id: "section-6-05",
      number: "Section 6.05",
      title: "Collegial Deliberation",
      paragraphs: [
        "Major institutional decisions should benefit from appropriate consultation.",
        "Respectful disagreement is encouraged.",
        "Constructive challenge strengthens institutional judgment.",
        "The objective of deliberation is not consensus at all costs but better decisions.",
        "Authority remains accountable for the final decision.",
      ],
    },
    {
      id: "section-6-06",
      number: "Section 6.06",
      title: "Long-Term Consideration",
      paragraphs: [
        "Every material decision shall consider its likely effects upon:",
        "Short-term benefit shall not justify foreseeable long-term harm.",
      ],
      listItems: [...LONG_TERM_DECISION_EFFECTS],
    },
    {
      id: "section-6-07",
      number: "Section 6.07",
      title: "Constitutional Review",
      paragraphs: [
        "Where a proposed decision raises significant constitutional uncertainty, it shall be referred for constitutional review before implementation.",
        "The review shall identify:",
        "The purpose of constitutional review is to strengthen decision quality rather than delay responsible action.",
      ],
      listItems: [
        "Relevant Articles.",
        "Relevant Canons.",
        "Governance implications.",
        "Potential constitutional conflicts.",
        "Recommended course of action.",
      ],
    },
    {
      id: "section-6-08",
      number: "Section 6.08",
      title: "Continuous Learning",
      paragraphs: [
        "Following implementation of significant decisions, outcomes shall be reviewed.",
        "The institution shall preserve:",
        "Decision-making improves through disciplined reflection.",
      ],
      listItems: [
        "Successes.",
        "Unexpected consequences.",
        "Lessons learned.",
        "Recommended improvements.",
      ],
    },
    {
      id: "section-6-09",
      number: "Section 6.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of disciplined judgment, institutional learning, transparency and long-term stewardship.",
        "The quality of institutional decisions shall remain one of the principal measures of constitutional maturity.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_VI_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_VI);
