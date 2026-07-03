import Link from "next/link";
import type { DepartmentExcellenceStandard } from "@/lib/excellence/standards";

interface ExcellenceStandardDetailProps {
  standard: DepartmentExcellenceStandard;
}

function TagList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-cream-muted">None recorded yet.</p>;
  }
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ExcellenceStandardDetail({ standard }: ExcellenceStandardDetailProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/excellence"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Standards of Excellence
          </Link>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            {standard.excellenceLane}
          </p>
          <h1 className="mb-3 font-serif text-4xl font-semibold text-cream">{standard.name}</h1>
          <p className="text-sm text-cream-muted">Audit: {standard.auditFrequency}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Standards of Excellence</h2>
          <TagList items={standard.standardsOfExcellence} />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Key Performance Indicators
          </h2>
          <ul className="space-y-2">
            {standard.kpis.map((kpi) => (
              <li
                key={kpi.label}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3"
              >
                <span className="text-sm text-cream-muted">{kpi.label}</span>
                <span className="font-mono text-sm text-gold">{kpi.target}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Quality Checklist</h2>
          <TagList items={standard.qualityChecklist} />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Continuous Improvement Plan
          </h2>
          <TagList items={standard.continuousImprovementPlan} />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Lessons Learned</h2>
          <TagList items={standard.lessonsLearned} />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Canon References</h2>
          <ul className="flex flex-wrap gap-3">
            {standard.canonReferences.map((id) => (
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
          {standard.companySlug && (
            <Link
              href={`/companies/${standard.companySlug}`}
              className="text-gold hover:text-gold-light"
            >
              Company profile →
            </Link>
          )}
          <Link href="/library/canon/CANON-008" className="text-cream-muted hover:text-gold">
            CANON-008
          </Link>
          <Link href="/library/frameworks/excellence" className="text-cream-muted hover:text-gold">
            Excellence Framework
          </Link>
        </div>
      </div>
    </>
  );
}
