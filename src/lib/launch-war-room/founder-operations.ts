/**
 * Founder War Room — operational infrastructure signals.
 * Evidence-based only. No fabricated uptime or certificate expiry dates.
 */

export type OpsSignalHealth =
  | "healthy"
  | "degraded"
  | "down"
  | "unknown"
  | "action_required";

export interface OpsSignal {
  id: string;
  label: string;
  health: OpsSignalHealth;
  detail: string;
  href?: string;
}

export interface RenewalItem {
  id: string;
  label: string;
  category: "certificate" | "domain" | "email" | "cloud" | "repository";
  status: "unknown" | "current" | "action_required";
  note: string;
}

export interface FounderWarRoomSnapshot {
  updatedAt: string;
  systemHealth: OpsSignal[];
  deployment: OpsSignal[];
  environment: OpsSignal[];
  infrastructure: OpsSignal[];
  renewals: RenewalItem[];
  dailyTasks: string[];
  outstandingRisks: string[];
  operationalAlerts: string[];
  launchProgressNote: string;
}

/** Single source for Founder War Room panels — update when evidence changes */
export const FOUNDER_WAR_ROOM: FounderWarRoomSnapshot = {
  updatedAt: "2026-07-04T11:40:00Z",
  launchProgressNote:
    "Stage 1 ✅ Operational Maintenance · Stage 2 BamSignal ACTIVE LAUNCH",
  systemHealth: [
    {
      id: "hq-app",
      label: "System Health — HQ App",
      health: "healthy",
      detail: "https://stankings.com/api/health → 200; ready=1 → database connected.",
      href: "/api/health",
    },
    {
      id: "shared-portals",
      label: "Shared Authority Portals",
      health: "healthy",
      detail: "/trust /legal /support /security /design-system /search → 200 (build f1d6c51).",
      href: "/trust",
    },
  ],
  deployment: [
    {
      id: "deploy-status",
      label: "Deployment Status",
      health: "healthy",
      detail: "Production serving latest certified HQ release (v1.0.0).",
    },
    {
      id: "repo-status",
      label: "Repository Status",
      health: "healthy",
      detail: "main protected · v1.0.0 tagged · HQ feature freeze in effect.",
    },
    {
      id: "cloud-status",
      label: "Cloud Status",
      health: "healthy",
      detail: "Cloudflare + Coolify origin serving HTTP 200.",
    },
  ],
  environment: [
    {
      id: "env-status",
      label: "Environment Status",
      health: "healthy",
      detail: "Supabase connected; public env validated via readiness probe.",
    },
    {
      id: "ssl-status",
      label: "SSL Status",
      health: "healthy",
      detail: "Cloudflare TLS terminating for stankings.com.",
    },
    {
      id: "domain-status",
      label: "Domain Status",
      health: "healthy",
      detail: "stankings.com resolves via Cloudflare.",
    },
    {
      id: "dns-status",
      label: "DNS Status",
      health: "healthy",
      detail: "A/AAAA + mail authentication records present.",
    },
    {
      id: "email-status",
      label: "Email Status",
      health: "unknown",
      detail: "DNS auth pass; continue monitoring mailbox delivery.",
    },
  ],
  infrastructure: [
    {
      id: "certificates",
      label: "Certificates",
      health: "healthy",
      detail: "Edge certificates managed by Cloudflare.",
    },
  ],
  renewals: [
    {
      id: "domain-renewal",
      label: "stankings.com domain",
      category: "domain",
      status: "unknown",
      note: "Confirm registrar renewal date in domain account.",
    },
    {
      id: "cf-ssl",
      label: "Cloudflare SSL",
      category: "certificate",
      status: "current",
      note: "Managed by Cloudflare when proxy is enabled.",
    },
    {
      id: "zoho-mail",
      label: "Zoho Mail",
      category: "email",
      status: "unknown",
      note: "Confirm subscription and mailbox aliases in Zoho admin.",
    },
    {
      id: "supabase",
      label: "Supabase project",
      category: "cloud",
      status: "current",
      note: "Stankings Group project — monitor plan limits.",
    },
    {
      id: "github",
      label: "GitHub repository",
      category: "repository",
      status: "current",
      note: "bamsignalsm/stankings · v1.0.0",
    },
  ],
  dailyTasks: [
    "BamSignal: GitHub production-certification environment",
    "BamSignal: Device certification 15/15",
    "BamSignal: Signed AAB + Play closed testing",
    "HQ: Monitoring only — no feature work",
  ],
  outstandingRisks: [
    "BamSignal Play rejection if device evidence incomplete",
    "BayRight provider gates remain for Stage 4",
  ],
  operationalAlerts: [],
};

export function opsHealthColor(health: OpsSignalHealth): string {
  switch (health) {
    case "healthy":
      return "text-forest border-forest/40 bg-forest/10";
    case "degraded":
      return "text-gold border-gold/40 bg-gold/10";
    case "down":
      return "text-red-200 border-red-400/40 bg-red-500/10";
    case "action_required":
      return "text-amber-200 border-amber-400/40 bg-amber-400/10";
    default:
      return "text-cream-muted border-gold-subtle bg-ink-muted";
  }
}

export function opsHealthLabel(health: OpsSignalHealth): string {
  switch (health) {
    case "healthy":
      return "Healthy";
    case "degraded":
      return "Degraded";
    case "down":
      return "Down";
    case "action_required":
      return "Action required";
    default:
      return "Unknown";
  }
}
