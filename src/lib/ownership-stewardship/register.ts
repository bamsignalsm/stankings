/**
 * Governance Architecture Register — Article VIII / ED 36
 */

import type {
  GovernanceArchitectureEntry,
  OwnershipStructureOverview,
} from "@/lib/ownership-stewardship/types";
import { GAR_REGISTER_DOMAINS } from "@/lib/frameworks/ownership-stewardship-portal";

export const OASP_PORTAL_IDENTIFIER = "FRAMEWORK-OASP-001";

const ARTICLE_VIII_REFS = [
  "Art. VIII § 8.01 — Constitutional Principle",
  "Art. VIII § 8.02 — Separation of Ownership and Governance",
  "Art. VIII § 8.03 — Constitutional Duty of Owners",
  "Art. VIII § 8.07 — Relationship to Applicable Law",
];

export const GOVERNANCE_ARCHITECTURE_REGISTER: GovernanceArchitectureEntry[] = [
  {
    id: "gar-constitution",
    domain: GAR_REGISTER_DOMAINS[0],
    layer: "Volume I",
    description: "Supreme internal governing law — Articles I–XVII and constitutional frameworks.",
    access: "constitutional",
    status: "active",
    constitutionalLink: "/library/constitution",
    relatedObjects: [
      { title: "Constitution Portal", href: "/library/constitution" },
      { title: "CONSTITUTION-ARTICLE-VIII", href: "/library/constitution/article-viii" },
    ],
  },
  {
    id: "gar-canons",
    domain: GAR_REGISTER_DOMAINS[1],
    layer: "Volume 0",
    description: "Twenty-five philosophical principles — interpreted by, not superseded by, the Constitution.",
    access: "constitutional",
    status: "active",
    constitutionalLink: "/library/first-principles",
    relatedObjects: [{ title: "Volume 0 v1.0", href: "/library/first-principles" }],
  },
  {
    id: "gar-applicable-law",
    domain: GAR_REGISTER_DOMAINS[2],
    layer: "External",
    description: "Jurisdiction-specific legal requirements — trust law, corporate law, regulatory obligations.",
    access: "legal",
    status: "forming",
    legalNote: "To be documented with qualified counsel upon formal incorporation and trust establishment.",
    relatedObjects: [],
  },
  {
    id: "gar-ownership-structures",
    domain: GAR_REGISTER_DOMAINS[3],
    layer: "Legal",
    description: "Family trust, holding entities, and lawful ownership arrangements per Art. VIII § 8.07.",
    access: "legal",
    status: "forming",
    legalNote: "Trust Deed not part of Constitution — lawyers draft under applicable law when time comes.",
    relatedObjects: [
      { title: "Constitutional Owner(s)", href: "/library/governance/constitutional-owner" },
    ],
  },
  {
    id: "gar-governance-bodies",
    domain: GAR_REGISTER_DOMAINS[4],
    layer: "Constitutional / Legal",
    description: "Board, CEO, committees, and constitutional owner — separation of ownership and governance per § 8.02.",
    access: "constitutional",
    status: "forming",
    constitutionalLink: "/library/governance",
    relatedObjects: [
      { title: "Constitutional Governance Portal", href: "/library/governance" },
      { title: "Leadership Governance", href: "/library/leadership" },
    ],
  },
  {
    id: "gar-operating-institutions",
    domain: GAR_REGISTER_DOMAINS[5],
    layer: "Charter",
    description: "Ecosystem companies and pillars — independence within constitutional alignment per § 8.05.",
    access: "constitutional",
    status: "active",
    constitutionalLink: "/library/institutional-identity",
    relatedObjects: [
      { title: "Ecosystem Map", href: "/library/ecosystem" },
      { title: "Institutional Identity Statements", href: "/library/institutional-identity" },
    ],
  },
  {
    id: "gar-governance-instruments",
    domain: GAR_REGISTER_DOMAINS[6],
    layer: "Frameworks & Registers",
    description: "Executive Decisions, frameworks, IDR, asset register, reserved powers — operational expression of constitution.",
    access: "constitutional",
    status: "active",
    relatedObjects: [
      { title: "Reserved Powers Register", href: "/library/governance" },
      { title: "Institutional Decision Register", href: "/library/decisions" },
      { title: "Institutional Asset Registry", href: "/library/institutional-assets" },
    ],
  },
];

export const OWNERSHIP_STRUCTURE_OVERVIEW: OwnershipStructureOverview[] = [
  {
    id: "constitutional-ownership",
    title: "Constitutional Ownership Philosophy",
    summary:
      "Ownership exists to preserve the institution. Owners are custodians across generations — not consumers of institutional capital.",
    constitutionalPrinciple: "Art. VIII § 8.01 — Ownership preserves rather than diminishes",
    legalStatus: "active",
    steward: "Constitutional Owner(s) / Board (forming)",
    constitutionArticles: ARTICLE_VIII_REFS,
    canonReferences: ["CANON-004", "CANON-006", "CANON-025"],
  },
  {
    id: "separation-governance",
    title: "Separation of Ownership and Governance",
    summary:
      "Ownership does not automatically confer executive authority. Leadership appointments follow constitutional standards, not ownership status alone.",
    constitutionalPrinciple: "Art. VIII § 8.02",
    legalStatus: "active",
    steward: "Board of Directors (forming)",
    constitutionArticles: [
      "Art. VIII § 8.02 — Separation of Ownership and Governance",
      "Art. IV § 4.02 — Governance Structure",
      "Art. V § 5.02 — Constitutional Standards",
    ],
    canonReferences: ["CANON-004", "CANON-016", "CANON-020"],
  },
  {
    id: "family-trust",
    title: "Family Trust (Legal — Forming)",
    summary:
      "Long-term vision: family trust preserving the Group for future generations. Legal deed to be drafted by counsel under applicable law.",
    constitutionalPrinciple: "Art. VIII § 8.07 — Constitution supports; does not replace, lawful instruments",
    legalStatus: "forming",
    steward: "Trustees (to be appointed)",
    constitutionArticles: ["Art. VIII § 8.07 — Relationship to Applicable Law"],
    canonReferences: ["CANON-006", "CANON-025"],
  },
  {
    id: "family-constitution",
    title: "Family Constitution (Planned)",
    summary:
      "Family stewardship and culture — sits between Volume I Constitution and legal Trust Deed in the governance architecture stack.",
    constitutionalPrinciple: "Governance Architecture Stack — family layer",
    legalStatus: "planned",
    steward: "Family governance (forming)",
    constitutionArticles: ARTICLE_VIII_REFS,
    canonReferences: ["CANON-004", "CANON-006"],
  },
];

export const LEGAL_LAYER_PLACEHOLDERS = [
  { item: "Trust documentation references", status: "restricted" as const },
  { item: "Corporate structure", status: "forming" as const },
  { item: "Shareholding records", status: "restricted" as const },
  { item: "Legal entities", status: "forming" as const },
  { item: "Board appointments", status: "forming" as const },
  { item: "Governance resolutions", status: "forming" as const },
];

export function getGovernanceArchitectureEntry(id: string): GovernanceArchitectureEntry | undefined {
  return GOVERNANCE_ARCHITECTURE_REGISTER.find((e) => e.id === id);
}

export function getOwnershipStewardshipStats() {
  const garEntries = GOVERNANCE_ARCHITECTURE_REGISTER.length;
  const constitutional = GOVERNANCE_ARCHITECTURE_REGISTER.filter((e) => e.access === "constitutional").length;
  const legal = GOVERNANCE_ARCHITECTURE_REGISTER.filter((e) => e.access === "legal").length;
  const active = GOVERNANCE_ARCHITECTURE_REGISTER.filter((e) => e.status === "active").length;
  return { garEntries, constitutional, legal, active };
}
