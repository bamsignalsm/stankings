/**
 * Leadership Governance Portal — FRAMEWORK-LGOV-001
 * Derived from Constitution Article V
 * Executive Decision No. 33 — Annual Constitutional Leadership Review
 */

import {
  CONSTITUTIONAL_LEADERSHIP_STANDARDS,
  LEADERSHIP_EVALUATION_CRITERIA,
} from "@/lib/constitution/articles/article-v";

export const LGOV_FRAMEWORK = {
  identifier: "FRAMEWORK-LGOV-001",
  title: "Leadership Governance Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-V",
    "CANON-004",
    "CANON-007",
    "CANON-010",
    "CANON-019",
    "CANON-020",
    "CANON-023",
    "CANON-025",
    "FRAMEWORK-LSF-001",
    "FRAMEWORK-STEWARDSHIP-PORTAL-001",
    "FRAMEWORK-ASR-001",
    "LEX-STEWARDSHIP",
    "LEX-CUSTODIAN",
  ],
} as const;

export const LGOV_PURPOSE = `Leadership shall meet a constitutional standard — not personality, prestige or short-term performance alone.

Every senior leadership office maintains a leadership profile documenting constitutional duties, evaluation history, successor development, and fidelity to the Stankings Canons.`;

export const LEADERSHIP_PROFILE_FIELDS = [
  "Constitutional Office",
  "Stewardship Responsibilities",
  "Delegated Authority",
  "Annual Stewardship Declaration",
  "Leadership Evaluation History",
  "Knowledge Contributions",
  "Decisions Authored",
  "Successor Development Status",
  "Canon References",
  "Constitution Articles",
  "Required Training",
] as const;

export const ANNUAL_CONSTITUTIONAL_LEADERSHIP_REVIEW_CRITERIA = [
  "Fidelity to the Constitution.",
  "Fidelity to the Stankings Canons.",
  "Stewardship of institutional assets.",
  "Leadership development.",
  "Decision quality.",
  "Ethical conduct.",
  "Knowledge contribution.",
  "Institutional improvement.",
  "Long-term value created.",
] as const;

export type CompetencyAssessmentStatus = "forming" | "current" | "reviewed";

export interface LeadershipCompetencyRow {
  standard: (typeof CONSTITUTIONAL_LEADERSHIP_STANDARDS)[number];
  assessmentFocus: string;
  defaultStatus: CompetencyAssessmentStatus;
}

export const LEADERSHIP_COMPETENCY_MATRIX: LeadershipCompetencyRow[] = [
  {
    standard: "Integrity.",
    assessmentFocus: "Truthful communication, conflict disclosure, resource stewardship",
    defaultStatus: "forming",
  },
  {
    standard: "Competence.",
    assessmentFocus: "Role-appropriate knowledge, advice-seeking, continual development",
    defaultStatus: "forming",
  },
  {
    standard: "Professional discipline.",
    assessmentFocus: "Governance process adherence, documentation, meeting standards",
    defaultStatus: "forming",
  },
  {
    standard: "Sound judgment.",
    assessmentFocus: "Decision quality, IDI/Judgment Records, long-term reasoning",
    defaultStatus: "forming",
  },
  {
    standard: "Respect for human dignity.",
    assessmentFocus: "HIR compliance, people impact, leadership culture",
    defaultStatus: "forming",
  },
  {
    standard: "Commitment to institutional learning.",
    assessmentFocus: "LLR contribution, improvement actions, knowledge preservation",
    defaultStatus: "forming",
  },
  {
    standard: "Faithfulness to the Constitution.",
    assessmentFocus: "CAE alignment, constitutional compliance, governance fidelity",
    defaultStatus: "forming",
  },
  {
    standard: "Commitment to the Stankings Canons.",
    assessmentFocus: "Canon application in decisions, Volume 0 maturity",
    defaultStatus: "forming",
  },
  {
    standard: "Long-term stewardship.",
    assessmentFocus: "Succession development, generational thinking, ASR outcomes",
    defaultStatus: "forming",
  },
];

export const LGOV_BODY = `${LGOV_PURPOSE}

## Leadership Profile Fields

${LEADERSHIP_PROFILE_FIELDS.map((f) => `- ${f}`).join("\n")}

## Constitutional Leadership Standards (Art. V § 5.02)

${CONSTITUTIONAL_LEADERSHIP_STANDARDS.map((s) => `- ${s}`).join("\n")}

## Leadership Competency Matrix

Each constitutional standard is assessed over time through appointment review, Annual Constitutional Leadership Review, and succession readiness evaluation.

${LEADERSHIP_COMPETENCY_MATRIX.map((row) => `- **${row.standard}** — ${row.assessmentFocus}`).join("\n")}

## Leadership Evaluation Criteria (Art. V § 5.08)

${LEADERSHIP_EVALUATION_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Annual Constitutional Leadership Review (ED 33)

Every executive and constitutional office holder shall complete an Annual Constitutional Leadership Review evaluating:

${ANNUAL_CONSTITUTIONAL_LEADERSHIP_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

Reviews become part of the permanent governance record and inform development planning, succession readiness and institutional learning.`;
