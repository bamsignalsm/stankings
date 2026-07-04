import type { Metadata } from "next";
import { StatusGrid } from "@/components/authority/StatusCard";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { STATUS_POLICY, STATUS_SERVICES } from "@/lib/authority/status";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "System Status",
  description:
    "Corporate status dashboard for Stankings HQ and ecosystem services — without fabricated uptime metrics.",
  path: "/status",
});

export default function SystemStatusPage() {
  return (
    <InstitutionalPageShell
      eyebrow="System Status"
      title="Corporate status dashboard"
      description="Service cards for HQ, shared services, and operating companies. We do not publish fabricated uptime percentages or invented incidents."
      width="wide"
    >
      <div className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-5">
        <p className="text-sm leading-relaxed text-cream-muted">{STATUS_POLICY}</p>
      </div>

      <StatusGrid services={STATUS_SERVICES} />

      <p className="mt-10 text-sm text-cream-muted">
        Live HQ probe when deployed:{" "}
        <a href="/api/health" className="text-gold hover:text-gold-light">
          /api/health
        </a>
        {" · "}
        <a href="/api/health?ready=1" className="text-gold hover:text-gold-light">
          /api/health?ready=1
        </a>
      </p>
    </InstitutionalPageShell>
  );
}
