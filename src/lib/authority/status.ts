import type { StatusServiceCard } from "./types";

/**
 * Corporate status dashboard.
 * No fabricated uptime percentages or invented incident histories.
 * Health reflects known operational posture only.
 */
export const STATUS_SERVICES: StatusServiceCard[] = [
  {
    id: "hq",
    name: "Stankings HQ",
    description: "Public institutional website (stankings.com).",
    health: "unknown",
    note: "Health is confirmed by live probes when the service is reachable. We do not publish invented uptime percentages.",
    href: "/",
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
    note: "Depends on configured identity provider. Readiness is checked via /api/health?ready=1 when HQ is live.",
  },
  {
    id: "email",
    name: "Email",
    description: "Institutional mailboxes (hello@, support@, security@, legal@).",
    health: "unknown",
    note: "Mail routing is operated outside the web application. Report delivery issues to support@stankings.com.",
  },
  {
    id: "api",
    name: "API",
    description: "HQ health and institutional endpoints.",
    health: "unknown",
    note: "Public health endpoint: /api/health. No public product APIs are hosted on HQ.",
    href: "/api/health",
  },
  {
    id: "bamsignal",
    name: "BamSignal",
    description: "Independent product — bamsignal.com.",
    health: "unknown",
    note: "Operated by BamSignal. HQ does not invent product uptime. Use Support → BamSignal for product issues.",
    href: "https://bamsignal.com",
  },
  {
    id: "yike",
    name: "Yike",
    description: "Independent product — yike.ng.",
    health: "unknown",
    note: "Operated by Yike. HQ does not invent product uptime. Use Support → Yike for product issues.",
    href: "https://yike.ng",
  },
  {
    id: "bayright",
    name: "BayRight",
    description: "Independent product — bayright.com.",
    health: "unknown",
    note: "Operated by BayRight. HQ does not invent product uptime. Use Support → BayRight for product issues.",
    href: "https://bayright.com",
  },
];

export const STATUS_POLICY =
  "Stankings HQ publishes status without fabricated metrics. Cards show known posture only. When a service is not continuously monitored from this page, health is marked unknown.";
