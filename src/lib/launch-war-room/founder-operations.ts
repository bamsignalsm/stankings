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
  updatedAt: "2026-07-04T11:00:00Z",
  launchProgressNote:
    "Stage 1 — production LIVE; redeploy latest main for Sprints 013–017 routes, then enter Operational Maintenance.",
  systemHealth: [
    {
      id: "hq-app",
      label: "System Health — HQ App",
      health: "healthy",
      detail: "https://stankings.com/api/health → 200; ready=1 → database connected (probed 2026-07-04).",
      href: "/api/health",
    },
    {
      id: "shared-portals",
      label: "Shared Authority Portals",
      health: "degraded",
      detail: "Live build is older (cb41438). /trust /legal /support OK; /security /design-system /search 404 until redeploy.",
      href: "/trust",
    },
  ],
  deployment: [
    {
      id: "deploy-status",
      label: "Deployment Status",
      health: "action_required",
      detail: "Container running. Redeploy main (10b085e+) to ship authority centers, design system, and shared services.",
    },
    {
      id: "repo-status",
      label: "Repository Status",
      health: "healthy",
      detail: "main certified through Sprint 017. Typecheck/lint/build pass.",
    },
    {
      id: "cloud-status",
      label: "Cloud Status",
      health: "healthy",
      detail: "Cloudflare + origin serving HTTP 200 for HQ.",
    },
  ],
  environment: [
    {
      id: "env-status",
      label: "Environment Status",
      health: "healthy",
      detail: "Supabase Stankings project linked; 59 migrations applied; .env.example documents required vars.",
    },
    {
      id: "ssl-status",
      label: "SSL Status",
      health: "healthy",
      detail: "Cloudflare terminates TLS for stankings.com (certificate valid when edge responds).",
    },
    {
      id: "domain-status",
      label: "Domain Status",
      health: "healthy",
      detail: "stankings.com resolves to Cloudflare anycast addresses.",
    },
    {
      id: "dns-status",
      label: "DNS Status",
      health: "healthy",
      detail: "A/AAAA records present; MX/SPF/DKIM/DMARC configured (Zoho).",
    },
    {
      id: "email-status",
      label: "Email Status",
      health: "unknown",
      detail: "DNS authentication pass; inbound/outbound delivery tests remain Founder-owned.",
    },
  ],
  infrastructure: [
    {
      id: "certificates",
      label: "Certificates",
      health: "unknown",
      detail: "Edge certs via Cloudflare. Origin certs managed in Coolify — verify in host panel.",
    },
  ],
  renewals: [
    {
      id: "domain-renewal",
      label: "stankings.com domain",
      category: "domain",
      status: "unknown",
      note: "Confirm registrar renewal date in domain account — not stored in app.",
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
      note: "Stankings Group project dfaqkrikdvohvvcuxoek — monitor plan limits in dashboard.",
    },
    {
      id: "github",
      label: "GitHub repository",
      category: "repository",
      status: "current",
      note: "bamsignalsm/stankings on main.",
    },
  ],
  dailyTasks: [
    "Coolify: Redeploy latest main (includes Trust/Security/Design System)",
    "Walkthrough: docs/founder-walkthrough-stage-1.md",
    "Confirm /security /design-system /search return 200 after redeploy",
    "Change default seed passwords; revoke shared access tokens",
    "Sign Stage 1 exit → Operational Maintenance → Stage 2 BamSignal",
  ],
  outstandingRisks: [
    "Production build lagging main (missing Sprint 013–017 routes)",
    "Stage 1 not formally closed — Stage 2 BamSignal still locked by process",
    "Default seed passwords must be changed before public admin use",
    "Personal access tokens shared in chat should be revoked",
  ],
  operationalAlerts: [
    "P1: Redeploy main so authority portals and design system are live",
  ],
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
