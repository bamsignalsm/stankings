import Link from "next/link";
import { getAllDecisionRecords } from "@/lib/decisions/institutional-decision-record";

export function DecisionRecordHub() {
  const records = getAllDecisionRecords();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-007 · Institutional Memory
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Decision Record Registry
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Why decisions were made — not only what was decided. Future custodians inherit
            reasoning, evidence, and lessons learned.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <p className="text-sm text-cream-muted">
            {records.length} registered decision record{records.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/library/frameworks/institutional-decision-record"
            className="text-sm text-gold hover:text-gold-light"
          >
            IDR Framework →
          </Link>
        </div>

        <div className="space-y-4">
          {records.map((record) => (
            <Link
              key={record.identifier}
              href={`/library/decisions/${record.identifier}`}
              className="group block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <p className="font-mono text-xs text-gold">{record.identifier}</p>
                <span className="text-xs uppercase tracking-wider text-cream-muted">
                  {record.status}
                </span>
              </div>
              <h2 className="mb-2 font-serif text-xl text-cream group-hover:text-gold-light">
                {record.title}
              </h2>
              <p className="mb-4 line-clamp-2 text-sm text-cream-muted">
                {record.decisionStatement}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-cream-muted">
                <span>{record.category}</span>
                <span>·</span>
                <span>Owner: {record.decisionOwner}</span>
                <span>·</span>
                <span>Review: {record.reviewDate}</span>
                <span>·</span>
                <span className="capitalize">Outcome: {record.outcomeStatus.replace("_", " ")}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/decision-workspace" className="text-gold hover:text-gold-light">
            Decision Workspace →
          </Link>
          <Link href="/library/canon/CANON-007" className="text-cream-muted hover:text-gold">
            CANON-007 →
          </Link>
          <Link
            href="/library/frameworks/institutional-decision-record"
            className="text-cream-muted hover:text-gold"
          >
            IDR Framework
          </Link>
        </div>
      </div>
    </>
  );
}
