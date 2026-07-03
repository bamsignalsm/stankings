import type { Metadata } from "next";
import {
  InstitutionalCardGrid,
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import { TRUST_CENTER_SECTIONS } from "@/lib/institutional/public-site";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Privacy principles, security practices, and transparency resources from Stankings Group.",
};

export default function TrustCenterPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Trust Center"
      title="Trust is institutional capital"
      description="Shared trust resources for the Stankings ecosystem. Product platforms maintain independent systems — this center explains how we govern information responsibly."
    >
      <InstitutionalCardGrid
        items={TRUST_CENTER_SECTIONS.map((s) => ({
          href: s.href,
          title: s.title,
          summary: s.summary,
        }))}
      />
      <div className="mt-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
        <h2 className="mb-2 font-serif text-xl text-cream">Product independence</h2>
        <p className="text-sm leading-relaxed text-cream-muted">
          BamSignal, Yike, and BayRight operate separate databases, authentication, and payments.
          Stankings Group provides institutional identity and governance — not a shared runtime.
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
