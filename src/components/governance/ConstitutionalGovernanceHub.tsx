import Link from "next/link";
import {
  CGOV_FRAMEWORK,
  CGOV_PURPOSE,
  CONSTITUTIONAL_GOVERNANCE_HIERARCHY,
  RESERVED_POWERS_REGISTER,
} from "@/lib/frameworks/constitutional-governance-portal";
import { GOVERNANCE_BODY_PROFILES, getGovernanceStats } from "@/lib/governance";
import { EXECUTIVE_DECISION_32 } from "@/lib/iki";
import { ARTICLE_IV } from "@/lib/constitution/articles/article-iv";

const TYPE_ORDER = ["board", "ceo", "executive-leadership", "committee", "owner"] as const;

export function ConstitutionalGovernanceHub() {
  const stats = getGovernanceStats();
  const sorted = [...GOVERNANCE_BODY_PROFILES].sort(
    (a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type),
  );

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_IV.article} · {CGOV_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Governance
          </h1>
          <p className="text-cream-muted">{CGOV_PURPOSE}</p>
          <blockquote className="mt-8 rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Power should always have a boundary.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Constitutional Hierarchy
          </h2>
          <ol className="mx-auto max-w-xs space-y-1 text-center text-sm text-cream-muted">
            {CONSTITUTIONAL_GOVERNANCE_HIERARCHY.map((layer, i) => (
              <li key={layer}>
                {i > 0 && <span className="block text-gold/40">↓</span>}
                <span className={i <= 1 ? "font-medium text-cream" : undefined}>{layer}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm italic text-cream-muted">
            Nobody governs above the Constitution.
          </p>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_32}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Reserved Powers Register</h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {RESERVED_POWERS_REGISTER.map((power) => (
              <li key={power} className="flex gap-2">
                <span className="text-burgundy/80">■</span>
                {power}
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-cream-muted">
          <span>{stats.total} governance bodies</span>
          <span className="text-forest">{stats.active} active</span>
          <span>{stats.reservedPowers} reserved powers</span>
        </div>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Governance Bodies</h2>
          <ul className="space-y-4">
            {sorted.map((body) => (
              <li key={body.slug}>
                <Link
                  href={`/library/governance/${body.slug}`}
                  className="block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
                >
                  <p className="text-xs uppercase tracking-wider text-gold">{body.type.replace(/-/g, " ")}</p>
                  <p className="font-serif text-lg text-cream">{body.name}</p>
                  <p className="text-sm text-cream-muted">{body.subtitle}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-iv" className="text-gold hover:text-gold-light">
            Article IV →
          </Link>
          <Link href="/library/constitutional-alignment" className="text-cream-muted hover:text-gold">
            Constitutional Alignment →
          </Link>
          <Link
            href="/library/frameworks/constitutional-governance-portal"
            className="text-cream-muted hover:text-gold"
          >
            CGOV Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
