import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANIES } from "@/lib/data";
import { getCompanyProfile } from "@/lib/corporate/company-profiles";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyProfile(slug);
  if (!company) return { title: "Company Not Found" };
  return buildPageMetadata({
    title: company.name,
    description: company.description,
    path: `/companies/${slug}`,
  });
}

const STATUS_LABEL: Record<string, string> = {
  operating: "Operating",
  in_development: "In development",
  institutional: "Institutional",
};

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyProfile(slug);
  if (!company) notFound();

  const related = COMPANIES.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden border-b border-gold-subtle py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at top left, ${company.color}, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            href="/companies"
            className="mb-8 inline-flex items-center gap-2 text-sm text-cream-muted transition hover:text-gold"
          >
            ← All companies
          </Link>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium tracking-[0.3em] text-gold uppercase">
                {company.excellence}
              </p>
              <h1 className="mb-3 font-serif text-5xl font-semibold text-cream md:text-6xl">
                {company.name}
              </h1>
              <p className="text-sm text-cream-muted">{company.legalName}</p>
              <p className="mt-1 text-xs tracking-widest text-gold uppercase">
                {company.businessSectorLabel}
              </p>
              <p className="mt-3 text-xl text-cream-muted">{company.tagline}</p>
              <p className="mt-4 text-sm text-cream-muted">
                Status:{" "}
                <span className="text-cream">{STATUS_LABEL[company.statusLabel]}</span>
                {" · "}
                {company.statusDescription}
              </p>
            </div>
            {company.website ? (
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-gold-subtle px-5 py-2.5 text-sm text-gold transition hover:border-gold/40"
              >
                Visit {company.website} ↗
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">Mission</h2>
                <p className="leading-relaxed text-cream-muted">{company.mission}</p>
              </div>
              {company.strategicRole ? (
                <div>
                  <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                    Strategic role
                  </h2>
                  <p className="leading-relaxed text-cream-muted">{company.strategicRole}</p>
                </div>
              ) : null}
              {company.nameMeaning ? (
                <div>
                  <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                    Corporate meaning
                  </h2>
                  <p className="leading-relaxed text-cream-muted">{company.nameMeaning}</p>
                </div>
              ) : null}
              {company.flagshipProducts && company.flagshipProducts.length > 0 ? (
                <div>
                  <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                    Flagship products
                  </h2>
                  <ul className="space-y-2">
                    {company.flagshipProducts.map((item) => (
                      <li key={item} className="flex gap-2 text-cream-muted">
                        <span className="text-gold">◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                  Area of operation
                </h2>
                <p className="leading-relaxed text-cream-muted">{company.areaOfOperation}</p>
              </div>
              <div>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                  Relationship to Stankings HQ
                </h2>
                <p className="leading-relaxed text-cream-muted">{company.relationshipToHq}</p>
              </div>
              <div>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                  Forward programme
                </h2>
                <ul className="space-y-2">
                  {company.roadmap.map((item) => (
                    <li key={item} className="flex gap-2 text-cream-muted">
                      <span className="text-gold">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-4 text-xs font-semibold tracking-widest text-gold uppercase">
                  Services
                </h3>
                <ul className="space-y-2">
                  {company.services.map((service) => (
                    <li key={service} className="flex items-start gap-2 text-sm text-cream-muted">
                      <span className="mt-1 text-gold" style={{ color: company.color }}>
                        •
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6 text-sm">
                <h3 className="mb-3 text-xs font-semibold tracking-widest text-gold uppercase">
                  Resources
                </h3>
                <ul className="space-y-2 text-cream-muted">
                  {company.website ? (
                    <li>
                      Domain:{" "}
                      <a
                        href={`https://${company.website}`}
                        className="text-gold hover:text-gold-light"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {company.website}
                      </a>
                    </li>
                  ) : (
                    <li>Domain: Operated under stankings.com</li>
                  )}
                  <li>
                    <Link href={company.supportPath} className="text-gold hover:text-gold-light">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href={company.legalPath} className="text-gold hover:text-gold-light">
                      Legal
                    </Link>
                  </li>
                  <li>
                    <Link href={company.privacyPath} className="text-gold hover:text-gold-light">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Part of Stankings Legacy Ltd
          </h2>
          <p className="mb-8 max-w-2xl text-cream-muted">
            {company.name} operates within Stankings Legacy Ltd — sharing institutional identity and
            governance standards while remaining operationally independent.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/companies/${c.slug}`}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/30"
              >
                <p className="text-xs text-cream-muted">{c.excellence}</p>
                <p className="mt-1 font-serif text-lg font-semibold text-cream">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
