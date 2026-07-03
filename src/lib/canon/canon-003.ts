import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_003_META = {
  identifier: "CANON-003",
  title: "Purpose Precedes Profit",
  statement: "Every institution shall exist to solve meaningful problems.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_003_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every institution shall exist to solve meaningful problems.",
      "Profit shall sustain the institution.",
      "Purpose shall justify its existence.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Commercial success is essential to the long-term sustainability of every institution.",
      "However, profitability alone shall never become sufficient reason to establish, acquire or continue operating an institution within Stankings Group.",
      "Every institution must exist because it creates meaningful value for individuals, families, businesses or society.",
      "Purpose provides direction.",
      "Profit provides sustainability.",
      "Both are necessary.",
      "Neither should replace the other.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Before establishing a new institution, the following questions shall be answered.",
      "What meaningful problem does this institution solve?",
      "Whom does it serve?",
      "Why is the institution needed?",
      "Does it strengthen the wider ecosystem?",
      "Can it become excellent within its chosen field?",
      "Can future generations reasonably preserve and improve it?",
      "If these questions cannot be answered with clarity, the proposal shall not proceed.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall evaluate opportunities according to institutional purpose before financial attractiveness.",
      "Leadership shall resist entering industries solely because they appear profitable.",
      "The institution shall remain disciplined in choosing where it competes and equally disciplined in choosing where it does not.",
      "Strategic restraint is a form of leadership.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall build features because they solve genuine customer problems.",
      "Features that add complexity without meaningful value shall be reconsidered or removed.",
      "Technology shall remain aligned with institutional purpose rather than technological novelty.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience services that exist because they genuinely improve important moments in life.",
      "Every interaction should reinforce the belief that the institution exists to help rather than merely to sell.",
      "The institution shall seek long-term relationships founded upon continued usefulness and earned trust.",
    ],
  },
  {
    id: "the-purpose-test",
    title: "The Purpose Test",
    paragraphs: [
      "Before approving any new institution, product, feature or strategic initiative, ask:",
      "Does this exist because it meaningfully improves people's lives?",
      "Or does it exist merely because it appears commercially attractive?",
      "If purpose cannot clearly justify the proposal, further consideration is required.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many organizations lose their identity by pursuing opportunities unrelated to their mission.",
      "Disciplined institutions grow by remaining faithful to a clear purpose while adapting thoughtfully to changing circumstances.",
      "Purpose creates focus.",
      "Focus creates excellence.",
      "Excellence creates trust.",
      "Trust sustains institutions.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Purpose gives the institution its reason for existing.",
      "Profit enables the institution to continue serving.",
      "Neither should exist without the other.",
      "Purpose shall therefore always precede profit.",
    ],
  },
];

export const CANON_003_BODY = CANON_003_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_003_SUMMARY =
  "Purpose precedes profit — every institution must solve meaningful problems. Profitability alone is never sufficient reason to exist within Stankings Group.";

export const CANON_003_HISTORICAL_NOTES =
  "Third registered canon. Prevents Stankings Group from becoming a random holding company. Foundation for the Purpose Assessment Framework (PAF). Protects the next hundred years of institutional coherence.";

/** Ecosystem purpose validation — Editor-in-Chief review */
export const CANON_003_ECOSYSTEM_PURPOSE = [
  { company: "Yike", purpose: "Reduce uncertainty in buying, selling and renting high-value assets.", passes: true },
  { company: "BamSignal", purpose: "Build trusted relationships through identity and safety.", passes: true },
  { company: "BayRight", purpose: "Reduce financial friction and build trust in payments, escrow and future banking.", passes: true },
  { company: "Stanhan", purpose: "Develop, verify and responsibly manage property throughout its lifecycle.", passes: true },
  { company: "Stankings Auto Hub", purpose: "Increase confidence in vehicle ownership and mobility.", passes: true },
  { company: "Stankings Logistics", purpose: "Move people, goods and opportunities safely and reliably.", passes: true },
  { company: "Hannahkings Gadgets", purpose: "Provide trusted technology infrastructure and procurement.", passes: true },
] as const;

export const CANON_003_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-003",
  sections: CANON_003_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "supports" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "supports" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "supports" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "supports" },
    { identifier: "CANON-008", title: "Excellence Is a Discipline, Not an Event", href: "/library/canon/CANON-008", relationship: "supports" },
    { identifier: "FRAMEWORK-PAF-001", title: "Purpose Assessment Framework", href: "/library/frameworks/purpose-assessment", relationship: "supports" },
    { identifier: "charter", title: "Volume II — The Charter", href: "/library/volumes/charter", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Yike verification before high-value transactions",
      "BamSignal identity for safety",
      "BayRight escrow reducing payment friction",
      "Stanhan property lifecycle management",
      "Removing features that add complexity without value",
      "Rejecting acquisitions unrelated to mission",
    ],
    poor: [
      "Entering gambling for revenue alone",
      "Acquiring random businesses without purpose fit",
      "Feature bloat for competitive vanity",
      "Listing fees without reducing uncertainty",
      "Profit-first industry entry without ecosystem alignment",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Conglomerates that lost identity through unrelated acquisitions",
      "Companies that chased profitable industries outside their mission",
      "Organizations that confused revenue with reason for existing",
    ],
    strengthenedTrust: [
      "Disciplined institutions faithful to clear purpose",
      "Companies that said no to profitable distractions",
      "Ecosystems where each institution strengthened the whole",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-003 requires every institution to solve meaningful problems — profit sustains, purpose justifies. The Purpose Test gates every new company, product, or initiative.",
    fiveMinute:
      "Purpose precedes profit. Commercial success is necessary but profitability alone never justifies a Stankings institution. Leaders evaluate purpose before financial attractiveness. Engineering builds for genuine problems, not novelty. The Purpose Test asks whether a proposal meaningfully improves lives or merely appears commercially attractive. PAF operationalizes this canon.",
    fifteenMinute:
      "CANON-003 prevents Stankings Group from becoming a random holding company. Six institutional questions must be answered before any new institution. Leadership exercises strategic restraint. Engineering removes complexity without value. Customers experience services that improve important life moments. Historical reflection: purpose creates focus, focus creates excellence, excellence creates trust. The Purpose Assessment Framework scores proposals. Combined with TIA (Executive Decision 5), this forms the decision engine before financial or engineering work begins.",
  },
};
