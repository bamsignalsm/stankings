/**
 * Integrity & Ethics Centre — FRAMEWORK-IEC-001
 * Derived from Constitution Article XI
 * Executive Decision No. 39 — Annual Integrity Declarations
 */

import {
  ETHICAL_DECISION_FACTORS,
  RELATED_PARTY_REVIEW_CRITERIA,
} from "@/lib/constitution/articles/article-xi";

export const IEC_FRAMEWORK = {
  identifier: "FRAMEWORK-IEC-001",
  title: "Integrity & Ethics Centre",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XI",
    "CONSTITUTION-ARTICLE-V",
    "CONSTITUTION-ARTICLE-IV",
    "CANON-002",
    "CANON-004",
    "CANON-007",
    "CANON-010",
    "CANON-020",
    "CANON-025",
    "FRAMEWORK-LGOV-001",
    "FRAMEWORK-CGOV-001",
    "FRAMEWORK-IDR-001",
  ],
} as const;

export const IEC_PURPOSE = `Part IV protects the institution against institutional corruption — mission drift, conflicts of interest, hidden influence, and loss of trust.

The Integrity & Ethics Centre makes every declaration part of a permanent, searchable governance record. Transparency and disclosure are the expected norm.`;

export const INTEGRITY_REGISTER_FIELDS = [
  "Conflict Disclosure ID",
  "Person",
  "Role",
  "Nature of Interest",
  "Related Institution",
  "Decisions Affected",
  "Mitigation Measures",
  "Review Outcome",
  "Related Board Minutes",
  "Constitution References",
  "Canon References",
] as const;

export const IEC_REGISTERS = [
  "Integrity Register (Conflict Disclosures)",
  "Gifts Register",
  "Related Party Register",
  "Annual Integrity Declarations",
  "Whistleblower Portal",
  "Ethics Advisory Requests",
  "Constitutional Breach Register",
] as const;

export const ANNUAL_INTEGRITY_DECLARATION_FIELDS = [
  "Known conflicts of interest",
  "Outside appointments where disclosure is appropriate",
  "Related-party interests requiring review",
  "Compliance with constitutional ethical standards",
  "Awareness of any material constitutional concerns requiring attention",
] as const;

export const IEC_BODY = `${IEC_PURPOSE}

## Integrity Register Fields

${INTEGRITY_REGISTER_FIELDS.map((f) => `- ${f}`).join("\n")}

## Centre Registers

${IEC_REGISTERS.map((r) => `- ${r}`).join("\n")}

## Related-Party Review (Art. XI § 11.04)

${RELATED_PARTY_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Ethical Decision Factors (Art. XI § 11.08)

${ETHICAL_DECISION_FACTORS.map((f) => `- ${f}`).join("\n")}

## Annual Integrity Declaration (ED 39)

${ANNUAL_INTEGRITY_DECLARATION_FIELDS.map((f) => `- ${f}`).join("\n")}

Declarations shall be retained as permanent governance records.`;
