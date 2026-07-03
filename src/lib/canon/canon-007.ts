import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_007_META = {
  identifier: "CANON-007",
  title: "Truth Before Convenience",
  statement: "The institution shall always seek truth before convenience.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_007_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "The institution shall always seek truth before convenience.",
      "Convenience may simplify decisions.",
      "Truth ensures they remain correct.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Sound institutions are built upon accurate information, intellectual honesty and the courage to confront reality.",
      "Stankings Group shall therefore encourage truthfulness in reporting, communication, decision-making and self-assessment.",
      "Problems shall be identified early rather than hidden.",
      "Mistakes shall be acknowledged rather than concealed.",
      "Facts shall be examined before conclusions are reached.",
      "The institution shall value evidence over assumption, understanding over opinion and learning over ego.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution within the Group shall establish systems that promote transparency, accountability and honest reporting.",
      "Employees shall be encouraged to raise concerns responsibly without fear of retaliation.",
      "Audits, reviews and evaluations shall exist to reveal reality rather than merely confirm expectations.",
      "Institutional learning begins with institutional honesty.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall actively seek information that challenges their assumptions.",
      "Disagreement expressed respectfully and supported by evidence shall be regarded as a contribution rather than an act of disloyalty.",
      "Leaders shall admit mistakes promptly, communicate truthfully and make corrections with humility.",
      "A leader who hides reality weakens the institution.",
      "A leader who confronts reality strengthens it.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall measure systems objectively.",
      "Errors, outages, security weaknesses and technical debt shall be documented honestly.",
      "Metrics shall inform decisions.",
      "Testing shall reveal weaknesses rather than merely demonstrate success.",
      "Reliable systems are built by acknowledging imperfections before they become failures.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers deserve truthful communication.",
      "Pricing shall be clear.",
      "Capabilities shall not be exaggerated.",
      "Limitations shall be explained honestly.",
      "When mistakes occur, the institution shall communicate openly, take responsibility and work diligently toward resolution.",
      "Honesty during difficulty strengthens trust.",
    ],
  },
  {
    id: "the-truth-test",
    title: "The Truth Test",
    paragraphs: [
      "Before making any significant decision, ask:",
      "Are we responding to reality or merely to what we wish were true?",
      "Have we examined evidence carefully?",
      "Are we avoiding an uncomfortable truth because it is inconvenient?",
      "If uncertainty remains, seek additional understanding before proceeding.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many institutions fail not because they lack intelligence, resources or opportunity, but because they refuse to confront reality until correction becomes difficult.",
      "Enduring institutions cultivate cultures where truth is welcomed, evidence is respected and continuous learning becomes normal practice.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Truth is often demanding.",
      "Convenience is often attractive.",
      "Institutions that consistently choose truth build stronger foundations for every decision that follows.",
    ],
  },
];

export const CANON_007_BODY = CANON_007_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_007_SUMMARY =
  "Truth before convenience — evidence over assumption, reality over wishful thinking, honest reporting without fear of retaliation.";

export const CANON_007_HISTORICAL_NOTES =
  "Seventh registered canon. Defines how Stankings Group makes decisions — the backbone of board meetings, engineering reviews, acquisitions, hiring, and product roadmaps. Operationalized through the Institutional Decision Record system.";

export const CANON_007_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-007",
  sections: CANON_007_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "LEX-TRUTH", title: "Lexicon: Truth", href: "/library/lexicon/truth", relationship: "references" },
    { identifier: "LEX-TRUST", title: "Lexicon: Trust", href: "/library/lexicon/trust", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-008", title: "Excellence Is a Discipline, Not an Event", href: "/library/canon/CANON-008", relationship: "supports" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "supports" },
    { identifier: "FRAMEWORK-IDR-001", title: "Institutional Decision Record", href: "/library/frameworks/institutional-decision-record", relationship: "supports" },
    { identifier: "idr-registry", title: "Decision Record Registry", href: "/library/decisions", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Engineer rewarded for reporting security flaw early",
      "Auditor findings welcomed and acted upon",
      "Evidence-based disagreement in board deliberation",
      "Customer informed honestly when capability is limited",
      "Technical debt documented before it becomes crisis",
      "Institutional Decision Record capturing why, not just what",
    ],
    poor: [
      "Leaders who only want good news",
      "Hiding problems until correction is difficult",
      "Metrics manipulated to demonstrate success",
      "Capabilities exaggerated to customers",
      "Mistakes concealed rather than acknowledged",
      "Decisions made without examining evidence",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that refused to confront reality until too late",
      "Cultures where truth-telling became career risk",
      "Leaders surrounded by people afraid to disagree",
      "Organizations that confused optimism with evidence",
    ],
    strengthenedTrust: [
      "Institutions where truth was welcomed",
      "Leaders who rewarded early problem identification",
      "Engineering cultures documenting weaknesses honestly",
      "Decision records enabling learning across generations",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-007 requires truth before convenience — accurate information, intellectual honesty, and courage to confront reality. Problems identified early, mistakes acknowledged, evidence before conclusions.",
    fiveMinute:
      "Stankings Group values evidence over assumption and learning over ego. Institutional systems promote transparency and honest reporting without retaliation. Leaders seek challenging information; respectful disagreement with evidence strengthens the institution. Engineering documents errors and technical debt honestly. Customers receive truthful communication. The Truth Test asks whether we respond to reality or wishful thinking. Institutional Decision Records capture why decisions were made.",
    fifteenMinute:
      "CANON-007 defines how Stankings makes decisions — truth before convenience. It governs the Library, AI, engineering, auditors, board, and future executives. Institutional implications require transparency systems and audits that reveal reality. Leadership implications welcome evidence-based disagreement. Engineering implications require honest metrics and testing that reveals weaknesses. Customer implications forbid exaggeration and require open accountability. The Truth Test gates significant decisions. Historical reflection: institutions fail when they refuse reality. The Institutional Decision Record system operationalizes this canon — capturing decision statement, evidence, alternatives, risks, canon references, approvals, outcomes, and lessons learned. Executive Decision No. 9 requires IDRs for major architectural, governance, engineering, and strategic decisions.",
  },
};
