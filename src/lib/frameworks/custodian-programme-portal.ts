/**
 * Custodian Programme Portal — FRAMEWORK-CPP-001
 * Derived from Constitution Article XVI
 * Executive Decision No. 44 — Leadership Continuity Framework
 */

import {
  LEADERSHIP_EVALUATION_CRITERIA,
  LEADERSHIP_STUDY_DOMAINS,
  MENTORSHIP_OUTCOMES,
} from "@/lib/constitution/articles/article-xvi";

export const CPP_FRAMEWORK = {
  identifier: "FRAMEWORK-CPP-001",
  title: "Custodian Programme Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XVI",
    "CONSTITUTION-ARTICLE-XV",
    "CONSTITUTION-ARTICLE-V",
    "CONSTITUTION-ARTICLE-III",
    "CANON-004",
    "CANON-006",
    "CANON-009",
    "CANON-019",
    "CANON-020",
    "CANON-023",
    "CANON-025",
    "FRAMEWORK-LGOV-001",
    "FRAMEWORK-LSF-001",
    "FRAMEWORK-STEWARDSHIP-PORTAL-001",
    "stankings-institute",
    "custodian-programme",
  ],
} as const;

export const LCF_IDENTIFIER = "LCF-001";

export const CPP_PURPOSE = `I don't want heirs. I want custodians.

The Custodian Programme Portal constitutionalizes leadership continuity — deliberate education, mentorship, and stewardship rather than chance. Detailed curriculum lives with The Stankings Institute.`;

export const CUSTODIAN_RECORD_DOMAINS = [
  "Custodian ID",
  "Cohort",
  "Current Stage",
  "Mentor",
  "Learning Progress",
  "Constitution Modules Completed",
  "Canon Modules Completed",
  "Case Studies Completed",
  "Leadership Assessments",
  "Knowledge Contributions",
  "Innovation Contributions",
  "Stewardship Projects",
  "Community Service",
  "Research Published",
  "Readiness Reviews",
  "Graduation Status",
] as const;

export const LCF_STANDARDS = [
  "Leadership competencies",
  "Development pathways",
  "Mentorship standards",
  "Evaluation principles",
  "Succession readiness",
  "Educational requirements",
  "Custodian Programme governance",
  "Periodic review of leadership development outcomes",
] as const;

export const CPP_BODY = `${CPP_PURPOSE}

## Institutional Learning Domains (Art. XVI § 16.05)

${LEADERSHIP_STUDY_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Mentorship Outcomes (Art. XVI § 16.06)

${MENTORSHIP_OUTCOMES.map((m) => `- ${m}`).join("\n")}

## Evaluation Criteria (Art. XVI § 16.07)

${LEADERSHIP_EVALUATION_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Custodian Record Domains

${CUSTODIAN_RECORD_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Curriculum Tracks

- Foundation — Canons, Constitution, History, Stewardship, Ethics
- Leadership — Governance, Strategy, Finance, Negotiation, Communication
- Technology — AI, Cybersecurity, Software, Data, Automation
- Enterprise — Entrepreneurship, Venture Development, Innovation, Operations, Risk
- Society — Philanthropy, Education, Community Leadership, African Markets, Public Institutions

## Leadership Continuity Framework (ED 44)

${LCF_STANDARDS.map((s) => `- ${s}`).join("\n")}

The objective is to ensure that leadership continuity remains intentional, measurable and faithful to the Constitution.`;
