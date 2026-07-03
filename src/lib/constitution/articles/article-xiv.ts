/**
 * Volume I — Article XIV
 * Constitutional Review, Institutional Health & Continual Improvement
 * Part IV — Constitutional Integrity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XIV_ID = "article-xiv" as const;

export const INSTITUTIONAL_HEALTH_DIMENSIONS = [
  "Purpose alignment.",
  "Trust.",
  "Leadership.",
  "Governance.",
  "Financial sustainability.",
  "Innovation.",
  "Knowledge maturity.",
  "Technology resilience.",
  "Cybersecurity.",
  "People development.",
  "Customer confidence.",
  "Operational excellence.",
  "Institutional culture.",
  "Risk management.",
  "Societal contribution.",
  "Long-term resilience.",
] as const;

export const CONSTITUTIONAL_MATURITY_DOMAINS = [
  "The Constitution.",
  "The Stankings Canons.",
  "Governance standards.",
  "Knowledge management.",
  "Decision quality.",
  "Stewardship.",
  "Innovation.",
  "Institutional learning.",
] as const;

export const REVIEW_RECOMMENDATION_CATEGORIES = [
  "Strengths.",
  "Weaknesses.",
  "Emerging risks.",
  "Improvement priorities.",
  "Knowledge gaps.",
  "Leadership opportunities.",
  "Implementation responsibilities.",
] as const;

export const ARTICLE_XIV = {
  id: ARTICLE_XIV_ID,
  article: "Article XIV",
  title: "Constitutional Review, Institutional Health & Continual Improvement",
  canonRefs: [
    "CANON-006",
    "CANON-007",
    "CANON-009",
    "CANON-015",
    "CANON-019",
    "CANON-020",
    "CANON-022",
    "CANON-023",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-14-01",
      number: "Section 14.01",
      title: "Principle of Continual Improvement",
      paragraphs: [
        "Stankings Group shall continually examine, evaluate and strengthen its institutions.",
        "Improvement shall be disciplined, evidence-based and consistent with the Constitution.",
        "The objective is not change for its own sake, but the responsible advancement of institutional capability.",
      ],
    },
    {
      id: "section-14-02",
      number: "Section 14.02",
      title: "Constitutional Health Reviews",
      paragraphs: [
        "The Board shall periodically conduct Constitutional Health Reviews.",
        "These reviews shall assess whether the Group continues to fulfil its constitutional purpose and steward its responsibilities faithfully.",
        "The review shall extend beyond financial performance.",
      ],
    },
    {
      id: "section-14-03",
      number: "Section 14.03",
      title: "Institutional Health Dimensions",
      paragraphs: [
        "Constitutional Health Reviews should ordinarily evaluate:",
        "No single metric shall determine institutional health.",
      ],
      listItems: [...INSTITUTIONAL_HEALTH_DIMENSIONS],
    },
    {
      id: "section-14-04",
      number: "Section 14.04",
      title: "Constitutional Maturity",
      paragraphs: [
        "The Group shall maintain a Constitutional Maturity Framework.",
        "The Framework shall evaluate the degree to which institutions consistently apply the Constitution, the Stankings Canons, governance standards, knowledge management, decision quality, stewardship, innovation and institutional learning.",
        "The purpose of maturity assessment is improvement rather than punishment.",
      ],
    },
    {
      id: "section-14-05",
      number: "Section 14.05",
      title: "Recommendations & Improvement Plans",
      paragraphs: [
        "Every Constitutional Health Review shall produce documented recommendations.",
        "Recommendations shall identify strengths, weaknesses, emerging risks, improvement priorities, knowledge gaps, leadership opportunities and implementation responsibilities.",
        "Progress shall be reviewed periodically.",
      ],
    },
    {
      id: "section-14-06",
      number: "Section 14.06",
      title: "Institutional Learning",
      paragraphs: [
        "Lessons identified through reviews shall become Knowledge Objects within The Stankings Library.",
        "The institution shall ensure that improvements arising from review are preserved for future generations.",
        "Mistakes shall become institutional learning rather than institutional repetition.",
      ],
    },
    {
      id: "section-14-07",
      number: "Section 14.07",
      title: "Independent Review",
      paragraphs: [
        "The Board may commission independent reviews of governance, strategy, technology, cybersecurity, ethics, finance or other significant institutional capabilities where such reviews strengthen constitutional stewardship.",
        "Independent review strengthens institutional confidence.",
      ],
    },
    {
      id: "section-14-08",
      number: "Section 14.08",
      title: "Continuous Constitutional Improvement",
      paragraphs: [
        "The Constitution encourages continual improvement of governance practices, operating standards, engineering methods and institutional capability.",
        "Such improvements shall remain faithful to the enduring principles established by this Constitution and the Stankings Canons.",
      ],
    },
    {
      id: "section-14-09",
      number: "Section 14.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of institutional learning, disciplined self-examination and continual improvement.",
        "Healthy institutions improve before circumstances compel them to do so.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XIV_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XIV);
