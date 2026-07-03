import type { Metadata } from "next";
import Link from "next/link";
import { CompanyCard } from "@/components/CompanyCard";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { COMPANIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Companies",
  description: "Centers of Excellence across the Stankings Group ecosystem.",
};

export default function CompaniesPage() {
  const live = COMPANIES.filter((c) => c.isLive);
  const building = COMPANIES.filter((c) => !c.isLive);

  return (
    <InstitutionalPageShell
      eyebrow="Our Companies"
      title="Centers of Excellence"
      description="Stankings Group builds through specialized companies — each with its own mission, team, and operational independence."
    >
      {live.length > 0 ? (
        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl text-cream">Live platforms</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {live.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        </section>
      ) : null}

      {building.length > 0 ? (
        <section>
          <h2 className="mb-6 font-serif text-2xl text-cream">In development</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {building.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-12 text-sm text-cream-muted">
        <Link href="/careers" className="text-gold hover:text-gold-light">
          Careers at Stankings Group →
        </Link>
      </p>
    </InstitutionalPageShell>
  );
}
