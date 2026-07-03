"use client";

import { useState } from "react";
import Link from "next/link";
import { ConceptualDecisionFlowDiagram } from "@/components/governance-code/ConceptualDecisionFlowDiagram";
import { GovernanceBreadcrumbs } from "@/components/governance-code/GovernanceBreadcrumbs";
import { GovernanceChapterEducationFooter } from "@/components/governance-code/GovernanceChapterEducationFooter";
import { InstitutionalGovernanceHierarchyDiagram } from "@/components/governance-code/InstitutionalGovernanceHierarchyDiagram";
import { SourcesOfAuthorityDiagram } from "@/components/governance-code/SourcesOfAuthorityDiagram";
import { bookIChapterBreadcrumbs } from "@/lib/governance-code/books/book-i/breadcrumbs";
import {
  BOOK_I_CHAPTER_01_CONTENT_RULES,
  BOOK_I_CHAPTER_01_FOOTER_ARCHITECTURE,
  BOOK_I_CHAPTER_01_OBJECTIVES,
  BOOK_I_CHAPTER_01_PROBLEM_STATEMENT,
  BOOK_I_CHAPTER_01_PUBLICATION_STATUS,
  BOOK_I_CHAPTER_01_SECTIONS,
  BOOK_I_CHAPTER_01_SUMMARY_POINTS,
  BOOK_I_CHAPTER_01_ARCHITECTURE_VERSION,
  BOOK_I_CHAPTER_01_SESSION,
  type ChapterSectionArchitecture,
} from "@/lib/governance-code/books/book-i/chapters/chapter-01-architecture";

function ChapterDiagram({ diagramId }: { diagramId: ChapterSectionArchitecture["diagramId"] }) {
  switch (diagramId) {
    case "sources-of-authority":
      return <SourcesOfAuthorityDiagram />;
    case "governance-hierarchy":
      return <InstitutionalGovernanceHierarchyDiagram />;
    case "decision-flow":
      return <ConceptualDecisionFlowDiagram />;
    default:
      return null;
  }
}

function ChapterSectionArchitecturePanel({
  section,
  defaultOpen = false,
}: {
  section: ChapterSectionArchitecture;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      id={section.anchor}
      className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted print:break-inside-avoid"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left print:pointer-events-none"
        aria-expanded={open}
      >
        <div>
          <p className="mb-1 font-mono text-xs text-gold print:text-gray-600">
            Section {section.number} · Architecture only
          </p>
          <h2 className="font-serif text-xl font-semibold text-cream print:text-black">
            {section.title}
          </h2>
          <p className="mt-1 text-sm text-cream-muted print:text-gray-700">{section.description}</p>
        </div>
        <span className="shrink-0 text-gold print:hidden">{open ? "−" : "+"}</span>
      </button>
      <div className={`border-t border-gold-subtle px-5 pb-5 pt-4 ${open ? "block" : "hidden print:block"}`}>
        <p className="mb-3 text-xs uppercase tracking-wider text-gold print:text-gray-600">
          Fields to draft
        </p>
        <ul className="mb-4 space-y-1 text-sm text-cream-muted print:text-gray-800">
          {section.fields.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
        {section.diagramId ? (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-wider text-amber-200/90 print:text-gray-600">
              Diagram scaffold
            </p>
            <ChapterDiagram diagramId={section.diagramId} />
            <div className="rounded border border-dashed border-gold-subtle/60 bg-ink p-4 text-sm text-cream-muted print:border print:bg-gray-50 print:text-gray-800">
              <p className="mb-2 text-xs uppercase tracking-wider text-amber-200/90 print:text-gray-600">
                Not drafted
              </p>
              <p>Section prose will be written after architecture approval.</p>
            </div>
          </div>
        ) : (
          <div className="rounded border border-dashed border-gold-subtle/60 bg-ink p-4 text-sm text-cream-muted print:border print:bg-gray-50 print:text-gray-800">
            <p className="mb-2 text-xs uppercase tracking-wider text-amber-200/90 print:text-gray-600">
              Not drafted
            </p>
            <p>Section prose will be written after architecture approval.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function GovernanceChapter1ArchitecturePanel() {
  const partHref = "/library/governance-code/book-i/parts/part-i";

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 print:max-w-none print:px-8 print:py-8 print:text-black print:break-before-right">
      <GovernanceBreadcrumbs
        items={bookIChapterBreadcrumbs(
          "Part I",
          "Governance Foundations",
          partHref,
          "Chapter 1",
          "Constitutional Governance Structure",
        )}
      />

      <div className="mb-8 rounded-lg border border-amber-400/25 bg-amber-400/10 p-6 text-sm print:border print:bg-white print:text-black">
        <p className="font-medium text-amber-200 print:text-black">Chapter 1 Architecture Review</p>
        <p className="mt-2 text-amber-100/90 print:text-black">
          Eight sections defined. Three diagrams scaffolded. Standard chapter education footer adopted.
          No governance prose drafted.
        </p>
      </div>

      <header className="mb-8 border-b border-gold-subtle pb-8 print:border-gray-300">
        <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
          Part I — Governance Foundations
        </p>
        <p className="mb-1 font-mono text-sm text-gold print:text-gray-600">Chapter 1</p>
        <h1 className="mb-2 font-serif text-3xl font-semibold text-cream print:text-black md:text-4xl">
          Constitutional Governance Structure
        </h1>
        <p className="text-sm text-cream-muted print:text-gray-700">
          Architecture v{BOOK_I_CHAPTER_01_ARCHITECTURE_VERSION} · {BOOK_I_CHAPTER_01_SESSION} ·
          Status: Architecture Review
        </p>
      </header>

      <section className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 print:border print:bg-gray-50">
        <p className="mb-2 text-xs uppercase tracking-wider text-gold print:text-gray-600">
          The Problem
        </p>
        <blockquote className="font-serif text-lg italic leading-relaxed text-cream print:text-black">
          {BOOK_I_CHAPTER_01_PROBLEM_STATEMENT}
        </blockquote>
      </section>

      <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream print:text-black">
          Objectives
        </h2>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          After reading Chapter 1, every person should understand:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_CHAPTER_01_OBJECTIVES.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8 rounded-lg border border-gold-subtle bg-ink p-4 print:hidden">
        <p className="mb-3 text-xs uppercase tracking-wider text-gold">Content rules</p>
        <ul className="grid gap-2 sm:grid-cols-2 text-sm text-cream-muted">
          {BOOK_I_CHAPTER_01_CONTENT_RULES.map((rule) => (
            <li key={rule}>• {rule}</li>
          ))}
        </ul>
      </section>

      <nav
        aria-label="Chapter 1 sections"
        className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-4 print:hidden"
      >
        <p className="mb-3 text-xs uppercase tracking-wider text-gold">Eight Sections</p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {BOOK_I_CHAPTER_01_SECTIONS.map((s) => (
            <li key={s.anchor}>
              <a href={`#${s.anchor}`} className="text-sm text-cream-muted hover:text-gold-light">
                {s.number}. {s.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#chapter-education-footer"
              className="text-sm text-cream-muted hover:text-gold-light"
            >
              Chapter Education Footer
            </a>
          </li>
        </ol>
      </nav>

      <div className="space-y-4">
        {BOOK_I_CHAPTER_01_SECTIONS.map((section, i) => (
          <ChapterSectionArchitecturePanel key={section.id} section={section} defaultOpen={i === 0} />
        ))}
      </div>

      <div className="mt-8">
        <GovernanceChapterEducationFooter footer={BOOK_I_CHAPTER_01_FOOTER_ARCHITECTURE} mode="architecture" />
      </div>

      <section className="mt-8 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream print:text-black">
          Chapter Summary (Architecture)
        </h2>
        <p className="mb-4 text-sm text-cream-muted print:text-gray-800">
          Section 8 will recap — no new ideas. Planned summary points:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-cream-muted print:text-gray-800">
          {BOOK_I_CHAPTER_01_SUMMARY_POINTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-lg border border-gold-subtle bg-ink-muted p-6 print:border print:bg-white">
        <h2 className="mb-4 font-serif text-xl font-semibold text-cream print:text-black">
          Publication Status
        </h2>
        <table className="w-full text-sm">
          <tbody>
            {BOOK_I_CHAPTER_01_PUBLICATION_STATUS.map((row) => (
              <tr key={row.field} className="border-b border-gold-subtle/40">
                <th className="py-3 pr-6 text-left font-medium text-cream print:text-black">
                  {row.field}
                </th>
                <td className="py-3 text-cream-muted print:text-gray-800">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm print:mt-8">
        <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
          ← Book I Overview
        </Link>
        <Link
          href="/library/governance-code/book-i/foundational-charter"
          className="text-gold hover:text-gold-light"
        >
          Foundational Charter →
        </Link>
        <Link
          href="/library/editorial-standards/chapter-education"
          className="text-gold hover:text-gold-light"
        >
          CEF-001 Standard →
        </Link>
      </div>
    </div>
  );
}
