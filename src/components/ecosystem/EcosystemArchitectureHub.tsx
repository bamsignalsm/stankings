import Link from "next/link";
import { EcosystemGraphView } from "@/components/ecosystem/EcosystemGraphView";
import {
  ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA,
  INSTITUTION_ADMISSION_CRITERIA,
  SHARED_INSTITUTIONAL_PRINCIPLES,
} from "@/lib/constitution/articles/article-ix";
import {
  IEP_FRAMEWORK,
  IEP_PURPOSE,
  IER_REGISTER_FIELDS,
  INSTITUTIONAL_PROFILE_FIELDS,
} from "@/lib/frameworks/institutional-ecosystem-portal";
import {
  CONSTITUTIONAL_ECOSYSTEM_PROFILES,
  getEcosystemGraph,
  getEcosystemRegisterStats,
  SHARED_PLATFORM_SERVICES,
} from "@/lib/institutional-ecosystem";
import { EXECUTIVE_DECISION_37 } from "@/lib/iki";
import { ARTICLE_IX } from "@/lib/constitution/articles/article-ix";

export function EcosystemArchitectureHub() {
  const stats = getEcosystemRegisterStats();
  const graph = getEcosystemGraph();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_IX.article} · {IEP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Ecosystem Architecture
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{IEP_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Institutions — not subsidiaries. One constitutional operating system.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_37}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Institutions", value: stats.total },
            { label: "Governance Approved", value: stats.approved },
            { label: "Live Operations", value: stats.live },
            { label: "Shared Platforms", value: stats.platforms },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-3xl text-gold">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-cream">Ecosystem Graph</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/ecosystem" className="text-gold hover:text-gold-light">
                Ecosystem Map →
              </Link>
              <Link href="/library/institution-lifecycle" className="text-gold hover:text-gold-light">
                Lifecycle →
              </Link>
              <Link href="/library/innovation-portal" className="text-gold hover:text-gold-light">
                Innovation →
              </Link>
            </div>
          </div>
          <EcosystemGraphView nodes={graph.nodes} edges={graph.edges} />
        </section>

        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Shared Platforms</p>
          <p className="mb-4 text-sm text-cream-muted">
            Constitutional nervous system — shared before duplicated.{" "}
            <Link href="/library/platforms" className="text-gold hover:text-gold-light">
              Platform Registry →
            </Link>
          </p>
          <ul className="flex flex-wrap gap-2">
            {SHARED_PLATFORM_SERVICES.map((service) => (
              <li
                key={service}
                className="rounded-full border border-gold-subtle bg-ink-muted px-3 py-1 text-xs text-cream-muted"
              >
                {service}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Institutional Ecosystem Register
          </h2>
          <p className="mb-6 text-sm text-cream-muted">
            Every institution within the Group — constitutional purpose, governance status, and ecosystem relationships.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {CONSTITUTIONAL_ECOSYSTEM_PROFILES.map((profile) => (
              <Link
                key={profile.slug}
                href={`/library/ecosystem-architecture/${profile.slug}`}
                className="group rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-2xl" style={{ color: profile.color }} aria-hidden>
                    {profile.icon}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      profile.governanceStatus === "approved"
                        ? "border-forest/40 text-forest"
                        : "border-gold/40 text-gold"
                    }`}
                  >
                    {profile.governanceStatus}
                  </span>
                </div>
                <p className="mb-1 text-xs uppercase tracking-wider text-gold">{profile.excellence}</p>
                <h3 className="mb-2 font-serif text-xl text-cream group-hover:text-gold-light">
                  {profile.name}
                </h3>
                <p className="line-clamp-2 text-sm text-cream-muted">{profile.constitutionalPurpose}</p>
                <p className="mt-3 text-xs text-cream-muted/70">
                  {profile.sharedPlatformsUsed.length} shared platforms ·{" "}
                  {profile.strengthens.length} ecosystem relationships
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Institutional Profile Fields
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {INSTITUTIONAL_PROFILE_FIELDS.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-gold/60">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Register Domains (ED 37)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {IER_REGISTER_FIELDS.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-gold/60">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Shared Principles (§ 9.03)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {SHARED_INSTITUTIONAL_PRINCIPLES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Admission Criteria (§ 9.06)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {INSTITUTION_ADMISSION_CRITERIA.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">
              Stewardship Review (§ 9.08)
            </h3>
            <ul className="space-y-1 text-sm text-cream-muted">
              {ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-ix" className="text-gold hover:text-gold-light">
            Article IX →
          </Link>
          <Link
            href="/library/frameworks/institutional-ecosystem-portal"
            className="text-gold hover:text-gold-light"
          >
            {IEP_FRAMEWORK.identifier} Framework →
          </Link>
          <Link href="/library/institutional-identity" className="text-gold hover:text-gold-light">
            Institutional Identity →
          </Link>
          <Link
            href="/library/frameworks/ecosystem-impact-assessment"
            className="text-gold hover:text-gold-light"
          >
            Ecosystem Impact Assessment →
          </Link>
        </div>
      </div>
    </>
  );
}
