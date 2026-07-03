import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_017_META = {
  identifier: "CANON-017",
  title: "Reduce Uncertainty",
  statement:
    "The enduring purpose of Stankings Group is to reduce unnecessary uncertainty through trusted institutions, reliable systems and responsible innovation. Confidence enables progress.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_017_GROUP_MISSION =
  "We build trusted institutions that reduce uncertainty and increase confidence.";

export const CANON_017_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "The enduring purpose of Stankings Group is to reduce unnecessary uncertainty through trusted institutions, reliable systems and responsible innovation.",
      "Confidence enables progress.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Many of society's greatest challenges are rooted in uncertainty.",
      "People hesitate to buy because they are uncertain. They hesitate to trust because they are uncertain. They hesitate to invest because they are uncertain. They hesitate to build relationships because they are uncertain. They hesitate to plan for the future because they are uncertain.",
      "Stankings Group shall therefore seek to reduce unnecessary uncertainty wherever it responsibly can.",
      "The institution shall not promise certainty where certainty is impossible.",
      "Instead, it shall increase confidence through truth, verification, transparency, professionalism and trust.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution shall ask: What uncertainty exists? How can it be reduced?",
      "Can technology help? Can better information help? Can verification help? Can education help? Can governance help? Can trusted human expertise help?",
      "Reducing uncertainty shall become a strategic objective across the ecosystem.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall seek clarity before action.",
      "Good leadership reduces confusion, explains direction, creates confidence, and builds alignment.",
      "Leadership shall communicate honestly during uncertainty rather than pretending certainty where none exists.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering shall reduce uncertainty through dependable systems.",
      "Reliable infrastructure. Transparent workflows. Clear audit trails. Strong verification. Explainable AI where appropriate. Accurate records. Secure identity. Predictable user experiences.",
      "Technology shall reduce anxiety rather than create it.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should leave every interaction feeling more informed, more confident and better equipped to make important decisions.",
      "The institution shall empower informed choice rather than manipulate behaviour.",
      "Confidence is created when people understand both opportunities and risks.",
    ],
  },
  {
    id: "the-uncertainty-test",
    title: "The Uncertainty Test",
    paragraphs: [
      "Before launching any product, feature, policy or institution, ask:",
      "What uncertainty does this reduce?",
      "How will people become more confident because this exists?",
      "Can the reduction in uncertainty be measured?",
      "If uncertainty is not meaningfully reduced, reconsider whether the proposal creates sufficient value.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Societies progress when trustworthy institutions reduce uncertainty in commerce, education, finance, technology and public life.",
      "Confidence encourages participation. Participation creates opportunity. Opportunity strengthens communities.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Reduce uncertainty.",
      "Increase confidence.",
      "Strengthen trust.",
      "Enable progress.",
      "This shall remain one of the enduring contributions of Stankings Group to society.",
    ],
  },
];

export const CANON_017_BODY = CANON_017_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_017_SUMMARY =
  "Reduce uncertainty — the enduring purpose of Stankings Group is trusted institutions that increase confidence and enable progress.";

export const CANON_017_UNCERTAINTY_MOTTO =
  "Reduce uncertainty. Increase confidence. Enable progress.";

export const CANON_017_HISTORICAL_NOTES =
  "Seventeenth registered canon. Defining Strategic Canon of Volume 0 — unifies every company, product, and generation under one mission: reduced uncertainty through trusted institutions. Operationalized through the Uncertainty Reduction Framework. The real product of Stankings Group is not software, property, or finance — it is confidence.";

/** Editorial — why each institution exists per CANON-017 */
export const CANON_017_UNCERTAINTY_BY_INSTITUTION = [
  {
    institution: "Yike",
    slug: "yike",
    domain: "Commerce",
    uncertaintyReduced:
      "Uncertainty when buying, selling and renting property, vehicles and equipment — not simply listing them.",
  },
  {
    institution: "BayRight",
    slug: "bayright",
    domain: "Finance",
    uncertaintyReduced:
      "Uncertainty in financial transactions — escrow, settlement, identity, verification, future banking.",
  },
  {
    institution: "BamSignal",
    slug: "bamsignal",
    domain: "Relationships",
    uncertaintyReduced:
      "Uncertainty in human relationships — identity, compatibility, verification, trust, safety.",
  },
  {
    institution: "Stanhan",
    slug: "stanhan",
    domain: "Property & Construction",
    uncertaintyReduced:
      "Uncertainty in construction, development, valuation, verification and property management.",
  },
  {
    institution: "Stankings Auto Hub",
    slug: "stankings-auto-hub",
    domain: "Automotive",
    uncertaintyReduced:
      "Uncertainty in vehicle ownership — inspection, history, maintenance, verification, fleet, leasing.",
  },
  {
    institution: "Stankings Logistics",
    slug: "stankings-logistics",
    domain: "Movement",
    uncertaintyReduced:
      "Uncertainty in movement — tracking, scheduling, delivery, visibility, reliability.",
  },
  {
    institution: "Stankings Foundation",
    slug: "stankings-foundation",
    domain: "Society",
    uncertaintyReduced:
      "Uncertainty for vulnerable communities — opportunity through education, health, skills and sustainable support.",
  },
  {
    institution: "Hannahkings Education",
    slug: "hannahkings-education",
    domain: "Future",
    uncertaintyReduced:
      "Uncertainty about the future — equipping learners with knowledge, character and practical capability.",
  },
  {
    institution: "Stankings Institute",
    slug: "stankings-institute",
    domain: "Leadership",
    uncertaintyReduced:
      "Uncertainty in leadership — developing future custodians and institutional stewards.",
  },
] as const;

export const CANON_017_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-017",
  sections: CANON_017_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Every Institution Must Know Its Purpose", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Is Non-Negotiable", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-016", title: "Build for Institutional Strength", href: "/library/canon/CANON-016", relationship: "depends_on" },
    { identifier: "LEX-UNCERTAINTY", title: "Lexicon: Uncertainty", href: "/library/lexicon/uncertainty", relationship: "references" },
    { identifier: "ecosystem-map", title: "Ecosystem Map", href: "/library/ecosystem", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-URF-001", title: "Uncertainty Reduction Framework", href: "/library/frameworks/uncertainty-reduction", relationship: "supports" },
    { identifier: "CANON-018", title: "Principles Before Opportunity", href: "/library/canon/CANON-018", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Yike verification reduces buyer uncertainty — measurable trust score",
      "BayRight escrow reduces payment uncertainty",
      "Product launch answers: what uncertainty does this reduce?",
      "URF completed before new company proposal",
      "Explainable AI increases confidence without false certainty",
      "Customer leaves interaction more informed",
    ],
    poor: [
      "Feature adds complexity without reducing any uncertainty",
      "Promising certainty where impossible",
      "Listing without verification — uncertainty unchanged",
      "Dark patterns that manipulate rather than inform",
      "New company cannot articulate uncertainty reduced",
      "Technology that increases anxiety",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that promised certainty and failed",
      "Products that added confusion not confidence",
      "Uncertainty exploited for manipulation",
      "Fragmented ecosystem increasing customer anxiety",
    ],
    strengthenedTrust: [
      "Every institution reducing uncertainty in its domain",
      "Confidence business unifying the ecosystem",
      "Participation creating opportunity",
      "One sentence defining the Group for a century",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-017 defines Stankings Group's enduring purpose: reduce unnecessary uncertainty through trusted institutions. The Uncertainty Test before every launch. URF required per Executive Decision No. 19. Real product is confidence, not software or property.",
    fiveMinute:
      "The defining Strategic Canon. Yike through Foundation each exist to reduce uncertainty in a different domain. Group mission: build trusted institutions that reduce uncertainty and increase confidence. URF fields: what uncertainty exists, who experiences it, how proposal reduces it, measurable confidence improvement. Integrates trust, verification, platforms, truth.",
    fifteenMinute:
      "CANON-017 explains everything Stanley built — not companies but confidence. Property, relationships, money, construction, vehicles, movement, society, future, leadership — each reduces uncertainty differently. Does not promise impossible certainty; increases confidence through truth and verification. Fifty years from now: What does Stankings do? We build trusted institutions that reduce uncertainty and increase confidence. Consider first page of stankings.com, Constitution, leadership induction.",
  },
};
