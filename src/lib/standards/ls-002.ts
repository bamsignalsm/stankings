/**
 * Library Standard LS-002 — The Stankings Lexicon
 * Version 1.0 · Approved
 */

export const LS_002 = {
  id: "LS-002",
  title: "The Stankings Lexicon",
  version: "1.0",
  status: "approved" as const,
} as const;

export const LS_002_PURPOSE = `The Stankings Lexicon establishes the official institutional vocabulary of Stankings Group.

Its purpose is to ensure that every document, every product, every company, every employee, every AI system and every future custodian interprets key institutional terms consistently.

Definitions contained within the Lexicon become the authoritative meanings for all future Library volumes.`;

export const LS_002_CLOSING = `Words shape thinking.

Thinking shapes decisions.

Decisions shape institutions.

The Stankings Lexicon therefore exists to preserve clarity so that future generations inherit not only the institution, but also the language required to understand it.`;

export const EDITOR_IN_CHIEF_DECISION_3 = `From today onward, every new Canon, Constitution article, Governance rule, Engineering Standard, or Platform Specification must use terms defined in the Lexicon.

If a new term is needed:
1. It is proposed.
2. Reviewed.
3. Approved.
4. Added to the Lexicon.
5. Then used elsewhere.

Not the other way around.`;

export const LEXICON_TERM_WORKFLOW = [
  "Proposed",
  "Reviewed",
  "Approved",
  "Added to the Lexicon",
  "Used elsewhere",
] as const;
