import Link from "next/link";
import type { ConflictDisclosure } from "@/lib/integrity-ethics/types";

interface ConflictDisclosureDetailProps {
  disclosure: ConflictDisclosure;
}

export function ConflictDisclosureDetail({ disclosure }: ConflictDisclosureDetailProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/integrity-ethics"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Integrity & Ethics Centre
          </Link>
          <p className="font-mono text-sm text-gold">Conflict Disclosure · {disclosure.disclosureId}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-cream">{disclosure.person}</h1>
          <p className="text-cream-muted">{disclosure.role}</p>
          <span className="mt-3 inline-block rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
            {disclosure.reviewOutcome}
          </span>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 space-y-10">
        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Nature of Interest</h2>
          <p className="text-cream-muted leading-relaxed">{disclosure.natureOfInterest}</p>
          {disclosure.relatedInstitution && (
            <p className="mt-2 text-sm text-cream-muted">
              Related institution: {disclosure.relatedInstitution}
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Decisions Affected</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {disclosure.decisionsAffected.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Mitigation Measures</h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {disclosure.mitigationMeasures.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gold">Disclosed</p>
            <p className="text-cream">{disclosure.disclosedAt}</p>
          </div>
          {disclosure.reviewedAt && (
            <div>
              <p className="text-xs text-gold">Reviewed</p>
              <p className="text-cream">{disclosure.reviewedAt}</p>
            </div>
          )}
          {disclosure.boardMinutesRef && (
            <div>
              <p className="text-xs text-gold">Board Minutes</p>
              <p className="font-mono text-cream">{disclosure.boardMinutesRef}</p>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">Constitution & Canons</h2>
          <ul className="mb-4 space-y-1 text-sm text-cream-muted">
            {disclosure.constitutionArticles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {disclosure.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-gold hover:border-gold/40"
              >
                {ref}
              </Link>
            ))}
          </div>
        </section>

        <Link href="/library/constitution/article-xi" className="text-sm text-gold hover:text-gold-light">
          Article XI →
        </Link>
      </div>
    </>
  );
}
