/**
 * Sources of Authority — institutional hierarchy diagram
 * Chapter 1 — Session LIB-2026-06-27-012
 */

export const SOURCES_OF_AUTHORITY_STACK = [
  {
    id: "canons",
    label: "Stankings Canons",
    subtitle: "Volume 0 — Founding principles",
    href: "/library/first-principles",
  },
  {
    id: "constitution",
    label: "Stankings Group Constitution",
    subtitle: "Volume I — Constitutional law",
    href: "/library/constitution",
  },
  {
    id: "governance-code",
    label: "Governance Code",
    subtitle: "Volume II — Governance bodies and procedures",
    href: "/library/governance-code",
  },
  {
    id: "executive-decisions",
    label: "Executive Decisions",
    subtitle: "Institutional decisions under the Governance Framework",
    href: "/library/decisions",
  },
  {
    id: "policies",
    label: "Policies",
    subtitle: "Group-wide institutional policy",
    href: "/library/policies",
  },
  {
    id: "standards",
    label: "Standards",
    subtitle: "Engineering and operational standards",
    href: "/library/standards",
  },
  {
    id: "operating-procedures",
    label: "Operating Procedures",
    subtitle: "Day-to-day execution within governance boundaries",
    href: "/library/procedures",
  },
] as const;

export const SOURCES_OF_AUTHORITY_NOTE =
  "Higher sources prevail over lower sources. Where conflict exists, authority resolves upward toward the Canons." as const;
