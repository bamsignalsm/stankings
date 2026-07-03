/**
 * Institution Lifecycle Registry — FRAMEWORK-ILR-001
 * Derived from Constitution Article X
 * Executive Decision No. 38 — Register of Constitutional Institutions
 */

import {
  CONSTITUTIONAL_INNOVATION_REVIEW_CRITERIA,
  INSTITUTIONAL_CHARTER_FIELDS,
  INSTITUTIONAL_DEVELOPMENT_PATHWAY,
  INSTITUTIONAL_INCUBATION_SUPPORT,
  INSTITUTIONAL_INNOVATION_SOURCES,
  PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA,
  RESPONSIBLE_CONCLUSION_FACTORS,
} from "@/lib/constitution/articles/article-x";

export const ILR_FRAMEWORK = {
  identifier: "FRAMEWORK-ILR-001",
  title: "Institution Lifecycle Registry",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-X",
    "CONSTITUTION-ARTICLE-IX",
    "CONSTITUTION-ARTICLE-II",
    "CONSTITUTION-ARTICLE-V",
    "CANON-003",
    "CANON-005",
    "CANON-006",
    "CANON-009",
    "CANON-013",
    "CANON-018",
    "CANON-021",
    "CANON-022",
    "FRAMEWORK-IEP-001",
    "FRAMEWORK-IIS-001",
    "FRAMEWORK-EIA-001",
    "FRAMEWORK-PAR-001",
  ],
} as const;

export const ILR_PURPOSE = `Institutions are not incorporated companies — they are constitutional entities with a birth, purpose, governance model, maturity, and if necessary, an honourable retirement.

The Institution Lifecycle Registry preserves the complete constitutional biography of every institution from conception through every stage of existence.`;

export const LIFECYCLE_RECORD_FIELDS = [
  "Institution ID",
  "Institution Name",
  "Constitutional Purpose",
  "Date Proposed",
  "Date Approved",
  "Launch Date",
  "Current Lifecycle Stage",
  "Institutional Charter",
  "Constitution Articles",
  "Canon References",
  "Shared Platforms",
  "APIs Published",
  "APIs Consumed",
  "Stewardship Reviews",
  "Annual Reports",
  "Knowledge Objects",
  "Lessons Learned",
  "Renewal History",
  "Transformation History",
  "Closure Archive (if applicable)",
] as const;

export const ILR_BODY = `${ILR_PURPOSE}

## Lifecycle Record Fields

${LIFECYCLE_RECORD_FIELDS.map((f) => `- ${f}`).join("\n")}

## Sources of Innovation (Art. X § 10.02)

${INSTITUTIONAL_INNOVATION_SOURCES.map((s) => `- ${s}`).join("\n")}

## Constitutional Innovation Review (Art. X § 10.03)

${CONSTITUTIONAL_INNOVATION_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Development Pathway (Art. X § 10.04)

${INSTITUTIONAL_DEVELOPMENT_PATHWAY.map((s) => `- ${s}`).join("\n")}

## Institutional Charter (Art. X § 10.05)

${INSTITUTIONAL_CHARTER_FIELDS.map((f) => `- ${f}`).join("\n")}

## Incubation Support (Art. X § 10.06)

${INSTITUTIONAL_INCUBATION_SUPPORT.map((s) => `- ${s}`).join("\n")}

## Periodic Review (Art. X § 10.07)

${PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Responsible Conclusion (Art. X § 10.09)

${RESPONSIBLE_CONCLUSION_FACTORS.map((f) => `- ${f}`).join("\n")}

No institution shall be launched, materially transformed, merged or concluded without an updated Institutional Charter and a corresponding Register entry.`;
