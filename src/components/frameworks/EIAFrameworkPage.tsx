import Link from "next/link";
import { CANON_005_ECOSYSTEM_LANES } from "@/lib/canon/canon-005";
import {
  EIA_ECOSYSTEM_TEST,
  EIA_EXAMPLES,
  EIA_FRAMEWORK,
  EIA_PURPOSE,
  EIA_SECTIONS,
  type EcosystemImpactAssessment,
} from "@/lib/frameworks/ecosystem-impact-assessment";
import { EXECUTIVE_DECISION_7 } from "@/lib/iki";

function AssessmentCard({ assessment }: { assessment: EcosystemImpactAssessment }) {
  const questions = [
    {
      label: "Strengthens ecosystem",
      ok: assessment.ecosystemTestAnswer === "strengthens",
    },
    {
      label: "No duplication",
      ok: !assessment.duplicatesCapability,
    },
    {
      label: "Clear structure",
      ok: assessment.recommendedStructure !== "reject",
    },
    {
      label: "Uses shared platforms",
      ok: assessment.sharedPlatformServices.length > 0,
    },
    {
      label: "Adds long-term capability",
      ok: assessment.longTermCapability.length > 20,
    },
  ];

  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <h3 className="font-serif text-xl text-cream">{assessment.proposalTitle}</h3>
        <span className="text-xs uppercase tracking-wider text-gold">{assessment.status}</span>
      </div>
      <p className="mb-4 text-sm text-cream-muted">{assessment.proposalSummary}</p>
      <ul className="mb-4 space-y-2">
        {questions.map((q, i) => (
          <li key={q.label} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-gold/50">{i + 1}</span>
            <span className={q.ok ? "text-forest" : "text-burgundy"}>
              {q.ok ? "✓" : "✗"}
            </span>
            <span className="text-cream-muted">{q.label}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm italic text-cream-muted">{assessment.recommendation}</p>
    </article>
  );
}

export function EIAFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Decision Gate 3 · {EIA_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {EIA_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-005" className="text-gold hover:text-gold-light">
              CANON-005
            </Link>
            . PAF → TIA → EIA — before financial modelling.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_7}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{EIA_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Ecosystem Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{EIA_ECOSYSTEM_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Required sections</h2>
          <ul className="space-y-3">
            {EIA_SECTIONS.map((s) => (
              <li key={s.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-medium text-cream">{s.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Ecosystem lane validation
          </h2>
          <ul className="space-y-3">
            {CANON_005_ECOSYSTEM_LANES.map((lane) => (
              <li
                key={lane.company}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-cream">{lane.company}</p>
                  <p className="text-xs uppercase tracking-wider text-gold">{lane.excellence}</p>
                </div>
                <p className="text-sm text-cream-muted">{lane.lane}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-cream">
            Example ecosystem assessments
          </h2>
          <div className="space-y-8">
            {EIA_EXAMPLES.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon/CANON-005" className="text-gold hover:text-gold-light">
            Read CANON-005 →
          </Link>
          <Link href="/library/ecosystem" className="text-gold hover:text-gold-light">
            Ecosystem Map →
          </Link>
          <Link href="/library/frameworks/purpose-assessment" className="text-cream-muted hover:text-gold">
            PAF
          </Link>
          <Link href="/library/frameworks/trust-impact-assessment" className="text-cream-muted hover:text-gold">
            TIA
          </Link>
          <Link href="/library/frameworks/generational-review" className="text-cream-muted hover:text-gold">
            GRF
          </Link>
        </div>
      </div>
    </>
  );
}
