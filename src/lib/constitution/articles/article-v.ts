/**
 * Volume I — Article V
 * Constitutional Standards for Leadership
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_V_ID = "article-v" as const;

export const CONSTITUTIONAL_LEADERSHIP_STANDARDS = [
  "Integrity.",
  "Competence.",
  "Professional discipline.",
  "Sound judgment.",
  "Respect for human dignity.",
  "Commitment to institutional learning.",
  "Faithfulness to the Constitution.",
  "Commitment to the Stankings Canons.",
  "Long-term stewardship.",
] as const;

export const LEADERSHIP_EVALUATION_CRITERIA = [
  "Purpose alignment.",
  "Institutional trust.",
  "Strategic execution.",
  "People development.",
  "Knowledge contribution.",
  "Governance maturity.",
  "Financial stewardship.",
  "Innovation.",
  "Customer confidence.",
  "Long-term institutional strength.",
] as const;

export const ARTICLE_V = {
  id: ARTICLE_V_ID,
  article: "Article V",
  title: "Constitutional Standards for Leadership",
  canonRefs: [
    "CANON-004",
    "CANON-007",
    "CANON-010",
    "CANON-019",
    "CANON-020",
    "CANON-023",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-5-01",
      number: "Section 5.01",
      title: "Leadership as Constitutional Stewardship",
      paragraphs: [
        "Every leadership office within Stankings Group exists for the purpose of stewardship.",
        "Leadership shall be exercised in service of the institution and its constitutional purpose.",
        "No office shall exist for personal prestige, privilege or enrichment.",
        "Authority shall always be accompanied by responsibility and accountability.",
      ],
    },
    {
      id: "section-5-02",
      number: "Section 5.02",
      title: "Constitutional Standards",
      paragraphs: [
        "Every individual entrusted with significant leadership responsibilities shall demonstrate:",
        "These standards shall guide appointment, evaluation and succession.",
      ],
      listItems: [...CONSTITUTIONAL_LEADERSHIP_STANDARDS],
    },
    {
      id: "section-5-03",
      number: "Section 5.03",
      title: "Fiduciary Responsibility",
      paragraphs: [
        "Every leader owes a fiduciary duty to act in the best interests of the institution, consistent with applicable law.",
        "Leadership shall protect institutional assets, avoid conflicts of interest, exercise prudent judgment and act honestly in all institutional affairs.",
        "Personal interests shall not improperly influence institutional decisions.",
      ],
    },
    {
      id: "section-5-04",
      number: "Section 5.04",
      title: "Duty of Competence",
      paragraphs: [
        "Leadership requires continual development.",
        "Every leader shall maintain professional knowledge appropriate to their responsibilities.",
        "Where expertise is insufficient, leaders shall seek appropriate advice rather than rely upon assumption.",
        "Competence is an ongoing obligation.",
      ],
    },
    {
      id: "section-5-05",
      number: "Section 5.05",
      title: "Duty of Integrity",
      paragraphs: [
        "Integrity shall govern every exercise of authority.",
        "Leaders shall communicate truthfully.",
        "Manage responsibly.",
        "Declare conflicts of interest.",
        "Protect confidential information.",
        "Respect lawful obligations.",
        "Exercise institutional resources responsibly.",
        "Integrity shall remain non-negotiable.",
      ],
    },
    {
      id: "section-5-06",
      number: "Section 5.06",
      title: "Duty to Develop Successors",
      paragraphs: [
        "Every leader shall contribute to identifying, mentoring and developing future leaders.",
        "Leadership shall never become dependent upon a single individual.",
        "The strength of leadership shall be measured partly by the capability of those prepared to succeed it.",
      ],
    },
    {
      id: "section-5-07",
      number: "Section 5.07",
      title: "Constitutional Accountability",
      paragraphs: [
        "Leaders shall remain accountable for decisions taken within their authority.",
        "Accountability includes:",
        "Accountability strengthens institutional legitimacy.",
      ],
      listItems: [
        "Transparent reporting.",
        "Stewardship reviews.",
        "Knowledge preservation.",
        "Institutional learning.",
        "Corrective action where appropriate.",
      ],
    },
    {
      id: "section-5-09",
      number: "Section 5.09",
      title: "Duty to Encourage Innovation",
      paragraphs: [
        "Every leader shall encourage thoughtful innovation within the institution.",
        "Leaders shall create environments in which responsible ideas may be proposed, evaluated and developed without fear of unnecessary dismissal.",
        "Leadership shall recognize that enduring institutions remain relevant by continually learning, improving and responsibly innovating.",
      ],
    },
    {
      id: "section-5-10",
      number: "Section 5.10",
      title: "Leadership Evaluation",
      paragraphs: [
        "Leadership performance shall be evaluated using both quantitative and qualitative measures, including:",
        "Evaluation shall extend beyond short-term financial outcomes.",
      ],
      listItems: [...LEADERSHIP_EVALUATION_CRITERIA],
    },
    {
      id: "section-5-11",
      number: "Section 5.11",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of responsible stewardship, institutional integrity, competence and long-term leadership continuity.",
        "Leadership authority exists only insofar as it faithfully serves the Constitution.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_V_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_V);
