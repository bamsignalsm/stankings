/**
 * Volume I — Article XVII
 * Constitutional Ratification, Oath & Commitment
 * Part V — Constitutional Continuity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XVII_ID = "article-xvii" as const;

export const CONSTITUTIONAL_COMMITMENTS = [
  "The Constitution.",
  "The Stankings Canons.",
  "The principles of stewardship.",
  "The duty of integrity.",
  "The obligation to strengthen the institution for future generations.",
] as const;

export const CONSTITUTIONAL_OATH_AFFIRMATION = [
  "I accept the responsibility entrusted to me as a steward of Stankings Group.",
  "I will discharge my duties faithfully, honestly and responsibly.",
  "I will uphold the Constitution, respect the Stankings Canons and act in the long-term interests of the institution.",
  "I will protect its trust, preserve its knowledge, develop its people and strengthen it for those who will come after me.",
  "I accept that my authority exists to serve the institution and not myself.",
  "I undertake this responsibility with integrity, humility and stewardship.",
] as const;

export const CONSTITUTIONAL_EDUCATION_TOPICS = [
  "The Constitution.",
  "The Stankings Canons.",
  "Governance responsibilities.",
  "Institutional ethics.",
  "Stewardship.",
] as const;

export const CONSTITUTION_EDITION_TYPES = [
  "Printed editions.",
  "Digitally authenticated editions.",
  "Annotated editions.",
  "Educational editions.",
  "Training editions.",
  "Historical editions.",
  "Official translations where appropriate.",
] as const;

export const ARTICLE_XVII = {
  id: ARTICLE_XVII_ID,
  article: "Article XVII",
  title: "Constitutional Ratification, Oath & Commitment",
  canonRefs: [
    "CANON-004",
    "CANON-006",
    "CANON-007",
    "CANON-020",
    "CANON-023",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-17-01",
      number: "Section 17.01",
      title: "Constitutional Ratification",
      paragraphs: [
        "This Constitution shall become the supreme internal governance document of Stankings Group upon its formal adoption through the governance process established by the Group and in accordance with applicable law.",
        "Upon ratification, every governance instrument adopted thereafter shall be interpreted consistently with this Constitution.",
      ],
    },
    {
      id: "section-17-02",
      number: "Section 17.02",
      title: "Constitutional Commitment",
      paragraphs: [
        "Every individual accepting significant governance responsibility within Stankings Group accepts a corresponding responsibility to uphold:",
        "Leadership is therefore accepted as a constitutional commitment rather than merely an appointment.",
      ],
      listItems: [...CONSTITUTIONAL_COMMITMENTS],
    },
    {
      id: "section-17-03",
      number: "Section 17.03",
      title: "Constitutional Oath",
      paragraphs: [
        "Before assuming a constitutional office, directors, executive leaders and other designated constitutional office holders shall make an affirmation substantially in the following form:",
        "Alternative forms of affirmation consistent with applicable law or sincerely held personal beliefs may be adopted, provided they preserve the substance of this commitment.",
      ],
      blockquote: [...CONSTITUTIONAL_OATH_AFFIRMATION],
    },
    {
      id: "section-17-04",
      number: "Section 17.04",
      title: "Constitutional Education",
      paragraphs: [
        "Every constitutional office holder shall receive appropriate education regarding:",
        "The objective is understanding rather than ceremonial compliance.",
      ],
      listItems: [...CONSTITUTIONAL_EDUCATION_TOPICS],
    },
    {
      id: "section-17-05",
      number: "Section 17.05",
      title: "Constitutional Accessibility",
      paragraphs: [
        "The Constitution shall be maintained in forms appropriate to its users.",
        "Authoritative versions may include:",
        "The Constitution shall remain accessible while preserving its authenticity.",
      ],
      listItems: [...CONSTITUTION_EDITION_TYPES],
    },
    {
      id: "section-17-06",
      number: "Section 17.06",
      title: "Constitutional Legacy",
      paragraphs: [
        "Every generation shall receive this Constitution not as a finished monument but as a living framework for responsible stewardship.",
        "Future custodians shall preserve its principles, improve its implementation and strengthen the institution entrusted to their care.",
        "The Constitution exists to unite generations in a common commitment to enduring institutional excellence.",
      ],
    },
    {
      id: "section-17-07",
      number: "Section 17.07",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of faithful stewardship, constitutional continuity and the enduring responsibility of every generation to preserve and strengthen Stankings Group.",
        "The Constitution belongs not to one generation alone but to all who faithfully steward the institution across time.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XVII_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XVII);
