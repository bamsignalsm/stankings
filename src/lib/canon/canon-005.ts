import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_005_META = {
  identifier: "CANON-005",
  title: "The Ecosystem Is Greater Than Any Single Institution",
  statement:
    "Every institution within Stankings Group exists as part of a larger ecosystem.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_005_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every institution within Stankings Group exists as part of a larger ecosystem.",
      "The long-term strength of the ecosystem shall always take precedence over the short-term interests of any individual institution.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Each institution possesses a unique mission, distinct expertise and clearly defined responsibilities.",
      "No institution shall unnecessarily duplicate the role of another.",
      "No institution shall pursue growth that materially weakens another institution within the Group.",
      "Institutions shall cooperate, share capabilities where appropriate and strengthen one another through disciplined collaboration.",
      "The success of one institution shall contribute to the resilience of the whole.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every operating institution shall maintain clarity regarding:",
      "Its purpose.",
      "Its responsibilities.",
      "Its boundaries.",
      "Its shared capabilities.",
      "Its contribution to the wider ecosystem.",
      "Expansion into new activities shall be evaluated not only for commercial value but also for its impact upon institutional harmony.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall think beyond the performance of their individual institution.",
      "Every executive shall regard themselves as a steward of the wider Stankings ecosystem.",
      "Cooperation shall be rewarded.",
      "Internal rivalry shall be discouraged.",
      "Knowledge, expertise and best practices shall be shared wherever doing so strengthens the institution as a whole.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology shall be designed to encourage interoperability rather than unnecessary duplication.",
      "Shared identity.",
      "Shared trust.",
      "Shared payments.",
      "Shared verification.",
      "Shared notifications.",
      "Shared audit.",
      "Shared AI.",
      "Shared knowledge.",
      "Shared procurement.",
      "Shared services.",
      "Engineering shall favour reusable platforms before independent implementations.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience one coherent institution rather than disconnected businesses.",
      "A customer interacting with multiple Stankings institutions should encounter consistent standards of trust, professionalism, quality and service.",
      "Transitions between institutions shall feel natural, seamless and respectful of customer choice.",
    ],
  },
  {
    id: "the-ecosystem-test",
    title: "The Ecosystem Test",
    paragraphs: [
      "Before establishing a new institution, product or capability, ask:",
      "Does this strengthen the ecosystem?",
      "Does it duplicate an existing capability?",
      "Can another institution provide this more effectively?",
      "Will collaboration create a better outcome than duplication?",
      "If unnecessary duplication exists, collaboration shall be preferred.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Strong institutions are rarely built through isolated excellence alone.",
      "They endure because specialised organisations cooperate through shared purpose, shared standards and mutual reinforcement.",
      "Institutional harmony is a strategic advantage.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Every institution shall become excellent at its own mission.",
      "Every institution shall strengthen the missions of others.",
      "The ecosystem shall always be greater than the sum of its individual parts.",
    ],
  },
];

export const CANON_005_BODY = CANON_005_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_005_SUMMARY =
  "The ecosystem is greater than any single institution — each centre of excellence has its lane, strengthens others, and never duplicates unnecessarily.";

export const CANON_005_HISTORICAL_NOTES =
  "Fifth registered canon. Protects the architectural principle that Yike never competes with Stanhan, BayRight never competes with Yike, and every company knows its lane. Cornerstone of the Ecosystem Map and Ecosystem Impact Assessment.";

/** Editorial validation — each institution's lane per CANON-005 */
export const CANON_005_ECOSYSTEM_LANES = [
  {
    company: "Yike",
    excellence: "Marketplace Excellence",
    lane: "Orchestrates trusted transactions — never a dealership, construction company, or logistics operator.",
  },
  {
    company: "Stanhan",
    excellence: "Property Excellence",
    lane: "Develops, builds, verifies, and manages — Yike, BayRight, and customers benefit.",
  },
  {
    company: "Stankings Auto Hub",
    excellence: "Automotive Excellence",
    lane: "Inspects, verifies, maintains, leases, imports — Yike grows stronger without becoming an automotive operator.",
  },
  {
    company: "Stankings Logistics",
    excellence: "Logistics Excellence",
    lane: "Moves vehicles, families, materials, and gadgets — supports every institution that depends on movement.",
  },
  {
    company: "BayRight",
    excellence: "Financial Excellence",
    lane: "Escrow, settlement, identity-linked financial services — strengthens every commercial institution without competing.",
  },
  {
    company: "Hannahkings Gadgets",
    excellence: "Technology Excellence",
    lane: "Internal procurement, asset lifecycle, technology supply chain — every institution benefits.",
  },
] as const;

export const CANON_005_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-005",
  sections: CANON_005_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "LEX-ECOSYSTEM", title: "Lexicon: Ecosystem", href: "/library/lexicon/ecosystem", relationship: "references" },
    { identifier: "LEX-CAPABILITY", title: "Lexicon: Capability", href: "/library/lexicon/capability", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "supports" },
    { identifier: "FRAMEWORK-EIA-001", title: "Ecosystem Impact Assessment", href: "/library/frameworks/ecosystem-impact-assessment", relationship: "supports" },
    { identifier: "ecosystem-map", title: "Ecosystem Map", href: "/library/ecosystem", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Yike orchestrates transactions; Stanhan verifies properties",
      "Auto Hub inspects vehicles listed on Yike without Yike becoming a dealership",
      "BayRight provides escrow for all high-value transactions",
      "Shared identity and payments across institutions",
      "Logistics hauls for Auto Hub and Stanhan without competing with them",
      "Hannahkings Gadgets supplies devices to all institutions",
    ],
    poor: [
      "Yike launching its own vehicle inspection service",
      "Stanhan building an independent marketplace",
      "Auto Hub creating a competing financial product",
      "Duplicate payment systems per institution",
      "Internal rivalry rewarded over cooperation",
      "New division duplicating existing capability without EIA",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Holding companies where subsidiaries competed destructively",
      "Conglomerates that duplicated capabilities across divisions",
      "Marketplaces that competed with their own vendors",
      "Institutions that grew at the expense of sibling companies",
    ],
    strengthenedTrust: [
      "Specialised organisations cooperating through shared standards",
      "Centres of excellence connected by shared platforms",
      "Ecosystem harmony as strategic advantage",
      "Customers experiencing one coherent institution",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-005 establishes that the Stankings ecosystem is greater than any single institution. Each company has its lane, strengthens others, avoids duplication, and cooperates through shared platforms. The Ecosystem Test gates new institutions and products.",
    fiveMinute:
      "Every Stankings institution is a centre of excellence with a defined mission, boundaries, and ecosystem contribution. Yike orchestrates marketplaces; Stanhan develops property; Auto Hub operates automotive; Logistics moves goods; BayRight provides financial infrastructure; Hannahkings Gadgets supplies technology. Leaders steward the whole ecosystem, not only their institution. Engineering favours shared identity, trust, payments, verification, and AI over duplication. The Ecosystem Impact Assessment operationalizes this canon.",
    fifteenMinute:
      "CANON-005 answers how companies relate to one another. The long-term strength of the ecosystem takes precedence over any individual institution's short-term interests. Institutional implications require clarity on purpose, responsibilities, boundaries, and shared capabilities. Leadership implications reward cooperation and discourage internal rivalry. Engineering implications enumerate ten shared platform services. Customer implications require one coherent experience across institutions. The Ecosystem Test asks whether a proposal strengthens the ecosystem, duplicates capability, or should be collaboration instead. Historical reflection: institutional harmony is a strategic advantage. The Ecosystem Map makes every institution's relationships explorable. Executive Decision No. 7 requires PAF, TIA, and EIA before financial modelling.",
  },
};
