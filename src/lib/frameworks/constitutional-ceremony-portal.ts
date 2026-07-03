/**
 * Constitutional Ceremony Portal — FRAMEWORK-CCY-001
 * Derived from Constitution Article XVII
 * Executive Decision No. 45 — Constitutional Register of Office Holders
 */

import {
  CONSTITUTIONAL_COMMITMENTS,
  CONSTITUTIONAL_EDUCATION_TOPICS,
  CONSTITUTIONAL_OATH_AFFIRMATION,
  CONSTITUTION_EDITION_TYPES,
} from "@/lib/constitution/articles/article-xvii";

export const CCY_FRAMEWORK = {
  identifier: "FRAMEWORK-CCY-001",
  title: "Constitutional Ceremony Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XVII",
    "CONSTITUTION-ARTICLE-XVI",
    "CONSTITUTION-ARTICLE-XV",
    "CONSTITUTION-ARTICLE-V",
    "CANON-004",
    "CANON-006",
    "CANON-007",
    "CANON-020",
    "CANON-025",
    "FRAMEWORK-CCR-001",
    "FRAMEWORK-CPP-001",
    "FRAMEWORK-LGOV-001",
    "FRAMEWORK-IEC-001",
    "constitutional-ceremony",
  ],
} as const;

export const COROH_REGISTER_ID = "COROH-001";

export const CCY_PURPOSE = `Leadership is accepted as a constitutional commitment rather than merely an appointment.

The Constitutional Ceremony Portal preserves the permanent record of every constitutional office holder — affirmations, training, declarations, and service across generations.`;

export const CONSTITUTIONAL_RECORD_DOMAINS = [
  "Constitutional Office",
  "Date of Appointment",
  "Constitution Version Accepted",
  "Oath/Affirmation Completed",
  "Constitution Training Completed",
  "Stewardship Declaration",
  "Integrity Declaration",
  "Leadership Review",
  "Constitutional Reviews Participated In",
  "Knowledge Contributions",
  "Years of Service",
] as const;

export const COROH_REGISTER_FIELDS = [
  "Constitutional appointments",
  "Oaths or affirmations",
  "Constitution training",
  "Stewardship declarations",
  "Integrity declarations",
  "Leadership reviews",
  "Constitutional service history",
] as const;

export const CCY_BODY = `${CCY_PURPOSE}

## Constitutional Commitments (Art. XVII § 17.02)

${CONSTITUTIONAL_COMMITMENTS.map((c) => `- ${c}`).join("\n")}

## Constitutional Affirmation (Art. XVII § 17.03)

${CONSTITUTIONAL_OATH_AFFIRMATION.map((line) => `> ${line}`).join("\n")}

## Constitutional Education (Art. XVII § 17.04)

${CONSTITUTIONAL_EDUCATION_TOPICS.map((t) => `- ${t}`).join("\n")}

## Constitutional Editions (Art. XVII § 17.05)

${CONSTITUTION_EDITION_TYPES.map((e) => `- ${e}`).join("\n")}

## Constitutional Register of Office Holders (${COROH_REGISTER_ID})

${COROH_REGISTER_FIELDS.map((f) => `- ${f}`).join("\n")}

## Constitutional Record Domains

${CONSTITUTIONAL_RECORD_DOMAINS.map((d) => `- ${d}`).join("\n")}
`;
