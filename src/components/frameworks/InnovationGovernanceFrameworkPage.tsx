import Link from "next/link";
import {
  CANON_013_INNOVATION_APPLICATIONS,
  CANON_013_INNOVATION_MOTTO,
} from "@/lib/canon/canon-013";
import {
  IGF_EXAMPLE_REVIEWS,
  IGF_FRAMEWORK,
  IGF_INNOVATION_TEST,
  IGF_INTEGRATED_GATEWAYS,
  IGF_PURPOSE,
  IGF_REVIEW_FIELDS,
  type InnovationGovernanceReview,
} from "@/lib/frameworks/innovation-governance";
import { EXECUTIVE_DECISION_15 } from "@/lib/iki";

function verdictStyle(verdict: InnovationGovernanceReview["verdict"]) {
  const map = {
    pilot_approved: "text-forest border-forest/30",
    refine_required: "text-gold border-gold/30",
    declined: "text-burgundy border-burgundy/30",
    scale_approved: "text-royal border-royal/30",
  };
  return map[verdict];
}

function ReviewCard({ review }: { review: InnovationGovernanceReview }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {review.requestingInstitution} · {review.technology}
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            {review.proposalTitle}
          </h3>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${verdictStyle(review.verdict)}`}
        >
          {review.verdict.replace("_", " ")}
        </span>
      </div>

      <p className="mb-4 text-sm text-cream-muted">{review.proposalSummary}</p>

      <div className="mb-4 rounded-lg border border-gold/20 bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Problem</p>
        <p className="text-sm text-cream-muted">{review.problemStatement}</p>
      </div>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Trust impact</dt>
          <dd className="capitalize text-cream">{review.trustImpact.replace("_", " ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Platform reuse</dt>
          <dd className="text-cream">{review.platformReuse}</dd>
        </div>
      </dl>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">Success metrics</p>
        <ul className="space-y-1 text-sm text-cream-muted">
          {review.successMetrics.map((m) => (
            <li key={m}>· {m}</li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-cream-muted">{review.notes}</p>
    </article>
  );
}

export function InnovationGovernanceFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Innovation Canon · {IGF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IGF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-013" className="text-gold hover:text-gold-light">
              CANON-013
            </Link>
            . How the institution innovates without losing identity.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_15}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_013_INNOVATION_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{IGF_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Innovation Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{IGF_INNOVATION_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Integrated decision gates
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Innovation Governance integrates with existing frameworks — governed, not constrained.
          </p>
          <ul className="space-y-3">
            {IGF_INTEGRATED_GATEWAYS.map((gate) => (
              <li
                key={gate.id}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div>
                  <Link href={gate.href} className="font-medium text-gold hover:text-gold-light">
                    {gate.label}
                  </Link>
                  <p className="mt-1 text-sm text-cream-muted">{gate.role}</p>
                </div>
                <span className="font-mono text-xs text-cream-muted">{gate.framework}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Innovation Governance Review
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Every significant innovation proposal shall document the following fields.
          </p>
          <ol className="space-y-3">
            {IGF_REVIEW_FIELDS.map((field, i) => (
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
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Innovation in practice
          </h2>
          <ul className="space-y-4">
            {CANON_013_INNOVATION_APPLICATIONS.map((app) => (
              <li
                key={app.domain}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <h3 className="mb-1 font-serif text-lg font-semibold text-cream">
                  {app.domain}
                </h3>
                <p className="mb-2 text-sm text-cream-muted">{app.description}</p>
                <p className="text-xs text-gold/80">{app.approach}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Example reviews
          </h2>
          <div className="space-y-6">
            {IGF_EXAMPLE_REVIEWS.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">The institutional question</p>
          <p className="text-sm text-cream-muted">
            Fifty years from now, a future CTO will not ask whether to adopt a new technology.
            They will ask whether it passes{" "}
            <Link href="/library/canon/CANON-013" className="text-gold hover:text-gold-light">
              CANON-013
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
