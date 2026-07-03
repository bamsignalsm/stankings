import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_024_META = {
  identifier: "CANON-024",
  title: "Raise the Standard",
  statement:
    "Every institution within Stankings Group shall strive to raise the professional, ethical and operational standards of every industry in which it participates. Success shall be measured not only by market performance, but by the positive influence the institution has upon its wider ecosystem.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_024_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Every institution within Stankings Group shall strive to raise the professional, ethical and operational standards of every industry in which it participates.",
      "Success shall be measured not only by market performance, but by the positive influence the institution has upon its wider ecosystem.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "An institution should not merely participate in an industry. It should improve it.",
      "By demonstrating higher standards of professionalism, transparency, competence, trust and service, Stankings Group shall encourage continual improvement throughout the markets it serves.",
      "Competition shall be pursued through excellence rather than through lowering standards.",
      "Leadership within an industry begins with responsible example.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Each institution shall identify opportunities to strengthen its industry through better practices, responsible innovation, professional education and ethical leadership.",
      "Where appropriate, the Group shall contribute knowledge, participate in professional dialogue and support initiatives that improve the quality, safety and integrity of the industries it serves.",
      "The objective is not simply to succeed within existing standards.",
      "The objective is to help establish better standards.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall encourage responsible competition while maintaining respect for customers, competitors, regulators and professional partners.",
      "Institutional influence shall be exercised through demonstrated excellence rather than coercion.",
      "Leadership shall recognise that improving an industry ultimately benefits customers, society and the institution itself.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall build systems that become reference models for reliability, security, maintainability and transparency.",
      "Where appropriate, the institution may contribute tools, documentation, technical standards or responsible collaboration that strengthens the wider professional community.",
      "Engineering excellence should elevate expectations across the industry.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience higher standards of professionalism, transparency and trust because Stankings Group operates within the market.",
      "Choosing the institution should consistently represent choosing higher standards.",
      "The institution shall earn this reputation through action rather than assertion.",
    ],
  },
  {
    id: "the-standard-test",
    title: "The Standard Test",
    paragraphs: [
      "Before introducing a new product, service or practice, ask:",
      "Will this raise the standard of the industry?",
      "Will customers be better served because this exists?",
      "Will competitors be encouraged to improve?",
      "Will society benefit if this approach becomes widely adopted?",
      "If the answer is yes, the initiative contributes to institutional purpose beyond commercial success.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The institutions most respected across generations are often those that elevated expectations for everyone.",
      "Their influence extended beyond market share.",
      "They changed what customers came to expect.",
      "They demonstrated that better standards were both possible and sustainable.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Do not merely compete.",
      "Improve.",
      "Do not merely participate.",
      "Elevate.",
      "Leave every industry stronger than we found it.",
    ],
  },
];

export const CANON_024_BODY = CANON_024_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_024_SUMMARY =
  "Raise the standard — improve every industry we enter through excellence, not domination.";

export const CANON_024_STANDARD_MOTTO =
  "Do not merely compete. Improve. Do not merely participate. Elevate.";

export const CANON_024_TRUST_AMBITION =
  "Build something people can trust — not the biggest company, but the one that makes industries work better.";

export const CANON_024_HISTORICAL_NOTES =
  "Twenty-fourth registered canon. Among the final great pillars of Volume 0 before Constitutions, Governance Codes and Operating Standards. Companies become standard setters, not merely market participants. Operationalized through the Industry Leadership Dashboard (ILD). Dual mission: serve customers and improve the industry.";

/** Every company has two missions — editorial */
export const CANON_024_DUAL_MISSION = {
  missionOne: "Serve customers.",
  missionTwo: "Improve the industry.",
} as const;

/** Industry standards to raise — per ecosystem institution */
export const CANON_024_STANDARDS_BY_INSTITUTION = [
  {
    institution: "Yike",
    slug: "yike",
    industry: "Property marketplace",
    standardSetterGoal:
      "Change what Nigerians expect from property transactions — not become the largest marketplace.",
    standardsToRaise: [
      "Property verification",
      "Listing quality",
      "Escrow adoption",
      "Identity verification",
      "Trust scores",
      "Transparent pricing",
      "Professional inspection",
    ],
  },
  {
    institution: "Stankings Auto Hub",
    slug: "stankings-auto-hub",
    industry: "Automotive retail & fleet",
    standardSetterGoal:
      "Make 100-point inspections the expected standard — not become another dealership.",
    standardsToRaise: [
      "Vehicle inspection",
      "Maintenance records",
      "Fleet standards",
      "Import transparency",
      "Vehicle history verification",
      "Trust scores",
    ],
  },
  {
    institution: "Stanhan",
    slug: "stanhan",
    industry: "Real estate development",
    standardSetterGoal:
      "Raise expectations for construction quality and project governance — not simply build houses.",
    standardsToRaise: [
      "Construction quality",
      "Documentation",
      "Project management",
      "Property verification",
      "Due diligence",
      "Long-term maintenance",
    ],
  },
  {
    institution: "BayRight",
    slug: "bayright",
    industry: "Financial services & payments",
    standardSetterGoal:
      "Raise expectations for escrow and settlement transparency — not just move money.",
    standardsToRaise: [
      "Escrow",
      "Payment trust",
      "Settlement transparency",
      "Fraud prevention",
      "Financial accountability",
      "Customer protection",
    ],
  },
  {
    institution: "BamSignal",
    slug: "bamsignal",
    industry: "Social connection & matching",
    standardSetterGoal:
      "Raise expectations for safety and verified identity — not become another social app.",
    standardsToRaise: [
      "Identity verification",
      "Safety",
      "Respectful communication",
      "Responsible matching",
      "Digital trust",
    ],
  },
  {
    institution: "Stankings Logistics",
    slug: "stankings-logistics",
    industry: "Logistics & freight",
    standardSetterGoal:
      "Raise expectations for shipment transparency and reliability across regional commerce.",
    standardsToRaise: [
      "Shipment tracking",
      "Delivery accountability",
      "Fleet safety",
      "Cross-border documentation",
    ],
  },
  {
    institution: "Hannahkings Education",
    slug: "hannahkings-education",
    industry: "Education",
    standardSetterGoal:
      "Raise expectations for ethical formation and professional readiness — not buildings alone.",
    standardsToRaise: [
      "Curriculum excellence",
      "Stewardship formation",
      "Professional ethics",
      "Measurable learning outcomes",
    ],
  },
  {
    institution: "Stankings Institute",
    slug: "stankings-institute",
    industry: "Professional development",
    standardSetterGoal:
      "Raise expectations for custodian formation and institutional leadership standards.",
    standardsToRaise: [
      "Leadership formation",
      "Governance literacy",
      "Professional standards",
      "Industry dialogue",
    ],
  },
] as const;

export const CANON_024_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-024",
  sections: CANON_024_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-008", title: "Pursue Excellence Relentlessly", href: "/library/canon/CANON-008", relationship: "depends_on" },
    { identifier: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017", relationship: "depends_on" },
    { identifier: "CANON-022", title: "Create Value That Outlasts Us", href: "/library/canon/CANON-022", relationship: "depends_on" },
    { identifier: "CANON-023", title: "Remain Humble Enough to Learn", href: "/library/canon/CANON-023", relationship: "depends_on" },
    { identifier: "LEX-STANDARD", title: "Lexicon: Standard", href: "/library/lexicon/standard", relationship: "references" },
    { identifier: "LEX-EXCELLENCE", title: "Lexicon: Excellence", href: "/library/lexicon/excellence", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-ILD-001", title: "Industry Leadership Dashboard", href: "/library/industry-leadership", relationship: "supports" },
    { identifier: "CANON-025", title: "Be Worthy of Endurance", href: "/library/canon/CANON-025", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Yike verification raises property transaction expectations industry-wide",
      "Auto Hub 100-point inspection becomes reference standard",
      "BayRight escrow transparency encourages competitor improvement",
      "Initiative passes Standard Test — industry elevated",
      "ILD annual progress reported in Stewardship Report",
      "Competition through excellence, not lowered standards",
    ],
    poor: [
      "Market share pursued by lowering professional standards",
      "Domination or monopoly as primary ambition",
      "Success measured only internally, not industry influence",
      "Competitors coerced rather than inspired by example",
      "Reputation asserted without demonstrated higher standards",
      "Participate in industry without improving it",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Biggest company but industry standards unchanged or lowered",
      "Market leadership through extraction, not elevation",
      "Customers expect less because institution competed down",
      "Domination without professional contribution",
    ],
    strengthenedTrust: [
      "Things work better because Stankings Group is in the industry",
      "Competitors improve to match demonstrated excellence",
      "Customer expectations permanently elevated",
      "Industry left stronger than institution found it",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-024 — Raise the Standard. Final Volume 0 pillar. Every institution improves its industry through excellence. Industry Leadership Dashboard per ED 26. Standard Test before new products. Dual mission: serve customers, improve industry.",
    fiveMinute:
      "Not domination or monopoly — make industries better. Yike through BamSignal each raise specific standards. Competition through excellence. ILD tracks standards to raise and annual progress in Stewardship Reports.",
    fifteenMinute:
      "Stanley's pattern: build something people trust, not the biggest company. Standard setters not merely businesses. Will this raise industry standards? Will competitors improve? ED 26 — every institution identifies standards to elevate. Volume 0 approaching completion before Constitutions and Governance Codes.",
  },
};
