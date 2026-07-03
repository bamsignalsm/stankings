import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_004_META = {
  identifier: "CANON-004",
  title: "Leadership Is Stewardship",
  statement: "Leadership within Stankings Group is an act of stewardship.",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_004_SECTIONS: CanonSection[] = [
  {
    id: "statement",
    title: "Statement",
    paragraphs: [
      "Leadership within Stankings Group is an act of stewardship.",
      "Authority is entrusted for the benefit of the institution, never for personal privilege.",
    ],
  },
  {
    id: "meaning",
    title: "Meaning",
    paragraphs: [
      "No individual owns the institution through the office they hold.",
      "Leadership positions are temporary responsibilities granted for the purpose of preserving, strengthening and advancing the institution.",
      "Every leader shall therefore exercise authority with humility, integrity, competence and accountability.",
      "Leadership shall always remember that it serves the institution.",
      "The institution serves society.",
    ],
  },
  {
    id: "institutional-implications",
    title: "Institutional Implications",
    paragraphs: [
      "Every leadership role shall be regarded as a custodial responsibility.",
      "Leaders shall make decisions that strengthen the institution beyond their own period of service.",
      "No leader shall knowingly weaken long-term institutional health for short-term recognition, convenience or personal benefit.",
      "Succession planning shall be regarded as a fundamental responsibility of leadership.",
      "Every leader should contribute to developing capable future leaders.",
    ],
  },
  {
    id: "leadership-implications",
    title: "Leadership Implications",
    paragraphs: [
      "Leaders shall:",
      "Protect institutional trust.",
      "Develop people.",
      "Build systems rather than dependence upon themselves.",
      "Accept responsibility for failures.",
      "Share credit for successes.",
      "Act with courage when difficult decisions are required.",
      "Remain teachable throughout their service.",
      "Leadership shall be measured not only by results, but also by the strength of the institution left behind.",
    ],
  },
  {
    id: "engineering-implications",
    title: "Engineering Implications",
    paragraphs: [
      "Engineering leaders shall design systems that remain understandable, maintainable and resilient beyond their own tenure.",
      "Knowledge shall be documented.",
      "Critical systems shall avoid unnecessary dependence upon any single individual.",
      "Technical stewardship includes security, documentation, maintainability and responsible innovation.",
    ],
  },
  {
    id: "customer-implications",
    title: "Customer Implications",
    paragraphs: [
      "Customers should experience an institution that behaves consistently regardless of changes in leadership.",
      "The quality of service should be preserved through systems, standards and culture rather than depending upon individual personalities.",
    ],
  },
  {
    id: "the-stewardship-test",
    title: "The Stewardship Test",
    paragraphs: [
      "Before making any significant leadership decision, ask:",
      "Will this decision leave the institution stronger than it was before?",
      "Will those who follow inherit better systems, stronger people and greater trust?",
      "If not, reconsider the decision.",
    ],
  },
  {
    id: "historical-reflection",
    title: "Historical Reflection",
    paragraphs: [
      "Many organizations decline when leadership becomes centred upon personalities rather than institutions.",
      "Enduring institutions prepare successors, strengthen governance and build systems capable of thriving beyond the tenure of any individual.",
      "Leadership reaches its highest expression when it prepares others to continue the work faithfully.",
    ],
  },
  {
    id: "summary",
    title: "Summary",
    paragraphs: [
      "Leadership is not ownership.",
      "Leadership is stewardship.",
      "Every leader receives the institution in trust.",
      "Every leader shall leave it stronger for those who follow.",
    ],
  },
];

export const CANON_004_BODY = CANON_004_SECTIONS.map(
  (s) => `## ${s.title}\n\n${s.paragraphs.join("\n\n")}`
).join("\n\n");

export const CANON_004_SUMMARY =
  "Leadership is stewardship — authority is entrusted for the institution, never for personal privilege. Every leader shall leave the institution stronger for those who follow.";

export const CANON_004_HISTORICAL_NOTES =
  "Fourth registered canon. Governs every CEO, Director, Trustee, Manager, Team Lead and future Custodian. Prevents founder worship, personality cults, and knowledge hoarding. Cornerstone of Volume IV — The Custodian Programme.";

export const CANON_004_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-004",
  sections: CANON_004_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "CANON-001", title: "Institutions Exist to Serve", href: "/library/canon/CANON-001", relationship: "depends_on" },
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "depends_on" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "depends_on" },
    { identifier: "LEX-CUSTODIAN", title: "Lexicon: Custodian", href: "/library/lexicon/custodian", relationship: "references" },
    { identifier: "LEX-STEWARDSHIP", title: "Lexicon: Stewardship", href: "/library/lexicon/stewardship", relationship: "references" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-005", title: "The Ecosystem Is Greater Than Any Single Institution", href: "/library/canon/CANON-005", relationship: "supports" },
    { identifier: "FRAMEWORK-LSF-001", title: "Leadership Stewardship Framework", href: "/library/frameworks/leadership-stewardship", relationship: "supports" },
    { identifier: "custodian-programme", title: "Volume IV — Custodian Programme", href: "/library/volumes/custodian-programme", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Documenting critical systems for successors",
      "Mentoring two potential successors per leadership role",
      "Annual stewardship review with institutional health metrics",
      "Refusing short-term cuts that damage long-term trust",
      "Building teams that outlast the leader's tenure",
      "Knowledge transfer checklist completed before role transition",
    ],
    poor: [
      "Founder worship or personality-centred culture",
      "Knowledge hoarding to protect position",
      "Blocking succession planning",
      "Decisions for personal recognition over institutional health",
      "Critical systems dependent on one individual",
      "Leadership appointments without stewardship scrutiny",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Organizations that declined when leadership centred on personalities",
      "CEOs who treated companies as personal property",
      "Leaders who protected position instead of preparing replacements",
      "Institutions that collapsed when founders left no systems behind",
    ],
    strengthenedTrust: [
      "Enduring institutions that prepared successors deliberately",
      "Leaders measured by strength of institution left behind",
      "Governance systems that outlived any single tenure",
      "Custodians developed through competence, character and stewardship",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-004 defines leadership as stewardship — authority is entrusted, never owned. Every leader must pass the Stewardship Test and leave stronger systems, people, and trust for those who follow.",
    fiveMinute:
      "Leadership within Stankings Group is custodial, not proprietary. Leaders protect trust, develop people, build systems, accept failure, share success, and remain teachable. Succession planning is fundamental. Engineering leaders document knowledge and avoid single points of failure. The Stewardship Test asks whether the institution will be stronger after the decision. Volume IV will build stewards, not merely executives.",
    fifteenMinute:
      "CANON-004 governs how Stankings Group leads — from CEO to Team Lead to future Custodian. It prevents founder worship, personality cults, knowledge hoarding, and poor succession. Institutional implications require decisions that strengthen beyond one's tenure. Leadership implications enumerate seven stewardship duties. Engineering requires documented, maintainable systems. Customers experience consistency through culture and standards, not personalities. Historical reflection: enduring institutions prepare successors. The Leadership Stewardship Framework operationalizes this canon for every role. Executive Decision No. 6 requires four questions before major leadership appointments.",
  },
};
