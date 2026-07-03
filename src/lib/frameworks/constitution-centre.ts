/**
 * Constitution Centre — FRAMEWORK-CCR-001
 * Derived from Constitution Article XV
 * Executive Decision No. 43 — Constitution Register
 */

import {
  AMENDMENT_PRESERVATION_FIELDS,
  AMENDMENT_PROPOSAL_REQUIREMENTS,
  AMENDMENT_REVIEW_PROCESS,
  INTERPRETATION_PRINCIPLES,
  PRESERVED_CONSTITUTIONAL_DOCUMENTS,
} from "@/lib/constitution/articles/article-xv";

export const CCR_FRAMEWORK = {
  identifier: "FRAMEWORK-CCR-001",
  title: "Constitution Centre",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XV",
    "CONSTITUTION-ARTICLE-XIV",
    "CONSTITUTION-ARTICLE-XIII",
    "CANON-006",
    "CANON-007",
    "CANON-016",
    "CANON-020",
    "CANON-021",
    "CANON-023",
    "CANON-025",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-GRF-001",
    "FRAMEWORK-SLP-001",
    "constitution-schedules",
    "LS-001",
  ],
} as const;

export const CCR_PURPOSE = `Stable principles. Responsible evolution.

The Constitution Centre is the authoritative register of constitutional text, amendment history, interpretations, schedules, and ratification — nothing erased, everything traceable.`;

export const AMENDMENT_WORKSPACE_FIELDS = [
  "Amendment ID",
  "Sponsor",
  "Articles Affected",
  "Existing Text",
  "Proposed Text",
  "Constitutional Analysis",
  "Trust Impact Assessment",
  "Governance Review",
  "Legal Review",
  "Board Decision",
  "Effective Date",
  "Version History",
] as const;

export const CONSTITUTION_REGISTER_DOMAINS = [
  "Current Constitution",
  "Amendment History",
  "Constitutional Reviews",
  "Constitutional Commentaries",
  "Official Interpretations",
  "Constitutional Schedules",
  "Ratification Records",
  "Cross References to the Stankings Canons",
] as const;

export const CCR_BODY = `${CCR_PURPOSE}

## Amendment Proposal Requirements (Art. XV § 15.02)

${AMENDMENT_PROPOSAL_REQUIREMENTS.map((r) => `- ${r}`).join("\n")}

## Constitutional Review Process (Art. XV § 15.03)

${AMENDMENT_REVIEW_PROCESS.map((r) => `- ${r}`).join("\n")}

## Amendment Preservation (Art. XV § 15.04)

${AMENDMENT_PRESERVATION_FIELDS.map((f) => `- ${f}`).join("\n")}

## Amendment Workspace Fields

${AMENDMENT_WORKSPACE_FIELDS.map((f) => `- ${f}`).join("\n")}

## Interpretation Principles (Art. XV § 15.06)

${INTERPRETATION_PRINCIPLES.map((p) => `- ${p}`).join("\n")}

## Preserved Documents (Art. XV § 15.08)

${PRESERVED_CONSTITUTIONAL_DOCUMENTS.map((d) => `- ${d}`).join("\n")}

## Constitution Register (ED 43)

${CONSTITUTION_REGISTER_DOMAINS.map((d) => `- ${d}`).join("\n")}

The Register shall serve as the authoritative constitutional record of Stankings Group.`;
