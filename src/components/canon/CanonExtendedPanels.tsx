import type { CanonExtendedMetadata } from "@/lib/canon/types";
import { AISummaryTabs } from "@/components/canon/AISummaryTabs";

/** Shown immediately after canon header — where this canon lives */
export function CanonApplicationsBanner({ extended }: { extended: CanonExtendedMetadata }) {
  return (
    <>
      <AISummaryTabs summaries={extended.aiSummaries} />
      <section className="mb-12 rounded-lg border border-gold/25 bg-gold-subtle/30 p-6">
        <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
          Institutional Applications
        </h2>
        <p className="mb-4 text-sm text-cream-muted">Applied in</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {extended.institutionalApplications.map((app) => (
            <li key={app} className="flex items-center gap-2 text-sm text-cream">
              <span className="text-forest">✓</span>
              {app}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/** Shown after canon text — graph, examples, history, citations */
export function CanonExtendedPanelsTail({ extended }: { extended: CanonExtendedMetadata }) {
  const citeId = extended.identifier;

  return (
    <>
      <section className="mb-12 border-t border-gold-subtle pt-10">
        <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
          Canon Dependency Graph
        </h2>
        <div className="space-y-6 font-mono text-sm">
          {extended.dependencyUpstream.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-cream-muted">
                Supported by
              </p>
              <div className="flex flex-col items-start gap-2 border-l-2 border-gold/30 pl-4">
                {extended.dependencyUpstream.map((node) => (
                  <a key={node.identifier} href={node.href} className="text-gold hover:text-gold-light">
                    {node.identifier}
                    <span className="ml-2 font-sans text-xs text-cream-muted">{node.title}</span>
                  </a>
                ))}
                <span className="text-cream-muted">↓ supports ↓</span>
                <span className="font-serif text-cream">{citeId}</span>
              </div>
            </div>
          )}
          {extended.dependencyDownstream.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-cream-muted">Supports</p>
              <div className="flex flex-col items-start gap-2 border-l-2 border-gold/30 pl-4">
                <span className="font-serif text-cream">{citeId}</span>
                <span className="text-cream-muted">↓ supports ↓</span>
                {extended.dependencyDownstream.map((node) => (
                  <a key={node.identifier} href={node.href} className="text-gold hover:text-gold-light">
                    {node.identifier}
                    <span className="ml-2 font-sans text-xs text-cream-muted">{node.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-12 border-t border-gold-subtle pt-10">
        <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">Decision Examples</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-forest">Good Decisions</p>
            <ul className="space-y-2">
              {extended.decisionExamples.good.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-cream-muted">
                  <span className="text-forest">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-burgundy">Poor Decisions</p>
            <ul className="space-y-2">
              {extended.decisionExamples.poor.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-cream-muted">
                  <span className="text-burgundy">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12 border-t border-gold-subtle pt-10">
        <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">Historical Lessons</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-sm text-cream-muted">Lessons from loss of trust</p>
            <ul className="space-y-2 text-sm text-cream-muted">
              {extended.historicalLessons.lostTrust.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm text-cream-muted">Lessons from strengthened trust</p>
            <ul className="space-y-2 text-sm text-cream-muted">
              {extended.historicalLessons.strengthenedTrust.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12 border-t border-gold-subtle pt-10">
        <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Citation</h2>
        <p className="mb-3 text-sm text-cream-muted">Legally traceable reference format:</p>
        <code className="block rounded border border-gold-subtle bg-ink-muted p-3 text-sm text-gold">
          [{citeId} § {extended.sections.find((s) => s.id.includes("test"))?.title ?? "Statement"}]
        </code>
      </section>
    </>
  );
}
