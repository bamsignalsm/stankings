/**
 * Institutional Ecosystem Portal — FRAMEWORK-IEP-001
 * Derived from Constitution Article IX
 * Executive Decision No. 37 — Institutional Ecosystem Register
 */

import {
  ECOSYSTEM_COLLABORATION_EXAMPLES,
  ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA,
  INSTITUTION_ADMISSION_CRITERIA,
  SHARED_INSTITUTIONAL_PRINCIPLES,
  SHARED_PLATFORM_CATEGORIES,
} from "@/lib/constitution/articles/article-ix";

export const IEP_FRAMEWORK = {
  identifier: "FRAMEWORK-IEP-001",
  title: "Institutional Ecosystem Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-IX",
    "CONSTITUTION-ARTICLE-I",
    "CONSTITUTION-ARTICLE-II",
    "CANON-001",
    "CANON-002",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-011",
    "CANON-012",
    "CANON-016",
    "FRAMEWORK-IIS-001",
    "FRAMEWORK-EIA-001",
    "FRAMEWORK-CAE-001",
    "ecosystem-map",
  ],
} as const;

export const IEP_PURPOSE = `Stankings Group is an ecosystem of enduring institutions — not a holding company of separate businesses.

The Institutional Ecosystem Portal makes architecture explorable: constitutional purpose, shared platforms, trust dependencies, and relationships that multiply capability across the Group.`;

export const INSTITUTIONAL_PROFILE_FIELDS = [
  "Institution Name",
  "Constitutional Purpose",
  "Strategic Role",
  "Primary Customers",
  "Core Capabilities",
  "Shared Platforms Used",
  "Trust Dependencies",
  "AI Services Used",
  "APIs Consumed",
  "APIs Exposed",
  "Knowledge Objects",
  "Constitution Articles",
  "Canon References",
  "Ecosystem Relationships",
] as const;

export const IER_REGISTER_FIELDS = [
  "Constitutional purpose",
  "Governance status",
  "Strategic role",
  "Shared platforms utilized",
  "Shared capabilities provided",
  "Ecosystem dependencies",
  "Constitutional relationships",
] as const;

export const IEP_BODY = `${IEP_PURPOSE}

## Institutional Profile Fields

${INSTITUTIONAL_PROFILE_FIELDS.map((f) => `- ${f}`).join("\n")}

## Shared Institutional Principles (Art. IX § 9.03)

${SHARED_INSTITUTIONAL_PRINCIPLES.map((p) => `- ${p}`).join("\n")}

## Shared Platform Categories (Art. IX § 9.04)

${SHARED_PLATFORM_CATEGORIES.map((p) => `- ${p}`).join("\n")}

## Collaboration Examples (Art. IX § 9.05)

${ECOSYSTEM_COLLABORATION_EXAMPLES.map((c) => `- ${c}`).join("\n")}

## Admission Criteria (Art. IX § 9.06)

${INSTITUTION_ADMISSION_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Institutional Ecosystem Register (ED 37)

${IER_REGISTER_FIELDS.map((f) => `- ${f}`).join("\n")}

## Ecosystem Stewardship Review (Art. IX § 9.08)

${ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

The Register shall be reviewed annually to ensure the ecosystem remains coherent, complementary and aligned with the Constitution.`;
