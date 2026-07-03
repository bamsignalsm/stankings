/**
 * Volume I — Article VII
 * Institutional Assets & Their Stewardship
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_VII_ID = "article-vii" as const;

export const INSTITUTIONAL_ASSET_CATEGORIES = [
  "Financial capital.",
  "Physical property.",
  "Technology platforms.",
  "Software.",
  "Data.",
  "Intellectual property.",
  "The Stankings Library.",
  "The Constitution.",
  "The Stankings Canons.",
  "Institutional knowledge.",
  "Professional relationships.",
  "Brand identity.",
  "Public trust.",
  "Institutional reputation.",
  "Operational processes.",
  "Artificial intelligence systems.",
  "Research.",
  "Historical records.",
  "Future governance frameworks established under this Constitution.",
] as const;

export const ASSET_PROTECTION_THREATS = [
  "Negligence.",
  "Fraud.",
  "Unauthorized use.",
  "Corruption.",
  "Misappropriation.",
  "Cybersecurity threats.",
  "Knowledge loss.",
  "Reputational damage.",
  "Unnecessary waste.",
] as const;

export const DIGITAL_ASSET_TYPES = [
  "Digital identity systems.",
  "Verification platforms.",
  "Artificial intelligence models.",
  "Software source code.",
  "Infrastructure.",
  "Security credentials.",
  "Digital records.",
  "Application programming interfaces.",
  "Trust infrastructure.",
] as const;

export const INSTITUTIONAL_PRESERVATION_SYSTEMS = [
  "Archiving.",
  "Version control.",
  "Knowledge preservation.",
  "Disaster recovery.",
  "Business continuity.",
  "Cyber resilience.",
  "Historical preservation.",
  "Institutional memory.",
] as const;

export const ANNUAL_ASSET_STEWARDSHIP_REVIEW_CRITERIA = [
  "Financial health.",
  "Technology health.",
  "Knowledge preservation.",
  "Brand reputation.",
  "Public trust.",
  "Cybersecurity posture.",
  "Legal protections.",
  "Succession readiness.",
] as const;

export const ARTICLE_VII = {
  id: ARTICLE_VII_ID,
  article: "Article VII",
  title: "Institutional Assets & Their Stewardship",
  canonRefs: [
    "CANON-002",
    "CANON-006",
    "CANON-007",
    "CANON-014",
    "CANON-019",
    "CANON-021",
    "CANON-025",
  ],
  sections: [
    {
      id: "section-7-01",
      number: "Section 7.01",
      title: "Principle of Institutional Assets",
      paragraphs: [
        "The assets of Stankings Group extend beyond financial and physical property.",
        "Institutional assets include tangible and intangible resources that enable the institution to fulfil its constitutional purpose.",
        "Every custodian shall protect these assets with diligence, integrity and long-term responsibility.",
      ],
    },
    {
      id: "section-7-02",
      number: "Section 7.02",
      title: "Categories of Institutional Assets",
      paragraphs: [
        "Institutional assets include, but are not limited to:",
        "These assets collectively constitute the institutional capital of Stankings Group.",
      ],
      listItems: [...INSTITUTIONAL_ASSET_CATEGORIES],
    },
    {
      id: "section-7-03",
      number: "Section 7.03",
      title: "Duty of Protection",
      paragraphs: [
        "Every custodian shall exercise reasonable care to protect institutional assets from:",
        "Protection shall include appropriate governance, security, documentation and continual improvement.",
      ],
      listItems: [...ASSET_PROTECTION_THREATS],
    },
    {
      id: "section-7-04",
      number: "Section 7.04",
      title: "Duty of Responsible Use",
      paragraphs: [
        "Institutional assets shall be used solely to advance the constitutional purpose of the Group.",
        "Assets shall not be employed primarily for personal benefit or in a manner inconsistent with this Constitution.",
        "Responsible use requires prudence, transparency and accountability.",
      ],
    },
    {
      id: "section-7-05",
      number: "Section 7.05",
      title: "Knowledge and Trust as Constitutional Assets",
      paragraphs: [
        "Knowledge and public trust are declared constitutional assets.",
        "Their preservation shall receive governance attention comparable to financial stewardship.",
        "Decisions that materially affect institutional trust or knowledge shall receive appropriate constitutional review.",
        "Loss of trust shall be regarded as a material institutional event requiring investigation and corrective action.",
      ],
    },
    {
      id: "section-7-06",
      number: "Section 7.06",
      title: "Digital Assets",
      paragraphs: [
        "Digital assets shall be governed responsibly.",
        "These include:",
        "Digital assets shall remain secure, documented and recoverable.",
        "Appropriate continuity planning shall be maintained.",
      ],
      listItems: [...DIGITAL_ASSET_TYPES],
    },
    {
      id: "section-7-07",
      number: "Section 7.07",
      title: "Institutional Preservation",
      paragraphs: [
        "The Group shall maintain appropriate systems for:",
        "Preservation supports constitutional continuity across generations.",
      ],
      listItems: [...INSTITUTIONAL_PRESERVATION_SYSTEMS],
    },
    {
      id: "section-7-08",
      number: "Section 7.08",
      title: "Annual Asset Stewardship Review",
      paragraphs: [
        "The Board shall oversee an annual review of significant institutional assets.",
        "The review should consider:",
        "Recommendations shall be preserved within the Stankings Library.",
      ],
      listItems: [...ANNUAL_ASSET_STEWARDSHIP_REVIEW_CRITERIA],
    },
    {
      id: "section-7-09",
      number: "Section 7.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "This Article shall be interpreted broadly in favour of preserving institutional capability, constitutional continuity and responsible stewardship.",
        "Assets exist to strengthen the institution rather than to serve individual interests.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_VII_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_VII);
