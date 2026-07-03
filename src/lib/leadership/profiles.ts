/**
 * Leadership profiles — constitutional standards per Article V / FRAMEWORK-LGOV-001
 */

import type { LeadershipProfile } from "@/lib/leadership/types";
import { LEADERSHIP_COMPETENCY_MATRIX } from "@/lib/frameworks/leadership-governance-portal";

const ARTICLE_V_REFS = [
  "Art. V § 5.01 — Leadership as Constitutional Stewardship",
  "Art. V § 5.02 — Constitutional Standards",
  "Art. V § 5.06 — Duty to Develop Successors",
  "Art. V § 5.07 — Constitutional Accountability",
];

export const LEADERSHIP_PORTAL_IDENTIFIER = "FRAMEWORK-LGOV-001";

function defaultCompetencyAssessments(): LeadershipProfile["competencyAssessments"] {
  return LEADERSHIP_COMPETENCY_MATRIX.map((row) => ({
    standard: row.standard,
    status: row.defaultStatus,
    period: "2026",
    note: row.assessmentFocus,
  }));
}

export const LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    slug: "stanley-ukeje",
    name: "Stanley Ukeje",
    constitutionalOffice: "Founder & Editor-in-Chief",
    officeType: "custodian",
    status: "active",
    stewardshipResponsibilities: [
      "Constitutional architecture and Volume I authorship",
      "Custodian formation and institutional vision",
      "Library Council chairmanship",
      "Successor development across leadership pipeline",
    ],
    delegatedAuthority: [
      "Editorial direction of constitutional text (subject to Council approval)",
      "Knowledge Object stewardship pending formal Board",
      "Custodian Programme curriculum development",
    ],
    annualStewardshipDeclaration: {
      year: "2026",
      status: "submitted",
      href: "/library/stewardship/stanley-ukeje",
    },
    leadershipEvaluations: [
      {
        period: "2026",
        status: "forming",
        summary: "Inaugural constitutional era — first Annual Constitutional Leadership Review upon Board formation.",
      },
    ],
    knowledgeContributions: [
      { title: "Volume 0 — The Stankings Canons", href: "/library/first-principles" },
      { title: "Volume I — Constitution (Articles I–XVII)", href: "/library/constitution" },
      { title: "Leadership Stewardship Framework", href: "/library/frameworks/leadership-stewardship" },
    ],
    decisionsAuthored: [
      { title: "Executive Decisions 1–33", href: "/library" },
      { title: "IDR-GATES-001 — Four-gate workflow", href: "/library/decisions/IDR-GATES-001" },
    ],
    successorDevelopment: {
      label: "In progress",
      detail:
        "Custodian Programme and Institute leadership pipeline under development. Constitutional succession principles in Articles III and V — legal trust mechanics to follow.",
      status: "in_progress",
    },
    competencyAssessments: defaultCompetencyAssessments().map((c) =>
      c.standard === "Long-term stewardship." ? { ...c, status: "current" as const } : c,
    ),
    canonReferences: ["CANON-004", "CANON-007", "CANON-010", "CANON-020", "CANON-023", "CANON-025"],
    constitutionArticles: [...ARTICLE_V_REFS, "Art. I § 1.06 — Institutional Continuity"],
    requiredTraining: [
      "Custodian Programme — Founding curriculum",
      "FRAMEWORK-LSF-001 — Leadership Stewardship",
      "Constitutional architecture seminar",
    ],
  },
  {
    slug: "board-of-directors",
    name: "Board of Directors",
    constitutionalOffice: "Board of Directors",
    officeType: "board",
    status: "forming",
    stewardshipResponsibilities: [
      "Safeguard Constitution, Canons, and institutional purpose",
      "Approve long-term strategy and reserved powers decisions",
      "Evaluate Group CEO and executive leadership",
      "Oversee succession and risk governance",
    ],
    delegatedAuthority: [
      "Reserved Powers Register per Executive Decision No. 32",
      "CEO appointment and removal",
      "Constitutional amendment recommendation",
    ],
    leadershipEvaluations: [
      { period: "2026", status: "forming", summary: "Board formation pending — evaluation framework ready." },
    ],
    knowledgeContributions: [],
    decisionsAuthored: [],
    successorDevelopment: {
      label: "Required",
      detail: "Board succession and director development programme to be established with formal incorporation.",
      status: "required",
    },
    competencyAssessments: defaultCompetencyAssessments(),
    canonReferences: ["CANON-004", "CANON-007", "CANON-015", "CANON-016", "CANON-020"],
    constitutionArticles: [
      ...ARTICLE_V_REFS,
      "Art. IV § 4.04 — Constitutional Duties of the Board",
    ],
    requiredTraining: [
      "FRAMEWORK-LSF-001 — Leadership Stewardship",
      "FRAMEWORK-CGOV-001 — Constitutional Governance",
      "Director fiduciary duties (upon appointment)",
    ],
  },
  {
    slug: "group-ceo",
    name: "Group Chief Executive Officer",
    constitutionalOffice: "Group Chief Executive Officer",
    officeType: "ceo",
    status: "forming",
    stewardshipResponsibilities: [
      "Faithfully implement strategic direction established through constitutional governance",
      "Manage responsibly and report honestly to the Board",
      "Develop people and preserve institutional knowledge",
      "Maintain operational excellence within delegated authority",
    ],
    delegatedAuthority: [
      "Day-to-day management per Art. IV § 4.03 — subject to Reserved Powers Register",
      "Executive leadership appointment within Board-approved parameters",
    ],
    leadershipEvaluations: [{ period: "2026", status: "forming", summary: "Office vacant — LSF appointment gate applies." }],
    knowledgeContributions: [],
    decisionsAuthored: [],
    successorDevelopment: {
      label: "Required",
      detail: "CEO succession plan required before appointment — FRAMEWORK-LSF-001 and Art. V § 5.06.",
      status: "required",
    },
    competencyAssessments: defaultCompetencyAssessments(),
    canonReferences: ["CANON-004", "CANON-007", "CANON-020", "CANON-023"],
    constitutionArticles: [
      ...ARTICLE_V_REFS,
      "Art. IV § 4.05 — Constitutional Duties of Executive Leadership",
    ],
    requiredTraining: [
      "FRAMEWORK-LSF-001 — four stewardship questions before appointment",
      "FRAMEWORK-CGOV-001 — delegated authority boundaries",
      "Annual Constitutional Leadership Review (ED 33)",
    ],
  },
  {
    slug: "library-council",
    name: "Library Council",
    constitutionalOffice: "Library Council — Governance Committee Chair",
    officeType: "committee",
    status: "active",
    stewardshipResponsibilities: [
      "Canon review and constitutional amendment discipline",
      "Knowledge Object approval and Library integrity",
      "Stewardship review recommendations to the Board",
    ],
    delegatedAuthority: [
      "Editorial approval of Volume 0 and Volume I drafts",
      "Framework adoption recommendation",
    ],
    annualStewardshipDeclaration: {
      year: "2026",
      status: "submitted",
      href: "/library/stewardship/library-council",
    },
    leadershipEvaluations: [
      {
        period: "2026",
        status: "current",
        summary: "Active constitutional adoption period — inaugural leadership review upon formal Board.",
        href: "/library/canon-maturity",
      },
    ],
    knowledgeContributions: [
      { title: "25 Canons at Version 1.0", href: "/library/first-principles" },
      { title: "Constitution Articles I–V", href: "/library/constitution" },
    ],
    decisionsAuthored: [
      { title: "Volume 0 Version 1.0 seal", href: "/library/first-principles" },
      { title: "FRAMEWORK-CMD-001 adoption", href: "/library/canon-maturity" },
    ],
    successorDevelopment: {
      label: "In progress",
      detail: "Council membership expansion and chair succession to be documented with Board formation.",
      status: "in_progress",
    },
    competencyAssessments: defaultCompetencyAssessments().map((c) =>
      ["Faithfulness to the Constitution.", "Commitment to the Stankings Canons."].includes(c.standard)
        ? { ...c, status: "current" as const }
        : c,
    ),
    canonReferences: ["CANON-007", "CANON-023", "CANON-025"],
    constitutionArticles: [...ARTICLE_V_REFS, "Art. IV § 4.02 — Governance Structure"],
    requiredTraining: ["Custodian Programme — Council track", "Constitutional interpretation seminar"],
  },
  {
    slug: "future-custodian",
    name: "Future Custodian (Pipeline)",
    constitutionalOffice: "Custodian-in-Formation",
    officeType: "custodian",
    status: "forming",
    stewardshipResponsibilities: [
      "Complete Custodian Programme curriculum",
      "Demonstrate constitutional standards before office",
      "Contribute to institutional learning under mentorship",
    ],
    delegatedAuthority: ["None — formation phase only"],
    leadershipEvaluations: [{ period: "2026", status: "forming", summary: "Pipeline profile — standards assessed through programme milestones." }],
    knowledgeContributions: [],
    decisionsAuthored: [],
    successorDevelopment: {
      label: "Formation",
      detail: "This profile represents the leadership pipeline — the institution's answer to single-point dependency.",
      status: "in_progress",
    },
    competencyAssessments: defaultCompetencyAssessments(),
    canonReferences: ["CANON-004", "CANON-006", "CANON-025"],
    constitutionArticles: [...ARTICLE_V_REFS, "Art. III § 3.05 — Succession as Constitutional Duty"],
    requiredTraining: [
      "Custodian Programme — Age-appropriate tracks",
      "Volume 0 required reading (ED 27)",
      "FRAMEWORK-LSF-001 introduction",
    ],
  },
];

export function getLeadershipProfile(slug: string): LeadershipProfile | undefined {
  return LEADERSHIP_PROFILES.find((p) => p.slug === slug);
}

export function getLeadershipStats() {
  const total = LEADERSHIP_PROFILES.length;
  const active = LEADERSHIP_PROFILES.filter((p) => p.status === "active").length;
  const reviewsSubmitted = LEADERSHIP_PROFILES.filter((p) =>
    p.leadershipEvaluations.some((e) => e.status === "submitted" || e.status === "current"),
  ).length;
  const successionDocumented = LEADERSHIP_PROFILES.filter(
    (p) => p.successorDevelopment.status === "documented" || p.successorDevelopment.status === "in_progress",
  ).length;
  return { total, active, reviewsSubmitted, successionDocumented };
}
