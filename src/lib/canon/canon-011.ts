import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_011_META = {
  identifier: "CANON-011",
  title: "Simplicity Creates Strength",
  statement:
    "Complexity shall never be mistaken for sophistication. The strongest institutions seek clarity, simplicity and thoughtful design.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_011_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Complexity shall never be mistaken for sophistication.",
      "The strongest institutions seek clarity, simplicity and thoughtful design.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Every institution naturally becomes more complex as it grows.",
      "Without discipline, unnecessary complexity reduces efficiency, increases risk, weakens communication and diminishes customer experience.",
      "Stankings Group shall therefore pursue simplicity wherever simplicity improves understanding, execution and service.",
      "Simplicity does not mean superficiality.",
      "It means removing what is unnecessary so that what is essential may perform exceptionally well.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Policies shall be written clearly.",
      "Governance shall be understandable.",
      "Processes shall be designed with purpose.",
      "Organizational structures shall remain as simple as responsibly possible.",
      "Complexity shall require justification.",
      "Simplicity shall be the default.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall communicate with clarity.",
      "Goals shall remain understandable.",
      "Responsibilities shall be well defined.",
      "Meetings shall conclude with clear decisions, clear ownership and clear next actions.",
      "Leadership shall reduce confusion rather than create it.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Architecture shall favour maintainability over unnecessary sophistication.",
      "Reusable components shall be preferred to duplicated solutions.",
      "Systems shall remain modular, observable and well documented.",
      "Every engineer shall remember that code is written first for people to understand and only then for computers to execute.",
      "Technical elegance is demonstrated through clarity.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should never need unnecessary effort to understand, trust or use the institution's products and services.",
      "Interfaces shall be intuitive.",
      "Communication shall be straightforward.",
      "Processes shall reduce anxiety rather than increase it.",
      "Simplicity is one expression of respect for the customer's time and attention.",
    ],
  },
  {
    id: "the-simplicity-test",
    title: "The Simplicity Test",
    paragraphs: [
      "Before approving any process, policy, product or technical design, ask:",
      "Can this be made simpler without reducing quality, safety or integrity?",
      "If unnecessary complexity remains, continue refining.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many institutions become difficult to manage not because they lack capable people, but because unnecessary complexity gradually replaces thoughtful design.",
      "Disciplined simplicity creates resilience, adaptability and operational excellence.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Clarity strengthens understanding.",
      "Understanding strengthens execution.",
      "Execution strengthens institutions.",
      "Simplicity shall therefore remain a permanent discipline within Stankings Group.",
    ],
  },
];

export const CANON_011_BODY = CANON_011_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_011_SUMMARY =
  "Simplicity creates strength — clarity and thoughtful design over complexity mistaken for sophistication.";

export const CANON_011_HISTORICAL_NOTES =
  "Eleventh registered canon. First Operational Canon of Volume 0 — governs how the institution thinks after the Moral Foundation (CANON-001–010). Operationalized through the Simplicity Review. Default position: simple where possible, sophisticated only where necessary.";

export const CANON_011_SIMPLICITY_MOTTO =
  "Simple where possible. Sophisticated only where necessary.";

/** Editorial applications — simplicity in practice per CANON-011 */
export const CANON_011_SIMPLICITY_APPLICATIONS = [
  {
    domain: "Yike",
    examples: [
      "One marketplace — not dozens of fragmented listing products",
      "One trust system, one passport, one identity, one escrow",
      "Complexity behind the scenes; simplicity for the customer",
    ],
  },
  {
    domain: "The Stankings Library",
    examples: [
      "One Library — not PDFs, Word docs, Notion, Confluence, and email",
      "One Knowledge Object standard (LS-001)",
      "One Source of Truth principle",
    ],
  },
  {
    domain: "Engineering",
    examples: [
      "Reusable components over duplicated solutions",
      "Modular, observable, documented systems",
      "Code written for humans first — clarity is technical elegance",
    ],
  },
  {
    domain: "Governance",
    examples: [
      "Policies written clearly — complexity requires justification",
      "Meetings end with clear decisions, ownership, and next actions",
      "Organizational structures as simple as responsibly possible",
    ],
  },
  {
    domain: "Product & UX",
    examples: [
      "Interfaces intuitive on first use",
      "Processes that reduce anxiety, not increase it",
      "Features explainable in one paragraph",
    ],
  },
] as const;

export const CANON_011_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-011",
  sections: CANON_011_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-008", title: "Excellence Is a Discipline, Not an Event", href: "/library/canon/CANON-008", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-010", title: "People Are Ends, Never Merely Means", href: "/library/canon/CANON-010", relationship: "depends_on" },
    { identifier: "LEX-SIMPLICITY", title: "Lexicon: Simplicity", href: "/library/lexicon/simplicity", relationship: "references" },
    { identifier: "LEX-SINGLE-SOURCE-OF-TRUTH", title: "Lexicon: Single Source of Truth", href: "/library/lexicon/single-source-of-truth", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-SR-001", title: "Simplicity Review", href: "/library/frameworks/simplicity-review", relationship: "supports" },
    { identifier: "CANON-012", title: "Build Platforms, Not Silos", href: "/library/canon/CANON-012", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Yike consolidated to one marketplace, one passport, one escrow",
      "IKI: one Library, one Knowledge Object, one Source of Truth",
      "Architecture reuses existing platform services",
      "PR rejected clever abstraction that duplicated capability",
      "Policy rewritten in plain language",
      "UI flow reduced steps without losing safety",
    ],
    poor: [
      "Complexity accepted because it is clever",
      "New system when existing capability could extend",
      "Policies no one can explain in one paragraph",
      "Microservices split without operational justification",
      "Customer-facing flows that increase cognitive load",
      "Meetings that end without clear ownership",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions buried under their own processes",
      "Engineering systems only original authors understood",
      "Customers lost in unnecessary steps and jargon",
      "Complexity mistaken for sophistication",
    ],
    strengthenedTrust: [
      "Disciplined simplicity creating resilience",
      "Yike's unified trust architecture",
      "Library as single institutional memory",
      "Engineers empowered to simplify thoughtfully",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-011 establishes simplicity as institutional strength — not superficiality, but removing the unnecessary so the essential performs well. The Simplicity Test asks whether design can be simplified without reducing quality, safety, or integrity.",
    fiveMinute:
      "First Operational Canon after the Moral Foundation. Complexity requires justification; simplicity is default. Engineering favours maintainability, reuse, and clarity. Customers deserve intuitive interfaces and straightforward communication. Simplicity Review required on engineering PRs, architecture proposals, and major features per Executive Decision No. 13.",
    fifteenMinute:
      "CANON-011 governs how Stankings Group thinks operationally — products, companies, acquisitions, hiring, engineering. Yike exemplifies: one marketplace, one passport, one escrow. IKI exemplifies: one Library, one Knowledge Object. SR captures explainability, cognitive load, reuse, essential vs accidental complexity. Motto: simple where possible, sophisticated only where necessary. Saves thousands of engineering hours over decades by giving permission to simplify.",
  },
};
