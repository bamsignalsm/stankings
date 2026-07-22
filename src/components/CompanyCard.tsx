import Link from "next/link";
import type { Company } from "@/lib/data";
import { BUSINESS_SECTOR_LABELS, type BusinessSector } from "@/lib/shared/company/registry";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const sectorLabel =
    BUSINESS_SECTOR_LABELS[company.businessSector as BusinessSector] ?? company.businessSector;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gold-subtle bg-ink-muted p-6 transition-all duration-300 hover:border-gold/40 hover:bg-ink-light">
      <div
        className="absolute top-0 left-0 h-1 w-full opacity-60 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: company.color }}
      />
      <div className="mb-4 flex items-start justify-between gap-2">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-lg"
          style={{
            backgroundColor: `${company.color}15`,
            color: company.color,
          }}
        >
          {company.icon}
        </span>
        <div className="flex flex-col items-end gap-1">
          {company.isLive && (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-400">
              Live
            </span>
          )}
          <span className="text-right text-[10px] uppercase tracking-widest text-cream-muted/60">
            {sectorLabel}
          </span>
        </div>
      </div>
      <Link href={`/companies/${company.slug}`}>
        <h3 className="mb-1 font-serif text-xl font-semibold text-cream group-hover:text-gold-light">
          {company.name}
        </h3>
        <p className="mb-1 text-xs text-cream-muted/70">{company.legalName}</p>
        <p className="mb-4 text-sm text-cream-muted">{company.tagline}</p>
      </Link>
      <div className="mt-auto flex flex-wrap items-center gap-3">
        <Link
          href={`/companies/${company.slug}`}
          className="text-xs text-gold/80 transition-colors group-hover:text-gold"
        >
          Learn more →
        </Link>
        {company.website && (
          <a
            href={`https://${company.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cream-muted transition hover:text-cream"
          >
            {company.website} ↗
          </a>
        )}
      </div>
    </div>
  );
}
