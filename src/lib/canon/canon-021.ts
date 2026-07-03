import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_021_META = {
  identifier: "CANON-021",
  title: "Knowledge Is an Institutional Asset",
  statement:
    "Knowledge created through the work of the institution shall be preserved, improved and responsibly shared for the benefit of present and future generations. Knowledge lost is institutional capability diminished.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_021_DYNASTY_SENTENCE =
  "The dynasty must stand 500 years after I am gone — knowledge cannot die with people.";

export const CANON_021_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Knowledge created through the work of the institution shall be preserved, improved and responsibly shared for the benefit of present and future generations.",
      "Knowledge lost is institutional capability diminished.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Every project, decision, innovation, success, failure and experience has the potential to strengthen the institution when its lessons are preserved.",
      "Knowledge shall therefore be regarded as an institutional asset deserving the same care as financial resources, technology platforms and physical infrastructure.",
      "Individuals contribute knowledge. The institution preserves it. Future generations build upon it.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every institution shall establish systems for documenting important knowledge.",
      "Policies. Architectures. Lessons learned. Research. Operational procedures. Customer insights. Governance decisions. Training materials. Institutional history.",
      "Knowledge shall remain discoverable, current and appropriately governed.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall encourage knowledge sharing rather than knowledge hoarding.",
      "Professional expertise shall be developed across teams.",
      "Critical knowledge shall never depend solely upon one individual.",
      "Leadership shall regard the creation of institutional knowledge as a responsibility of stewardship.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall document architecture, decisions, interfaces, standards, deployment processes, security practices and operational experience.",
      "Code explains what the system does. Documentation explains why.",
      "Institutional knowledge transforms maintainable software into sustainable platforms.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers benefit when institutions learn from experience.",
      "Better documentation. Better products. Better support. Better training. Better communication.",
      "Preserved knowledge improves every future interaction.",
    ],
  },
  {
    id: "the-knowledge-test",
    title: "The Knowledge Test",
    paragraphs: [
      "Before closing any important initiative, ask:",
      "What have we learned?",
      "Has that learning been preserved?",
      "Can future teams discover it easily?",
      "Will future custodians begin from this knowledge rather than repeating the same work?",
      "If knowledge has not been preserved, the work remains incomplete.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Civilizations advanced because knowledge survived those who first discovered it.",
      "Institutions endure for the same reason.",
      "Knowledge preserved compounds across generations.",
      "Knowledge forgotten forces every generation to begin again.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Acquire knowledge.",
      "Preserve knowledge.",
      "Share knowledge responsibly.",
      "Improve knowledge continuously.",
      "Institutional wisdom shall become one of the greatest assets of Stankings Group.",
    ],
  },
];

export const CANON_021_BODY = CANON_021_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_021_SUMMARY =
  "Knowledge is an institutional asset — preserve, improve, and share for present and future generations.";

export const CANON_021_KNOWLEDGE_MOTTO =
  "Acquire. Preserve. Share. Improve.";

export const CANON_021_HISTORICAL_NOTES =
  "Twenty-first registered canon. Constitutional treatment of knowledge as asset — explains why the Library, Knowledge Objects, Lexicon, IDR, LLR, Canon, Constitution, Founder Letters, and Custodian Programme exist. Operationalized through the Institutional Knowledge Graph. Protect knowledge with the same seriousness as capital.";

/** Knowledge domains per ecosystem institution — CANON-021 */
export const CANON_021_KNOWLEDGE_BY_INSTITUTION = [
  {
    institution: "Yike",
    slug: "yike",
    knowledgeDomains:
      "Fraud cases, successful transactions, property verification, customer journeys, engineering decisions.",
  },
  {
    institution: "BamSignal",
    slug: "bamsignal",
    knowledgeDomains:
      "Moderation lessons, safety improvements, compatibility insights, abuse patterns.",
  },
  {
    institution: "BayRight",
    slug: "bayright",
    knowledgeDomains:
      "Escrow cases, payment issues, compliance updates, financial controls.",
  },
  {
    institution: "Stanhan",
    slug: "stanhan",
    knowledgeDomains:
      "Engineering reports, valuations, construction projects, legal due diligence.",
  },
  {
    institution: "Stankings Auto Hub",
    slug: "stankings-auto-hub",
    knowledgeDomains:
      "Inspections, maintenance trends, import lessons, fleet optimization.",
  },
  {
    institution: "Stankings Logistics",
    slug: "stankings-logistics",
    knowledgeDomains: "Routing intelligence, delivery patterns, fleet operations, visibility systems.",
  },
  {
    institution: "Hannahkings Education",
    slug: "hannahkings-education",
    knowledgeDomains: "Curriculum, pedagogy, learner outcomes, stewardship formation.",
  },
  {
    institution: "Stankings Institute",
    slug: "stankings-institute",
    knowledgeDomains: "Leadership development, custodian training, institutional research.",
  },
  {
    institution: "Stankings Foundation",
    slug: "stankings-foundation",
    knowledgeDomains: "Community programmes, impact measurement, sustainable support models.",
  },
] as const;

/** Why the Library exists — CANON-021 editorial */
export const CANON_021_LIBRARY_PURPOSE = [
  { artifact: "The Library", purpose: "Institutional memory — discoverable, governed, enduring." },
  { artifact: "Knowledge Objects", purpose: "Structured, versioned records per LS-001." },
  { artifact: "The Lexicon", purpose: "One meaning, one institution — controlled vocabulary." },
  { artifact: "Decision Records", purpose: "Why decisions were made, not only what." },
  { artifact: "Lessons Learned", purpose: "Experience converted to institutional wisdom." },
  { artifact: "The Canon", purpose: "Enduring principles that shape judgment." },
  { artifact: "The Constitution", purpose: "Constitutional law governing the Group." },
  { artifact: "Founder Letters", purpose: "Generational intent and stewardship voice." },
  { artifact: "Custodian Programme", purpose: "Formation of future institutional stewards." },
] as const;

export const CANON_021_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-021",
  sections: CANON_021_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-006", title: "Think in Generations, Act in the Present", href: "/library/canon/CANON-006", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019", relationship: "depends_on" },
    { identifier: "CANON-020", title: "Exercise Sound Judgment", href: "/library/canon/CANON-020", relationship: "depends_on" },
    { identifier: "LS-001", title: "The Knowledge Object Standard", href: "/library/standards/ls-001", relationship: "references" },
    { identifier: "LS-002", title: "The Stankings Lexicon", href: "/library/standards/ls-002", relationship: "references" },
    { identifier: "LEX-KNOWLEDGE", title: "Lexicon: Knowledge", href: "/library/lexicon/knowledge", relationship: "references" },
    { identifier: "iki", title: "Institutional Knowledge Infrastructure", href: "/energy/library", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-IKG-001", title: "Institutional Knowledge Graph", href: "/library/knowledge-graph", relationship: "supports" },
    { identifier: "CANON-022", title: "Create Value That Outlasts Us", href: "/library/canon/CANON-022", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Project closes only after lessons preserved in Library",
      "Architecture decision documented with IDR and graph links",
      "Critical process never depends on one individual",
      "Fraud pattern from Yike becomes searchable institutional knowledge",
      "Knowledge evaluated for Library inclusion per ED 23",
      "IKG shows connections across canons, companies, frameworks",
    ],
    poor: [
      "Knowledge lives only in someone's head",
      "Employee leaves — capability disappears",
      "Repeated mistakes because lessons not preserved",
      "Documentation stale and undiscoverable",
      "Hoarding expertise for personal leverage",
      "Work considered complete without knowledge capture",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that lost knowledge when people left",
      "Generations forced to repeat the same work",
      "Buildings and money without accumulated wisdom",
      "Documentation as afterthought",
    ],
    strengthenedTrust: [
      "Library as living brain of the institution",
      "Knowledge compounds across 500 years",
      "Rebuild possible if capital lost but knowledge preserved",
      "Dynasty endures because knowledge endures",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-021 — Knowledge Is an Institutional Asset. Knowledge preserved as constitutional asset. Knowledge Test before closing initiatives. IKG connects Knowledge Objects across canons, companies, frameworks, decisions, lessons. ED 23 — evaluate artifacts for Library inclusion.",
    fiveMinute:
      "Explains entire Library stack. Individuals contribute; institution preserves; generations build. Yike through Foundation each generate knowledge domains. Code explains what; documentation explains why. IKG dimensions: canons, companies, frameworks, decisions, lessons, roles, technologies, APIs, books, founder letters.",
    fifteenMinute:
      "Dynasty 500 years — knowledge cannot die with people. Most valuable asset: lose cash, tech, real estate, brand, people — preserve knowledge and rebuild. Lose knowledge — lose wisdom that made assets valuable. Library is memory. Protect knowledge like capital. Knowledge forgotten forces every generation to begin again.",
  },
};
