"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LLR_PROJECT_CATEGORIES,
  getAllLessonsLearnedRecords,
  searchLessonsLearned,
  type LLRProjectCategory,
} from "@/lib/lessons/lessons-learned-repository";

export function LessonsLearnedHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<LLRProjectCategory | "all">("all");

  const records = useMemo(() => {
    let results = searchLessonsLearned(query);
    if (category !== "all") {
      results = results.filter((r) => r.category === category);
    }
    return results;
  }, [query, category]);

  const allRecords = getAllLessonsLearnedRecords();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-009 · Institutional Learning
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Lessons Learned Registry
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Experience transformed into institutional knowledge — searchable,
            cross-referenced, and available to future teams.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1 space-y-4">
            <input
              type="search"
              placeholder="Search lessons, canons, teams…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream outline-none transition focus:border-gold/50"
            />
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as LLRProjectCategory | "all")
              }
              className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-sm text-cream outline-none"
            >
              <option value="all">All categories</option>
              {LLR_PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <Link
            href="/library/frameworks/lessons-learned"
            className="shrink-0 text-sm text-gold hover:text-gold-light"
          >
            LLR Framework →
          </Link>
        </div>

        <p className="mb-6 text-sm text-cream-muted">
          {records.length} of {allRecords.length} record
          {allRecords.length !== 1 ? "s" : ""}
          {query || category !== "all" ? " matching filters" : ""}
        </p>

        <div className="space-y-4">
          {records.map((record) => (
            <Link
              key={record.identifier}
              href={`/library/lessons/${record.identifier}`}
              className="group block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <p className="font-mono text-xs text-gold">{record.identifier}</p>
                <span className="text-xs uppercase tracking-wider text-cream-muted">
                  {record.approvalStatus.replace("_", " ")}
                </span>
              </div>
              <h2 className="mb-2 font-serif text-xl text-cream group-hover:text-gold-light">
                {record.title}
              </h2>
              <p className="mb-4 line-clamp-2 text-sm text-cream-muted">
                {record.projectSummary}
              </p>
              <div className="flex flex-wrap gap-2">
                {record.relatedCanons.map((id) => (
                  <span
                    key={id}
                    className="rounded-sm bg-ink px-2 py-0.5 font-mono text-[10px] text-gold"
                  >
                    {id}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-cream-muted">
                <span>{record.category}</span>
                <span>·</span>
                <span>Review: {record.reviewDate}</span>
                <span>·</span>
                <span>{record.lessonsLearned.length} lessons captured</span>
              </div>
            </Link>
          ))}

          {records.length === 0 && (
            <p className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-center text-sm text-cream-muted">
              No records match your search. Adjust filters or consult the LLR
              Framework for how to submit new lessons.
            </p>
          )}
        </div>

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
          <Link href="/library/decisions" className="text-cream-muted hover:text-gold">
            Decision Records
          </Link>
        </div>
      </div>
    </>
  );
}
