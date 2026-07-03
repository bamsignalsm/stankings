/**
 * Execution Sprint 002 — daily report generator
 */

import { LAUNCH_COMMAND_CENTER } from "./master-launch-program";

export interface DailyExecutionReport {
  sprintId:
    | "EXECUTION-SPRINT-002"
    | "EXECUTION-SPRINT-008"
    | "EXECUTION-SPRINT-009"
    | "MASTER-LAUNCH-PROGRAM";
  generatedAt: string;
  completed: string[];
  inProgress: string[];
  blocked: string[];
  needsFounderDecision: string[];
  launchReadiness: Record<string, number>;
  criticalBugs: { product: string; count: number; summary: string }[];
  securityFindings: string[];
  performanceFindings: string[];
  recommendedTomorrow: string[];
  estimatedLaunchWindow: Record<string, string>;
}

export function getSprint002DayOneReport(): DailyExecutionReport {
  return {
    sprintId: "EXECUTION-SPRINT-002",
    generatedAt: new Date().toISOString(),
    completed: [
      "Execution Sprint 001 global audit (4 repositories)",
      "Launch pipeline priority order approved by Founder",
      "TypeScript errors fixed — Stankings HQ green typecheck",
      "Launch War Room data model + Founder Command Center route",
      "Stankings HQ green build + typecheck + CI + Docker + health endpoints",
      "Security headers added to next.config.ts",
      "CI workflow scaffold (lint + typecheck + build)",
      "Dockerfile for Stankings HQ",
    ],
    inProgress: [
      "BamSignal production candidate certification",
      "Stankings HQ production build verification",
      "BayRight internal release verification",
    ],
    blocked: [
      "BayRight public launch — SafeHaven VA provider activation",
      "BayRight — Peyflex live vending UAT sign-off",
      "Yike V2 — atomic release plan (deploy frozen)",
    ],
    needsFounderDecision: [
      "BamSignal: submit production candidate to stores after E2E pass?",
      "Yike: approve atomic release scope when stabilization complete",
    ],
    launchReadiness: {
      bamsignal: 88,
      bayright: 68,
      "stankings-hq": 55,
      yike: 35,
    },
    criticalBugs: [
      { product: "Yike", count: 4, summary: "Uncommitted V2 + migrations + redirect conflict" },
      { product: "Stankings HQ", count: 0, summary: "Build was failing — typecheck now green" },
    ],
    securityFindings: [
      "CSP not yet on BamSignal/BayRight/Yike — Stankings baseline headers added",
      "Stankings seed script password defaults — remove before prod deploy",
      "Yike WhatsApp webhook POST unauthenticated",
    ],
    performanceFindings: [
      "BamSignal heic2any bundle 1.35MB — defer post-launch",
      "Stankings middleware DB query per protected request — acceptable for launch",
    ],
    recommendedTomorrow: [
      "BamSignal: run certify:e2e + complete founder experience gate",
      "BayRight: verify:release + smoke:prod on production URL",
      "Stankings HQ: verify green build + deploy to Coolify",
      "Yike: git status review + migration inventory only",
    ],
    estimatedLaunchWindow: {
      bamsignal: "24–72 hours (production candidate)",
      bayright: "Provider-dependent (engineering ready)",
      "stankings-hq": "3–5 days (stabilization only)",
      yike: "2+ weeks (atomic release after plan)",
    },
  };
}

export function getSprint008DailyReport(): DailyExecutionReport {
  return {
    sprintId: "EXECUTION-SPRINT-008",
    generatedAt: new Date().toISOString(),
    completed: [
      "Sprint 008 program management mode activated",
      "BamSignal moved to RELEASE HOLD — engineering frozen",
      "BayRight launch readiness reassessed (64% overall)",
      "Ecosystem execution board on Founder Dashboard",
      "Release Governance v1.0 remains frozen (Sprint 007)",
    ],
    inProgress: [
      "BayRight: Peyflex 3+3+2+2 UAT matrix execution",
      "BayRight: SafeHaven VA provider escalation",
      "BamSignal: GitHub production-certification setup (Founder)",
    ],
    blocked: [
      "BamSignal deploy — GitHub Environment not configured",
      "BayRight full launch — Peyflex UAT empty + SafeHaven VA blocked",
      "Yike — frozen, no atomic release plan",
    ],
    needsFounderDecision: [
      "BamSignal: Configure GitHub Environment + DIAGNOSTICS_SECRET",
      "BamSignal: Authorize Coolify deploy after Live E2E PASS",
      "BayRight: Approve Peyflex UAT execution on preview",
      "BayRight: Escalate SafeHaven VA with provider",
      "BayRight: Enable Supabase leaked-password protection",
    ],
    launchReadiness: {
      bamsignal: 92,
      bayright: 69,
      "stankings-hq": 60,
      yike: 35,
    },
    criticalBugs: [
      { product: "Yike", count: 4, summary: "Frozen — stabilization only" },
      { product: "BamSignal", count: 0, summary: "RELEASE HOLD — no feature work" },
      { product: "BayRight", count: 0, summary: "621 tests pass — provider gates block launch" },
    ],
    securityFindings: [
      "BayRight: Supabase leaked-password protection — manual P0",
      "BayRight: Admin MFA not confirmed",
      "BamSignal: CSP/HSTS at Cloudflare — advisory backlog",
    ],
    performanceFindings: [
      "BayRight: pre-launch gate automated checks pass",
      "BamSignal: production smoke 97% on current deploy",
    ],
    recommendedTomorrow: [
      "BayRight: env:pull:prod && env:check && verify:release",
      "BayRight: Start Peyflex 3+3+2+2 UAT on preview",
      "BamSignal: Founder configures GitHub Environment",
      "Yike: git status review only — no feature work",
    ],
    estimatedLaunchWindow: {
      bamsignal: "24–72h after GitHub Environment + Founder GO",
      bayright: "Late Jul – early Aug 2026 (provider-dependent)",
      "stankings-hq": "Maintenance — no launch target",
      yike: "2+ weeks after atomic release plan",
    },
  };
}

export function getSprint009DailyReport(): DailyExecutionReport {
  return {
    sprintId: "EXECUTION-SPRINT-009",
    generatedAt: new Date().toISOString(),
    completed: [
      "Ecosystem War Room — operations mode (Sprint 009)",
      "BayRight Sprint 003 recovery report — NOT READY",
      "BamSignal Sprint 011 native remediation (device QA pending)",
      "Founder Dashboard refocused on shipping blockers",
    ],
    inProgress: [
      "BamSignal: Release operations track (GitHub cert + device QA)",
      "BayRight: Provider certification (Peyflex 0/10, SafeHaven escalation)",
      "Stankings HQ: War Room + library maintenance",
    ],
    blocked: [
      "BamSignal deploy — GitHub Environment + device certification",
      "BamSignal Play — not submitted",
      "BayRight — NOT READY (UAT + provider + security P0s)",
      "Yike — frozen",
    ],
    needsFounderDecision: [
      "BamSignal: GitHub production-certification + DIAGNOSTICS_SECRET",
      "BamSignal: Device certification sign-off (15 rows)",
      "BamSignal: Coolify GO after cert PASS",
      "BayRight: vercel link + Peyflex UAT execution",
      "BayRight: SafeHaven VA escalation",
      "BayRight: Supabase security P0s",
    ],
    launchReadiness: {
      bamsignal: 78,
      bayright: 38,
      "stankings-hq": 62,
      yike: 35,
    },
    criticalBugs: [],
    securityFindings: [
      "BayRight: leaked-password + MFA open (Founder)",
      "BayRight: PEYFLEX_WEBHOOK_SECRET unset",
    ],
    performanceFindings: [],
    recommendedTomorrow: [
      "Founder: BamSignal GitHub Environment",
      "Founder: BamSignal device certification on physical Android",
      "Founder: BayRight vercel link + start Peyflex UAT",
      "Founder: SafeHaven provider escalation",
    ],
    estimatedLaunchWindow: {
      bamsignal: "24–72h after GitHub cert + device QA + GO",
      bayright: "NOT READY — 14+ days after UAT + P0s",
      "stankings-hq": "Operational — no launch",
      yike: "Frozen — no window",
    },
  };
}

export function getMasterLaunchDailyReport(): DailyExecutionReport {
  const c = LAUNCH_COMMAND_CENTER;
  const stage = c.stages.find((s) => s.id === c.currentStage)!;
  return {
    sprintId: "MASTER-LAUNCH-PROGRAM",
    generatedAt: c.updatedAt,
    completed: c.completedToday,
    inProgress: [
      `Stage ${c.currentStage}: ${c.currentProductName} — ${stage.objective}`,
      ...stage.tasks
        .filter((t) => t.status === "in_progress")
        .map((t) => `${c.currentProductName}: ${t.label}`),
    ],
    blocked: c.blockers,
    needsFounderDecision: c.founderActions,
    launchReadiness: {
      "stankings-hq": c.productPostures.find((p) => p.id === "stankings-hq")!.launchPercent,
      bamsignal: c.productPostures.find((p) => p.id === "bamsignal")!.launchPercent,
      yike: c.productPostures.find((p) => p.id === "yike")!.launchPercent,
      bayright: c.productPostures.find((p) => p.id === "bayright")!.launchPercent,
    },
    criticalBugs: [],
    securityFindings: c.criticalRisks,
    performanceFindings: [],
    recommendedTomorrow: c.tomorrowsPlan,
    estimatedLaunchWindow: {
      "stankings-hq": c.stages[0].estimatedLaunchDate,
      bamsignal: c.stages[1].estimatedLaunchDate,
      yike: c.stages[2].estimatedLaunchDate,
      bayright: c.stages[3].estimatedLaunchDate,
    },
  };
}

export function formatDailyReportText(report: DailyExecutionReport): string {
  const sprintNum =
    report.sprintId === "MASTER-LAUNCH-PROGRAM"
      ? "MASTER LAUNCH"
      : report.sprintId.replace("EXECUTION-SPRINT-", "");
  return `══════════════════════════════════════
EXECUTION SPRINT ${sprintNum} — DAILY REPORT
${report.generatedAt}
══════════════════════════════════════

COMPLETED
${report.completed.map((c) => `✓ ${c}`).join("\n")}

IN PROGRESS
${report.inProgress.map((c) => `→ ${c}`).join("\n")}

BLOCKED
${report.blocked.map((c) => `✗ ${c}`).join("\n")}

NEEDS FOUNDER DECISION
${report.needsFounderDecision.map((c) => `? ${c}`).join("\n")}

LAUNCH READINESS %
BamSignal      ${report.launchReadiness.bamsignal}%
BayRight       ${report.launchReadiness.bayright}%
Stankings HQ   ${report.launchReadiness["stankings-hq"]}%
Yike           ${report.launchReadiness.yike}%

CRITICAL BUGS
${report.criticalBugs.map((b) => `${b.product}: ${b.count} — ${b.summary}`).join("\n")}

SECURITY
${report.securityFindings.map((s) => `• ${s}`).join("\n")}

RECOMMENDED TOMORROW
${report.recommendedTomorrow.map((s) => `1. ${s}`).join("\n")}

ESTIMATED LAUNCH WINDOW
${Object.entries(report.estimatedLaunchWindow)
  .map(([k, v]) => `${k}: ${v}`)
  .join("\n")}
══════════════════════════════════════`;
}
