import Link from "next/link";
import {
  CANON_016_ECOSYSTEM_STRENGTH,
  CANON_016_STRENGTH_MOTTO,
  CANON_016_STRENGTH_PILLARS,
} from "@/lib/canon/canon-016";
import {
  getStrengthAssessmentAverage,
  ISA_EXAMPLE_ASSESSMENTS,
  ISA_FRAMEWORK,
  ISA_INTEGRATED_GATEWAYS,
  ISA_PURPOSE,
  ISA_SCORE_DIMENSIONS,
  ISA_STRENGTH_TEST,
  type InstitutionalStrengthAssessment,
} from "@/lib/frameworks/institutional-strength-assessment";
import { EXECUTIVE_DECISION_18 } from "@/lib/iki";

function verdictStyle(verdict: InstitutionalStrengthAssessment["verdict"]) {
  const map = {
    proceed: "text-forest border-forest/30",
    refine: "text-gold border-gold/30",
    reject: "text-burgundy border-burgundy/30",
  };
  return map[verdict];
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-cream-muted">{label}</span>
        <span className="text-gold">{score}/5</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink">
        <div className="h-full rounded-full bg-gold/80" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
    </div>
  );
}

function AssessmentCard({ assessment }: { assessment: InstitutionalStrengthAssessment }) {
  const avg = getStrengthAssessmentAverage(assessment);
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-cream-muted">
            {assessment.proposalType}
          </p>
          <h3 className="font-serif text-xl font-semibold text-cream">{assessment.proposalTitle}</h3>
        </div>
        <div className="text-right">
          <span
            className={`mb-1 block rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${verdictStyle(assessment.verdict)}`}
          >
            {assessment.verdict}
          </span>
          <p className="font-mono text-xs text-cream-muted">Avg {avg}/5</p>
        </div>
      </div>

      <p className="mb-4 text-sm text-cream-muted">{assessment.proposalSummary}</p>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        {ISA_SCORE_DIMENSIONS.map((dim) => (
          <ScoreBar
            key={dim.id}
            label={dim.label.replace(" Score", "")}
            score={assessment.scores[dim.id as keyof InstitutionalStrengthAssessment["scores"]]}
          />
        ))}
      </div>

      {assessment.pillarsStrengthened.length > 0 && (
        <p className="mb-4 text-sm text-cream-muted">
          <span className="text-gold">Pillars: </span>
          {assessment.pillarsStrengthened.join(" · ")}
        </p>
      )}

      <p className="mb-2 text-sm italic text-cream-muted">{assessment.financialNote}</p>
      <p className="text-sm text-cream-muted">{assessment.notes}</p>
    </article>
  );
}

export function InstitutionalStrengthAssessmentFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Strategic Canon · {ISA_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {ISA_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-016" className="text-gold hover:text-gold-light">
              CANON-016
            </Link>
            . How strong can we become — not merely how big.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_18}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_016_STRENGTH_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{ISA_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Strength Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{ISA_STRENGTH_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Strength pillars</h2>
          <ul className="flex flex-wrap gap-2">
            {CANON_016_STRENGTH_PILLARS.map((pillar) => (
              <li
                key={pillar}
                className="rounded-full border border-gold-subtle bg-ink-muted px-3 py-1 text-xs text-cream-muted"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">ISA score dimensions</h2>
          <ol className="space-y-3">
            {ISA_SCORE_DIMENSIONS.map((dim, i) => (
              <li
                key={dim.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="font-medium text-cream">
                  {i + 1}. {dim.label}{" "}
                  <span className="font-mono text-xs text-gold">({dim.scale})</span>
                </p>
                <p className="mt-1 text-sm text-cream-muted">{dim.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-cream-muted">
            <span className="text-gold">Recommendation: </span>Proceed / Refine / Reject
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Integrated gates</h2>
          <ul className="space-y-3">
            {ISA_INTEGRATED_GATEWAYS.map((gate) => (
              <li
                key={gate.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <Link href={gate.href} className="font-medium text-gold hover:text-gold-light">
                  {gate.label}
                </Link>
                <p className="mt-1 text-sm text-cream-muted">{gate.role}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Ecosystem strength test
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Each operating institution exists because it permanently increases institutional capability.
          </p>
          <ul className="space-y-3">
            {CANON_016_ECOSYSTEM_STRENGTH.map((co) => (
              <li
                key={co.slug}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <Link
                  href={`/library/ecosystem/${co.slug}`}
                  className="font-medium text-cream hover:text-gold"
                >
                  {co.company}
                </Link>
                <span className="text-sm text-forest">✓ {co.strengthens}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Example assessments</h2>
          <div className="space-y-6">
            {ISA_EXAMPLE_ASSESSMENTS.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">The institutional question</p>
          <p className="text-sm text-cream-muted">
            Not &ldquo;Will it make money?&rdquo; but &ldquo;Does it strengthen the institution?&rdquo;
            {" "}
            <Link href="/library/canon-dashboard" className="text-gold hover:text-gold-light">
              Canon Dashboard →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
