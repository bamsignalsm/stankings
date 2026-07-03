/**
 * Volume I — Article XI
 * Conflicts of Interest, Integrity & Constitutional Ethics
 * Part IV — Constitutional Integrity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XI_ID = "article-xi" as const;

export const RELATED_PARTY_REVIEW_CRITERIA = [
  "Fairness.",
  "Transparency.",
  "Commercial reasonableness.",
  "Proper authorization.",
  "Appropriate documentation.",
  "Compliance with applicable law.",
] as const;

export const ETHICAL_DECISION_FACTORS = [
  "The Constitution.",
  "The Stankings Canons.",
  "Applicable law.",
  "Institutional purpose.",
  "Public trust.",
  "Human dignity.",
  "Long-term consequences.",
] as const;

export const ARTICLE_XI = {
  id: ARTICLE_XI_ID,
  article: "Article XI",
  title: "Conflicts of Interest, Integrity & Constitutional Ethics",
  canonRefs: [
    "CANON-002",
    "CANON-004",
    "CANON-007",
    "CANON-010",
    "CANON-020",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-11-01",
      number: "Section 11.01",
      title: "Principle of Institutional Integrity",
      paragraphs: [
        "Institutional integrity shall remain fundamental to the constitutional identity of Stankings Group.",
        "Every custodian shall exercise authority honestly, fairly, independently and in the best interests of the institution.",
        "Integrity shall not depend upon supervision.",
        "It shall be a personal and constitutional obligation.",
      ],
    },
    {
      id: "section-11-02",
      number: "Section 11.02",
      title: "Duty of Loyalty",
      paragraphs: [
        "Every person exercising constitutional authority owes a duty of loyalty to the institution.",
        "Institutional interests shall take precedence over personal advantage when acting in an official capacity.",
        "Decisions shall be made honestly, impartially and in good faith.",
      ],
    },
    {
      id: "section-11-03",
      number: "Section 11.03",
      title: "Conflicts of Interest",
      paragraphs: [
        "Actual, potential and perceived conflicts of interest shall be declared promptly.",
        "Where a material conflict exists, the affected individual shall not participate in decision-making unless expressly permitted through established governance procedures.",
        "The objective is not merely to prevent misconduct.",
        "The objective is to preserve public confidence.",
      ],
    },
    {
      id: "section-11-04",
      number: "Section 11.04",
      title: "Related-Party Transactions",
      paragraphs: [
        "Transactions involving related parties shall receive enhanced governance review.",
        "Such transactions shall demonstrate:",
        "The existence of a family or professional relationship shall neither automatically approve nor automatically prohibit a transaction.",
        "Institutional interests shall remain paramount.",
      ],
      listItems: [...RELATED_PARTY_REVIEW_CRITERIA],
    },
    {
      id: "section-11-05",
      number: "Section 11.05",
      title: "Gifts, Benefits & Influence",
      paragraphs: [
        "Custodians shall not solicit or accept gifts, hospitality or benefits that could reasonably compromise, or appear to compromise, independent judgment.",
        "Reasonable ceremonial or customary hospitality may be accepted where consistent with governance policy and applicable law.",
        "Transparency shall guide all such matters.",
      ],
    },
    {
      id: "section-11-06",
      number: "Section 11.06",
      title: "Confidentiality",
      paragraphs: [
        "Confidential information entrusted to the institution shall be protected.",
        "Such information shall be used solely for legitimate institutional purposes.",
        "Confidentiality obligations shall continue beyond an individual's period of service where required by law, contract or institutional policy.",
      ],
    },
    {
      id: "section-11-07",
      number: "Section 11.07",
      title: "Reporting Concerns",
      paragraphs: [
        "The Group shall maintain safe and appropriate mechanisms through which concerns regarding ethics, integrity, misconduct or constitutional breaches may be reported.",
        "Reports made honestly and in good faith shall receive fair consideration.",
        "Retaliation against individuals making good-faith reports shall not be tolerated.",
      ],
    },
    {
      id: "section-11-08",
      number: "Section 11.08",
      title: "Ethical Decision-Making",
      paragraphs: [
        "Where ethical uncertainty exists, decision-makers shall consider:",
        "Ethical reasoning shall complement legal compliance.",
      ],
      listItems: [...ETHICAL_DECISION_FACTORS],
    },
    {
      id: "section-11-09",
      number: "Section 11.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of honesty, transparency, accountability and institutional trust.",
        "Integrity is essential to constitutional legitimacy.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XI_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XI);
