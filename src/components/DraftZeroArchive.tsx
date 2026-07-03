import Link from "next/link";
import { SITE } from "@/lib/data";
import { DRAFT_ZERO_NOTE } from "@/lib/library";
import {
  CHAPTER_ONE_ARTICLES,
  CHAPTER_ONE_TITLE,
  CHAPTER_TWO_ARTICLES,
  CHAPTER_TWO_TITLE,
  CHAPTER_THREE_ARTICLES,
  CHAPTER_THREE_TITLE,
  FOUNDERS_COVENANT,
  FOUNDING_DECLARATION,
  PREAMBLE,
} from "@/lib/constitution";
import { ChapterNav, ChapterSection } from "@/components/constitution-ui";

export function DraftZeroArchive() {
  return (
    <>
      <section className="border-b border-gold-subtle bg-amber-400/5 py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-amber-400">
            Archived — Draft Zero
          </p>
          <p className="text-sm leading-relaxed text-cream-muted">
            {DRAFT_ZERO_NOTE} This document is preserved for reference only.
            The active Constitution is{" "}
            <Link href="/library/constitution" className="text-gold">
              Volume I — Version 1.0
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold/60">
            Draft Zero · Archived
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            The Stankings Group Constitution
          </h1>
          <p className="text-cream-muted">Chapters 1–3 · Pre-Library restructuring</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 rounded-lg border border-gold-subtle bg-ink-muted p-5 text-sm">
              <ChapterNav chapterId="chapter-one" label="Chapter One" articles={CHAPTER_ONE_ARTICLES} />
              <ChapterNav chapterId="chapter-two" label="Chapter Two" articles={CHAPTER_TWO_ARTICLES} />
              <ChapterNav chapterId="chapter-three" label="Chapter Three" articles={CHAPTER_THREE_ARTICLES} />
            </nav>
          </aside>

          <article className="min-w-0 opacity-90">
            <section id="preamble" className="mb-16 scroll-mt-28">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Preamble</h2>
              <div className="space-y-4 leading-relaxed text-cream-muted">
                {PREAMBLE.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>

            <section className="mb-16 border-t border-gold-subtle pt-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Founding Declaration</h2>
              <div className="space-y-4 leading-relaxed text-cream-muted">
                {FOUNDING_DECLARATION.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>

            <ChapterSection
              id="chapter-one"
              chapterLabel="Chapter One"
              title={CHAPTER_ONE_TITLE}
              intro="Archived draft."
              articles={CHAPTER_ONE_ARTICLES}
            />
            <ChapterSection
              id="chapter-two"
              chapterLabel="Chapter Two"
              title={CHAPTER_TWO_TITLE}
              intro="Relocated to Volume II — The Charter in Draft One. Archived here for reference."
              articles={CHAPTER_TWO_ARTICLES}
            />
            <ChapterSection
              id="chapter-three"
              chapterLabel="Chapter Three"
              title={CHAPTER_THREE_TITLE}
              intro="Archived draft."
              articles={CHAPTER_THREE_ARTICLES}
            />

            <section className="mb-16 border-t border-gold-subtle pt-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Founder&apos;s Covenant</h2>
              <div className="rounded-lg border border-gold/30 bg-gold-subtle p-8">
                <div className="space-y-4 leading-relaxed text-cream">
                  {FOUNDERS_COVENANT.split("\n\n").map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                <p className="mt-6 text-sm text-cream-muted">— {SITE.founder}</p>
              </div>
            </section>

            <Link href="/library" className="text-sm text-gold hover:text-gold-light">
              ← Back to The Stankings Library
            </Link>
          </article>
        </div>
      </div>
    </>
  );
}
