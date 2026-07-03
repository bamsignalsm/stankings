/**
 * Volume I — Article II
 * Purpose, Mission & Constitutional Objectives
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_II_ID = "article-ii" as const;

export const ARTICLE_II = {
  id: ARTICLE_II_ID,
  article: "Article II",
  title: "Purpose, Mission & Constitutional Objectives",
  canonRefs: [
    "CANON-001",
    "CANON-003",
    "CANON-006",
    "CANON-011",
    "CANON-017",
    "CANON-018",
    "CANON-022",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-2-01",
      number: "Section 2.01",
      title: "Constitutional Purpose",
      paragraphs: [
        "The constitutional purpose of Stankings Group is to establish, steward and strengthen enduring institutions that create lasting value for society through responsible enterprise, trusted systems and disciplined innovation.",
        "The Group exists to build institutions worthy of long-term public confidence.",
        "Commercial success shall sustain this purpose.",
        "It shall never replace it.",
      ],
    },
    {
      id: "section-2-02",
      number: "Section 2.02",
      title: "Constitutional Mission",
      paragraphs: [
        "The mission of Stankings Group is:",
        "To build trusted institutions that reduce unnecessary uncertainty, increase confidence and improve the lives of individuals, families, businesses and communities through responsible enterprise.",
        "Every institution established within the Group shall contribute meaningfully toward this mission.",
      ],
    },
    {
      id: "section-2-03",
      number: "Section 2.03",
      title: "Constitutional Vision",
      paragraphs: [
        "The long-term vision of Stankings Group is to become one of the world's most trusted institutional ecosystems, recognised for building organizations that endure across generations through principled governance, responsible innovation and faithful stewardship.",
        "The vision shall inspire continual improvement rather than institutional complacency.",
      ],
    },
    {
      id: "section-2-04",
      number: "Section 2.04",
      title: "Constitutional Objectives",
      paragraphs: ["The enduring objectives of Stankings Group shall include:"],
      listItems: [
        "To strengthen trust within every market in which the Group operates.",
        "To build institutions capable of responsible service across generations.",
        "To develop platforms that increase institutional capability.",
        "To preserve and expand institutional knowledge.",
        "To encourage responsible innovation.",
        "To develop capable leaders and future custodians.",
        "To contribute positively to economic and social development.",
        "To strengthen industries through higher professional standards.",
        "To create sustainable prosperity through ethical enterprise.",
        "To leave future generations with stronger institutions than those entrusted to the present generation.",
      ],
    },
    {
      id: "section-2-05",
      number: "Section 2.05",
      title: "Innovation as Stewardship",
      paragraphs: [
        "The Group recognizes responsible innovation as an essential expression of stewardship.",
        "Every generation shall be encouraged to contribute ideas, institutions, technologies and improvements that strengthen the constitutional purpose of Stankings Group.",
        "Innovation shall be pursued with discipline, constitutional alignment and long-term responsibility.",
      ],
    },
    {
      id: "section-2-06",
      number: "Section 2.06",
      title: "Strategic Direction",
      paragraphs: [
        "Strategic initiatives undertaken by the Group shall demonstrate alignment with the constitutional purpose, mission and objectives established herein.",
        "No institution, acquisition, partnership or strategic initiative shall materially conflict with these constitutional objectives.",
        "Where conflict exists, constitutional purpose shall prevail.",
      ],
    },
    {
      id: "section-2-07",
      number: "Section 2.07",
      title: "Institutional Alignment",
      paragraphs: [
        "Every institution operating within Stankings Group shall publish an Institutional Purpose Statement that demonstrates:",
        "Institutional alignment shall be reviewed periodically by the Board.",
      ],
      listItems: [
        "Alignment with this Constitution.",
        "Alignment with the Stankings Canons.",
        "Contribution to the wider institutional ecosystem.",
        "Distinct responsibilities that do not unnecessarily duplicate another institution's role.",
      ],
    },
    {
      id: "section-2-08",
      number: "Section 2.08",
      title: "Purpose Before Expansion",
      paragraphs: [
        "The Group shall expand only where expansion strengthens its constitutional purpose.",
        "Growth pursued without clear constitutional alignment shall not constitute institutional success.",
        "Expansion shall therefore be evaluated according to:",
      ],
      listItems: [
        "Purpose.",
        "Trust.",
        "Institutional strength.",
        "Long-term contribution.",
        "Ecosystem value.",
        "Generational stewardship.",
      ],
    },
    {
      id: "section-2-09",
      number: "Section 2.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "Where uncertainty exists regarding the interpretation of institutional objectives, preference shall be given to the interpretation that most faithfully advances:",
      ],
      listItems: [
        "The constitutional purpose.",
        "The Stankings Canons.",
        "Responsible stewardship.",
        "Long-term institutional resilience.",
        "Service to society.",
      ],
    },
  ] as const satisfies ConstitutionalArticle["sections"],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_II_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_II);

export const CONSTITUTIONAL_OBJECTIVES = ARTICLE_II.sections.find(
  (s) => s.id === "section-2-04",
)!.listItems!;

export const EXPANSION_CRITERIA = ARTICLE_II.sections.find(
  (s) => s.id === "section-2-08",
)!.listItems!;
