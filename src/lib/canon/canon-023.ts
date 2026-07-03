import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_023_META = {
  identifier: "CANON-023",
  title: "Remain Humble Enough to Learn",
  statement:
    "The institution shall pursue excellence with confidence while remaining humble enough to learn, adapt and improve. Confidence without humility becomes arrogance. Humility without confidence becomes hesitation. Enduring institutions cultivate both.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_023_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "The institution shall pursue excellence with confidence while remaining humble enough to learn, adapt and improve.",
      "Confidence without humility becomes arrogance.",
      "Humility without confidence becomes hesitation.",
      "Enduring institutions cultivate both.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "No institution possesses complete knowledge.",
      "No leader understands every circumstance.",
      "No technology solves every problem.",
      "No generation has finished the work.",
      "Stankings Group shall therefore approach every challenge with intellectual humility, professional curiosity and disciplined confidence.",
      "The institution shall welcome better ideas regardless of where they originate.",
      "Truth shall take precedence over pride.",
      "Learning shall take precedence over ego.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "The institution shall encourage thoughtful questioning, constructive disagreement and continuous review of its assumptions.",
      "Policies may evolve. Technologies may change. Markets may transform.",
      "The Canons shall remain enduring principles, while operational methods shall improve through learning and experience.",
      "Institutional confidence shall never prevent institutional learning.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall listen before concluding.",
      "Seek evidence before deciding.",
      "Invite respectful challenge before committing.",
      "Leadership shall recognise that admitting uncertainty is not weakness.",
      "It is often the beginning of wiser judgment.",
      "The strongest leaders continue learning throughout their stewardship.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall value experimentation, peer review, code review and technical discussion.",
      "Architectures shall evolve responsibly.",
      "New evidence shall be welcomed.",
      "Better solutions shall replace older ones when they demonstrably strengthen the institution.",
      "The objective is not to defend previous decisions.",
      "The objective is to improve future ones.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience institutions that listen.",
      "Feedback shall be welcomed.",
      "Mistakes shall become improvements.",
      "Changing customer needs shall be understood with respect and professionalism.",
      "Listening is one expression of institutional humility.",
    ],
  },
  {
    id: "the-humility-test",
    title: "The Humility Test",
    paragraphs: [
      "Before rejecting a new idea, ask:",
      "Have we understood it fully?",
      "Could this improve the institution?",
      "Are we protecting a principle or merely defending tradition?",
      "If new evidence strengthens our understanding, we should have the courage to improve accordingly.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many institutions decline not because they lack resources, but because success convinces them they no longer need to learn.",
      "Enduring institutions remain teachable regardless of their achievements.",
      "Humility preserves relevance.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Learn continuously.",
      "Question respectfully.",
      "Improve courageously.",
      "Remain humble.",
      "The institution that continues learning continues growing.",
    ],
  },
];

export const CANON_023_BODY = CANON_023_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_023_SUMMARY =
  "Remain humble enough to learn — stable principles, adaptable methods, truth over pride.";

export const CANON_023_HUMILITY_MOTTO =
  "Learn continuously. Question respectfully. Improve courageously. Remain humble.";

export const CANON_023_HISTORICAL_NOTES =
  "Twenty-third registered canon. Second Civilization Canon of Volume 0 — principles that should still make sense if Stankings Group exists in 2526. Protects institutions from the belief that longevity automatically means correctness. Operationalized through the Knowledge Challenge Process (KCP). Governs institutional AI: confidence proportional to evidence.";

/** Institutional AI humility principles — CANON-023 editorial */
export const CANON_023_AI_PRINCIPLES = [
  { principle: "Express uncertainty", example: "I'm uncertain." },
  { principle: "Acknowledge incomplete evidence", example: "The available evidence is incomplete." },
  { principle: "Present reasonable alternatives", example: "There are multiple reasonable approaches." },
  { principle: "Explain recommendations", example: "Here's why I recommend one over another." },
] as const;

/** The 2058 engineer scenario — editorial illustration */
export const CANON_023_CHALLENGE_CULTURE = {
  weakCulture: "We've always done it this way.",
  canonCulture: "Show us the evidence.",
  outcome: "The better idea wins—not because of who suggested it, but because it strengthens the institution.",
} as const;

export const CANON_023_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-023",
  sections: CANON_023_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009", relationship: "depends_on" },
    { identifier: "CANON-020", title: "Exercise Sound Judgment", href: "/library/canon/CANON-020", relationship: "depends_on" },
    { identifier: "CANON-022", title: "Create Value That Outlasts Us", href: "/library/canon/CANON-022", relationship: "depends_on" },
    { identifier: "LEX-HUMILITY", title: "Lexicon: Humility", href: "/library/lexicon/humility", relationship: "references" },
    { identifier: "LEX-LEARNING", title: "Lexicon: Learning", href: "/library/lexicon/learning", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "FRAMEWORK-KCP-001", title: "Knowledge Challenge Process", href: "/library/knowledge-challenges", relationship: "supports" },
    { identifier: "CANON-024", title: "Raise the Standard", href: "/library/canon/CANON-024", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Junior engineer's vehicle history proposal reviewed on evidence — accepted",
      "Knowledge Challenge filed with evidence, risks, and canon references",
      "Policy updated after respectful challenge — principle preserved, method improved",
      "AI expresses uncertainty when evidence is incomplete",
      "Leader invites challenge before committing to irreversible decision",
      "Humility Test applied before rejecting new idea",
    ],
    poor: [
      "We've always done it this way — challenge dismissed without review",
      "Success breeds certainty — learning stops",
      "Defending tradition instead of protecting principles",
      "AI overconfident without proportional evidence",
      "Challenge treated as personal attack rather than institutional improvement",
      "Longevity mistaken for correctness",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Success convinced leadership they had all the answers",
      "Certainty replaced curiosity",
      "Blindness to better ideas from unexpected sources",
      "Institution trapped by its own past",
    ],
    strengthenedTrust: [
      "Stable principles with adaptable methods",
      "Evidence earns improvement; longevity earns respect",
      "Better ideas welcomed regardless of origin",
      "Institution teachable after centuries of achievement",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-023 — Remain Humble Enough to Learn. Second Civilization Canon. Confidence with humility. Knowledge Challenge Process per ED 25. Humility Test before rejecting ideas. AI confidence proportional to evidence.",
    fiveMinute:
      "Principles for 2526. No institution has complete knowledge. Truth over pride; learning over ego. Canons endure; methods evolve. KCP lets any employee challenge policy, workflow, standard, or decision with evidence. Reviewed professionally, not personally.",
    fifteenMinute:
      "Protects against longevity mistaken for correctness. 2058 engineer scenario: show us the evidence. AI should express uncertainty, incomplete evidence, alternatives. Executive Decision 25 — no standard beyond review. Enduring institutions remain teachable. Humility preserves relevance.",
  },
};
