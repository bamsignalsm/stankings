/**
 * Ownership & Stewardship Portal — FRAMEWORK-OASP-001
 * Derived from Constitution Article VIII
 * Executive Decision No. 36 — Governance Architecture Register
 */

import {
  CONSTITUTIONAL_OWNER_DUTIES,
  GENERATIONAL_STEWARDSHIP_PRINCIPLES,
} from "@/lib/constitution/articles/article-viii";

export const OASP_FRAMEWORK = {
  identifier: "FRAMEWORK-OASP-001",
  title: "Ownership & Stewardship Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-VIII",
    "CONSTITUTION-ARTICLE-IV",
    "CONSTITUTION-ARTICLE-VII",
    "CANON-004",
    "CANON-006",
    "CANON-007",
    "CANON-016",
    "CANON-025",
    "FRAMEWORK-CGOV-001",
    "FRAMEWORK-IAR-001",
    "FRAMEWORK-GRF-001",
    "LEX-CUSTODIAN",
    "LEX-STEWARDSHIP",
  ],
} as const;

export const OASP_PURPOSE = `Ownership exists to preserve the institution — not to diminish it.

The Ownership & Stewardship Portal distinguishes constitutional philosophy from legal mechanics. The Constitution defines enduring principles; trust deeds and corporate documents implement them under applicable law.`;

export const GOVERNANCE_ARCHITECTURE_STACK = [
  { layer: "The Stankings Canons", nature: "Philosophy", access: "constitutional" as const },
  { layer: "The Constitution", nature: "Enduring governance principles", access: "constitutional" as const },
  { layer: "Family Constitution", nature: "Family stewardship and culture", access: "constitutional" as const, status: "planned" as const },
  { layer: "Family Trust Deed", nature: "Legal ownership implementation", access: "legal" as const, status: "forming" as const },
  { layer: "Corporate Governance Documents", nature: "Lawful corporate structure", access: "legal" as const, status: "forming" as const },
  { layer: "Board Charters", nature: "Governance body mandates", access: "legal" as const, status: "forming" as const },
  { layer: "Operating Policies", nature: "Daily operations", access: "legal" as const, status: "forming" as const },
] as const;

export const OWNERSHIP_LAYER_FIELDS = [
  "Constitutional Ownership Principles",
  "Ownership Structure Overview",
  "Governance Relationship Map",
  "Constitutional Responsibilities",
  "Stewardship Obligations",
  "Related Constitution Articles",
  "Related Canons",
] as const;

export const GAR_REGISTER_DOMAINS = [
  "The Constitution",
  "The Stankings Canons",
  "Applicable law",
  "Legal ownership structures",
  "Governance bodies",
  "Operating institutions",
  "Major governance instruments",
] as const;

export const OASP_BODY = `${OASP_PURPOSE}

## Governance Architecture Stack

${GOVERNANCE_ARCHITECTURE_STACK.map((l) => `- **${l.layer}** — ${l.nature}`).join("\n")}

Each document has a clear purpose. The Constitution does not replace the Trust Deed; it establishes principles the lawful structures are intended to support.

## Constitutional Ownership Duties (Art. VIII § 8.03)

${CONSTITUTIONAL_OWNER_DUTIES.map((d) => `- ${d}`).join("\n")}

## Generational Stewardship (Art. VIII § 8.06)

${GENERATIONAL_STEWARDSHIP_PRINCIPLES.map((p) => `- ${p}`).join("\n")}

## Governance Architecture Register (ED 36)

The Board shall maintain a register documenting relationships between:

${GAR_REGISTER_DOMAINS.map((d) => `- ${d}`).join("\n")}

Future custodians must understand how constitutional philosophy is expressed through lawful governance — without confusing one with the other.

## Ownership Layer vs Legal Layer

- **Constitutional governance** — what the institution stands for (this portal, Constitution, Canons).
- **Legal governance** — how it is implemented under applicable law (trust documentation, corporate structure, shareholding — restricted access).`;
