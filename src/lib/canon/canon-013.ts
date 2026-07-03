import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_013_META = {
  identifier: "CANON-013",
  title: "Innovate with Purpose",
  statement:
    "Innovation shall be pursued to solve meaningful problems, strengthen the institution and improve the lives of those we serve. Innovation is a means. Purpose is the end.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_013_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Innovation shall be pursued to solve meaningful problems, strengthen the institution and improve the lives of those we serve.",
      "Innovation is a means.",
      "Purpose is the end.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Stankings Group welcomes innovation as an essential discipline for long-term relevance.",
      "However, novelty alone shall never justify investment.",
      "Every innovation shall be evaluated according to its contribution to customers, institutional trust, operational excellence and long-term resilience.",
      "The institution shall neither fear change nor pursue it recklessly.",
      "Wise innovation balances curiosity with discipline.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Innovation initiatives shall align with the mission and principles of the institution.",
      "Projects shall demonstrate meaningful value before significant resources are committed.",
      "Experimentation is encouraged. Institutional drift is not.",
      "The Group shall maintain the courage to discontinue innovations that fail to create lasting value.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall cultivate environments where thoughtful experimentation is encouraged and responsible risk-taking is respected.",
      "Innovation shall be guided by evidence, learning and strategic alignment rather than fashion or fear of missing out.",
      "Leaders shall distinguish between innovation that advances the mission and distraction that consumes attention.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall explore emerging technologies responsibly.",
      "Artificial intelligence, automation and future technologies shall be adopted where they demonstrably improve trust, quality, security, accessibility or operational effectiveness.",
      "Prototype early. Measure objectively. Scale deliberately. Retire unsuccessful experiments responsibly.",
      "Technical innovation shall strengthen maintainability rather than undermine it.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should benefit from innovation through simpler experiences, stronger security, better accessibility, improved transparency and greater confidence.",
      "Innovation shall reduce meaningful friction without creating unnecessary complexity.",
      "Customers shall never become involuntary participants in poorly understood experimentation.",
    ],
  },
  {
    id: "the-innovation-test",
    title: "The Innovation Test",
    paragraphs: [
      "Before approving any significant innovation, ask:",
      "What meaningful problem does this solve?",
      "Who benefits?",
      "Does it strengthen trust?",
      "Can it be maintained responsibly?",
      "Does it align with our Canons?",
      "If innovation cannot answer these questions satisfactorily, further refinement is required before implementation.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "The institutions that endure are not those that adopt every new technology.",
      "They are those that consistently adopt the right technologies for the right reasons.",
      "Disciplined innovation compounds advantage.",
      "Undisciplined innovation compounds confusion.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Innovation shall always serve purpose.",
      "Purpose shall always guide innovation.",
      "Together they ensure that progress strengthens rather than distracts from the mission of Stankings Group.",
    ],
  },
];

export const CANON_013_BODY = CANON_013_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_013_SUMMARY =
  "Innovate with purpose — novelty alone never justifies investment; innovation serves mission, trust, and those we serve.";

export const CANON_013_INNOVATION_MOTTO =
  "Innovation shall always serve purpose. Purpose shall always guide innovation.";

export const CANON_013_HISTORICAL_NOTES =
  "Thirteenth registered canon. First Innovation Canon of Volume 0 — governs how the institution embraces emerging technology without losing identity. Operationalized through the Innovation Governance Framework. Protects against trend-chasing while ensuring relevance across AI, automation, and technologies yet unimagined.";

/** Editorial — innovation in practice per CANON-013 */
export const CANON_013_INNOVATION_APPLICATIONS = [
  {
    domain: "Institutional AI",
    description:
      "Retrieval-augmented AI on IKI knowledge — pilot before platform-wide deployment.",
    approach: "Controlled experiment → measured trust impact → scale via AI Platform",
  },
  {
    domain: "Trust & Verification",
    description:
      "AI-assisted document verification for Yike and Auto Hub — strengthens trust, not novelty.",
    approach: "Pilot with human oversight → success metrics → Trust Platform integration",
  },
  {
    domain: "Emerging Technology",
    description:
      "New technology in 2034 — institution asks five questions before adoption, not panic.",
    approach: "Innovation Governance Review → Canon alignment → pilot or polite decline",
  },
  {
    domain: "Failed Experiments",
    description:
      "Innovation that fails to create value — discontinued responsibly with lessons captured.",
    approach: "Exit strategy executed → LLR before closure → no institutional drift",
  },
] as const;

export const CANON_013_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-013",
  sections: CANON_013_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Every Institution Must Know Its Purpose", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-011", title: "Simplicity Creates Strength", href: "/library/canon/CANON-011", relationship: "depends_on" },
    { identifier: "CANON-012", title: "Build Platforms, Not Silos", href: "/library/canon/CANON-012", relationship: "depends_on" },
    { identifier: "LEX-INNOVATION", title: "Lexicon: Innovation", href: "/library/lexicon/innovation", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-IGF-001", title: "Innovation Governance Framework", href: "/library/frameworks/innovation-governance", relationship: "supports" },
    { identifier: "CANON-014", title: "Our Word Is a Commitment", href: "/library/canon/CANON-014", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "AI verification pilot with trust metrics before production",
      "Blockchain declined — no meaningful problem solved for customers",
      "Institutional AI built on IKI with human-in-the-loop governance",
      "Robotics automation pilot with exit strategy defined upfront",
      "Innovation Governance Review completed with PAF and TIA gates",
      "Failed experiment retired with Lessons Learned captured",
    ],
    poor: [
      "Adopting technology because competitors did",
      "Customers enrolled in beta without informed consent",
      "No exit strategy for unsuccessful pilots",
      "Innovation budget driven by FOMO not evidence",
      "Novelty celebrated without trust or maintainability review",
      "Scaling enthusiasm before demonstrated benefit",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Trend-chasing eroding institutional identity",
      "Customers as involuntary experiment subjects",
      "Undisciplined innovation compounding confusion",
      "Failed pilots abandoned without institutional learning",
    ],
    strengthenedTrust: [
      "Right technologies adopted for the right reasons",
      "Controlled experiments producing proven value",
      "Innovation strengthening trust and simplicity",
      "Institution modern without becoming directionless",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-013 requires purposeful innovation — solve meaningful problems, strengthen trust, align with Canons. Novelty alone never justifies investment. The Innovation Test and Innovation Governance Framework govern adoption of AI, automation, and future technologies.",
    fiveMinute:
      "First Innovation Canon. Experimentation encouraged; institutional drift forbidden. Engineering: prototype early, measure objectively, scale deliberately, retire responsibly. Innovation Governance Review integrates PAF, TIA, EIA, GRF, SR, and Platform Assessment. Executive Decision No. 15: significant innovation begins as controlled experiment; scaling follows proven value.",
    fifteenMinute:
      "CANON-013 answers how Stankings innovates without losing identity across a century of emerging technology. Leaders distinguish mission-advancing innovation from distraction. Customers never become involuntary experiment subjects. Future CTOs ask whether technology passes Canon 013 — not whether it is fashionable. Disciplined innovation compounds advantage; undisciplined innovation compounds confusion.",
  },
};
