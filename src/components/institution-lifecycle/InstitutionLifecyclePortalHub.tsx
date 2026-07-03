"use client";

import Link from "next/link";
import {
  INSTITUTIONAL_DEVELOPMENT_PATHWAY,
  INSTITUTIONAL_INNOVATION_SOURCES,
  PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA,
} from "@/lib/constitution/articles/article-x";
import { ARTICLE_X } from "@/lib/constitution/articles/article-x";
import {
  ILR_FRAMEWORK,
  ILR_PURPOSE,
  LIFECYCLE_RECORD_FIELDS,
} from "@/lib/frameworks/institution-lifecycle-registry";
import {
  getLifecycleRegisterStats,
  INSTITUTION_LIFECYCLE_RECORDS,
  STAGE_LABELS,
} from "@/lib/institution-lifecycle";
import { EXECUTIVE_DECISION_38 } from "@/lib/iki";
import type { LifecycleStage } from "@/lib/institution-lifecycle/types";

function stageColor(stage: LifecycleStage): string {
  if (stage === "responsible_conclusion") return "border-burgundy/40 text-burgundy";
  if (["growth", "maturity", "launch"].includes(stage)) return "border-forest/40 text-forest";
  if (["formation", "constitutional_review", "prototype_pilot"].includes(stage))
    return "border-gold/40 text-gold";
  return "border-gold-subtle text-cream-muted";
}

export function InstitutionLifecyclePortalHub() {
  const stats = getLifecycleRegisterStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_X.article} · {ILR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Institution Lifecycle
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{ILR_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Birth, purpose, governance, maturity — and if necessary, honourable retirement.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_38}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-5">
          {[
            { label: "Total Records", value: stats.total },
            { label: "Active", value: stats.active },
            { label: "Live", value: stats.live },
            { label: "Forming", value: stats.forming },
            { label: "Concluded", value: stats.concluded },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-3xl text-gold">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Development Pathway
          </h2>
          <ol className="flex flex-wrap gap-2">
            {INSTITUTIONAL_DEVELOPMENT_PATHWAY.map((step, i) => (
              <li key={step} className="flex items-center gap-2 text-xs text-cream-muted">
                {i > 0 && <span className="text-gold/40">→</span>}
                <span className="rounded-full border border-gold-subtle px-2 py-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-cream">
              Register of Constitutional Institutions
            </h2>
            <Link href="/library/innovation-portal" className="text-sm text-gold hover:text-gold-light">
              Innovation Portal →
            </Link>
          </div>
          <div className="space-y-4">
            {INSTITUTION_LIFECYCLE_RECORDS.map((record) => (
              <Link
                key={record.institutionId}
                href={`/library/institution-lifecycle/${record.slug}`}
                className="group flex flex-wrap items-center gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
              >
                <span className="text-2xl" style={{ color: record.color }} aria-hidden>
                  {record.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] text-cream-muted/70">{record.institutionId}</p>
                  <p className="text-xs uppercase tracking-wider text-gold">{record.excellence}</p>
                  <h3 className="font-serif text-lg text-cream group-hover:text-gold-light">
                    {record.name}
                  </h3>
                  <p className="line-clamp-1 text-sm text-cream-muted">
                    {record.constitutionalPurpose}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider ${stageColor(record.currentStage)}`}
                >
                  {STAGE_LABELS[record.currentStage]}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Lifecycle Record Fields
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {LIFECYCLE_RECORD_FIELDS.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-gold/60">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Innovation Sources (§ 10.02)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {INSTITUTIONAL_INNOVATION_SOURCES.slice(0, 6).map((s) => (
                <li key={s}>{s}</li>
              ))}
              <li className="text-cream-muted/60">…and other approved contributors</li>
            </ul>
            <h3 className="mb-3 mt-6 font-mono text-xs uppercase tracking-wider text-gold">
              Periodic Review (§ 10.07)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-x" className="text-gold hover:text-gold-light">
            Article X →
          </Link>
          <Link
            href="/library/frameworks/institution-lifecycle-registry"
            className="text-gold hover:text-gold-light"
          >
            {ILR_FRAMEWORK.identifier} →
          </Link>
          <Link href="/library/ecosystem-architecture" className="text-gold hover:text-gold-light">
            Ecosystem Architecture →
          </Link>
          <Link href="/library/constitution/schedules" className="text-gold hover:text-gold-light">
            Constitutional Schedules →
          </Link>
        </div>
      </div>
    </>
  );
}
