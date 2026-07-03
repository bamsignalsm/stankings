import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_012_META = {
  identifier: "CANON-012",
  title: "Build Platforms, Not Silos",
  statement:
    "Institutional capabilities shall be designed to be shared wherever doing so strengthens the ecosystem. Platforms create leverage. Silos create duplication.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_012_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Institutional capabilities shall be designed to be shared wherever doing so strengthens the ecosystem.",
      "Platforms create leverage.",
      "Silos create duplication.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Every institution develops capabilities through experience, investment and innovation.",
      "Where appropriate, these capabilities should become shared platforms that strengthen the wider ecosystem.",
      "Identity should not be recreated. Trust should not be recreated. Payments should not be recreated. Verification should not be recreated. Knowledge should not be recreated. Artificial Intelligence should not be recreated.",
      "Shared capabilities increase consistency, reduce cost, improve quality and accelerate innovation.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Before creating a new capability, every institution shall determine whether an equivalent capability already exists within the ecosystem.",
      "If an existing capability satisfies the requirement, it shall be reused.",
      "New capabilities shall be created only where they provide meaningful strategic value or fulfil genuinely unique requirements.",
      "The institution shall prefer common platforms over fragmented implementations.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall encourage collaboration before duplication.",
      "Budgets shall consider ecosystem value rather than departmental convenience.",
      "Investment decisions shall recognize that a shared capability may create value across multiple institutions simultaneously.",
      "Leadership shall reward cooperation that strengthens the Group as a whole.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall design modular, reusable and interoperable systems.",
      "Shared APIs. Shared identity. Shared authentication. Shared authorization. Shared notifications. Shared audit services. Shared payments. Shared verification. Shared AI services. Shared analytics. Shared document services. Shared search.",
      "Every reusable platform reduces long-term complexity and increases institutional resilience.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience a seamless journey across the ecosystem.",
      "One trusted identity. One reputation. One consent framework. One trust passport. Consistent standards. Consistent security. Consistent user experience.",
      "Customers should benefit from institutional integration without losing control over their privacy or choices.",
    ],
  },
  {
    id: "the-platform-test",
    title: "The Platform Test",
    paragraphs: [
      "Before building any significant capability, ask:",
      "Can another institution already provide this?",
      "Can this become a shared platform?",
      "Will reuse strengthen the ecosystem?",
      "Does this reduce duplication?",
      "Will future institutions benefit from this capability?",
      "If the answer is yes, build the platform rather than another isolated solution.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many organizations accumulate disconnected systems that increase cost, reduce agility and weaken institutional knowledge.",
      "Enduring institutions invest in platforms that allow many organizations to innovate without rebuilding the same foundations repeatedly.",
      "Shared infrastructure compounds value over time.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Build once.",
      "Improve continuously.",
      "Reuse responsibly.",
      "Strengthen the ecosystem.",
      "Platforms multiply institutional capability.",
      "Silos multiply institutional complexity.",
    ],
  },
];

export const CANON_012_BODY = CANON_012_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_012_SUMMARY =
  "Build platforms, not silos — shared capabilities strengthen the ecosystem; duplication weakens it.";

export const CANON_012_PLATFORM_MOTTO =
  "Build once. Improve continuously. Reuse responsibly.";

export const CANON_012_HISTORICAL_NOTES =
  "Twelfth registered canon. First Architectural Canon of Volume 0 — governs how every company, product, API, database and acquisition is designed. Operationalized through the Platform Registry and Platform Assessment. Protects the shared-trust ecosystem architecture envisioned for Yike, BamSignal, BayRight, and all future institutions.";

/** Editorial architecture — platforms in practice per CANON-012 */
export const CANON_012_PLATFORM_APPLICATIONS = [
  {
    platform: "Identity Platform",
    description: "One login, one identity, one passport, one verification — not six systems.",
    consumers: ["Yike", "BamSignal", "BayRight", "Stankings.com", "Hannahkings Education", "Foundation"],
  },
  {
    platform: "Trust Platform",
    description: "One reputation engine, trust score, verification engine, fraud intelligence.",
    consumers: ["All ecosystem institutions"],
  },
  {
    platform: "Payments Platform",
    description: "BayRight as financial platform — every company consumes, not duplicates.",
    consumers: ["Yike", "Stanhan", "Stankings Auto Hub", "Marketplace vendors"],
  },
  {
    platform: "Logistics Platform",
    description: "Fleet, dispatch, tracking, moving services, corporate logistics.",
    consumers: ["Yike", "Stanhan", "Stankings Auto Hub", "Enterprise clients"],
  },
  {
    platform: "Knowledge Platform",
    description: "The Library — one institutional brain for every company, AI, and custodian.",
    consumers: ["All institutions", "IKI", "Board", "Custodian Programme"],
  },
  {
    platform: "AI Platform",
    description: "One AI platform — different personalities, permissions, same institutional knowledge.",
    consumers: ["All ecosystem institutions"],
  },
] as const;

export const CANON_012_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-012",
  sections: CANON_012_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-011", title: "Simplicity Creates Strength", href: "/library/canon/CANON-011", relationship: "depends_on" },
    { identifier: "LEX-PLATFORM", title: "Lexicon: Platform", href: "/library/lexicon/platform", relationship: "references" },
    { identifier: "ecosystem-map", title: "Ecosystem Map", href: "/library/ecosystem", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-PLAT-001", title: "Platform Assessment", href: "/library/frameworks/platform-assessment", relationship: "supports" },
    { identifier: "platform-registry", title: "Platform Registry", href: "/library/platforms", relationship: "supports" },
    { identifier: "CANON-013", title: "Innovate with Purpose", href: "/library/canon/CANON-013", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "New feature consumes Identity API instead of bespoke auth",
      "BayRight escrow reused across Yike and Stanhan",
      "Trust verification shared across marketplace and Auto Hub",
      "IKI Knowledge API powers all institutional AI",
      "Logistics dispatch consumed by multiple institutions",
      "Platform Assessment completed before greenfield build",
    ],
    poor: [
      "Six separate identity systems across companies",
      "Each institution builds its own payment stack",
      "Duplicate verification engines with inconsistent standards",
      "Siloed knowledge in Notion, email, and slide decks",
      "New company rebuilds notifications from scratch",
      "Department budget optimizes locally, duplicates globally",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Disconnected systems increasing cost and reducing agility",
      "Customers facing inconsistent identity and trust experiences",
      "Institutional knowledge trapped in silos",
      "Every acquisition rebuilding the same foundations",
    ],
    strengthenedTrust: [
      "Shared infrastructure compounding value over time",
      "One passport across the ecosystem journey",
      "Platform registry making reuse obvious to engineers",
      "Ten companies scaling toward fifty without losing coherence",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-012 requires shared platforms over silos. Before building, ask if capability exists, can be shared, and strengthens the ecosystem. Identity, trust, payments, knowledge, and AI are platform candidates — not per-company rebuilds.",
    fiveMinute:
      "First Architectural Canon. Reuse identity, auth, payments, verification, AI, analytics, documents, search. Platform Test before significant builds. Platform Registry documents owner, consumers, APIs, status. Platform Assessment required per Executive Decision No. 14. BayRight as payments platform; Logistics as fleet platform; Library as knowledge platform.",
    fifteenMinute:
      "CANON-012 constitutionalizes the ecosystem architecture Stanley envisioned — not a property website and a dating app, but shared trust infrastructure. Leadership rewards cooperation; engineering designs interoperable modules. Customers get one identity, reputation, consent framework, and consistent UX. Platform Registry is the architectural module engineers consult before building. Scales from ten to fifty companies through platform thinking.",
  },
};
