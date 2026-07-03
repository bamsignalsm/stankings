/**
 * Institutional Identity Statement (IIS)
 * FRAMEWORK-IIS-001 — derived from Constitution Article I
 * Executive Decision No. 29
 */

export const IIS_FRAMEWORK = {
  identifier: "FRAMEWORK-IIS-001",
  title: "Institutional Identity Statement Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-I",
    "CANON-001",
    "CANON-003",
    "CANON-005",
    "CANON-006",
  ],
} as const;

export const IIS_PURPOSE = `Every institution admitted into the Stankings Group ecosystem shall maintain an Institutional Identity Statement consistent with Article I of the Constitution.

Identity shall be explicit rather than assumed. Purpose, governance alignment, and strategic role must be clearly articulated before admission, acquisition, or constitutional partnership.`;

export const IIS_REQUIRED_FIELDS = [
  "Institution Name",
  "Founded",
  "Purpose",
  "Mission",
  "Core Capabilities",
  "Shared Platforms Used",
  "Institutions Strengthened",
  "Primary Customers",
  "Constitution Articles",
  "Canon References",
  "Strategic Role",
  "Long-Term Vision",
  "Stewardship Responsibilities",
] as const;

export const IIS_ADMISSION_TEST = `Can this institution's purpose, governance and strategic role be clearly articulated and shown to align with the Constitution and the Stankings Canons?`;

export const IIS_BODY = `${IIS_PURPOSE}

## Required Fields

${IIS_REQUIRED_FIELDS.map((f) => `- ${f}`).join("\n")}

## Admission Test

${IIS_ADMISSION_TEST}

Applies equally to newly established institutions, acquisitions and strategic partnerships where constitutional alignment is expected.`;
