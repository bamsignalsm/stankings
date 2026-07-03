import Link from "next/link";
import {
  CANON_011_SIMPLICITY_APPLICATIONS,
  CANON_011_SIMPLICITY_MOTTO,
} from "@/lib/canon/canon-011";
import {
  SR_EXAMPLE_REVIEWS,
  SR_FRAMEWORK,
  SR_PURPOSE,
  SR_REVIEW_QUESTIONS,
  SR_SIMPLICITY_TEST,
  type SimplicityReview,
} from "@/lib/frameworks/simplicity-review";
import { EXECUTIVE_DECISION_13 } from "@/lib/iki";

function verdictStyle(verdict: SimplicityReview["verdict"]) {
  const map = {
    justified: "text-forest border-forest/30",
    simplify: "text-gold border-gold/30",
    reject: "text-burgundy border-burgundy/30",
  };
  return map[verdict];
}

function ReviewCard({ review }: { review: SimplicityReview }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {review.domain}
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
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">One paragraph</p>
        <p className="text-sm text-cream-muted">{review.oneParagraphExplanation}</p>
      </div>

      <dl className="mb-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">First-time clarity</dt>
          <dd className="text-cream">{review.firstTimeUnderstandable ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Steps</dt>
          <dd className="capitalize text-cream">{review.stepsAssessment.replace("_", " ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Cognitive load</dt>
          <dd className="text-cream">{review.reducesCognitiveLoad ? "Reduced" : "Not reduced"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Reuses existing</dt>
          <dd className="text-cream">{review.reusesExistingCapabilities ? "Yes" : "No"}</dd>
        </div>
      </dl>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">Essential complexity</p>
          <ul className="space-y-1 text-sm text-cream-muted">
            {review.essentialComplexity.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">
            Accidental complexity
          </p>
          <ul className="space-y-1 text-sm text-cream-muted">
            {review.accidentalComplexity.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4 border-t border-gold-subtle pt-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">Simplicity Test</p>
        <p className="text-sm text-cream-muted">{review.simplicityTestNotes}</p>
      </div>

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
    </article>
  );
}

export function SRFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Operational Canon · {SR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {SR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-011" className="text-gold hover:text-gold-light">
              CANON-011
            </Link>
            . Engineering philosophy for the decades ahead.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_13}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_011_SIMPLICITY_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{SR_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Simplicity Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{SR_SIMPLICITY_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Simplicity Review questions
          </h2>
          <ul className="space-y-3">
            {SR_REVIEW_QUESTIONS.map((q) => (
              <li
                key={q.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">{q.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{q.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Simplicity in practice
          </h2>
          <ul className="space-y-4">
            {CANON_011_SIMPLICITY_APPLICATIONS.map((app) => (
              <li
                key={app.domain}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="mb-3 font-medium text-gold">{app.domain}</p>
                <ul className="space-y-1">
                  {app.examples.map((ex) => (
                    <li key={ex} className="text-sm text-cream-muted">
                      · {ex}
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
            Examples from product, institutional knowledge, and engineering.
          </p>
          <div className="space-y-8">
            {SR_EXAMPLE_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-011" className="text-gold hover:text-gold-light">
            Read CANON-011 →
          </Link>
          <Link href="/library/lexicon/simplicity" className="text-cream-muted hover:text-gold">
            Lexicon: Simplicity
          </Link>
          <Link
            href="/library/standards/ls-001"
            className="text-cream-muted hover:text-gold"
          >
            LS-001 Knowledge Objects
          </Link>
        </div>
      </div>
    </>
  );
}
