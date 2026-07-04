/**
 * Status registry — single source of truth for status components.
 * No fabricated uptime percentages.
 */

import { COMPANY_REGISTRY } from "@/lib/shared/company/registry";

export type SharedServiceHealth =
  | "operational"
  | "degraded"
  | "outage"
  | "maintenance"
  | "unknown";

export interface StatusRecord {
  id: string;
  name: string;
  description: string;
  health: SharedServiceHealth;
  note: string;
  href?: string;
  companyId?: string;
}

export const STATUS_REGISTRY: StatusRecord[] = [
  {
    id: "hq",
    name: "Stankings HQ",
    description: "Public institutional website (stankings.com).",
    health: "unknown",
    note: "Health is confirmed by live probes when the service is reachable. We do not publish invented uptime percentages.",
    href: "/",
    companyId: "hq",
  },
  {
    id: "shared-services",
    name: "Shared Services",
    description: "Trust, Legal, Support, Security, and Compliance portals on HQ.",
    health: "unknown",
    note: "Served by the HQ application. Status follows HQ reachability.",
    href: "/trust",
  },
  {
    id: "authentication",
    name: "Authentication",
    description: "Member authentication for Library and Energy console.",
    health: "unknown",
    note: "Depends on configured identity provider. Readiness via /api/health?ready=1 when HQ is live.",
  },
  {
    id: "email",
    name: "Email",
    description: "Institutional mailboxes.",
    health: "unknown",
    note: "Mail routing is operated outside the web application.",
  },
  {
    id: "api",
    name: "API",
    description: "HQ health and institutional endpoints.",
    health: "unknown",
    note: "Public health endpoint: /api/health.",
    href: "/api/health",
  },
  {
    id: "bamsignal",
    name: "BamSignal",
    description: "Independent product — bamsignal.com.",
    health: "unknown",
    note: "Operated by BamSignal. HQ does not invent product uptime.",
    href: "https://bamsignal.com",
    companyId: "bamsignal",
  },
  {
    id: "yike",
    name: "Yike",
    description: "Independent product — yike.ng.",
    health: "unknown",
    note: "Operated by Yike. HQ does not invent product uptime.",
    href: "https://yike.ng",
    companyId: "yike",
  },
  {
    id: "bayright",
    name: "BayRight",
    description: "Independent product — bayright.com.",
    health: "unknown",
    note: "Operated by BayRight. HQ does not invent product uptime.",
    href: "https://bayright.com",
    companyId: "bayright",
  },
  {
    id: "foundation",
    name: "Foundation",
    description: "Stankings Foundation programmes.",
    health: "unknown",
    note: "Institutional programme — not a continuous public API.",
    href: "/foundation",
    companyId: "stankings-foundation",
  },
  {
    id: "institute",
    name: "Institute",
    description: "The Stankings Institute.",
    health: "unknown",
    note: "Institutional programme — not a continuous public API.",
    href: "/institute",
    companyId: "stankings-institute",
  },
];

export const STATUS_POLICY =
  "Stankings HQ publishes status without fabricated metrics. Cards show known posture only.";

export function getStatus(id: string): StatusRecord | undefined {
  return STATUS_REGISTRY.find((s) => s.id === id);
}

export function getStatusForCompany(companyId: string): StatusRecord | undefined {
  return STATUS_REGISTRY.find((s) => s.companyId === companyId);
}

export function listStatusRecords(): StatusRecord[] {
  return STATUS_REGISTRY;
}

/** Ensure every operating company has a status entry (extensibility check) */
export function listCompaniesMissingStatus(): string[] {
  const covered = new Set(
    STATUS_REGISTRY.map((s) => s.companyId).filter(Boolean) as string[],
  );
  return COMPANY_REGISTRY.filter(
    (c) =>
      (c.status === "operating" || c.status === "institutional") && !covered.has(c.id),
  ).map((c) => c.id);
}
