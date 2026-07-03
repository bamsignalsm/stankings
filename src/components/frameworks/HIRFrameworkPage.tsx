import Link from "next/link";
import { CANON_010_PEOPLE_APPLICATIONS } from "@/lib/canon/canon-010";
import {
  HIR_EXAMPLE_REVIEWS,
  HIR_FRAMEWORK,
  HIR_PEOPLE_TEST,
  HIR_PURPOSE,
  HIR_REQUIRED_FIELDS,
  type HumanImpactReview,
} from "@/lib/frameworks/human-impact-review";
import { DECISION_GATES, EXECUTIVE_DECISION_12 } from "@/lib/iki";

function dignityLabel(impact: HumanImpactReview["dignityImpact"]) {
  const styles: Record<HumanImpactReview["dignityImpact"], string> = {
    increases: "text-forest",
    neutral: "text-cream-muted",
    reduces: "text-burgundy",
    unclear: "text-gold",
  };
  return styles[impact];
}

function ReviewCard({ review }: { review: HumanImpactReview }) {
  const statusStyles = {
    approved: "text-forest border-forest/30",
    rejected: "text-burgundy border-burgundy/30",
    draft: "text-cream-muted border-cream-muted/30",
    under_review: "text-gold border-gold/30",
  };

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {review.institution}
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">
            {review.proposalTitle}
          </h3>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusStyles[review.status]}`}
        >
          {review.status.replace("_", " ")}
        </span>
      </div>

      <p className="mb-6 text-sm text-cream-muted">{review.proposalSummary}</p>

      <dl className="mb-6 space-y-4 text-sm">
        <div>
          <dt className="mb-1 text-xs uppercase tracking-widest text-gold">Who is affected?</dt>
          <dd className="text-cream-muted">
            <ul className="space-y-1">
              {review.whoIsAffected.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="mb-1 text-xs uppercase tracking-widest text-gold">Benefits</dt>
          <dd className="text-cream-muted">
            <ul className="space-y-1">
              {review.benefitsCreated.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="mb-1 text-xs uppercase tracking-widest text-gold">Burdens</dt>
          <dd className="text-cream-muted">
            <ul className="space-y-1">
              {review.burdensCreated.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            Vulnerable groups
          </dt>
          <dd className="text-cream-muted">{review.vulnerableGroupsNotes}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            Dignity impact
          </dt>
          <dd className={`capitalize ${dignityLabel(review.dignityImpact)}`}>
            {review.dignityImpact.replace("_", " ")} — {review.dignityNotes}
          </dd>
        </div>
      </dl>

      <div className="mb-4 border-t border-gold-subtle pt-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">People Test</p>
        <p className="text-sm capitalize text-cream">
          {review.peopleTestAnswer.replace("_", " ")}
        </p>
        <p className="mt-2 text-sm text-cream-muted">{review.peopleTestNotes}</p>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">
          Related Canons
        </p>
        <ul className="space-y-1">
          {review.canonReferences.map((ref) => (
            <li key={ref.identifier}>
              <Link
                href={`/library/canon/${ref.identifier}`}
                className="text-sm text-gold hover:text-gold-light"
              >
                {ref.identifier}
              </Link>
              <span className="ml-2 text-xs text-cream-muted">— {ref.relevance}</span>
            </li>
          ))}
        </ul>
      </div>

      {review.approvalNotes && (
        <p className="border-t border-gold-subtle pt-4 text-sm italic text-cream-muted">
          {review.approvalNotes}
        </p>
      )}
    </article>
  );
}

export function HIRFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            People Canon · {HIR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {HIR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-010" className="text-gold hover:text-gold-light">
              CANON-010
            </Link>
            . Never efficient but indifferent.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_12}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{HIR_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The People Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{HIR_PEOPLE_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Decision gate context
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            HIR applies alongside the established proposal gates for customer-facing
            changes:
          </p>
          <ol className="space-y-2">
            {DECISION_GATES.map((gate, i) => (
              <li key={gate.id} className="flex gap-3 text-sm text-cream-muted">
                <span className="font-mono text-gold/50">{i + 1}</span>
                <span>
                  {gate.label}{" "}
                  <span className="text-cream-muted/70">({gate.canon})</span>
                </span>
              </li>
            ))}
            <li className="flex gap-3 text-sm text-cream">
              <span className="font-mono text-gold">+</span>
              <span>
                Human Impact Review{" "}
                <span className="text-gold">(CANON-010)</span>
              </span>
            </li>
          </ol>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Required review fields
          </h2>
          <ul className="space-y-3">
            {HIR_REQUIRED_FIELDS.map((field) => (
              <li
                key={field.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">{field.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{field.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            People in practice
          </h2>
          <ul className="space-y-4">
            {CANON_010_PEOPLE_APPLICATIONS.map((app) => (
              <li
                key={app.institution}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="mb-3 font-medium text-gold">{app.institution}</p>
                <ul className="space-y-1">
                  {app.perspective.map((p) => (
                    <li key={p} className="text-sm text-cream-muted">
                      · {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Illustrative reviews
          </h2>
          <p className="mb-8 text-sm text-cream-muted">
            Examples demonstrating how Canon 010 governs product and policy decisions.
          </p>
          <div className="space-y-8">
            {HIR_EXAMPLE_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-010" className="text-gold hover:text-gold-light">
            Read CANON-010 →
          </Link>
          <Link href="/library/lexicon/dignity" className="text-cream-muted hover:text-gold">
            Lexicon: Dignity
          </Link>
          <Link
            href="/library/frameworks/trust-impact-assessment"
            className="text-cream-muted hover:text-gold"
          >
            Trust Impact Assessment
          </Link>
        </div>
      </div>
    </>
  );
}
