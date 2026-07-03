/**
 * Volume I — Article I
 * The Identity of the Institution
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_I_ID = "article-i" as const;

export const ARTICLE_I = {
  id: ARTICLE_I_ID,
  article: "Article I",
  title: "The Identity of the Institution",
  canonRefs: ["CANON-001", "CANON-003", "CANON-005", "CANON-006", "CANON-007", "CANON-023", "CANON-024", "CANON-025"],
  sections: [
    {
      id: "section-1-01",
      number: "Section 1.01",
      title: "Constitutional Identity",
      paragraphs: [
        "Stankings Group is a perpetual institutional enterprise established to build, steward and strengthen enduring institutions that serve society through responsible enterprise, innovation and governance.",
        "The Group exists as a long-term steward of institutional capital, knowledge, trust and opportunity.",
        "Its identity shall not depend upon any individual, generation or temporary commercial success.",
      ],
    },
    {
      id: "section-1-02",
      number: "Section 1.02",
      title: "Nature of the Institution",
      paragraphs: [
        "Stankings Group is an institutional ecosystem.",
        "It is not merely a holding company.",
        "It exists to develop, govern and strengthen a family of specialized institutions that cooperate through shared principles, shared platforms and shared stewardship while maintaining clear operational responsibilities.",
        "Each institution shall possess its own mission.",
        "All institutions shall remain aligned with the Constitution and the Stankings Canons.",
      ],
    },
    {
      id: "section-1-03",
      number: "Section 1.03",
      title: "Institutional Purpose",
      paragraphs: [
        "The enduring purpose of Stankings Group is:",
        "Commercial success shall sustain this purpose.",
        "It shall never replace it.",
      ],
      listItems: [
        "To build trusted institutions.",
        "To reduce unnecessary uncertainty.",
        "To increase confidence.",
        "To create lasting value.",
        "To strengthen society through responsible enterprise.",
      ],
    },
    {
      id: "section-1-04",
      number: "Section 1.04",
      title: "Institutional Character",
      paragraphs: [
        "The character of Stankings Group shall be defined by:",
        "These characteristics shall guide the interpretation of this Constitution.",
      ],
      listItems: [
        "Service.",
        "Trust.",
        "Purpose.",
        "Stewardship.",
        "Truth.",
        "Excellence.",
        "Learning.",
        "Human dignity.",
        "Institutional strength.",
        "Generational thinking.",
        "Responsible innovation.",
        "Professional discipline.",
      ],
    },
    {
      id: "section-1-05",
      number: "Section 1.05",
      title: "Constitutional Authority",
      paragraphs: [
        "This Constitution derives its philosophical foundation from the Stankings Canons.",
        "All governance documents, institutional policies, engineering standards, operating procedures and strategic frameworks shall remain consistent with this Constitution.",
        "Where internal conflicts arise, the Constitution shall prevail.",
        "Nothing in this Constitution shall authorize conduct contrary to applicable law.",
      ],
    },
    {
      id: "section-1-06",
      number: "Section 1.06",
      title: "Institutional Continuity",
      paragraphs: [
        "The institution is intended to endure across generations.",
        "Leadership shall change.",
        "Technologies shall change.",
        "Markets shall change.",
        "Methods shall evolve.",
        "The institution's enduring purpose and constitutional principles shall remain stable unless amended through the constitutional amendment process established herein.",
        "Continuity shall be achieved through responsible stewardship rather than dependence upon any individual.",
      ],
    },
    {
      id: "section-1-07",
      number: "Section 1.07",
      title: "Institutional Symbols",
      paragraphs: [
        "The Board may approve official institutional symbols, including but not limited to:",
        "Institutional symbols shall represent the values and identity of Stankings Group and shall be governed by standards approved under this Constitution.",
      ],
      listItems: [
        "The institutional seal.",
        "The constitutional motto.",
        "The official colours.",
        "The official mark.",
        "The constitutional flag (if adopted).",
      ],
    },
    {
      id: "section-1-08",
      number: "Section 1.08",
      title: "Interpretation",
      paragraphs: [
        "This Constitution shall be interpreted in a manner that:",
        "Where multiple interpretations are reasonably available, preference shall be given to the interpretation that best strengthens the institution over the long term.",
      ],
      listItems: [
        "Protects institutional trust.",
        "Preserves long-term stewardship.",
        "Strengthens institutional capability.",
        "Encourages responsible innovation.",
        "Promotes sound governance.",
        "Respects human dignity.",
        "Advances the enduring purpose of Stankings Group.",
      ],
    },
  ] as const satisfies ConstitutionalArticle["sections"],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_I_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_I);
