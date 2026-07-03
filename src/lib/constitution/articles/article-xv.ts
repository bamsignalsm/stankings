/**
 * Volume I — Article XV
 * Constitutional Amendment, Preservation & Continuity
 * Part V — Constitutional Continuity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XV_ID = "article-xv" as const;

export const AMENDMENT_PROPOSAL_REQUIREMENTS = [
  "The existing provision.",
  "The proposed amendment.",
  "The reasons for the amendment.",
  "The constitutional principles affected.",
  "The anticipated institutional impact.",
  "Alternative approaches considered.",
] as const;

export const AMENDMENT_REVIEW_PROCESS = [
  "Constitutional analysis.",
  "Governance review.",
  "Legal review where appropriate.",
  "Strategic assessment.",
  "Trust Impact Assessment.",
  "Long-term stewardship assessment.",
] as const;

export const AMENDMENT_PRESERVATION_FIELDS = [
  "The original wording.",
  "The revised wording.",
  "Version number.",
  "Date of adoption.",
  "Reason for amendment.",
  "Approving authority.",
  "Cross references.",
  "Historical commentary where appropriate.",
] as const;

export const INTERPRETATION_PRINCIPLES = [
  "The Stankings Canons.",
  "The constitutional purpose.",
  "Responsible stewardship.",
  "Institutional continuity.",
  "Applicable law.",
  "Long-term institutional strength.",
] as const;

export const PRESERVED_CONSTITUTIONAL_DOCUMENTS = [
  "The Constitution.",
  "Previous versions.",
  "Related governance instruments.",
  "The Stankings Canons.",
  "Constitutional commentaries.",
  "Ratification records.",
  "Historical annotations.",
] as const;

export const ARTICLE_XV = {
  id: ARTICLE_XV_ID,
  article: "Article XV",
  title: "Constitutional Amendment, Preservation & Continuity",
  canonRefs: [
    "CANON-006",
    "CANON-007",
    "CANON-016",
    "CANON-020",
    "CANON-021",
    "CANON-023",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-15-01",
      number: "Section 15.01",
      title: "Principle of Constitutional Stability",
      paragraphs: [
        "This Constitution is intended to provide enduring guidance across generations.",
        "It shall remain sufficiently stable to preserve institutional identity while remaining sufficiently adaptable to respond responsibly to changing circumstances.",
        "Neither rigidity nor frequent alteration serves the long-term interests of the institution.",
      ],
    },
    {
      id: "section-15-02",
      number: "Section 15.02",
      title: "Constitutional Amendments",
      paragraphs: [
        "Amendments to this Constitution shall be undertaken only after careful consideration and documented constitutional review.",
        "Every proposed amendment shall clearly state:",
        "Amendments shall strengthen rather than weaken the constitutional integrity of the institution.",
      ],
      listItems: [...AMENDMENT_PROPOSAL_REQUIREMENTS],
    },
    {
      id: "section-15-03",
      number: "Section 15.03",
      title: "Constitutional Review Process",
      paragraphs: [
        "Before adoption, every proposed amendment shall undergo:",
        "Recommendations arising from the review shall be preserved within The Stankings Library.",
      ],
      listItems: [...AMENDMENT_REVIEW_PROCESS],
    },
    {
      id: "section-15-04",
      number: "Section 15.04",
      title: "Preservation of Constitutional History",
      paragraphs: [
        "The Constitution shall maintain a permanent history of its evolution.",
        "Every amendment shall preserve:",
        "The constitutional history shall never be erased.",
      ],
      listItems: [...AMENDMENT_PRESERVATION_FIELDS],
    },
    {
      id: "section-15-05",
      number: "Section 15.05",
      title: "Periodic Constitutional Review",
      paragraphs: [
        "The Board shall periodically review the Constitution to determine whether amendments are necessary.",
        "The purpose of review is to ensure continued relevance while preserving constitutional continuity.",
        "The absence of amendments shall not be regarded as institutional failure.",
        "The necessity for frequent amendments shall prompt reflection on constitutional quality.",
      ],
    },
    {
      id: "section-15-06",
      number: "Section 15.06",
      title: "Constitutional Interpretation",
      paragraphs: [
        "Questions concerning the interpretation of this Constitution shall be resolved consistently with the Stankings Canons, the constitutional purpose, responsible stewardship, institutional continuity, applicable law and long-term institutional strength.",
        "Interpretations should favour coherence rather than isolated reading of individual provisions.",
      ],
    },
    {
      id: "section-15-07",
      number: "Section 15.07",
      title: "Relationship to Constitutional Schedules",
      paragraphs: [
        "Schedules adopted under this Constitution form part of the constitutional governance framework.",
        "Schedules may be updated through the governance procedures established for them, provided such updates remain consistent with this Constitution.",
        "Operational detail should ordinarily reside within Schedules rather than constitutional text.",
      ],
    },
    {
      id: "section-15-08",
      number: "Section 15.08",
      title: "Constitutional Preservation",
      paragraphs: [
        "The Group shall preserve authenticated copies of:",
        "These documents shall remain part of the permanent institutional memory.",
      ],
      listItems: [...PRESERVED_CONSTITUTIONAL_DOCUMENTS],
    },
    {
      id: "section-15-09",
      number: "Section 15.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of constitutional continuity, responsible evolution and faithful stewardship.",
        "Every generation shall inherit a Constitution that is both respected and responsibly maintained.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XV_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XV);
