import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_019_META = {
  identifier: "CANON-019",
  title: "Leave It Better Than You Found It",
  statement:
    "Every custodian shall strive to leave the institution, its people, its knowledge, its systems and its communities stronger than they were entrusted to them. Stewardship is measured not by preservation alone, but by responsible improvement.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_019_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every custodian shall strive to leave the institution, its people, its knowledge, its systems and its communities stronger than they were entrusted to them.",
      "Stewardship is measured not by preservation alone, but by responsible improvement.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Every generation inherits the work of those who came before. No generation begins from nothing.",
      "Likewise, no generation has the right to pass forward an institution diminished by neglect, complacency or short-term thinking.",
      "Every role within Stankings Group carries an obligation to improve something.",
      "An engineer should improve systems. A teacher should improve learning. A manager should improve teams. A director should improve governance. A custodian should improve the institution itself.",
      "Progress is the responsibility of every generation.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution shall establish mechanisms for continuous improvement.",
      "Processes shall be reviewed. Knowledge shall be expanded. Technology shall evolve responsibly. Governance shall mature. Relationships shall deepen.",
      "The institution shall value incremental improvement as highly as transformational innovation.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall regard their period of stewardship as an opportunity to strengthen the institution for those who follow.",
      "Leadership success shall not be measured solely by financial performance, but by the quality of the systems, people, culture and opportunities left behind.",
      "Preparing capable successors is one of the highest expressions of responsible leadership.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall improve architecture, documentation, security, reliability and maintainability continuously.",
      "Code should not merely function. It should become easier to understand, easier to maintain and safer to operate over time.",
      "Every release should leave the platform stronger than the previous one.",
      "Technical stewardship is measured through accumulated improvement.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience institutions that become more trustworthy, more reliable and more valuable over time.",
      "Feedback shall contribute to meaningful improvement.",
      "The institution shall continuously refine products and services while remaining faithful to its principles.",
    ],
  },
  {
    id: "the-improvement-test",
    title: "The Improvement Test",
    paragraphs: [
      "Before concluding any project, initiative or period of stewardship, ask:",
      "What is measurably better because we were here?",
      "Which future burdens have we reduced?",
      "Which future opportunities have we created?",
      "Will those who follow inherit a stronger foundation?",
      "If no meaningful improvement can be identified, further reflection is required.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The institutions most admired across generations are rarely those that remained unchanged.",
      "They are those that preserved their principles while continually improving their capabilities.",
      "Improvement preserves relevance. Relevance sustains institutions.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Receive with gratitude.",
      "Improve with diligence.",
      "Pass forward with honour.",
      "Every generation shall leave the institution stronger than it inherited it.",
    ],
  },
];

export const CANON_019_BODY = CANON_019_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_019_SUMMARY =
  "Leave it better than you found it — every custodian strengthens the institution for those who follow.";

export const CANON_019_STEWARDSHIP_MOTTO =
  "Receive with gratitude. Improve with diligence. Pass forward with honour.";

export const CANON_019_HISTORICAL_NOTES =
  "Nineteenth registered canon. First Legacy Canon of Volume 0 — bridge between Family Constitution and Group Constitution. Operationalized through the Institutional Improvement Register and Annual Stewardship Review. Teaches custodians to ask what the institution gains because they served it, not what they get from it.";

/** Improvement obligation by role — CANON-019 */
export const CANON_019_IMPROVEMENT_BY_ROLE = [
  {
    role: "Engineer",
    obligation: "Improve systems — architecture, documentation, security, reliability, maintainability.",
  },
  {
    role: "Teacher",
    obligation: "Improve learning — curriculum, capability, character formation.",
  },
  {
    role: "Manager",
    obligation: "Improve teams — capability, culture, succession readiness.",
  },
  {
    role: "Director",
    obligation: "Improve governance — processes, accountability, institutional maturity.",
  },
  {
    role: "Custodian",
    obligation: "Improve the institution itself — principles preserved, capabilities compounded.",
  },
] as const;

export const CANON_019_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-019",
  sections: CANON_019_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-016", title: "Build for Institutional Strength", href: "/library/canon/CANON-016", relationship: "depends_on" },
    { identifier: "CANON-018", title: "Principles Before Opportunity", href: "/library/canon/CANON-018", relationship: "depends_on" },
    { identifier: "LEX-STEWARDSHIP", title: "Lexicon: Stewardship", href: "/library/lexicon/stewardship", relationship: "references" },
    { identifier: "LEX-IMPROVEMENT", title: "Lexicon: Improvement", href: "/library/lexicon/improvement", relationship: "references" },
    { identifier: "constitution", title: "Volume I — The Constitution", href: "/library/constitution", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-IIR-001", title: "Institutional Improvement Register", href: "/library/improvements", relationship: "supports" },
    { identifier: "FRAMEWORK-ASR-001", title: "Annual Stewardship Review", href: "/library/frameworks/annual-stewardship-review", relationship: "supports" },
    { identifier: "CANON-020", title: "Exercise Sound Judgment", href: "/library/canon/CANON-020", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Project closes with documented improvements in IIR",
      "Annual Stewardship Review answers all four questions",
      "Engineering release improves maintainability metrics",
      "Successor prepared before leadership transition",
      "Customer feedback drives measurable product improvement",
      "Stability maintained while incremental improvement continues",
    ],
    poor: [
      "Everything works fine — leave it alone",
      "Financial targets met but systems and people diminished",
      "No improvement record at project conclusion",
      "Knowledge lost when custodian departs",
      "Technical debt accumulated without remediation plan",
      "Next generation inherits weaker foundation",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that preserved appearance but not capability",
      "Generations that consumed without adding",
      "Complacency mistaken for stability",
      "Leaders who left no capable successors",
    ],
    strengthenedTrust: [
      "Each generation starting ahead of the previous",
      "Visible history of institutional maturation",
      "Improvement compounded over decades",
      "Family and Group Constitution aligned through stewardship",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-019 — Leave It Better Than You Found It. First Legacy Canon. Every custodian improves institution, people, knowledge, systems, communities. Improvement Test before closing projects. IIR and Annual Stewardship Review per Executive Decision No. 21.",
    fiveMinute:
      "Bridge between Family and Group Constitution. Not consume but add. Engineer improves systems, teacher learning, manager teams, director governance, custodian the institution. Stability good; improvement still required. IIR fields: problem, improvement, outcome, canons, knowledge updated. ASR four questions: preserve, improve, learn, foundation left.",
    fifteenMinute:
      "Why Stankings deserves to exist 500 years from now. Custodians memorize: receive with gratitude, improve with diligence, pass forward with honour. Protects against CEO complacency. Dashboards: improvements this quarter/year by category. Over decades visible maturation history. Mindset shift: what will institution gain because I served it? Compounding institution — each generation starts ahead.",
  },
};
