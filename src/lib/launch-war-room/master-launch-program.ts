/**
 * Stankings Group — Master Launch Program v1.0
 * Single source of truth for launch execution. Evidence over estimates.
 */

import type { LaunchProductId } from "./products";

export const MASTER_LAUNCH_MISSION =
  "Full launch execution. Every activity must place products in users' hands. No speculative engineering." as const;

export const MASTER_LAUNCH_VERSION = "1.0" as const;

/** Global rule: only one product in ACTIVE_LAUNCH at a time */
export type ProductLaunchPosture =
  | "active-deployment"
  | "active-launch"
  | "active-engineering"
  | "active-certification"
  | "maintenance"
  | "recovery"
  | "frozen"
  | "observation";

export type LaunchStageId = 1 | 2 | 3 | 4;

export interface LaunchStage {
  id: LaunchStageId;
  product: LaunchProductId;
  productName: string;
  posture: ProductLaunchPosture;
  objective: string;
  exitCriteria: string;
  estimatedLaunchDate: string;
  tasks: MasterLaunchTask[];
}

export interface MasterLaunchTask {
  id: string;
  label: string;
  status: "pending" | "in_progress" | "waiting" | "blocked" | "completed";
  owner: string;
  evidence?: string;
}

export interface LaunchCommandCenterSnapshot {
  programId: "MASTER-LAUNCH-PROGRAM";
  version: typeof MASTER_LAUNCH_VERSION;
  updatedAt: string;
  mission: typeof MASTER_LAUNCH_MISSION;
  currentStage: LaunchStageId;
  currentProduct: LaunchProductId;
  currentProductName: string;
  launchPercent: number;
  programProgressPercent: number;
  estimatedLaunchDate: string;
  stage1Certification: Stage1CertificationSummary;
  globalRules: string[];
  productPostures: {
    id: LaunchProductId;
    name: string;
    stage: LaunchStageId | null;
    posture: ProductLaunchPosture;
    launchPercent: number;
  }[];
  blockers: string[];
  founderActions: string[];
  criticalRisks: string[];
  completedToday: string[];
  tomorrowsPlan: string[];
  successMetrics: string[];
  v2Gate: { label: string; done: boolean }[];
  stages: LaunchStage[];
}

export interface Stage1CertificationSummary {
  status: "in_progress" | "ready_for_deploy" | "closed";
  preDeploymentPercent: number;
  contentPercent: number;
  emailDnsPercent: number;
  productionDeployed: boolean;
  founderWalkthrough: boolean;
  reportsPath: string;
  blockers: string[];
}

function taskProgress(tasks: MasterLaunchTask[]): number {
  if (tasks.length === 0) return 0;
  const weights: Record<MasterLaunchTask["status"], number> = {
    completed: 100,
    in_progress: 50,
    waiting: 25,
    blocked: 10,
    pending: 0,
  };
  const sum = tasks.reduce((acc, t) => acc + weights[t.status], 0);
  return Math.round(sum / tasks.length);
}

const STAGE_1_TASKS: MasterLaunchTask[] = [
  { id: "s1-pre-cert", label: "Pre-deployment certification", status: "in_progress", owner: "Engineering", evidence: "docs/stage-1-certification/ · script PASS" },
  { id: "s1-content-cert", label: "Content certification", status: "in_progress", owner: "Engineering", evidence: "20/20 public routes · prod walkthrough pending" },
  { id: "s1-email-cert", label: "Email DNS certification", status: "in_progress", owner: "Founder", evidence: "MX/SPF/DKIM/DMARC PASS · delivery tests pending" },
  { id: "s1-deploy", label: "Deploy to production (Coolify)", status: "waiting", owner: "Founder", evidence: "HTTP 503 live · Founder GO required" },
  { id: "s1-dns", label: "Verify DNS", status: "completed", owner: "Founder", evidence: "A: 104.21.x / 172.67.x (Cloudflare)" },
  { id: "s1-ssl", label: "Verify SSL", status: "in_progress", owner: "Founder", evidence: "HTTPS OK · app returns 503 until deploy" },
  { id: "s1-cf", label: "Verify Cloudflare", status: "completed", owner: "Founder", evidence: "cf-ray headers · proxied A records" },
  { id: "s1-coolify", label: "Verify Coolify", status: "waiting", owner: "Founder", evidence: "Deploy + health after GO" },
  { id: "s1-email", label: "Verify email routing (inbound/outbound)", status: "pending", owner: "Founder", evidence: "Zoho — send/receive tests required" },
  { id: "s1-mailboxes", label: "Verify support mailboxes", status: "pending", owner: "Founder", evidence: "hello/support/legal/trust/press/security@" },
  { id: "s1-legal", label: "Verify legal pages (production)", status: "in_progress", owner: "Founder", evidence: "/legal/* built · prod verify after deploy" },
  { id: "s1-trust", label: "Verify Trust Center (production)", status: "in_progress", owner: "Founder", evidence: "/trust/* built · prod verify after deploy" },
  { id: "s1-status", label: "Verify Status page (production)", status: "in_progress", owner: "Founder", evidence: "/status built · prod verify after deploy" },
  { id: "s1-sitemap", label: "Verify sitemap", status: "completed", owner: "Engineering", evidence: "sitemap.ts · verify /sitemap.xml after deploy" },
  { id: "s1-robots", label: "Verify robots.txt", status: "completed", owner: "Engineering", evidence: "robots.ts · /library index allowed" },
  { id: "s1-monitor", label: "Verify monitoring", status: "in_progress", owner: "Engineering", evidence: "/api/health · probe endpoint" },
  { id: "s1-walkthrough", label: "Founder production walkthrough", status: "pending", owner: "Founder", evidence: "Phase 5 — after deploy" },
  { id: "s1-exit", label: "Exit review → MAINTENANCE", status: "pending", owner: "Founder", evidence: "Unlock Stage 2 on pass" },
];

const STAGE_2_TASKS: MasterLaunchTask[] = [
  { id: "s2-github", label: "GitHub Production Certification", status: "blocked", owner: "Founder", evidence: "Environment production-certification missing" },
  { id: "s2-device", label: "Device Certification (15/15)", status: "pending", owner: "Founder", evidence: "0/15 signed · Sprint 011 checklist" },
  { id: "s2-aab", label: "Fresh signed AAB", status: "pending", owner: "Founder", evidence: "Post-remediation bundleRelease" },
  { id: "s2-coolify", label: "Coolify Deployment", status: "waiting", owner: "Founder", evidence: "After cert PASS + GO" },
  { id: "s2-smoke", label: "Production Smoke", status: "pending", owner: "Engineering", evidence: "Re-run after deploy" },
  { id: "s2-founder", label: "Founder Verification", status: "pending", owner: "Founder", evidence: "Sprint 007 GO package" },
  { id: "s2-upload", label: "Closed Testing Upload", status: "pending", owner: "Founder", evidence: "Play Console" },
  { id: "s2-review", label: "Google Review", status: "pending", owner: "Google", evidence: "Not submitted" },
  { id: "s2-feedback", label: "Respond to reviewer feedback", status: "pending", owner: "Founder", evidence: "If flagged" },
  { id: "s2-monitor", label: "Monitor first testers", status: "pending", owner: "Founder", evidence: "Post-acceptance" },
];

const STAGE_3_TASKS: MasterLaunchTask[] = [
  { id: "s3-repo", label: "Repository cleanup", status: "pending", owner: "Engineering", evidence: "Dirty tree · 3 commits ahead" },
  { id: "s3-migrate", label: "Migration audit", status: "pending", owner: "Engineering", evidence: "Inventory only" },
  { id: "s3-parity", label: "Production parity", status: "pending", owner: "Engineering", evidence: "yike.ng vs local unverified" },
  { id: "s3-plan", label: "Release planning", status: "blocked", owner: "Founder", evidence: "No atomic release plan" },
  { id: "s3-cert", label: "Launch certification", status: "pending", owner: "Founder", evidence: "After plan approved" },
  { id: "s3-qa", label: "Founder QA", status: "pending", owner: "Founder", evidence: "—" },
  { id: "s3-deploy", label: "Deployment", status: "pending", owner: "Founder", evidence: "—" },
  { id: "s3-monitor", label: "Production monitoring", status: "pending", owner: "Engineering", evidence: "—" },
];

const STAGE_4_TASKS: MasterLaunchTask[] = [
  { id: "s4-peyflex", label: "Peyflex 10/10", status: "blocked", owner: "Founder", evidence: "0/10 UAT" },
  { id: "s4-sh", label: "SafeHaven VA", status: "blocked", owner: "Provider", evidence: "account_not_ready" },
  { id: "s4-env", label: "Production environment", status: "blocked", owner: "Founder", evidence: "vercel link · env:pull:prod" },
  { id: "s4-sec", label: "Security P0", status: "pending", owner: "Founder", evidence: "Leaked-password + MFA" },
  { id: "s4-qa", label: "Founder QA", status: "pending", owner: "Founder", evidence: "/lex/auth/launch-qa unsigned" },
  { id: "s4-wallet", label: "Wallet certification", status: "in_progress", owner: "Founder", evidence: "Wallet operational" },
  { id: "s4-provider", label: "Provider approval", status: "waiting", owner: "Providers", evidence: "Peyflex + SafeHaven" },
  { id: "s4-soft", label: "Soft launch", status: "pending", owner: "Founder", evidence: "After certification" },
  { id: "s4-public", label: "Public launch", status: "pending", owner: "Founder", evidence: "After soft launch stable" },
];

export const MASTER_LAUNCH_STAGES: LaunchStage[] = [
  {
    id: 1,
    product: "stankings-hq",
    productName: "Stankings HQ",
    posture: "active-deployment",
    objective: "Become the institutional headquarters",
    exitCriteria: "Production healthy · No critical issues · Move HQ to MAINTENANCE",
    estimatedLaunchDate: "2026-07-05",
    tasks: STAGE_1_TASKS,
  },
  {
    id: 2,
    product: "bamsignal",
    productName: "BamSignal",
    posture: "active-launch",
    objective: "Google Play Closed Testing",
    exitCriteria: "Accepted into Closed Testing · Stable production · Move to OBSERVATION",
    estimatedLaunchDate: "2026-07-12",
    tasks: STAGE_2_TASKS,
  },
  {
    id: 3,
    product: "yike",
    productName: "Yike",
    posture: "active-engineering",
    objective: "Prepare Production Candidate",
    exitCriteria: "Launch candidate approved",
    estimatedLaunchDate: "2026-08-15",
    tasks: STAGE_3_TASKS,
  },
  {
    id: 4,
    product: "bayright",
    productName: "BayRight",
    posture: "active-certification",
    objective: "Provider-approved production launch",
    exitCriteria: "Operationally certified",
    estimatedLaunchDate: "2026-09-01",
    tasks: STAGE_4_TASKS,
  },
];

/** Current executing stage — only Stage 1 is ACTIVE; others queued per global rules */
export const CURRENT_LAUNCH_STAGE: LaunchStageId = 1;

export function getCurrentLaunchStage(): LaunchStage {
  return MASTER_LAUNCH_STAGES.find((s) => s.id === CURRENT_LAUNCH_STAGE)!;
}

export function getStageProgress(stageId: LaunchStageId): number {
  const stage = MASTER_LAUNCH_STAGES.find((s) => s.id === stageId);
  return stage ? taskProgress(stage.tasks) : 0;
}

export function getProductPostureForStage(
  stageId: LaunchStageId,
): ProductLaunchPosture {
  if (stageId === CURRENT_LAUNCH_STAGE) {
    return MASTER_LAUNCH_STAGES.find((s) => s.id === stageId)!.posture;
  }
  if (stageId < CURRENT_LAUNCH_STAGE) return "maintenance";
  if (stageId === 2) return "observation";
  if (stageId === 3) return "frozen";
  if (stageId === 4) return "recovery";
  return "observation";
}

export const LAUNCH_COMMAND_CENTER: LaunchCommandCenterSnapshot = {
  programId: "MASTER-LAUNCH-PROGRAM",
  version: MASTER_LAUNCH_VERSION,
  updatedAt: "2026-07-03T19:15:00Z",
  mission: MASTER_LAUNCH_MISSION,
  currentStage: CURRENT_LAUNCH_STAGE,
  currentProduct: "stankings-hq",
  currentProductName: "Stankings HQ",
  launchPercent: getStageProgress(1),
  programProgressPercent: Math.round(
    MASTER_LAUNCH_STAGES.reduce((acc, s) => acc + taskProgress(s.tasks), 0) /
      MASTER_LAUNCH_STAGES.length,
  ),
  estimatedLaunchDate: "2026-07-05",
  stage1Certification: {
    status: "ready_for_deploy",
    preDeploymentPercent: 76,
    contentPercent: 100,
    emailDnsPercent: 86,
    productionDeployed: false,
    founderWalkthrough: false,
    reportsPath: "docs/stage-1-certification/",
    blockers: [
      "Production HTTP 503 — Coolify deploy not executed",
      "Coolify production env vars not verified",
      "Email inbound/outbound not tested by Founder",
      "Founder production walkthrough pending",
    ],
  },
  globalRules: [
    "Only ONE product in ACTIVE LAUNCH at a time",
    "All others: Maintenance · Recovery · Frozen · Observation",
    "No feature development before launch observation period completes",
    "Evidence always overrides estimates",
    "No feature may interrupt an active launch — backlog and continue",
  ],
  productPostures: [
    {
      id: "stankings-hq",
      name: "Stankings HQ",
      stage: 1,
      posture: "active-deployment",
      launchPercent: getStageProgress(1),
    },
    {
      id: "bamsignal",
      name: "BamSignal",
      stage: 2,
      posture: "observation",
      launchPercent: getStageProgress(2),
    },
    {
      id: "yike",
      name: "Yike",
      stage: 3,
      posture: "frozen",
      launchPercent: getStageProgress(3),
    },
    {
      id: "bayright",
      name: "BayRight",
      stage: 4,
      posture: "recovery",
      launchPercent: getStageProgress(4),
    },
  ],
  blockers: [
    "HQ: Production HTTP 503 — Coolify deploy required (Founder GO)",
    "HQ: Email inbound/outbound tests pending",
    "HQ: Founder production walkthrough pending after deploy",
    "BamSignal: LOCKED Stage 2 until HQ exit review",
  ],
  founderActions: [
    "STAGE 1: Review docs/stage-1-certification/ reports",
    "STAGE 1: Set Coolify env (NEXT_PUBLIC_SITE_URL, Supabase keys)",
    "STAGE 1: Authorize Coolify production deploy",
    "STAGE 1: curl https://stankings.com/api/health?ready=1 — expect 200",
    "STAGE 1: Email send/receive tests (hello@, support@, legal@, trust@, press@, security@)",
    "STAGE 1: Production walkthrough (/, about, trust, legal, status, sitemap, robots)",
    "STAGE 1: Sign exit review → HQ MAINTENANCE → unlock BamSignal",
  ],
  criticalRisks: [
    "Zero products fully launched — program Day 1",
    "HQ deploy delay blocks institutional credibility for product launches",
    "BamSignal Play path blocked until Stage 1 exit + Stage 2 founder proof",
    "BayRight provider gates unchanged — no public launch until Stage 4",
  ],
  completedToday: [
    "Stage 1 Final Deployment Certification — Phases 1–3 executed",
    "Pre-deployment audit: build PASS, TS PASS, Docker/health/headers PASS",
    "Content certification: 20/20 public institutional routes",
    "Email DNS: MX/SPF/DKIM/DMARC verified (Zoho)",
    "Fixed: /constitution redirect removed · robots allows /library index",
    "Reports: docs/stage-1-certification/",
  ],
  tomorrowsPlan: [
    "Founder: Coolify deploy + production health verification",
    "Founder: Email delivery tests all mailboxes",
    "Founder: Production walkthrough Phase 5",
    "Founder: Exit review → MAINTENANCE → Stage 2 ACTIVE LAUNCH",
  ],
  successMetrics: [
    "Products successfully launched",
    "Products successfully operating",
    "Products successfully growing",
  ],
  v2Gate: [
    { label: "Stankings HQ operational", done: false },
    { label: "BamSignal publicly available", done: false },
    { label: "Yike publicly available", done: false },
    { label: "BayRight publicly available", done: false },
    { label: "Ecosystem stable", done: false },
  ],
  stages: MASTER_LAUNCH_STAGES,
};

export function postureLabel(p: ProductLaunchPosture): string {
  const labels: Record<ProductLaunchPosture, string> = {
    "active-deployment": "ACTIVE DEPLOYMENT",
    "active-launch": "ACTIVE LAUNCH",
    "active-engineering": "ACTIVE ENGINEERING",
    "active-certification": "ACTIVE CERTIFICATION",
    maintenance: "MAINTENANCE",
    recovery: "RECOVERY",
    frozen: "FROZEN",
    observation: "OBSERVATION",
  };
  return labels[p];
}

export function postureColor(p: ProductLaunchPosture): string {
  if (p.startsWith("active-")) return "text-gold border-gold/40 bg-gold/10";
  if (p === "maintenance") return "text-forest border-forest/40 bg-forest/10";
  if (p === "frozen") return "text-cream-muted border-gold-subtle/30 bg-ink-light";
  if (p === "recovery") return "text-amber-200 border-amber-400/30 bg-amber-400/5";
  return "text-cream-muted border-gold-subtle/25";
}

export function taskStatusColor(status: MasterLaunchTask["status"]): string {
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
