/**
 * Institutional Improvement Register (IIR)
 * Improvement Knowledge Objects per CANON-019 / FRAMEWORK-IIR-001
 */

import type { ImprovementCategory } from "@/lib/frameworks/institutional-improvement";

export interface InstitutionalImprovement {
  id: string;
  slug: string;
  areaImproved: string;
  institution: string;
  institutionSlug?: string;
  category: ImprovementCategory;
  problemIdentified: string;
  improvementMade: string;
  reasonForChange: string;
  measuredOutcome: string;
  relatedCanons: string[];
  knowledgeObjectsUpdated: { identifier: string; title: string; href: string }[];
  teamsInvolved: string[];
  dateImplemented: string;
  reviewDate: string;
}

export const IMPROVEMENT_REGISTRY: InstitutionalImprovement[] = [
  {
    id: "IIR-YIKE-001",
    slug: "yike-trust-verification-rollout",
    areaImproved: "Property listing verification",
    institution: "Yike",
    institutionSlug: "yike",
    category: "customer",
    problemIdentified:
      "Buyers uncertain whether listings were genuine — fraud risk eroded marketplace confidence.",
    improvementMade:
      "Trust Verification rollout: document checksum, seller identity via Stankings Passport, trust scores on listings.",
    reasonForChange:
      "CANON-017 requires reducing uncertainty in commerce; CANON-019 requires leaving Yike stronger for next generation.",
    measuredOutcome:
      "Fraud report rate down 34% in pilot markets; buyer confidence survey +18 points; verification completion 89%.",
    relatedCanons: ["CANON-019", "CANON-017", "CANON-002", "CANON-009"],
    knowledgeObjectsUpdated: [
      { identifier: "CANON-017", title: "Reduce Uncertainty", href: "/library/canon/CANON-017" },
      { identifier: "LLR-YIKE-001", title: "Verification Bypass Lesson", href: "/library/lessons/LLR-YIKE-001" },
    ],
    teamsInvolved: ["Yike Trust", "Identity Platform", "Trust Platform Engineering"],
    dateImplemented: "2026-03-15",
    reviewDate: "2026-09-15",
  },
  {
    id: "IIR-BAYRIGHT-001",
    slug: "bayright-settlement-sla-monitoring",
    areaImproved: "Settlement reliability and visibility",
    institution: "BayRight",
    institutionSlug: "bayright",
    category: "engineering",
    problemIdentified:
      "Settlement delays detected late — customers learned of problems before internal teams (INC-BAYRIGHT-001).",
    improvementMade:
      "Settlement SLA monitoring, customer-facing status page, integration test gate for reconciliation pipeline.",
    reasonForChange:
      "Incident lesson converted to permanent capability — future custodians inherit stronger financial infrastructure.",
    measuredOutcome:
      "Mean time to detection reduced from 8 hours to 12 minutes; zero silent batch failures since deployment.",
    relatedCanons: ["CANON-019", "CANON-015", "CANON-014", "CANON-008"],
    knowledgeObjectsUpdated: [
      { identifier: "INC-BAYRIGHT-001", title: "Settlement Delay Incident", href: "/library/incidents" },
      { identifier: "LLR-BAYRIGHT-001", title: "Settlement Delay Lesson", href: "/library/lessons/LLR-BAYRIGHT-001" },
    ],
    teamsInvolved: ["BayRight Engineering", "Platform Reliability", "Yike Partnership"],
    dateImplemented: "2026-05-01",
    reviewDate: "2026-11-01",
  },
  {
    id: "IIR-EDU-001",
    slug: "hannahkings-stewardship-curriculum",
    areaImproved: "Custodian formation curriculum",
    institution: "Hannahkings Education",
    institutionSlug: "hannahkings-education",
    category: "learning",
    problemIdentified:
      "Learners lacked structured introduction to institutional stewardship and Volume 0 philosophy.",
    improvementMade:
      "Stewardship pathway module: Volume 0 excerpts, Improvement Test exercises, custodian reflection journals.",
    reasonForChange:
      "CANON-019 bridge to Family Constitution — sons and grandsons improve rather than merely inherit.",
    measuredOutcome:
      "142 learners completed pathway; custodian programme readiness scores +24%; 3 family constitution cross-references added.",
    relatedCanons: ["CANON-019", "CANON-004", "CANON-006", "CANON-010"],
    knowledgeObjectsUpdated: [
      { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019" },
    ],
    teamsInvolved: ["Hannahkings Curriculum", "Stankings Institute", "Library Council"],
    dateImplemented: "2026-06-01",
    reviewDate: "2027-06-01",
  },
  {
    id: "IIR-GOV-001",
    slug: "annual-stewardship-review-process",
    areaImproved: "Group governance — stewardship accountability",
    institution: "Stankings Group",
    category: "governance",
    problemIdentified:
      "No standard mechanism for departments to document what they preserved, improved, and passed forward annually.",
    improvementMade:
      "Annual Stewardship Review process (ASR) established; reviews filed as permanent Knowledge Objects in Library.",
    reasonForChange:
      "Executive Decision No. 21 — improvement must be visible and auditable across generations.",
    measuredOutcome:
      "ASR template deployed to 9 operating institutions; first cycle scheduled Q4 2026; IIR dashboard live.",
    relatedCanons: ["CANON-019", "CANON-004", "CANON-009", "CANON-016"],
    knowledgeObjectsUpdated: [
      { identifier: "FRAMEWORK-ASR-001", title: "Annual Stewardship Review", href: "/library/frameworks/annual-stewardship-review" },
      { identifier: "FRAMEWORK-IIR-001", title: "Institutional Improvement Register", href: "/library/improvements" },
    ],
    teamsInvolved: ["Library Council", "IKI", "Group Executive Office"],
    dateImplemented: "2026-06-27",
    reviewDate: "2027-06-27",
  },
  {
    id: "IIR-ENG-001",
    slug: "auth-deploy-smoke-tests",
    areaImproved: "Identity deployment safety",
    institution: "Group Platform",
    category: "engineering",
    problemIdentified:
      "Auth middleware regression caused 47-minute outage (INC-ENG-001) — deploy pipeline lacked identity smoke tests.",
    improvementMade:
      "Mandatory auth E2E check in CI; canary deployment policy for identity-critical changes; middleware matcher audit.",
    reasonForChange:
      "Every release should leave the platform stronger — technical stewardship per CANON-019.",
    measuredOutcome:
      "Zero auth regressions in 6 post-implementation deploys; deploy pipeline blocks 2 would-be regressions in CI.",
    relatedCanons: ["CANON-019", "CANON-015", "CANON-011", "CANON-008"],
    knowledgeObjectsUpdated: [
      { identifier: "INC-ENG-001", title: "Auth Outage Incident", href: "/library/incidents" },
      { identifier: "LLR-ENG-001", title: "Deployment Configuration Lesson", href: "/library/lessons/LLR-ENG-001" },
    ],
    teamsInvolved: ["Platform Engineering", "Identity Platform", "DevOps"],
    dateImplemented: "2026-05-25",
    reviewDate: "2026-11-25",
  },
];

export function getImprovement(slug: string): InstitutionalImprovement | undefined {
  return IMPROVEMENT_REGISTRY.find((i) => i.slug === slug || i.id === slug);
}

export function searchImprovements(query: string): InstitutionalImprovement[] {
  const q = query.toLowerCase().trim();
  if (!q) return IMPROVEMENT_REGISTRY;
  return IMPROVEMENT_REGISTRY.filter((i) => {
    const haystack = [
      i.id,
      i.areaImproved,
      i.institution,
      i.problemIdentified,
      i.improvementMade,
      i.measuredOutcome,
      ...i.teamsInvolved,
      ...i.relatedCanons,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getImprovementsByCategory(category: ImprovementCategory): InstitutionalImprovement[] {
  return IMPROVEMENT_REGISTRY.filter((i) => i.category === category);
}

export function getImprovementDashboardStats() {
  const now = new Date();
  const year = now.getFullYear();
  const quarterStart = new Date(year, Math.floor(now.getMonth() / 3) * 3, 1);

  const thisYear = IMPROVEMENT_REGISTRY.filter(
    (i) => new Date(i.dateImplemented).getFullYear() === year
  );
  const thisQuarter = IMPROVEMENT_REGISTRY.filter(
    (i) => new Date(i.dateImplemented) >= quarterStart
  );

  return {
    total: IMPROVEMENT_REGISTRY.length,
    thisYear: thisYear.length,
    thisQuarter: thisQuarter.length,
    customer: getImprovementsByCategory("customer").length,
    engineering: getImprovementsByCategory("engineering").length,
    governance: getImprovementsByCategory("governance").length,
    community: getImprovementsByCategory("community").length,
    learning: getImprovementsByCategory("learning").length,
    operations: getImprovementsByCategory("operations").length,
  };
}
