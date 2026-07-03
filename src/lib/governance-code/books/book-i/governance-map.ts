/**
 * Book I — Governance Map (architectural diagram)
 * Foundational Charter v1.0 RC1 — Session LIB-2026-06-27-011
 */

export const GOVERNANCE_MAP_AUTHORITY_STACK = [
  { id: "canons", label: "Stankings Canons", href: "/library/first-principles" },
  { id: "constitution", label: "Stankings Group Constitution", href: "/library/constitution" },
  { id: "governance-code", label: "Governance Code (Volume II)", href: "/library/governance-code" },
  { id: "board", label: "Board of Directors", href: "/library/governance-code/book-i/chapters/book-i-ch-03" },
  { id: "ceo", label: "Group Chief Executive Officer", href: "/library/governance-code/book-i/chapters/book-i-ch-04" },
] as const;

export const GOVERNANCE_MAP_EXECUTIVE_BRANCHES = [
  { id: "operating-institutions", label: "Operating Institutions" },
  { id: "shared-platforms", label: "Shared Platforms" },
  { id: "group-functions", label: "Group Functions" },
] as const;

export const GOVERNANCE_MAP_OPERATING_DEPTH = [
  { id: "operating-teams", label: "Operating Teams" },
] as const;

/** @deprecated Linear flow — use GOVERNANCE_MAP_AUTHORITY_STACK */
export const GOVERNANCE_MAP_AUTHORITY_FLOW = [
  "Stankings Canons",
  "The Constitution",
  "Governance Code",
  "Board of Directors",
  "Group Chief Executive Officer",
  "Operating Institutions",
  "Operating Teams",
] as const;

export const GOVERNANCE_MAP_ADVISORY_BODIES = [
  {
    name: "Constitutional Council",
    role: "Guardian of constitutional alignment",
    tag: "Governance Code authority — Editorial Decision No. 49",
    href: "/library/governance-code/book-i/chapters/book-i-ch-06",
  },
  {
    name: "Governance Committees",
    role: "Specialized oversight",
    href: "/library/governance-code/book-i/chapters/book-i-ch-07",
  },
  {
    name: "The Stankings Institute",
    role: "Leadership and research",
    href: "/library/stankings-institute",
  },
  {
    name: "The Stankings Library",
    role: "Knowledge and institutional memory",
    href: "/library",
  },
] as const;

export const GOVERNANCE_MAP_NOTE =
  "A governance map is not an org chart. Org charts change frequently. Governance maps change rarely." as const;

export const GOVERNANCE_MAP_SUPPORTING_LABEL = "Supporting Governance" as const;
