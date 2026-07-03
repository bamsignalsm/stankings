import type { ReactNode } from "react";
import Link from "next/link";
import type { LessonsLearnedRecord } from "@/lib/lessons/lessons-learned-repository";

interface LessonLearnedDetailProps {
  record: LessonsLearnedRecord;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-serif text-xl font-semibold text-gold">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-cream-muted">Not yet recorded.</p>;
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

export function LessonLearnedDetail({ record }: LessonLearnedDetailProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/lessons"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Lessons Learned Registry
          </Link>
          <p className="mb-2 font-mono text-sm text-gold">{record.identifier}</p>
          <h1 className="mb-3 font-serif text-4xl font-semibold text-cream">
            {record.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-cream-muted">
            <span className="capitalize">
              {record.approvalStatus.replace("_", " ")}
            </span>
            <span>·</span>
            <span>{record.category}</span>
            <span>·</span>
            <span>Review: {record.reviewDate}</span>
            {record.approvedBy && (
              <>
                <span>·</span>
                <span>Approved by: {record.approvedBy}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <Section title="Project Summary">
          <p className="leading-relaxed text-cream-muted">{record.projectSummary}</p>
        </Section>

        <Section title="Objectives">
          <List items={record.objectives} />
        </Section>

        <Section title="Outcomes">
          <List items={record.outcomes} />
        </Section>

        <Section title="Successes">
          <List items={record.successes} />
        </Section>

        <Section title="Challenges">
          <List items={record.challenges} />
        </Section>

        <Section title="Root Causes">
          <List items={record.rootCauses} />
        </Section>

        <section className="mb-10 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Lessons Learned
          </h2>
          <List items={record.lessonsLearned} />
        </section>

        <Section title="Recommended Improvements">
          <List items={record.recommendedImprovements} />
        </Section>

        <div className="mb-10 grid gap-8 md:grid-cols-2">
          <Section title="Related Canons">
            <ul className="flex flex-wrap gap-2">
              {record.relatedCanons.map((id) => (
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

          <Section title="Teams Involved">
            <List items={record.teamsInvolved} />
          </Section>
        </div>

        {record.relatedKnowledgeObjects.length > 0 && (
          <Section title="Related Knowledge Objects">
            <ul className="space-y-2">
              {record.relatedKnowledgeObjects.map((ko) => (
                <li key={ko.identifier}>
                  <Link
                    href={ko.href}
                    className="text-sm text-gold hover:text-gold-light"
                  >
                    <span className="font-mono">{ko.identifier}</span>
                    {" — "}
                    {ko.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <div className="mt-12 flex flex-wrap gap-6 border-t border-gold-subtle pt-10 text-sm">
          <Link href="/library/canon/CANON-009" className="text-gold hover:text-gold-light">
            CANON-009 →
          </Link>
          <Link
            href="/library/frameworks/lessons-learned"
            className="text-cream-muted hover:text-gold"
          >
            LLR Framework
          </Link>
        </div>
      </div>
    </>
  );
}
