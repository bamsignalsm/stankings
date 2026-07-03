import Link from "next/link";
import type { InstitutionLifecycleRecord } from "@/lib/institution-lifecycle/types";
import { STAGE_LABELS } from "@/lib/institution-lifecycle";

function TagList({ items, emptyLabel }: { items: string[]; emptyLabel?: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-cream-muted">{emptyLabel ?? "None recorded."}</p>;
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-cream-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-gold">{title}</h2>
      {children}
    </section>
  );
}

interface InstitutionLifecycleDetailProps {
  record: InstitutionLifecycleRecord;
}

export function InstitutionLifecycleDetail({ record }: InstitutionLifecycleDetailProps) {
  const isConcluded = record.currentStage === "responsible_conclusion";

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/institution-lifecycle"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Institution Lifecycle Registry
          </Link>
          <div className="flex flex-wrap items-start gap-4">
            <span className="text-4xl" style={{ color: record.color }} aria-hidden>
              {record.icon}
            </span>
            <div className="flex-1">
              <p className="font-mono text-xs text-cream-muted">{record.institutionId}</p>
              <p className="mb-1 text-xs uppercase tracking-wider text-gold">{record.excellence}</p>
              <h1 className="mb-2 font-serif text-3xl font-semibold text-cream md:text-4xl">
                {record.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    isConcluded ? "border-burgundy/40 text-burgundy" : "border-gold/40 text-gold"
                  }`}
                >
                  {STAGE_LABELS[record.currentStage]}
                </span>
                <span className="rounded-full border border-gold-subtle px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream-muted">
                  Charter: {record.charterStatus}
                </span>
                {record.isLive && (
                  <span className="rounded-full border border-forest/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-forest">
                    Live
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <Section title="Constitutional Purpose">
          <p className="leading-relaxed text-cream-muted">{record.constitutionalPurpose}</p>
        </Section>

        <Section title="Lifecycle Timeline">
          <div className="grid gap-3 sm:grid-cols-3">
            {record.dateProposed && (
              <div className="rounded border border-gold-subtle bg-ink-muted p-3">
                <p className="text-[10px] uppercase tracking-wider text-gold">Proposed</p>
                <p className="text-sm text-cream">{record.dateProposed}</p>
              </div>
            )}
            {record.dateApproved && (
              <div className="rounded border border-gold-subtle bg-ink-muted p-3">
                <p className="text-[10px] uppercase tracking-wider text-gold">Approved</p>
                <p className="text-sm text-cream">{record.dateApproved}</p>
              </div>
            )}
            {record.launchDate && (
              <div className="rounded border border-gold-subtle bg-ink-muted p-3">
                <p className="text-[10px] uppercase tracking-wider text-gold">Launch</p>
                <p className="text-sm text-cream">{record.launchDate}</p>
              </div>
            )}
          </div>
          <ol className="mt-6 space-y-3 border-l border-gold/20 pl-4">
            {record.milestones.map((m) => (
              <li key={`${m.date}-${m.event}`} className="text-sm">
                <span className="font-mono text-xs text-gold">{m.date}</span>
                <span className="mx-2 text-cream-muted/40">·</span>
                <span className="text-cream">{m.event}</span>
                {m.note && <p className="mt-1 text-xs text-cream-muted">{m.note}</p>}
              </li>
            ))}
          </ol>
        </Section>

        {record.closureArchive && (
          <Section title="Closure Archive">
            <div className="rounded-lg border border-burgundy/30 bg-burgundy/5 p-6">
              <p className="mb-2 text-sm text-cream">
                <span className="text-gold">Concluded:</span> {record.closureArchive.conclusionDate}
              </p>
              <p className="mb-4 text-sm text-cream-muted">{record.closureArchive.reason}</p>
              {record.closureArchive.decisionRecord && (
                <p className="mb-3 font-mono text-xs text-gold">
                  Decision: {record.closureArchive.decisionRecord}
                </p>
              )}
              <p className="mb-2 text-xs uppercase tracking-wider text-gold">Knowledge Preserved</p>
              <TagList items={record.closureArchive.knowledgePreserved} />
            </div>
          </Section>
        )}

        <Section title="Institutional Charter">
          {record.charterHref ? (
            <Link href={record.charterHref} className="text-gold hover:text-gold-light">
              View Charter ({record.charterStatus}) →
            </Link>
          ) : (
            <p className="text-sm text-cream-muted">Charter in development.</p>
          )}
        </Section>

        <Section title="Shared Platforms">
          <TagList items={record.sharedPlatforms} emptyLabel="No shared platforms." />
        </Section>

        <Section title="APIs">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-gold">Published</p>
              <TagList items={record.apisPublished} emptyLabel="None." />
            </div>
            <div>
              <p className="mb-2 text-xs text-gold">Consumed</p>
              <TagList items={record.apisConsumed} emptyLabel="None." />
            </div>
          </div>
        </Section>

        <Section title="Constitution Articles">
          <ul className="space-y-1 text-sm text-cream-muted">
            {record.constitutionArticles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>

        <Section title="Canon References">
          <div className="flex flex-wrap gap-2">
            {record.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-gold hover:border-gold/40"
              >
                {ref}
              </Link>
            ))}
          </div>
        </Section>

        {record.lessonsLearned.length > 0 && (
          <Section title="Lessons Learned">
            <ul className="space-y-2 text-sm text-cream-muted">
              {record.lessonsLearned.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="text-gold/60">—</span>
                  {l}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {record.renewalHistory.length > 0 && (
          <Section title="Renewal History">
            <ul className="space-y-1 text-sm text-cream-muted">
              {record.renewalHistory.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Knowledge Objects">
          <ul className="space-y-2">
            {record.knowledgeObjects.map((ko) => (
              <li key={ko.title}>
                {ko.href ? (
                  <Link href={ko.href} className="text-sm text-gold hover:text-gold-light">
                    {ko.title}
                  </Link>
                ) : (
                  <span className="text-sm text-cream-muted">{ko.title}</span>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          {!isConcluded && record.slug !== "bambet" && (
            <Link
              href={`/library/ecosystem-architecture/${record.slug}`}
              className="text-gold hover:text-gold-light"
            >
              Ecosystem Profile →
            </Link>
          )}
          <Link href="/library/innovation-portal" className="text-gold hover:text-gold-light">
            Innovation Portal →
          </Link>
          <Link href="/library/constitution/article-x" className="text-gold hover:text-gold-light">
            Article X →
          </Link>
        </div>
      </div>
    </>
  );
}
