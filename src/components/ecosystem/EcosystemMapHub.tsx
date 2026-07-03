import Link from "next/link";
import {
  ECOSYSTEM_INSTITUTIONS,
  SHARED_PLATFORM_SERVICES,
} from "@/lib/ecosystem/map";

export function EcosystemMapHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-005 · Institutional Architecture · Article IX
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Ecosystem Map
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Ten centres of excellence connected by one institutional nervous system.
            Every institution has its lane — explore missions, capabilities, and relationships.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-16 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            Shared Platform Services
          </p>
          <p className="mb-4 text-sm text-cream-muted">
            The institutional nervous system — shared before duplicated.{" "}
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

        <section className="mb-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-cream">
              Operating Institutions
            </h2>
            <Link
              href="/library/frameworks/ecosystem-impact-assessment"
              className="text-sm text-gold hover:text-gold-light"
            >
              Ecosystem Impact Assessment →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {ECOSYSTEM_INSTITUTIONS.map((inst) => (
              <Link
                key={inst.slug}
                href={`/library/ecosystem/${inst.slug}`}
                className="group rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-2xl" style={{ color: inst.color }} aria-hidden>
                    {inst.icon}
                  </span>
                  {inst.isLive && (
                    <span className="rounded-full border border-forest/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-forest">
                      Live
                    </span>
                  )}
                </div>
                <p className="mb-1 text-xs uppercase tracking-wider text-gold">{inst.excellence}</p>
                <h3 className="mb-2 font-serif text-xl text-cream group-hover:text-gold-light">
                  {inst.name}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-cream-muted">{inst.mission}</p>
                <div className="flex flex-wrap gap-3 text-xs text-cream-muted">
                  <span>
                    Strengthens{" "}
                    <span className="font-mono text-gold">{inst.strengthens.length}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Depends on{" "}
                    <span className="font-mono text-gold">{inst.dependsOn.length}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Journeys{" "}
                    <span className="font-mono text-gold">{inst.customerJourneys.length}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/ecosystem-architecture" className="text-gold hover:text-gold-light">
            Ecosystem Architecture Portal →
          </Link>
          <Link href="/library/constitution/article-ix" className="text-gold hover:text-gold-light">
            Article IX →
          </Link>
          <Link href="/library/canon/CANON-005" className="text-cream-muted hover:text-gold">
            CANON-005
          </Link>
          <Link href="/library/frameworks/ecosystem-impact-assessment" className="text-cream-muted hover:text-gold">
            EIA
          </Link>
        </div>
      </div>
    </>
  );
}
