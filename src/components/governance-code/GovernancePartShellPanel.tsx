import Link from "next/link";
import type { GovernanceBookPart } from "@/lib/governance-code/types";
import { GOVERNANCE_CHAPTER_STATUS_LABELS } from "@/lib/governance-code/types";
import { GovernanceBreadcrumbs } from "@/components/governance-code/GovernanceBreadcrumbs";
import { bookIPartBreadcrumbs } from "@/lib/governance-code/books/book-i/breadcrumbs";
import { getBookIChaptersByPart } from "@/lib/governance-code/books/book-i/chapters";

export function GovernancePartShellPanel({ part }: { part: GovernanceBookPart }) {
  const chapters = getBookIChaptersByPart(part.id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <GovernanceBreadcrumbs
        items={bookIPartBreadcrumbs(part.part, part.title, part.href)}
      />

      <section className="mb-12">
        <p className="mb-2 font-mono text-sm text-gold">{part.part}</p>
        <h1 className="mb-2 font-serif text-3xl font-semibold text-cream md:text-4xl">{part.title}</h1>
        <p className="text-sm text-cream-muted">{part.subtitle}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Chapters</h2>
        <div className="space-y-3">
          {chapters.map((ch) => (
            <article
              key={ch.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gold-subtle bg-ink-muted p-4"
            >
              <div>
                <p className="font-mono text-xs text-gold">{ch.chapter}</p>
                <Link href={ch.href} className="font-serif text-lg text-cream hover:text-gold-light">
                  {ch.title}
                </Link>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                {GOVERNANCE_CHAPTER_STATUS_LABELS[ch.status]}
              </span>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
        <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
          ← Book I — Governance Bodies
        </Link>
        <Link href="/library/governance-code/book-i/foundational-charter" className="text-gold hover:text-gold-light">
          Foundational Charter →
        </Link>
      </div>
    </div>
  );
}
