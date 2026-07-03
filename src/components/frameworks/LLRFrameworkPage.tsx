import Link from "next/link";
import { CANON_009_LEARNING_APPLICATIONS } from "@/lib/canon/canon-009";
import {
  LLR_CLOSING_QUESTIONS,
  LLR_FRAMEWORK,
  LLR_LEARNING_TEST,
  LLR_PURPOSE,
  LLR_REQUIRED_FIELDS,
} from "@/lib/frameworks/lessons-learned";
import { EXECUTIVE_DECISION_11 } from "@/lib/iki";

export function LLRFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Learning Canon · {LLR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {LLR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-009" className="text-gold hover:text-gold-light">
              CANON-009
            </Link>
            . How experience becomes institutional knowledge.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_11}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{LLR_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            The Learning Test
          </p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{LLR_LEARNING_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Required fields per record
          </h2>
          <ul className="space-y-3">
            {LLR_REQUIRED_FIELDS.map((field) => (
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
            Every project closes with
          </h2>
          <ul className="space-y-2">
            {LLR_CLOSING_QUESTIONS.map((q) => (
              <li key={q} className="text-sm text-cream-muted">
                · {q}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Learning in practice
          </h2>
          <ul className="space-y-4">
            {CANON_009_LEARNING_APPLICATIONS.map((app) => (
              <li
                key={app.institution}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="mb-3 font-medium text-gold">{app.institution}</p>
                <ul className="space-y-1">
                  {app.practices.map((p) => (
                    <li key={p} className="text-sm text-cream-muted">
                      · {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-10">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Lessons Learned Registry
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Searchable institutional memory from completed initiatives.
          </p>
          <Link
            href="/library/lessons"
            className="inline-block rounded-lg border border-gold/30 bg-gold-subtle px-6 py-3 text-sm text-gold hover:text-gold-light"
          >
            Browse Lessons Learned →
          </Link>
        </section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-009" className="text-gold hover:text-gold-light">
            Read CANON-009 →
          </Link>
          <Link href="/library/lessons" className="text-cream-muted hover:text-gold">
            Registry
          </Link>
        </div>
      </div>
    </>
  );
}
