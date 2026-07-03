import Link from "next/link";
import { CANON_006_TIME_HORIZONS } from "@/lib/canon/canon-006";
import {
  GRF_DECISION_HORIZONS,
  GRF_EXAMPLES,
  GRF_FRAMEWORK,
  GRF_GENERATIONAL_TEST,
  GRF_MANDATORY_TRIGGERS,
  GRF_PURPOSE,
  GRF_QUESTIONS,
  GRF_SECTIONS,
  type GenerationalReview,
} from "@/lib/frameworks/generational-review";
import { EXECUTIVE_DECISION_8 } from "@/lib/iki";

function ReviewCard({ review }: { review: GenerationalReview }) {
  const checks = [
    { label: "Strengthens resilience", ok: review.strengthensResilience },
    { label: "No irreversible risk", ok: !review.createsIrreversibleRisk },
    { label: "Increases flexibility", ok: review.flexibilityImpact === "increases" },
    {
      label: "Future custodians strengthened",
      ok: review.generationalTestAnswer === "strengthens",
    },
  ];

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <h3 className="font-serif text-xl text-cream">{review.proposalTitle}</h3>
        <span className="text-xs uppercase tracking-wider text-gold">{review.status}</span>
      </div>
      <p className="mb-2 text-xs text-gold">Trigger: {review.mandatoryTrigger}</p>
      <p className="mb-4 text-sm text-cream-muted">{review.proposalSummary}</p>
      <ul className="mb-4 space-y-2">
        {checks.map((q, i) => (
          <li key={q.label} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-gold/50">{i + 1}</span>
            <span className={q.ok ? "text-forest" : "text-burgundy"}>
              {q.ok ? "✓" : "✗"}
            </span>
            <span className="text-cream-muted">{q.label}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm italic text-cream-muted">{review.recommendation}</p>
    </article>
  );
}

export function GRFFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Decision Gate 4 · {GRF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {GRF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-006" className="text-gold hover:text-gold-light">
              CANON-006
            </Link>
            . Generational stewardship — alongside PAF, TIA, and EIA.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_8}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{GRF_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Generational Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{GRF_GENERATIONAL_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Mandatory review triggers
          </h2>
          <ul className="space-y-2">
            {GRF_MANDATORY_TRIGGERS.map((trigger) => (
              <li
                key={trigger}
                className="rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream-muted"
              >
                {trigger}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Decision horizons</h2>
          <ul className="space-y-3">
            {GRF_DECISION_HORIZONS.map((h) => (
              <li key={h.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-cream">{h.label}</p>
                  <p className="font-mono text-xs text-gold">{h.range}</p>
                </div>
                <p className="text-sm text-cream-muted">{h.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Generational questions</h2>
          <ul className="space-y-3">
            {GRF_QUESTIONS.map((q) => (
              <li key={q.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-medium text-cream">{q.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{q.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Institutional time horizons
          </h2>
          <p className="mb-4 text-sm text-cream-muted">
            Per CANON-006 — decisions shall consider outcomes across:
          </p>
          <ul className="space-y-2">
            {CANON_006_TIME_HORIZONS.map((h) => (
              <li
                key={h.years}
                className="flex items-center justify-between rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3"
              >
                <span className="text-sm text-cream-muted">{h.label}</span>
                <span className="font-mono text-sm text-gold">{h.years}y</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Required sections</h2>
          <ul className="space-y-3">
            {GRF_SECTIONS.map((s) => (
              <li key={s.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-medium text-cream">{s.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-cream">
            Example generational reviews
          </h2>
          <div className="space-y-8">
            {GRF_EXAMPLES.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        <p className="mb-8 text-sm italic text-cream-muted">
          Most organizations have financial, risk, and legal reviews. Stankings adds a fourth
          dimension: generational stewardship.
        </p>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon/CANON-006" className="text-gold hover:text-gold-light">
            Read CANON-006 →
          </Link>
          <Link href="/library/frameworks/purpose-assessment" className="text-cream-muted hover:text-gold">
            PAF
          </Link>
          <Link href="/library/frameworks/trust-impact-assessment" className="text-cream-muted hover:text-gold">
            TIA
          </Link>
          <Link href="/library/frameworks/ecosystem-impact-assessment" className="text-cream-muted hover:text-gold">
            EIA
          </Link>
          <Link href="/library/volumes/custodian-programme" className="text-cream-muted hover:text-gold">
            Volume IV (planned)
          </Link>
        </div>
      </div>
    </>
  );
}
