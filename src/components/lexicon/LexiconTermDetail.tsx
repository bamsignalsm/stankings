import Link from "next/link";
import type { LexiconTerm } from "@/lib/lexicon-engine/types";
import { getLexiconTermHref } from "@/lib/lexicon-engine/hrefs";

interface LexiconTermDetailProps {
  term: LexiconTerm;
  relatedTerms: LexiconTerm[];
}

export function LexiconTermDetail({ term, relatedTerms }: LexiconTermDetailProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-2 font-mono text-sm text-gold">{term.identifier}</p>
          <h1 className="mb-6 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {term.term}
          </h1>

          <dl className="grid gap-4 border-y border-gold-subtle py-6 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-cream-muted">Status</dt>
              <dd className="capitalize text-cream">{term.status.replace("_", " ")}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-cream-muted">Version</dt>
              <dd className="text-cream">v{term.version}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-cream-muted">Owner</dt>
              <dd className="text-cream">{term.owner}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                Approved
              </dt>
              <dd className="text-cream">{term.approvedAt}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <section className="mb-12">
          <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Definition</h2>
          <div className="space-y-4 font-serif text-lg leading-relaxed text-cream">
            <p>{term.definition}</p>
            {term.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        {term.synonyms.length > 0 && (
          <section className="mb-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
              Suggested Synonyms
            </h2>
            <p className="mb-4 text-xs text-cream-muted">
              For writing assistance only — not authoritative substitutes.
            </p>
            <ul className="flex flex-wrap gap-2">
              {term.synonyms.map((syn) => (
                <li
                  key={syn}
                  className="rounded-full border border-gold-subtle bg-ink-muted px-3 py-1 text-sm text-cream-muted"
                >
                  {syn}
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedTerms.length > 0 && (
          <section className="mb-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Related Terms</h2>
            <ul className="space-y-2">
              {relatedTerms.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={getLexiconTermHref(related.slug)}
                    className="text-gold hover:text-gold-light"
                  >
                    {related.term}
                  </Link>
                  <span className="ml-2 text-sm text-cream-muted">
                    — {related.definition.slice(0, 80)}…
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {term.distinctions && term.distinctions.length > 0 && (
          <section className="mb-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
              Not Interchangeable With
            </h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {term.distinctions.map((d) => (
                <li key={d.term}>
                  <span className="text-cream">{d.term}</span> — {d.when}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-12 border-t border-gold-subtle pt-10">
          <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Referenced By</h2>
          {term.referencedBy.length > 0 ? (
            <ul className="space-y-3">
              {term.referencedBy.map((ref) => (
                <li key={ref.identifier}>
                  <Link href={ref.href} className="text-gold hover:text-gold-light">
                    {ref.title}
                  </Link>
                  <span className="ml-2 font-mono text-xs text-cream-muted">
                    {ref.identifier} · {ref.objectType}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-cream-muted">
              No registered references yet. As Canons, Constitution articles, and
              standards cite this term, they will appear here.
            </p>
          )}
        </section>

        <section className="mb-12 border-t border-gold-subtle pt-10">
          <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Version History</h2>
          <ul className="space-y-4">
            {term.versions.map((v) => (
              <li
                key={v.version}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-sm text-gold">v{v.version}</span>
                  <span className="text-xs capitalize text-cream-muted">
                    {v.approvalStatus} · {v.date}
                  </span>
                </div>
                <p className="text-sm text-cream-muted">{v.summaryOfChanges}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            Approval Workflow
          </h2>
          <p className="text-sm text-cream-muted">
            Changes to approved terms require Library Council review. Proposed
            amendments enter version history — definitions are never silently
            overwritten.
          </p>
          <p className="mt-3 text-xs text-cream-muted/70">
            Current status:{" "}
            <span className="capitalize text-cream">{term.status.replace("_", " ")}</span>
            {" · "}Approver: {term.approver}
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/lexicon" className="text-gold hover:text-gold-light">
            ← The Lexicon
          </Link>
          <Link href="/library/standards/ls-002" className="text-cream-muted hover:text-gold">
            LS-002 Standard
          </Link>
        </div>
      </div>
    </>
  );
}
