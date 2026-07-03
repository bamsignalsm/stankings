import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_022_META = {
  identifier: "CANON-022",
  title: "Create Value That Outlasts Us",
  statement:
    "The ultimate measure of an institution is not what it accumulates, but what it leaves behind for society. Enduring institutions create value that continues to serve long after their founders are gone.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_022_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "The ultimate measure of an institution is not what it accumulates, but what it leaves behind for society.",
      "Enduring institutions create value that continues to serve long after their founders are gone.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Financial success enables an institution to grow. Enduring value gives an institution lasting significance.",
      "Stankings Group shall therefore seek to create value that strengthens individuals, families, businesses, communities and future generations.",
      "The institution shall aspire to leave society more capable, more trustworthy and more prosperous than it found it.",
      "Its legacy shall be measured not only in assets owned, but in opportunities created, knowledge shared and lives positively influenced.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution within Stankings Group shall seek opportunities to create lasting value beyond its immediate commercial objectives.",
      "This may include: developing people; strengthening industries; improving professional standards; sharing knowledge responsibly; supporting entrepreneurship; creating employment; encouraging responsible innovation; investing in community resilience.",
      "Commercial success and societal contribution shall reinforce one another.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall evaluate success not only by quarterly performance, but by the enduring contribution their stewardship makes to society.",
      "Leadership shall encourage initiatives that produce long-term public value while remaining faithful to the institution's purpose and responsibilities.",
      "Influence shall be exercised with humility and responsibility.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology shall be developed with the intention of creating durable public benefit.",
      "Systems should improve access, transparency, efficiency and trust.",
      "Where appropriate, institutional platforms may enable responsible collaboration with governments, educational institutions, businesses and other trusted organizations.",
      "Engineering shall seek solutions that remain valuable beyond immediate commercial cycles.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience institutions that contribute positively to the communities in which they operate.",
      "Every interaction should reinforce confidence that choosing Stankings Group also supports broader societal progress through responsible business practices, employment, education and community investment.",
    ],
  },
  {
    id: "the-legacy-test",
    title: "The Legacy Test",
    paragraphs: [
      "Before approving any significant initiative, ask:",
      "What lasting value will remain because this exists?",
      "Will future generations benefit from this decision?",
      "Does this strengthen society as well as the institution?",
      "If the institution disappeared one hundred years from now, what positive contribution would still remain?",
      "These questions shall guide long-term stewardship.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The institutions most respected throughout history are remembered not solely for their commercial achievements, but for the enduring value they contributed to society.",
      "Buildings eventually age. Technologies eventually change.",
      "Lasting contributions continue through the people, knowledge and opportunities they create.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Build responsibly.",
      "Serve faithfully.",
      "Create lasting value.",
      "Leave society stronger than we found it.",
      "That shall remain one of the enduring ambitions of Stankings Group.",
    ],
  },
];

export const CANON_022_BODY = CANON_022_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_022_SUMMARY =
  "Create value that outlasts us — leave Nigeria and Africa more capable, trustworthy, and prosperous than we found them.";

export const CANON_022_LEGACY_MOTTO =
  "Build responsibly. Serve faithfully. Create lasting value.";

export const CANON_022_NATION_BUILDING_AMBITION =
  "Leave Nigeria—and hopefully Africa—a little better than we found it.";

export const CANON_022_HISTORICAL_NOTES =
  "Twenty-second registered canon. First Civilization Canon of Volume 0 — Stankings Group as nation-building institution, not merely economic. Operationalized through the Legacy Dashboard and Annual Stewardship Reports. Not political or ideological; institutional. Measured by what value still exists because we were here.";

/** Legacy beyond balance sheet — per institution */
export const CANON_022_LEGACY_BY_INSTITUTION = [
  {
    institution: "Yike",
    slug: "yike",
    beyondBalanceSheet:
      "Making property transactions more trustworthy across Nigeria — not remembered as a listing website.",
  },
  {
    institution: "BayRight",
    slug: "bayright",
    beyondBalanceSheet:
      "Making secure payments and trusted escrow accessible — not remembered as another fintech.",
  },
  {
    institution: "BamSignal",
    slug: "bamsignal",
    beyondBalanceSheet:
      "Safer, more meaningful relationships built on trust and verification — not another social platform.",
  },
  {
    institution: "Hannahkings Education",
    slug: "hannahkings-education",
    beyondBalanceSheet:
      "Generations of educated, ethical and capable young people — not school buildings alone.",
  },
  {
    institution: "Stankings Foundation",
    slug: "stankings-foundation",
    beyondBalanceSheet:
      "Opportunity where opportunity was scarce — not donations alone.",
  },
  {
    institution: "Stankings Institute",
    slug: "stankings-institute",
    beyondBalanceSheet:
      "Leaders, builders and custodians who strengthened communities — not conferences alone.",
  },
  {
    institution: "Stanhan",
    slug: "stanhan",
    beyondBalanceSheet:
      "Professional standards in construction, valuation and property development across the industry.",
  },
  {
    institution: "Stankings Auto Hub",
    slug: "stankings-auto-hub",
    beyondBalanceSheet:
      "Trustworthy vehicle ownership and fleet standards that raise automotive confidence.",
  },
  {
    institution: "Stankings Logistics",
    slug: "stankings-logistics",
    beyondBalanceSheet:
      "Reliable movement of goods that enables commerce and opportunity across regions.",
  },
] as const;

export const CANON_022_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-022",
  sections: CANON_022_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019", relationship: "depends_on" },
    { identifier: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021", relationship: "depends_on" },
    { identifier: "stankings-foundation", title: "Stankings Foundation", href: "/library/ecosystem/stankings-foundation", relationship: "references" },
    { identifier: "LEX-LEGACY", title: "Lexicon: Legacy", href: "/library/lexicon/legacy", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-LEGACY-001", title: "Legacy Dashboard", href: "/library/legacy", relationship: "supports" },
    { identifier: "CANON-023", title: "Remain Humble Enough to Learn", href: "/library/canon/CANON-023", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Annual Stewardship Report published — performance and societal contribution",
      "Initiative passes Legacy Test — value remains in 100 years",
      "Yike verification strengthens property trust across Nigeria",
      "Foundation creates opportunity, not dependency",
      "Commercial success reinforces societal contribution",
      "Jobs and training documented in Legacy Dashboard",
    ],
    poor: [
      "Success measured only by quarterly revenue",
      "Societal contribution as marketing, not stewardship",
      "Initiative benefits institution but weakens society",
      "No Annual Stewardship Report published",
      "Empire-building language without measurable value",
      "Community investment without accountability",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions remembered for extraction, not contribution",
      "Commercial success without societal trust",
      "Buildings without people or knowledge left behind",
      "Founders celebrated but communities unchanged",
    ],
    strengthenedTrust: [
      "Value that outlasts founders across generations",
      "Nigeria and Africa more capable because institution existed",
      "Someone who never knew Stanley still benefits",
      "Legacy measured in opportunities, not monuments",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-022 — Create Value That Outlasts Us. First Civilization Canon. Nation-building institution — leave society stronger. Legacy Test before significant initiatives. Legacy Dashboard and Annual Stewardship Reports per ED 24.",
    fiveMinute:
      "Not political or ideological; institutional. Financial success enables growth; enduring value gives significance. Legacy Dashboard: institutional performance + societal contribution metrics. Yike through Institute each have legacy beyond balance sheet. Report for accountability, not self-congratulation.",
    fifteenMinute:
      "Stanley's ambition: leave Nigeria and Africa a little better. Ultimate measure: what we leave behind for society. Jobs, training, scholarships, verified transactions, fraud prevented, knowledge published, community projects. If institution disappeared in 100 years — what positive contribution remains? Canons end with legacy, not profitability alone.",
  },
};
