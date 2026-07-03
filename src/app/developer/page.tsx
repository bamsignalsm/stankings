import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { LIVE_PLATFORMS } from "@/lib/institutional/public-site";

export const metadata: Metadata = {
  title: "Developer",
  description: "Developer information for the Stankings ecosystem — institutional reference only.",
};

export default function DeveloperPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Developer"
      title="Ecosystem developer reference"
      description="Stankings Group provides institutional identity and governance. Each product maintains its own API, documentation, and developer programs."
    >
      <div className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6">
        <h2 className="mb-2 font-serif text-lg text-cream">Architectural independence</h2>
        <p className="text-sm text-cream-muted">
          No shared runtime. No shared databases. No shared authentication. No shared payments.
          Products reference Stankings institutional resources — they do not depend on a common backend.
        </p>
      </div>

      <h2 className="mb-4 font-serif text-xl text-cream">Product developer resources</h2>
      <div className="space-y-4">
        {LIVE_PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
          >
            <h3 className="font-serif text-lg text-cream">{platform.name}</h3>
            <p className="mt-1 text-sm text-cream-muted">{platform.description}</p>
            <a
              href={`${platform.url}/developer`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-gold hover:text-gold-light"
            >
              {platform.domain}/developer ↗
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-2 text-sm text-cream-muted">
        <p>
          Security research:{" "}
          <Link href="/trust/responsible-disclosure" className="text-gold">
            Responsible Disclosure
          </Link>
        </p>
        <p>
          API status:{" "}
          <Link href="/status" className="text-gold">
            System Status
          </Link>
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
