/**
 * Constitutional Ecosystem Register — Article IX / FRAMEWORK-IEP-001
 */

import {
  ECOSYSTEM_INSTITUTIONS,
  SHARED_PLATFORM_SERVICES,
} from "@/lib/ecosystem/map";
import { getInstitutionalIdentity } from "@/lib/institutional-identity";
import type {
  ConstitutionalEcosystemProfile,
  EcosystemGraphEdge,
  EcosystemGraphNode,
} from "@/lib/institutional-ecosystem/types";

export const ECOSYSTEM_PORTAL_IDENTIFIER = "FRAMEWORK-IEP-001";

const ARTICLE_IX_REFS = [
  "Art. IX § 9.01 — Principle of the Institutional Ecosystem",
  "Art. IX § 9.02 — Constitutional Identity of Institutions",
  "Art. IX § 9.07 — Institutional Independence",
];

const TRUST_PLATFORM_KEYWORDS = ["Trust", "Verification", "Identity", "Passport", "Escrow", "Consent"];
const AI_PLATFORM_KEYWORDS = ["AI"];

function mapTrustDependencies(platforms: string[]): string[] {
  return platforms.filter((p) => TRUST_PLATFORM_KEYWORDS.some((k) => p.includes(k)));
}

function mapAiServices(platforms: string[]): string[] {
  return platforms.filter((p) => AI_PLATFORM_KEYWORDS.some((k) => p.includes(k)));
}

function mapApis(slug: string, platforms: string[]): { consumed: string[]; exposed: string[] } {
  const consumed: string[] = [];
  if (platforms.some((p) => p.includes("Developer APIs"))) consumed.push("Stankings Developer APIs");
  if (platforms.some((p) => p.includes("Payments"))) consumed.push("BayRight Payments API");
  if (platforms.some((p) => p.includes("Trust") || p.includes("Verification")))
    consumed.push("Yike Verification API");
  if (platforms.some((p) => p.includes("Identity"))) consumed.push("Passport Identity API");

  const exposed: string[] = [];
  if (slug === "yike") exposed.push("Marketplace API", "Listings API", "Vendor API");
  if (slug === "bayright") exposed.push("Escrow API", "Payments API", "Settlement Webhooks");
  if (slug === "bamsignal") exposed.push("Reputation API", "Verification Signals");
  if (slug === "stanhan") exposed.push("Property Verification API (planned)");

  return { consumed, exposed };
}

function buildProfile(inst: (typeof ECOSYSTEM_INSTITUTIONS)[number]): ConstitutionalEcosystemProfile {
  const identity = getInstitutionalIdentity(inst.slug);
  const { consumed, exposed } = mapApis(inst.slug, inst.platformServices);

  return {
    slug: inst.slug,
    name: inst.name,
    excellence: inst.excellence,
    constitutionalPurpose:
      identity?.institutionPurposeStatement ?? identity?.purpose ?? inst.mission,
    strategicRole: identity?.strategicRole ?? inst.excellence,
    primaryCustomers: identity?.primaryCustomers ?? [],
    coreCapabilities: inst.coreCapabilities,
    sharedPlatformsUsed: inst.platformServices,
    trustDependencies: mapTrustDependencies(inst.platformServices),
    aiServicesUsed: mapAiServices(inst.platformServices),
    apisConsumed: consumed,
    apisExposed: exposed,
    knowledgeObjects: [
      { title: `IIS — ${inst.name}`, href: `/library/institutional-identity/${inst.slug}` },
      { title: "Ecosystem Profile", href: `/library/ecosystem-architecture/${inst.slug}` },
      { title: "Lifecycle Record", href: `/library/institution-lifecycle/${inst.slug}` },
      { title: "CANON-005", href: "/library/canon/CANON-005", identifier: "CANON-005" },
    ],
    constitutionArticles: [
      ...ARTICLE_IX_REFS,
      ...(identity?.constitutionArticles ?? []).slice(0, 2),
    ],
    canonReferences: inst.canonReferences,
    strengthens: inst.strengthens,
    dependsOn: inst.dependsOn,
    sharedCapabilitiesProvided: inst.sharedCapabilitiesContributed,
    governanceStatus: identity?.status === "approved" ? "approved" : "forming",
    color: inst.color,
    icon: inst.icon,
    isLive: inst.isLive,
  };
}

export const CONSTITUTIONAL_ECOSYSTEM_PROFILES: ConstitutionalEcosystemProfile[] =
  ECOSYSTEM_INSTITUTIONS.map(buildProfile);

export function getConstitutionalEcosystemProfile(
  slug: string,
): ConstitutionalEcosystemProfile | undefined {
  return CONSTITUTIONAL_ECOSYSTEM_PROFILES.find((p) => p.slug === slug);
}

export function getEcosystemGraph(): { nodes: EcosystemGraphNode[]; edges: EcosystemGraphEdge[] } {
  const nodes: EcosystemGraphNode[] = [
    {
      id: "stankings-group",
      label: "Stankings Group",
      type: "group",
      href: "/library/constitution",
    },
    {
      id: "shared-platforms",
      label: "Shared Platforms",
      type: "platform",
      href: "/library/platforms",
    },
    ...ECOSYSTEM_INSTITUTIONS.map((inst) => ({
      id: inst.slug,
      label: inst.name,
      type: "institution" as const,
      color: inst.color,
      href: `/library/ecosystem-architecture/${inst.slug}`,
    })),
  ];

  const edges: EcosystemGraphEdge[] = [];

  for (const inst of ECOSYSTEM_INSTITUTIONS) {
    edges.push({ from: "stankings-group", to: inst.slug, relationship: "strengthens" });
    if (inst.platformServices.length > 0) {
      edges.push({ from: inst.slug, to: "shared-platforms", relationship: "platform" });
    }
    for (const target of inst.strengthens) {
      edges.push({ from: inst.slug, to: target, relationship: "strengthens" });
    }
    for (const dep of inst.dependsOn) {
      edges.push({ from: inst.slug, to: dep, relationship: "depends" });
    }
  }

  return { nodes, edges };
}

export function getEcosystemRegisterStats() {
  const total = CONSTITUTIONAL_ECOSYSTEM_PROFILES.length;
  const approved = CONSTITUTIONAL_ECOSYSTEM_PROFILES.filter((p) => p.governanceStatus === "approved").length;
  const live = CONSTITUTIONAL_ECOSYSTEM_PROFILES.filter((p) => p.isLive).length;
  const platforms = SHARED_PLATFORM_SERVICES.length;
  return { total, approved, live, platforms };
}

export { SHARED_PLATFORM_SERVICES };
