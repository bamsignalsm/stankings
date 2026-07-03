/**
 * Stankings Group — Ecosystem War Room (Sprint 009)
 * Product operations. No deploy controls. Evidence-based blockers only.
 */

import type { LaunchProductId } from "./products";

export const SPRINT_009_MISSION =
  "Ship products, not code. Release Manager + Program Manager + Operations Lead + Compliance Tracker. No feature development." as const;

export type BlockerClass = "internal" | "external" | "waiting" | "completed";
export type OpsItemStatus = "pending" | "in_progress" | "blocked" | "waiting" | "completed";

export interface OpsChecklistItem {
  id: string;
  label: string;
  status: OpsItemStatus;
  classification: BlockerClass;
  owner: string;
  eta?: string;
  evidence?: string;
}

export interface PortfolioProductHealth {
  id: LaunchProductId;
  name: string;
  readinessPercent: number;
  operationalMode: string;
  risk: "low" | "medium" | "high" | "critical";
  confidenceTrend: "up" | "flat" | "down";
  launchWindow: string;
}

export interface RiskHeatmapEntry {
  id: string;
  label: string;
  severity: "low" | "medium" | "high" | "critical";
  product: LaunchProductId | "portfolio";
}

export interface FounderOperationsDaily {
  date: string;
  productsReleased: string[];
  productsWaiting: string[];
  providerResponses: { provider: string; status: string; eta?: string }[];
  storeReviewStatus: { product: string; track: string; status: string }[];
  openFounderActions: string[];
  blockedItems: string[];
  criticalIncidents: string[];
  todaysProgress: string[];
  tomorrowsPlan: string[];
}

export interface EcosystemWarRoomSnapshot {
  sprintId: "EXECUTION-SPRINT-009";
  updatedAt: string;
  mission: string;
  overallPortfolioReadiness: number;
  portfolioHealth: PortfolioProductHealth[];
  riskHeatmap: RiskHeatmapEntry[];
  dependencyTimeline: { label: string; dependsOn: string; window: string }[];
  confidenceTrend: { week: string; percent: number }[];
  founderDaily: FounderOperationsDaily;
  bamsignalReleaseOps: OpsChecklistItem[];
  bayrightCertification: OpsChecklistItem[];
  yikeFrozen: OpsChecklistItem[];
  stankingsHqOps: OpsChecklistItem[];
}

export const ECOSYSTEM_WAR_ROOM: EcosystemWarRoomSnapshot = {
  sprintId: "EXECUTION-SPRINT-009",
  updatedAt: "2026-07-03T19:00:00Z",
  mission: SPRINT_009_MISSION,
  overallPortfolioReadiness: 52,
  portfolioHealth: [
    {
      id: "stankings-hq",
      name: "Stankings HQ",
      readinessPercent: 72,
      operationalMode: "ACTIVE DEPLOYMENT — Stage 1",
      risk: "low",
      confidenceTrend: "up",
      launchWindow: "2026-07-05 — Coolify deploy + prod verify",
    },
    {
      id: "bamsignal",
      name: "BamSignal",
      readinessPercent: 78,
      operationalMode: "OBSERVATION — Stage 2 queued",
      risk: "medium",
      confidenceTrend: "flat",
      launchWindow: "After HQ → MAINTENANCE",
    },
    {
      id: "bayright",
      name: "BayRight",
      readinessPercent: 38,
      operationalMode: "RECOVERY — Stage 4 queued",
      risk: "high",
      confidenceTrend: "down",
      launchWindow: "NOT READY — provider + founder proof",
    },
    {
      id: "yike",
      name: "Yike",
      readinessPercent: 35,
      operationalMode: "FROZEN — Stage 3 queued",
      risk: "medium",
      confidenceTrend: "flat",
      launchWindow: "No launch — stabilization only",
    },
  ],
  riskHeatmap: [
    { id: "r1", label: "BamSignal GitHub production-certification missing", severity: "critical", product: "bamsignal" },
    { id: "r2", label: "BamSignal device certification unsigned", severity: "high", product: "bamsignal" },
    { id: "r3", label: "BayRight Peyflex UAT 0/10", severity: "critical", product: "bayright" },
    { id: "r4", label: "BayRight SafeHaven VA (provider)", severity: "critical", product: "bayright" },
    { id: "r5", label: "BayRight security P0s open", severity: "high", product: "bayright" },
    { id: "r6", label: "Yike repo ahead/dirty — no release plan", severity: "medium", product: "yike" },
    { id: "r7", label: "Portfolio: zero products shipped this week", severity: "medium", product: "portfolio" },
  ],
  dependencyTimeline: [
    { label: "BamSignal Coolify deploy", dependsOn: "GitHub cert PASS + Founder GO", window: "T+0 after unblock" },
    { label: "BamSignal Play closed testing", dependsOn: "Signed AAB + device QA", window: "T+1–2 days" },
    { label: "BayRight soft launch", dependsOn: "Peyflex 10/10 + security P0s", window: "14+ days" },
    { label: "BayRight full launch", dependsOn: "SafeHaven VA + Remita UAT", window: "Late Jul – Sep 2026" },
    { label: "Yike any release", dependsOn: "Atomic release plan approved", window: "2+ weeks minimum" },
  ],
  confidenceTrend: [
    { week: "Jun 19", percent: 48 },
    { week: "Jun 26", percent: 55 },
    { week: "Jul 3", percent: 52 },
  ],
  founderDaily: {
    date: "2026-07-03",
    productsReleased: [],
    productsWaiting: ["BamSignal 1.0.17-20 (RELEASE HOLD)", "BayRight (NOT READY)"],
    providerResponses: [
      { provider: "SafeHaven", status: "Waiting — VA account_not_ready", eta: "Unknown (escalation required)" },
      { provider: "Peyflex", status: "API OK — vending gated until UAT", eta: "After founder executes 3+3+2+2" },
      { provider: "Google Play", status: "Not submitted — BamSignal", eta: "After device + AAB" },
    ],
    storeReviewStatus: [
      { product: "BamSignal", track: "Closed testing (planned)", status: "Not submitted" },
      { product: "BayRight", track: "N/A", status: "Web app — no store gate" },
    ],
    openFounderActions: [
      "BamSignal: Configure GitHub Environment production-certification + DIAGNOSTICS_SECRET",
      "BamSignal: Complete device certification checklist (physical Android)",
      "BamSignal: Authorize Coolify deploy after cert PASS",
      "BayRight: vercel link → env:pull:prod → env:check",
      "BayRight: Execute Peyflex 3+3+2+2 UAT matrix",
      "BayRight: Escalate SafeHaven VA with provider",
      "BayRight: Enable Supabase leaked-password protection + admin MFA",
      "BayRight: Sign Launch QA at /lex/auth/launch-qa",
    ],
    blockedItems: [
      "BamSignal Live E2E — blocked on GitHub Environment",
      "BamSignal Play resubmission — blocked on device QA (Sprint 011)",
      "BayRight Peyflex live vends — blocked on UAT 0/10 + flag",
      "BayRight SafeHaven funding — blocked on provider VA",
    ],
    criticalIncidents: [],
    todaysProgress: [
      "Sprint 009 War Room — operations mode activated",
      "BayRight Sprint 003: bill_payments degraded RCA = intentional vending gate",
      "BamSignal Sprint 011: share/biometrics/push code remediation (device QA pending)",
      "Founder Dashboard refocused on shipping blockers",
    ],
    tomorrowsPlan: [
      "Founder: BamSignal GitHub Environment setup",
      "Founder: BamSignal device certification (15-row checklist)",
      "Founder: BayRight vercel link + Peyflex UAT start",
      "Founder: SafeHaven escalation email/call",
    ],
  },
  bamsignalReleaseOps: [
    {
      id: "github-cert",
      label: "GitHub Production Certification",
      status: "blocked",
      classification: "internal",
      owner: "Founder",
      eta: "Immediate",
      evidence: "Environment production-certification not configured",
    },
    {
      id: "device-cert",
      label: "Physical Device Certification",
      status: "pending",
      classification: "waiting",
      owner: "Founder",
      eta: "1–2 days",
      evidence: "docs/execution-sprint-011/DEVICE-CERTIFICATION-CHECKLIST.md — 0/15 signed",
    },
    {
      id: "signed-bundle",
      label: "Signed Release Bundle (AAB)",
      status: "pending",
      classification: "internal",
      owner: "Founder",
      eta: "After cap sync + gradlew bundleRelease",
      evidence: "Candidate 1.0.17-20 — APK stale vs post-remediation assets",
    },
    {
      id: "coolify",
      label: "Coolify Deployment",
      status: "waiting",
      classification: "waiting",
      owner: "Engineering",
      eta: "After Founder GO",
      evidence: "Prod 1.0.15-18 · candidate 1.0.17-20",
    },
    {
      id: "smoke",
      label: "Smoke Verification",
      status: "pending",
      classification: "internal",
      owner: "Engineering",
      eta: "Post-deploy",
      evidence: "18/19 smoke baseline exists — re-run required",
    },
    {
      id: "closed-testing",
      label: "Closed Testing Upload",
      status: "pending",
      classification: "waiting",
      owner: "Founder",
      eta: "After AAB + device QA",
      evidence: "AAB package in docs/releases/2026/",
    },
    {
      id: "google-review",
      label: "Google Review",
      status: "pending",
      classification: "external",
      owner: "Google",
      eta: "T+3–7 days after submit",
      evidence: "Not submitted",
    },
    {
      id: "reviewer-questions",
      label: "Reviewer Questions",
      status: "pending",
      classification: "external",
      owner: "Founder",
      eta: "If flagged",
      evidence: "Play compliance doc ready — Sprint 009/011",
    },
    {
      id: "founder-go",
      label: "Founder Approval (GO)",
      status: "pending",
      classification: "waiting",
      owner: "Founder",
      eta: "After cert + device PASS",
      evidence: "Sprint 007 Founder GO package",
    },
  ],
  bayrightCertification: [
    {
      id: "peyflex",
      label: "Peyflex UAT (3+3+2+2)",
      status: "blocked",
      classification: "waiting",
      owner: "Founder",
      eta: "7–14 days execution",
      evidence: "0/10 · vendReady all false",
    },
    {
      id: "safehaven",
      label: "SafeHaven VA + funding UAT",
      status: "blocked",
      classification: "external",
      owner: "SafeHaven + Founder",
      eta: "Provider-dependent",
      evidence: "OAuth PASS · VA provision FAIL",
    },
    {
      id: "security",
      label: "Security (leaked-password, MFA, audits)",
      status: "pending",
      classification: "internal",
      owner: "Founder",
      eta: "1 day",
      evidence: "6 automated P0 pass · manual open",
    },
    {
      id: "environment",
      label: "Environment (vercel link + env:check)",
      status: "blocked",
      classification: "internal",
      owner: "Founder",
      eta: "Immediate",
      evidence: "env:pull:prod not_linked",
    },
    {
      id: "launch-qa",
      label: "Launch QA journey",
      status: "pending",
      classification: "waiting",
      owner: "Founder",
      eta: "After Peyflex preview UAT",
      evidence: "/lex/auth/launch-qa unsigned",
    },
    {
      id: "webhook",
      label: "PEYFLEX_WEBHOOK_SECRET",
      status: "pending",
      classification: "internal",
      owner: "Founder",
      eta: "Before vending enable",
      evidence: "Permissive mode in production",
    },
    {
      id: "escalation-sh",
      label: "SafeHaven escalation",
      status: "in_progress",
      classification: "external",
      owner: "Founder",
      eta: "Awaiting provider response",
      evidence: "memory/blockers.md SEV-2",
    },
    {
      id: "verify-release",
      label: "verify:release (engineering gate)",
      status: "completed",
      classification: "completed",
      owner: "Engineering",
      evidence: "621 tests pass · 2026-07-03",
    },
  ],
  yikeFrozen: [
    {
      id: "repo-health",
      label: "Repository health",
      status: "pending",
      classification: "internal",
      owner: "Engineering",
      evidence: "Dirty tree · 3 commits ahead of origin",
    },
    {
      id: "outstanding-commits",
      label: "Outstanding commits",
      status: "blocked",
      classification: "waiting",
      owner: "Founder",
      evidence: "No atomic release plan — do not push",
    },
    {
      id: "migrations",
      label: "Migration status",
      status: "pending",
      classification: "internal",
      owner: "Engineering",
      evidence: "Inventory only — no deploy",
    },
    {
      id: "prod-drift",
      label: "Production drift",
      status: "pending",
      classification: "internal",
      owner: "Engineering",
      evidence: "yike.ng live vs local V2 unverified this sprint",
    },
  ],
  stankingsHqOps: [
    {
      id: "institutional-site",
      label: "Institutional public site (Sprint 010)",
      status: "completed",
      classification: "completed",
      owner: "Engineering",
      evidence: "Build PASS · /trust /legal /support /status",
    },
    {
      id: "war-room",
      label: "Launch Command Center",
      status: "completed",
      classification: "completed",
      owner: "Engineering",
      evidence: "/energy/launch · Master Launch v1.0",
    },
    {
      id: "coolify-hq",
      label: "Coolify production deploy",
      status: "waiting",
      classification: "waiting",
      owner: "Founder",
      evidence: "Stage 1 blocker — GO required",
    },
    {
      id: "prod-verify",
      label: "Production verification (DNS/SSL/email/pages)",
      status: "pending",
      classification: "waiting",
      owner: "Founder",
      evidence: "After deploy",
    },
    {
      id: "monitoring",
      label: "Monitoring & health probes",
      status: "in_progress",
      classification: "internal",
      owner: "Engineering",
      evidence: "/api/health · /api/launch-war-room/probe",
    },
  ],
};

export function opsStatusColor(status: OpsItemStatus): string {
  switch (status) {
    case "completed":
      return "text-forest";
    case "in_progress":
      return "text-gold";
    case "waiting":
      return "text-amber-300";
    case "blocked":
      return "text-red-300";
    default:
      return "text-cream-muted";
  }
}

export function opsStatusLabel(status: OpsItemStatus): string {
  switch (status) {
    case "completed":
      return "Done";
    case "in_progress":
      return "In progress";
    case "waiting":
      return "Waiting";
    case "blocked":
      return "Blocked";
    default:
      return "Pending";
  }
}

export function blockerClassColor(c: BlockerClass): string {
  switch (c) {
    case "completed":
      return "text-forest";
    case "internal":
      return "text-amber-200";
    case "external":
      return "text-orange-300";
    case "waiting":
      return "text-cream-muted";
    default:
      return "text-cream-muted";
  }
}

export function severityColor(s: RiskHeatmapEntry["severity"]): string {
  if (s === "critical") return "bg-red-500/20 border-red-400/40 text-red-200";
  if (s === "high") return "bg-orange-500/15 border-orange-400/30 text-orange-200";
  if (s === "medium") return "bg-amber-500/10 border-amber-400/25 text-amber-100";
  return "bg-forest/10 border-forest/30 text-forest";
}
