/**
 * BayRight Production Certification — Sprint 002
 * Evidence-based snapshot for Founder Dashboard. Read-only.
 */
export type CertificationStatus = "pass" | "partial" | "fail" | "hold" | "not_run";

export interface BayRightProviderTrack {
  name: string;
  internalReady: CertificationStatus;
  externalReady: CertificationStatus;
  progress: string;
  blockers: string[];
  nextAction: string;
}

export interface BayRightCertificationSnapshot {
  sprintId: "EXECUTION-SPRINT-002";
  updatedAt: string;
  state: "NOT_READY";
  softLaunchRecommendation: "HOLD";
  fullLaunchRecommendation: "NOT_READY";
  scores: {
    engineering: number;
    security: number;
    payment: number;
    provider: number;
    operational: number;
    deploymentConfidence: number;
    softLaunchReadiness: number;
    fullLaunchReadiness: number;
  };
  providers: {
    peyflex: BayRightProviderTrack;
    safehaven: BayRightProviderTrack;
    squadMonnify: BayRightProviderTrack;
    remita: BayRightProviderTrack;
  };
  security: {
    status: CertificationStatus;
    automatedPass: number;
    manualOpen: string[];
  };
  peyflexUat: {
    completed: number;
    required: number;
    vendingEnabled: boolean;
    vendReady: { airtime: boolean; data: boolean; electricity: boolean; tv: boolean };
    webhookSecretConfigured: boolean;
  };
  safehavenUat: {
    oauthDiag: CertificationStatus;
    vaProvision: CertificationStatus;
    fundingUat: CertificationStatus;
  };
  productionEnv: {
    envPullProd: CertificationStatus;
    envCheck: CertificationStatus;
    verifyRelease: CertificationStatus;
    healthEndpoint: CertificationStatus;
    healthDetail: string;
  };
  criticalBlockers: string[];
  founderActions: string[];
  estimatedLaunchWindow: {
    softLaunch: string;
    fullLaunch: string;
  };
  evidenceRunAt: string;
}

export const BAYRIGHT_CERTIFICATION: BayRightCertificationSnapshot = {
  sprintId: "EXECUTION-SPRINT-002",
  updatedAt: "2026-07-03T18:41:00Z",
  state: "NOT_READY",
  softLaunchRecommendation: "HOLD",
  fullLaunchRecommendation: "NOT_READY",
  scores: {
    engineering: 85,
    security: 70,
    payment: 50,
    provider: 28,
    operational: 45,
    deploymentConfidence: 62,
    softLaunchReadiness: 38,
    fullLaunchReadiness: 25,
  },
  providers: {
    peyflex: {
      name: "Peyflex",
      internalReady: "pass",
      externalReady: "fail",
      progress: "0/10 UAT matrix · API balance OK · vending disabled",
      blockers: [
        "PEYFLEX_VENDING_ENABLED=false (all vendReady false)",
        "PEYFLEX_WEBHOOK_SECRET not configured (permissive mode)",
        "UAT matrix empty in docs/peyflex-live-test-log.md",
      ],
      nextAction: "Execute 3+3+2+2 matrix on preview; sign off; then enable vending flag",
    },
    safehaven: {
      name: "SafeHaven",
      internalReady: "pass",
      externalReady: "fail",
      progress: "OAuth diag PASS · VA provision FAIL",
      blockers: [
        "VA UAT provision: account_number empty (provider account_not_ready)",
        "BAYRIGHT_SAFEHAVEN_ENABLED=false",
        "SAFEHAVEN_FUNDING_WEBHOOK_ENABLED=false",
      ],
      nextAction: "Escalate SafeHaven ops for VA activation; rerun safehaven:va-uat",
    },
    squadMonnify: {
      name: "Squad / Monnify",
      internalReady: "pass",
      externalReady: "partial",
      progress: "Webhook routes implemented · live funding UAT not executed this sprint",
      blockers: [
        "Production wallet funding UAT not documented",
        "Local env:check missing Monnify/Squad secrets (prod pull blocked)",
      ],
      nextAction: "Founder wallet funding UAT ₦100–₦500 with webhook trace",
    },
    remita: {
      name: "Remita",
      internalReady: "pass",
      externalReady: "partial",
      progress: "Integration code complete · production UAT not executed",
      blockers: ["REMITA production endpoints not validated", "Egress IP whitelist pending"],
      nextAction: "Complete remita-uat-checklist after Peyflex path certified",
    },
  },
  security: {
    status: "partial",
    automatedPass: 6,
    manualOpen: [
      "Supabase leaked password protection (manual P0)",
      "Admin MFA not confirmed",
      "Linked RPC audit: npm run launch:security -- --linked",
      "Money table RLS audit (linked run)",
    ],
  },
  peyflexUat: {
    completed: 0,
    required: 10,
    vendingEnabled: false,
    vendReady: { airtime: false, data: false, electricity: false, tv: false },
    webhookSecretConfigured: false,
  },
  safehavenUat: {
    oauthDiag: "pass",
    vaProvision: "fail",
    fundingUat: "not_run",
  },
  productionEnv: {
    envPullProd: "fail",
    envCheck: "fail",
    verifyRelease: "pass",
    healthEndpoint: "partial",
    healthDetail: "bill_payments degraded = intentional Peyflex vending gate (Sprint 003 RCA)",
  },
  criticalBlockers: [
    "Sprint 003: NOT READY — Peyflex UAT 0/10",
    "SafeHaven VA provisioning fails (provider)",
    "vercel link required — env:pull:prod blocked",
    "Supabase leaked-password protection not enabled",
    "Founder Launch QA unsigned",
    "PEYFLEX_WEBHOOK_SECRET unset in production",
  ],
  founderActions: [
    "vercel link && npm run env:pull:prod && npm run env:check",
    "Enable Supabase leaked-password protection + admin MFA",
    "Execute Peyflex 3+3+2+2 UAT — fill peyflex-live-test-log.md",
    "Escalate SafeHaven VA activation; rerun npm run safehaven:va-uat",
    "Complete founder journey at /lex/auth/launch-qa",
    "Set PEYFLEX_WEBHOOK_SECRET before enabling vending",
  ],
  estimatedLaunchWindow: {
    softLaunch: "HOLD — minimum 14 days after Peyflex matrix + wallet funding UAT + security P0s",
    fullLaunch: "Late Jul – Sep 2026 (provider-dependent)",
  },
  evidenceRunAt: "2026-07-03T18:29:00Z",
};

export function certificationStatusColor(status: CertificationStatus): string {
  switch (status) {
    case "pass":
      return "text-forest";
    case "partial":
      return "text-amber-300";
    case "fail":
    case "hold":
      return "text-red-300";
    case "not_run":
    default:
      return "text-cream-muted";
  }
}

export function certificationStatusLabel(status: CertificationStatus): string {
  switch (status) {
    case "pass":
      return "PASS";
    case "partial":
      return "PARTIAL";
    case "fail":
      return "FAIL";
    case "hold":
      return "HOLD";
    case "not_run":
      return "NOT RUN";
    default:
      return String(status).toUpperCase();
  }
}
