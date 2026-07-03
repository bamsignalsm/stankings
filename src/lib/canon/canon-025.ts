import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_025_META = {
  identifier: "CANON-025",
  title: "Be Worthy of Endurance",
  statement:
    "An institution should seek not merely to survive through time, but to deserve its continued existence through faithful service, responsible stewardship and lasting contribution. Endurance is earned.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_025_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "An institution should seek not merely to survive through time, but to deserve its continued existence through faithful service, responsible stewardship and lasting contribution.",
      "Endurance is earned.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Longevity alone is not an achievement.",
      "An institution that survives while abandoning its purpose, principles or responsibilities has merely continued to exist.",
      "Stankings Group shall therefore seek to remain worthy of the trust placed in it by customers, employees, communities and future generations.",
      "Each generation shall earn the right to pass the institution forward.",
      "Endurance shall be understood as the continuing consequence of responsible stewardship rather than the automatic result of age.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "The institution shall regularly examine whether it continues to fulfil its purpose.",
      "Whether it deserves public trust.",
      "Whether it strengthens society.",
      "Whether it develops capable people.",
      "Whether it remains faithful to its Canons.",
      "Whether it continues creating value that justifies its existence.",
      "Institutions that no longer serve should reform.",
      "Institutions unwilling to reform risk losing the privilege of endurance.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall remember that they are temporary custodians of something intended to outlive them.",
      "Every generation must earn the confidence of the next.",
      "Leadership shall never assume that past achievements guarantee future legitimacy.",
      "Trust must be renewed continually through responsible action.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology shall evolve responsibly so that future generations inherit platforms that remain secure, understandable, maintainable and adaptable.",
      "Every architectural decision shall contribute to the long-term health of the institution.",
      "Engineering stewardship extends beyond software.",
      "It contributes to institutional endurance.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience an institution that consistently demonstrates why it deserves their confidence.",
      "The institution shall never assume loyalty.",
      "It shall earn loyalty repeatedly through professionalism, integrity and dependable service.",
      "Every interaction becomes an opportunity to justify continued trust.",
    ],
  },
  {
    id: "the-endurance-test",
    title: "The Endurance Test",
    paragraphs: [
      "Before making any significant decision, ask:",
      "Will this help future generations believe that Stankings Group deserved to endure?",
      "Will this strengthen the institution's legitimacy?",
      "Will this honour those who built before us and those who will inherit after us?",
      "If the answer is uncertain, reconsider the decision.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The institutions remembered with greatest respect are those that continually justified their existence through service rather than entitlement.",
      "Their longevity became the result of their contribution.",
      "Not the objective itself.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Serve faithfully.",
      "Steward responsibly.",
      "Improve continually.",
      "Remain worthy.",
      "Endurance is not inherited.",
      "It is earned by every generation.",
    ],
  },
];

export const CANON_025_BODY = CANON_025_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_025_SUMMARY =
  "Be worthy of endurance — earn the right to continue through faithful service, not mere survival.";

export const CANON_025_ENDURANCE_MOTTO =
  "Serve faithfully. Steward responsibly. Improve continually. Remain worthy.";

export const CANON_025_HISTORICAL_NOTES =
  "Twenty-fifth and closing canon of Volume 0 — The First Principles. Ties every prior Canon together: stewardship of civilization. Volume 0 opens with why institutions exist and closes with why they deserve to continue. Operationalized through the Canon Maturity Dashboard. Executive Decision No. 27 — required reading for leadership and custodians.";

/** The one question Volume 0 answers — editorial */
export const CANON_025_INSTITUTIONAL_QUESTION =
  "What is the institution actually responsible for — not just today, but forever?";

export const CANON_025_STEWARDSHIP_ANSWER = "Stewardship of civilization.";

/** Volume 0 complete narrative arc */
export const VOLUME_0_NARRATIVE_ARC = [
  { step: 1, theme: "Why institutions exist", anchor: "CANON-001" },
  { step: 2, theme: "What they must protect", anchor: "CANON-002" },
  { step: 3, theme: "How they should think", anchor: "CANON-006" },
  { step: 4, theme: "How they should grow", anchor: "CANON-016" },
  { step: 5, theme: "How they should serve", anchor: "CANON-022" },
  { step: 6, theme: "Why they should endure", anchor: "CANON-025" },
] as const;

/** What each institution preserves — civilization stewardship */
export const CANON_025_CIVILIZATION_STEWARDSHIP = [
  { institution: "Yike", preserves: "Trust in commerce" },
  { institution: "BayRight", preserves: "Trust in finance" },
  { institution: "Stankings Institute", preserves: "Leadership" },
  { institution: "Hannahkings Education", preserves: "Knowledge" },
  { institution: "Stankings Foundation", preserves: "Opportunity" },
  { institution: "BamSignal", preserves: "Trust in human connection" },
  { institution: "Stanhan", preserves: "Trust in property development" },
  { institution: "Stankings Auto Hub", preserves: "Trust in vehicle ownership" },
] as const;

/** A Letter to the Future Custodian — closing note, not a Canon */
export const LETTER_TO_FUTURE_CUSTODIAN = `If you are reading this many years from now, you may never have met the founders of Stankings Group.

That is as it should be.

Institutions are not built so that future generations remain dependent upon the personalities of those who came before them.

They are built so that enduring principles can outlive individuals.

These Canons are not intended to answer every question.

They are intended to help you ask better questions.

You will face circumstances we could never have imagined.

New technologies.

New markets.

New opportunities.

New crises.

Apply these Canons with wisdom, humility and courage.

Preserve what deserves preserving.

Improve what should be improved.

Leave the institution stronger than you found it.

If you do this faithfully, then whether Stankings Group endures for fifty years or five hundred, it will remain worthy of the trust placed in it.

That trust is now in your hands.`;

export const CANON_025_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-025",
  sections: CANON_025_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019", relationship: "depends_on" },
    { identifier: "CANON-022", title: "Create Value That Outlasts Us", href: "/library/canon/CANON-022", relationship: "depends_on" },
    { identifier: "CANON-023", title: "Remain Humble Enough to Learn", href: "/library/canon/CANON-023", relationship: "depends_on" },
    { identifier: "CANON-024", title: "Raise the Standard", href: "/library/canon/CANON-024", relationship: "depends_on" },
    { identifier: "LEX-ENDURANCE", title: "Lexicon: Endurance", href: "/library/lexicon/endurance", relationship: "references" },
    { identifier: "LEX-STEWARDSHIP", title: "Lexicon: Stewardship", href: "/library/lexicon/stewardship", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-CMD-001", title: "Canon Maturity Dashboard", href: "/library/canon-maturity", relationship: "supports" },
    { identifier: "constitution", title: "The Constitution — Volume I", href: "/library/constitution", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Decision passes Endurance Test — future generations would affirm legitimacy",
      "Institution reforms when no longer serving purpose",
      "Trust renewed through action, not assumed from history",
      "Volume 0 required reading develops shared institutional thinking",
      "Each generation earns the right to pass institution forward",
      "Canon Maturity Dashboard shows living operating system",
    ],
    poor: [
      "Longevity mistaken for legitimacy",
      "Past achievements assumed to guarantee future trust",
      "Institution continues existing while abandoning purpose",
      "Entitlement replaces earned endurance",
      "Volume 0 treated as static book, not living system",
      "Reform refused when institution no longer serves",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Survived centuries but abandoned purpose and principles",
      "Longevity without contribution — merely continued to exist",
      "Future generations questioned why institution deserved endurance",
      "Entitlement replaced stewardship",
    ],
    strengthenedTrust: [
      "Every generation earned the right to pass institution forward",
      "Longevity as consequence of contribution, not objective",
      "Universities, hospitals, libraries — justified existence through service",
      "Worthy of endurance for fifty years or five hundred",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-025 — Be Worthy of Endurance. Closing Volume 0 canon. Stewardship of civilization. Endurance Test. Canon Maturity Dashboard per ED 27. Letter to Future Custodian.",
    fiveMinute:
      "Volume 0 closes: why institutions deserve to continue. Not profit, technology, or trust alone — stewardship of civilization. Each generation earns endurance. CMD tracks Volume 0 as living OS. Required reading for leadership.",
    fifteenMinute:
      "Complete philosophical arc from CANON-001 to 025. Universities, banks, libraries preserve civilization — Stankings companies preserve trust, leadership, knowledge, opportunity. Reform or lose privilege of endurance. Next: Volume I Constitution. Trust now in future custodians' hands.",
  },
};
