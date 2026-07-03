/**
 * Volume I — Article IX
 * The Institutional Ecosystem
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_IX_ID = "article-ix" as const;

export const SHARED_INSTITUTIONAL_PRINCIPLES = [
  "Service.",
  "Trust.",
  "Stewardship.",
  "Professional excellence.",
  "Responsible innovation.",
  "Institutional learning.",
  "Human dignity.",
  "Long-term thinking.",
  "Constitutional governance.",
] as const;

export const SHARED_PLATFORM_CATEGORIES = [
  "Identity and verification services.",
  "Trust infrastructure.",
  "Artificial intelligence.",
  "Knowledge management.",
  "Financial infrastructure.",
  "Technology platforms.",
  "Cybersecurity.",
  "Data governance.",
  "Legal services.",
  "Human resources.",
  "Procurement.",
  "Communications.",
] as const;

export const ECOSYSTEM_COLLABORATION_EXAMPLES = [
  "Shared verification.",
  "Shared trust systems.",
  "Shared payment infrastructure.",
  "Shared knowledge.",
  "Shared technology.",
  "Shared customer support where appropriate.",
  "Joint innovation.",
  "Professional collaboration.",
] as const;

export const INSTITUTION_ADMISSION_CRITERIA = [
  "Constitutional alignment.",
  "Strategic necessity.",
  "Institutional purpose.",
  "Governance readiness.",
  "Operational capability.",
  "Long-term sustainability.",
  "Contribution to the ecosystem.",
] as const;

export const ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA = [
  "Institutional alignment.",
  "Platform maturity.",
  "Shared capabilities.",
  "Customer experience.",
  "Technology integration.",
  "Trust infrastructure.",
  "Knowledge sharing.",
  "Financial resilience.",
  "Strategic coherence.",
] as const;

export const ARTICLE_IX = {
  id: ARTICLE_IX_ID,
  article: "Article IX",
  title: "The Institutional Ecosystem",
  canonRefs: [
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-011",
    "CANON-012",
    "CANON-016",
  ],
  sections: [
    {
      id: "section-9-01",
      number: "Section 9.01",
      title: "Principle of the Institutional Ecosystem",
      paragraphs: [
        "Stankings Group shall be organized as an ecosystem of enduring institutions.",
        "Each institution shall possess a distinct constitutional purpose while contributing to the shared mission of the Group.",
        "The strength of the ecosystem shall exceed the sum of its individual institutions.",
      ],
    },
    {
      id: "section-9-02",
      number: "Section 9.02",
      title: "Constitutional Identity of Institutions",
      paragraphs: [
        "Every institution admitted into Stankings Group shall possess:",
        "Institutions shall complement rather than unnecessarily duplicate one another.",
      ],
      listItems: [
        "A clearly defined constitutional purpose.",
        "Distinct institutional responsibilities.",
        "Documented governance arrangements.",
        "Alignment with the Constitution.",
        "Alignment with the Stankings Canons.",
        "Alignment with the long-term strategy of the Group.",
      ],
    },
    {
      id: "section-9-03",
      number: "Section 9.03",
      title: "Shared Institutional Principles",
      paragraphs: [
        "All institutions operating within the Group shall uphold:",
        "While operational methods may differ, constitutional principles shall remain common across the ecosystem.",
      ],
      listItems: [...SHARED_INSTITUTIONAL_PRINCIPLES],
    },
    {
      id: "section-9-04",
      number: "Section 9.04",
      title: "Shared Platforms",
      paragraphs: [
        "The Group may establish shared institutional platforms supporting multiple institutions.",
        "These may include:",
        "Shared platforms shall strengthen institutional capability while respecting operational independence.",
      ],
      listItems: [...SHARED_PLATFORM_CATEGORIES],
    },
    {
      id: "section-9-05",
      number: "Section 9.05",
      title: "Collaboration",
      paragraphs: [
        "Institutions shall cooperate where doing so strengthens customers, the ecosystem and society.",
        "Examples include:",
        "Collaboration shall never compromise lawful governance, security, confidentiality or customer trust.",
      ],
      listItems: [...ECOSYSTEM_COLLABORATION_EXAMPLES],
    },
    {
      id: "section-9-06",
      number: "Section 9.06",
      title: "Admission of New Institutions",
      paragraphs: [
        "New institutions may join the Group only after demonstrating:",
        "Admission shall require constitutional governance approval.",
      ],
      listItems: [...INSTITUTION_ADMISSION_CRITERIA],
    },
    {
      id: "section-9-07",
      number: "Section 9.07",
      title: "Institutional Independence",
      paragraphs: [
        "Each institution shall retain appropriate operational autonomy within its approved mandate.",
        "Operational independence shall not permit constitutional inconsistency.",
        "Every institution remains accountable to the governance framework of Stankings Group.",
      ],
    },
    {
      id: "section-9-08",
      number: "Section 9.08",
      title: "Ecosystem Stewardship",
      paragraphs: [
        "The Board shall periodically review the health of the ecosystem.",
        "The review shall consider:",
        "The objective is continual strengthening of the ecosystem as a whole.",
      ],
      listItems: [...ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA],
    },
    {
      id: "section-9-09",
      number: "Section 9.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of ecosystem coherence, institutional specialization, responsible collaboration and long-term constitutional alignment.",
        "The ecosystem exists to multiply institutional capability rather than merely aggregate companies.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_IX_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_IX);
