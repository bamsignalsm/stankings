"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ARTICLE_COMMENTARY,
  CONSTITUTIONAL_AUDITS,
  CONSTITUTIONAL_DEFINITIONS_EXTENDED,
  CONSTITUTIONAL_DIAGRAMS,
  CONSTITUTIONAL_INDEX,
  CONSTITUTIONAL_LEARNING,
  CONVENTION_PHASES,
  VOLUME_I_CONVENTION_MANDATE,
  VOLUME_I_FREEZE,
  VOLUME_I_STATUS,
  getConventionStats,
  searchConstitution,
} from "@/lib/constitutional-convention";
import { CONSTITUTION_VERSION, CONSTITUTION_MOTTO } from "@/lib/constitution/volume-i";

const STATUS_COLORS = {
  pass: "text-forest",
  warning: "text-amber-400",
  note: "text-gold",
  pending: "text-cream-muted",
  verified: "text-forest",
  review: "text-amber-400",
};

export function ConstitutionalConventionHub() {
  const stats = getConventionStats();
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = searchQuery.length >= 2 ? searchConstitution(searchQuery) : [];

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Volume I · Constitutional Convention · {CONSTITUTION_VERSION}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Convention
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{VOLUME_I_CONVENTION_MANDATE}</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gold">
            Frozen {VOLUME_I_FREEZE.frozenAt} — {VOLUME_I_FREEZE.mandate}
          </p>
          <blockquote className="mx-auto mt-8 max-w-xl font-serif text-lg italic text-gold">
            {CONSTITUTION_MOTTO}
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-16 grid gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {[
            { label: "Articles", value: stats.articlesReviewed },
            { label: "Verified", value: stats.verified },
            { label: "Review", value: stats.review },
            { label: "Cross-Linked", value: stats.crossLinkedArticles },
            { label: "Index Terms", value: stats.indexTerms },
            { label: "Definitions", value: stats.definitions },
            { label: "Diagrams", value: stats.diagrams },
            { label: "Learning", value: stats.learningModules },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-3 text-center"
            >
              <p className="font-serif text-xl text-gold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Ten Phases</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {CONVENTION_PHASES.map((phase) => (
              <article
                key={phase.id}
                id={phase.id}
                className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-mono text-xs text-gold">Phase {phase.phase}</p>
                  <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                    {phase.status}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-lg text-cream">{phase.title}</h3>
                <p className="text-sm text-cream-muted">{phase.objective}</p>
                {phase.href && (
                  <Link href={phase.href} className="mt-3 inline-block text-xs text-gold hover:text-gold-light">
                    Open →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="audit" className="mb-16 scroll-mt-28">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Phase 1 — Constitutional Audit
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            {stats.passes} checks passed · {stats.warnings} warnings · Not to rewrite. To verify.
          </p>
          <div className="space-y-4">
            {CONSTITUTIONAL_AUDITS.map((audit) => (
              <details
                key={audit.articleId}
                className="rounded-lg border border-gold-subtle bg-ink-muted"
              >
                <summary className="cursor-pointer px-5 py-4">
                  <span className="font-mono text-sm text-gold">{audit.article}</span>
                  <span className="ml-3 font-serif text-cream">{audit.title}</span>
                  <span
                    className={`ml-3 text-xs uppercase ${STATUS_COLORS[audit.overallStatus]}`}
                  >
                    {audit.overallStatus}
                  </span>
                </summary>
                <div className="space-y-3 border-t border-gold-subtle px-5 py-4">
                  {audit.checks.map((check) => (
                    <div key={check.id} className="text-sm">
                      <p className="text-cream">
                        <span className={`mr-2 uppercase text-xs ${STATUS_COLORS[check.status]}`}>
                          {check.status}
                        </span>
                        {check.question}
                      </p>
                      <p className="mt-1 text-cream-muted">{check.finding}</p>
                    </div>
                  ))}
                  <Link
                    href={`/library/constitution/${audit.articleId}`}
                    className="inline-block text-xs text-gold hover:text-gold-light"
                  >
                    Read {audit.article} →
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="cross-linking" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 2 — Cross Linking
          </h2>
          <p className="mb-4 text-sm text-cream-muted">
            Every Article page now displays Related Canons, Articles, Schedules, frameworks,
            companies, and knowledge objects. {stats.crossLinkedArticles} Articles registered.
          </p>
          <Link href="/library/constitution/article-ix" className="text-sm text-gold hover:text-gold-light">
            Example — Article IX with ecosystem links →
          </Link>
        </section>

        <section id="commentary" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 3 — Constitutional Commentary
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Separate interpretive volume — Constitution stays clean. Commentary expands per Article.
          </p>
          <div className="space-y-6">
            {ARTICLE_COMMENTARY.filter((c) => c.examples.length > 0 || c.articleId === "article-xii").map(
              (c) => (
                <article
                  key={c.articleId}
                  id={`commentary-${c.articleId}`}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
                >
                  <h3 className="mb-2 font-serif text-lg text-cream">{c.articleId}</h3>
                  <p className="mb-4 text-sm text-cream-muted">
                    <span className="text-gold">Why: </span>
                    {c.whyItExists}
                  </p>
                  <p className="mb-4 text-sm text-cream-muted">
                    <span className="text-gold">History: </span>
                    {c.historicalBackground}
                  </p>
                  {c.engineeringImplications.length > 0 && (
                    <ul className="mb-4 list-inside list-disc text-sm text-cream-muted">
                      {c.engineeringImplications.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/library/constitution/${c.articleId}`}
                    className="text-xs text-gold hover:text-gold-light"
                  >
                    Article text →
                  </Link>
                </article>
              ),
            )}
          </div>
        </section>

        <section id="diagrams" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 4 — Constitutional Diagrams
          </h2>
          <div className="space-y-8">
            {CONSTITUTIONAL_DIAGRAMS.map((d) => (
              <article key={d.articleId} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-4 font-serif text-lg text-cream">
                  {d.title}{" "}
                  <Link href={`/library/constitution/${d.articleId}`} className="text-sm text-gold">
                    ({d.articleId})
                  </Link>
                </h3>
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-cream-muted">
                  {d.ascii}
                </pre>
              </article>
            ))}
          </div>
        </section>

        <section id="index" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 5 — Constitutional Index
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONSTITUTIONAL_INDEX.map((term) => (
              <div key={term.slug} className="rounded border border-gold-subtle bg-ink-muted p-4">
                {term.href ? (
                  <Link href={term.href} className="font-serif text-gold hover:text-gold-light">
                    {term.term}
                  </Link>
                ) : (
                  <p className="font-serif text-gold">{term.term}</p>
                )}
                <p className="mt-1 text-xs text-cream-muted">{term.definition}</p>
                <p className="mt-2 text-[10px] text-cream-muted/70">
                  {term.articleIds.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="definitions" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 6 — Constitutional Definitions (Schedule E Expansion)
          </h2>
          <dl className="space-y-4">
            {CONSTITUTIONAL_DEFINITIONS_EXTENDED.map((d) => (
              <div key={d.term} className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <dt className="font-serif text-lg text-cream">{d.term}</dt>
                <dd className="mt-2 text-sm text-cream-muted">{d.definition}</dd>
                <dd className="mt-2 text-xs text-gold">
                  {d.articleRefs.join(" · ")}
                  {d.scheduleRef && ` · ${d.scheduleRef}`}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="search" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 8 — Constitutional Search
          </h2>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="How does the Constitution treat AI? Which Articles reference Trust?"
            className="mb-4 w-full rounded-lg border border-gold-subtle bg-ink px-4 py-3 text-cream placeholder:text-cream-muted/50"
          />
          {searchResults.length > 0 && (
            <ul className="space-y-2">
              {searchResults.map((r) => (
                <li key={`${r.kind}-${r.id}`}>
                  <Link
                    href={r.href}
                    className="block rounded border border-gold-subtle bg-ink-muted p-4 hover:border-gold/40"
                  >
                    <span className="text-xs uppercase text-gold">{r.kind}</span>
                    <p className="font-serif text-cream">{r.label}</p>
                    <p className="text-sm text-cream-muted">{r.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="learning" className="mb-16 scroll-mt-28">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Phase 9 — Constitutional Learning
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Lessons and scenarios feeding The Custodian Programme.
          </p>
          <div className="space-y-6">
            {CONSTITUTIONAL_LEARNING.map((m) => (
              <article key={m.articleId} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-4 font-serif text-lg text-cream">{m.articleId}</h3>
                <p className="mb-2 text-xs text-gold">Custodian Scenario</p>
                <p className="mb-4 text-sm text-cream-muted">{m.custodianScenario}</p>
                <p className="mb-2 text-xs text-gold">Board Scenario</p>
                <p className="text-sm text-cream-muted">{m.boardScenario}</p>
                <Link
                  href="/library/custodian-programme"
                  className="mt-4 inline-block text-xs text-gold hover:text-gold-light"
                >
                  Custodian Programme →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="hardcover" className="mb-16 scroll-mt-28">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Phase 10 — Hardcover Edition
          </h2>
          <p className="text-sm leading-relaxed text-cream-muted">
            Institution publishing — not a code deliverable. Volume 0 and Volume I in leather, gold
            foil, numbered editions. Archive, digital authenticated, fireproof, off-site, Family
            Trust, law firm, bank vault, and Institute Library copies. This is how institutions
            preserve foundational documents for centuries.
          </p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Volume I — Frozen for Convention Review
          </h2>
          <p className="text-sm text-cream">
            Version {VOLUME_I_STATUS.version} · Frozen {VOLUME_I_STATUS.frozenAt} ·{" "}
            {VOLUME_I_STATUS.articlesComplete} Articles · Schedules A–H operational
          </p>
          <p className="mt-2 text-sm text-cream-muted">
            Text locked. Presentation, indexing, and cross-linking may strengthen.{" "}
            {VOLUME_I_STATUS.nextMilestone}
          </p>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution" className="text-gold hover:text-gold-light">
            Constitution Portal →
          </Link>
          <Link href="/library/constitution/founders-charge" className="text-gold hover:text-gold-light">
            Founder&apos;s Charge →
          </Link>
          <Link href="/library/stankings-library" className="text-gold hover:text-gold-light">
            Stankings Library →
          </Link>
          <Link href="/library/custodian-programme" className="text-gold hover:text-gold-light">
            Custodian Programme →
          </Link>
          <Link href="/library/first-principles" className="text-gold hover:text-gold-light">
            Volume 0 — Canons →
          </Link>
        </div>
      </div>
    </>
  );
}
