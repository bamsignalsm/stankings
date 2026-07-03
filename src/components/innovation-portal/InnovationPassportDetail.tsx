import Link from "next/link";
import type { InnovationPassport } from "@/lib/institution-lifecycle/types";

interface InnovationPassportDetailProps {
  passport: InnovationPassport;
}

export function InnovationPassportDetail({ passport }: InnovationPassportDetailProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/innovation-portal"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Innovation Portal
          </Link>
          <p className="font-mono text-sm text-gold">Innovation Passport · {passport.ideaId}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-cream md:text-4xl">
            {passport.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
              {passport.stageLabel}
            </span>
            <span className="rounded-full border border-gold-subtle px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream-muted">
              {passport.originLabel}
            </span>
            <span className="rounded-full border border-gold-subtle px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream-muted">
              {passport.track} track
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
            Problem Addressed
          </h2>
          <p className="text-cream-muted">{passport.problemAddressed}</p>
        </section>

        {passport.mentor && (
          <section className="mb-10">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Mentor</h2>
            <p className="text-cream-muted">{passport.mentor}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Review History</h2>
          <ol className="space-y-3 border-l border-gold/20 pl-4">
            {passport.reviewHistory.map((event) => (
              <li key={`${event.date}-${event.stage}`} className="text-sm">
                <span className="font-mono text-xs text-gold">{event.date}</span>
                <span className="mx-2 text-cream-muted/40">·</span>
                <span className="text-cream capitalize">{event.stage.replace(/_/g, " ")}</span>
                <p className="mt-1 text-cream-muted">{event.outcome}</p>
                {event.reviewer && (
                  <p className="text-xs text-cream-muted/70">Reviewer: {event.reviewer}</p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {passport.fundingDecisions.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Funding Decisions
            </h2>
            <ul className="space-y-1 text-sm text-cream-muted">
              {passport.fundingDecisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        {passport.lessonsLearned.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Lessons Learned
            </h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {passport.lessonsLearned.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="text-gold/60">—</span>
                  {l}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
            Constitution & Canons
          </h2>
          <ul className="mb-4 space-y-1 text-sm text-cream-muted">
            {passport.constitutionArticles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {passport.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-gold hover:border-gold/40"
              >
                {ref}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
            Knowledge Objects
          </h2>
          <ul className="space-y-2">
            {passport.knowledgeObjects.map((ko) => (
              <li key={ko.title}>
                {ko.href ? (
                  <Link href={ko.href} className="text-sm text-gold hover:text-gold-light">
                    {ko.title}
                  </Link>
                ) : (
                  <span className="text-sm text-cream-muted">{ko.title}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          {passport.linkedInstitutionSlug && (
            <Link
              href={`/library/institution-lifecycle/${passport.linkedInstitutionSlug}`}
              className="text-gold hover:text-gold-light"
            >
              Lifecycle Record →
            </Link>
          )}
          <Link href="/library/constitution/article-x" className="text-gold hover:text-gold-light">
            Article X →
          </Link>
        </div>
      </div>
    </>
  );
}
