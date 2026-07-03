import Link from "next/link";
import type { GovernanceChapterShell } from "@/lib/governance-code/types";
import { GOVERNANCE_CHAPTER_STATUS_LABELS } from "@/lib/governance-code/types";
import { GOVERNANCE_CODE_VERSION } from "@/lib/governance-code";
import { GovernanceBreadcrumbs } from "@/components/governance-code/GovernanceBreadcrumbs";
import { bookIChapterBreadcrumbs } from "@/lib/governance-code/books/book-i/breadcrumbs";

const CONSTITUTION_HREFS: Record<string, string> = {
  "CONSTITUTION-ARTICLE-I": "/library/constitution/article-i",
  "CONSTITUTION-ARTICLE-II": "/library/constitution/article-ii",
  "CONSTITUTION-ARTICLE-III": "/library/constitution/article-iii",
  "CONSTITUTION-ARTICLE-IV": "/library/constitution/article-iv",
  "CONSTITUTION-ARTICLE-V": "/library/constitution/article-v",
  "CONSTITUTION-ARTICLE-VI": "/library/constitution/article-vi",
  "CONSTITUTION-ARTICLE-VII": "/library/constitution/article-vii",
  "CONSTITUTION-ARTICLE-VIII": "/library/constitution/article-viii",
  "CONSTITUTION-ARTICLE-IX": "/library/constitution/article-ix",
  "CONSTITUTION-ARTICLE-X": "/library/constitution/article-x",
  "CONSTITUTION-ARTICLE-XI": "/library/constitution/article-xi",
  "CONSTITUTION-ARTICLE-XII": "/library/constitution/article-xii",
  "CONSTITUTION-ARTICLE-XIII": "/library/constitution/article-xiii",
  "CONSTITUTION-ARTICLE-XIV": "/library/constitution/article-xiv",
  "CONSTITUTION-ARTICLE-XV": "/library/constitution/article-xv",
  "CONSTITUTION-ARTICLE-XVI": "/library/constitution/article-xvi",
  "CONSTITUTION-ARTICLE-XVII": "/library/constitution/article-xvii",
};

function canonHref(id: string): string {
  return `/library/canon/${id}`;
}

export function GovernanceChapterShellPanel({ chapter }: { chapter: GovernanceChapterShell }) {
  const partHref = `/library/governance-code/book-i/parts/${chapter.partId}`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <GovernanceBreadcrumbs
        items={bookIChapterBreadcrumbs(
          chapter.partLabel,
          chapter.partTitle,
          partHref,
          chapter.chapter,
          chapter.title,
        )}
      />

      <div className="mb-12 rounded-lg border border-forest/30 bg-forest/10 p-6 text-sm text-cream">
        <p className="font-medium text-forest">Architecture Locked — No Content</p>
        <p className="mt-2 text-cream-muted">
          Drafting begins after the Foundational Charter is approved.
        </p>
      </div>

      <section className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded border border-gold-subtle px-2 py-1 text-[10px] uppercase tracking-wider text-gold">
            {GOVERNANCE_CHAPTER_STATUS_LABELS[chapter.status]}
          </span>
          <span className="rounded border border-forest/30 px-2 py-1 text-[10px] uppercase tracking-wider text-forest">
            Architecture Locked
          </span>
        </div>
        <p className="mb-2 font-mono text-sm text-gold">{chapter.chapter}</p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream md:text-4xl">{chapter.title}</h1>
        <p className="text-sm text-cream-muted">
          Book I — Governance Bodies · Volume II · v{GOVERNANCE_CODE_VERSION}
        </p>
      </section>

      <section className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold text-cream">Purpose</h2>
          <p className="text-sm leading-relaxed text-cream-muted">{chapter.purpose}</p>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold text-cream">Scope</h2>
          <p className="text-sm leading-relaxed text-cream-muted">{chapter.scope}</p>
          {chapter.scopeExcludes.length > 0 && (
            <>
              <p className="mb-2 mt-4 text-xs uppercase tracking-wider text-gold">Explicitly excluded</p>
              <ul className="space-y-1 text-sm text-cream-muted">
                {chapter.scopeExcludes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Builder Notes</h2>
        <ul className="space-y-2 text-sm text-cream-muted">
          {chapter.builderNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-gold">→</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {chapter.sessionHistory.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Session History</h2>
          <ul className="space-y-3">
            {chapter.sessionHistory.map((s) => (
              <li key={s.sessionId} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
                <p className="font-mono text-xs text-gold">{s.sessionId}</p>
                <Link href={s.href} className="font-serif text-cream hover:text-gold-light">
                  {s.title}
                </Link>
                <p className="text-xs text-cream-muted">{s.date}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {chapter.reviewHistory.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Review History</h2>
          <ul className="space-y-3 text-sm">
            {chapter.reviewHistory.map((r) => (
              <li key={`${r.date}-${r.phase}`} className="rounded border border-gold-subtle p-4">
                <p className="text-xs text-gold">
                  {r.date} · {r.phase}
                </p>
                <p className="text-cream-muted">{r.note}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-12 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Related Constitution</h2>
          <div className="flex flex-wrap gap-2">
            {chapter.constitutionalRefs.map((ref) => (
              <Link
                key={ref}
                href={CONSTITUTION_HREFS[ref] ?? "/library/constitution"}
                className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted hover:text-gold"
              >
                {ref.replace("CONSTITUTION-", "")}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Related Canons</h2>
          <div className="flex flex-wrap gap-2">
            {chapter.canonRefs.map((ref) => (
              <Link
                key={ref}
                href={canonHref(ref)}
                className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted hover:text-gold"
              >
                {ref}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Related Books</h2>
          <div className="flex flex-col gap-2">
            {chapter.relatedBookRefs.length === 0 ? (
              <p className="text-xs text-cream-muted">None — foundational chapter</p>
            ) : (
              chapter.relatedBookRefs.map((ref) => (
                <Link
                  key={ref.identifier}
                  href={ref.href}
                  className="text-xs text-cream-muted hover:text-gold"
                >
                  {ref.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
        <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
          ← Book I — Governance Bodies
        </Link>
        <Link href="/library/governance-code" className="text-gold hover:text-gold-light">
          Governance Code Portal →
        </Link>
      </div>
    </div>
  );
}
