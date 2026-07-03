/**
 * Volume I — Article XVI
 * The Custodian Programme & Leadership Development
 * Part V — Constitutional Continuity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XVI_ID = "article-xvi" as const;

export const CUSTODIAN_PROGRAMME_PURPOSES = [
  "The Constitution.",
  "The Stankings Canons.",
  "Responsible governance.",
  "Institutional ethics.",
  "Professional excellence.",
  "Long-term stewardship.",
] as const;

export const LEADERSHIP_STUDY_DOMAINS = [
  "Institutional history.",
  "Governance.",
  "Leadership.",
  "Technology.",
  "Artificial intelligence.",
  "Finance.",
  "Law.",
  "Risk.",
  "Strategy.",
  "Negotiation.",
  "Public communication.",
  "Systems thinking.",
  "Ethics.",
  "Innovation.",
] as const;

export const MENTORSHIP_OUTCOMES = [
  "Professional growth.",
  "Sound judgment.",
  "Ethical reasoning.",
  "Institutional understanding.",
  "Personal discipline.",
  "Responsible decision-making.",
] as const;

export const LEADERSHIP_EVALUATION_CRITERIA = [
  "Competence.",
  "Character.",
  "Judgment.",
  "Learning.",
  "Stewardship.",
  "Constitutional understanding.",
  "Collaboration.",
  "Institutional contribution.",
] as const;

export const ARTICLE_XVI = {
  id: ARTICLE_XVI_ID,
  article: "Article XVI",
  title: "The Custodian Programme & Leadership Development",
  canonRefs: [
    "CANON-004",
    "CANON-006",
    "CANON-009",
    "CANON-019",
    "CANON-020",
    "CANON-023",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-16-01",
      number: "Section 16.01",
      title: "Principle of Leadership Continuity",
      paragraphs: [
        "The long-term strength of Stankings Group depends upon the continual development of capable custodians.",
        "Leadership continuity shall be achieved through deliberate education, practical experience, mentorship and disciplined stewardship rather than chance.",
        "The institution shall invest continually in preparing future leaders.",
      ],
    },
    {
      id: "section-16-02",
      number: "Section 16.02",
      title: "The Custodian Programme",
      paragraphs: [
        "The Group shall maintain The Custodian Programme as its principal leadership development framework.",
        "The Programme shall prepare present and future leaders to steward the institution faithfully in accordance with the Constitution, the Stankings Canons, responsible governance, institutional ethics, professional excellence and long-term stewardship.",
        "The detailed structure, curriculum and operating standards of the Programme shall be maintained separately by The Stankings Institute and approved through the Group's governance framework.",
      ],
    },
    {
      id: "section-16-03",
      number: "Section 16.03",
      title: "Leadership Development",
      paragraphs: [
        "Leadership development shall be regarded as a permanent constitutional responsibility.",
        "Every executive, senior leader and institutional steward shall contribute to identifying, mentoring and developing future leaders.",
        "Leadership shall be measured partly by the strength of those prepared to succeed.",
      ],
    },
    {
      id: "section-16-04",
      number: "Section 16.04",
      title: "Selection of Future Leaders",
      paragraphs: [
        "Appointments to significant leadership positions shall be based upon demonstrated competence, integrity, stewardship, constitutional fidelity and readiness for responsibility.",
        "Selection shall be conducted through disciplined governance processes consistent with this Constitution and applicable law.",
        "No individual shall be appointed solely by reason of family relationship, tenure, popularity or personal loyalty.",
      ],
    },
    {
      id: "section-16-05",
      number: "Section 16.05",
      title: "Institutional Learning",
      paragraphs: [
        "Participants in leadership development programmes shall receive opportunities to study:",
        "The objective is to prepare leaders capable of stewarding complex institutions across generations.",
      ],
      listItems: [...LEADERSHIP_STUDY_DOMAINS],
    },
    {
      id: "section-16-06",
      number: "Section 16.06",
      title: "Mentorship",
      paragraphs: [
        "Every participant in The Custodian Programme should receive structured mentorship from experienced leaders.",
        "Mentorship shall encourage professional growth, sound judgment, ethical reasoning, institutional understanding, personal discipline and responsible decision-making.",
        "Mentorship strengthens constitutional continuity.",
      ],
    },
    {
      id: "section-16-07",
      number: "Section 16.07",
      title: "Evaluation",
      paragraphs: [
        "Leadership development programmes shall include appropriate evaluation of:",
        "Evaluation shall support development rather than merely ranking participants.",
      ],
      listItems: [...LEADERSHIP_EVALUATION_CRITERIA],
    },
    {
      id: "section-16-08",
      number: "Section 16.08",
      title: "Relationship with The Stankings Institute",
      paragraphs: [
        "The Stankings Institute shall serve as the principal centre for leadership education, institutional research and custodian development.",
        "The Institute shall preserve and advance the constitutional philosophy of Stankings Group while continually improving its educational methods.",
      ],
    },
    {
      id: "section-16-09",
      number: "Section 16.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of long-term leadership continuity, responsible stewardship and the continual development of capable custodians.",
        "Every generation bears responsibility for preparing the generation that follows.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XVI_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XVI);
