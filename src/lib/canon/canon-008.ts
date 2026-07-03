import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_008_META = {
  identifier: "CANON-008",
  title: "Excellence Is a Discipline, Not an Event",
  statement:
    "Excellence is achieved through disciplined habits practiced consistently over time.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_008_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Excellence is achieved through disciplined habits practiced consistently over time.",
      "It is not an occasional achievement.",
      "It is a permanent institutional commitment.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Stankings Group shall reject the pursuit of appearances over substance.",
      "Recognition, awards and public praise may reflect excellence, but they shall never define it.",
      "Excellence is demonstrated through the consistent quality of our work, the reliability of our systems, the professionalism of our people and the trust we earn through repeated actions.",
      "Every task, regardless of size or visibility, deserves the same commitment to quality.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "The institution shall establish clear standards, measurable outcomes and continuous improvement processes.",
      "Quality shall be designed into systems rather than inspected only after failures occur.",
      "Institutional excellence requires discipline in governance, engineering, finance, operations, customer service and every other area of responsibility.",
      "Shortcuts that weaken long-term quality shall be rejected.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall model the standards they expect from others.",
      "They shall encourage learning, coaching and continuous improvement rather than perfectionism or fear of failure.",
      "Performance shall be evaluated by sustained contribution, not isolated moments of success.",
      "Leaders shall celebrate disciplined improvement as much as exceptional achievement.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall value clean architecture, maintainable code, thoughtful testing, documentation and operational reliability.",
      "Quality shall be built into every stage of development.",
      "Technical excellence is measured not only by what is delivered today but by how confidently future engineers can understand, maintain and improve the work.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience consistent professionalism regardless of location, department or institution.",
      "Every interaction should reinforce confidence that Stankings Group maintains high standards because excellence is part of its culture, not because someone is watching.",
    ],
  },
  {
    id: "the-excellence-test",
    title: "The Excellence Test",
    paragraphs: [
      "Before completing any significant work, ask:",
      "Does this represent the standard we wish future generations to inherit?",
      "If our name appeared beside this work permanently, would we remain proud of it?",
      "If the answer is uncertain, continue improving.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Enduring institutions are rarely remembered for isolated moments of brilliance.",
      "They are remembered for decades of dependable excellence.",
      "The discipline to improve continually creates advantages that competitors often struggle to replicate.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Excellence is not a destination.",
      "It is the daily discipline of doing ordinary things extraordinarily well.",
      "That discipline shall define the culture of Stankings Group.",
    ],
  },
];

export const CANON_008_BODY = CANON_008_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_008_SUMMARY =
  "Excellence is a discipline, not an event — consistent quality in every task, designed into systems, not inspected only after failure.";

export const CANON_008_HISTORICAL_NOTES =
  "Eighth registered canon. First culture canon of Volume 0 — moves from philosophy to how we behave. Protects the institution from bureaucracy and appearances over substance. Operationalized through the Excellence Framework and Standards of Excellence per department.";

/** Editorial applications — excellence in practice per CANON-008 */
export const CANON_008_EXCELLENCE_APPLICATIONS = [
  {
    institution: "Yike",
    standards: [
      "Property listings verified properly",
      "Search results fast and reliable",
      "Photos meet quality standards",
      "Customer support responsive — because that's our standard",
    ],
  },
  {
    institution: "Stankings Auto Hub",
    standards: [
      "100-point inspection means 100 points — every time",
      "Not marketing — operational discipline",
      "Verification consistent regardless of vehicle value",
    ],
  },
  {
    institution: "Stanhan Real Estate",
    standards: [
      "Property verification consistent for ₦5M plots and ₦5B commercial properties",
      "Standards don't change because the customer changes",
    ],
  },
  {
    institution: "Hannahkings Education",
    standards: [
      "Excellence in teaching, administration, facilities and character development",
      "Every student encounter reflects institutional standards",
    ],
  },
  {
    institution: "Engineering",
    standards: [
      "Code reviews, security reviews, infrastructure standards",
      "Testing, documentation, incident response, performance optimization",
      "Quality built into every stage — not inspected only after failure",
    ],
  },
] as const;

export const CANON_008_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-008",
  sections: CANON_008_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "depends_on" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "depends_on" },
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "LEX-EXCELLENCE", title: "Lexicon: Excellence", href: "/library/lexicon/excellence", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-EXF-001", title: "Excellence Framework", href: "/library/frameworks/excellence", relationship: "supports" },
    { identifier: "excellence-standards", title: "Standards of Excellence", href: "/library/excellence", relationship: "supports" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "100-point vehicle inspection completed fully every time",
      "Property verification consistent regardless of transaction size",
      "Code review and testing before every production release",
      "Customer support response within documented SLA",
      "Documented Standard of Excellence for every recurring process",
      "Continuous improvement celebrated alongside exceptional achievement",
    ],
    poor: [
      "Shortcuts that weaken long-term quality for speed",
      "Appearance of excellence without substance",
      "Standards that change based on customer wealth",
      "Inspecting quality only after failures",
      "Processes without defined standard of excellence",
      "Celebrating isolated wins while ignoring sustained discipline",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions remembered for one brilliant moment then declined",
      "Quality inspected only after customer complaints",
      "Bureaucracy replacing value creation",
      "Standards that varied by who was watching",
    ],
    strengthenedTrust: [
      "Decades of dependable excellence",
      "Competitors unable to replicate disciplined habits",
      "Customers confident standards are cultural, not performative",
      "Ordinary tasks done extraordinarily well — repeatedly",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-008 establishes excellence as daily discipline — not occasional achievement. Reject appearances over substance. Every task deserves quality. The Excellence Test asks whether future generations would inherit this work with pride.",
    fiveMinute:
      "Excellence is habitual, not event-driven. Clear standards, measurable outcomes, and continuous improvement. Quality designed into systems. Leaders model standards and evaluate sustained contribution. Engineering values maintainability and testing. Customers experience consistency because excellence is culture. Standards of Excellence document what excellent looks like for every department and recurring process.",
    fifteenMinute:
      "CANON-008 begins Volume 0's culture canons — how we behave after philosophy defines what we believe. Institutional implications require standards and rejection of quality shortcuts. Leadership models standards and celebrates improvement. Engineering builds quality into every stage. The Excellence Test: would we remain proud if our name appeared beside this work permanently? The Excellence Framework operationalizes department standards, KPIs, checklists, improvement plans, and audit frequency. Executive Decision No. 10 requires documented Standards of Excellence for every recurring operational process.",
  },
};
