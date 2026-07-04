"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import {
  CONSTITUTION_CHAPTERS,
  CONSTITUTION_INTRO,
} from "@/lib/corporate/constitution-public";

export default function ConstitutionPublicPage() {
  const [query, setQuery] = useState("");

  const chapters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CONSTITUTION_CHAPTERS;
    return CONSTITUTION_CHAPTERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-16 md:py-20 print:border-0 print:py-8">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-gold uppercase">
            Volume I
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            The Group Constitution
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-cream-muted">
            The highest internal governing document of Stankings Group — defining purpose,
            governance, leadership, platforms, and succession.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-sm border border-gold-subtle px-4 py-2 text-sm text-cream transition hover:border-gold/40"
            >
              Print version
            </button>
            <span className="rounded-sm border border-gold-subtle px-4 py-2 text-sm text-cream-muted">
              PDF download — available to verified members in The Library
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[240px_1fr]">
          <aside className="print:hidden lg:sticky lg:top-28 lg:self-start">
            <label htmlFor="constitution-search" className="sr-only">
              Search chapters
            </label>
            <input
              id="constitution-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapters…"
              className="mb-4 w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-sm text-cream placeholder:text-cream-muted/60 focus:border-gold/50 focus:outline-none"
            />
            <nav aria-label="Constitution chapters" className="max-h-[70vh] space-y-1 overflow-y-auto">
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className="block rounded-sm px-2 py-1.5 text-xs text-cream-muted transition hover:bg-ink-muted hover:text-gold"
                >
                  {chapter.title}
                </a>
              ))}
              {chapters.length === 0 ? (
                <p className="px-2 text-xs text-cream-muted">No chapters match your search.</p>
              ) : null}
            </nav>
          </aside>

          <div className="max-w-3xl space-y-12">
            {CONSTITUTION_INTRO.map((section) => (
              <article key={section.heading}>
                <h2 className="mb-3 font-serif text-2xl font-semibold text-cream">
                  {section.heading}
                </h2>
                <p className="leading-relaxed text-cream-muted">{section.body}</p>
              </article>
            ))}

            <div>
              <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
                Chapter index
              </h2>
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <article
                    key={chapter.id}
                    id={chapter.id}
                    className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-5"
                  >
                    <h3 className="font-serif text-lg text-cream">{chapter.title}</h3>
                    <p className="mt-2 text-sm text-cream-muted">{chapter.summary}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gold/30 bg-gold-subtle p-6 print:hidden">
              <h2 className="mb-2 font-serif text-xl text-cream">Authoritative text</h2>
              <p className="mb-4 text-sm text-cream-muted">
                Full constitutional text, schedules, and interpretive records are available to
                verified members in The Stankings Library.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={USER_LOGIN_PATH}
                  className="rounded-sm border border-gold bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-light"
                >
                  Sign in to read
                </Link>
                <Link
                  href="/members"
                  className="rounded-sm border border-gold-subtle px-5 py-2.5 text-sm text-cream transition hover:border-gold/40"
                >
                  Member access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
