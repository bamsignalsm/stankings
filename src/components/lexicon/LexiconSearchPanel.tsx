"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LexiconAlphabetBucket, LexiconTerm } from "@/lib/lexicon-engine/types";
import { getLexiconTermHref } from "@/lib/lexicon-engine/hrefs";

interface LexiconSearchPanelProps {
  terms: LexiconTerm[];
  initialQuery?: string;
}

function scoreLocal(term: LexiconTerm, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  let score = 0;
  if (term.term.toLowerCase() === q) score += 100;
  else if (term.term.toLowerCase().includes(q)) score += 60;
  if (term.slug.replace(/-/g, " ").includes(q)) score += 40;
  const text = [term.definition, ...term.paragraphs].join(" ").toLowerCase();
  if (text.includes(q)) score += 25;
  if (term.synonyms.some((s) => s.toLowerCase().includes(q))) score += 20;
  if (term.searchKeywords.some((k) => k.toLowerCase().includes(q))) score += 15;
  return score;
}

export function LexiconSearchPanel({ terms, initialQuery = "" }: LexiconSearchPanelProps) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return terms.filter((t) => t.status === "approved");
    return terms
      .map((t) => ({ term: t, score: scoreLocal(t, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.term);
  }, [terms, query]);

  return (
    <div>
      <label htmlFor="lexicon-search" className="sr-only">
        Search the Lexicon
      </label>
      <input
        id="lexicon-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms, definitions, or synonyms…"
        className="mb-8 w-full rounded-sm border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
        autoComplete="off"
      />

      <p className="mb-4 text-xs uppercase tracking-widest text-cream-muted">
        {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : `${results.length} approved terms`}
      </p>

      <ul className="space-y-3">
        {results.map((term) => (
          <li key={term.slug}>
            <Link
              href={getLexiconTermHref(term.slug)}
              className="group block rounded-lg border border-gold-subtle bg-ink-muted p-4 transition hover:border-gold/30"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-serif text-lg font-semibold text-gold group-hover:text-gold-light">
                  {term.term}
                </span>
                <span className="font-mono text-[10px] text-cream-muted">{term.identifier}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-cream-muted">{term.definition}</p>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-center text-sm text-cream-muted">
            No terms match. New terms must be proposed and approved before use — see
            Editor-in-Chief Decision No. 3.
          </li>
        )}
      </ul>
    </div>
  );
}

interface LexiconAlphabetNavProps {
  buckets: LexiconAlphabetBucket[];
  activeLetter?: string;
}

export function LexiconAlphabetNav({ buckets, activeLetter }: LexiconAlphabetNavProps) {
  return (
    <nav aria-label="Alphabetical index" className="mb-10">
      <div className="flex flex-wrap justify-center gap-1">
        {buckets.map((bucket) => {
          const hasTerms = bucket.terms.length > 0;
          const isActive = activeLetter === bucket.letter;
          return (
            <a
              key={bucket.letter}
              href={hasTerms ? `#letter-${bucket.letter}` : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-sm text-sm font-medium transition ${
                hasTerms
                  ? isActive
                    ? "bg-gold text-ink"
                    : "border border-gold-subtle text-gold hover:border-gold/40 hover:bg-gold/10"
                  : "cursor-default text-cream-muted/25"
              }`}
              aria-disabled={!hasTerms}
            >
              {bucket.letter}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
