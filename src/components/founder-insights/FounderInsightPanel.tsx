import Link from "next/link";
import type { FounderInsight } from "@/lib/founder-insights/types";

export function FounderInsightPanel({ insight }: { insight: FounderInsight }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 print:max-w-none print:px-8 print:py-8 print:text-black">
      <header className="mb-10 border-b border-gold-subtle pb-10 print:border-gray-300">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-gold print:text-gray-600">
          Founder Insight · {insight.identifier}
        </p>
        <h1 className="mb-2 font-serif text-4xl font-semibold text-cream print:text-black md:text-5xl">
          {insight.title}
        </h1>
        <p className="text-sm text-cream-muted print:text-gray-700">
          v{insight.version} · {insight.status} · Session {insight.sessionId}
        </p>
      </header>

      <section className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 print:border print:bg-gray-50">
        <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">Summary</p>
        <p className="text-sm leading-relaxed text-cream print:text-black">{insight.summary}</p>
      </section>

      <section className="mb-8 space-y-4">
        {insight.bodyParagraphs.map((p) => (
          <p key={p.slice(0, 48)} className="text-sm leading-relaxed text-cream-muted print:text-gray-800">
            {p}
          </p>
        ))}
      </section>

      <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
        <h2 className="mb-3 font-serif text-xl font-semibold text-cream print:text-black">
          Institutional Insight
        </h2>
        <p className="text-sm leading-relaxed text-cream-muted print:text-gray-800">
          {insight.institutionalInsight}
        </p>
      </section>

      <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
        <h2 className="mb-3 font-serif text-xl font-semibold text-cream print:text-black">
          Foundational Principle
        </h2>
        <blockquote className="font-serif text-lg italic leading-relaxed text-cream print:text-black">
          {insight.foundationalPrinciple}
        </blockquote>
      </section>

      <section className="mb-8 grid gap-6 md:grid-cols-2">
        {insight.engines.map((engine) => (
          <div key={engine.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
            <h2 className="mb-2 font-serif text-lg font-semibold text-cream print:text-black">
              {engine.title}
            </h2>
            <p className="mb-4 text-sm text-cream-muted print:text-gray-800">{engine.description}</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-cream-muted print:text-gray-800">
              {engine.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8 rounded-lg border border-forest/30 bg-forest/10 p-6 print:border print:bg-white">
        <h2 className="mb-3 font-serif text-lg font-semibold text-forest print:text-black">
          Operating Rule
        </h2>
        <p className="text-sm leading-relaxed text-cream-muted print:text-gray-800">
          {insight.operatingRule}
        </p>
      </section>

      <section className="mb-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream print:text-black">
            Related Canons
          </h2>
          <ul className="space-y-2 text-sm">
            {insight.canonRefs.map((c) => (
              <li key={c.identifier}>
                <Link href={c.href} className="text-gold hover:text-gold-light print:text-black">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream print:text-black">
            Related Concepts
          </h2>
          <div className="flex flex-wrap gap-2">
            {insight.relatedConcepts.map((c) => (
              <span
                key={c}
                className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted print:border-gray-300 print:text-gray-800"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
        <h2 className="mb-3 font-serif text-lg font-semibold text-cream print:text-black">
          Custodian Programme
        </h2>
        <p className="text-sm text-cream-muted print:text-gray-800">{insight.custodianProgrammeUse}</p>
        <Link
          href="/library/custodian-programme"
          className="mt-4 inline-block text-sm text-gold hover:text-gold-light print:text-black"
        >
          Custodian Programme →
        </Link>
      </section>

      <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm print:mt-8">
        <Link href="/library/founder-insights" className="text-gold hover:text-gold-light">
          ← Founder Insights
        </Link>
        <Link href={`/library/sessions/${insight.sessionId}`} className="text-gold hover:text-gold-light">
          Session Record →
        </Link>
        <Link href="/library/stewardship" className="text-gold hover:text-gold-light">
          Stewardship Portal →
        </Link>
      </div>
    </div>
  );
}
