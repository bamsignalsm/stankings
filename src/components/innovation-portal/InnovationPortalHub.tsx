"use client";

import Link from "next/link";
import { ARTICLE_X } from "@/lib/constitution/articles/article-x";
import {
  INP_FRAMEWORK,
  INP_PURPOSE,
  INNOVATION_PASSPORT_FIELDS,
  VENTURE_STUDIO_MISSION,
} from "@/lib/frameworks/innovation-portal";
import {
  getInnovationPortalStats,
  INNOVATION_PASSPORTS,
  INNOVATION_PIPELINE_STAGES,
  INNOVATION_TRACKS,
} from "@/lib/innovation-portal";

export function InnovationPortalHub() {
  const stats = getInnovationPortalStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Schedule H · {INP_FRAMEWORK.identifier} · The Stankings Venture Studio
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Innovation Portal
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{INP_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Fair consideration — not entitlement. Great ideas earn their place.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-wider text-gold">Venture Studio Mission</p>
          <p className="font-serif text-lg text-cream">{VENTURE_STUDIO_MISSION}</p>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Proposals", value: stats.total },
            { label: "Active", value: stats.active },
            { label: "Approved", value: stats.approved },
            { label: "Archived", value: stats.archived },
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
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Innovation Pipeline</h2>
          <div className="overflow-x-auto">
            <div className="flex min-w-max items-center gap-2 py-4">
              {INNOVATION_PIPELINE_STAGES.map((stage, i) => (
                <div key={stage.id} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gold/40">↓</span>}
                  <div className="rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-center">
                    <p className="text-xs font-medium text-cream">{stage.label}</p>
                    <p className="mt-1 max-w-[140px] text-[10px] text-cream-muted">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Innovation Tracks</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {INNOVATION_TRACKS.map((track) => (
              <div
                key={track.id}
                className={`rounded-lg border p-5 ${
                  track.id === "public"
                    ? "border-gold-subtle/50 bg-ink-muted/50 opacity-75"
                    : "border-gold-subtle bg-ink-muted"
                }`}
              >
                <p className="mb-2 text-xs uppercase tracking-wider text-gold">{track.label}</p>
                <p className="text-sm text-cream-muted">{track.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Innovation Passports</h2>
          <div className="space-y-4">
            {INNOVATION_PASSPORTS.map((passport) => (
              <Link
                key={passport.ideaId}
                href={`/library/innovation-portal/${passport.ideaId.toLowerCase()}`}
                className="group block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-gold">{passport.ideaId}</p>
                    <h3 className="font-serif text-lg text-cream group-hover:text-gold-light">
                      {passport.title}
                    </h3>
                    <p className="text-sm text-cream-muted">{passport.problemAddressed}</p>
                  </div>
                  <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                    {passport.stageLabel}
                  </span>
                </div>
                <p className="mt-2 text-xs text-cream-muted">
                  {passport.originLabel} · {passport.track} track
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
            Innovation Passport Fields
          </h3>
          <ul className="grid gap-1 sm:grid-cols-2 text-sm text-cream-muted">
            {INNOVATION_PASSPORT_FIELDS.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-x" className="text-gold hover:text-gold-light">
            {ARTICLE_X.article} →
          </Link>
          <Link href="/library/institution-lifecycle" className="text-gold hover:text-gold-light">
            Lifecycle Registry →
          </Link>
          <Link href="/library/constitution/schedules#schedule-h" className="text-gold hover:text-gold-light">
            Schedule H →
          </Link>
          <Link
            href="/library/frameworks/innovation-portal"
            className="text-gold hover:text-gold-light"
          >
            {INP_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
