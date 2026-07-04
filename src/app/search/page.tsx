"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchHeader, EmptyStateUi } from "@/components/ui";
import { searchDocuments, type SearchCategory } from "@/lib/search";

const CATEGORY_LABEL: Record<SearchCategory, string> = {
  page: "Page",
  company: "Company",
  policy: "Policy",
  documentation: "Documentation",
  resource: "Resource",
  download: "Download",
  trust: "Trust",
  legal: "Legal",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchDocuments(query), [query]);

  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-gold uppercase">Search</p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Find institutional resources
          </h1>
          <p className="mb-8 text-lg text-cream-muted">
            Search documentation, companies, policies, resources, and public pages.
          </p>
          <SearchHeader
            value={query}
            onChange={setQuery}
            placeholder="Search policies, companies, support…"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          {results.length === 0 ? (
            <EmptyStateUi
              title="No results"
              body="Try a different term — for example trust, privacy, BamSignal, or careers."
            />
          ) : (
            <ul className="space-y-3">
              {results.map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={doc.href}
                    className="block rounded-lg border border-gold-subtle bg-ink-muted p-4 transition hover:border-gold/40"
                  >
                    <p className="text-xs tracking-widest text-gold uppercase">
                      {CATEGORY_LABEL[doc.category]}
                    </p>
                    <h2 className="mt-1 font-serif text-xl text-cream">{doc.title}</h2>
                    <p className="mt-1 text-sm text-cream-muted">{doc.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
