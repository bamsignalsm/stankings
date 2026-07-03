/**
 * Book I — Governance Bodies
 * Volume II · Foundational Draft
 */

import type { GovernanceBody } from "@/lib/governance-code/types";

export const BOOK_I_ID = "book-i" as const;

export const GOVERNANCE_BODIES: GovernanceBody[] = [
  {
    id: "GB-BOARD",
    name: "Board of Directors",
    shortName: "Board",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-V"],
    canonRefs: ["CANON-004", "CANON-015", "CANON-016", "CANON-020"],
    purpose:
      "To govern Stankings Group — setting constitutional direction, exercising reserved powers, and holding executive leadership accountable for stewardship of the institution.",
    responsibilities: [
      "Approve constitutional direction and major strategic initiatives.",
      "Exercise reserved powers per the Constitution and Governance Code.",
      "Appoint and evaluate executive leadership.",
      "Oversee institutional health, risk, and constitutional fidelity.",
      "Approve significant appointments to governance bodies and committees.",
      "Ensure generational stewardship — decisions serve those not yet born.",
    ],
    authority: [
      "Supreme governing authority below the Constitution and applicable law.",
      "Reserved matters requiring Board approval before execution.",
      "Authority to amend the Governance Code subject to constitutional alignment.",
      "Final authority on institutional admission, major capital allocation, and constitutional reviews.",
    ],
    composition: [
      "Directors appointed for competence, integrity, stewardship, and constitutional fidelity.",
      "Mix of independent and executive directors as required by law and governance best practice.",
      "Founder & First Custodian may hold a director seat during founding generation — succession planned.",
      "No director appointed solely by family relationship, tenure, popularity, or personal loyalty.",
    ],
    appointment: [
      "Nomination through disciplined governance process consistent with Article XVI.",
      "Constitutional affirmation per Article XVII before assuming office.",
      "Constitution training completed before first reserved matter vote.",
      "Board-approved appointment recorded in Constitutional Register of Office Holders.",
    ],
    meetings: [
      "Minimum quarterly scheduled meetings plus annual strategic retreat.",
      "Emergency meetings convened by Chair with 48-hour notice where practicable.",
      "Quorum: majority of directors in office.",
      "Board calendar published annually in Book II.",
    ],
    decisionRules: [
      "Reserved matters require formal Board resolution.",
      "Simple majority unless Constitution or law requires supermajority.",
      "Conflicts of interest declared and managed per Article XI.",
      "Minutes recorded and preserved as institutional knowledge.",
    ],
    reporting: [
      "Annual Constitutional Stewardship Report to custodians and stakeholders.",
      "Quarterly institutional health summary.",
      "Annual Board evaluation results to Constitutional Council.",
    ],
    annualReview: [
      "Board effectiveness evaluation against constitutional leadership standards.",
      "Review of reserved powers register and delegation framework.",
      "Confirmation of constitutional alignment across all institutions.",
    ],
    status: "forming",
    href: "/library/governance",
  },
  {
    id: "GB-CONSTITUTIONAL-COUNCIL",
    name: "Constitutional Council",
    shortName: "Constitutional Council",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-XV", "CONSTITUTION-ARTICLE-XVII"],
    canonRefs: ["CANON-006", "CANON-007", "CANON-025"],
    purpose:
      "To safeguard constitutional integrity — interpretation, amendment discipline, Convention review, and alignment between Volume I and operational governance.",
    responsibilities: [
      "Oversee Constitutional Convention and Volume I verification.",
      "Review proposed constitutional amendments and governance code conflicts.",
      "Maintain constitutional interpretation register.",
      "Advise Board on constitutional questions before major decisions.",
      "Coordinate ratification, affirmation standards, and constitutional education.",
    ],
    authority: [
      "Advisory authority on constitutional interpretation — not superior to the Constitution.",
      "Authority to recommend amendment, suspension of conflicting governance provisions, and Convention actions.",
      "No authority to override Board reserved matters or applicable law.",
    ],
    composition: [
      "Senior custodians, constitutional advisors, and Library Council representatives.",
      "At least one member with legal governance expertise.",
      "Chair appointed by Board on recommendation of Founder & First Custodian during founding generation.",
    ],
    appointment: [
      "Board appointment following nomination by Library Council or Board Governance Committee.",
      "Constitutional affirmation required.",
      "Staggered terms to preserve institutional memory.",
    ],
    meetings: [
      "Quarterly scheduled meetings; extraordinary sessions during Convention or amendment processes.",
      "Quorum: majority of appointed members.",
    ],
    decisionRules: [
      "Recommendations by consensus where possible; formal vote when required.",
      "Dissenting opinions recorded for institutional memory.",
      "No binding interpretation without Board adoption where reserved matter implicated.",
    ],
    reporting: [
      "Annual constitutional fidelity report to Board.",
      "Convention progress reports during Volume I freeze.",
      "Amendment pipeline status to Constitution Centre.",
    ],
    annualReview: [
      "Review constitutional implementation map across all Articles.",
      "Assess Governance Code alignment with frozen Volume I.",
    ],
    status: "planned",
    href: "/library/constitution-centre",
  },
  {
    id: "GB-EXECUTIVE-LEADERSHIP",
    name: "Executive Leadership Team",
    shortName: "ELT",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-V", "CONSTITUTION-ARTICLE-VI"],
    canonRefs: ["CANON-004", "CANON-020"],
    purpose:
      "To manage day-to-day operations of Stankings Group and its institutions — executing Board direction within delegated authority.",
    responsibilities: [
      "Implement Board strategy and constitutional direction.",
      "Manage institutional ecosystem operations.",
      "Propose decisions through constitutional decision hierarchy.",
      "Develop and mentor future leaders per Custodian Programme.",
      "Report institutional health, risk, and performance to Board.",
    ],
    authority: [
      "Delegated executive authority within decision limits defined in Book III.",
      "No authority over reserved matters without Board approval.",
      "Institutional heads manage their institutions within ecosystem charter.",
    ],
    composition: [
      "Group CEO, CFO, CTO, COO, General Counsel, and institutional heads as required.",
      "Chief Risk Officer and Chief Knowledge Officer when appointed.",
      "CEO chairs ELT; quorum per Book III.",
    ],
    appointment: [
      "Group CEO appointed by Board.",
      "Other ELT members appointed by CEO with Board approval.",
      "Constitutional affirmation and leadership standards per Article V.",
    ],
    meetings: [
      "Weekly operational rhythm minimum; monthly strategic review.",
      "Emergency convening by CEO for crisis or material risk events.",
    ],
    decisionRules: [
      "CEO decides within delegation; escalates reserved and constitutional matters.",
      "Material decisions recorded in Institutional Decision Register.",
      "Trust Impact Assessment for significant initiatives.",
    ],
    reporting: [
      "Monthly executive report to Board.",
      "Quarterly stewardship and health dashboards.",
      "Annual leadership review and succession readiness report.",
    ],
    annualReview: [
      "ELT performance against constitutional leadership standards.",
      "Delegation framework refresh and decision limit audit.",
    ],
    status: "forming",
    href: "/library/leadership",
  },
  {
    id: "GB-AUDIT-RISK",
    name: "Audit & Risk Committee",
    shortName: "Audit & Risk",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-IV", "CONSTITUTION-ARTICLE-XIV"],
    canonRefs: ["CANON-007", "CANON-015"],
    purpose:
      "To oversee financial integrity, internal controls, risk stewardship, and assurance — ensuring risks are understood, not merely avoided.",
    responsibilities: [
      "Oversee internal and external audit programmes.",
      "Review enterprise risk register and assurance plans.",
      "Monitor financial controls and significant accounting judgments.",
      "Advise Board on risk appetite and crisis preparedness.",
    ],
    authority: [
      "Authority to commission internal audits and require management response.",
      "Recommend Board action on material control weaknesses.",
      "Direct access to CFO, auditors, and risk officers without management filter.",
    ],
    composition: [
      "Minimum three directors; majority independent where practicable.",
      "At least one member with financial or audit expertise.",
      "No executive directors except CEO at invitation only.",
    ],
    appointment: ["Board appointment annually.", "Charter approved by Board."],
    meetings: ["Quarterly minimum; additional sessions before year-end reporting."],
    decisionRules: ["Committee recommendations to full Board for reserved matters."],
    reporting: ["Annual assurance report to Board.", "Summary to Constitutional Health Dashboard."],
    annualReview: ["Committee effectiveness and charter review."],
    status: "planned",
  },
  {
    id: "GB-TECH-AI",
    name: "Technology & AI Committee",
    shortName: "Tech & AI",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-XII", "CONSTITUTION-ARTICLE-XIII"],
    canonRefs: ["CANON-012", "CANON-013"],
    purpose:
      "To govern technology architecture, AI deployment, cybersecurity, and digital trust — bridging Constitution to Engineering Standards.",
    responsibilities: [
      "Oversee AI governance, model deployment, and data ethics.",
      "Review major architecture decisions and platform investments.",
      "Monitor cybersecurity posture and incident response.",
      "Ensure technology serves constitutional trust and privacy principles.",
    ],
    authority: [
      "Approve technology standards below Board reserved threshold.",
      "Mandate security reviews and architecture assessments.",
      "Escalate material AI and cyber risk to Board.",
    ],
    composition: [
      "Board members with technology literacy plus CTO and CISO advisors.",
      "External advisor permitted for specialised AI or security matters.",
    ],
    appointment: ["Board appointment; CTO serves as executive secretary."],
    meetings: ["Quarterly; extraordinary sessions after material incidents."],
    decisionRules: ["Technology decisions documented with constitutional and trust impact."],
    reporting: ["Annual AI Governance Report.", "Cybersecurity summary to Book XII."],
    annualReview: ["Technology governance maturity assessment."],
    status: "planned",
    href: "/library/platforms",
  },
  {
    id: "GB-INVESTMENT",
    name: "Investment Committee",
    shortName: "Investment",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-VII", "CONSTITUTION-ARTICLE-VIII"],
    canonRefs: ["CANON-003", "CANON-018"],
    purpose:
      "To steward capital allocation — ensuring money serves purpose, not the reverse.",
    responsibilities: [
      "Review major capital allocation and investment proposals.",
      "Oversee treasury, reserves, and escrow governance.",
      "Ensure investments align with constitutional objectives and risk appetite.",
      "Monitor institutional asset stewardship per Article VII.",
    ],
    authority: [
      "Recommend Board approval for investments above delegation thresholds.",
      "Approve investments within delegated limits per Book VII.",
    ],
    composition: ["Board members plus CFO; independent financial advisor as needed."],
    appointment: ["Board appointment."],
    meetings: ["Quarterly; ad hoc for material transactions."],
    decisionRules: ["Investment memos require financial, risk, and constitutional analysis."],
    reporting: ["Quarterly capital allocation report.", "Annual asset stewardship summary."],
    annualReview: ["Investment principles and delegation limits review."],
    status: "planned",
    href: "/library/institutional-assets",
  },
  {
    id: "GB-INNOVATION-VENTURE",
    name: "Innovation & Venture Committee",
    shortName: "Innovation & Venture",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-X", "CONSTITUTION-ARTICLE-II"],
    canonRefs: ["CANON-013", "CANON-018", "CANON-022"],
    purpose:
      "To govern the institutional lifecycle engine — incubation, venture review, spin-offs, and honourable conclusion.",
    responsibilities: [
      "Oversee Venture Studio pipeline and prototype funding.",
      "Review institution admission and lifecycle transitions.",
      "Ensure innovation remains constitutional stewardship, not recklessness.",
      "Monitor intellectual property and commercialization ethics.",
    ],
    authority: [
      "Approve incubation stages within delegated funding limits.",
      "Recommend Board approval for new institutions and spin-offs.",
    ],
    composition: ["Board and ELT members; Venture Studio lead; institutional innovators."],
    appointment: ["Board appointment."],
    meetings: ["Monthly during active pipeline; quarterly otherwise."],
    decisionRules: ["Venture proposals require lifecycle review per Article X and Schedule H."],
    reporting: ["Innovation Report per Book XII.", "Pipeline status to Innovation Portal."],
    annualReview: ["Innovation governance and Schedule H alignment review."],
    status: "planned",
    href: "/library/innovation",
  },
  {
    id: "GB-LIBRARY-COUNCIL",
    name: "Knowledge & Library Council",
    shortName: "Library Council",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-XIII", "CONSTITUTION-ARTICLE-XV"],
    canonRefs: ["CANON-009", "CANON-021", "CANON-023"],
    purpose:
      "To govern The Stankings Library — preserving institutional knowledge, approving canonical publications, and maintaining single source of truth.",
    responsibilities: [
      "Approve Canons, Constitution amendments, and Library standards.",
      "Maintain knowledge governance and publication discipline.",
      "Oversee Library integrity, versioning, and historical preservation.",
      "Govern AI knowledge use and institutional memory.",
      "Convene Canon Review Summit at ~25–30 Canons.",
    ],
    authority: [
      "Publication approval authority for Library volumes and knowledge objects.",
      "Recommend constitutional and governance code changes to Board.",
      "Standards enforcement per LS-001 and LS-002.",
    ],
    composition: [
      "Founder & First Custodian (founding generation).",
      "Custodians and senior institutional stewards.",
      "Editorial and knowledge governance representatives.",
    ],
    appointment: [
      "Founding Council established 2026-06-27.",
      "Future appointments through Custodian Programme and Board approval.",
    ],
    meetings: ["Monthly editorial rhythm; extraordinary sessions for adoption votes."],
    decisionRules: ["Founder's Resolution No. 001 applies to all Library admissions."],
    reporting: ["Knowledge Report per Book XII.", "Publication register to Stankings Library Portal."],
    annualReview: ["Library maturity and knowledge contribution assessment."],
    status: "established",
    href: "/library/stankings-library",
  },
  {
    id: "GB-ETHICS-INTEGRITY",
    name: "Ethics & Integrity Committee",
    shortName: "Ethics & Integrity",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-XI"],
    canonRefs: ["CANON-002", "CANON-007", "CANON-010"],
    purpose:
      "To uphold institutional integrity — conflicts of interest, ethics, disclosures, and the Annual Integrity Declarations.",
    responsibilities: [
      "Oversee Integrity & Ethics Centre and declaration programme.",
      "Review material conflicts and ethics investigations.",
      "Advise Board on integrity matters affecting trust.",
      "Monitor constitutional ethics training completion.",
    ],
    authority: [
      "Require disclosure and recusal.",
      "Recommend disciplinary action to Board and CEO within governance limits.",
      "Access integrity declarations per ED 39.",
    ],
    composition: ["Independent directors preferred; General Counsel advisory; no conflicted members."],
    appointment: ["Board appointment."],
    meetings: ["Quarterly; confidential sessions as required."],
    decisionRules: ["Matters involving directors referred to Board without management present."],
    reporting: ["Annual integrity summary to Board (aggregated, privacy-preserving)."],
    annualReview: ["IEC framework and declaration coverage review."],
    status: "forming",
    href: "/library/integrity-ethics",
  },
  {
    id: "GB-COMPENSATION-LEADERSHIP",
    name: "Compensation & Leadership Committee",
    shortName: "Compensation & Leadership",
    constitutionalRefs: ["CONSTITUTION-ARTICLE-V", "CONSTITUTION-ARTICLE-XVI"],
    canonRefs: ["CANON-004", "CANON-019"],
    purpose:
      "To align compensation and leadership development with stewardship — rewarding constitutional fidelity, not short-term extraction.",
    responsibilities: [
      "Review executive compensation philosophy and packages.",
      "Oversee leadership evaluation and succession planning.",
      "Link compensation to stewardship outcomes and custodian development.",
      "Ensure no compensation undermines constitutional integrity.",
    ],
    authority: [
      "Recommend CEO and executive compensation to Board.",
      "Approve leadership development investments within budget.",
    ],
    composition: ["Independent directors; no executives except CEO for discussion excluding self."],
    appointment: ["Board appointment."],
    meetings: ["Semi-annual minimum; annual compensation cycle."],
    decisionRules: ["Executive sessions for compensation decisions."],
    reporting: ["Annual compensation philosophy statement.", "Succession readiness summary to Board."],
    annualReview: ["Compensation alignment with constitutional leadership standards."],
    status: "planned",
    href: "/library/custodian-programme",
  },
];

export function getGovernanceBody(id: string): GovernanceBody | undefined {
  return GOVERNANCE_BODIES.find((b) => b.id === id);
}

export function getBookIStats() {
  return {
    bodies: GOVERNANCE_BODIES.length,
    established: GOVERNANCE_BODIES.filter((b) => b.status === "established").length,
    forming: GOVERNANCE_BODIES.filter((b) => b.status === "forming").length,
    planned: GOVERNANCE_BODIES.filter((b) => b.status === "planned").length,
  };
}
