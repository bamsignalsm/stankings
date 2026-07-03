/**
 * BamSignal launch status — Sprint 007 read-only war room data.
 * Visibility only. No deploy controls.
 */
import type { ProductReleaseGovernance } from "./release-governance";

export type LaunchPhase =
  | "release-hold"
  | "pre-certification"
  | "certification"
  | "founder-review"
  | "deploy-ready"
  | "deploying"
  | "monitoring"
  | "play-submission"
  | "live";

export interface LaunchWarRoomStatus {
  governance: ProductReleaseGovernance;
  launchPhase: LaunchPhase;
  phaseLabel: string;
  countdownLabel: string | null;
  health: { status: "pass" | "fail" | "unknown"; ready: boolean; checkedAt: string };
  monitoring: { status: "standby" | "active" | "incident"; windowMinutes: number | null };
  criticalAlerts: number;
  openIncidents: number;
  lastSuccessfulRelease: {
    version: string;
    buildMarker: string;
    deployedAt: string;
  };
  rollbackVersion: {
    version: string;
    buildMarker: string;
    commitSha: string;
  };
  playStatus: {
    track: string;
    submission: string;
    review: string;
  };
  timeline: { label: string; status: "done" | "current" | "pending" }[];
}

export const BAMSIGNAL_LAUNCH_STATUS: LaunchWarRoomStatus = {
  governance: {
    productId: "bamsignal",
    state: "certification",
    productionVersion: "1.0.15-18 (bamsignal-v1.0.15-18-mqx2n4dm)",
    candidateVersion: "1.0.17-20 (bamsignal-v1.0.17-20-mr5537eh)",
    commitSha: "962ddd28",
    certification: {
      liveE2e: {
        status: "pending",
        runId: null,
        score: null,
        detail: "Await GitHub production-certification workflow",
      },
      smoke: {
        status: "pass",
        runId: "smoke-1209445a",
        score: 97,
        detail: "18/19 — 2026-07-03",
      },
      security: { status: "pass", detail: "Static 100%; CSP/HSTS at Cloudflare backlog" },
      performance: { status: "pass", detail: "Cert baseline 100%" },
    },
    founderApproval: { status: "pending", approvedAt: null },
    deployment: { status: "hold", authorized: false },
    storeSubmission: { status: "pending", track: "closed-testing (planned)" },
    reviewStatus: { playConsole: "not-submitted" },
    deploymentConfidence: 88,
  },
  launchPhase: "release-hold",
  phaseLabel: "Sprint 008 — RELEASE HOLD (engineering frozen)",
  countdownLabel: "Blocked: GitHub production-certification Environment",
  health: {
    status: "pass",
    ready: true,
    checkedAt: "2026-07-03T16:26:08Z",
  },
  monitoring: { status: "standby", windowMinutes: null },
  criticalAlerts: 0,
  openIncidents: 0,
  lastSuccessfulRelease: {
    version: "1.0.15-18",
    buildMarker: "bamsignal-v1.0.15-18-mqx2n4dm",
    deployedAt: "2026-07-03",
  },
  rollbackVersion: {
    version: "1.0.15-18",
    buildMarker: "bamsignal-v1.0.15-18-mqx2n4dm",
    commitSha: "962ddd286129",
  },
  playStatus: {
    track: "none",
    submission: "AAB ready — BamSignal-v1.0.17-20.aab",
    review: "not-submitted",
  },
  timeline: [
    { label: "Release governance v1.0", status: "done" },
    { label: "Dry run (local steps)", status: "done" },
    { label: "GitHub Live E2E", status: "current" },
    { label: "Founder GO", status: "pending" },
    { label: "Coolify deploy 1.0.17-20", status: "pending" },
    { label: "60-min monitoring", status: "pending" },
    { label: "Play closed testing upload", status: "pending" },
    { label: "Production track", status: "pending" },
  ],
};
