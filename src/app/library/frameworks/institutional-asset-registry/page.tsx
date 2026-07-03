import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { INSTITUTIONAL_ASSETS } from "@/lib/institutional-assets";
import {
  ASSET_REGISTER_CLASSIFICATIONS,
  IAR_BODY,
  IAR_DASHBOARD_VIEWS,
  IAR_FRAMEWORK,
  IAR_PURPOSE,
} from "@/lib/frameworks/institutional-asset-registry";
import { EXECUTIVE_DECISION_35 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Institutional Asset Registry Framework",
  description: "FRAMEWORK-IAR-001 — constitutional asset register and stewardship profiles.",
  robots: { index: false, follow: false },
};

export default function InstitutionalAssetRegistryFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {IAR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IAR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{IAR_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_35}
        </blockquote>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">Register Classifications</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {ASSET_REGISTER_CLASSIFICATIONS.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">Dashboards</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {IAR_DASHBOARD_VIEWS.map((v) => (
              <li key={v.id}>— {v.label}</li>
            ))}
          </ul>
        </section>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{IAR_BODY}</div>
        <ul className="space-y-2">
          {INSTITUTIONAL_ASSETS.map((a) => (
            <li key={a.slug}>
              <Link href={`/library/institutional-assets/${a.slug}`} className="text-gold hover:text-gold-light">
                {a.assetId} — {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/institutional-assets" className="text-gold hover:text-gold-light">
            Asset Registry →
          </Link>
          <Link href="/library/constitution/article-vii" className="text-cream-muted hover:text-gold">
            Article VII →
          </Link>
        </div>
      </div>
    </div>
  );
}
