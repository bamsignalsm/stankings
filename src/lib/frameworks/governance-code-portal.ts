/**
 * Governance Code Portal — FRAMEWORK-GC-001
 * Volume II — implements the Constitution in daily practice
 * Executive Decision No. 46
 */

import {
  GOVERNANCE_BODY_TEMPLATE_FIELDS,
  GOVERNANCE_CODE_BOOKS,
  GOVERNANCE_CODE_PURPOSE,
  GOVERNANCE_STACK,
} from "@/lib/governance-code/volume-ii";

export const GC_FRAMEWORK = {
  identifier: "FRAMEWORK-GC-001",
  title: "Governance Code Portal",
  version: "0.1",
  status: "planning" as const,
  derivedFrom: [
    "VOLUME-II-GOVERNANCE-CODE",
    "CONSTITUTION-ARTICLE-IV",
    "CONSTITUTION-ARTICLE-V",
    "CONSTITUTION-ARTICLE-VI",
    "CONSTITUTION-ARTICLE-XVI",
    "CANON-004",
    "CANON-016",
    "CANON-020",
    "FRAMEWORK-CGOV-001",
    "FRAMEWORK-LGOV-001",
    "FRAMEWORK-CDW-001",
    "governance-code",
  ],
} as const;

export const GC_PURPOSE = `The Constitution tells us what Stankings Group believes and how it is governed.

The Governance Code tells us how governance is practiced every day — subordinate to the Constitution, never contradicting it.`;

export const GC_BODY = `${GC_PURPOSE}

## Governance Stack

${GOVERNANCE_STACK.map((layer, i) => (i === 0 ? layer : `        ↓\n${layer}`)).join("\n")}

## Purpose

${GOVERNANCE_CODE_PURPOSE}

## Books (${GOVERNANCE_CODE_BOOKS.length})

${GOVERNANCE_CODE_BOOKS.map((b) => `- ${b.book} — ${b.title} (${b.status})`).join("\n")}

## Governance Body Template (Book I)

${GOVERNANCE_BODY_TEMPLATE_FIELDS.map((f) => `- ${f}`).join("\n")}
`;
