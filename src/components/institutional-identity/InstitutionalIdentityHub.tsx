import Link from "next/link";
import { INSTITUTIONAL_IDENTITY_STATEMENTS } from "@/lib/institutional-identity";
import { IIS_FRAMEWORK, IIS_REQUIRED_FIELDS } from "@/lib/frameworks/institutional-identity-statement";
import { EXECUTIVE_DECISION_29 } from "@/lib/iki";
import { ARTICLE_I } from "@/lib/constitution/articles/article-i";

export function InstitutionalIdentityHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {IIS_FRAMEWORK.identifier} · Constitution {ARTICLE_I.article}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Institutional Identity
          </h1>
          <p className="text-cream-muted">
            Identity explicit rather than assumed — every institution in the ecosystem answers the
            same constitutional questions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <p className="mb-3 text-xs uppercase tracking-widest text-gold">
            Executive Decision No. 29
          </p>
          <p className="text-sm leading-relaxed text-cream">{EXECUTIVE_DECISION_29}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Required Fields</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {IIS_REQUIRED_FIELDS.map((field) => (
              <li
                key={field}
                className="rounded border border-gold-subtle bg-ink-muted px-4 py-2 text-sm text-cream-muted"
              >
                {field}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Ecosystem Institutions
          </h2>
          <ul className="space-y-4">
            {INSTITUTIONAL_IDENTITY_STATEMENTS.map((inst) => (
              <li key={inst.slug}>
                <Link
                  href={`/library/institutional-identity/${inst.slug}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl" style={{ color: inst.color }} aria-hidden>
                      {inst.icon}
                    </span>
                    <div>
                      <p className="font-serif text-lg text-cream">{inst.institutionName}</p>
                      <p className="text-xs text-gold">{inst.excellence}</p>
                    </div>
                  </div>
                  <span className="rounded border border-forest/30 bg-forest/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-forest">
                    {inst.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-i" className="text-gold hover:text-gold-light">
            Article I →
          </Link>
          <Link href="/library/ecosystem" className="text-cream-muted hover:text-gold">
            Ecosystem Map →
          </Link>
          <Link
            href="/library/frameworks/institutional-identity-statement"
            className="text-cream-muted hover:text-gold"
          >
            IIS Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
