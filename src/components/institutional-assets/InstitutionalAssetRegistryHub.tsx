import Link from "next/link";
import {
  ASSET_PROFILE_FIELDS,
  IAR_DASHBOARD_VIEWS,
  IAR_FRAMEWORK,
  IAR_PURPOSE,
} from "@/lib/frameworks/institutional-asset-registry";
import { INSTITUTIONAL_ASSET_CATEGORIES } from "@/lib/constitution/articles/article-vii";
import { ARTICLE_VII } from "@/lib/constitution/articles/article-vii";
import {
  getAssetRegistryStats,
  getAssetsByDashboardTag,
  INSTITUTIONAL_ASSETS,
} from "@/lib/institutional-assets";
import { EXECUTIVE_DECISION_35 } from "@/lib/iki";

function criticalityClass(c: string) {
  const map: Record<string, string> = {
    critical: "text-burgundy border-burgundy/30",
    high: "text-gold border-gold/30",
    medium: "text-cream-muted border-gold-subtle",
    forming: "text-cream-muted border-gold-subtle",
  };
  return map[c] ?? "text-cream-muted border-gold-subtle";
}

export function InstitutionalAssetRegistryHub() {
  const stats = getAssetRegistryStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_VII.article} · {IAR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Institutional Asset Registry
          </h1>
          <p className="text-cream-muted">{IAR_PURPOSE}</p>
          <blockquote className="mt-8 rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            What has been entrusted to us — not merely what we own.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_35}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Asset Profile Fields</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {ASSET_PROFILE_FIELDS.map((field) => (
              <li
                key={field}
                className="rounded border border-gold-subtle bg-ink-muted px-4 py-2 text-sm text-cream-muted"
              >
                {field}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Registry Dashboards</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {IAR_DASHBOARD_VIEWS.map((view) => {
              const count = getAssetsByDashboardTag(view.id).length;
              return (
                <div
                  key={view.id}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
                >
                  <p className="font-serif text-cream">{view.label}</p>
                  <p className="mt-1 text-sm text-cream-muted">{count} assets tagged</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Constitutional Asset Categories
          </h2>
          <ul className="grid gap-1 text-sm text-cream-muted sm:grid-cols-2">
            {INSTITUTIONAL_ASSET_CATEGORIES.slice(0, 10).map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-cream-muted/70">
            + {INSTITUTIONAL_ASSET_CATEGORIES.length - 10} further categories per Art. VII § 7.02
          </p>
        </section>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-cream-muted">
          <span>{stats.total} registered assets</span>
          <span className="text-burgundy/90">{stats.critical} critical</span>
          <span>{stats.trust} trust assets</span>
          <span>{stats.knowledge} knowledge assets</span>
          <span className="text-forest">{stats.recoveryReady} recovery tracked</span>
        </div>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Asset Register</h2>
          <ul className="space-y-4">
            {INSTITUTIONAL_ASSETS.map((asset) => (
              <li key={asset.assetId}>
                <Link
                  href={`/library/institutional-assets/${asset.slug}`}
                  className="block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs text-gold">{asset.assetId}</p>
                    <span
                      className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${criticalityClass(asset.criticality)}`}
                    >
                      {asset.criticality}
                    </span>
                  </div>
                  <p className="font-serif text-lg text-cream">{asset.name}</p>
                  <p className="text-xs text-gold">{asset.categoryLabel}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-cream-muted">{asset.description}</p>
                  <p className="mt-2 text-xs text-cream-muted">
                    Steward: {asset.steward} · Review: {asset.annualReviewDate}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-vii" className="text-gold hover:text-gold-light">
            Article VII →
          </Link>
          <Link href="/library/stewardship" className="text-cream-muted hover:text-gold">
            Stewardship Portal →
          </Link>
          <Link
            href="/library/frameworks/institutional-asset-registry"
            className="text-cream-muted hover:text-gold"
          >
            IAR Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
