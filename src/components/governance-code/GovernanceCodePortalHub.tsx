import Link from "next/link";
import {
  GOVERNANCE_CODE_BOOKS,
  GOVERNANCE_CODE_PURPOSE,
  GOVERNANCE_CODE_STATUS,
  GOVERNANCE_CODE_TITLE,
  GOVERNANCE_CODE_VERSION,
  getGovernanceBookStats,
} from "@/lib/governance-code";
import { GOVERNANCE_BOOK_STATUS_LABELS } from "@/lib/governance-code/types";
import { GC_FRAMEWORK, GC_PURPOSE } from "@/lib/frameworks/governance-code-portal";
import { EXECUTIVE_DECISION_46, EXECUTIVE_DECISION_48 } from "@/lib/iki";
import { GovernanceCodeStackDiagram } from "@/components/governance-code/GovernanceBookShellPanel";

export function GovernanceCodePortalHub() {
  const stats = getGovernanceBookStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Volume II · {GOVERNANCE_CODE_STATUS} v{GOVERNANCE_CODE_VERSION} · {GC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {GOVERNANCE_CODE_TITLE}
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{GC_PURPOSE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 rounded-lg border border-amber-400/25 bg-amber-400/10 p-6 text-sm text-amber-100">
          <p className="font-medium text-amber-200">Architecture Phase — Planning (Locked)</p>
          <p className="mt-2 text-amber-100/90">
            Volume I is frozen for Constitutional Convention review. Volume II implements the
            Constitution — it does not rewrite it. Twelve Books exist as architectural shells.
            No chapter content until editorial approval. Book I architecture is the current focus.
          </p>
          <Link
            href="/library/constitutional-convention"
            className="mt-3 inline-block text-gold hover:text-gold-light"
          >
            Constitutional Convention →
          </Link>
        </div>

        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_46}
        </blockquote>

        <blockquote className="mb-12 rounded-lg border border-gold/20 bg-ink-muted p-6 text-sm text-cream-muted">
          {EXECUTIVE_DECISION_48}
        </blockquote>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Purpose</h2>
            <p className="text-sm leading-relaxed text-cream-muted">{GOVERNANCE_CODE_PURPOSE}</p>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Governance Stack</h2>
            <GovernanceCodeStackDiagram />
          </div>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Books", value: stats.total },
            { label: "Planning", value: stats.planning },
            { label: "Chapter Placeholders", value: stats.chapters },
            { label: "Drafting", value: stats.drafting },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl text-gold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Books</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {GOVERNANCE_CODE_BOOKS.map((book) => (
              <article
                key={book.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-mono text-sm text-gold">{book.book}</p>
                  <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                    {GOVERNANCE_BOOK_STATUS_LABELS[book.status]}
                    {book.locked ? " · Locked" : ""}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-lg text-cream">
                  <Link href={book.href} className="hover:text-gold-light">
                    {book.title}
                  </Link>
                </h3>
                <p className="mb-2 text-sm text-cream-muted">{book.description}</p>
                <p className="mb-4 text-xs text-cream-muted">
                  {book.chapters.length} chapter placeholders
                </p>
                <Link href={book.href} className="text-xs text-gold hover:text-gold-light">
                  View {book.book} shell →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Library Structure</h2>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-cream-muted">
{`Library
├── Volume 0 — The Canons
├── Volume I — Constitution (frozen)
├── Volume II — Governance Code (planning)
│   ├── Book I — Governance Bodies
│   ├── Book II — Board Operations
│   ├── Book III — Executive Leadership
│   ├── Book IV — Governance Committees
│   ├── Book V — Decision Governance
│   ├── Book VI — Risk & Assurance
│   ├── Book VII — Financial Stewardship
│   ├── Book VIII — Technology Governance
│   ├── Book IX — People & Culture
│   ├── Book X — Innovation Governance
│   ├── Book XI — Knowledge Governance
│   └── Book XII — Reporting & Assurance
├── Editorial Standards
│   └── Editorial Workflow
├── Commentary
├── Schedules
└── Governance Registers`}
          </pre>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
            Book I — Governance Bodies →
          </Link>
          <Link href="/library/constitution" className="text-gold hover:text-gold-light">
            Volume I — Constitution →
          </Link>
          <Link href="/library/first-principles" className="text-gold hover:text-gold-light">
            Volume 0 — Canons →
          </Link>
          <Link href="/library/editorial-standards/editorial-workflow" className="text-gold hover:text-gold-light">
            Editorial Workflow →
          </Link>
          <Link
            href="/library/frameworks/governance-code-portal"
            className="text-gold hover:text-gold-light"
          >
            {GC_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
