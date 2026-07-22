/**
 * Institution Lifecycle Registry — Article X / FRAMEWORK-ILR-001 / ED 38
 */

import { ECOSYSTEM_INSTITUTIONS } from "@/lib/ecosystem/map";
import { getConstitutionalEcosystemProfile } from "@/lib/institutional-ecosystem";
import { getInstitutionalIdentity } from "@/lib/institutional-identity";
import type {
  InstitutionLifecycleRecord,
  LifecycleStage,
} from "@/lib/institution-lifecycle/types";

export const ILR_IDENTIFIER = "FRAMEWORK-ILR-001";

const ARTICLE_X_REFS = [
  "Art. X § 10.01 — Principle of Institutional Life",
  "Art. X § 10.05 — Institutional Charter",
  "Art. X § 10.07 — Periodic Constitutional Review",
];

const STAGE_LABELS: Record<LifecycleStage, string> = {
  idea: "Idea",
  research: "Research",
  problem_validation: "Problem Validation",
  concept_development: "Concept Development",
  constitutional_review: "Constitutional Review",
  strategic_approval: "Strategic Approval",
  prototype_pilot: "Prototype or Pilot",
  formation: "Institution Formation",
  launch: "Launch",
  growth: "Growth",
  maturity: "Maturity",
  renewal: "Renewal",
  transformation: "Transformation",
  responsible_conclusion: "Responsible Conclusion",
};

const INSTITUTION_DATES: Record<
  string,
  { proposed: string; approved: string; launch?: string; stage: LifecycleStage }
> = {
  yike: { proposed: "2023-06", approved: "2024-01", launch: "2024-06", stage: "growth" },
  bamsignal: { proposed: "2023-09", approved: "2024-02", launch: "2024-08", stage: "growth" },
  bayright: { proposed: "2023-08", approved: "2024-01", launch: "2024-09", stage: "growth" },
  stanhan: { proposed: "2024-01", approved: "2024-06", stage: "formation" },
  "stankings-auto-hub": { proposed: "2024-03", approved: "2024-09", stage: "formation" },
  "stankings-logistics": { proposed: "2024-06", approved: "2025-01", stage: "formation" },
  "hannahkings-gadgets": { proposed: "2024-09", approved: "2025-03", stage: "formation" },
  "stankings-institute": { proposed: "2025-01", approved: "2025-06", stage: "formation" },
  "hannahkings-education": { proposed: "2025-03", approved: "2025-06", stage: "concept_development" },
  "stankings-foundation": { proposed: "2025-06", approved: "2026-01", stage: "concept_development" },
  "stankings-times": { proposed: "2026-06", approved: "2026-07", stage: "formation" },
  "stankings-hotel-and-suites": { proposed: "2026-06", approved: "2026-07", stage: "formation" },
  "shodis-industries": { proposed: "2026-06", approved: "2026-07", stage: "formation" },
  "stankings-venture-studio": {
    proposed: "2026-06",
    approved: "2026-06",
    stage: "constitutional_review",
  },
};

function buildMilestones(
  slug: string,
  dates: (typeof INSTITUTION_DATES)[string],
): InstitutionLifecycleRecord["milestones"] {
  const milestones: InstitutionLifecycleRecord["milestones"] = [
    { date: dates.proposed, stage: "idea", event: "Institution proposed" },
    { date: dates.approved, stage: "strategic_approval", event: "Board strategic approval" },
    { date: dates.approved, stage: "constitutional_review", event: "Constitutional review completed" },
  ];
  if (dates.launch) {
    milestones.push({ date: dates.launch, stage: "launch", event: "Institution launched" });
    milestones.push({ date: dates.launch, stage: "growth", event: "Growth phase commenced" });
  } else if (dates.stage === "formation") {
    milestones.push({ date: dates.approved, stage: "formation", event: "Formation in progress" });
  }
  if (slug === "yike") {
    milestones.push({
      date: "2026-06-27",
      stage: "renewal",
      event: "Constitutional ecosystem integration",
      note: "Article IX ecosystem profile published",
    });
  }
  return milestones;
}

function buildOperatingRecord(
  inst: (typeof ECOSYSTEM_INSTITUTIONS)[number],
): InstitutionLifecycleRecord {
  const profile = getConstitutionalEcosystemProfile(inst.slug);
  const identity = getInstitutionalIdentity(inst.slug);
  const dates = INSTITUTION_DATES[inst.slug] ?? {
    proposed: "2026-01",
    approved: "2026-06",
    stage: "constitutional_review" as LifecycleStage,
  };

  return {
    institutionId: `INST-${inst.slug.toUpperCase().replace(/-/g, "")}`,
    slug: inst.slug,
    name: inst.name,
    excellence: inst.excellence,
    constitutionalPurpose:
      identity?.institutionPurposeStatement ?? identity?.purpose ?? inst.mission,
    dateProposed: dates.proposed,
    dateApproved: dates.approved,
    launchDate: dates.launch,
    currentStage: dates.stage,
    stageLabel: STAGE_LABELS[dates.stage],
    charterStatus: identity?.status === "approved" ? "approved" : "draft",
    charterHref: `/library/institutional-identity/${inst.slug}`,
    constitutionArticles: [...ARTICLE_X_REFS, "Art. IX § 9.02 — Constitutional Identity"],
    canonReferences: inst.canonReferences,
    sharedPlatforms: inst.platformServices,
    apisPublished: profile?.apisExposed ?? [],
    apisConsumed: profile?.apisConsumed ?? [],
    stewardshipReviews: [{ year: 2026, status: "scheduled" }],
    knowledgeObjects: [
      { title: `IIS — ${inst.name}`, href: `/library/institutional-identity/${inst.slug}` },
      { title: "Ecosystem Profile", href: `/library/ecosystem-architecture/${inst.slug}` },
      { title: "Lifecycle Record", href: `/library/institution-lifecycle/${inst.slug}` },
    ],
    lessonsLearned: [],
    renewalHistory:
      inst.slug === "yike"
        ? ["2026 — Integrated into constitutional ecosystem architecture (Article IX)"]
        : [],
    transformationHistory: [],
    milestones: buildMilestones(inst.slug, dates),
    color: inst.color,
    icon: inst.icon,
    isLive: inst.isLive,
  };
}

/** BamBet — responsibly concluded before launch per CANON-018 */
export const BAMBET_LIFECYCLE_RECORD: InstitutionLifecycleRecord = {
  institutionId: "INST-BAMBET",
  slug: "bambet",
  name: "BamBet",
  excellence: "Gaming & Wagering (Concluded)",
  constitutionalPurpose:
    "Proposed sports betting platform — evaluated and responsibly concluded before institutional launch.",
  dateProposed: "2025-03",
  dateApproved: undefined,
  currentStage: "responsible_conclusion",
  stageLabel: STAGE_LABELS.responsible_conclusion,
  charterStatus: "archived",
  constitutionArticles: [
    "Art. X § 10.03 — Constitutional Innovation Review",
    "Art. X § 10.09 — Responsible Conclusion",
    "Art. X § 10.10 — Preservation of Institutional Knowledge",
    "Art. II § 2.08 — Purpose Before Expansion",
  ],
  canonReferences: ["CANON-018", "CANON-003", "CANON-002", "CANON-005"],
  sharedPlatforms: [],
  apisPublished: [],
  apisConsumed: [],
  stewardshipReviews: [],
  knowledgeObjects: [
    { title: "CANON-018 — Principles Before Opportunity", href: "/library/canon/CANON-018" },
    { title: "FRAMEWORK-PAR-001 — Principles Alignment Review", href: "/library/frameworks/principles-alignment-review" },
      { title: "Innovation Passport — BAMBET-001", href: "/library/innovation-portal/bambet-001" },
  ],
  lessonsLearned: [
    "Revenue without principle erodes trust-oriented institutional identity.",
    "Principles Alignment Review (PAR) correctly declined expansion into wagering.",
    "Future leaders ask whether proposals align with Canons — not what the founder would do.",
  ],
  renewalHistory: [],
  transformationHistory: [],
  milestones: [
    { date: "2025-03", stage: "idea", event: "Concept proposed — sports betting platform" },
    { date: "2025-04", stage: "problem_validation", event: "Market and customer research commenced" },
    { date: "2025-05", stage: "constitutional_review", event: "Principles Alignment Review initiated" },
    {
      date: "2025-06",
      stage: "responsible_conclusion",
      event: "Permanently retired — CANON-018",
      note: "Revenue opportunity declined to protect trust-centered ecosystem identity",
    },
  ],
  closureArchive: {
    conclusionDate: "2025-06",
    reason:
      "Principles Alignment Review determined wagering conflicts with trust-centered constitutional purpose (CANON-018). Orderly conclusion before launch.",
    decisionRecord: "PAR-BAMBET-2025",
    knowledgePreserved: [
      "CANON-018 historical notes",
      "Principles Alignment Review precedent",
      "Innovation Passport BAMBET-001",
    ],
    lessonsLearned: [
      "Growth must not require abandoning institutional principles.",
      "Early constitutional review prevents costly misalignment.",
    ],
  },
  color: "#6b4c4c",
  icon: "◆",
};

export const VENTURE_STUDIO_LIFECYCLE_RECORD: InstitutionLifecycleRecord = {
  institutionId: "INST-VENTURESTUDIO",
  slug: "stankings-venture-studio",
  name: "The Stankings Venture Studio",
  excellence: "Innovation Excellence",
  constitutionalPurpose:
    "To discover, evaluate, develop and launch ideas that strengthen Stankings Group and create lasting value for society.",
  dateProposed: "2026-06",
  dateApproved: "2026-06",
  currentStage: "constitutional_review",
  stageLabel: STAGE_LABELS.constitutional_review,
  charterStatus: "draft",
  charterHref: "/library/innovation-portal",
  constitutionArticles: [
    ...ARTICLE_X_REFS,
    "Art. X § 10.02 — Sources of Institutional Innovation",
    "Art. X § 10.06 — Institutional Incubation",
    "Art. II § 2.05 — Innovation as Stewardship",
    "Art. V § 5.09 — Duty to Encourage Innovation",
  ],
  canonReferences: ["CANON-003", "CANON-005", "CANON-013", "CANON-018", "CANON-022"],
  sharedPlatforms: [
    "Identity & Stankings Passport",
    "Knowledge Library",
    "Institutional AI",
    "Trust & Verification",
  ],
  apisPublished: [],
  apisConsumed: ["Passport Identity API", "Knowledge Library API"],
  stewardshipReviews: [],
  knowledgeObjects: [
    { title: "Innovation Portal", href: "/library/innovation-portal" },
    { title: "Schedule H — Innovation Framework", href: "/library/constitution/schedules#schedule-h" },
  ],
  lessonsLearned: [],
  renewalHistory: [],
  transformationHistory: [],
  milestones: [
    { date: "2026-06", stage: "idea", event: "Venture Studio concept constitutionalized" },
    { date: "2026-06", stage: "constitutional_review", event: "Article X adoption — formation authorised" },
  ],
  color: "#7c5cbf",
  icon: "✦",
};

export const INSTITUTION_LIFECYCLE_RECORDS: InstitutionLifecycleRecord[] = [
  ...ECOSYSTEM_INSTITUTIONS.map(buildOperatingRecord),
  VENTURE_STUDIO_LIFECYCLE_RECORD,
  BAMBET_LIFECYCLE_RECORD,
];

export function getInstitutionLifecycleRecord(
  slug: string,
): InstitutionLifecycleRecord | undefined {
  return INSTITUTION_LIFECYCLE_RECORDS.find((r) => r.slug === slug);
}

export function getLifecycleRegisterStats() {
  const active = INSTITUTION_LIFECYCLE_RECORDS.filter(
    (r) => r.currentStage !== "responsible_conclusion",
  ).length;
  const live = INSTITUTION_LIFECYCLE_RECORDS.filter((r) => r.isLive).length;
  const concluded = INSTITUTION_LIFECYCLE_RECORDS.filter(
    (r) => r.currentStage === "responsible_conclusion",
  ).length;
  const forming = INSTITUTION_LIFECYCLE_RECORDS.filter((r) =>
    ["formation", "constitutional_review", "concept_development", "prototype_pilot"].includes(
      r.currentStage,
    ),
  ).length;
  return { total: INSTITUTION_LIFECYCLE_RECORDS.length, active, live, forming, concluded };
}

export { STAGE_LABELS };
