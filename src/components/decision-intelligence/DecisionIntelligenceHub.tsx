"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_020_FRAMEWORK_CONVERGENCE,
  CANON_020_JUDGMENT_MOTTO,
} from "@/lib/canon/canon-020";
import {
  IDI_AI_GUIDANCE_PRINCIPLE,
  IDI_JUDGMENT_RECORD_FIELDS,
  IDI_JUDGMENT_TEST,
} from "@/lib/frameworks/institutional-decision-intelligence";
import {
  getDecisionIntelligenceStats,
  JUDGMENT_REGISTRY,
  searchJudgmentRecords,
  type JudgmentRecord,
} from "@/lib/decision-intelligence/registry";
import { EXECUTIVE_DECISION_22 } from "@/lib/iki";

function evidenceStyle(quality: JudgmentRecord["evidenceQuality"]) {
  const map = {
    strong: "text-forest border-forest/30",
    moderate: "text-gold border-gold/30",
    limited: "text-cream-muted border-gold-subtle",
    contested: "text-burgundy border-burgundy/30",
  };
  return map[quality];
}

function JudgmentCard({ record }: { record: JudgmentRecord }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{record.identifier}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">{record.title}</h3>
          <p className="mt-1 text-xs text-cream-muted">
            {record.institution} · {record.category}
          </p>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider capitalize ${evidenceStyle(record.evidenceQuality)}`}
        >
          {record.evidenceQuality} evidence
        </span>
      </div>

      <div className="mb-4 rounded-lg border border-gold/20 bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Decision</p>
        <p className="text-sm text-cream">{record.decision}</p>
      </div>

      <div className="mb-4 rounded-lg border border-gold-subtle bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Judgment notes</p>
        <p className="text-sm text-cream-muted">{record.judgmentNotes}</p>
      </div>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Facts considered</dt>
          <dd className="text-cream-muted">{record.factsAvailable.length} documented</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Stakeholders</dt>
          <dd className="text-cream-muted">{record.stakeholdersConsulted.join(" · ")}</dd>
        </div>
      </dl>

      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        {record.canonReferences.map((ref) => (
          <Link key={ref} href={`/library/canon/${ref}`} className="text-gold hover:text-gold-light">
            {ref}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-cream-muted">
        {record.relatedIdr && (
          <Link href={`/library/decisions/${record.relatedIdr}`} className="hover:text-gold">
            IDR: {record.relatedIdr}
          </Link>
        )}
        {record.relatedPar && (
          <Link href="/library/frameworks/principles-alignment-review" className="hover:text-gold">
            PAR linked
          </Link>
        )}
        <span>Owner: {record.decisionOwner}</span>
        <span>Review: {record.reviewDate}</span>
      </div>
    </article>
  );
}

export function DecisionIntelligenceHub() {
  const [query, setQuery] = useState("");
  const stats = getDecisionIntelligenceStats();
  const records = useMemo(() => searchJudgmentRecords(query), [query]);

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-020 · Legacy Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Institutional Decision Intelligence
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            How the institution reasoned — not only what was decided. Searchable wisdom for
            custodians facing challenges no Constitution could anticipate.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Judgment records", value: stats.total },
            { label: "Approved", value: stats.approved },
            { label: "Strong evidence", value: stats.strongEvidence },
            { label: "Linked to IDR", value: stats.withIdrLink },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-gold">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream-muted">{item.label}</p>
            </div>
          ))}
        </div>

        <input
          type="search"
          placeholder="Search reasoning, decisions, institutions, canons…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-10 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
        />

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Judgment Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{IDI_JUDGMENT_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_020_JUDGMENT_MOTTO}
          </p>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/20 bg-ink-muted p-6 text-sm text-cream-muted">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">AI guidance principle</p>
          &ldquo;{IDI_AI_GUIDANCE_PRINCIPLE}&rdquo;
        </blockquote>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_22}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Frameworks converge on judgment
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Every assessment asks whether the institution becomes better. CANON-020 governs how
            principles are applied when answers require wisdom, not rules alone.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CANON_020_FRAMEWORK_CONVERGENCE.map((item) => (
              <li
                key={item.framework}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm"
              >
                <p className="font-medium text-cream">{item.framework}</p>
                <p className="mt-1 text-cream-muted">{item.question}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Judgment Record fields</h2>
          <ol className="space-y-2">
            {IDI_JUDGMENT_RECORD_FIELDS.map((field, i) => (
              <li
                key={field.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-sm"
              >
                <span className="text-gold">{i + 1}. {field.label}</span>
                <span className="text-cream-muted"> — {field.description}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Judgment records</h2>
          <div className="grid gap-6">
            {records.map((r) => (
              <JudgmentCard key={r.identifier} record={r} />
            ))}
          </div>
          {records.length === 0 && (
            <p className="py-12 text-center text-cream-muted">No records match your search.</p>
          )}
        </section>

        <section className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-020" className="text-gold hover:text-gold-light">
            CANON-020 →
          </Link>
          <Link href="/library/decisions" className="text-cream-muted hover:text-gold">
            Decision Records (IDR) →
          </Link>
          <Link href="/library/frameworks/institutional-decision-record" className="text-cream-muted hover:text-gold">
            IDR Framework →
          </Link>
        </section>
      </div>
    </>
  );
}
