/**
 * Volume I — Article VIII
 * Ownership, Custody & Constitutional Responsibility
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_VIII_ID = "article-viii" as const;

export const CONSTITUTIONAL_OWNER_DUTIES = [
  "Protect the constitutional purpose.",
  "Preserve institutional continuity.",
  "Strengthen institutional capability.",
  "Safeguard public trust.",
  "Support responsible succession.",
  "Encourage long-term stewardship.",
] as const;

export const GENERATIONAL_STEWARDSHIP_PRINCIPLES = [
  "Every generation shall receive the institution with gratitude.",
  "Strengthen it through faithful stewardship.",
  "Prepare those who will follow.",
  "Pass it forward with honour.",
] as const;

export const ARTICLE_VIII = {
  id: ARTICLE_VIII_ID,
  article: "Article VIII",
  title: "Ownership, Custody & Constitutional Responsibility",
  canonRefs: [
    "CANON-004",
    "CANON-006",
    "CANON-007",
    "CANON-016",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-8-01",
      number: "Section 8.01",
      title: "Constitutional Principle",
      paragraphs: [
        "Ownership within Stankings Group exists to preserve the institution rather than to diminish it.",
        "Those who lawfully hold ownership interests shall exercise their rights with the understanding that they are custodians of an institution intended to endure across generations.",
        "Ownership carries enduring responsibilities alongside legal rights.",
      ],
    },
    {
      id: "section-8-02",
      number: "Section 8.02",
      title: "Separation of Ownership and Governance",
      paragraphs: [
        "Ownership does not automatically confer executive authority.",
        "Governance responsibilities shall be exercised through the constitutional structures established by this Constitution.",
        "Appointments to leadership positions shall be based upon constitutional standards, competence, integrity and stewardship responsibilities rather than ownership status alone.",
      ],
    },
    {
      id: "section-8-03",
      number: "Section 8.03",
      title: "Constitutional Duty of Owners",
      paragraphs: [
        "Those entrusted with constitutional ownership responsibilities shall seek to:",
        "Ownership shall never be exercised in a manner that knowingly undermines the institution's enduring purpose.",
      ],
      listItems: [...CONSTITUTIONAL_OWNER_DUTIES],
    },
    {
      id: "section-8-04",
      number: "Section 8.04",
      title: "Constitutional Protection of Institutional Continuity",
      paragraphs: [
        "Significant constitutional decisions affecting the long-term continuity, identity or purpose of Stankings Group shall receive enhanced governance review in accordance with this Constitution and applicable law.",
        "The institution shall maintain governance mechanisms designed to preserve its constitutional identity across generations.",
      ],
    },
    {
      id: "section-8-05",
      number: "Section 8.05",
      title: "Constitutional Independence of Institutions",
      paragraphs: [
        "Each operating institution within the Group shall remain accountable to the constitutional governance framework.",
        "No institution shall materially depart from the constitutional purpose, Stankings Canons or approved governance standards without constitutional review.",
        "Institutional independence shall exist within constitutional alignment.",
      ],
    },
    {
      id: "section-8-06",
      number: "Section 8.06",
      title: "Long-Term Stewardship",
      paragraphs: [
        ...GENERATIONAL_STEWARDSHIP_PRINCIPLES,
        "The institution shall never be regarded merely as an asset to be consumed.",
        "It shall be regarded as a responsibility to be preserved.",
      ],
    },
    {
      id: "section-8-07",
      number: "Section 8.07",
      title: "Relationship to Applicable Law",
      paragraphs: [
        "The legal ownership structure of Stankings Group, including any trusts, holding entities or other lawful arrangements, shall be established and governed in accordance with applicable law.",
        "This Constitution establishes the enduring constitutional principles that such arrangements are intended to support.",
        "Nothing in this Constitution shall replace, supersede or conflict with legally binding governance instruments required under applicable law.",
      ],
    },
    {
      id: "section-8-08",
      number: "Section 8.08",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of institutional continuity, responsible stewardship and long-term preservation.",
        "Where lawful alternatives exist, preference should ordinarily be given to those that strengthen the institution's ability to fulfil its constitutional purpose across generations.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_VIII_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_VIII);
