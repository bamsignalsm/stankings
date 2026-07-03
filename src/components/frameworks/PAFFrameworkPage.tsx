import Link from "next/link";
import { CANON_003_ECOSYSTEM_PURPOSE } from "@/lib/canon/canon-003";
import {
  PAF_EXAMPLES,
  PAF_FRAMEWORK,
  PAF_PURPOSE,
  PAF_PURPOSE_TEST,
  PAF_SECTIONS,
} from "@/lib/frameworks/purpose-assessment";
import { EXECUTIVE_DECISION_5 } from "@/lib/iki";

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-cream-muted">{label}</span>
      <span className="font-mono text-sm text-gold">{score}</span>
    </div>
  );
}

export function PAFFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Decision Gate 1 · {PAF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {PAF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-003" className="text-gold hover:text-gold-light">
              CANON-003
            </Link>
            . Purpose before profit — before TIA, before engineering.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_5}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{PAF_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Purpose Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{PAF_PURPOSE_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Required sections</h2>
          <ul className="space-y-3">
            {PAF_SECTIONS.map((s) => (
              <li key={s.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-medium text-cream">{s.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Ecosystem purpose validation
          </h2>
          <ul className="space-y-3">
            {CANON_003_ECOSYSTEM_PURPOSE.map((c) => (
              <li
                key={c.company}
                className="flex flex-col gap-1 rounded-lg border border-gold-subtle bg-ink-muted p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-cream">{c.company}</span>
                <span className="text-sm text-cream-muted">{c.purpose}</span>
                <span className="text-forest text-sm">✓ Passes Canon 003</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-cream">
            Example assessments
          </h2>
          <div className="space-y-8">
            {PAF_EXAMPLES.map((a) => (
              <article
                key={a.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <h3 className="font-serif text-xl text-cream">{a.proposalTitle}</h3>
                <p className="mt-2 text-sm text-cream-muted">{a.proposalSummary}</p>
                <div className="mt-4 space-y-2">
                  <ScoreBar label="Purpose Score" score={a.scores.purposeOverall} />
                </div>
                <p className="mt-4 text-sm italic text-cream-muted">{a.recommendation}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/frameworks/trust-impact-assessment" className="text-gold hover:text-gold-light">
            Gate 2: Trust Impact Assessment →
          </Link>
          <Link href="/library/canon/CANON-003" className="text-cream-muted hover:text-gold">
            CANON-003
          </Link>
        </div>
      </div>
    </>
  );
}
