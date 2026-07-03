import Link from "next/link";
import {
  CHAPTER_EDUCATION_CORE_LAYERS,
  CHAPTER_EDUCATION_FOOTER_BLOCKS,
  CHAPTER_EDUCATION_PRINCIPLE,
} from "@/lib/editorial/chapter-education";
import { EDITOR_DECISION_54 } from "@/lib/editorial/decisions";
import { CEF_FRAMEWORK } from "@/lib/frameworks/chapter-education";
import { BOOK_I_CHAPTER_01_ARCHITECTURE_HREF } from "@/lib/governance-code/books/book-i/chapters/chapter-01-architecture";

export function ChapterEducationStandardHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Editorial Standards · {CEF_FRAMEWORK.shortId} · {CEF_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Chapter Education Standard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{CHAPTER_EDUCATION_PRINCIPLE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EDITOR_DECISION_54}
        </blockquote>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Core Layers</h2>
          <ol className="space-y-2 text-sm text-cream-muted">
            {CHAPTER_EDUCATION_CORE_LAYERS.map((layer, i) => (
              <li key={layer}>
                {i + 1}. {layer}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Chapter Footer Blocks (Locked)</h2>
          <ol className="space-y-2 text-sm text-cream-muted">
            {CHAPTER_EDUCATION_FOOTER_BLOCKS.map((block, i) => (
              <li key={block}>
                {i + 1}. {block}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">First Implementation</h2>
          <p className="mb-4 text-sm text-cream-muted">
            Chapter 1 — Constitutional Governance Structure adopts CEF-001 in architecture review.
          </p>
          <Link href={BOOK_I_CHAPTER_01_ARCHITECTURE_HREF} className="text-sm text-gold hover:text-gold-light">
            View Chapter 1 Architecture →
          </Link>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/editorial-standards" className="text-gold hover:text-gold-light">
            ← Editorial Standards
          </Link>
          <Link
            href="/library/editorial-standards/foundational-charter"
            className="text-gold hover:text-gold-light"
          >
            FC-001 Standard →
          </Link>
        </div>
      </div>
    </>
  );
}
