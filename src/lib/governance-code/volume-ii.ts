/**
 * Volume II — The Stankings Group Governance Code
 * Architecture phase — Executive Decision No. 46, No. 48
 */

export const GOVERNANCE_CODE_VERSION = "0.1" as const;
export const GOVERNANCE_CODE_STATUS = "planning" as const;
export const GOVERNANCE_CODE_EFFECTIVE_DATE = "2026-06-27";

export const GOVERNANCE_CODE_TITLE = "The Stankings Group Governance Code";

export const GOVERNANCE_CODE_PURPOSE = `The Constitution establishes enduring principles.

This Governance Code establishes the operational practices, governance procedures and institutional standards through which those constitutional principles are implemented.

Where any provision of this Governance Code conflicts with the Constitution, the Constitution shall prevail.`;

export const GOVERNANCE_STACK = [
  "Canons",
  "Constitution",
  "Governance Code",
  "Policies",
  "Engineering Standards",
  "Daily Operations",
] as const;

export const GOVERNANCE_BODY_TEMPLATE_FIELDS = [
  "Purpose",
  "Responsibilities",
  "Authority",
  "Composition",
  "Appointment",
  "Meetings",
  "Decision Rules",
  "Reporting",
  "Annual Review",
] as const;

export {
  GOVERNANCE_CODE_BOOKS,
  getGovernanceBook,
  getGovernanceBookStats,
} from "@/lib/governance-code/books/registry";
