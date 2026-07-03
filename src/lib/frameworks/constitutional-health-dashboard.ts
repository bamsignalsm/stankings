/**
 * Constitutional Health Dashboard — FRAMEWORK-CHD-001
 * Derived from Constitution Article XIV
 * Executive Decision No. 42 — Annual Constitutional Stewardship Report
 */

import {
  CONSTITUTIONAL_MATURITY_DOMAINS,
  INSTITUTIONAL_HEALTH_DIMENSIONS,
  REVIEW_RECOMMENDATION_CATEGORIES,
} from "@/lib/constitution/articles/article-xiv";

export const CHD_FRAMEWORK = {
  identifier: "FRAMEWORK-CHD-001",
  title: "Constitutional Health Dashboard",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XIV",
    "CONSTITUTION-ARTICLE-XIII",
    "CONSTITUTION-ARTICLE-XI",
    "CANON-006",
    "CANON-007",
    "CANON-009",
    "CANON-015",
    "CANON-019",
    "CANON-020",
    "CANON-022",
    "CANON-023",
    "CANON-025",
    "FRAMEWORK-CMD-001",
    "FRAMEWORK-ASR-001",
    "FRAMEWORK-LEGACY-001",
    "FRAMEWORK-SLP-001",
  ],
} as const;

export const CMF_IDENTIFIER = "CMF-001";

export const CHD_PURPOSE = `Institutions often collapse years before financial statements reveal it.

The Constitutional Health Dashboard enables disciplined self-examination — measuring institutional health beyond profit, with evidence, trends, and improvement plans for every dimension.`;

export const STEWARDSHIP_REPORT_SECTIONS = [
  "Constitutional Health",
  "Progress toward institutional objectives",
  "Significant governance developments",
  "Stewardship of institutional assets",
  "Leadership development",
  "Innovation outcomes",
  "Knowledge growth",
  "Trust indicators",
  "Strategic risks",
  "Long-term priorities",
] as const;

export const CHD_BODY = `${CHD_PURPOSE}

## Institutional Health Dimensions (Art. XIV § 14.03)

${INSTITUTIONAL_HEALTH_DIMENSIONS.map((d) => `- ${d}`).join("\n")}

## Constitutional Maturity Framework (Art. XIV § 14.04)

${CONSTITUTIONAL_MATURITY_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Review Recommendation Categories (Art. XIV § 14.05)

${REVIEW_RECOMMENDATION_CATEGORIES.map((c) => `- ${c}`).join("\n")}

## Annual Constitutional Stewardship Report (ED 42)

${STEWARDSHIP_REPORT_SECTIONS.map((s) => `- ${s}`).join("\n")}

The purpose of the Report is to strengthen accountability, institutional learning and long-term stewardship.`;
