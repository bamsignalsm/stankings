/**
 * Volume I — Article XIII
 * Knowledge, Learning & Institutional Memory
 * Part IV — Constitutional Integrity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XIII_ID = "article-xiii" as const;

export const LIBRARY_PRESERVATION_ITEMS = [
  "The Stankings Canons.",
  "The Constitution.",
  "Governance records.",
  "Engineering standards.",
  "Knowledge Objects.",
  "Institutional decisions.",
  "Research.",
  "Historical milestones.",
  "Lessons learned.",
  "Stewardship reports.",
  "Training materials.",
  "Innovation records.",
] as const;

export const KNOWLEDGE_CONTRIBUTION_TYPES = [
  "Research.",
  "Engineering standards.",
  "Case studies.",
  "Teaching.",
  "Mentorship.",
  "Publications.",
  "Training programmes.",
  "Operational improvements.",
  "Innovation documentation.",
  "Lessons learned.",
] as const;

export const KNOWLEDGE_REVIEW_CRITERIA = [
  "Documentation maturity.",
  "Knowledge preservation.",
  "Training effectiveness.",
  "Research output.",
  "Innovation records.",
  "Library growth.",
  "Succession readiness.",
  "Knowledge sharing across institutions.",
] as const;

export const ARTICLE_XIII = {
  id: ARTICLE_XIII_ID,
  article: "Article XIII",
  title: "Knowledge, Learning & Institutional Memory",
  canonRefs: [
    "CANON-006",
    "CANON-009",
    "CANON-019",
    "CANON-020",
    "CANON-021",
    "CANON-022",
    "CANON-023",
  ],
  sections: [
    {
      id: "section-13-01",
      number: "Section 13.01",
      title: "Principle of Institutional Knowledge",
      paragraphs: [
        "Knowledge created, acquired or entrusted to Stankings Group shall be regarded as a constitutional asset.",
        "The institution shall preserve, organize, improve and responsibly share knowledge in support of its constitutional purpose.",
        "Institutional learning shall be continuous.",
      ],
    },
    {
      id: "section-13-02",
      number: "Section 13.02",
      title: "The Stankings Library",
      paragraphs: [
        "The Group shall maintain The Stankings Library as the permanent repository of its constitutional, strategic, operational, technical and historical knowledge.",
        "The Library shall preserve, among other things:",
        "The Library shall constitute the institutional memory of Stankings Group.",
      ],
      listItems: [...LIBRARY_PRESERVATION_ITEMS],
    },
    {
      id: "section-13-03",
      number: "Section 13.03",
      title: "Duty to Preserve Knowledge",
      paragraphs: [
        "Every institution and every constitutional office holder shall contribute to preserving institutional knowledge.",
        "Material knowledge shall be documented in a manner that enables future custodians to understand not only what was done, but why it was done.",
        "Institutional memory shall not depend upon the recollection of individuals.",
      ],
    },
    {
      id: "section-13-04",
      number: "Section 13.04",
      title: "Learning as a Constitutional Duty",
      paragraphs: [
        "Every institution shall encourage continual learning.",
        "Every leader shall develop people.",
        "Every employee shall be encouraged to strengthen professional capability.",
        "Every custodian shall remain a student throughout their stewardship.",
        "Learning strengthens constitutional continuity.",
      ],
    },
    {
      id: "section-13-05",
      number: "Section 13.05",
      title: "Knowledge Contribution",
      paragraphs: [
        "Knowledge creation shall be recognized as an institutional contribution.",
        "Contributions may include:",
        "Knowledge contributed to the institution shall become part of its enduring capability.",
      ],
      listItems: [...KNOWLEDGE_CONTRIBUTION_TYPES],
    },
    {
      id: "section-13-06",
      number: "Section 13.06",
      title: "Knowledge Accessibility",
      paragraphs: [
        "Institutional knowledge shall be organized according to appropriate governance classifications.",
        "Knowledge should be accessible to those with legitimate responsibilities, protected where confidentiality is required, searchable, version controlled, properly attributed and preserved across generations.",
        "The objective is to maximize responsible institutional learning while protecting sensitive information.",
      ],
    },
    {
      id: "section-13-07",
      number: "Section 13.07",
      title: "Constitutional Review of Knowledge",
      paragraphs: [
        "The Board shall periodically review the health of the Group's institutional knowledge.",
        "The review shall consider:",
        "Recommendations shall become part of the permanent governance record.",
      ],
      listItems: [...KNOWLEDGE_REVIEW_CRITERIA],
    },
    {
      id: "section-13-08",
      number: "Section 13.08",
      title: "Relationship with The Stankings Institute",
      paragraphs: [
        "The Stankings Institute shall support the development, teaching and advancement of institutional knowledge throughout the Group.",
        "The Institute shall encourage leadership development, research, professional education and stewardship learning in alignment with this Constitution.",
      ],
    },
    {
      id: "section-13-09",
      number: "Section 13.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of preserving institutional memory, encouraging continual learning and strengthening the capability of future generations.",
        "Knowledge shall be treated as an enduring institutional asset.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XIII_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XIII);
