import Link from "next/link";
import { FOUNDER_INSIGHTS } from "@/lib/founder-insights";

export function FounderInsightsHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            The Stankings Library
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Founder Insights
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Institutional learning from the Founder&apos;s operating experience — practical wisdom
            linked to Canons, stewardship, and the Custodian Programme.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {FOUNDER_INSIGHTS.map((insight) => (
            <article
              key={insight.identifier}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs text-gold">{insight.identifier}</p>
                <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                  {insight.status}
                </span>
              </div>
              <h2 className="mb-2 font-serif text-xl text-cream">
                <Link href={insight.href} className="hover:text-gold-light">
                  {insight.title}
                </Link>
              </h2>
              <p className="mb-4 text-sm text-cream-muted">{insight.summary}</p>
              <Link href={insight.href} className="text-sm text-gold hover:text-gold-light">
                Read insight →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library" className="text-gold hover:text-gold-light">
            ← The Library
          </Link>
          <Link href="/library/custodian-programme" className="text-gold hover:text-gold-light">
            Custodian Programme →
          </Link>
        </div>
      </div>
    </>
  );
}
