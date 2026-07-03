import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_002_META = {
  identifier: "CANON-002",
  title: "Trust Is Institutional Capital",
  statement: "Trust is the greatest form of institutional capital.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_002_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Trust is the greatest form of institutional capital.",
      "Money may build institutions.",
      "Trust sustains them.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Financial capital enables institutions to begin.",
      "Institutional trust enables them to endure.",
      "Every decision made within Stankings Group shall therefore recognize trust as an asset requiring continual investment, careful protection and responsible stewardship.",
      "Trust is accumulated gradually through consistent conduct.",
      "It may be diminished rapidly through negligence, dishonesty or repeated failure to uphold institutional standards.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution within Stankings Group shall evaluate major decisions not only by financial return, but also by their effect upon institutional trust.",
      "A decision that increases revenue while materially damaging trust shall be regarded as strategically unsound.",
      "Long-term trust shall take precedence over short-term advantage.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Every leader shall remember that institutional trust is held in stewardship.",
      "Leadership shall therefore communicate truthfully, act transparently where appropriate, acknowledge mistakes responsibly and correct failures diligently.",
      "The reputation of the institution shall never depend upon appearances alone.",
      "It shall depend upon consistent integrity demonstrated over time.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Technology shall strengthen trust.",
      "Systems shall be designed to improve transparency, accountability, security, reliability and auditability.",
      "Products shall communicate clearly.",
      "Data shall be handled responsibly.",
      "Artificial intelligence shall assist human judgment without replacing institutional accountability.",
      "Engineering decisions shall prioritize resilience, privacy, security and user confidence.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Every interaction shall seek to increase confidence.",
      "Customers shall receive honest information.",
      "Clear expectations.",
      "Professional service.",
      "Respectful treatment.",
      "Reliable support.",
      "When the institution makes mistakes, it shall respond with honesty, responsibility and a genuine commitment to resolution.",
      "Trust grows when institutions respond well to adversity.",
    ],
  },
  {
    id: "the-trust-test",
    title: "The Trust Test",
    paragraphs: [
      "Before making any significant decision, ask:",
      "Will this decision strengthen or weaken the confidence that people place in the Stankings name?",
      "If the answer is uncertain, the decision deserves further examination.",
      "If the answer is negative, the decision should not proceed without compelling justification and appropriate governance.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Institutions accumulate many forms of capital.",
      "Financial capital.",
      "Human capital.",
      "Knowledge capital.",
      "Technological capital.",
      "The greatest of these is institutional trust.",
      "Without trust, every other form of capital gradually loses its value.",
      "Therefore, every custodian shall regard trust as one of the most valuable assets ever entrusted to their care.",
    ],
  },
];

export const CANON_002_BODY = CANON_002_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_002_SUMMARY =
  "Trust is institutional capital — the greatest asset an institution holds. Every decision shall be evaluated for its effect upon trust, not only financial return.";

export const CANON_002_HISTORICAL_NOTES =
  "Second registered canon. Establishes trust as measurable capital and introduces the Trust Test for institutional decision-making. Foundation for the Trust Impact Assessment (TIA) framework.";

export const CANON_002_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-002",
  sections: CANON_002_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "LS-002", title: "Lexicon: Trust", href: "/library/lexicon/trust", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "supports" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "supports" },
    { identifier: "FRAMEWORK-TIA-001", title: "Trust Impact Assessment", href: "/library/frameworks/trust-impact-assessment", relationship: "supports" },
    { identifier: "FRAMEWORK-PAF-001", title: "Purpose Assessment", href: "/library/frameworks/purpose-assessment", relationship: "references" },
  ],
  decisionExamples: {
    good: [
      "Escrow",
      "Vehicle inspection",
      "Property verification",
      "Audit logs",
      "Version history",
      "Two-factor authentication",
      "Transparent pricing",
    ],
    poor: [
      "Fake reviews",
      "Hidden charges",
      "Manipulative marketing",
      "Selling customer data",
      "Weak verification",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Accounting fraud",
      "Unsafe products",
      "Hidden fees",
      "Data misuse",
      "Corruption",
    ],
    strengthenedTrust: [
      "Transparent recalls",
      "Honest communication",
      "Customer-first policies",
      "Strong governance",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-002 defines trust as institutional capital — greater than financial capital. Every significant decision must pass the Trust Test: will it strengthen or weaken confidence in the Stankings name?",
    fiveMinute:
      "Trust is the greatest institutional capital. Money builds institutions; trust sustains them. Leaders steward trust through truthfulness and accountability. Engineering must strengthen trust through transparency, security, and auditability. Customers receive honest information and responsible resolution. The Trust Test governs every significant decision. TIA operationalizes this canon.",
    fifteenMinute:
      "CANON-002 elevates trust from a value to measurable capital. Institutional, leadership, engineering, and customer implications each require trust investment. The Trust Test asks whether a decision strengthens confidence in Stankings. Revenue without trust is strategically unsound. Historical lessons show trust lost through fraud, unsafe products, hidden fees, and data misuse — and strengthened through recalls, honesty, and governance. The Trust Impact Assessment Framework scores proposals objectively for boards.",
  },
};
