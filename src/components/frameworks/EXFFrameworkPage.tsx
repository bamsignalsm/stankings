import Link from "next/link";
import { CANON_008_EXCELLENCE_APPLICATIONS } from "@/lib/canon/canon-008";
import {
  EXF_DEPARTMENT_REQUIREMENTS,
  EXF_EXCELLENCE_TEST,
  EXF_FRAMEWORK,
  EXF_PURPOSE,
} from "@/lib/frameworks/excellence";
import { EXECUTIVE_DECISION_10 } from "@/lib/iki";

export function EXFFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Culture Canon · {EXF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {EXF_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">
            Derived from{" "}
            <Link href="/library/canon/CANON-008" className="text-gold hover:text-gold-light">
              CANON-008
            </Link>
            . Making excellence repeatable — not accidental.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_10}
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <p className="leading-relaxed text-cream-muted">{EXF_PURPOSE}</p>
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">The Excellence Test</p>
          <blockquote className="font-serif text-xl italic text-cream">
            &ldquo;{EXF_EXCELLENCE_TEST}&rdquo;
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Required per department
          </h2>
          <ul className="space-y-3">
            {EXF_DEPARTMENT_REQUIREMENTS.map((req) => (
              <li key={req.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-medium text-cream">{req.label}</p>
                <p className="mt-1 text-sm text-cream-muted">{req.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Excellence in practice
          </h2>
          <ul className="space-y-4">
            {CANON_008_EXCELLENCE_APPLICATIONS.map((app) => (
              <li
                key={app.institution}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <p className="mb-3 font-medium text-gold">{app.institution}</p>
                <ul className="space-y-1">
                  {app.standards.map((s) => (
                    <li key={s} className="text-sm text-cream-muted">
                      · {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-10">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Standards of Excellence Registry
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Documented standards for operating institutions and engineering.
          </p>
          <Link
            href="/library/excellence"
            className="inline-block rounded-lg border border-gold/30 bg-gold-subtle px-6 py-3 text-sm text-gold hover:text-gold-light"
          >
            Browse Standards →
          </Link>
        </section>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon/CANON-008" className="text-gold hover:text-gold-light">
            Read CANON-008 →
          </Link>
          <Link href="/library/excellence" className="text-gold hover:text-gold-light">
            Standards Registry →
          </Link>
        </div>
      </div>
    </>
  );
}
