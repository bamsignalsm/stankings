import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_006_META = {
  identifier: "CANON-006",
  title: "Think in Generations, Act in the Present",
  statement:
    "Every generation shall act faithfully in the present while building responsibly for generations yet unborn.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_006_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every generation shall act faithfully in the present while building responsibly for generations yet unborn.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Stankings Group exists to create institutions capable of serving beyond the lifetime of any founder, executive or generation.",
      "Every important decision shall therefore consider not only immediate outcomes but also its consequences for future custodians, future customers and future communities.",
      "Long-term thinking does not excuse inaction.",
      "Instead, it demands disciplined action today in service of tomorrow.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "The institution shall make decisions with appropriate consideration for:",
      "Five-year outcomes.",
      "Ten-year resilience.",
      "Twenty-five-year capability.",
      "Fifty-year continuity.",
      "One-hundred-year stewardship.",
      "No generation shall knowingly consume opportunities that rightly belong to future generations.",
      "Growth shall therefore be pursued responsibly, preserving the institution's ability to adapt and endure.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall avoid sacrificing long-term institutional strength for short-term recognition, financial performance or personal ambition.",
      "Leadership shall invest in people, systems, governance and knowledge that may not produce immediate rewards but strengthen the institution over time.",
      "Preparing successors is a present responsibility owed to future generations.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology shall be designed for maintainability, adaptability and resilience.",
      "Documentation, open standards where appropriate, security, testing and architectural clarity shall be regarded as long-term investments rather than optional costs.",
      "Engineering shall seek to reduce technical debt before it becomes institutional debt.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience an institution that remains dependable across changing markets, technologies and leadership.",
      "Every improvement should increase confidence that the institution will continue serving responsibly in the years ahead.",
    ],
  },
  {
    id: "the-generational-test",
    title: "The Generational Test",
    paragraphs: [
      "Before making any significant decision, ask:",
      "Will this decision make the institution stronger for those who come after us?",
      "Are we solving today's problem while preserving tomorrow's opportunities?",
      "Will future custodians thank us for this decision or struggle because of it?",
      "If the answer is uncertain, further reflection is required.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Enduring institutions distinguish themselves not merely by longevity but by their willingness to invest in futures they may never personally witness.",
      "Every generation benefits from the foresight of those who came before.",
      "Every generation carries the responsibility to extend that legacy.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Think beyond your lifetime.",
      "Build beyond your tenure.",
      "Serve beyond your generation.",
      "Leave the institution stronger than you received it.",
    ],
  },
];

export const CANON_006_BODY = CANON_006_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_006_SUMMARY =
  "Think in generations, act in the present — every decision must strengthen the institution for those who come after us.";

export const CANON_006_HISTORICAL_NOTES =
  "Sixth registered canon. Defines Stankings Group's relationship with time — institutions built to outlive any founder by centuries. Independent of any family; applicable to every future custodian. Cornerstone of the Generational Review Framework.";

export const CANON_006_TIME_HORIZONS = [
  { years: 5, label: "Five-year outcomes" },
  { years: 10, label: "Ten-year resilience" },
  { years: 25, label: "Twenty-five-year capability" },
  { years: 50, label: "Fifty-year continuity" },
  { years: 100, label: "One-hundred-year stewardship" },
] as const;

export const CANON_006_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-006",
  sections: CANON_006_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "depends_on" },
    { identifier: "LEX-LEGACY", title: "Lexicon: Legacy", href: "/library/lexicon/legacy", relationship: "references" },
    { identifier: "LEX-STEWARDSHIP", title: "Lexicon: Stewardship", href: "/library/lexicon/stewardship", relationship: "references" },
    { identifier: "LEX-CUSTODIAN", title: "Lexicon: Custodian", href: "/library/lexicon/custodian", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "supports" },
    { identifier: "FRAMEWORK-GRF-001", title: "Generational Review Framework", href: "/library/frameworks/generational-review", relationship: "supports" },
    { identifier: "custodian-programme", title: "Volume IV — Custodian Programme", href: "/library/volumes/custodian-programme", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Documenting architecture for successors who will maintain systems in 2040",
      "Custodian Programme investment before succession becomes urgent",
      "Reducing technical debt before it becomes institutional debt",
      "Governance structures independent of any single founder",
      "Growth that preserves adaptability for future markets",
      "Knowledge Objects preserving institutional memory across generations",
    ],
    poor: [
      "Short-term cuts that damage twenty-five-year capability",
      "Technical debt deferred until it becomes irreversible",
      "Founder-dependent systems with no succession plan",
      "Consuming opportunities that belong to future generations",
      "Decisions optimized only for the next quarter",
      "Governance structures that expire with one generation",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Founders who optimized for their lifetime alone",
      "Institutions that collapsed when one generation departed",
      "Technical debt that outlived the engineers who created it",
      "Generations that consumed rather than invested",
    ],
    strengthenedTrust: [
      "Institutions that invested in futures they never witnessed",
      "Enduring governance surviving founder transitions",
      "Documented knowledge enabling century-scale continuity",
      "Custodians who thanked predecessors for foresight",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-006 defines Stankings Group's relationship with time — think in generations, act in the present. Every significant decision must consider consequences for future custodians, customers, and communities without excusing inaction today.",
    fiveMinute:
      "Stankings institutions exist to serve beyond any founder's lifetime. Decisions consider five, ten, twenty-five, fifty, and one-hundred-year horizons. Leaders invest in people, systems, and knowledge that strengthen over time. Engineering treats documentation and maintainability as long-term investments. The Generational Test asks whether future custodians will thank us or struggle because of our choices.",
    fifteenMinute:
      "CANON-006 answers what our relationship with time is. Most businesses optimize for the next quarter; Stankings optimizes for centuries. Institutional implications enumerate five time horizons and forbid consuming future generations' opportunities. Leadership forbids sacrificing long-term strength for short-term recognition. Engineering reduces technical debt before it becomes institutional debt. Customers experience dependability across changing leadership. The Generational Review Framework operationalizes this canon alongside PAF, TIA, and EIA. Executive Decision No. 8 requires Generational Review before final approval on proposals affecting ownership, governance, architecture, reputation, or strategic direction.",
  },
};
