import Link from "next/link";
import { CANON_018_PRINCIPLE_MOTTO } from "@/lib/canon/canon-018";
import {
  PAR_CANON_ALIGNMENT_TEMPLATE,
  PAR_EXAMPLE_REVIEWS,
  PAR_FRAMEWORK,
  PAR_PRINCIPLE_TEST,
  PAR_PURPOSE,
  PAR_REVIEW_FIELDS,
  parAlignmentStatusLabel,
  type CanonAlignmentRow,
  type PrinciplesAlignmentReview,
} from "@/lib/frameworks/principles-alignment-review";
import { EXECUTIVE_DECISION_20 } from "@/lib/iki";

function recommendationStyle(rec: PrinciplesAlignmentReview["recommendation"]) {
  const map = {
    proceed: "text-forest border-forest/30",
    proceed_with_conditions: "text-gold border-gold/30",
    defer: "text-cream-muted border-gold-subtle",
    decline: "text-burgundy border-burgundy/30",
  };
  return map[rec];
}

function alignmentIcon(status: CanonAlignmentRow["status"]) {
  const map = {
    aligned: "✅",
    partial: "⚠️",
    conflict: "❌",
    not_applicable: "—",
  };
  return map[status];
}

function alignmentRowClass(status: CanonAlignmentRow["status"]) {
  if (status === "conflict") return "border-burgundy/20 bg-burgundy/5";
  if (status === "partial") return "border-gold/20 bg-gold/5";
  return "border-gold-subtle bg-ink-muted";
}

function CanonMatrix({ rows }: { rows: CanonAlignmentRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gold-subtle">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead>
          <tr className="border-b border-gold-subtle bg-ink">
            <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">Canon</th>
            <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">Title</th>
            <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">Aligned?</th>
            <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.canonId} className={`border-b border-gold-subtle/50 ${alignmentRowClass(row.status)}`}>
              <td className="px-4 py-2.5 font-mono text-xs text-gold">{row.canonId.replace("CANON-", "")}</td>
              <td className="px-4 py-2.5">
                <Link href={row.href} className="text-cream hover:text-gold">
                  {row.title}
                </Link>
              </td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span title={parAlignmentStatusLabel(row.status)}>
                  {alignmentIcon(row.status)} {parAlignmentStatusLabel(row.status)}
                </span>
              </td>
              <td className="px-4 py-2.5 text-cream-muted">{row.notes || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewCard({ review }: { review: PrinciplesAlignmentReview }) {
  const conflictCount = review.canonAlignment.filter((r) => r.status === "conflict").length;

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {review.proposalType}
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">{review.proposalTitle}</h3>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${recommendationStyle(review.recommendation)}`}
        >
          {review.recommendation.replace(/_/g, " ")}
        </span>
      </div>

      <p className="mb-4 text-sm text-cream-muted">{review.proposalSummary}</p>

      {Object.keys(review.frameworkReferences).length > 0 && (
        <dl className="mb-4 space-y-2 text-sm">
          {review.frameworkReferences.paf && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">PAF</dt>
              <dd className="text-cream-muted">{review.frameworkReferences.paf}</dd>
            </div>
          )}
          {review.frameworkReferences.tia && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">TIA</dt>
              <dd className="text-cream-muted">{review.frameworkReferences.tia}</dd>
            </div>
          )}
          {review.frameworkReferences.eia && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">EIA</dt>
              <dd className="text-cream-muted">{review.frameworkReferences.eia}</dd>
            </div>
          )}
          {review.frameworkReferences.isa && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">ISA</dt>
              <dd className="text-cream-muted">{review.frameworkReferences.isa}</dd>
            </div>
          )}
          {review.frameworkReferences.urf && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">URF</dt>
              <dd className="text-cream-muted">{review.frameworkReferences.urf}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">
          Canon Alignment Matrix
          {conflictCount > 0 && (
            <span className="ml-2 text-burgundy">({conflictCount} conflict{conflictCount !== 1 ? "s" : ""})</span>
          )}
        </p>
        <CanonMatrix rows={review.canonAlignment} />
      </div>

      {review.principleConflicts.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs uppercase tracking-widest text-burgundy">Principle conflicts</p>
          <ul className="space-y-1 text-sm text-cream-muted">
            {review.principleConflicts.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mb-4 text-sm text-cream-muted">
        <span className="text-gold">Rationale: </span>
        {review.recommendationRationale}
      </p>

      <p className="text-sm text-cream-muted">{review.notes}</p>
    </article>
  );
}

export function PrinciplesAlignmentReviewFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Strategic Canon · {PAR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {PAR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-018" className="text-gold hover:text-gold-light">
              CANON-018
            </Link>
            . Principles before opportunity.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_20}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_018_PRINCIPLE_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{PAR_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Principle Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{PAR_PRINCIPLE_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Principles Alignment Review
          </h2>
          <ol className="space-y-3">
            {PAR_REVIEW_FIELDS.map((field, i) => (
              <li
                key={field.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">
                  {i + 1}. {field.label}
                </p>
                <p className="mt-1 text-sm text-cream-muted">{field.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Canon Alignment Matrix
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Template for every PAR — auditable record showing why a proposal is consistent with
            Volume 0 philosophy. Update status and notes for each Canon.
          </p>
          <CanonMatrix
            rows={PAR_CANON_ALIGNMENT_TEMPLATE.map((row) => ({
              ...row,
              status: "aligned" as const,
              notes: "",
            }))}
          />
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Example reviews</h2>
          <div className="space-y-8">
            {PAR_EXAMPLE_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">The century discipline</p>
          <p className="text-sm text-cream-muted">
            When markets are booming, everyone has principles. When opportunities are irresistible,
            principles become expensive. That is when CANON-018 matters most.
          </p>
          <Link
            href="/library/canon-dashboard"
            className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
          >
            Canon Dashboard →
          </Link>
        </section>
      </div>
    </>
  );
}
