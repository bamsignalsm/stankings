/**
 * Volume I — Article XII
 * Information, Privacy & Digital Trust
 * Part IV — Constitutional Integrity
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_XII_ID = "article-xii" as const;

export const TRUST_NETWORK_COMPONENTS = [
  "Digital identity.",
  "Verification status.",
  "Reputation systems.",
  "The YIKE Passport.",
  "Trust Graph services.",
  "Fraud prevention systems.",
  "Risk intelligence.",
  "Consent management.",
] as const;

export const TRUST_NETWORK_PRINCIPLES = [
  "User transparency.",
  "Purpose limitation.",
  "Appropriate governance.",
  "Security.",
  "Accountability.",
  "Respect for individual rights.",
] as const;

export const DATA_GOVERNANCE_DOMAINS = [
  "Data quality.",
  "Security.",
  "Retention.",
  "Archiving.",
  "Access.",
  "Sharing.",
  "Recovery.",
  "Deletion.",
  "Auditability.",
] as const;

export const ARTICLE_XII = {
  id: ARTICLE_XII_ID,
  article: "Article XII",
  title: "Information, Privacy & Digital Trust",
  canonRefs: [
    "CANON-002",
    "CANON-007",
    "CANON-010",
    "CANON-012",
    "CANON-013",
    "CANON-021",
  ],
  sections: [
    {
      id: "section-12-01",
      number: "Section 12.01",
      title: "Principle of Digital Trust",
      paragraphs: [
        "Information entrusted to Stankings Group shall be governed with integrity, responsibility and respect.",
        "Digital trust shall be regarded as a constitutional obligation.",
        "Every institution shall protect information in a manner consistent with this Constitution, applicable law and the legitimate expectations of those it serves.",
      ],
    },
    {
      id: "section-12-02",
      number: "Section 12.02",
      title: "Respect for Personal Information",
      paragraphs: [
        "Individuals retain dignity and legitimate privacy interests in their personal information.",
        "The Group shall collect, use, retain and disclose personal information only for lawful, legitimate and clearly defined institutional purposes.",
        "Information shall not be collected merely because it is technically possible to do so.",
      ],
    },
    {
      id: "section-12-03",
      number: "Section 12.03",
      title: "Purpose Limitation",
      paragraphs: [
        "Information collected for one legitimate purpose shall not be used for materially different purposes without an appropriate lawful basis, governance approval or the informed participation of the individual where required.",
        "Institutional convenience shall never replace responsible information governance.",
      ],
    },
    {
      id: "section-12-04",
      number: "Section 12.04",
      title: "Identity and Verification",
      paragraphs: [
        "The Group may establish trusted identity and verification systems that strengthen confidence across the institutional ecosystem.",
        "Identity verification shall be conducted responsibly, securely and in accordance with applicable law.",
        "Verification shall exist to reduce fraud, strengthen trust and protect legitimate users.",
      ],
    },
    {
      id: "section-12-05",
      number: "Section 12.05",
      title: "The Stankings Trust Network",
      paragraphs: [
        "The Group may maintain shared trust infrastructure to strengthen cooperation among its institutions.",
        "Such infrastructure may include:",
        "Shared trust infrastructure shall operate according to the principles of user transparency, purpose limitation, appropriate governance, security, accountability and respect for individual rights.",
        "Participation in shared trust services shall occur only where lawful, appropriately governed and, where required, based upon the individual's informed participation.",
      ],
      listItems: [...TRUST_NETWORK_COMPONENTS],
    },
    {
      id: "section-12-06",
      number: "Section 12.06",
      title: "Artificial Intelligence",
      paragraphs: [
        "Artificial intelligence shall be developed and deployed responsibly.",
        "AI systems shall support human judgment rather than replace constitutional accountability.",
        "Significant institutional decisions shall remain subject to appropriate human oversight.",
        "AI shall be designed to strengthen trust, fairness, security and institutional capability.",
      ],
    },
    {
      id: "section-12-07",
      number: "Section 12.07",
      title: "Cybersecurity",
      paragraphs: [
        "Every institution shall maintain appropriate measures to protect information systems and digital infrastructure.",
        "Cybersecurity shall be regarded as a constitutional responsibility rather than merely a technical function.",
        "The Board shall receive periodic reports regarding cybersecurity posture and institutional resilience.",
      ],
    },
    {
      id: "section-12-08",
      number: "Section 12.08",
      title: "Data Governance",
      paragraphs: [
        "The Group shall establish governance frameworks governing:",
        "Cross-institutional data governance shall preserve both operational efficiency and constitutional trust.",
      ],
      listItems: [...DATA_GOVERNANCE_DOMAINS],
    },
    {
      id: "section-12-09",
      number: "Section 12.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted in favour of protecting human dignity, institutional trust, responsible innovation and the secure stewardship of information.",
        "Digital capability shall never justify irresponsible use of information.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_XII_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_XII);
