"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CANON_019_IMPROVEMENT_BY_ROLE,
  CANON_019_STEWARDSHIP_MOTTO,
} from "@/lib/canon/canon-019";
import {
  IIR_CATEGORY_LABELS,
  IIR_IMPROVEMENT_TEST,
} from "@/lib/frameworks/institutional-improvement";
import {
  getImprovementDashboardStats,
  IMPROVEMENT_REGISTRY,
  searchImprovements,
  type InstitutionalImprovement,
} from "@/lib/improvements/registry";

function categoryStyle(category: InstitutionalImprovement["category"]) {
  const map: Record<InstitutionalImprovement["category"], string> = {
    customer: "text-gold border-gold/30 bg-gold/10",
    engineering: "text-cream border-gold-subtle bg-ink",
    governance: "text-forest border-forest/30 bg-forest/10",
    community: "text-cream-muted border-gold-subtle bg-ink-muted",
    learning: "text-gold/90 border-gold/20 bg-gold/5",
    operations: "text-cream-muted border-gold-subtle bg-ink",
  };
  return map[category];
}

function ImprovementCard({ record }: { record: InstitutionalImprovement }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{record.id}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">{record.areaImproved}</h3>
          <p className="mt-1 text-xs text-cream-muted">
            {record.institution} · {new Date(record.dateImplemented).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${categoryStyle(record.category)}`}
        >
          {IIR_CATEGORY_LABELS[record.category]}
        </span>
      </div>

      <div className="mb-4 rounded-lg border border-gold/20 bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Problem identified</p>
        <p className="text-sm text-cream-muted">{record.problemIdentified}</p>
      </div>

      <p className="mb-2 text-sm text-cream-muted">
        <span className="text-gold">Improvement: </span>
        {record.improvementMade}
      </p>
      <p className="mb-4 text-sm text-cream-muted">
        <span className="text-gold">Measured outcome: </span>
        {record.measuredOutcome}
      </p>

      {record.knowledgeObjectsUpdated.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-3 text-sm">
          {record.knowledgeObjectsUpdated.map((ko) => (
            <Link key={ko.identifier} href={ko.href} className="text-gold hover:text-gold-light">
              {ko.identifier}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-sm">
        {record.relatedCanons.map((ref) => (
          <Link key={ref} href={`/library/canon/${ref}`} className="text-cream-muted hover:text-gold">
            {ref}
          </Link>
        ))}
      </div>
    </article>
  );
}

export function ImprovementsRegistryHub() {
  const [query, setQuery] = useState("");
  const stats = getImprovementDashboardStats();
  const improvements = useMemo(() => searchImprovements(query), [query]);

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-019 · Legacy Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Institutional Improvement Register
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            A living history of how the institution matures — every improvement recorded,
            every generation starting ahead of the last.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "This quarter", value: stats.thisQuarter },
            { label: "This year", value: stats.thisYear },
            { label: "Customer-driven", value: stats.customer },
            { label: "Engineering", value: stats.engineering },
            { label: "Governance", value: stats.governance },
            { label: "Learning", value: stats.learning },
            { label: "Community", value: stats.community },
            { label: "Total recorded", value: stats.total },
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

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <input
            type="search"
            placeholder="Search improvements, institutions, outcomes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
          />
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Improvement Test</p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;{IIR_IMPROVEMENT_TEST}&rdquo;
          </blockquote>
          <p className="mt-4 text-center font-serif text-sm italic text-gold">
            {CANON_019_STEWARDSHIP_MOTTO}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/library/canon/CANON-019" className="text-gold hover:text-gold-light">
              CANON-019 →
            </Link>
            <Link
              href="/library/frameworks/annual-stewardship-review"
              className="text-gold hover:text-gold-light"
            >
              Annual Stewardship Review →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Improvement by role
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CANON_019_IMPROVEMENT_BY_ROLE.map((item) => (
              <li
                key={item.role}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <h3 className="mb-2 font-serif text-lg font-semibold text-gold">{item.role}</h3>
                <p className="text-sm text-cream-muted">{item.obligation}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 hidden overflow-x-auto rounded-lg border border-gold-subtle lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-muted text-xs uppercase tracking-widest text-cream-muted">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Area</th>
                <th className="px-4 py-3 font-medium">Institution</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Implemented</th>
              </tr>
            </thead>
            <tbody>
              {improvements.map((i) => (
                <tr key={i.id} className="border-b border-gold-subtle/50">
                  <td className="px-4 py-4 font-mono text-xs text-gold">{i.id}</td>
                  <td className="max-w-xs px-4 py-4 text-cream">{i.areaImproved}</td>
                  <td className="px-4 py-4 text-cream-muted">{i.institution}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] uppercase ${categoryStyle(i.category)}`}
                    >
                      {IIR_CATEGORY_LABELS[i.category]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-cream-muted">
                    {new Date(i.dateImplemented).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-6">
          {improvements.map((i) => (
            <ImprovementCard key={i.id} record={i} />
          ))}
        </div>

        {improvements.length === 0 && (
          <p className="py-12 text-center text-cream-muted">No improvements match your search.</p>
        )}

        <section className="mt-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Compounding institution</p>
          <p className="text-sm italic text-cream-muted">
            What will the institution gain because you served it? Each generation starts ahead of the
            previous one.
          </p>
        </section>
      </div>
    </>
  );
}
