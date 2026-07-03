import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANIES, getCompanyBySlug } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: "Company Not Found" };
  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const related = COMPANIES.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gold-subtle py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at top left, ${company.color}, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            href="/#companies"
            className="mb-8 inline-flex items-center gap-2 text-sm text-cream-muted transition hover:text-gold"
          >
            ← All Companies
          </Link>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                {company.excellence}
              </p>
              <h1 className="mb-3 font-serif text-5xl font-semibold text-cream md:text-6xl">
                {company.name}
              </h1>
              <p className="text-xl text-cream-muted">{company.tagline}</p>
            </div>
            {company.website && (
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-gold-subtle px-5 py-2.5 text-sm text-gold transition hover:border-gold/40"
              >
                Visit {company.website} ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                  About {company.name}
                </h2>
                <p className="leading-relaxed text-cream-muted">
                  {company.description}
                </p>
              </div>
              <div>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
                  Mission
                </h2>
                <p className="leading-relaxed text-cream-muted">{company.mission}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
                  Services & Capabilities
                </h3>
                <ul className="space-y-2">
                  {company.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 text-sm text-cream-muted"
                    >
                      <span className="mt-1 text-gold" style={{ color: company.color }}>
                        •
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-lg border p-6"
                style={{
                  borderColor: `${company.color}30`,
                  backgroundColor: `${company.color}08`,
                }}
              >
                <p className="text-xs uppercase tracking-widest text-cream-muted">
                  Center of Excellence
                </p>
                <p
                  className="mt-1 font-serif text-xl font-semibold"
                  style={{ color: company.color }}
                >
                  {company.excellence}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem context */}
      <section className="border-t border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-cream">
            Part of the Stankings Ecosystem
          </h2>
          <p className="mb-8 max-w-2xl text-cream-muted">
            {company.name} operates within the Stankings Group ecosystem — sharing
            identity, trust, and institutional values while specializing in its
            unique mission. The success of one company strengthens every other.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/companies/${c.slug}`}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/30"
              >
                <p className="text-xs text-cream-muted">{c.excellence}</p>
                <p className="mt-1 font-serif text-lg font-semibold text-cream">
                  {c.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
