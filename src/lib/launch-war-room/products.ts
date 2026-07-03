/**
 * Launch War Room — Execution Sprint 002
 * Read-only operational visibility. No production controls.
 */

export type LaunchProductId = "bamsignal" | "bayright" | "yike" | "stankings-hq";

export type LaunchPriority = 1 | 2 | 3 | 4;

export interface LaunchProductConfig {
  id: LaunchProductId;
  name: string;
  domain: string;
  repository: string;
  priority: LaunchPriority;
  healthUrl: string;
  readinessUrl?: string;
  productionUrl: string;
  /** Sprint 002 baseline from audit */
  launchReadinessPercent: number;
  targetReadinessPercent: number;
  version: string;
  branch: string;
  deployStatus: "live" | "staging" | "blocked" | "local-only";
  criticalBugs: number;
  securityWarnings: number;
  blockedReason?: string;
  featureFlags?: { name: string; enabled: boolean }[];
  lastDeploy?: string;
  lastBackup?: string;
}

export const LAUNCH_PIPELINE_ORDER: LaunchProductId[] = [
  "stankings-hq",
  "bamsignal",
  "yike",
  "bayright",
];

export const LAUNCH_PRODUCTS: LaunchProductConfig[] = [
  {
    id: "bamsignal",
    name: "BamSignal",
    domain: "bamsignal.com",
    repository: "/Users/stanlex/Documents/bamsignal",
    priority: 2,
    healthUrl: "https://bamsignal.com/ready",
    productionUrl: "https://bamsignal.com",
    launchReadinessPercent: 78,
    targetReadinessPercent: 100,
    version: "1.0.17-20 (OBSERVATION — Stage 2 queued)",
    branch: "main",
    deployStatus: "live",
    criticalBugs: 0,
    securityWarnings: 2,
    lastDeploy: "2026-07-03",
    blockedReason: "GitHub cert + device QA + Founder GO",
  },
  {
    id: "bayright",
    name: "BayRight",
    domain: "bayright.com",
    repository: "/Users/stanlex/Documents/bayright",
    priority: 4,
    healthUrl: "https://bayright.com/api/health",
    productionUrl: "https://bayright.com",
    launchReadinessPercent: 38,
    targetReadinessPercent: 90,
    version: "v0.1.0 (RECOVERY — Stage 4 queued)",
    branch: "main",
    deployStatus: "live",
    criticalBugs: 0,
    securityWarnings: 3,
    blockedReason: "NOT READY — Peyflex 0/10 + SafeHaven VA + security P0s",
    featureFlags: [
      { name: "BAYRIGHT_SAFEHAVEN_ENABLED", enabled: false },
      { name: "PEYFLEX_VENDING_ENABLED", enabled: false },
    ],
  },
  {
    id: "stankings-hq",
    name: "Stankings HQ",
    domain: "stankings.com",
    repository: "/Users/stanlex/Documents/stankings",
    priority: 1,
    healthUrl: "/api/health",
    readinessUrl: "/api/health?ready=1",
    productionUrl: "https://stankings.com",
    launchReadinessPercent: 72,
    targetReadinessPercent: 100,
    version: "0.1.0 (ACTIVE DEPLOYMENT — Stage 1)",
    branch: "main",
    deployStatus: "blocked",
    criticalBugs: 0,
    securityWarnings: 2,
    blockedReason: "Stage 1 — Coolify deploy + founder prod verification",
  },
  {
    id: "yike",
    name: "Yike",
    domain: "yike.ng",
    repository: "/Users/stanlex/Documents/yike",
    priority: 4,
    healthUrl: "https://yike.ng/api/public-health",
    readinessUrl: "https://yike.ng/api/health?ready=1",
    productionUrl: "https://yike.ng",
    launchReadinessPercent: 35,
    targetReadinessPercent: 70,
    version: "V2 (FROZEN — Stage 3 queued)",
    branch: "ahead 3 (dirty)",
    deployStatus: "local-only",
    criticalBugs: 4,
    securityWarnings: 5,
    blockedReason: "FROZEN — repository stabilization only, no release",
  },
];

export function getLaunchProduct(id: LaunchProductId): LaunchProductConfig | undefined {
  return LAUNCH_PRODUCTS.find((p) => p.id === id);
}

export const SPRINT_002_MISSION =
  "Ship production-ready applications. Every task must increase probability of shipping within 24–72 hours." as const;

export const SPRINT_008_MISSION =
  "Manage products as a portfolio. BamSignal release hold. BayRight active engineering. Yike frozen. Stankings HQ maintenance." as const;

export const SPRINT_009_MISSION =
  "Ship products, not code. Operations foreground — engineering background." as const;

export const MASTER_LAUNCH_MISSION =
  "Full launch execution. Every activity must place products in users' hands. No speculative engineering." as const;
