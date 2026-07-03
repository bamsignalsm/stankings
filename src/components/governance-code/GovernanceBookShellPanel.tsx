import Link from "next/link";
import type { GovernanceBook } from "@/lib/governance-code/types";
import {
  GOVERNANCE_BOOK_STATUS_LABELS,
  GOVERNANCE_CHAPTER_STATUS_LABELS,
} from "@/lib/governance-code/types";
import { GOVERNANCE_CODE_VERSION } from "@/lib/governance-code";
import {
  BOOK_I_CENTRAL_QUESTION,
  BOOK_I_SCOPE_EXCLUDES,
  BOOK_I_SCOPE_INCLUDES,
} from "@/lib/governance-code/books/book-i/chapters";
import { BOOK_I_PARTS } from "@/lib/governance-code/books/book-i/parts";
import { getBookIChaptersByPart } from "@/lib/governance-code/books/book-i/chapters";
import { GovernanceBreadcrumbs } from "@/components/governance-code/GovernanceBreadcrumbs";
import { GovernanceMapDiagram } from "@/components/governance-code/GovernanceMapDiagram";
import { bookIBreadcrumbs } from "@/lib/governance-code/books/book-i/breadcrumbs";

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

export function GovernanceCodeStackDiagram() {
  return (
    <ol className="space-y-1 font-mono text-xs text-cream-muted">
      {["Canons", "Constitution", "Governance Code", "Policies", "Engineering Standards", "Daily Operations"].map(
        (layer, i) => (
          <li key={layer} className="flex items-center gap-2">
            {i > 0 && <span className="text-gold">↓</span>}
            <span className={layer === "Governance Code" ? "text-gold" : ""}>{layer}</span>
          </li>
        ),
      )}
    </ol>
  );
}

export function GovernanceBookShellPanel({ book }: { book: GovernanceBook }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {book.status === "architecture_locked" ? (
        <div className="mb-12 rounded-lg border border-forest/30 bg-forest/10 p-6 text-sm text-cream">
          <p className="font-medium text-forest">Architecture Locked</p>
          <p className="mt-2 text-cream-muted">
            Book → Foundational Charter → Parts → Chapters → Sections. Foundational Charter v1.0 — editorial review.
            No chapter prose until the Charter is approved.
          </p>
        </div>
      ) : book.status === "architecture_review" ? (
        <div className="mb-12 rounded-lg border border-amber-400/25 bg-amber-400/10 p-6 text-sm text-amber-100">
          <p className="font-medium text-amber-200">Architecture Review</p>
          <p className="mt-2 text-amber-100/90">
            Ten-chapter architecture proposed. Review, refine, and approve before drafting Chapter 1.
            No governance text until architecture is formally approved.
          </p>
        </div>
      ) : book.locked ? (
        <div className="mb-12 rounded-lg border border-amber-400/25 bg-amber-400/10 p-6 text-sm text-amber-100">
          <p className="font-medium text-amber-200">Planning (Locked)</p>
          <p className="mt-2 text-amber-100/90">
            This Book shell exists for architecture only. Chapter content will be added only after
            editorial approval. Executive Decision No. 48 — nothing enters the Library without an
            architecture.
          </p>
        </div>
      ) : null}

      <section className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded border border-gold-subtle px-2 py-1 text-[10px] uppercase tracking-wider text-gold">
            {GOVERNANCE_BOOK_STATUS_LABELS[book.status]}
          </span>
          {book.locked && (
            <span className="rounded border border-amber-400/30 px-2 py-1 text-[10px] uppercase tracking-wider text-amber-200">
              Locked
            </span>
          )}
        </div>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream md:text-4xl">
          {book.book} — {book.title}
        </h1>
        <p className="text-sm text-cream-muted">Volume II · v{GOVERNANCE_CODE_VERSION}</p>
      </section>

      {book.id === "book-i" && (
        <>
          <GovernanceBreadcrumbs items={bookIBreadcrumbs([])} />
          <section className="mb-12">
            <GovernanceMapDiagram />
          </section>
          <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-gold">Foundational Charter</p>
                <p className="text-sm text-cream-muted">
                  The governing introduction — orient before you study Parts and Chapters.
                </p>
              </div>
              <Link
                href="/library/governance-code/book-i/foundational-charter"
                className="text-sm text-gold hover:text-gold-light"
              >
                View Foundational Charter v1.0 →
              </Link>
            </div>
          </section>
        </>
      )}

      {book.id === "book-i" && (
        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6">
          <p className="mb-2 text-xs uppercase tracking-wider text-gold">The Question Book I Must Answer</p>
          <p className="font-serif text-xl text-cream">{BOOK_I_CENTRAL_QUESTION}</p>
          <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-gold">In scope</p>
              <p className="text-cream-muted">{BOOK_I_SCOPE_INCLUDES}</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-gold">Out of scope</p>
              <ul className="space-y-1 text-cream-muted">
                {BOOK_I_SCOPE_EXCLUDES.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold text-cream">Overview</h2>
          <p className="text-sm leading-relaxed text-cream-muted">{book.overview}</p>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold text-cream">Purpose</h2>
          <p className="text-sm leading-relaxed text-cream-muted">{book.purpose}</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
          {book.id === "book-i" ? "Parts & Chapters" : "Chapters"}
        </h2>
        <p className="mb-4 text-sm text-cream-muted">
          {book.id === "book-i"
            ? "Four Parts, ten Chapters — architectural placeholders only."
            : "Chapter titles are architectural placeholders. Content is not generated until approved."}
        </p>
        {book.id === "book-i" ? (
          <div className="space-y-8">
            {BOOK_I_PARTS.map((part) => (
              <div key={part.id}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-mono text-sm text-gold">{part.part}</p>
                    <h3 className="font-serif text-lg text-cream">
                      <Link href={part.href} className="hover:text-gold-light">
                        {part.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-cream-muted">{part.subtitle}</p>
                  </div>
                  <Link href={part.href} className="text-xs text-gold hover:text-gold-light">
                    View Part →
                  </Link>
                </div>
                <div className="overflow-hidden rounded-lg border border-gold-subtle">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gold-subtle bg-ink-muted text-left text-xs uppercase tracking-wider text-gold">
                        <th className="px-4 py-3">Chapter</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getBookIChaptersByPart(part.id).map((ch) => (
                        <tr key={ch.id} className="border-b border-gold-subtle/50 text-cream-muted">
                          <td className="px-4 py-3 font-mono text-xs text-gold">{ch.chapter}</td>
                          <td className="px-4 py-3">
                            <Link href={ch.href} className="text-cream hover:text-gold-light">
                              {ch.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-xs uppercase tracking-wider">
                            {GOVERNANCE_CHAPTER_STATUS_LABELS[ch.status]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="overflow-hidden rounded-lg border border-gold-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-muted text-left text-xs uppercase tracking-wider text-gold">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Chapter</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {book.chapters.map((ch) => (
                <tr key={ch.id} className="border-b border-gold-subtle/50 text-cream-muted">
                  <td className="px-4 py-3 font-mono text-xs text-gold">{ch.chapter}</td>
                  <td className="px-4 py-3">
                    {book.id === "book-i" ? (
                      <Link href={ch.href} className="text-cream hover:text-gold-light">
                        {ch.title}
                      </Link>
                    ) : (
                      <span className="text-cream">{ch.title}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs uppercase tracking-wider">
                    {GOVERNANCE_CHAPTER_STATUS_LABELS[ch.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Builder Notes</h2>
        <ul className="space-y-2 text-sm text-cream-muted">
          {book.builderNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-gold">→</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {book.sessionHistory.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Session History</h2>
          <ul className="space-y-3">
            {book.sessionHistory.map((s) => (
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

      {book.reviewHistory.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Review History</h2>
          <ul className="space-y-3 text-sm">
            {book.reviewHistory.map((r) => (
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
            {book.constitutionalRefs.map((ref) => (
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
            {book.canonRefs.map((ref) => (
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
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Knowledge Objects</h2>
          <div className="flex flex-col gap-2">
            {book.knowledgeObjectRefs.map((ko) => (
              <Link
                key={ko.identifier}
                href={ko.href}
                className="text-xs text-cream-muted hover:text-gold"
              >
                {ko.identifier}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
        <Link href="/library/governance-code" className="text-gold hover:text-gold-light">
          ← Governance Code Portal
        </Link>
        <Link href="/library/constitution" className="text-gold hover:text-gold-light">
          Volume I — Constitution →
        </Link>
        <Link href="/library/editorial-standards/editorial-workflow" className="text-gold hover:text-gold-light">
          Editorial Workflow →
        </Link>
      </div>
    </div>
  );
}
