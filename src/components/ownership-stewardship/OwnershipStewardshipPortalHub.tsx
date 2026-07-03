import Link from "next/link";
import {
  GOVERNANCE_ARCHITECTURE_STACK,
  OASP_FRAMEWORK,
  OASP_PURPOSE,
  OWNERSHIP_LAYER_FIELDS,
} from "@/lib/frameworks/ownership-stewardship-portal";
import {
  CONSTITUTIONAL_OWNER_DUTIES,
  GENERATIONAL_STEWARDSHIP_PRINCIPLES,
  ARTICLE_VIII,
} from "@/lib/constitution/articles/article-viii";
import {
  getOwnershipStewardshipStats,
  GOVERNANCE_ARCHITECTURE_REGISTER,
  LEGAL_LAYER_PLACEHOLDERS,
  OWNERSHIP_STRUCTURE_OVERVIEW,
} from "@/lib/ownership-stewardship";
import { EXECUTIVE_DECISION_36 } from "@/lib/iki";

export function OwnershipStewardshipPortalHub() {
  const stats = getOwnershipStewardshipStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_VIII.article} · {OASP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Ownership & Stewardship
          </h1>
          <p className="text-cream-muted">{OASP_PURPOSE}</p>
          <blockquote className="mt-8 rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            A responsibility to be preserved — not an asset to be consumed.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_36}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Governance Architecture Stack</h2>
          <ol className="mx-auto max-w-md space-y-1 text-center text-sm text-cream-muted">
            {GOVERNANCE_ARCHITECTURE_STACK.map((layer, i) => (
              <li key={layer.layer}>
                {i > 0 && <span className="block text-gold/40">↓</span>}
                <span className={layer.access === "constitutional" ? "font-medium text-cream" : undefined}>
                  {layer.layer}
                </span>
                <span className="block text-xs text-cream-muted/70">{layer.nature}</span>
                {"status" in layer && (
                  <span className="text-xs uppercase tracking-wider text-gold">({layer.status})</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Ownership Layer</h2>
          <ul className="mb-8 grid gap-2 sm:grid-cols-2">
            {OWNERSHIP_LAYER_FIELDS.map((field) => (
              <li
                key={field}
                className="rounded border border-gold-subtle bg-ink-muted px-4 py-2 text-sm text-cream-muted"
              >
                {field}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
            Constitutional Ownership Duties
          </h3>
          <ul className="mb-6 space-y-2 text-sm text-cream-muted">
            {CONSTITUTIONAL_OWNER_DUTIES.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {d}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Generational Stewardship</h3>
          <ul className="space-y-2 text-sm text-cream-muted">
            {GENERATIONAL_STEWARDSHIP_PRINCIPLES.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Ownership Structure Overview</h2>
          <ul className="space-y-4">
            {OWNERSHIP_STRUCTURE_OVERVIEW.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-serif text-lg text-cream">{item.title}</p>
                  <span className="rounded border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                    {item.legalStatus}
                  </span>
                </div>
                <p className="mb-2 text-sm text-cream-muted">{item.summary}</p>
                <p className="text-xs text-gold">{item.constitutionalPrinciple}</p>
                <p className="mt-2 text-xs text-cream-muted">Steward: {item.steward}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Governance Architecture Register
          </h2>
          <div className="mb-6 flex flex-wrap gap-4 text-sm text-cream-muted">
            <span>{stats.garEntries} domains</span>
            <span>{stats.constitutional} constitutional</span>
            <span>{stats.legal} legal</span>
            <span className="text-forest">{stats.active} active</span>
          </div>
          <ul className="space-y-4">
            {GOVERNANCE_ARCHITECTURE_REGISTER.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs text-gold">{entry.domain}</p>
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      entry.access === "constitutional"
                        ? "border-forest/30 text-forest"
                        : "border-burgundy/30 text-burgundy/90"
                    }`}
                  >
                    {entry.access}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                    {entry.status}
                  </span>
                </div>
                <p className="text-sm text-cream-muted">{entry.description}</p>
                {entry.legalNote && (
                  <p className="mt-2 text-xs italic text-cream-muted/80">{entry.legalNote}</p>
                )}
                {entry.constitutionalLink && (
                  <Link
                    href={entry.constitutionalLink}
                    className="mt-2 inline-block text-sm text-gold hover:text-gold-light"
                  >
                    View layer →
                  </Link>
                )}
                {entry.relatedObjects.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-3 text-xs">
                    {entry.relatedObjects.map((obj) => (
                      <li key={obj.title}>
                        {obj.href ? (
                          <Link href={obj.href} className="text-gold hover:text-gold-light">
                            {obj.title}
                          </Link>
                        ) : (
                          obj.title
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 rounded-lg border border-burgundy/30 bg-burgundy/5 p-6">
          <h2 className="mb-2 font-serif text-xl font-semibold text-cream">Legal Layer</h2>
          <p className="mb-4 text-sm text-cream-muted">
            Restricted to authorized governance users. Constitutional philosophy is public; legal
            mechanics are implemented under applicable law with qualified counsel.
          </p>
          <ul className="space-y-2 text-sm text-cream-muted">
            {LEGAL_LAYER_PLACEHOLDERS.map((item) => (
              <li key={item.item} className="flex flex-wrap items-center justify-between gap-2 rounded border border-gold-subtle/50 px-3 py-2">
                <span>{item.item}</span>
                <span className="text-xs uppercase tracking-wider text-burgundy/80">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs italic text-cream-muted/70">
            Trust Deed, corporate structure, and shareholding records will be linked here upon formal
            establishment — not published as constitutional text.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-viii" className="text-gold hover:text-gold-light">
            Article VIII →
          </Link>
          <Link href="/library/governance/constitutional-owner" className="text-cream-muted hover:text-gold">
            Constitutional Owner →
          </Link>
          <Link href="/library/stewardship" className="text-cream-muted hover:text-gold">
            Stewardship Portal →
          </Link>
          <Link
            href="/library/frameworks/ownership-stewardship-portal"
            className="text-cream-muted hover:text-gold"
          >
            OASP Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
