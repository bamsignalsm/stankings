import Link from "next/link";
import {
  CANON_017_GROUP_MISSION,
  CANON_017_UNCERTAINTY_BY_INSTITUTION,
  CANON_017_UNCERTAINTY_MOTTO,
} from "@/lib/canon/canon-017";
import {
  URF_ASSESSMENT_FIELDS,
  URF_EXAMPLE_ASSESSMENTS,
  URF_FRAMEWORK,
  URF_PURPOSE,
  URF_UNCERTAINTY_TEST,
  type UncertaintyReductionAssessment,
} from "@/lib/frameworks/uncertainty-reduction";
import { EXECUTIVE_DECISION_19 } from "@/lib/iki";

function verdictStyle(verdict: UncertaintyReductionAssessment["verdict"]) {
  const map = {
    proceed: "text-forest border-forest/30",
    refine: "text-gold border-gold/30",
    reconsider: "text-burgundy border-burgundy/30",
  };
  return map[verdict];
}

function AssessmentCard({ assessment }: { assessment: UncertaintyReductionAssessment }) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {assessment.institution} · {assessment.proposalType}
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">{assessment.proposalTitle}</h3>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${verdictStyle(assessment.verdict)}`}
        >
          {assessment.verdict}
        </span>
      </div>

      <div className="mb-4 rounded-lg border border-gold/20 bg-ink px-4 py-3">
        <p className="mb-1 text-xs uppercase tracking-widest text-gold">Uncertainty that exists</p>
        <p className="text-sm text-cream-muted">{assessment.uncertaintyExists}</p>
      </div>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Who experiences it</dt>
          <dd className="text-cream">{assessment.whoExperiences}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Severity</dt>
          <dd className="capitalize text-cream">{assessment.severity}</dd>
        </div>
      </dl>

      <p className="mb-2 text-sm text-cream-muted">
        <span className="text-gold">How reduced: </span>
        {assessment.howReduced}
      </p>
      <p className="mb-4 text-sm text-cream-muted">
        <span className="text-gold">Confidence: </span>
        {assessment.confidenceImprovement}
      </p>

      {assessment.measurableMetrics.length > 0 && (
        <ul className="mb-4 space-y-1 text-sm text-cream-muted">
          {assessment.measurableMetrics.map((m) => (
            <li key={m}>· {m}</li>
          ))}
        </ul>
      )}

      <p className="text-sm text-cream-muted">{assessment.notes}</p>
    </article>
  );
}

export function UncertaintyReductionFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Strategic Canon · {URF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {URF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-017" className="text-gold hover:text-gold-light">
              CANON-017
            </Link>
            . What uncertainty are we reducing?
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/40 bg-gold-subtle p-8 text-center font-serif text-lg italic text-cream">
          &ldquo;{CANON_017_GROUP_MISSION}&rdquo;
        </blockquote>

        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_19}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_017_UNCERTAINTY_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{URF_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Uncertainty Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{URF_UNCERTAINTY_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Uncertainty Reduction Assessment
          </h2>
          <ol className="space-y-3">
            {URF_ASSESSMENT_FIELDS.map((field, i) => (
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
            The confidence business
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Every institution reduces uncertainty in a different domain. The real product is
            confidence — not software, property, or finance alone.
          </p>
          <ul className="space-y-4">
            {CANON_017_UNCERTAINTY_BY_INSTITUTION.map((inst) => (
              <li
                key={inst.slug}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={`/library/ecosystem/${inst.slug}`}
                    className="font-serif text-lg font-semibold text-cream hover:text-gold"
                  >
                    {inst.institution}
                  </Link>
                  <span className="text-xs uppercase tracking-widest text-gold/80">
                    {inst.domain}
                  </span>
                </div>
                <p className="text-sm text-cream-muted">{inst.uncertaintyReduced}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Example assessments</h2>
          <div className="space-y-6">
            {URF_EXAMPLE_ASSESSMENTS.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">The century question</p>
          <p className="text-sm text-cream-muted">
            &ldquo;What does Stankings Group actually do?&rdquo; —{" "}
            <span className="italic text-cream">{CANON_017_GROUP_MISSION}</span>
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
