import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_015_META = {
  identifier: "CANON-015",
  title: "Accountability Builds Resilience",
  statement:
    "Accountability strengthens institutions. Avoiding responsibility weakens them. The institution shall therefore acknowledge its decisions, learn from its failures and continually improve through responsible action.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_015_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Accountability strengthens institutions.",
      "Avoiding responsibility weakens them.",
      "The institution shall therefore acknowledge its decisions, learn from its failures and continually improve through responsible action.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Stankings Group recognizes that mistakes, unexpected events and changing circumstances are inevitable.",
      "Institutional strength is therefore measured not by the absence of failure, but by the integrity, professionalism and discipline with which failure is addressed.",
      "Every individual shall accept responsibility appropriate to their role.",
      "Every institution shall seek understanding before assigning blame.",
      "Every failure shall become an opportunity to strengthen the institution.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "The Group shall establish systems that encourage responsible reporting, fair investigation and timely corrective action.",
      "Incidents shall be documented.",
      "Root causes shall be identified.",
      "Lessons shall be preserved.",
      "Corrective actions shall be monitored.",
      "Institutional memory shall prevent repeated mistakes.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall accept responsibility for the performance of the systems entrusted to them.",
      "Leadership shall neither conceal failures nor seek unnecessary scapegoats.",
      "Leaders shall distinguish between: honest mistakes, negligence, misconduct, and systemic weaknesses.",
      "Each requires an appropriate and proportionate response.",
      "Leadership accountability strengthens institutional trust.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall conduct blameless incident reviews focused upon understanding rather than punishment.",
      "Every significant incident shall produce: a timeline, root cause analysis, corrective actions, preventive improvements, and Knowledge Objects.",
      "The objective is resilient systems, not faultless people.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "When customers are affected by institutional failures, the institution shall respond with honesty, empathy and urgency.",
      "Where appropriate, customers shall receive clear explanations, meaningful updates and fair resolutions.",
      "The manner in which the institution responds during difficulty shall become part of its reputation.",
    ],
  },
  {
    id: "the-accountability-test",
    title: "The Accountability Test",
    paragraphs: [
      "Before closing any significant incident, ask:",
      "Have we understood what happened?",
      "Have we accepted appropriate responsibility?",
      "Have we corrected the underlying causes?",
      "Have we preserved the lessons for future generations?",
      "If not, the work remains incomplete.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Institutions rarely become stronger by denying mistakes.",
      "They become stronger by confronting reality, learning honestly and improving systematically.",
      "Accountability transforms failure into institutional wisdom.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Responsibility creates learning.",
      "Learning creates resilience.",
      "Resilience creates enduring institutions.",
      "Accountability shall therefore remain a permanent discipline of Stankings Group.",
    ],
  },
];

export const CANON_015_BODY = CANON_015_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_015_SUMMARY =
  "Accountability builds resilience — failures addressed with integrity become institutional wisdom, not repeated harm.";

export const CANON_015_ACCOUNTABILITY_MOTTO =
  "Responsibility creates learning. Learning creates resilience.";

export const CANON_015_HISTORICAL_NOTES =
  "Fifteenth registered canon. First Resilience Canon of Volume 0 — governs how the institution responds when things go wrong. Operationalized through the Institutional Incident & Accountability Framework and Incident Center. Determines whether Stankings survives its first major crisis with trust intact.";

export const CANON_015_ACCOUNTABILITY_APPLICATIONS = [
  {
    institution: "Yike",
    scenario: "Fraudulent property listing bypasses verification — customer loses confidence.",
    weakResponse: "\"It wasn't our fault.\"",
    strongResponse:
      "What happened? How? Which controls failed? How do we prevent it? How do we make things right?",
  },
  {
    institution: "BayRight",
    scenario: "Payment settlement delayed.",
    weakResponse: "Silence until pressure forces disclosure.",
    strongResponse: "Acknowledge. Investigate. Communicate. Resolve. Learn. Improve.",
  },
  {
    institution: "Engineering",
    scenario: "Production outage.",
    weakResponse: "Blame individuals; no documentation.",
    strongResponse:
      "Blameless review: timeline, root cause, recovery, prevention, Knowledge Objects, LLR update.",
  },
] as const;

export const CANON_015_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-015",
  sections: CANON_015_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Is Non-Negotiable", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-010", title: "People Are Ends, Never Merely Means", href: "/library/canon/CANON-010", relationship: "depends_on" },
    { identifier: "CANON-014", title: "Our Word Is a Commitment", href: "/library/canon/CANON-014", relationship: "depends_on" },
    { identifier: "LEX-ACCOUNTABILITY", title: "Lexicon: Accountability", href: "/library/lexicon/accountability", relationship: "references" },
    { identifier: "FRAMEWORK-LLR-001", title: "Lessons Learned Review", href: "/library/frameworks/lessons-learned", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-IIAF-001", title: "Institutional Incident & Accountability Framework", href: "/library/frameworks/incident-accountability", relationship: "supports" },
    { identifier: "incident-center", title: "Incident Center", href: "/library/incidents", relationship: "supports" },
    { identifier: "canon-dashboard", title: "Canon Dashboard", href: "/library/canon-dashboard", relationship: "supports" },
    { identifier: "CANON-016", title: "Build for Institutional Strength", href: "/library/canon/CANON-016", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Blameless post-incident review with root cause and preventive actions",
      "Customer notified promptly with fair resolution",
      "Incident Knowledge Object feeds Lessons Learned Repository",
      "Leader accepts system responsibility without scapegoating",
      "Corrective actions monitored to completion",
      "Near-miss captured before production impact",
    ],
    poor: [
      "Denying or concealing institutional failures",
      "Blame culture preventing honest reporting",
      "Incident closed without root cause analysis",
      "Same failure repeated — no institutional memory",
      "Customers left without explanation during difficulty",
      "Retrospective skipped to move on quickly",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Denying mistakes until evidence forces admission",
      "Scapegoating instead of fixing systems",
      "Incidents forgotten — lessons lost",
      "Crisis response eroding decades of credibility",
    ],
    strengthenedTrust: [
      "Honest response during difficulty becoming reputation",
      "Every outage making the platform stronger",
      "Experience → Knowledge → Better Decisions → Stronger Institution",
      "Accountability transforming failure into wisdom",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-015 requires accountable response to failure — understand, accept appropriate responsibility, correct causes, preserve lessons. Blameless engineering reviews. Incident Knowledge Objects feed LLR. The Accountability Test before closing any significant incident.",
    fiveMinute:
      "First Resilience Canon. Distinguish honest mistakes, negligence, misconduct, systemic weakness. IIAF produces Incident Records with timeline, RCA, corrective/preventive actions. Executive Decision No. 17: material incidents conclude with review, LLR, preventive plan, Library update. Incident Center operational; feeds Lessons Learned Repository.",
    fifteenMinute:
      "CANON-015 decides whether Stankings survives its first major crisis. Not whether we fail — how we respond. Yike fraud, BayRight delays, engineering outages: acknowledge, investigate, learn, improve. Leaders neither conceal nor scapegoat. Customers receive honesty and fair resolution. Canon Dashboard bridges philosophy to implementation. Resilience engineered over generations through accountable learning.",
  },
};
