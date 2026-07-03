/**
 * Volume I — Article III
 * Stewardship, Continuity & Generational Responsibility
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_III_ID = "article-iii" as const;

export const ARTICLE_III = {
  id: ARTICLE_III_ID,
  article: "Article III",
  title: "Stewardship, Continuity & Generational Responsibility",
  canonRefs: [
    "CANON-004",
    "CANON-006",
    "CANON-009",
    "CANON-019",
    "CANON-021",
    "CANON-022",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-3-01",
      number: "Section 3.01",
      title: "Principle of Stewardship",
      paragraphs: [
        "Stankings Group shall be governed according to the principle of stewardship.",
        "Every individual entrusted with authority within the institution acts as a steward rather than an owner of that authority.",
        "Authority shall be exercised for the long-term benefit of the institution, its stakeholders and future generations.",
      ],
    },
    {
      id: "section-3-02",
      number: "Section 3.02",
      title: "Institutional Continuity",
      paragraphs: [
        "The institution is intended to continue beyond the service of any individual, Board, executive, generation or technological era.",
        "No leadership transition shall interrupt the constitutional identity, institutional purpose or enduring principles of Stankings Group.",
        "Continuity shall be preserved through governance, documentation, succession planning and institutional knowledge.",
      ],
    },
    {
      id: "section-3-03",
      number: "Section 3.03",
      title: "Duty to Future Generations",
      paragraphs: [
        "Every custodian owes a duty not only to present stakeholders but also to future generations.",
        "Significant decisions shall therefore consider:",
        "The institution shall not knowingly transfer avoidable burdens to future generations.",
      ],
      listItems: [
        "Long-term institutional health.",
        "Institutional resilience.",
        "Knowledge preservation.",
        "Financial sustainability.",
        "Technological adaptability.",
        "Public trust.",
      ],
    },
    {
      id: "section-3-04",
      number: "Section 3.04",
      title: "Duty to Preserve Institutional Assets",
      paragraphs: [
        "Institutional assets include, but are not limited to:",
        "Every custodian shall protect these assets with diligence and integrity.",
      ],
      listItems: [
        "Institutional reputation.",
        "Public trust.",
        "The Constitution.",
        "The Stankings Canons.",
        "Institutional knowledge.",
        "Technology platforms.",
        "Financial resources.",
        "Professional relationships.",
        "Brand identity.",
        "Intellectual property.",
      ],
      listStyle: "grid",
    },
    {
      id: "section-3-05",
      number: "Section 3.05",
      title: "Succession as a Constitutional Duty",
      paragraphs: [
        "Succession planning shall constitute a permanent constitutional responsibility.",
        "Every significant leadership position shall maintain documented succession plans, knowledge transfer processes and leadership development pathways.",
        "Leadership continuity shall never depend upon a single individual.",
        "The institution shall continually identify, develop and prepare future custodians through disciplined education, mentorship and practical experience.",
      ],
    },
    {
      id: "section-3-06",
      number: "Section 3.06",
      title: "Institutional Memory",
      paragraphs: [
        "The Group shall preserve its institutional memory through the Stankings Library.",
        "Important decisions, lessons learned, constitutional amendments, governance records, engineering standards and historical milestones shall be documented and maintained as institutional knowledge.",
        "Institutional memory shall remain accessible to future custodians in accordance with applicable governance and security policies.",
      ],
    },
    {
      id: "section-3-07",
      number: "Section 3.07",
      title: "Constitutional Responsibility of Every Institution",
      paragraphs: [
        "Every institution operating within Stankings Group shall demonstrate responsible stewardship of:",
        "Stewardship responsibilities shall be evaluated regularly through governance reviews.",
      ],
      listItems: [
        "Its people.",
        "Its resources.",
        "Its knowledge.",
        "Its technology.",
        "Its customers.",
        "Its reputation.",
        "Its contribution to the wider ecosystem.",
      ],
    },
    {
      id: "section-3-08",
      number: "Section 3.08",
      title: "Stewardship Review",
      paragraphs: [
        "The Board shall periodically evaluate whether the Group continues to demonstrate faithful stewardship of its constitutional responsibilities.",
        "The review shall consider:",
        "Recommendations arising from the review shall be preserved within the Stankings Library.",
      ],
      listItems: [
        "Institutional trust.",
        "Purpose alignment.",
        "Governance maturity.",
        "Knowledge preservation.",
        "Leadership development.",
        "Long-term resilience.",
        "Societal contribution.",
      ],
    },
    {
      id: "section-3-09",
      number: "Section 3.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of institutional continuity, responsible stewardship and generational responsibility.",
        "Where uncertainty exists, the interpretation that most faithfully preserves the institution for future generations shall ordinarily be preferred.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_III_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_III);

export const INSTITUTIONAL_ASSETS = ARTICLE_III.sections.find(
  (s) => s.id === "section-3-04",
)!.listItems!;

export const STEWARDSHIP_REVIEW_CRITERIA = ARTICLE_III.sections.find(
  (s) => s.id === "section-3-08",
)!.listItems!;
