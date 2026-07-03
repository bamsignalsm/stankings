import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_020_META = {
  identifier: "CANON-020",
  title: "Exercise Sound Judgment",
  statement:
    "Policies guide decisions. Canons shape thinking. Judgment determines how principles are applied in changing circumstances. The institution shall therefore cultivate sound judgment as a permanent discipline.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_020_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Policies guide decisions. Canons shape thinking. Judgment determines how principles are applied in changing circumstances.",
      "The institution shall therefore cultivate sound judgment as a permanent discipline.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "No Constitution can anticipate every future challenge. No policy can address every circumstance. No technology can replace thoughtful human judgment.",
      "Every custodian shall therefore develop the ability to interpret principles wisely, evaluate evidence carefully and make decisions consistent with the enduring mission of the institution.",
      "Good judgment balances principle with context, courage with humility, confidence with curiosity and action with reflection.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "The institution shall encourage disciplined reasoning, thoughtful analysis and evidence-based decision making.",
      "Where uncertainty exists, decisions shall be informed by the Canons, institutional knowledge, professional expertise and responsible consultation.",
      "The institution shall value wisdom above impulse.",
      "Policies shall support judgment, not replace it.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall make decisions only after seeking appropriate facts, considering long-term consequences and listening respectfully to informed perspectives.",
      "They shall remain willing to revise conclusions when new evidence emerges.",
      "Strong judgment requires intellectual humility.",
      "Leadership shall never confuse decisiveness with inflexibility.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall avoid blind adherence to process when circumstances require thoughtful adaptation.",
      "Standards remain important. Professional judgment remains essential.",
      "Architecture decisions shall consider technical evidence, operational realities, security, maintainability, customer experience and institutional principles.",
      "Automation shall support judgment. It shall not replace accountability.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience institutions that exercise fairness, compassion and common sense.",
      "Policies shall be applied consistently while allowing appropriate judgment in exceptional circumstances.",
      "Good judgment strengthens both trust and dignity.",
    ],
  },
  {
    id: "the-judgment-test",
    title: "The Judgment Test",
    paragraphs: [
      "Before making any significant decision, ask:",
      "Have we gathered sufficient evidence?",
      "Have we considered multiple perspectives?",
      "Are we acting consistently with our Canons?",
      "Would reasonable future custodians understand and respect this decision?",
      "If uncertainty remains, seek greater understanding before proceeding.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The most enduring institutions are guided not merely by detailed rules but by people capable of applying enduring principles wisely in changing circumstances.",
      "Sound judgment transforms principles into responsible action.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Principles establish direction.",
      "Knowledge provides understanding.",
      "Judgment determines action.",
      "Therefore, every custodian shall continually develop the wisdom required to apply the institution's principles faithfully.",
    ],
  },
];

export const CANON_020_BODY = CANON_020_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_020_SUMMARY =
  "Exercise sound judgment — policies guide, Canons shape thinking, judgment applies principles wisely in changing circumstances.";

export const CANON_020_JUDGMENT_MOTTO =
  "Principles establish direction. Knowledge provides understanding. Judgment determines action.";

export const CANON_020_HISTORICAL_NOTES =
  "Twentieth registered canon. Capstone Legacy Canon of Volume 0's first arc — bridge between character (CANON-001–010) and institutional intelligence (CANON-011–019). Operationalized through Institutional Decision Intelligence and Judgment Records. Technology and AI support judgment; they do not replace it.";

/** How frameworks converge on judgment — CANON-020 */
export const CANON_020_FRAMEWORK_CONVERGENCE = [
  { framework: "Purpose Assessment", question: "Does this serve meaningful purpose?" },
  { framework: "Trust Impact Assessment", question: "Will this strengthen or weaken trust?" },
  { framework: "Ecosystem Impact Assessment", question: "Does this strengthen the ecosystem?" },
  { framework: "Innovation Governance", question: "Does innovation serve institutional purpose?" },
  { framework: "Human Impact Review", question: "How does this affect people?" },
  { framework: "Institutional Strength Assessment", question: "Does this make the institution stronger?" },
  { framework: "Generational Review", question: "Will future generations thank us?" },
  { framework: "Uncertainty Reduction", question: "What uncertainty does this reduce?" },
  { framework: "Principles Alignment Review", question: "Does this align with our principles?" },
] as const;

export const CANON_020_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-020",
  sections: CANON_020_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017", relationship: "depends_on" },
    { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019", relationship: "depends_on" },
    { identifier: "FRAMEWORK-IDR-001", title: "Institutional Decision Record", href: "/library/frameworks/institutional-decision-record", relationship: "references" },
    { identifier: "LEX-JUDGMENT", title: "Lexicon: Judgment", href: "/library/lexicon/judgment", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-IDI-001", title: "Institutional Decision Intelligence", href: "/library/decision-intelligence", relationship: "supports" },
    { identifier: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Judgment Record documents evidence, alternatives, and canon reasoning",
      "AI surfaces trade-offs — human custodian decides",
      "Leader revises conclusion when new evidence emerges",
      "Exception handled with fairness and documented judgment",
      "Crisis decision explainable to future custodians",
      "Consultation before irreversible commitment",
    ],
    poor: [
      "The policy says no — without canon context or judgment",
      "Decisiveness without evidence or humility",
      "Automation replaces accountability",
      "No record of how institution reasoned",
      "Blind process adherence when context demands adaptation",
      "Post-hoc justification without genuine reasoning",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that hid behind rules without judgment",
      "Leaders who could not explain why decisions were made",
      "AI or process replacing human accountability",
      "Rigidity mistaken for strength",
    ],
    strengthenedTrust: [
      "Searchable repository of institutional reasoning",
      "Future CEOs facing unimagined crises with canon + judgment",
      "Wisdom preserved across generations",
      "Character and intelligence united in practice",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-020 — Exercise Sound Judgment. Capstone Legacy Canon. Policies guide, Canons shape, judgment applies. Judgment Test before significant decisions. IDI and Judgment Records per Executive Decision No. 22. AI supports, never replaces, human judgment.",
    fiveMinute:
      "Bridge between character and institutional intelligence. All assessment frameworks converge on good judgment. Judgment Record: facts, assumptions, alternatives, risks, canons, evidence quality, stakeholders, judgment notes, decision, review, lessons. Future AI: Canons + trade-offs + human decision required. Intellectual humility — revise when evidence changes.",
    fifteenMinute:
      "Most practical canon — governs every decision, line of code, board meeting, acquisition, launch, employee. Grandson CEO 2084: Constitution won't have exact answer; Canons + judgment will. Institution defined by quality of judgment applying principles. IDI searchable reasoning repository. Not justify after fact — preserve wisdom for similar future challenges.",
  },
};
