"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_022_LEGACY_BY_INSTITUTION,
  CANON_022_LEGACY_MOTTO,
  CANON_022_NATION_BUILDING_AMBITION,
} from "@/lib/canon/canon-022";
import {
  INSTITUTIONAL_PERFORMANCE_METRICS,
  LEGACY_TEST,
  SOCIETAL_CONTRIBUTION_METRICS,
  type AnnualStewardshipReport,
} from "@/lib/frameworks/legacy-dashboard";
import {
  getLegacyDashboardStats,
  searchStewardshipReports,
  STEWARDSHIP_REPORT_REGISTRY,
} from "@/lib/legacy/registry";
import { EXECUTIVE_DECISION_24 } from "@/lib/iki";

function trendSymbol(trend?: "up" | "stable" | "down") {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
}

function ReportCard({ report }: { report: AnnualStewardshipReport }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{report.id}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            <Link
              href={`/library/ecosystem/${report.institutionSlug}`}
              className="hover:text-gold-light"
            >
              {report.institution}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-cream-muted">
            Annual Stewardship Report · {report.reportingYear}
            {report.publishedAt && ` · Published ${report.publishedAt}`}
          </p>
        </div>
        <span className="rounded border border-gold/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gold capitalize">
          {report.status.replace("_", " ")}
        </span>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-gold">Institutional performance</p>
          <dl className="space-y-2 text-sm">
            {report.institutionalPerformance.map((m) => (
              <div key={m.metricId} className="flex justify-between gap-4 border-b border-gold-subtle/50 pb-2">
                <dt className="text-cream-muted">{m.label}</dt>
                <dd className="text-right text-cream">
                  {trendSymbol(m.trend)} {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-gold">Societal contribution</p>
          <dl className="space-y-2 text-sm">
            {report.societalContribution.map((m) => (
              <div key={m.metricId} className="flex justify-between gap-4 border-b border-gold-subtle/50 pb-2">
                <dt className="text-cream-muted">{m.label}</dt>
                <dd className="text-right text-cream">
                  {trendSymbol(m.trend)} {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {report.legacyHighlights.length > 0 && (
        <ul className="mb-4 space-y-1 text-sm text-cream-muted">
          {report.legacyHighlights.map((h) => (
            <li key={h}>· {h}</li>
          ))}
        </ul>
      )}

      <p className="text-sm italic text-cream-muted">{report.stewardshipReflection}</p>
    </article>
  );
}

export function LegacyDashboardHub() {
  const [query, setQuery] = useState("");
  const stats = getLegacyDashboardStats();
  const reports = useMemo(() => searchStewardshipReports(query), [query]);

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-022 · Civilization Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Legacy Dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Institutional performance and societal contribution — measuring whether we leave
            society stronger than we found it.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Stewardship reports", value: stats.reports },
            { label: "Published", value: stats.published },
            { label: "Institutions reporting", value: stats.institutions },
            { label: "Societal metrics", value: stats.societalMetricsReported },
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

        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-center font-serif italic text-cream">
          &ldquo;{CANON_022_NATION_BUILDING_AMBITION}&rdquo;
        </blockquote>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Legacy Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{LEGACY_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_022_LEGACY_MOTTO}
          </p>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_24}
        </blockquote>

        <section className="mb-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
              Institutional performance
            </h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {INSTITUTIONAL_PERFORMANCE_METRICS.map((m) => (
                <li key={m.id}>
                  <span className="text-cream">{m.label}</span> — {m.description}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
              Societal contribution
            </h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {SOCIETAL_CONTRIBUTION_METRICS.map((m) => (
                <li key={m.id}>
                  <span className="text-cream">{m.label}</span> — {m.description}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Legacy beyond the balance sheet
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CANON_022_LEGACY_BY_INSTITUTION.map((inst) => (
              <li
                key={inst.slug}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <Link
                  href={`/library/ecosystem/${inst.slug}`}
                  className="mb-2 block font-serif text-lg font-semibold text-cream hover:text-gold"
                >
                  {inst.institution}
                </Link>
                <p className="text-sm text-cream-muted">{inst.beyondBalanceSheet}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Annual Stewardship Reports
          </h2>
          <input
            type="search"
            placeholder="Search reports, institutions, contributions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-8 w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
          <div className="grid gap-8">
            {reports.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
          {reports.length === 0 && (
            <p className="py-8 text-center text-cream-muted">No reports match your search.</p>
          )}
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Not marketing — stewardship</p>
          <p className="text-sm italic text-cream-muted">
            Future custodians measure whether the institution left society stronger. Someone who
            never knew your name can still benefit from systems, opportunities, and knowledge that
            exist because Stankings Group chose to build well.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/library/canon/CANON-022" className="text-gold hover:text-gold-light">
              CANON-022 →
            </Link>
            <Link
              href="/library/frameworks/annual-stewardship-review"
              className="text-cream-muted hover:text-gold"
            >
              Department ASR (CANON-019) →
            </Link>
            <Link href="/library/ecosystem" className="text-cream-muted hover:text-gold">
              Ecosystem →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
