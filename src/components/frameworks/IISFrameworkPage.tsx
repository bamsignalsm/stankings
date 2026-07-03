import Link from "next/link";
import {
  IIS_ADMISSION_TEST,
  IIS_BODY,
  IIS_FRAMEWORK,
  IIS_PURPOSE,
  IIS_REQUIRED_FIELDS,
} from "@/lib/frameworks/institutional-identity-statement";
import { EXECUTIVE_DECISION_29 } from "@/lib/iki";
import { INSTITUTIONAL_IDENTITY_STATEMENTS } from "@/lib/institutional-identity";

export function IISFrameworkPage() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution Article I · {IIS_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IIS_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{IIS_PURPOSE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_29}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Admission Test</h2>
          <p className="italic text-cream-muted">{IIS_ADMISSION_TEST}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Required Fields</h2>
          <ol className="space-y-2">
            {IIS_REQUIRED_FIELDS.map((field, i) => (
              <li key={field} className="flex gap-3 text-sm text-cream-muted">
                <span className="font-mono text-gold/60">{i + 1}.</span>
                {field}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12 whitespace-pre-wrap rounded-lg border border-gold-subtle bg-ink-muted p-6 text-sm leading-relaxed text-cream-muted">
          {IIS_BODY}
        </section>

        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Registered Statements ({INSTITUTIONAL_IDENTITY_STATEMENTS.length})
          </h2>
          <ul className="space-y-2">
            {INSTITUTIONAL_IDENTITY_STATEMENTS.map((inst) => (
              <li key={inst.slug}>
                <Link
                  href={`/library/institutional-identity/${inst.slug}`}
                  className="text-gold hover:text-gold-light"
                >
                  {inst.institutionName}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/institutional-identity" className="text-gold hover:text-gold-light">
            Identity Registry →
          </Link>
          <Link href="/library/constitution/article-i" className="text-cream-muted hover:text-gold">
            Article I →
          </Link>
        </div>
      </div>
    </>
  );
}
