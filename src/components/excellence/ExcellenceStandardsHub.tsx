import Link from "next/link";
import { getAllDepartmentExcellence } from "@/lib/excellence/standards";

export function ExcellenceStandardsHub() {
  const departments = getAllDepartmentExcellence();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-008 · Culture in Practice
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Standards of Excellence
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Every department defines what excellent looks like — KPIs, checklists, improvement
            plans, and audit discipline. Not micromanagement. Repeatable excellence.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <p className="text-sm text-cream-muted">
            {departments.length} documented standard{departments.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/library/frameworks/excellence"
            className="text-sm text-gold hover:text-gold-light"
          >
            Excellence Framework →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/library/excellence/${dept.slug}`}
              className="group rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
            >
              <p className="mb-1 text-xs uppercase tracking-wider text-gold">
                {dept.excellenceLane}
              </p>
              <h2 className="mb-3 font-serif text-xl text-cream group-hover:text-gold-light">
                {dept.name}
              </h2>
              <p className="mb-4 line-clamp-2 text-sm text-cream-muted">
                {dept.standardsOfExcellence[0]}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-cream-muted">
                <span>{dept.kpis.length} KPIs</span>
                <span>·</span>
                <span>{dept.qualityChecklist.length} checklist items</span>
                <span>·</span>
                <span>Audit: {dept.auditFrequency.split("·")[0]?.trim()}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-008" className="text-gold hover:text-gold-light">
            CANON-008 →
          </Link>
          <Link href="/library/frameworks/excellence" className="text-cream-muted hover:text-gold">
            Excellence Framework
          </Link>
        </div>
      </div>
    </>
  );
}
