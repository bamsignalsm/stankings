import type { ReactNode } from "react";
import Link from "next/link";
import type { InstitutionalDecisionRecord } from "@/lib/decisions/institutional-decision-record";

interface DecisionRecordDetailProps {
  record: InstitutionalDecisionRecord;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-serif text-xl font-semibold text-gold">{title}</h2>
      {children}
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-sm text-cream-muted">Not yet recorded.</p>;
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function DecisionRecordDetail({ record }: DecisionRecordDetailProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/decisions"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Decision Record Registry
          </Link>
          <p className="mb-2 font-mono text-sm text-gold">{record.identifier}</p>
          <h1 className="mb-3 font-serif text-4xl font-semibold text-cream">{record.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-cream-muted">
            <span className="capitalize">{record.status}</span>
            <span>·</span>
            <span>{record.category}</span>
            <span>·</span>
            <span>Owner: {record.decisionOwner}</span>
            <span>·</span>
            <span className="capitalize">Outcome: {record.outcomeStatus.replace("_", " ")}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <Section title="Decision Statement">
          <p className="leading-relaxed text-cream-muted">{record.decisionStatement}</p>
        </Section>

        <Section title="Evidence Considered">
          <TagList items={record.evidenceConsidered} />
        </Section>

        <Section title="Alternatives Evaluated">
          <ul className="space-y-3">
            {record.alternativesEvaluated.map((alt) => (
              <li
                key={alt.option}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-cream">{alt.option}</p>
                  <span
                    className={`text-xs uppercase tracking-wider ${
                      alt.outcome === "selected" ? "text-forest" : "text-cream-muted"
                    }`}
                  >
                    {alt.outcome}
                  </span>
                </div>
                <p className="text-sm text-cream-muted">{alt.rationale}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Risks Identified">
          <TagList items={record.risksIdentified} />
        </Section>

        <Section title="Assumptions">
          <TagList items={record.assumptions} />
        </Section>

        <div className="mb-10 grid gap-8 md:grid-cols-2">
          <Section title="Canon References">
            <ul className="flex flex-wrap gap-2">
              {record.canonReferences.map((id) => (
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
          </Section>
          {record.frameworkReferences.length > 0 && (
            <Section title="Framework References">
              <ul className="flex flex-wrap gap-2">
                {record.frameworkReferences.map((id) => (
                  <li key={id}>
                    <span className="font-mono text-sm text-cream-muted">{id}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <Section title="Approval History">
          <ul className="space-y-3">
            {record.approvalHistory.map((entry, i) => (
              <li
                key={`${entry.date}-${entry.approver}-${i}`}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
              >
                <div className="mb-1 flex flex-wrap justify-between gap-2 text-sm">
                  <span className="text-cream">{entry.approver}</span>
                  <span className="text-cream-muted">{entry.date}</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-gold">
                  {entry.role} · {entry.action}
                </p>
                {entry.notes && (
                  <p className="mt-2 text-sm text-cream-muted">{entry.notes}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Expected Outcomes">
          <TagList items={record.expectedOutcomes} />
        </Section>

        <div className="mb-10 grid gap-8 md:grid-cols-2">
          <Section title="Review Date">
            <p className="font-mono text-cream-muted">{record.reviewDate}</p>
          </Section>
          {record.outcomeNotes && (
            <Section title="Outcome Notes">
              <p className="text-sm text-cream-muted">{record.outcomeNotes}</p>
            </Section>
          )}
        </div>

        <Section title="Lessons Learned">
          <TagList items={record.lessonsLearned} />
        </Section>

        <div className="flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-007" className="text-gold hover:text-gold-light">
            CANON-007 →
          </Link>
          <Link
            href="/library/frameworks/institutional-decision-record"
            className="text-cream-muted hover:text-gold"
          >
            IDR Framework
          </Link>
        </div>
      </div>
    </>
  );
}
