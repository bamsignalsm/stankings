import type { ReactNode } from "react";
import Link from "next/link";
import type { InstitutionalIdentityStatement } from "@/lib/institutional-identity/types";

function FieldSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 border-b border-gold-subtle/50 pb-10 last:border-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{label}</h2>
      <div className="text-cream-muted">{children}</div>
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-gold-subtle px-3 py-1 text-sm text-cream-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

interface InstitutionIdentityPageProps {
  identity: InstitutionalIdentityStatement;
}

export function InstitutionIdentityPage({ identity }: InstitutionIdentityPageProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library/institutional-identity"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Institutional Identity
          </Link>
          <div className="flex flex-wrap items-start gap-4">
            <span className="text-4xl" style={{ color: identity.color }} aria-hidden>
              {identity.icon}
            </span>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.3em] text-gold">
                Institutional Identity Statement · {identity.excellence}
              </p>
              <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">
                {identity.institutionName}
              </h1>
              <p className="text-sm text-cream-muted">
                FRAMEWORK-IIS-001 · Constitution Article I · Status: {identity.status}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <FieldSection label="Founded">
          <p className="text-lg text-cream">{identity.founded}</p>
        </FieldSection>

        <FieldSection label="Purpose">
          <p className="text-lg leading-relaxed text-cream">{identity.purpose}</p>
        </FieldSection>

        <FieldSection label="Mission">
          <p className="text-lg leading-relaxed text-cream">{identity.mission}</p>
        </FieldSection>

        <FieldSection label="Core Capabilities">
          <TagList items={identity.coreCapabilities} />
        </FieldSection>

        <FieldSection label="Shared Platforms Used">
          <TagList items={identity.sharedPlatformsUsed} />
        </FieldSection>

        <FieldSection label="Institutions Strengthened">
          {identity.institutionsStrengthened.length > 0 ? (
            <ul className="space-y-2">
              {identity.institutionsStrengthened.map((name) => (
                <li key={name} className="text-cream">
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic">Primarily strengthens shared platform capability.</p>
          )}
        </FieldSection>

        <FieldSection label="Primary Customers">
          <TagList items={identity.primaryCustomers} />
        </FieldSection>

        <FieldSection label="Institutional Purpose Statement">
          <p className="mb-4 text-xs text-cream-muted">Article II § 2.06 — Board-reviewed alignment</p>
          <p className="text-lg leading-relaxed text-cream">{identity.institutionPurposeStatement}</p>
        </FieldSection>

        <FieldSection label="Constitution Articles">
          <ul className="space-y-1">
            {[
              ...identity.constitutionArticles,
              ...(identity.constitutionArticlesII ?? []),
              ...(identity.constitutionArticlesIII ?? []),
            ].map((art) => (
              <li key={art}>
                <Link
                  href={
                    art.startsWith("Art. III")
                      ? "/library/constitution/article-iii"
                      : art.startsWith("Art. II")
                        ? "/library/constitution/article-ii"
                        : "/library/constitution/article-i"
                  }
                    className="text-gold hover:text-gold-light"
                  >
                    {art}
                </Link>
              </li>
            ))}
          </ul>
        </FieldSection>

        <FieldSection label="Canon References">
          <ul className="flex flex-wrap gap-3">
            {identity.canonReferences.map((id) => (
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
        </FieldSection>

        <FieldSection label="Strategic Role">
          <p className="text-lg leading-relaxed text-cream">{identity.strategicRole}</p>
        </FieldSection>

        <FieldSection label="Long-Term Vision">
          <p className="text-lg leading-relaxed italic text-cream">{identity.longTermVision}</p>
        </FieldSection>

        <FieldSection label="Stewardship Responsibilities">
          <ul className="space-y-3">
            {identity.stewardshipResponsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-cream-muted">
                <span className="text-gold/60">—</span>
                {item}
              </li>
            ))}
          </ul>
        </FieldSection>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link
            href={`/library/ecosystem/${identity.slug}`}
            className="text-gold hover:text-gold-light"
          >
            Ecosystem Map →
          </Link>
          <Link href={`/companies/${identity.slug}`} className="text-cream-muted hover:text-gold">
            Company profile →
          </Link>
          <Link href="/library/constitution/article-i" className="text-cream-muted hover:text-gold">
            Article I →
          </Link>
          <Link href="/library/constitution/article-ii" className="text-cream-muted hover:text-gold">
            Article II →
          </Link>
        </div>
      </div>
    </>
  );
}
