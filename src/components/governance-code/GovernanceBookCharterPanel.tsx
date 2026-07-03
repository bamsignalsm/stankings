import Link from "next/link";
import { GovernanceBreadcrumbs } from "@/components/governance-code/GovernanceBreadcrumbs";
import {
  FoundationalCharterSections,
  BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS,
  BOOK_I_FOUNDATIONAL_CHARTER_VERSION,
} from "@/components/governance-code/FoundationalCharterSections";
import { bookICharterBreadcrumbs } from "@/lib/governance-code/books/book-i/breadcrumbs";
import { BOOK_I_FC_PUBLICATION_STATUS_ROWS } from "@/lib/governance-code/books/book-i/foundational-charter-sections";

export function GovernanceFoundationalCharterPanel() {
  const statusRow = BOOK_I_FC_PUBLICATION_STATUS_ROWS.find((r) => r.field === "Status");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 print:max-w-none print:px-8 print:py-8 print:break-before-right">
      <GovernanceBreadcrumbs items={bookICharterBreadcrumbs()} />

      <header className="mb-10 border-b border-gold-subtle pb-10 print:border-gray-300">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-gold print:text-gray-600">
          Volume II — Governance Code
        </p>
        <h1 className="mb-2 font-serif text-4xl font-semibold text-cream print:text-black md:text-5xl">
          Foundational Charter
        </h1>
        <p className="mb-1 font-serif text-xl text-cream print:text-black">
          Book I — Governance Bodies
        </p>
        <p className="text-sm text-cream-muted print:text-gray-700">
          {BOOK_I_FOUNDATIONAL_CHARTER_VERSION} · {statusRow?.value ?? "Draft – Editorial Review"}
        </p>
      </header>

      <nav
        aria-label="Foundational Charter sections"
        className="mb-10 rounded-lg border border-gold-subtle bg-ink p-4 print:hidden"
      >
        <p className="mb-3 text-xs uppercase tracking-wider text-gold">Contents</p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {BOOK_I_FOUNDATIONAL_CHARTER_SECTIONS.map((s) => (
            <li key={s.anchor}>
              <a href={`#${s.anchor}`} className="text-sm text-cream-muted hover:text-gold-light">
                {s.number}. {s.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#foundational-principle"
              className="text-sm text-cream-muted hover:text-gold-light"
            >
              Foundational Principle
            </a>
          </li>
        </ol>
      </nav>

      <FoundationalCharterSections />

      <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm print:mt-8">
        <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
          ← Book I Overview
        </Link>
        <Link
          href="/library/governance-code/book-i/parts/part-i"
          className="text-gold hover:text-gold-light"
        >
          Part I — Governance Foundations →
        </Link>
        <Link
          href="/library/editorial-standards/foundational-charter"
          className="text-gold hover:text-gold-light"
        >
          FC-001 Standard →
        </Link>
      </div>
    </div>
  );
}

/** @deprecated Use GovernanceFoundationalCharterPanel */
export const GovernanceBookCharterPanel = GovernanceFoundationalCharterPanel;
