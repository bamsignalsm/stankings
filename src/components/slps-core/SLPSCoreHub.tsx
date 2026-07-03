"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SLPS_CORE_ARCHITECTURE,
  SLPS_CORE_IMPLEMENTATION_RULES,
  SLPS_CORE_MODULES,
  SLPS_CORE_PURPOSE,
  INSTITUTIONAL_AI_EXAMPLE_QUERIES,
  INSTITUTIONAL_AI_INTEGRATION_POINTS,
  PUBLISHING_OUTPUTS,
  SLPS_PUBLICATION_STATUSES,
  getReviewTransitions,
  resolveCrossReferencesInText,
  searchInstitutionalLibrary,
} from "@/lib/slps-core";
import { EDITOR_DECISION_51 } from "@/lib/editorial/decisions";
import { SLPS_CORE_FRAMEWORK } from "@/lib/frameworks/slps-core";

const STATUS_LABELS: Record<string, string> = {
  implemented: "Implemented",
  approved: "Approved",
  planned: "Planned",
  future_ready: "Future Ready",
};

function ModuleCard({
  number,
  title,
  description,
  status,
  route,
  enforces,
}: {
  number: number;
  title: string;
  description: string;
  status: string;
  route?: string;
  enforces: string;
}) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs text-gold">Module {number}</p>
        <span className="text-[10px] uppercase tracking-wider text-cream-muted">
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>
      <h3 className="mb-2 font-serif text-lg text-cream">{title}</h3>
      <p className="mb-3 text-sm text-cream-muted">{description}</p>
      <p className="mb-4 text-xs text-cream-muted">Enforces: {enforces}</p>
      {route && (
        <Link href={route} className="text-sm text-gold hover:text-gold-light">
          Open module →
        </Link>
      )}
    </article>
  );
}

export function SLPSCoreHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [crossRefText, setCrossRefText] = useState(
    "Article IV references CANON-002 and FRAMEWORK-SLPS-001. Session LIB-2026-06-27-008 records the decision.",
  );

  const searchResults = searchQuery.trim()
    ? searchInstitutionalLibrary(searchQuery)
    : null;
  const crossRefs = resolveCrossReferencesInText(crossRefText);
  const transitions = getReviewTransitions();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Editorial Standards · {SLPS_CORE_FRAMEWORK.shortId} · {SLPS_CORE_FRAMEWORK.identifier} ·
            v{SLPS_CORE_FRAMEWORK.version}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Stankings Library Publishing System
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{SLPS_CORE_PURPOSE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EDITOR_DECISION_51}
        </blockquote>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Architecture</h2>
          <ol className="space-y-2">
            {SLPS_CORE_ARCHITECTURE.map((line, i) => (
              <li key={line} className="flex items-center gap-3 text-sm text-cream-muted">
                <span className="font-mono text-gold">{i + 1}</span>
                {line}
                {i < SLPS_CORE_ARCHITECTURE.length - 1 && (
                  <span className="text-gold">↓</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl text-cream">Seven Modules</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {SLPS_CORE_MODULES.map((m) => (
              <ModuleCard key={m.id} {...m} />
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Review Engine — Lifecycle</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {SLPS_PUBLICATION_STATUSES.map((status, i) => (
              <span key={status} className="flex items-center gap-2">
                <span className="rounded border border-gold-subtle px-2 py-1 text-cream-muted">
                  {status}
                </span>
                {i < SLPS_PUBLICATION_STATUSES.length - 1 && (
                  <span className="text-gold">→</span>
                )}
              </span>
            ))}
          </div>
          <ul className="mt-4 space-y-1 text-xs text-cream-muted">
            {transitions.slice(0, 4).map((t) => (
              <li key={`${t.from}-${t.to}`}>
                {t.from} → {t.to}: {t.gate} ({t.requiredApprover})
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Cross-Reference Engine</h2>
          <textarea
            value={crossRefText}
            onChange={(e) => setCrossRefText(e.target.value)}
            rows={3}
            className="mb-4 w-full rounded border border-gold-subtle bg-ink px-3 py-2 text-sm text-cream"
          />
          <ul className="space-y-2">
            {crossRefs.map((ref) => (
              <li key={ref.identifier} className="text-sm">
                <Link href={ref.href} className="text-gold hover:text-gold-light">
                  {ref.label}
                </Link>
                <span className="ml-2 text-xs text-cream-muted">
                  {ref.kind} · {ref.identifier}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Institutional Search</h2>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the entire Library…"
            className="mb-4 w-full rounded border border-gold-subtle bg-ink px-3 py-2 text-sm text-cream"
          />
          {searchResults && (
            <div>
              <p className="mb-3 text-xs text-cream-muted">
                {searchResults.total} results · sources: {searchResults.sources.join(", ")}
              </p>
              <ul className="max-h-64 space-y-2 overflow-y-auto">
                {searchResults.results.map((r) => (
                  <li key={`${r.kind}-${r.id}`} className="text-sm">
                    <Link href={r.href} className="text-gold hover:text-gold-light">
                      {r.label}
                    </Link>
                    <span className="ml-2 text-xs text-cream-muted">{r.kind}</span>
                    {r.excerpt && (
                      <p className="text-xs text-cream-muted">{r.excerpt.slice(0, 120)}…</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Publishing Engine — Outputs</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {PUBLISHING_OUTPUTS.map((o) => (
              <div key={o.format} className="rounded border border-gold-subtle p-3">
                <p className="font-medium text-cream">{o.label}</p>
                <p className="text-xs text-cream-muted">{o.description}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-gold">{o.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Institutional AI — Future Ready</h2>
          <ul className="mb-4 space-y-2 text-sm text-cream-muted">
            {INSTITUTIONAL_AI_INTEGRATION_POINTS.map((p) => (
              <li key={p.id}>
                <span className="text-cream">{p.id}</span> — {p.description}
              </li>
            ))}
          </ul>
          <p className="mb-2 text-xs uppercase tracking-wider text-gold">Example queries</p>
          <ul className="space-y-1 text-sm italic text-cream-muted">
            {INSTITUTIONAL_AI_EXAMPLE_QUERIES.map((q) => (
              <li key={q}>&ldquo;{q}&rdquo;</li>
            ))}
          </ul>
        </section>

        <section className="mb-12 rounded-lg border border-gold-subtle bg-ink p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Implementation Rules</h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {SLPS_CORE_IMPLEMENTATION_RULES.map((rule) => (
              <li key={rule}>• {rule}</li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link
            href="/library/editorial-standards/publishing-standard"
            className="text-gold hover:text-gold-light"
          >
            ← SLPS-001
          </Link>
          <Link
            href="/library/editorial-standards/publishing-standard/generator"
            className="text-gold hover:text-gold-light"
          >
            Publication Generator →
          </Link>
          <Link href="/library/editorial-standards" className="text-gold hover:text-gold-light">
            Editorial Standards
          </Link>
        </div>
      </div>
    </>
  );
}
