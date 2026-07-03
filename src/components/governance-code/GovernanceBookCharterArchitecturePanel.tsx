"use client";

import Link from "next/link";
import { useState } from "react";
import { GovernanceBreadcrumbs } from "@/components/governance-code/GovernanceBreadcrumbs";
import { GovernanceMapDiagram } from "@/components/governance-code/GovernanceMapDiagram";
import { bookICharterBreadcrumbs } from "@/lib/governance-code/books/book-i/breadcrumbs";
import {
  BOOK_I_BOOK_STATUS_FIELDS,
  BOOK_I_CHARTER_META,
  BOOK_I_CHARTER_SECTIONS,
  BOOK_I_READING_GUIDE_ARCHITECTURE,
  BOOK_I_RELATED_RESOURCES,
} from "@/lib/governance-code/books/book-i/charter-architecture";
import { BOOK_I_PARTS } from "@/lib/governance-code/books/book-i/parts";
import { getBookIChaptersByPart } from "@/lib/governance-code/books/book-i/chapters";

function CharterSectionPanel({
  sectionId,
  number,
  title,
  description,
  fields,
  children,
  defaultOpen = false,
}: {
  sectionId: string;
  number: number;
  title: string;
  description: string;
  fields: string[];
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={sectionId} className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted print:break-inside-avoid">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left print:pointer-events-none"
        aria-expanded={open}
      >
        <div>
          <p className="mb-1 font-mono text-xs text-gold">
            Section {number} · Architecture only
          </p>
          <h2 className="font-serif text-xl font-semibold text-cream">{title}</h2>
          <p className="mt-1 text-sm text-cream-muted">{description}</p>
        </div>
        <span className="shrink-0 text-gold print:hidden">{open ? "−" : "+"}</span>
      </button>
      <div className={`border-t border-gold-subtle px-5 pb-5 pt-4 ${open ? "block" : "hidden print:block"}`}>
        <p className="mb-3 text-xs uppercase tracking-wider text-gold">Fields to draft</p>
        <ul className="mb-4 space-y-1 text-sm text-cream-muted">
          {fields.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
        <div className="rounded border border-dashed border-gold-subtle/60 bg-ink p-4 text-sm text-cream-muted">
          <p className="mb-2 text-xs uppercase tracking-wider text-amber-200/90">Not drafted</p>
          {children ?? (
            <p>Charter prose for this section will be written after architecture approval.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function GovernanceBookCharterArchitecturePanel() {
  const meta = BOOK_I_CHARTER_META;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 print:max-w-none print:px-8 print:py-8 print:text-black">
      <GovernanceBreadcrumbs items={bookICharterBreadcrumbs()} />

      <div className="mb-8 rounded-lg border border-amber-400/25 bg-amber-400/10 p-6 text-sm print:border print:bg-white print:text-black">
        <p className="font-medium text-amber-200 print:text-black">Book Charter Architecture Review</p>
        <p className="mt-2 text-amber-100/90 print:text-black">
          {meta.principle} Nine sections defined. No charter prose drafted.
        </p>
      </div>

      <header className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">Book Charter</p>
        <h1 className="mb-2 font-serif text-3xl font-semibold text-cream print:text-black md:text-4xl">
          {meta.bookLabel} — {meta.bookTitle}
        </h1>
        <p className="text-sm text-cream-muted print:text-gray-700">
          Architecture v{meta.architectureVersion} · {meta.sectionCount} sections · Draft:{" "}
          {meta.draftStatus.replace("_", " ")}
        </p>
      </header>

      <section className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 print:border print:bg-gray-50">
        <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
          Problem this Charter solves
        </p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-cream print:text-black">
          {meta.problemStatement}
        </p>
        <p className="mt-4 font-serif italic text-gold print:text-gray-800">
          Charter question: {meta.centralQuestion}
        </p>
      </section>

      <div className="sticky top-20 z-10 mb-8 rounded-lg border border-gold-subtle bg-ink/95 p-4 backdrop-blur print:static print:border print:bg-white">
        <GovernanceMapDiagram />
      </div>

      <nav
        aria-label="Charter sections"
        className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-4 print:hidden"
      >
        <p className="mb-3 text-xs uppercase tracking-wider text-gold">Nine Sections</p>
        <ol className="grid gap-2 sm:grid-cols-3">
          {BOOK_I_CHARTER_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-cream-muted hover:text-gold-light">
                {s.number}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-4">
        <CharterSectionPanel
          sectionId="purpose"
          number={1}
          title="Purpose"
          description={BOOK_I_CHARTER_SECTIONS[0].description}
          fields={BOOK_I_CHARTER_SECTIONS[0].fields}
        />

        <CharterSectionPanel
          sectionId="scope"
          number={2}
          title="Scope"
          description={BOOK_I_CHARTER_SECTIONS[1].description}
          fields={BOOK_I_CHARTER_SECTIONS[1].fields}
        />

        <CharterSectionPanel
          sectionId="constitutional-authority"
          number={3}
          title="Constitutional Authority"
          description={BOOK_I_CHARTER_SECTIONS[2].description}
          fields={BOOK_I_CHARTER_SECTIONS[2].fields}
        />

        <CharterSectionPanel
          sectionId="governance-philosophy"
          number={4}
          title="Governance Philosophy"
          description={BOOK_I_CHARTER_SECTIONS[3].description}
          fields={BOOK_I_CHARTER_SECTIONS[3].fields}
        />

        <CharterSectionPanel
          sectionId="governance-map"
          number={5}
          title="Governance Map"
          description={BOOK_I_CHARTER_SECTIONS[4].description}
          fields={BOOK_I_CHARTER_SECTIONS[4].fields}
        >
          <p className="mb-4">Map component rendered above (sticky anchor). Print export via browser print.</p>
          <GovernanceMapDiagram />
        </CharterSectionPanel>

        <CharterSectionPanel
          sectionId="book-structure"
          number={6}
          title="Book Structure"
          description={BOOK_I_CHARTER_SECTIONS[5].description}
          fields={BOOK_I_CHARTER_SECTIONS[5].fields}
        >
          <div className="space-y-4 font-mono text-xs text-cream">
            {BOOK_I_PARTS.map((part, i) => (
              <div key={part.id}>
                {i > 0 && <p className="mb-2 text-gold">↓</p>}
                <p className="text-gold">{part.part}</p>
                <p className="text-cream">{part.title}</p>
                <ul className="mt-2 space-y-1 text-cream-muted">
                  {getBookIChaptersByPart(part.id).map((ch) => (
                    <li key={ch.id}>
                      <Link href={ch.href} className="hover:text-gold-light">
                        {ch.chapter} — {ch.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CharterSectionPanel>

        <CharterSectionPanel
          sectionId="reading-guide"
          number={7}
          title="Reading Guide"
          description={BOOK_I_CHARTER_SECTIONS[6].description}
          fields={BOOK_I_CHARTER_SECTIONS[6].fields}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-subtle text-left text-xs uppercase tracking-wider text-gold">
                <th className="py-2 pr-4">Audience</th>
                <th className="py-2">Recommended path (architecture)</th>
              </tr>
            </thead>
            <tbody>
              {BOOK_I_READING_GUIDE_ARCHITECTURE.map((row) => (
                <tr key={row.audience} className="border-b border-gold-subtle/40 text-cream-muted">
                  <td className="py-3 pr-4 text-cream">{row.audience}</td>
                  <td className="py-3">{row.recommendedPath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CharterSectionPanel>

        <CharterSectionPanel
          sectionId="related-resources"
          number={8}
          title="Related Library Resources"
          description={BOOK_I_CHARTER_SECTIONS[7].description}
          fields={BOOK_I_CHARTER_SECTIONS[7].fields}
        >
          <ul className="space-y-2">
            {BOOK_I_RELATED_RESOURCES.map((r) => (
              <li key={r.identifier}>
                <Link href={r.href} className="text-gold hover:text-gold-light">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </CharterSectionPanel>

        <CharterSectionPanel
          sectionId="book-status"
          number={9}
          title="Book Status"
          description={BOOK_I_CHARTER_SECTIONS[8].description}
          fields={BOOK_I_CHARTER_SECTIONS[8].fields}
          defaultOpen
        >
          <dl className="grid gap-3 sm:grid-cols-2">
            {BOOK_I_BOOK_STATUS_FIELDS.map((row) => (
              <div key={row.field} className="rounded border border-gold-subtle p-3">
                <dt className="text-xs uppercase tracking-wider text-gold">{row.field}</dt>
                <dd className="mt-1 text-sm text-cream">{row.value}</dd>
              </div>
            ))}
          </dl>
        </CharterSectionPanel>
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm print:mt-8">
        <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
          ← Book I Overview
        </Link>
        <Link
          href="/library/editorial-standards/publishing-standard"
          className="text-gold hover:text-gold-light"
        >
          Library Publishing Standard →
        </Link>
      </div>
    </div>
  );
}
