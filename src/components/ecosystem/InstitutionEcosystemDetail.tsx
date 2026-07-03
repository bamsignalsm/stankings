import Link from "next/link";
import type { EcosystemInstitution } from "@/lib/ecosystem/map";
import {
  getDependencyInstitutions,
  getStrengthenedInstitutions,
} from "@/lib/ecosystem/map";

function InstitutionLinkList({
  institutions,
  emptyLabel,
}: {
  institutions: EcosystemInstitution[];
  emptyLabel: string;
}) {
  if (institutions.length === 0) {
    return <p className="text-sm text-cream-muted">{emptyLabel}</p>;
  }
  return (
    <ul className="space-y-2">
      {institutions.map((inst) => (
        <li key={inst.slug}>
          <Link
            href={`/library/ecosystem/${inst.slug}`}
            className="flex items-center gap-3 rounded-lg border border-gold-subtle bg-ink-muted p-3 transition hover:border-gold/40"
          >
            <span style={{ color: inst.color }} aria-hidden>
              {inst.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-cream">{inst.name}</p>
              <p className="text-xs text-gold">{inst.excellence}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items, variant = "default" }: { items: string[]; variant?: "default" | "boundary" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={
            variant === "boundary"
              ? "rounded-full border border-burgundy/30 px-3 py-1 text-xs text-cream-muted"
              : "rounded-full border border-gold-subtle px-3 py-1 text-xs text-cream-muted"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

interface InstitutionEcosystemDetailProps {
  institution: EcosystemInstitution;
}

export function InstitutionEcosystemDetail({ institution }: InstitutionEcosystemDetailProps) {
  const strengthened = getStrengthenedInstitutions(institution.slug);
  const dependencies = getDependencyInstitutions(institution.slug);

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/ecosystem-architecture"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Ecosystem Architecture
          </Link>
          <Link
            href={`/library/ecosystem-architecture/${institution.slug}`}
            className="mb-6 ml-4 inline-block text-sm text-gold hover:text-gold-light"
          >
            Constitutional Profile →
          </Link>
          <div className="flex flex-wrap items-start gap-4">
            <span className="text-4xl" style={{ color: institution.color }} aria-hidden>
              {institution.icon}
            </span>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                {institution.excellence}
              </p>
              <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">
                {institution.name}
              </h1>
              {institution.isLive && institution.website && (
                <p className="text-sm text-cream-muted">
                  Live at{" "}
                  <a
                    href={`https://${institution.website}`}
                    className="text-gold hover:text-gold-light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {institution.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-12">
          <h2 className="mb-3 font-serif text-xl font-semibold text-gold">Mission</h2>
          <p className="leading-relaxed text-cream-muted">{institution.mission}</p>
        </section>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Strengthens</h2>
            <InstitutionLinkList
              institutions={strengthened}
              emptyLabel="No direct institutional strengthening mapped yet."
            />
          </section>
          <section>
            <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Depends on</h2>
            <InstitutionLinkList
              institutions={dependencies}
              emptyLabel="Relies primarily on shared platform services."
            />
          </section>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Core Capabilities</h2>
          <TagList items={institution.coreCapabilities} />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Shared Capabilities Contributed
          </h2>
          <TagList items={institution.sharedCapabilitiesContributed} />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Lane Boundaries</h2>
          <p className="mb-4 text-sm text-cream-muted">
            What this institution does not do — protecting ecosystem harmony.
          </p>
          <TagList items={institution.boundaries} variant="boundary" />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Shared Platform Services Consumed
          </h2>
          <TagList items={institution.platformServices} />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Customer Journeys</h2>
          <TagList items={institution.customerJourneys} />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Canon References</h2>
          <ul className="flex flex-wrap gap-3">
            {institution.canonReferences.map((id) => (
              <li key={id}>
                <Link
                  href={`/library/canon/${id}`}
                  className="font-mono text-sm text-gold hover:text-gold-light"
                >
                  {id}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link
            href={`/library/institutional-identity/${institution.slug}`}
            className="text-gold hover:text-gold-light"
          >
            Institutional Identity →
          </Link>
          <Link
            href={`/companies/${institution.slug}`}
            className="text-cream-muted hover:text-gold"
          >
            Company profile →
          </Link>
          <Link href="/library/canon/CANON-005" className="text-cream-muted hover:text-gold">
            CANON-005
          </Link>
          <Link
            href="/library/frameworks/ecosystem-impact-assessment"
            className="text-cream-muted hover:text-gold"
          >
            EIA Framework
          </Link>
        </div>
      </div>
    </>
  );
}
