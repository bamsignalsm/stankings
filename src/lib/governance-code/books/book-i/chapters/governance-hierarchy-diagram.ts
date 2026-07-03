/**
 * Institutional Governance Hierarchy — diagram data
 * Chapter 1 — Session LIB-2026-06-27-012
 *
 * Not an org chart. Institutional authority only.
 */

export const INSTITUTIONAL_GOVERNANCE_HIERARCHY = [
  {
    id: "canons-constitution",
    label: "Canons & Constitution",
    subtitle: "Founding authority",
    href: "/library/constitution",
  },
  {
    id: "board",
    label: "Board of Directors",
    subtitle: "Highest governance authority",
    href: "/library/governance-code/book-i/chapters/book-i-ch-03",
  },
  {
    id: "ceo",
    label: "Group Chief Executive Officer",
    subtitle: "Executive leadership under Board authority",
    href: "/library/governance-code/book-i/chapters/book-i-ch-04",
  },
  {
    id: "institutional-leadership",
    label: "Institutional Leadership",
    subtitle: "Operating institutions and shared platforms",
    href: "/library/governance-code/book-i/chapters/book-i-ch-05",
  },
  {
    id: "governance-committees",
    label: "Governance Committees",
    subtitle: "Specialized oversight and advisory",
    href: "/library/governance-code/book-i/chapters/book-i-ch-07",
  },
  {
    id: "constitutional-council",
    label: "Constitutional Council",
    subtitle: "Constitutional alignment guardian",
    href: "/library/governance-code/book-i/chapters/book-i-ch-06",
  },
] as const;

export const INSTITUTIONAL_GOVERNANCE_HIERARCHY_NOTE =
  "This hierarchy shows institutional authority — not reporting lines, job titles, or team structure." as const;
