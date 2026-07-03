import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_010_META = {
  identifier: "CANON-010",
  title: "People Are Ends, Never Merely Means",
  statement:
    "Every person shall be treated with dignity, fairness and respect. People are never merely instruments for achieving institutional objectives.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_010_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every person shall be treated with dignity, fairness and respect.",
      "People are never merely instruments for achieving institutional objectives.",
      "They are the reason the institution exists.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "The success of Stankings Group shall never be measured solely by financial performance, operational efficiency or institutional growth.",
      "Its success shall also be measured by the quality of its relationships with customers, employees, partners, suppliers, communities and every individual affected by its decisions.",
      "The institution shall seek sustainable prosperity by creating value with people rather than extracting value from people.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution shall strive to create environments where individuals are respected, heard and treated fairly.",
      "Policies, products and services shall be evaluated not only for efficiency but also for their effect upon human dignity.",
      "The institution shall reject practices that knowingly exploit, deceive or unnecessarily disadvantage people.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall exercise authority with empathy, professionalism and fairness.",
      "They shall invest in the growth of their teams, encourage honest communication and create environments where people may contribute meaningfully.",
      "Respect shall never depend upon someone's title, position or influence.",
      "Every individual deserves professional courtesy.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology shall be designed with people in mind.",
      "Products shall protect privacy, encourage accessibility, communicate clearly and avoid manipulative design practices.",
      "Artificial intelligence shall support human judgment responsibly and transparently.",
      "Systems shall serve people rather than requiring people to adapt unnecessarily to systems.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers shall be treated as long-term relationships rather than isolated transactions.",
      "The institution shall communicate honestly, resolve concerns respectfully and seek outcomes that strengthen confidence.",
      "Customer trust shall never be taken for granted.",
      "Every interaction represents an opportunity to reinforce the institution's reputation for fairness and professionalism.",
    ],
  },
  {
    id: "the-people-test",
    title: "The People Test",
    paragraphs: [
      "Before approving any significant decision, ask:",
      "Does this decision respect the dignity of the people affected?",
      "Would we regard this decision as fair if we ourselves were in their position?",
      "Does it create lasting value rather than merely extracting short-term benefit?",
      "If these questions cannot be answered confidently, the decision deserves further review.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Enduring institutions earn loyalty not only through the quality of their products and services but through the consistency with which they treat people.",
      "Respect strengthens trust.",
      "Trust strengthens relationships.",
      "Relationships strengthen institutions.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Institutions exist to serve people.",
      "People do not exist to serve institutions.",
      "The measure of our success shall therefore include not only what we build, but how we treat those whose lives we touch.",
    ],
  },
];

export const CANON_010_BODY = CANON_010_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_010_SUMMARY =
  "People are ends, never merely means — dignity, fairness, and respect in every relationship the institution touches.";

export const CANON_010_HISTORICAL_NOTES =
  "Tenth registered canon. First external-facing ethic of Volume 0 — defines how we treat people, not only who we are internally. Operationalized through the Human Impact Review. At 25–30 canons, a Canon Review Summit shall assess redundancy, conflict, order, and completeness — quality over quantity.";

/** Editorial applications — people-first design per CANON-010 */
export const CANON_010_PEOPLE_APPLICATIONS = [
  {
    institution: "Yike",
    perspective: [
      "A family behind every property purchase",
      "Listings verified with dignity — not suspicion as default",
      "Search and support designed for clarity, not confusion",
    ],
  },
  {
    institution: "Stankings Auto Hub",
    perspective: [
      "Every inspection represents someone's savings or livelihood",
      "Honest condition reporting — never overselling vehicle quality",
      "Customers informed when a vehicle is not right for them",
    ],
  },
  {
    institution: "BayRight",
    perspective: [
      "Escrow may represent a lifetime investment",
      "Transparent timelines and honest communication throughout",
      "Disputes resolved with fairness, not institutional convenience",
    ],
  },
  {
    institution: "BamSignal",
    perspective: [
      "Every match could become a marriage",
      "Privacy, consent, and dignity in how people are presented",
      "Reject manipulative engagement patterns",
    ],
  },
  {
    institution: "Hannahkings Education",
    perspective: [
      "Every student is someone's child",
      "Discipline with dignity; growth without humiliation",
      "Parents and students heard, not processed",
    ],
  },
  {
    institution: "Stankings Foundation",
    perspective: [
      "Every beneficiary is a person deserving dignity",
      "Aid delivered respectfully — not as charity theatre",
      "Programs evaluated for human impact, not only metrics",
    ],
  },
  {
    institution: "Engineering & AI",
    perspective: [
      "Accessibility, privacy, and clear communication by design",
      "AI supports human judgment — transparent, not opaque",
      "No dark patterns; systems adapt to people where possible",
    ],
  },
] as const;

export const CANON_010_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-010",
  sections: CANON_010_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-008", title: "Excellence Is a Discipline, Not an Event", href: "/library/canon/CANON-008", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "LEX-DIGNITY", title: "Lexicon: Dignity", href: "/library/lexicon/dignity", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-HIR-001", title: "Human Impact Review", href: "/library/frameworks/human-impact-review", relationship: "supports" },
    { identifier: "CANON-011", title: "Simplicity Creates Strength", href: "/library/canon/CANON-011", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Human Impact Review completed before customer-facing product launch",
      "Policy change evaluated for effect on vulnerable groups",
      "Product copy written for clarity, not manipulation",
      "AI feature with transparent limits and human override",
      "Customer complaint resolved with fairness over speed-to-close",
      "Respect shown regardless of title or purchasing power",
    ],
    poor: [
      "KPI optimization that degrades customer experience",
      "Dark patterns to increase conversion",
      "Automation that removes human dignity from support",
      "Policies that exploit information asymmetry",
      "Treating people as data points on a dashboard",
      "Efficiency gains that knowingly disadvantage vulnerable users",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that became efficient but indifferent",
      "Growth that forgot the human being on the other side",
      "Products optimized for metrics over relationships",
      "Respect reserved for the powerful",
    ],
    strengthenedTrust: [
      "Loyalty earned through consistent fair treatment",
      "Families who recommend institutions that treated them with dignity",
      "Engineers who design knowing real lives are affected",
      "Long-term relationships over transactional extraction",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-010 establishes that people are ends, never merely means. Success includes relationship quality, not only financial performance. The People Test asks whether dignity is respected, fairness would be accepted in our own position, and value is created rather than extracted.",
    fiveMinute:
      "Volume 0 turns outward — how we treat people. Customers, employees, partners, communities. Leaders exercise authority with empathy. Engineering avoids manipulative design; AI supports human judgment transparently. Human Impact Review gates customer-facing products, policies, and operational changes alongside PAF, TIA, EIA, and GRF.",
    fifteenMinute:
      "CANON-010 protects against the danger of scale — optimizing KPIs while forgetting the human being. Every Yike purchase has a family behind it; every Auto Hub inspection someone's savings; every BamSignal match potential marriage; every Hannahkings student someone's child. HIR captures who is affected, benefits and burdens, vulnerable groups, dignity impact, and relationship strength. Executive Decision No. 12 requires HIR for significant customer-facing changes. Editorial note: at 25–30 canons, conduct a Canon Review Summit for quality over quantity.",
  },
};
