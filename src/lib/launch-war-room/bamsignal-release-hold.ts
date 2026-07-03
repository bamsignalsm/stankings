/**
 * BamSignal — RELEASE HOLD (Sprint 008)
 * Engineering frozen. Only release execution permitted.
 */

export type ReleaseHoldItemStatus = "done" | "pending" | "blocked";

export interface ReleaseHoldChecklistItem {
  id: string;
  label: string;
  status: ReleaseHoldItemStatus;
  owner: string;
  evidence?: string;
}

export const BAMSIGNAL_RELEASE_HOLD_CHECKLIST: ReleaseHoldChecklistItem[] = [
  {
    id: "github-env",
    label: "GitHub Environment configured",
    status: "pending",
    owner: "Founder",
    evidence: "production-certification not yet created",
  },
  {
    id: "diagnostics-secret",
    label: "DIAGNOSTICS_SECRET added",
    status: "pending",
    owner: "Founder",
    evidence: "Copy from Coolify → GitHub Environment",
  },
  {
    id: "prod-cert",
    label: "Production Certification PASS",
    status: "blocked",
    owner: "Engineering",
    evidence: "Blocked on GitHub Environment",
  },
  {
    id: "founder-approval",
    label: "Founder Approval",
    status: "pending",
    owner: "Founder",
  },
  {
    id: "coolify-deploy",
    label: "Coolify Deployment",
    status: "pending",
    owner: "Engineering",
    evidence: "Candidate 1.0.17-20 — prod still 1.0.15-18",
  },
  {
    id: "smoke-pass",
    label: "Smoke PASS",
    status: "pending",
    owner: "Engineering",
    evidence: "Post-deploy smoke required",
  },
  {
    id: "monitoring-pass",
    label: "Monitoring PASS",
    status: "pending",
    owner: "Ops",
    evidence: "60-minute window after deploy",
  },
  {
    id: "closed-testing",
    label: "Closed Testing Upload",
    status: "pending",
    owner: "Founder",
    evidence: "AAB ready — BamSignal-v1.0.17-20.aab",
  },
];

export const BAMSIGNAL_ENGINEERING_FREEZE =
  "Feature development, architecture, and refactoring frozen. Permitted: critical bugs, security patches, release execution, store review responses, monitoring." as const;
