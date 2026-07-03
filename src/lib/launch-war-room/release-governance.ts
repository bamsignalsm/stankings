/**
 * BamSignal release governance snapshot — Sprint 006
 * Read-only display for Launch War Room. Updated when certification archives run.
 */
import type { ProductCertificationSnapshot } from "@stankings/core/certification";
import type { FounderApproval } from "@stankings/core/approval";
import type { ReleaseState } from "@stankings/core/release";

export interface ProductReleaseGovernance {
  productId: string;
  state: ReleaseState;
  productionVersion: string;
  candidateVersion: string;
  commitSha: string;
  certification: ProductCertificationSnapshot;
  founderApproval: FounderApproval;
  deployment: { status: string; authorized: boolean };
  storeSubmission: { status: string; track: string | null };
  reviewStatus: { playConsole: string };
  deploymentConfidence: number;
}

export const BAMSIGNAL_RELEASE_GOVERNANCE: ProductReleaseGovernance = {
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
    smoke: { status: "pass", runId: "smoke-1209445a", score: 97, detail: "18/19 — 2026-07-03" },
    security: { status: "pass", detail: "Static 100%; CSP/HSTS at Cloudflare backlog" },
    performance: { status: "pass", detail: "Cert baseline 100%" },
  },
  founderApproval: { status: "pending", approvedAt: null },
  deployment: { status: "hold", authorized: false },
  storeSubmission: { status: "pending", track: "closed-testing (planned)" },
  reviewStatus: { playConsole: "not-submitted" },
  deploymentConfidence: 88,
};

export function getReleaseGovernance(productId: string): ProductReleaseGovernance | undefined {
  if (productId === "bamsignal") return BAMSIGNAL_RELEASE_GOVERNANCE;
  return undefined;
}

function statusColor(status: string): string {
  if (status === "pass" || status === "approved" || status === "live") return "text-forest";
  if (status === "pending" || status === "hold") return "text-amber-300";
  if (status === "fail" || status === "rejected") return "text-red-400";
  return "text-cream-muted";
}

export { statusColor };
