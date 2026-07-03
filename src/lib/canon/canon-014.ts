import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_014_META = {
  identifier: "CANON-014",
  title: "Our Word Is a Commitment",
  statement:
    "The promises made by Stankings Group shall be truthful, deliberate and honoured faithfully. Commitments create trust. Trust creates enduring institutions.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_014_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "The promises made by Stankings Group shall be truthful, deliberate and honoured faithfully.",
      "Commitments create trust.",
      "Trust creates enduring institutions.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "Every statement, promise, guarantee, representation and public commitment made by any institution within Stankings Group reflects upon the reputation of the entire ecosystem.",
      "Promises shall therefore be made thoughtfully and fulfilled diligently.",
      "The institution shall never knowingly promise what it cannot responsibly deliver.",
      "Where circumstances prevent fulfilment, the institution shall communicate promptly, transparently and respectfully while working toward a fair resolution.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Marketing shall accurately represent products and services.",
      "Contracts shall be honoured in both letter and spirit.",
      "Internal commitments shall receive the same seriousness as external commitments.",
      "Institutional credibility shall be protected by ensuring that expectations created are expectations that can reasonably be fulfilled.",
      "Every promise becomes part of the institution's reputation.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall exercise discipline before making commitments on behalf of the institution.",
      "Short-term praise gained through unrealistic promises shall never justify long-term damage to institutional credibility.",
      "Leaders shall encourage honest forecasting, realistic planning and transparent communication regarding risks and constraints.",
      "A respected institution is built upon promises consistently kept.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering teams shall avoid committing to delivery dates, features or capabilities that cannot be supported by responsible planning and technical evidence.",
      "Roadmaps shall communicate intention rather than certainty where uncertainty genuinely exists.",
      "Reliability targets, service commitments and security claims shall be supported by measurable evidence.",
      "Engineering integrity strengthens institutional credibility.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should receive clear expectations regarding pricing, timelines, quality, support and service.",
      "The institution shall avoid misleading language, hidden conditions and exaggerated claims.",
      "When expectations cannot be met, customers deserve timely communication, accountability and sincere efforts toward resolution.",
      "Trust grows when commitments are honoured, especially during difficulty.",
    ],
  },
  {
    id: "the-commitment-test",
    title: "The Commitment Test",
    paragraphs: [
      "Before making any commitment, ask:",
      "Can we fulfil this responsibly?",
      "Have we communicated honestly about assumptions and limitations?",
      "If circumstances change, are we prepared to communicate openly and act fairly?",
      "If these questions cannot be answered confidently, the commitment should not yet be made.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many institutions lose public confidence not because they intended to deceive, but because they repeatedly promised more than they could consistently deliver.",
      "Credibility is accumulated through fulfilled commitments.",
      "Reputation is strengthened each time actions match words.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Speak carefully.",
      "Promise responsibly.",
      "Deliver faithfully.",
      "The reputation of Stankings Group shall be measured not by the promises it makes, but by the promises it keeps.",
    ],
  },
];

export const CANON_014_BODY = CANON_014_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_014_SUMMARY =
  "Our word is a commitment — promises shall be truthful, deliberate, and honoured faithfully across the ecosystem.";

export const CANON_014_COMMITMENT_MOTTO =
  "Speak carefully. Promise responsibly. Deliver faithfully.";

export const CANON_014_HISTORICAL_NOTES =
  "Fourteenth registered canon. First Credibility Canon of Volume 0 — governs how the institution makes and keeps promises. Operationalized through the Commitment Registry. Distinguishes an institution from a company: reputation measured by promises kept, not promises made.";

/** Editorial — credible messaging in practice per CANON-014 */
export const CANON_014_CREDIBILITY_APPLICATIONS = [
  {
    institution: "Yike",
    avoid: "\"Nigeria's safest marketplace\" — hype without evidence.",
    prefer:
      "Built to help people buy and sell with greater confidence through verification, trust tools and transparent processes.",
  },
  {
    institution: "BayRight",
    avoid: "\"Instant settlement everywhere\" — promise beyond current capability.",
    prefer: "Only what the payments platform can consistently deliver, documented in SLAs.",
  },
  {
    institution: "BamSignal",
    avoid: "\"Guaranteed relationships\" — outcome the institution cannot promise.",
    prefer:
      "A safer, more trusted environment designed to help people build meaningful connections.",
  },
  {
    institution: "Engineering",
    avoid: "Roadmap dates presented as certainty when evidence does not support them.",
    prefer: "Intention communicated honestly; commitments recorded only when fulfilment is responsible.",
  },
] as const;

export const CANON_014_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-014",
  sections: CANON_014_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-007", title: "Truth Is Non-Negotiable", href: "/library/canon/CANON-007", relationship: "depends_on" },
    { identifier: "CANON-010", title: "People Are Ends, Never Merely Means", href: "/library/canon/CANON-010", relationship: "depends_on" },
    { identifier: "CANON-011", title: "Simplicity Creates Strength", href: "/library/canon/CANON-011", relationship: "depends_on" },
    { identifier: "CANON-013", title: "Innovate with Purpose", href: "/library/canon/CANON-013", relationship: "depends_on" },
    { identifier: "LEX-COMMITMENT", title: "Lexicon: Commitment", href: "/library/lexicon/commitment", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "commitment-registry", title: "Commitment Registry", href: "/library/commitments", relationship: "supports" },
    { identifier: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Public claim backed by verification evidence on Yike",
      "SLA targets supported by measured uptime data",
      "Roadmap labelled as intention where uncertainty exists",
      "Delay communicated before deadline, with fair resolution",
      "Commitment recorded in Registry before public announcement",
      "Foundation pledge tracked to completion with audit trail",
    ],
    poor: [
      "Marketing superlatives without demonstrable evidence",
      "Engineering dates promised without planning evidence",
      "Silent failure when commitments cannot be met",
      "Internal promises treated as optional",
      "Hidden conditions in customer-facing language",
      "Public commitments never recorded or audited",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Repeatedly promising more than could be delivered",
      "Hype replacing evidence in customer messaging",
      "Credibility eroded one broken promise at a time",
      "Competitors copying features but not institutional word",
    ],
    strengthenedTrust: [
      "Actions consistently matching words",
      "Honest communication during difficulty",
      "Commitment Registry making promises measurable",
      "Reputation: if Stankings says it, they deliver or explain honestly",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-014 requires truthful, deliberate promises honoured faithfully. The Commitment Test before any commitment. Commitment Registry tracks public promises with owners, status, and evidence. Credibility accumulated through fulfilment.",
    fiveMinute:
      "First Credibility Canon. Marketing accurate; contracts honoured in spirit; engineering avoids unevidenced dates. Yike, BayRight, BamSignal messaging: evidence over hype. Commitment Registry for guarantees, SLAs, roadmaps, foundation pledges. Executive Decision No. 16: material external commitments recorded with same discipline as financial assets.",
    fifteenMinute:
      "CANON-014 defines how Stankings makes promises — distinguishing institution from company. Every promise reflects on the whole ecosystem. Leaders resist short-term praise through unrealistic commitments. Customers deserve clear expectations and honest communication when circumstances change. Future reputation: if Stankings says it, they deliver or tell you honestly why not. Extraordinarily difficult to replicate — earned one fulfilled commitment at a time.",
  },
};
