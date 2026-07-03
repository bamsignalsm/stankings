import Link from "next/link";
import { CANON_019_STEWARDSHIP_MOTTO } from "@/lib/canon/canon-019";
import {
  ASR_FRAMEWORK,
  ASR_PURPOSE,
  ASR_STEWARDSHIP_QUESTIONS,
  IIR_FRAMEWORK,
  IIR_RECORD_FIELDS,
} from "@/lib/frameworks/institutional-improvement";
import { EXECUTIVE_DECISION_21 } from "@/lib/iki";

export function AnnualStewardshipReviewFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Legacy Canon · {ASR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {ASR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-019" className="text-gold hover:text-gold-light">
              CANON-019
            </Link>
            . What did we preserve, improve, learn, and pass forward?
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_21}
        </blockquote>

        <p className="mb-12 text-center font-serif text-lg italic text-gold">
          &ldquo;{CANON_019_STEWARDSHIP_MOTTO}&rdquo;
        </p>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed whitespace-pre-line text-cream-muted">{ASR_PURPOSE}</p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Four stewardship questions
          </h2>
          <ol className="space-y-4">
            {ASR_STEWARDSHIP_QUESTIONS.map((q, i) => (
              <li
                key={q.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <p className="font-serif text-lg font-semibold text-cream">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-2 text-sm text-cream-muted">{q.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Linked register
          </h2>
          <p className="mb-4 text-sm text-cream-muted">
            Improvements documented in the{" "}
            <Link href="/library/improvements" className="text-gold hover:text-gold-light">
              {IIR_FRAMEWORK.title}
            </Link>{" "}
            ({IIR_FRAMEWORK.identifier}) support the &ldquo;What did we improve?&rdquo; answer.
          </p>
          <ol className="space-y-2 text-sm text-cream-muted">
            {IIR_RECORD_FIELDS.slice(0, 6).map((field) => (
              <li key={field.id}>
                · {field.label} — {field.description}
              </li>
            ))}
            <li className="text-gold">
              <Link href="/library/improvements">View full IIR field specification →</Link>
            </li>
          </ol>
        </section>

        <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">The custodian question</p>
          <p className="text-sm text-cream-muted">
            Most people ask what they can get from the institution. Custodians ask what the
            institution will gain because they served it.
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
