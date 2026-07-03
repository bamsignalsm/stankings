/**
 * Stewardship profiles — observable stewardship per Article III / ED 31
 */

import type { StewardshipProfile } from "@/lib/stewardship/types";
import { ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS } from "@/lib/frameworks/stewardship-portal";

const ARTICLE_III_REFS = [
  "Art. III § 3.01 — Principle of Stewardship",
  "Art. III § 3.05 — Succession as Constitutional Duty",
  "Art. III § 3.06 — Institutional Memory",
];

export const STEWARDSHIP_PROFILES: StewardshipProfile[] = [
  {
    slug: "stanley-ukeje",
    name: "Stanley Ukeje",
    role: "Founder",
    title: "Founder & Editor-in-Chief",
    status: "active",
    currentResponsibilities: [
      "Constitutional architecture and Volume I authorship",
      "Library Council stewardship",
      "Institutional vision and custodian formation",
      "Ecosystem integrity across operating institutions",
    ],
    institutionsOverseen: [
      "Stankings Group",
      "The Stankings Library",
      "The Stankings Institute",
    ],
    successionStatus: {
      label: "Documented",
      detail:
        "Custodian Programme and Institute leadership pipeline in development. Constitutional succession principles established in Article III — legal trust mechanics to follow.",
      status: "documented",
    },
    knowledgeContributions: [
      { title: "Volume 0 — The Stankings Canons", href: "/library/first-principles" },
      { title: "Volume I — Constitution (Articles I–XVII)", href: "/library/constitution" },
      { title: "Institutional Knowledge Graph", href: "/library/frameworks/institutional-knowledge-graph" },
    ],
    decisionsAuthored: [
      { title: "IDR-GATES-001 — Four-gate workflow", href: "/library/decisions/IDR-GATES-001" },
      { title: "JR-BAMBET-001 — Decline BamBet", href: "/library/decision-intelligence" },
    ],
    lessonsLearnedPublished: [
      { title: "CANON-009 — Learn From Failure", href: "/library/canon/CANON-009" },
      { title: "Lessons Learned Register", href: "/library/frameworks/lessons-learned" },
    ],
    canonReferences: ["CANON-004", "CANON-006", "CANON-007", "CANON-019", "CANON-025"],
    constitutionArticles: [
      ...ARTICLE_III_REFS,
      "Art. I § 1.06 — Institutional Continuity",
      "Art. II § 2.04 — Constitutional Objectives",
    ],
    stewardshipReviews: [
      { period: "2026", status: "Inaugural constitutional era", href: "/library/frameworks/annual-stewardship-review" },
    ],
    trainingCompleted: [
      "Custodian Programme — Founding curriculum",
      "Constitutional architecture seminar",
    ],
    custodianProgrammeProgress: 100,
    annualDeclaration: {
      year: "2026",
      status: "submitted",
      submittedAt: "2026-06-27",
      affirmations: [...ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS],
      improvementsIdentified: [
        "Complete Article IX onward of the Constitution",
        "Formalize legal trust structure with counsel",
        "Expand documented succession beyond founder role",
      ],
    },
  },
  {
    slug: "library-council",
    name: "Library Council",
    role: "Governance",
    title: "Constitutional Custodian Body",
    status: "active",
    currentResponsibilities: [
      "Canon and constitutional review",
      "Knowledge Object approval",
      "Volume integrity and amendment discipline",
      "Stewardship review recommendations",
    ],
    institutionsOverseen: ["The Stankings Library", "Stankings Group (governance)"],
    successionStatus: {
      label: "In progress",
      detail: "Council membership succession framework linked to Custodian Programme graduation criteria.",
      status: "in_progress",
    },
    knowledgeContributions: [
      { title: "LS-001 — Knowledge Object Standard", href: "/library/standards/ls-001" },
      { title: "Canon Maturity Dashboard", href: "/library/canon-maturity" },
    ],
    decisionsAuthored: [
      { title: "Volume 0 Version 1.0 approval", href: "/library/first-principles" },
      { title: "CANON-025 capstone adoption", href: "/library/canon/CANON-025" },
    ],
    lessonsLearnedPublished: [
      { title: "CANON-007 — Truth Before Convenience", href: "/library/canon/CANON-007" },
    ],
    canonReferences: ["CANON-007", "CANON-019", "CANON-023", "CANON-025"],
    constitutionArticles: ARTICLE_III_REFS,
    stewardshipReviews: [{ period: "2026", status: "Volume 0 sealed; Volume I in progress" }],
    trainingCompleted: ["Library Council mandate orientation"],
    annualDeclaration: {
      year: "2026",
      status: "submitted",
      submittedAt: "2026-06-27",
      affirmations: [...ANNUAL_STEWARDSHIP_DECLARATION_AFFIRMATIONS],
    },
  },
  {
    slug: "future-custodian",
    name: "Future Custodian (Preview)",
    role: "Custodian-in-Formation",
    title: "Custodian Programme — Age 14 Track",
    status: "custodian-in-formation",
    currentResponsibilities: [
      "Volume 0 canon study",
      "Reflection and stewardship journaling",
      "Institutional vocabulary (Lexicon)",
    ],
    institutionsOverseen: [],
    successionStatus: {
      label: "Formation",
      detail: "Succession planning not yet applicable — preparation phase per Custodian Programme.",
      status: "in_progress",
    },
    knowledgeContributions: [],
    decisionsAuthored: [],
    lessonsLearnedPublished: [],
    canonReferences: ["CANON-001", "CANON-004", "CANON-025"],
    constitutionArticles: ["Art. III § 3.01 — Principle of Stewardship"],
    stewardshipReviews: [],
    trainingCompleted: ["Custodian Programme — Volume 0 introduction"],
    custodianProgrammeProgress: 70,
    annualDeclaration: {
      year: "2026",
      status: "pending",
      affirmations: [],
      improvementsIdentified: ["Complete CANON-025 endurance reflection"],
    },
  },
];

export const STEWARDSHIP_PORTAL_IDENTIFIER = "stewardship-portal";

export function getStewardshipProfile(slug: string): StewardshipProfile | undefined {
  return STEWARDSHIP_PROFILES.find((p) => p.slug === slug);
}

export function getStewardshipStats() {
  return {
    total: STEWARDSHIP_PROFILES.length,
    declarationsSubmitted: STEWARDSHIP_PROFILES.filter(
      (p) => p.annualDeclaration.status === "submitted",
    ).length,
    successionDocumented: STEWARDSHIP_PROFILES.filter(
      (p) => p.successionStatus.status === "documented",
    ).length,
    inFormation: STEWARDSHIP_PROFILES.filter(
      (p) => p.status === "custodian-in-formation",
    ).length,
  };
}
