import Link from "next/link";
import { SITE } from "@/lib/data";
import {
  CHAPTER_ONE_ARTICLES,
  CHAPTER_ONE_TITLE,
  CHAPTER_THREE_ARTICLES,
  CHAPTER_THREE_TITLE,
  FOUNDING_DECLARATION,
  PREAMBLE,
} from "@/lib/constitution";
import { getVolumeBySlug } from "@/lib/library";
import type { KnowledgeObject } from "@/lib/standards/ls-001";
import { ChapterNav, ChapterSection } from "@/components/constitution-ui";
import { KnowledgeMetadataPanel } from "@/components/library-engine/KnowledgeObjectCard";
import { VolumeOpeningQuote } from "@/components/VolumeOpeningQuote";

const VOLUME = getVolumeBySlug("constitution");

interface ConstitutionDraftOneProps {
  canon: KnowledgeObject | null;
}

export function ConstitutionDraftOne({ canon }: ConstitutionDraftOneProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Volume I · Draft One Archive
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream md:text-5xl">
            The Constitution
          </h1>
          <p className="mb-4 text-lg italic text-gold/90">Pre-v1.0 working text</p>
          <p className="text-cream-muted">
            Archived for reference. The authoritative Constitution is{" "}
            <Link href="/library/constitution" className="text-gold hover:text-gold-light">
              Volume I Version 1.0
            </Link>
            .
          </p>
          <p className="mt-4 text-sm text-cream-muted/70">Founder: {SITE.founder}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-gold-subtle bg-ink-muted p-5 text-sm">
              <ul className="space-y-3">
                <li>
                  <a href="#volume-quote" className="text-cream-muted hover:text-gold">
                    Volume quote
                  </a>
                </li>
                <li>
                  <a href="#preamble" className="text-cream-muted hover:text-gold">
                    Preamble
                  </a>
                </li>
                <li>
                  <a href="#founding-declaration" className="text-cream-muted hover:text-gold">
                    Founding Declaration
                  </a>
                </li>
                <li className="pt-2">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gold">
                    Part I only
                  </p>
                </li>
                <ChapterNav chapterId="chapter-one" label="Chapter One" articles={CHAPTER_ONE_ARTICLES} />
                <ChapterNav chapterId="chapter-three" label="Chapter Three" articles={CHAPTER_THREE_ARTICLES} />
                <li className="text-xs text-cream-muted/50">Chapter Four — Trust (planned)</li>
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-5 text-sm text-cream-muted">
              Philosophy lives in{" "}
              <Link href="/library/first-principles" className="text-gold hover:text-gold-light">
                Volume 0
              </Link>
              . This volume is law — interpreted in light of{" "}
              <Link href="/library/canon" className="text-gold hover:text-gold-light">
                CANON-001
              </Link>
              . Structured per{" "}
              <Link href="/library/standards/ls-001" className="text-gold hover:text-gold-light">
                LS-001
              </Link>
              .
            </div>

            {canon && (
              <div className="mb-8">
                <KnowledgeMetadataPanel ko={canon} compact />
              </div>
            )}

            {VOLUME?.openingQuote && (
              <div id="volume-quote" className="scroll-mt-28">
                <VolumeOpeningQuote quote={VOLUME.openingQuote} />
              </div>
            )}

            <section id="preamble" className="mb-16 scroll-mt-28 border-t border-gold-subtle pt-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Preamble</h2>
              <div className="space-y-4 leading-relaxed text-cream-muted">
                {PREAMBLE.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>

            <section id="founding-declaration" className="mb-16 scroll-mt-28 border-t border-gold-subtle pt-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">The Founding Declaration</h2>
              <div className="space-y-4 leading-relaxed text-cream-muted">
                {FOUNDING_DECLARATION.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>

            <section id="purpose" className="mb-16 scroll-mt-28 border-t border-gold-subtle pt-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Our Purpose</h2>
              <div className="space-y-6">
                <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Mission</h3>
                  <p className="text-cream-muted">{SITE.mission}</p>
                </div>
                <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Vision</h3>
                  <p className="text-cream-muted">{SITE.vision}</p>
                </div>
                <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Motto</h3>
                  <p className="font-serif text-lg italic text-cream">&ldquo;{SITE.motto}&rdquo;</p>
                </div>
              </div>
            </section>

            <section id="part-i" className="mb-8 scroll-mt-28 border-t border-gold-subtle pt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Part I</p>
              <h2 className="font-serif text-2xl font-semibold text-cream">Foundational Principles</h2>
            </section>

            <ChapterSection
              id="chapter-one"
              chapterLabel="Chapter One"
              title={CHAPTER_ONE_TITLE}
              intro="What Stankings Group is — without brand names."
              articles={CHAPTER_ONE_ARTICLES}
            />

            <div className="mb-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <p className="text-sm text-cream-muted">
                <span className="text-gold">Chapter Two</span> moved to{" "}
                <Link href="/library/volumes/charter" className="text-gold hover:text-gold-light">
                  Volume II — The Charter
                </Link>
                .
              </p>
            </div>

            <ChapterSection
              id="chapter-three"
              chapterLabel="Chapter Three"
              title={CHAPTER_THREE_TITLE}
              intro="Why Stankings Group builds companies at all."
              articles={CHAPTER_THREE_ARTICLES}
            />

            <div className="border-t border-gold-subtle pt-8">
              <Link href="/library" className="text-sm text-gold hover:text-gold-light">
                ← Back to The Stankings Library
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
