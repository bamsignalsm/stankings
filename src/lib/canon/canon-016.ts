import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_016_META = {
  identifier: "CANON-016",
  title: "Build for Institutional Strength",
  statement:
    "Every significant decision shall strengthen the institution. Growth that weakens the institution is not progress.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_016_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every significant decision shall strengthen the institution.",
      "Growth that weakens the institution is not progress.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Expansion alone shall never be regarded as success.",
      "Revenue alone shall never define achievement.",
      "The institution shall pursue opportunities that increase resilience, capability, trust, knowledge, service and long-term value.",
      "Growth shall therefore be measured not merely by size, but by institutional strength.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every acquisition, investment, partnership, product, company and strategic initiative shall contribute positively to one or more of the following: Institutional Trust, Institutional Capability, Institutional Knowledge, Institutional Resilience, Institutional Reputation, Institutional Sustainability, Institutional Service.",
      "If an opportunity weakens more than it strengthens, it shall receive additional scrutiny regardless of its financial attractiveness.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall resist the temptation to pursue growth for prestige alone.",
      "Institutional strength shall take precedence over organizational size.",
      "Leaders shall ask not \"How big can we become?\" but \"How strong can we become?\"",
      "Strong institutions naturally create sustainable growth.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology decisions shall prioritize maintainability, interoperability, resilience and long-term operational capability.",
      "Temporary shortcuts shall not become permanent architecture.",
      "Engineering excellence strengthens institutional strength.",
      "Technical debt shall be managed as institutional debt.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience increasing confidence as the institution grows.",
      "Growth shall improve service quality rather than dilute it.",
      "Expansion shall never reduce the institution's commitment to professionalism, transparency or trust.",
    ],
  },
  {
    id: "the-strength-test",
    title: "The Strength Test",
    paragraphs: [
      "Before approving any significant proposal, ask:",
      "Will this make Stankings Group stronger?",
      "Will future generations inherit a more capable institution?",
      "Does this strengthen multiple parts of the ecosystem?",
      "Does it increase long-term resilience?",
      "If not, the proposal deserves reconsideration.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many organizations become larger while becoming weaker.",
      "Enduring institutions expand carefully, preserving coherence, capability and purpose as they grow.",
      "Institutional strength compounds over generations.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Size is temporary.",
      "Strength endures.",
      "Every important decision shall therefore seek to strengthen the institution before it seeks to enlarge it.",
    ],
  },
];

export const CANON_016_BODY = CANON_016_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_016_SUMMARY =
  "Build for institutional strength — growth measured by resilience and capability, not size or revenue alone.";

export const CANON_016_STRENGTH_MOTTO = "Size is temporary. Strength endures.";

export const CANON_016_HISTORICAL_NOTES =
  "Sixteenth registered canon. First Strategic Canon of Volume 0 — governs how the institution grows. Operationalized through the Institutional Strength Assessment. Teaches how to grow, not merely how to operate: stronger before bigger.";

export const CANON_016_STRENGTH_PILLARS = [
  "Institutional Trust",
  "Institutional Capability",
  "Institutional Knowledge",
  "Institutional Resilience",
  "Institutional Reputation",
  "Institutional Sustainability",
  "Institutional Service",
] as const;

/** Editorial — each ecosystem company tested against CANON-016 */
export const CANON_016_ECOSYSTEM_STRENGTH = [
  { company: "Yike", slug: "yike", strengthens: "Creates trusted commerce across the ecosystem." },
  { company: "BayRight", slug: "bayright", strengthens: "Adds financial infrastructure and payments capability." },
  { company: "BamSignal", slug: "bamsignal", strengthens: "Builds verified identity and trusted relationships." },
  { company: "Stanhan", slug: "stanhan", strengthens: "Adds real-world execution and property capability." },
  { company: "Stankings Auto Hub", slug: "stankings-auto-hub", strengthens: "Creates inspection, mobility and automotive expertise." },
  { company: "Stankings Logistics", slug: "stankings-logistics", strengthens: "Gives the ecosystem movement and operational control." },
  { company: "Hannahkings Gadgets", slug: "hannahkings-gadgets", strengthens: "Standardizes technology procurement and device lifecycle." },
  { company: "Stankings Times", slug: "stankings-times", strengthens: "Builds corporate authority and owned-media trust across Africa." },
  { company: "Stankings Hotel & Suites", slug: "stankings-hotel-and-suites", strengthens: "Provides physical hospitality infrastructure for the ecosystem." },
  { company: "Shodis Industries", slug: "shodis-industries", strengthens: "Adds manufacturing and factory-direct materials capability." },
  { company: "Hannahkings Education", slug: "hannahkings-education", strengthens: "Develops future citizens and professionals." },
  { company: "Stankings Foundation", slug: "stankings-foundation", strengthens: "Strengthens society and institutional social legitimacy." },
  { company: "Stankings Institute", slug: "stankings-institute", strengthens: "Develops future leaders and custodians." },
] as const;

export const CANON_016_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-016",
  sections: CANON_016_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-003", title: "Every Institution Must Know Its Purpose", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-012", title: "Build Platforms, Not Silos", href: "/library/canon/CANON-012", relationship: "depends_on" },
    { identifier: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015", relationship: "depends_on" },
    { identifier: "LEX-STRENGTH", title: "Lexicon: Institutional Strength", href: "/library/lexicon/institutional-strength", relationship: "references" },
    { identifier: "ecosystem-map", title: "Ecosystem Map", href: "/library/ecosystem", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-ISA-001", title: "Institutional Strength Assessment", href: "/library/frameworks/institutional-strength-assessment", relationship: "supports" },
    { identifier: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Logistics company adds movement capability across ecosystem",
      "BayRight strengthens financial infrastructure platform",
      "ISA completed before acquisition — proceed with confidence",
      "Feature rejected — weakens maintainability without capability gain",
      "Partnership strengthens three institutions simultaneously",
      "Investment aligned with fifty-year generational score",
    ],
    poor: [
      "Acquisition for prestige that duplicates existing capability",
      "Revenue-positive initiative that fragments platform architecture",
      "Growth for size alone — weakens coherence",
      "Technical shortcut becoming permanent debt",
      "Financial attractiveness overriding institutional weakness",
      "Expansion diluting service quality and trust",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Organizations larger but weaker — coherence lost",
      "Acquisitions that destroyed institutional identity",
      "Revenue growth masking capability erosion",
      "Technical debt unmanaged as institutional debt",
    ],
    strengthenedTrust: [
      "Each company permanently increasing institutional capability",
      "Strong institutions naturally becoming bigger",
      "Strength compounding over generations",
      "Board asking how strong, not how big",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-016 requires every significant decision to strengthen the institution. The Strength Test before approval. ISA scores capability, resilience, knowledge, trust, ecosystem, strategic, and generational dimensions. Financial performance alone never justifies weakening long-term strength.",
    fiveMinute:
      "First Strategic Canon — how to grow. Seven strength pillars: trust, capability, knowledge, resilience, reputation, sustainability, service. Leaders ask how strong, not how big. ISA required per Executive Decision No. 18 for acquisitions, partnerships, new companies, capital investments. Integrates PAF, TIA, EIA, GRF. Every envisioned company exists because it increases institutional capability.",
    fifteenMinute:
      "CANON-016 is Stankings' competitive advantage in growth decisions. Not 'Will it make money?' but 'Does it strengthen the institution?' Yike through Institute each tested — none exist merely to make money. Engineering manages technical debt as institutional debt. Canon 016 crosses milestone: what is right, how to operate, now how to grow. Strong institutions usually become bigger; bigger institutions do not automatically become stronger.",
  },
};
