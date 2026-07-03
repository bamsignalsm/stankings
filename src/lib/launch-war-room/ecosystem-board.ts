/**
 * Stankings Group — Ecosystem Execution Board (Sprint 008)
 * Founder-facing portfolio view. Read-only. No deploy controls.
 */

import type { LaunchProductId } from "./products";
import { SPRINT_009_MISSION } from "./products";

export type ProductEngineeringMode =
  | "release-hold"
  | "active-engineering"
  | "frozen"
  | "maintenance";

export type PortfolioRiskLevel = "low" | "medium" | "high" | "critical";

export interface EcosystemProductRow {
  id: LaunchProductId;
  name: string;
  domain: string;
  engineeringMode: ProductEngineeringMode;
  currentPhase: string;
  currentVersion: string;
  launchReadinessPercent: number;
  targetReadinessPercent: number;
  criticalBlockers: string[];
  nextMilestone: string;
  owner: string;
  estimatedCompletion: string;
  riskLevel: PortfolioRiskLevel;
  dependencyStatus: string;
  productionUrl: string;
}

export interface EcosystemSnapshot {
  sprintId: "EXECUTION-SPRINT-008" | "EXECUTION-SPRINT-009";
  updatedAt: string;
  mission: string;
  overallProgressPercent: number;
  productsReady: number;
  productsBlocked: number;
  criticalRisks: string[];
  founderDecisionsRequired: string[];
  engineeringVelocity: string;
  estimatedNextLaunch: { product: string; window: string };
  dailyProgress: string[];
  activeEngineeringProduct: LaunchProductId;
  products: EcosystemProductRow[];
}

export { SPRINT_009_MISSION };

export const ECOSYSTEM_SNAPSHOT: EcosystemSnapshot = {
  sprintId: "EXECUTION-SPRINT-009",
  updatedAt: "2026-07-03T19:00:00Z",
  mission: SPRINT_009_MISSION,
  overallProgressPercent: 52,
  productsReady: 0,
  productsBlocked: 3,
  criticalRisks: [
    "BamSignal: GitHub production-certification not configured — blocks Live E2E and deploy",
    "BayRight: Peyflex UAT matrix empty (0/10) — bill vending intentionally disabled",
    "BayRight: SafeHaven VA blocked at provider (account_not_ready)",
    "Yike: 3 commits ahead of origin, dirty tree — no atomic release plan",
  ],
  founderDecisionsRequired: [
    "BamSignal: Configure GitHub Environment production-certification + DIAGNOSTICS_SECRET",
    "BamSignal: Authorize Coolify deploy 1.0.17-20 after Live E2E PASS",
    "BayRight: Approve Peyflex 3+3+2+2 UAT execution on preview",
    "BayRight: Escalate SafeHaven VA activation with provider",
    "BayRight: Enable Supabase leaked-password protection + admin MFA",
  ],
  engineeringVelocity:
    "Operations mode — BamSignal release ops, BayRight provider certification, Yike frozen. No feature development.",
  estimatedNextLaunch: {
    product: "BamSignal",
    window: "24–72h after GitHub cert + device QA + Founder GO",
  },
  dailyProgress: [
    "Sprint 009 Ecosystem War Room — operations foreground",
    "Founder Dashboard: release ops + provider certification tracks",
    "BayRight Sprint 003: NOT READY (evidence-based)",
    "BamSignal Sprint 011: device QA pending founder",
  ],
  activeEngineeringProduct: "bayright",
  products: [
    {
      id: "bamsignal",
      name: "BamSignal",
      domain: "bamsignal.com",
      engineeringMode: "release-hold",
      currentPhase: "RELEASE OPERATIONS",
      currentVersion: "1.0.17-20 candidate (prod 1.0.15-18)",
      launchReadinessPercent: 78,
      targetReadinessPercent: 100,
      criticalBlockers: [
        "GitHub Production Certification — not configured",
        "Physical Device Certification — 0/15 signed",
        "Signed AAB stale vs remediation build",
        "Coolify deploy — waiting Founder GO",
      ],
      nextMilestone: "Production Certification PASS → Coolify deploy",
      owner: "Founder (GO) + Engineering (execute)",
      estimatedCompletion: "24–72h after GitHub Environment setup",
      riskLevel: "medium",
      dependencyStatus: "GitHub Environment, Coolify, Play Console manual forms",
      productionUrl: "https://bamsignal.com",
    },
    {
      id: "bayright",
      name: "BayRight",
      domain: "bayright.com",
      engineeringMode: "frozen",
      currentPhase: "PROVIDER CERTIFICATION (engineering frozen)",
      currentVersion: "v0.1.0@0dc0279",
      launchReadinessPercent: 38,
      targetReadinessPercent: 90,
      criticalBlockers: [
        "NOT READY — Peyflex UAT 0/10",
        "SafeHaven VA blocked (provider)",
        "vercel link + env:pull:prod required",
        "Security P0s: leaked-password, MFA, webhook secret",
        "Founder Launch QA unsigned",
      ],
      nextMilestone: "Founder: vercel link → Peyflex matrix → SafeHaven escalation",
      owner: "Founder (prove) — engineering frozen",
      estimatedCompletion: "NOT READY until UAT + P0s proven",
      riskLevel: "high",
      dependencyStatus: "SafeHaven, Peyflex, Remita — external provider gates",
      productionUrl: "https://bayright.com",
    },
    {
      id: "yike",
      name: "Yike",
      domain: "yike.ng",
      engineeringMode: "frozen",
      currentPhase: "FROZEN — Repository Stabilization",
      currentVersion: "V2 local (ahead 3, dirty)",
      launchReadinessPercent: 35,
      targetReadinessPercent: 70,
      criticalBlockers: [
        "No atomic release plan",
        "3 uncommitted commits ahead of origin",
        "4 critical bugs in backlog",
        "Deploy frozen — no feature work",
      ],
      nextMilestone: "Git hygiene + migration inventory only",
      owner: "Engineering (stabilization only)",
      estimatedCompletion: "2+ weeks after atomic release plan approved",
      riskLevel: "medium",
      dependencyStatus: "Blocked on Founder atomic release scope decision",
      productionUrl: "https://yike.ng",
    },
    {
      id: "stankings-hq",
      name: "Stankings HQ",
      domain: "stankings.com",
      engineeringMode: "maintenance",
      currentPhase: "MAINTENANCE — Library + War Room",
      currentVersion: "0.1.0",
      launchReadinessPercent: 60,
      targetReadinessPercent: 80,
      criticalBlockers: [
        "Coolify production deploy pending",
        "No major engineering initiatives permitted",
      ],
      nextMilestone: "Founder Dashboard + governance maintenance",
      owner: "Engineering (maintenance)",
      estimatedCompletion: "Ongoing — no launch target",
      riskLevel: "low",
      dependencyStatus: "Self-hosted Coolify deploy when authorized",
      productionUrl: "https://stankings.com",
    },
  ],
};

export function getEcosystemProduct(id: LaunchProductId): EcosystemProductRow | undefined {
  return ECOSYSTEM_SNAPSHOT.products.find((p) => p.id === id);
}

export function riskColor(level: PortfolioRiskLevel): string {
  if (level === "low") return "text-forest";
  if (level === "medium") return "text-amber-300";
  if (level === "high") return "text-orange-400";
  return "text-red-400";
}

export function modeLabel(mode: ProductEngineeringMode): string {
  const labels: Record<ProductEngineeringMode, string> = {
    "release-hold": "RELEASE HOLD",
    "active-engineering": "ACTIVE",
    frozen: "FROZEN",
    maintenance: "MAINTENANCE",
  };
  return labels[mode];
}

export function modeColor(mode: ProductEngineeringMode): string {
  if (mode === "active-engineering") return "text-forest border-forest/40 bg-forest/10";
  if (mode === "release-hold") return "text-amber-200 border-amber-400/30 bg-amber-400/10";
  if (mode === "frozen") return "text-cream-muted border-gold-subtle/30";
  return "text-gold border-gold-subtle/40 bg-gold-subtle/10";
}
