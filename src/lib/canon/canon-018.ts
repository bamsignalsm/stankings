import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_018_META = {
  identifier: "CANON-018",
  title: "Principles Before Opportunity",
  statement:
    "No opportunity shall justify abandoning the principles upon which the institution is built. Enduring institutions protect their principles even when doing so requires sacrifice.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_018_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "No opportunity shall justify abandoning the principles upon which the institution is built.",
      "Enduring institutions protect their principles even when doing so requires sacrifice.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Every institution will encounter opportunities that promise rapid growth, increased revenue or strategic advantage.",
      "Some opportunities will require compromise. Others will require abandoning established standards.",
      "Stankings Group shall decline opportunities that materially conflict with its Canons, Constitution or institutional purpose.",
      "The institution shall seek prosperity through faithful adherence to principle rather than temporary advantage gained through compromise.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Institutional principles shall guide strategy. They shall guide acquisitions. They shall guide partnerships. They shall guide investments. They shall guide product development.",
      "Commercial attractiveness shall never become sufficient justification for violating institutional standards.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall possess the courage to decline opportunities that threaten institutional integrity.",
      "Leadership shall remember that every compromise creates a precedent.",
      "The standards accepted today become the culture inherited tomorrow.",
      "Every decision shall strengthen confidence that Stankings Group can be trusted to remain faithful to its principles.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall reject shortcuts that materially weaken security, privacy, maintainability, safety or institutional trust.",
      "Technical excellence requires disciplined restraint.",
      "Temporary convenience shall never justify permanent architectural weakness.",
      "Technology shall remain faithful to institutional standards.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should know that institutional standards do not change according to convenience, commercial pressure or customer status.",
      "Every customer deserves the same commitment to honesty, professionalism and fairness.",
      "Consistency strengthens confidence.",
    ],
  },
  {
    id: "the-principle-test",
    title: "The Principle Test",
    paragraphs: [
      "Before approving any significant opportunity, ask:",
      "Does this require compromising one or more institutional principles?",
      "Would we remain comfortable explaining this decision to future custodians?",
      "Will this strengthen or weaken confidence in the Stankings name?",
      "If institutional principles must be abandoned to pursue the opportunity, the opportunity should ordinarily be declined.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many institutions lose their identity gradually.",
      "Rarely through one dramatic decision.",
      "More often through a series of small compromises that slowly become accepted practice.",
      "The discipline to protect principles preserves institutional character.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Opportunities are temporary.",
      "Principles endure.",
      "When the two conflict, principles shall guide the institution.",
    ],
  },
];

export const CANON_018_BODY = CANON_018_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_018_SUMMARY =
  "Principles before opportunity — no growth shall require abandoning the standards that give the institution its identity.";

export const CANON_018_PRINCIPLE_MOTTO =
  "Opportunities are temporary. Principles endure.";

export const CANON_018_HISTORICAL_NOTES =
  "Eighteenth registered canon. Second Strategic Canon governing institutional restraint — protects the Group from a thousand tiny compromises. Operationalized through the Principles Alignment Review. Captures decisions such as declining BamBet: revenue without principle erodes trust-oriented identity. Future leaders ask not what Stanley would do, but whether proposals align with the Canons.";

export const CANON_018_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-018",
  sections: CANON_018_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-014", title: "Our Word Is a Commitment", href: "/library/canon/CANON-014", relationship: "depends_on" },
    { identifier: "CANON-016", title: "Build for Institutional Strength", href: "/library/canon/CANON-016", relationship: "depends_on" },
    { identifier: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017", relationship: "depends_on" },
    { identifier: "constitution", title: "Volume I — The Constitution", href: "/library/constitution", relationship: "references" },
    { identifier: "LEX-PRINCIPLE", title: "Lexicon: Principle", href: "/library/lexicon/principle", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-PAR-001", title: "Principles Alignment Review", href: "/library/frameworks/principles-alignment-review", relationship: "supports" },
    { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Declined BamBet — gambling revenue conflicted with trust-oriented ecosystem identity",
      "PAR completed before acquisition — auditable canon alignment matrix",
      "Leader declines partnership requiring data practices violating CANON-007",
      "Engineering rejects security shortcut despite launch pressure",
      "Same standards for all customers regardless of revenue potential",
      "Opportunity declined when Principle Test fails",
    ],
    poor: [
      "Just this once — compromising standards for rapid growth",
      "High-revenue customer exempted from verification standards",
      "Acquisition pursued without PAR or principle review",
      "Technical debt accepted permanently for temporary convenience",
      "Standards lowered quietly without institutional record",
      "Precedent set that future leaders inherit as culture",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that died through a thousand small compromises",
      "Revenue opportunities that eroded identity gradually",
      "Standards that changed with commercial pressure",
      "Leaders who could not explain decisions to future custodians",
    ],
    strengthenedTrust: [
      "Courage to decline misaligned opportunities",
      "Reputation for consistency over a century",
      "PAR creating auditable alignment records",
      "Principles protected during prosperity and pressure alike",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-018 — Principles Before Opportunity. No opportunity justifies abandoning institutional principles. The Principle Test before significant decisions. PAR required per Executive Decision No. 20. Protects identity from gradual compromise.",
    fiveMinute:
      "Strategic Canon governing restraint. Decline opportunities conflicting with Canons, Constitution, or purpose. Leadership courage, engineering discipline, customer consistency. Principle Test: compromise required? Explainable to future custodians? Strengthens Stankings name? BamBet example — gambling declined for trust identity. PAR with Canon Alignment Matrix for auditable records.",
    fifteenMinute:
      "CANON-018 protects the institution from itself at scale — when Yike has millions of users and BayRight moves billions. Not one catastrophe but thousand tiny compromises. PAR integrates PAF, TIA, EIA, ISA references with full canon matrix. Growth never requires abandoning identity. Reputation for consistency may prove more valuable than any declined opportunity.",
  },
};
