"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  COMMITMENT_CATEGORY_LABELS,
  COMMITMENT_REGISTRY,
  COMMITMENT_STATUS_LABELS,
  type CommitmentStatus,
  searchCommitments,
} from "@/lib/commitments/registry";
import { CANON_014_CREDIBILITY_APPLICATIONS } from "@/lib/canon/canon-014";

function statusStyle(status: CommitmentStatus) {
  const map: Record<CommitmentStatus, string> = {
    delivered: "text-forest border-forest/30 bg-forest/10",
    completed: "text-forest border-forest/30 bg-forest/10",
    in_progress: "text-gold border-gold/30 bg-gold/10",
    on_schedule: "text-forest border-forest/30 bg-forest/10",
    at_risk: "text-burgundy border-burgundy/30 bg-burgundy/10",
    delayed: "text-burgundy border-burgundy/30 bg-burgundy/10",
    withdrawn: "text-cream-muted border-gold-subtle bg-ink",
    under_review: "text-gold border-gold/30 bg-gold/10",
  };
  return map[status];
}

function statusIcon(status: CommitmentStatus) {
  const map: Record<CommitmentStatus, string> = {
    delivered: "✓",
    completed: "✓",
    in_progress: "◐",
    on_schedule: "●",
    at_risk: "!",
    delayed: "✕",
    withdrawn: "—",
    under_review: "?",
  };
  return map[status];
}

function CommitmentCard({
  commitment,
}: {
  commitment: (typeof COMMITMENT_REGISTRY)[number];
}) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs text-gold">{commitment.id}</p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            {commitment.summary}
          </h3>
          <p className="mt-1 text-xs text-cream-muted">
            {commitment.institution} · {COMMITMENT_CATEGORY_LABELS[commitment.category]}
          </p>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(commitment.status)}`}
        >
          {statusIcon(commitment.status)} {COMMITMENT_STATUS_LABELS[commitment.status]}
        </span>
      </div>

      <blockquote className="mb-4 border-l-2 border-gold/30 pl-4 text-sm italic text-cream-muted">
        {commitment.statement}
      </blockquote>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Owner</dt>
          <dd className="text-cream">
            {commitment.ownerSlug ? (
              <Link
                href={`/library/ecosystem/${commitment.ownerSlug}`}
                className="text-gold hover:text-gold-light"
              >
                {commitment.owner}
              </Link>
            ) : (
              commitment.owner
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Date made</dt>
          <dd className="text-cream">{commitment.dateMade}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Expected delivery</dt>
          <dd className="text-cream">{commitment.expectedDelivery}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Public</dt>
          <dd className="text-cream">{commitment.publicFacing ? "Yes" : "Internal"}</dd>
        </div>
      </dl>

      <div className="mb-4 rounded-lg border border-gold/20 bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Evidence of fulfilment</p>
        <p className="text-sm text-cream-muted">{commitment.evidenceOfFulfilment}</p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">Audit history</p>
        <ul className="space-y-2 text-sm text-cream-muted">
          {commitment.auditHistory.map((entry) => (
            <li key={`${entry.date}-${entry.event.slice(0, 24)}`}>
              <span className="font-mono text-xs text-gold/70">{entry.date}</span>
              {" — "}
              {entry.event}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {commitment.canonReferences.map((ref) => (
          <Link
            key={ref}
            href={`/library/canon/${ref}`}
            className="text-gold hover:text-gold-light"
          >
            {ref}
          </Link>
        ))}
      </div>
    </article>
  );
}

export function CommitmentRegistryHub() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CommitmentStatus | "all">("all");

  const commitments = useMemo(() => {
    let results = searchCommitments(query);
    if (status !== "all") {
      results = results.filter((c) => c.status === status);
    }
    return results;
  }, [query, status]);

  const deliveredCount = COMMITMENT_REGISTRY.filter(
    (c) => c.status === "delivered" || c.status === "completed"
  ).length;
  const activeCount = COMMITMENT_REGISTRY.filter(
    (c) => c.status === "in_progress" || c.status === "on_schedule"
  ).length;

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-014 · Credibility Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Commitment Registry
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Every significant public promise — traceable, owned, and measured.
            Credibility managed with the same discipline as financial assets.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1 space-y-4">
            <input
              type="search"
              placeholder="Search commitments, institutions, owners…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "all",
                  "delivered",
                  "completed",
                  "in_progress",
                  "on_schedule",
                  "at_risk",
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                    status === s
                      ? "border-gold/40 bg-gold-subtle text-gold"
                      : "border-gold-subtle text-cream-muted hover:border-gold/30"
                  }`}
                >
                  {s === "all" ? "All" : COMMITMENT_STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right text-sm text-cream-muted">
            <p>
              {deliveredCount} fulfilled · {activeCount} active
            </p>
            <p className="mt-1">{COMMITMENT_REGISTRY.length} commitments registered</p>
          </div>
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            The Commitment Test
          </p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;Can we fulfil this responsibly? Have we communicated honestly about
            assumptions? If circumstances change, are we prepared to act fairly?&rdquo;
          </blockquote>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/library/canon/CANON-014"
              className="text-gold hover:text-gold-light"
            >
              CANON-014 →
            </Link>
            <Link
              href="/library/frameworks/trust-impact-assessment"
              className="text-cream-muted hover:text-gold"
            >
              Trust Impact Assessment →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Credibility in messaging
          </h2>
          <ul className="space-y-4">
            {CANON_014_CREDIBILITY_APPLICATIONS.map((app) => (
              <li
                key={app.institution}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <h3 className="mb-2 font-serif text-lg font-semibold text-cream">
                  {app.institution}
                </h3>
                <p className="mb-2 text-sm text-burgundy/90 line-through decoration-burgundy/40">
                  {app.avoid}
                </p>
                <p className="text-sm text-cream-muted">{app.prefer}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-12 hidden overflow-x-auto rounded-lg border border-gold-subtle lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-muted text-xs uppercase tracking-widest text-cream-muted">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Commitment</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Date Made</th>
                <th className="px-4 py-3 font-medium">Expected</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {commitments.map((c) => (
                <tr key={c.id} className="border-b border-gold-subtle/50">
                  <td className="px-4 py-4 font-mono text-xs text-gold">{c.id}</td>
                  <td className="max-w-xs px-4 py-4 font-medium text-cream">{c.summary}</td>
                  <td className="px-4 py-4 text-cream-muted">{c.institution}</td>
                  <td className="px-4 py-4 text-cream-muted">{c.dateMade}</td>
                  <td className="px-4 py-4 text-cream-muted">{c.expectedDelivery}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(c.status)}`}
                    >
                      {COMMITMENT_STATUS_LABELS[c.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-6">
          {commitments.map((c) => (
            <CommitmentCard key={c.id} commitment={c} />
          ))}
        </div>

        {commitments.length === 0 && (
          <p className="py-12 text-center text-cream-muted">
            No commitments match your search.
          </p>
        )}

        <section className="mt-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Institutional reputation</p>
          <p className="text-sm italic text-cream-muted">
            &ldquo;If Stankings says it, they&apos;ll either deliver it — or they&apos;ll tell
            you honestly why they can&apos;t.&rdquo;
          </p>
        </section>
      </div>
    </>
  );
}
