import Link from "next/link";
import {
  CHAPTER_APPROVAL_TESTS,
  FOUNDATIONAL_CHARTER_PRINCIPLE,
  FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT,
  FOUNDATIONAL_CHARTER_QUESTION,
  FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS,
  SLPS_WRITING_RULES,
} from "@/lib/editorial/foundational-charter";
import { EDITOR_DECISION_53 } from "@/lib/editorial/decisions";
import { FC_FRAMEWORK } from "@/lib/frameworks/foundational-charter";

export function FoundationalCharterStandardHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Editorial Standards · {FC_FRAMEWORK.shortId} · {FC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Foundational Charter Standard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{FOUNDATIONAL_CHARTER_PRINCIPLE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EDITOR_DECISION_53}
        </blockquote>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">The Problem</h2>
          <p className="whitespace-pre-line text-sm text-cream-muted">
            {FOUNDATIONAL_CHARTER_PROBLEM_STATEMENT}
          </p>
          <p className="mt-4 font-serif italic text-gold">{FOUNDATIONAL_CHARTER_QUESTION}</p>
        </section>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Ten Sections (Locked)</h2>
          <ol className="space-y-2 text-sm text-cream-muted">
            {FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS.map((s, i) => (
              <li key={s}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Writing Rules</h2>
          <ul className="space-y-3 text-sm text-cream-muted">
            {SLPS_WRITING_RULES.map((r) => (
              <li key={r.id}>
                <span className="text-cream">{r.title}</span> — {r.rule}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Chapter Approval Tests</h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {CHAPTER_APPROVAL_TESTS.map((t) => (
              <li key={t.id}>
                <span className="text-cream">{t.title}</span> — {t.question}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/editorial-standards" className="text-gold hover:text-gold-light">
            ← Editorial Standards
          </Link>
          <Link
            href="/library/governance-code/book-i/foundational-charter"
            className="text-gold hover:text-gold-light"
          >
            Book I Foundational Charter →
          </Link>
        </div>
      </div>
    </>
  );
}
