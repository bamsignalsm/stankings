"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_025_CIVILIZATION_STEWARDSHIP,
  CANON_025_ENDURANCE_MOTTO,
  CANON_025_INSTITUTIONAL_QUESTION,
  CANON_025_STEWARDSHIP_ANSWER,
  LETTER_TO_FUTURE_CUSTODIAN,
  VOLUME_0_NARRATIVE_ARC,
} from "@/lib/canon/canon-025";
import {
  getVolume0LexiconCount,
  getVolume0MaturityMetrics,
  searchCanonMaturity,
} from "@/lib/canon-maturity/registry";
import {
  ENDURANCE_TEST,
  VOLUME_0_REQUIRED_READING_ROLES,
  type CanonMaturityRecord,
} from "@/lib/frameworks/canon-maturity-dashboard";
import { EXECUTIVE_DECISION_27 } from "@/lib/iki";

function MaturityCard({ record }: { record: CanonMaturityRecord }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{record.canonId}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            <Link href={record.href} className="hover:text-gold-light">
              {record.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-cream-muted">
            {record.category} · v{record.version} · Approved {record.approvalDate}
          </p>
        </div>
        <span className="rounded border border-forest/30 bg-forest/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-forest">
          {record.reviewStatus.replace(/_/g, " ")}
        </span>
      </div>

      <dl className="mb-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-gold">Last review</dt>
          <dd className="text-cream-muted">{record.lastReviewDate}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-gold">Next review</dt>
          <dd className="text-cream-muted">{record.nextReviewDate}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-gold">Implementation</dt>
          <dd className="capitalize text-cream-muted">{record.implementationStatus.replace("_", " ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-gold">Print</dt>
          <dd className="capitalize text-cream-muted">{record.printStatus}</dd>
        </div>
      </dl>

      {record.relatedFrameworks.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-xs uppercase tracking-widest text-gold">Frameworks</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {record.relatedFrameworks.map((f) => (
              <Link key={f.identifier} href={f.href} className="text-gold hover:text-gold-light">
                {f.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {record.platformHref && (
        <p className="mb-3 text-sm text-cream-muted">
          <span className="text-gold">Platform: </span>
          <Link href={record.platformHref} className="hover:text-gold">
            {record.platformFeature}
          </Link>
        </p>
      )}

      <div className="flex flex-wrap gap-2 text-xs text-cream-muted">
        {record.relatedKnowledgeObjects.map((ko) => (
          <span key={ko} className="rounded border border-gold-subtle px-2 py-0.5">
            {ko}
          </span>
        ))}
      </div>
    </article>
  );
}

export function CanonMaturityHub() {
  const [query, setQuery] = useState("");
  const metrics = getVolume0MaturityMetrics();
  const lexiconCount = getVolume0LexiconCount();
  const records = useMemo(() => searchCanonMaturity(query), [query]);

  const volumeMetrics = [
    { label: "Total Canons", value: metrics.totalCanons },
    { label: "Supporting Frameworks", value: metrics.supportingFrameworks },
    { label: "Governance Objects", value: metrics.governanceObjects },
    { label: "Knowledge Objects", value: metrics.knowledgeObjects },
    { label: "Cross References", value: metrics.crossReferences },
    { label: "Lexicon Terms", value: lexiconCount },
    { label: "Active Implementations", value: metrics.activeImplementations },
    { label: "Training Modules", value: metrics.trainingModulesCreated },
  ];

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-025 · Volume 0 Complete
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Canon Maturity Dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Volume 0 as a living operating system — every Canon, its maturity, and the
            philosophy that ties them together.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-10 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">
            {CANON_025_INSTITUTIONAL_QUESTION}
          </p>
          <p className="font-serif text-xl italic text-cream">
            {CANON_025_STEWARDSHIP_ANSWER}
          </p>
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Volume 0 narrative arc
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VOLUME_0_NARRATIVE_ARC.map((item) => (
              <li
                key={item.step}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="mb-1 font-mono text-xs text-gold">
                  {item.step}. {item.anchor}
                </p>
                <p className="text-sm text-cream">{item.theme}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-12 grid gap-4 sm:grid-cols-4">
          {volumeMetrics.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-gold">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
            <p className="mb-1 text-xs uppercase tracking-widest text-gold">Review status</p>
            <p className="text-sm text-cream-muted">{metrics.volumeReviewStatus}</p>
          </div>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
            <p className="mb-1 text-xs uppercase tracking-widest text-gold">Print status</p>
            <p className="text-sm text-cream-muted">{metrics.printStatus}</p>
          </div>
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Endurance Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{ENDURANCE_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_025_ENDURANCE_MOTTO}
          </p>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_27}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Required reading</h2>
          <ul className="flex flex-wrap gap-2">
            {VOLUME_0_REQUIRED_READING_ROLES.map((role) => (
              <li
                key={role}
                className="rounded border border-gold-subtle px-3 py-1 text-xs text-cream-muted"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-cream-muted">
            Objective: shared institutional way of thinking — not memorization.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Stewardship of civilization
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CANON_025_CIVILIZATION_STEWARDSHIP.map((item) => (
              <li
                key={item.institution}
                className="rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-sm"
              >
                <span className="text-cream">{item.institution}</span>
                <span className="text-cream-muted"> — preserves {item.preserves}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Canon maturity records
          </h2>
          <input
            type="search"
            placeholder="Search canons, frameworks, categories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-8 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          <div className="grid gap-6">
            {records.map((r) => (
              <MaturityCard key={r.canonId} record={r} />
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-lg border border-gold/40 bg-ink-muted p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            A Letter to the Future Custodian
          </p>
          <div className="space-y-4 font-serif text-sm leading-relaxed text-cream-muted">
            {LETTER_TO_FUTURE_CUSTODIAN.split("\n\n").map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Volume 0 complete · Volume I begun</p>
          <p className="text-sm italic text-cream-muted">
            The Constitution Preamble is adopted at Version 1.0. Article I — The Identity of the
            Institution — translates these Canons into enforceable constitutional law.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/library/constitution" className="text-gold hover:text-gold-light">
              Constitution Portal →
            </Link>
            <Link href="/library/constitutional-health" className="text-gold hover:text-gold-light">
              Constitutional Health Dashboard →
            </Link>
            <Link href="/library/constitution/article-xiv" className="text-cream-muted hover:text-gold">
              Article XIV →
            </Link>
            <Link href="/library/canon/CANON-025" className="text-cream-muted hover:text-gold">
              CANON-025 →
            </Link>
            <Link href="/library/canon-dashboard" className="text-cream-muted hover:text-gold">
              Implementation Dashboard →
            </Link>
            <Link href="/library/first-principles" className="text-cream-muted hover:text-gold">
              Volume 0 →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
