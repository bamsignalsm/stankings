/**
 * Stewardship Portal — FRAMEWORK-STEWARDSHIP-PORTAL-001
 * Derived from Constitution Article III
 * Executive Decision No. 31 — Annual Stewardship Declaration
 */

export const STEWARDSHIP_PORTAL_FRAMEWORK = {
  identifier: "FRAMEWORK-STEWARDSHIP-PORTAL-001",
  title: "Stewardship Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-III",
    "CANON-004",
    "CANON-006",
    "CANON-019",
    "CANON-021",
    "FRAMEWORK-LSF-001",
    "FRAMEWORK-ASR-001",
    "FRAMEWORK-GRF-001",
    "LEX-STEWARDSHIP",
    "LEX-CUSTODIAN",
  ],
} as const;

export const STEWARDSHIP_PORTAL_PURPOSE = `Stewardship shall be observable rather than assumed.

Every steward, executive and future custodian maintains a stewardship profile documenting responsibilities, succession status, knowledge contributions, and constitutional alignment — operationalizing Article III.`;

export const STEWARDSHIP_DASHBOARD_FIELDS = [
  "Current Responsibilities",
  "Institutions Overseen",
  "Succession Status",
  "Knowledge Contributions",
  "Decisions Authored",
  "Lessons Learned Published",
  "Canon References",
  "Constitution Articles",
  "Stewardship Reviews",
  "Training Completed",
  "Custodian Programme Progress",
] as const;

export const ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS = [
  "Exercised authority responsibly.",
  "Protected institutional assets.",
  "Contributed to succession planning.",
  "Preserved institutional knowledge.",
  "Acted consistently with the Constitution and the Stankings Canons.",
  "Identified areas requiring improvement.",
] as const;

export const STEWARDSHIP_PORTAL_BODY = `${STEWARDSHIP_PORTAL_PURPOSE}

## Stewardship Dashboard

${STEWARDSHIP_DASHBOARD_FIELDS.map((f) => `- ${f}`).join("\n")}

## Annual Stewardship Declaration

Every executive, Board member and designated institutional steward shall complete an Annual Stewardship Declaration affirming:

${ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS.map((a) => `- ${a}`).join("\n")}

Declarations become part of the permanent governance record of Stankings Group.`;
