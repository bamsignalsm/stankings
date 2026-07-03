/**
 * Volume I — Article X
 * The Lifecycle of Institutions
 * Adopted Version 1.0 (Revised)
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_X_ID = "article-x" as const;

export const INSTITUTIONAL_INNOVATION_SOURCES = [
  "The Board of Directors.",
  "Executive Leadership.",
  "Operating Institutions.",
  "Employees.",
  "Members of the Stankings Family.",
  "Approved research programmes.",
  "Strategic partners.",
  "Universities and educational institutions.",
  "Innovation initiatives established by the Group.",
  "Other appropriate contributors approved through governance processes.",
] as const;

export const CONSTITUTIONAL_INNOVATION_REVIEW_CRITERIA = [
  "Alignment with the Constitution.",
  "Alignment with the Stankings Canons.",
  "Purpose and mission alignment.",
  "Institutional necessity.",
  "Customer value.",
  "Trust implications.",
  "Human impact.",
  "Financial sustainability.",
  "Technical feasibility.",
  "Operational capability.",
  "Legal and regulatory considerations.",
  "Contribution to the institutional ecosystem.",
  "Long-term societal value.",
  "Institutional strength.",
  "Generational relevance.",
] as const;

export const INSTITUTIONAL_DEVELOPMENT_PATHWAY = [
  "Idea.",
  "Research.",
  "Problem Validation.",
  "Concept Development.",
  "Constitutional Review.",
  "Strategic Approval.",
  "Prototype or Pilot.",
  "Institution Formation.",
  "Launch.",
  "Growth.",
  "Maturity.",
  "Renewal.",
  "Transformation.",
  "Responsible Conclusion, where appropriate.",
] as const;

export const INSTITUTIONAL_CHARTER_FIELDS = [
  "Institutional purpose.",
  "Mission.",
  "Strategic role.",
  "Governance arrangements.",
  "Shared platform dependencies.",
  "Measures of success.",
  "Constitutional responsibilities.",
] as const;

export const INSTITUTIONAL_INCUBATION_SUPPORT = [
  "Research support.",
  "Professional mentorship.",
  "Technical assistance.",
  "Shared institutional platforms.",
  "Prototype development.",
  "Market validation.",
  "Operational guidance.",
  "Appropriate funding or investment.",
] as const;

export const PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA = [
  "Purpose alignment.",
  "Customer value.",
  "Trust.",
  "Financial health.",
  "Governance maturity.",
  "Technology maturity.",
  "Knowledge contribution.",
  "Long-term sustainability.",
  "Ecosystem contribution.",
] as const;

export const RESPONSIBLE_CONCLUSION_FACTORS = [
  "Customers.",
  "Employees.",
  "Partners.",
  "Knowledge preservation.",
  "Historical records.",
  "Technology continuity.",
  "Financial responsibilities.",
  "Reputation.",
] as const;

export const ARTICLE_X = {
  id: ARTICLE_X_ID,
  article: "Article X",
  title: "The Lifecycle of Institutions",
  canonRefs: [
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-009",
    "CANON-013",
    "CANON-018",
    "CANON-021",
    "CANON-022",
  ],
  sections: [
    {
      id: "section-10-01",
      number: "Section 10.01",
      title: "Principle of Institutional Life",
      paragraphs: [
        "Institutions within Stankings Group shall be established, developed, governed, strengthened and, where appropriate, responsibly concluded in accordance with this Constitution.",
        "No institution shall exist without a clearly defined constitutional purpose.",
        "Institutional existence shall always be justified by enduring contribution rather than mere continuation.",
      ],
    },
    {
      id: "section-10-02",
      number: "Section 10.02",
      title: "Sources of Institutional Innovation",
      paragraphs: [
        "Stankings Group recognizes that meaningful institutional innovation may originate from many sources.",
        "Ideas that strengthen the constitutional purpose of the Group may be proposed by:",
        "The value of an idea shall be determined by its constitutional alignment, evidence, merit and potential contribution rather than by the identity of its originator.",
      ],
      listItems: [...INSTITUTIONAL_INNOVATION_SOURCES],
    },
    {
      id: "section-10-03",
      number: "Section 10.03",
      title: "Constitutional Innovation Review",
      paragraphs: [
        "Every proposal for a new institution, major platform, transformative product or strategically significant initiative shall undergo Constitutional Innovation Review.",
        "The review shall ordinarily consider:",
        "The review shall be evidence-based, transparent and appropriately documented.",
      ],
      listItems: [...CONSTITUTIONAL_INNOVATION_REVIEW_CRITERIA],
    },
    {
      id: "section-10-04",
      number: "Section 10.04",
      title: "Institutional Development Pathway",
      paragraphs: [
        "Every approved institutional proposal shall ordinarily progress through the following pathway:",
        "The Board may adapt this pathway where circumstances reasonably require, provided constitutional principles remain protected.",
      ],
      listItems: [...INSTITUTIONAL_DEVELOPMENT_PATHWAY],
    },
    {
      id: "section-10-05",
      number: "Section 10.05",
      title: "Institutional Charter",
      paragraphs: [
        "Every institution shall possess an Institutional Charter approved by the Board.",
        "The Charter shall define:",
        "The Charter shall remain consistent with this Constitution.",
      ],
      listItems: [...INSTITUTIONAL_CHARTER_FIELDS],
    },
    {
      id: "section-10-06",
      number: "Section 10.06",
      title: "Institutional Incubation",
      paragraphs: [
        "The Group may establish institutional mechanisms for the incubation, mentorship, evaluation and responsible development of promising ideas.",
        "Such mechanisms may provide:",
        "Participation in such programmes shall not create an entitlement to institutional funding or the establishment of a new institution.",
        "Support shall be determined through constitutional governance processes and available resources.",
      ],
      listItems: [...INSTITUTIONAL_INCUBATION_SUPPORT],
    },
    {
      id: "section-10-07",
      number: "Section 10.07",
      title: "Periodic Constitutional Review",
      paragraphs: [
        "Every institution shall undergo periodic constitutional review.",
        "The review shall evaluate:",
        "Recommendations shall be preserved within the Stankings Library.",
      ],
      listItems: [...PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA],
    },
    {
      id: "section-10-08",
      number: "Section 10.08",
      title: "Renewal and Transformation",
      paragraphs: [
        "Institutions shall remain open to responsible renewal.",
        "Products may evolve.",
        "Technologies may change.",
        "Business models may mature.",
        "Institutional purpose shall remain stable unless amended through constitutional governance.",
        "Transformation shall strengthen rather than diminish constitutional identity.",
      ],
    },
    {
      id: "section-10-09",
      number: "Section 10.09",
      title: "Responsible Conclusion",
      paragraphs: [
        "Where an institution can no longer responsibly fulfil its constitutional purpose, the Board may determine that it should be concluded, merged or otherwise restructured in accordance with applicable law.",
        "Such decisions shall consider:",
        "The objective shall be orderly stewardship rather than abrupt abandonment.",
      ],
      listItems: [...RESPONSIBLE_CONCLUSION_FACTORS],
    },
    {
      id: "section-10-10",
      number: "Section 10.10",
      title: "Preservation of Institutional Knowledge",
      paragraphs: [
        "Where an institution concludes operations, its significant knowledge, historical records, technology, lessons learned and constitutional contributions shall be evaluated for preservation within the Stankings Library.",
        "Institutional knowledge shall survive institutional structures wherever practicable.",
      ],
    },
    {
      id: "section-10-11",
      number: "Section 10.11",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of responsible institutional evolution, constitutional continuity and disciplined stewardship.",
        "Institutions exist to serve enduring purpose rather than temporary commercial opportunity.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_X_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_X);
