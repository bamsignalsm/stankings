import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_009_META = {
  identifier: "CANON-009",
  title: "Learn Continuously, Improve Deliberately",
  statement:
    "Learning shall never be regarded as an event. It is the continuous discipline through which institutions remain relevant, resilient and capable of serving future generations.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_009_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Learning shall never be regarded as an event.",
      "It is the continuous discipline through which institutions remain relevant, resilient and capable of serving future generations.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "No institution possesses complete knowledge.",
      "Markets evolve. Technology advances. Communities change. Laws develop. Customer expectations mature.",
      "The institution shall therefore cultivate humility, curiosity and disciplined learning.",
      "Learning shall not be pursued merely to acquire information.",
      "It shall be pursued to improve judgment, strengthen capability and increase service to society.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution within Stankings Group shall establish systems for reflection, review and continuous improvement.",
      "Success shall be studied. Failure shall be studied. Near misses shall be studied.",
      "Customer feedback shall be valued. Operational experience shall become institutional knowledge.",
      "Learning gained by one institution should strengthen the entire ecosystem.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall remain students throughout their period of stewardship.",
      "They shall encourage thoughtful questioning, professional development and respectful debate.",
      "Leadership shall not pretend to know everything.",
      "Wisdom grows when leaders continue learning from employees, customers, partners and changing circumstances.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall conduct architecture reviews, post-implementation reviews and incident retrospectives with the objective of learning rather than assigning blame.",
      "Technical debt, operational incidents and customer feedback shall become opportunities for improvement.",
      "Knowledge shall be documented and shared so that lessons learned become permanent institutional assets.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience institutions that become better over time.",
      "Feedback shall be welcomed respectfully.",
      "Where appropriate, customer insights shall influence improvements to products, services and processes.",
      "Continuous improvement is one expression of respect for those the institution serves.",
    ],
  },
  {
    id: "the-learning-test",
    title: "The Learning Test",
    paragraphs: [
      "Before concluding any significant project or decision, ask:",
      "What have we learned?",
      "What should we preserve?",
      "What should we improve?",
      "How will future teams benefit from this experience?",
      "If no learning has been captured, the work is incomplete.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The institutions that endure are not those that avoid mistakes.",
      "They are those that learn more effectively than others.",
      "Knowledge that remains only in individuals eventually disappears.",
      "Knowledge preserved within the institution strengthens every generation that follows.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Learning creates understanding.",
      "Understanding improves judgment.",
      "Better judgment strengthens institutions.",
      "Therefore, every experience shall become an opportunity to learn, improve and serve more effectively.",
    ],
  },
];

export const CANON_009_BODY = CANON_009_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_009_SUMMARY =
  "Learning is continuous discipline — success, failure, and near misses become institutional knowledge that strengthens judgment across the ecosystem.";

export const CANON_009_HISTORICAL_NOTES =
  "Ninth registered canon. Defines how Stankings Group learns — the competitive advantage of discipline, not secrecy. Operationalized through the Lessons Learned Repository and Executive Decision No. 11. Essential for an ecosystem spanning technology, real estate, finance, education, logistics and institutions yet to be founded.";

/** Editorial applications — learning in practice per CANON-009 */
export const CANON_009_LEARNING_APPLICATIONS = [
  {
    institution: "Engineering",
    practices: [
      "Post-implementation reviews after every significant release",
      "Incident retrospectives focused on learning, not blame",
      "Architecture reviews that produce documented Lessons Learned records",
      "Technical debt tracked with root causes and recommended improvements",
    ],
  },
  {
    institution: "Yike",
    practices: [
      "Customer feedback loops after major feature launches",
      "Property listing quality reviews — what worked, what didn't",
      "Near-miss fraud attempts studied and shared across verification teams",
    ],
  },
  {
    institution: "Stanhan Real Estate",
    practices: [
      "Development project close-outs with Lessons Learned before handover",
      "Client satisfaction reviews that become institutional knowledge",
      "Site selection decisions documented for future developments",
    ],
  },
  {
    institution: "Stankings Logistics",
    practices: [
      "Rollout retrospectives after new route or hub launches",
      "Operational incident reviews with root cause analysis",
      "Cross-institution sharing when logistics lessons apply to retail or real estate",
    ],
  },
  {
    institution: "Library Council",
    practices: [
      "Every canon and framework implementation produces an LLR",
      "Governance reviews captured as searchable institutional memory",
      "Canon alignment documented in every Lessons Learned record",
    ],
  },
] as const;

export const CANON_009_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-009",
  sections: CANON_009_SECTIONS,
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
    { identifier: "LEX-LEARNING", title: "Lexicon: Learning", href: "/library/lexicon/learning", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-LLR-001", title: "Lessons Learned Repository", href: "/library/frameworks/lessons-learned", relationship: "supports" },
    { identifier: "llr-registry", title: "Lessons Learned Registry", href: "/library/lessons", relationship: "supports" },
    { identifier: "CANON-010", title: "People Are Ends, Never Merely Means", href: "/library/canon/CANON-010", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Project closed only after Lessons Learned approved and stored in the Library",
      "Incident retrospective produces root causes and improvements — not blame",
      "Customer feedback systematically captured and cross-referenced to canons",
      "Engineering post-implementation review linked to related Knowledge Objects",
      "Near miss documented before it becomes a failure",
      "Learning from one institution shared across the ecosystem",
    ],
    poor: [
      "Projects declared complete without capturing lessons",
      "Retrospectives used to assign blame rather than improve",
      "Knowledge remains only in individuals who later depart",
      "Repeated mistakes because no institutional memory exists",
      "Customer feedback collected but never acted upon or recorded",
      "Success celebrated without studying what made it repeatable",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that repeated the same mistakes across generations",
      "Knowledge lost when key people departed",
      "Blame culture that suppressed honest retrospectives",
      "Learning treated as training event, not institutional discipline",
    ],
    strengthenedTrust: [
      "Institutions that learned faster than competitors",
      "Experience transformed into Library Knowledge Objects",
      "Future teams benefiting from documented lessons",
      "Self-improving ecosystem — people gain experience, experience becomes knowledge",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-009 establishes continuous learning as institutional discipline — not an event. Success, failure, and near misses become knowledge. The Learning Test asks what was learned, preserved, improved, and how future teams benefit. Without captured learning, work is incomplete.",
    fiveMinute:
      "Stankings Group spans many industries; survival requires becoming a learning institution. Leaders remain students. Engineering conducts blameless retrospectives. Customer feedback becomes improvement. The Lessons Learned Repository operationalizes Executive Decision No. 11 — no significant project closes without an approved LLR. Learning creates understanding; understanding improves judgment; judgment strengthens institutions.",
    fifteenMinute:
      "CANON-009 follows excellence (CANON-008) by defining how the institution improves over time. Institutional implications require reflection systems across all companies. Leadership encourages questioning without pretending omniscience. Engineering turns incidents and debt into documented assets. The Learning Test closes every significant initiative. The LLR framework captures project summary, objectives, outcomes, successes, challenges, root causes, lessons, improvements, canon and KO cross-references, teams, review date, and approval status. This creates a self-improving system — competitive advantage through discipline, not secrecy.",
  },
};
