/**
 * Constitutional governance body profiles — Article IV / FRAMEWORK-CGOV-001
 */

import type { GovernanceBodyProfile } from "@/lib/governance/types";
import { RESERVED_POWERS_REGISTER } from "@/lib/frameworks/constitutional-governance-portal";

const ARTICLE_IV_REFS = [
  "Art. IV § 4.01 — Principle of Constitutional Governance",
  "Art. IV § 4.04 — Constitutional Duties of the Board",
  "Art. IV § 4.06 — Delegation of Authority",
];

export const GOVERNANCE_BODY_PROFILES: GovernanceBodyProfile[] = [
  {
    slug: "board-of-directors",
    type: "board",
    name: "Board of Directors",
    subtitle: "Guardian of the institution",
    status: "forming",
    mandate:
      "Safeguard the Constitution, Canons, institutional purpose, trust, and long-term resilience — govern without managing day-to-day operations.",
    constitutionalResponsibilities: [
      "Safeguard the Constitution and Stankings Canons",
      "Approve long-term institutional strategy",
      "Oversee leadership succession and risk governance",
      "Maintain financial sustainability and institutional resilience",
      "Review Annual Stewardship Reports and governance effectiveness",
    ],
    reservedPowers: [...RESERVED_POWERS_REGISTER],
    activeCommittees: [
      { title: "Library Council", href: "/library" },
      { title: "Audit & Risk (planned)" },
      { title: "Succession & Stewardship (planned)" },
    ],
    decisions: [
      { title: "Volume 0 Version 1.0 approval", href: "/library/first-principles" },
      { title: "Constitution Preamble adoption", href: "/library/constitution" },
      { title: "CANON-025 capstone adoption", href: "/library/canon/CANON-025" },
    ],
    stewardshipReviews: [
      {
        period: "2026",
        status: "Inaugural constitutional era",
        href: "/library/frameworks/annual-stewardship-review",
      },
    ],
    canonReferences: ["CANON-004", "CANON-006", "CANON-007", "CANON-015", "CANON-025"],
    constitutionArticles: ARTICLE_IV_REFS,
  },
  {
    slug: "group-ceo",
    type: "ceo",
    name: "Office of the Group Chief Executive Officer",
    subtitle: "Executive management accountable to the Board",
    status: "active",
    mandate:
      "Faithfully implement strategic direction established through constitutional governance — manage responsibly, report honestly, remain accountable to the Board.",
    delegatedAuthority: [
      "Day-to-day management of Group operating institutions",
      "Execution of Board-approved strategy within constitutional limits",
      "Appointment of institutional leadership subject to Board reserved powers",
      "Operational capital allocation within Board-approved thresholds",
    ],
    strategicObjectives: [
      "Complete Volume I Constitution (Articles IV–VI)",
      "Operationalize Constitutional Alignment Engine across institutions",
      "Strengthen stewardship and governance observability",
      "Prepare custodian succession pipeline",
    ],
    constitutionalDuties: [
      "Manage responsibly",
      "Report honestly",
      "Develop people",
      "Protect institutional assets",
      "Preserve institutional knowledge",
      "Maintain operational excellence",
      "Remain accountable to the Board",
    ],
    decisionRegistry: [
      { title: "IDR-GATES-001 — Four-gate workflow", href: "/library/decisions/IDR-GATES-001" },
      { title: "Executive Decisions 1–31", href: "/library/iki" },
    ],
    annualStewardshipDeclaration: {
      year: "2026",
      status: "submitted",
      href: "/library/stewardship/stanley-ukeje",
    },
    canonReferences: ["CANON-004", "CANON-007", "CANON-011", "CANON-020"],
    constitutionArticles: [
      "Art. IV § 4.05 — Constitutional Duties of Executive Leadership",
      "Art. IV § 4.03 — Separation of Governance and Management",
    ],
  },
  {
    slug: "executive-leadership",
    type: "executive-leadership",
    name: "Executive Leadership",
    subtitle: "Group and institutional executives",
    status: "active",
    functionalResponsibilities: [
      "Institutional managing directors and functional leaders",
      "Framework implementation (PAF, TIA, EIA, CAE gates)",
      "Operational excellence across ecosystem institutions",
      "People development and succession at institution level",
    ],
    authorityMatrix: [
      { domain: "Product & operations", authority: "Manage within constitutional and Board limits" },
      { domain: "Hiring & development", authority: "Institution-level; CEO/Board for senior roles" },
      { domain: "Capital expenditure", authority: "Delegated thresholds; reserved powers above" },
      { domain: "New institutions", authority: "Proposal only — Board reserved power" },
      { domain: "Constitutional matters", authority: "None — Library Council and Board" },
    ],
    kpis: [
      "Constitutional compliance rate on major proposals",
      "Trust and purpose assessment completion",
      "Institutional Improvement Register activity",
      "Succession plan documentation per LSF",
    ],
    knowledgeContributions: [
      { title: "Judgment Records", href: "/library/decision-intelligence" },
      { title: "Institutional Decision Records", href: "/library/decisions" },
    ],
    successionStatus: "Institution-level succession documented per FRAMEWORK-LSF-001 — Group pipeline forming.",
    canonReferences: ["CANON-004", "CANON-015", "CANON-016", "CANON-019"],
    constitutionArticles: ["Art. IV § 4.05 — Executive Duties", "Art. IV § 4.06 — Delegation"],
  },
  {
    slug: "library-council",
    type: "committee",
    name: "Library Council",
    subtitle: "Governance Committee — Knowledge & Constitutional Integrity",
    status: "active",
    mandate:
      "Custodian of the Stankings Library — Canon review, constitutional amendment discipline, Knowledge Object approval, and stewardship review recommendations.",
    membership: ["Stanley Ukeje (Chair)", "Library Council members (forming)"],
    meetingRecords: [
      { title: "Volume 0 Version 1.0 — Canon Review", href: "/library/canon-maturity" },
      { title: "Constitution Volume I adoption sessions", href: "/library/constitution" },
    ],
    decisions: [
      { title: "25 Canons approved at v1.0", href: "/library/first-principles" },
      { title: "FRAMEWORK-CMD-001 adoption", href: "/library/canon-maturity" },
    ],
    recommendations: [
      "Maintain deliberate maturity — no casual Canon edits",
      "Complete Article IX onward of the Constitution",
      "Periodic Reserved Powers Register review per ED 32",
    ],
    canonReferences: ["CANON-007", "CANON-023", "CANON-025"],
    constitutionArticles: [
      "Art. IV § 4.02 — Governance Structure",
      "Art. IV § 4.08 — Governance Reviews",
    ],
  },
  {
    slug: "constitutional-owner",
    type: "owner",
    name: "Constitutional Owner(s)",
    subtitle: "Lawful ownership structure — details in future trust deed",
    status: "forming",
    mandate:
      "Exercise ownership rights in accordance with applicable law and this Constitution. The Constitution establishes stewardship principles; the trust deed will implement ownership mechanics.",
    constitutionalResponsibilities: [
      "Appoint and remove Board members per lawful instruments",
      "Reserved matters requiring owner consent where law requires",
      "Long-term alignment with constitutional purpose",
    ],
    canonReferences: ["CANON-004", "CANON-006", "CANON-025"],
    constitutionArticles: [
      "Art. IV § 4.02 — Governance Structure",
      "Art. III § 3.01 — Principle of Stewardship",
    ],
  },
];

export const GOVERNANCE_PORTAL_IDENTIFIER = "constitutional-governance";

export function getGovernanceBodyProfile(slug: string): GovernanceBodyProfile | undefined {
  return GOVERNANCE_BODY_PROFILES.find((p) => p.slug === slug);
}

export function getGovernanceStats() {
  return {
    total: GOVERNANCE_BODY_PROFILES.length,
    active: GOVERNANCE_BODY_PROFILES.filter((p) => p.status === "active").length,
    reservedPowers: RESERVED_POWERS_REGISTER.length,
  };
}
