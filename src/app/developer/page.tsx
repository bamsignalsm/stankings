import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero, ResourceGrid, LegalNotice, Timeline } from "@/components/ui";
import { LIVE_PLATFORMS } from "@/lib/institutional/public-site";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Developer Center",
  description:
    "Developer portal for the Stankings ecosystem — APIs, authentication, webhooks, rate limits, and product developer links.",
  path: "/developer",
});

const SECTIONS = [
  { title: "APIs", summary: "HQ exposes health and institutional endpoints only. Product APIs live on product domains.", href: "/api/health" },
  { title: "SDKs", summary: "No shared HQ SDK. Use each product’s published client libraries when available.", href: "/developer#sdks" },
  { title: "Authentication", summary: "HQ member auth is separate from product auth. No shared sessions.", href: "/security/authentication" },
  { title: "Webhooks", summary: "Product webhooks are configured per company. HQ does not receive product payment webhooks.", href: "/developer#webhooks" },
  { title: "Rate Limits", summary: "Public HQ endpoints are for status and documentation. Abuse is blocked under Acceptable Use.", href: "/legal/acceptable-use" },
  { title: "Status", summary: "Corporate status dashboard without fabricated metrics.", href: "/status" },
  { title: "Examples", summary: "Health probe examples and independence principles.", href: "/developer#examples" },
  { title: "Changelog", summary: "Material HQ public changes are recorded in sprint reports under /docs.", href: "/developer#changelog" },
];

export default function DeveloperPage() {
  return (
    <div className="pt-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Developer Center",
          description: "Developer portal for the Stankings ecosystem",
          url: "https://stankings.com/developer",
        }}
      />
      <SectionHero
        eyebrow="Developer Center"
        title="Build on institutional standards"
        description="Stankings HQ publishes trust, legal, and status infrastructure. Product APIs and SDKs remain on product domains — no shared runtime."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 space-y-12">
          <LegalNotice>
            Architectural independence: no shared databases, authentication, or payments between HQ
            and operating companies. Policies originate at HQ; implementations stay with products.
          </LegalNotice>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Portal sections</h2>
            <ResourceGrid items={SECTIONS} />
          </div>

          <div id="examples">
            <h2 className="mb-4 font-serif text-2xl text-cream">Examples</h2>
            <pre className="overflow-x-auto rounded-lg border border-gold-subtle bg-ink-muted p-4 text-xs text-cream-muted">
{`# Liveness
curl -s https://stankings.com/api/health

# Readiness (env + database)
curl -s 'https://stankings.com/api/health?ready=1'`}
            </pre>
          </div>

          <div id="sdks">
            <h2 className="mb-4 font-serif text-2xl text-cream">Product developer resources</h2>
            <div className="space-y-4">
              {LIVE_PLATFORMS.map((platform) => (
                <div
                  key={platform.name}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
                >
                  <h3 className="font-serif text-lg text-cream">{platform.name}</h3>
                  <p className="mt-1 text-sm text-cream-muted">{platform.description}</p>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-gold hover:text-gold-light"
                  >
                    {platform.domain} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div id="webhooks">
            <h2 className="mb-4 font-serif text-2xl text-cream">Webhooks</h2>
            <p className="text-sm text-cream-muted">
              Configure product webhooks in each product’s admin console. HQ does not terminate
              product payment or marketplace webhooks.
            </p>
          </div>

          <div id="changelog">
            <h2 className="mb-4 font-serif text-2xl text-cream">Changelog</h2>
            <Timeline
              items={[
                {
                  meta: "Sprint 014",
                  title: "Central trust authority",
                  detail: "Shared Trust, Security, Legal, Support, Compliance centers.",
                },
                {
                  meta: "Sprint 013",
                  title: "Public institution completion",
                  detail: "Corporate public pages and institutional dark theme.",
                },
                {
                  meta: "Sprint 011",
                  title: "Docker-first Coolify packaging",
                  detail: "Node 22 standalone image and deployment docs.",
                },
              ]}
            />
          </div>

          <p className="text-sm text-cream-muted">
            Security research:{" "}
            <Link href="/security" className="text-gold">
              Security Center
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
