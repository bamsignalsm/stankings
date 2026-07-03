/**
 * Constitution Centre — Article XV / FRAMEWORK-CCR-001 / ED 43
 */

import { CONSTITUTION_SCHEDULES } from "@/lib/constitution/schedules";
import {
  CONSTITUTION_AMENDMENT_HISTORY,
  CONSTITUTION_EFFECTIVE_DATE,
  CONSTITUTION_HISTORY,
  CONSTITUTION_VERSION,
} from "@/lib/constitution/volume-i";
import type {
  AmendmentProposal,
  ConstitutionRegisterEntry,
  ConstitutionVersionRecord,
} from "@/lib/constitution-centre/types";

export const CCR_IDENTIFIER = "FRAMEWORK-CCR-001";

export const CONSTITUTION_VERSIONS: ConstitutionVersionRecord[] = [
  {
    version: CONSTITUTION_VERSION,
    effectiveDate: CONSTITUTION_EFFECTIVE_DATE,
    summary: "Volume I v1.0 — Preamble and Articles I–XVII frozen for Convention review. Ratification, custodians, and self-governance.",
    approver: "Library Council",
    articlesCount: 17,
    partsCount: 5,
  },
];

export const AMENDMENT_PROPOSALS: AmendmentProposal[] = [
  {
    amendmentId: "AMD-2026-001",
    sponsor: "Library Council",
    articlesAffected: ["Article II"],
    existingText: "Article II — no explicit innovation stewardship section prior to v1.0 amendment.",
    proposedText: "Section 2.05 — Innovation as Stewardship (renumbered 2.06–2.09).",
    constitutionalAnalysis: "Innovation constitutionalized as stewardship obligation per CANON-013 and Art. X lifecycle engine.",
    trustImpactAssessment: "FRAMEWORK-TIA-001 — strengthens long-term trust through responsible innovation discipline.",
    governanceReview: "Approved — aligns with Innovation Portal and Schedule H.",
    legalReview: "No legal impediment — internal constitutional amendment.",
    boardDecision: "Adopted 2026-06-27 — Library Council",
    effectiveDate: "2026-06-27",
    status: "adopted",
    versionFrom: "1.0-draft",
    versionTo: "1.0",
    principlesAffected: ["CANON-013", "CANON-006", "CANON-022"],
    alternativesConsidered: ["Innovation policy only — rejected; insufficient constitutional weight"],
  },
  {
    amendmentId: "AMD-2026-002",
    sponsor: "Library Council",
    articlesAffected: ["Article V"],
    existingText: "Article V — evaluation criteria without explicit duty to encourage innovation.",
    proposedText: "Section 5.09 — Duty to Encourage Innovation (evaluation renumbered 5.10, interpretation 5.11).",
    constitutionalAnalysis: "Leadership standards extended — leaders must encourage innovation within constitutional bounds.",
    trustImpactAssessment: "Positive — innovation without constitutional guardrails erodes trust; amendment prevents that.",
    governanceReview: "Approved — consistent with FRAMEWORK-LGOV-001.",
    legalReview: "N/A — internal governance.",
    boardDecision: "Adopted 2026-06-27 — Library Council",
    effectiveDate: "2026-06-27",
    status: "adopted",
    versionFrom: "1.0-draft",
    versionTo: "1.0",
    principlesAffected: ["CANON-013", "CANON-004", "CANON-020"],
    alternativesConsidered: ["Schedule H only — insufficient for leadership accountability"],
  },
  {
    amendmentId: "AMD-PLANNED-001",
    sponsor: "Constitutional Review Committee (forming)",
    articlesAffected: ["Article XVIII"],
    existingText: "Constitutional Schedules not yet formalized as closing Article.",
    proposedText: "Article XVIII — Constitutional Schedules.",
    constitutionalAnalysis: "Pending — Article XVIII planned to formalize Schedules A–H and conclude Volume I.",
    trustImpactAssessment: "Pending FRAMEWORK-TIA-001.",
    governanceReview: "Scheduled post Constitutional Congress.",
    legalReview: "Pending",
    boardDecision: "Not yet submitted",
    effectiveDate: null,
    status: "draft",
    versionFrom: "1.0",
    versionTo: null,
    principlesAffected: ["CANON-016", "CANON-025"],
    alternativesConsidered: ["Schedules as appendix only — rejected; insufficient constitutional weight"],
  },
];

export const CONSTITUTION_REGISTER: ConstitutionRegisterEntry[] = [
  { registerId: "CCR-CONSTITUTION", category: "Current Constitution", title: `Volume I v${CONSTITUTION_VERSION}`, href: "/library/constitution", status: "current" },
  { registerId: "CCR-AMENDMENTS", category: "Amendment History", title: "Constitutional Amendment Register", href: "/library/constitution-centre#amendments", status: "current" },
  { registerId: "CCR-REVIEWS", category: "Constitutional Reviews", title: "Periodic Review Calendar", href: "/library/constitution/schedules#schedule-g", status: "forming" },
  { registerId: "CCR-COMMENTARY", category: "Constitutional Commentaries", title: "Editorial & Historical Notes", href: "/library/constitution#history", status: "current" },
  { registerId: "CCR-INTERPRETATIONS", category: "Official Interpretations", title: "Constitutional Interpretation Register", href: "/library/constitution-centre", status: "forming" },
  { registerId: "CCR-SCHEDULES", category: "Constitutional Schedules", title: "Schedules A–H", href: "/library/constitution/schedules", status: "current" },
  { registerId: "CCR-RATIFICATION", category: "Ratification Records", title: "Volume I Adoption Record", href: "/library/constitutional-ceremony", status: "current" },
  { registerId: "CCR-CANONS", category: "Canon Cross-References", title: "Volume 0 — The Canons", href: "/library/first-principles", status: "current" },
];

export const REVIEW_CALENDAR = [
  { event: "Periodic Constitutional Review", frequency: "Every 5 years", authority: "Board", article: "Art. XV § 15.05" },
  { event: "Constitutional Health Review", frequency: "Annual", authority: "Board", article: "Art. XIV § 14.02" },
  { event: "Canon Review Summit", frequency: "At ~25–30 Canons", authority: "Library Council", article: "Volume 0 guidance" },
  { event: "Constitutional Congress", frequency: "Before Volume I seal", authority: "Library Council", article: "Editorial milestone" },
];

export function getConstitutionCentreStats() {
  return {
    currentVersion: CONSTITUTION_VERSION,
    effectiveDate: CONSTITUTION_EFFECTIVE_DATE,
    versions: CONSTITUTION_VERSIONS.length,
    amendmentsAdopted: AMENDMENT_PROPOSALS.filter((a) => a.status === "adopted").length,
    amendmentsPending: AMENDMENT_PROPOSALS.filter((a) => a.status !== "adopted").length,
    registerEntries: CONSTITUTION_REGISTER.length,
    schedules: CONSTITUTION_SCHEDULES.length,
    historyEvents: CONSTITUTION_HISTORY.length,
    amendmentRecords: CONSTITUTION_AMENDMENT_HISTORY.length,
  };
}
