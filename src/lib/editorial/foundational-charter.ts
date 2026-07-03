/**
 * Foundational Charter — permanent publishing standard
 * Editorial Decision No. 53 — Session LIB-2026-06-27-010
 */

export const FOUNDATIONAL_CHARTER_STANDARD_ID = "FRAMEWORK-FC-001" as const;

export const FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT = `A new director, executive, engineer, auditor or future custodian joins Stankings Group.

How do they understand the governance system in less than 15 minutes?` as const;

export const FOUNDATIONAL_CHARTER_PRINCIPLE =
  "The Foundational Charter exists to orient readers, not to govern them." as const;

export const FOUNDATIONAL_CHARTER_QUESTION = "How do I use this Book?" as const;

/** Permanent ten-section template — locked unless SLPS changes. */
export const FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS = [
  "Purpose",
  "Scope",
  "Constitutional Authority",
  "Governance Philosophy",
  "Governance Map",
  "Book Structure",
  "Reading Guide",
  "Related Library Resources",
  "Publication Status",
  "Success Criteria",
] as const;

export const SLPS_WRITING_RULES = [
  {
    id: "explain-before-define",
    number: 1,
    title: "Explain Before You Define",
    rule: "Always tell the reader why something exists before describing what it is.",
  },
  {
    id: "orient-before-instruct",
    number: 2,
    title: "Orient Before You Instruct",
    rule: "Readers should understand where they are before they encounter detailed rules.",
  },
  {
    id: "principles-before-procedures",
    number: 3,
    title: "Principles Before Procedures",
    rule: "If a principle and a procedure appear on the same page, the principle comes first.",
  },
] as const;

export const CHAPTER_APPROVAL_TESTS = [
  {
    id: "constitution",
    title: "Constitution Test",
    question: "Is it fully consistent with Volume I?",
  },
  {
    id: "implementation",
    title: "Implementation Test",
    question: "Can Cursor build systems from it without ambiguity?",
  },
  {
    id: "education",
    title: "Education Test",
    question: "Can a future custodian understand it without needing the founder?",
  },
  {
    id: "longevity",
    title: "Longevity Test",
    question: "Will it still read naturally 50–100 years from now?",
  },
] as const;

/** @deprecated Use FOUNDATIONAL_CHARTER_PRINCIPLE — Editorial Decision No. 53 */
export const BOOK_CHARTER_PRINCIPLE = FOUNDATIONAL_CHARTER_PRINCIPLE;

/** @deprecated Use FOUNDATIONAL_CHARTER_QUESTION */
export const BOOK_CHARTER_QUESTION = FOUNDATIONAL_CHARTER_QUESTION;

/** @deprecated Use FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT */
export const BOOK_CHARTER_PROBLEM_STATEMENT = FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT;

/** @deprecated Use FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS */
export const BOOK_CHARTER_TEMPLATE_SECTIONS = FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS;
