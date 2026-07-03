/**
 * Custodian Programme Portal — Article XVI / FRAMEWORK-CPP-001 / ED 44
 */

import type { CurriculumModule, CustodianCaseStudy, CustodianRecord } from "@/lib/custodian-programme/types";

export const CPP_IDENTIFIER = "FRAMEWORK-CPP-001";

export const CUSTODIAN_RECORDS: CustodianRecord[] = [
  {
    custodianId: "CUST-FOUNDING-001",
    name: "Stanley Ukeje",
    cohort: "Founding Cohort — 2026",
    currentStage: "graduated",
    mentor: "Institutional founders & Library Council",
    learningProgress: 100,
    constitutionModulesCompleted: 15,
    constitutionModulesTotal: 15,
    canonModulesCompleted: 25,
    canonModulesTotal: 25,
    caseStudiesCompleted: 12,
    leadershipAssessments: 4,
    knowledgeContributions: 48,
    innovationContributions: 8,
    stewardshipProjects: 6,
    communityService: true,
    researchPublished: 3,
    readinessReviews: [{ period: "2026", status: "Founding custodian — curriculum author" }],
    graduationStatus: "alumni",
    href: "/library/stewardship/stanley-ukeje",
  },
  {
    custodianId: "CUST-2026-014",
    name: "Future Custodian (Preview)",
    cohort: "Age 14 Track — Cohort I",
    currentStage: "foundation",
    mentor: "Stanley Ukeje",
    learningProgress: 70,
    constitutionModulesCompleted: 0,
    constitutionModulesTotal: 15,
    canonModulesCompleted: 18,
    canonModulesTotal: 25,
    caseStudiesCompleted: 2,
    leadershipAssessments: 1,
    knowledgeContributions: 0,
    innovationContributions: 0,
    stewardshipProjects: 1,
    communityService: false,
    researchPublished: 0,
    readinessReviews: [{ period: "2026", status: "Formation — Volume 0 in progress" }],
    graduationStatus: "in_formation",
    href: "/library/stewardship/future-custodian",
  },
  {
    custodianId: "CUST-COUNCIL-001",
    name: "Library Council (Collective)",
    cohort: "Governance Track — 2026",
    currentStage: "leadership",
    mentor: "Peer Council & constitutional advisors",
    learningProgress: 85,
    constitutionModulesCompleted: 12,
    constitutionModulesTotal: 15,
    canonModulesCompleted: 25,
    canonModulesTotal: 25,
    caseStudiesCompleted: 8,
    leadershipAssessments: 2,
    knowledgeContributions: 22,
    innovationContributions: 2,
    stewardshipProjects: 4,
    communityService: false,
    researchPublished: 1,
    readinessReviews: [{ period: "2026", status: "Council track — graduation criteria forming" }],
    graduationStatus: "readiness_review",
    href: "/library/stewardship/library-council",
  },
];

/** Practical case studies linked to Knowledge Objects — Custodian Programme teaching layer */
export const CUSTODIAN_CASE_STUDIES: CustodianCaseStudy[] = [
  {
    id: "CS-FND-001",
    title: "Sustainable Stewardship — Two Complementary Engines",
    track: "Foundation",
    moduleId: "FND-004",
    summary:
      "How the Founder balanced client revenue with long-term institution building — and why household welfare is part of stewardship, not separate from it.",
    href: "/library/founder-insights/sustainable-stewardship",
    knowledgeObjectId: "FOUNDER-INSIGHT-001",
    status: "approved",
  },
];

export const CURRICULUM_TRACKS: { track: string; modules: CurriculumModule[] }[] = [
  {
    track: "Foundation",
    modules: [
      { id: "FND-001", track: "Foundation", title: "The Stankings Canons", status: "required" },
      { id: "FND-002", track: "Foundation", title: "Constitution", status: "required" },
      { id: "FND-003", track: "Foundation", title: "Institutional History", status: "required" },
      { id: "FND-004", track: "Foundation", title: "Stewardship", status: "required" },
      { id: "FND-005", track: "Foundation", title: "Ethics", status: "required" },
    ],
  },
  {
    track: "Leadership",
    modules: [
      { id: "LDR-001", track: "Leadership", title: "Governance", status: "required" },
      { id: "LDR-002", track: "Leadership", title: "Strategy", status: "forming" },
      { id: "LDR-003", track: "Leadership", title: "Finance", status: "forming" },
      { id: "LDR-004", track: "Leadership", title: "Negotiation", status: "forming" },
      { id: "LDR-005", track: "Leadership", title: "Communication", status: "forming" },
      { id: "LDR-006", track: "Leadership", title: "Public Speaking", status: "forming" },
    ],
  },
  {
    track: "Technology",
    modules: [
      { id: "TEC-001", track: "Technology", title: "AI", status: "forming" },
      { id: "TEC-002", track: "Technology", title: "Cybersecurity", status: "forming" },
      { id: "TEC-003", track: "Technology", title: "Software", status: "forming" },
      { id: "TEC-004", track: "Technology", title: "Data", status: "forming" },
      { id: "TEC-005", track: "Technology", title: "Automation", status: "forming" },
    ],
  },
  {
    track: "Enterprise",
    modules: [
      { id: "ENT-001", track: "Enterprise", title: "Entrepreneurship", status: "forming" },
      { id: "ENT-002", track: "Enterprise", title: "Venture Development", status: "forming" },
      { id: "ENT-003", track: "Enterprise", title: "Innovation", status: "available" },
      { id: "ENT-004", track: "Enterprise", title: "Operations", status: "forming" },
      { id: "ENT-005", track: "Enterprise", title: "Risk Management", status: "forming" },
    ],
  },
  {
    track: "Society",
    modules: [
      { id: "SOC-001", track: "Society", title: "Philanthropy", status: "forming" },
      { id: "SOC-002", track: "Society", title: "Education", status: "forming" },
      { id: "SOC-003", track: "Society", title: "Community Leadership", status: "forming" },
      { id: "SOC-004", track: "Society", title: "African Markets", status: "forming" },
      { id: "SOC-005", track: "Society", title: "Public Institutions", status: "forming" },
    ],
  },
];

export function getCustodianProgrammeStats() {
  const records = CUSTODIAN_RECORDS;
  const modules = CURRICULUM_TRACKS.flatMap((t) => t.modules);
  return {
    participants: records.length,
    inFormation: records.filter((r) => r.graduationStatus === "in_formation").length,
    readinessReview: records.filter((r) => r.graduationStatus === "readiness_review").length,
    alumni: records.filter((r) => r.graduationStatus === "alumni").length,
    curriculumTracks: CURRICULUM_TRACKS.length,
    curriculumModules: modules.length,
    modulesAvailable: modules.filter((m) => m.status === "available" || m.status === "required").length,
    avgProgress: Math.round(records.reduce((s, r) => s + r.learningProgress, 0) / records.length),
  };
}
