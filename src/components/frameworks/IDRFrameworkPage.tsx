import Link from "next/link";
import {
  IDR_FRAMEWORK,
  IDR_MANDATORY_TRIGGERS,
  IDR_PURPOSE,
  IDR_REQUIRED_FIELDS,
  IDR_TRUTH_TEST,
} from "@/lib/decisions/institutional-decision-record";
import { EXECUTIVE_DECISION_9 } from "@/lib/iki";

export function IDRFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {IDR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IDR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-007" className="text-gold hover:text-gold-light">
              CANON-007
            </Link>
            . Institutional memory of why — not only what.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_9}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{IDR_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Truth Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{IDR_TRUTH_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            When an IDR is required
          </h2>
          <ul className="space-y-2">
            {IDR_MANDATORY_TRIGGERS.map((trigger) => (
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
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Required fields per decision
          </h2>
          <ul className="space-y-3">
            {IDR_REQUIRED_FIELDS.map((field) => (
              <li key={field.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-medium text-cream">{field.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{field.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-10">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Decision Record Registry
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Browse institutional decisions with full rationale, evidence, and outcomes.
          </p>
          <Link
            href="/library/decisions"
            className="inline-block rounded-lg border border-gold/30 bg-gold-subtle px-6 py-3 text-sm text-gold hover:text-gold-light"
          >
            View Decision Records →
          </Link>
        </section>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon/CANON-007" className="text-gold hover:text-gold-light">
            Read CANON-007 →
          </Link>
          <Link href="/library/decisions" className="text-gold hover:text-gold-light">
            Decision Registry →
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
          <Link href="/library/frameworks/generational-review" className="text-cream-muted hover:text-gold">
            GRF
          </Link>
        </div>
      </div>
    </>
  );
}
