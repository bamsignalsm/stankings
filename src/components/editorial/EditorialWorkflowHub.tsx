import Link from "next/link";
import { EDITOR_DECISION_47 } from "@/lib/editorial/decisions";
import { IMPLEMENTATION_READINESS_CHECKS } from "@/lib/editorial/implementation-readiness";
import { EDITORIAL_MOTTO } from "@/lib/editorial/methodology";
import {
  DOCUMENT_APPROVAL_LIFECYCLE,
  EDITORIAL_ROLES,
  EDITORIAL_WORKFLOW_PHILOSOPHY,
  EDITORIAL_WORKFLOW_STEPS,
  EDW_FRAMEWORK,
  EDW_PURPOSE,
  LIBRARY_PRESERVATION_PROCESS,
  QUALITY_ASSURANCE_STANDARDS,
  SESSION_TEMPLATE_SECTIONS,
} from "@/lib/frameworks/editorial-workflow-portal";
import { EXECUTIVE_DECISION_48 } from "@/lib/iki";

export function EditorialWorkflowHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Editorial Standards · {EDW_FRAMEWORK.identifier} · v{EDW_FRAMEWORK.version}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Editorial Workflow
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{EDW_PURPOSE}</p>
          <p className="mx-auto mt-6 font-serif italic text-gold">
            &ldquo;{EDITORIAL_MOTTO}&rdquo;
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">1. Philosophy</h2>
          <p className="text-sm leading-relaxed text-cream-muted">{EDITORIAL_WORKFLOW_PHILOSOPHY}</p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">2. Workflow</h2>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <ol className="space-y-4">
              {EDITORIAL_WORKFLOW_STEPS.map((s, i) => (
                <li key={s.id} className="flex gap-4 text-sm">
                  <span className="font-mono text-gold">{s.step}</span>
                  <div>
                    <p className="font-medium text-cream">{s.title}</p>
                    <p className="text-cream-muted">{s.description}</p>
                    {i < EDITORIAL_WORKFLOW_STEPS.length - 1 && (
                      <p className="mt-2 text-gold">↓</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            3. Roles &amp; Responsibilities
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {EDITORIAL_ROLES.map((r) => (
              <div key={r.role} className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
                <h3 className="mb-3 font-serif text-lg text-gold">{r.role}</h3>
                <ul className="space-y-1 text-sm text-cream-muted">
                  {r.responsibilities.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            4. Implementation Readiness Checklist
          </h2>
          <p className="mb-4 text-sm text-cream-muted">
            Before Builder&apos;s Notes reach Cursor, every item must pass.
          </p>
          <ul className="space-y-3">
            {IMPLEMENTATION_READINESS_CHECKS.map((c) => (
              <li
                key={c.id}
                className="flex gap-3 rounded border border-gold-subtle p-4 text-sm"
              >
                <span className="text-gold">□</span>
                <div>
                  <p className="font-medium text-cream">{c.label}</p>
                  <p className="text-cream-muted">{c.question}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">5. Session Template</h2>
          <p className="mb-4 text-sm text-cream-muted">{EDITOR_DECISION_47}</p>
          <ul className="space-y-2 text-sm text-cream-muted">
            {SESSION_TEMPLATE_SECTIONS.map((s, i) => (
              <li key={s}>
                {i + 1}. {s}
              </li>
            ))}
          </ul>
          <Link href="/library/sessions" className="mt-4 inline-block text-sm text-gold hover:text-gold-light">
            Library Session Records →
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            6. Document Approval Lifecycle
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {DOCUMENT_APPROVAL_LIFECYCLE.map((phase, i) => (
              <span key={phase} className="flex items-center gap-2">
                <span className="rounded border border-gold-subtle px-3 py-1 text-cream-muted">
                  {phase}
                </span>
                {i < DOCUMENT_APPROVAL_LIFECYCLE.length - 1 && (
                  <span className="text-gold">↓</span>
                )}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            7. Quality Assurance Standards
          </h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {QUALITY_ASSURANCE_STANDARDS.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            8. Library Preservation Process
          </h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {LIBRARY_PRESERVATION_PROCESS.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </section>

        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_48}
        </blockquote>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/editorial-standards" className="text-gold hover:text-gold-light">
            ← Editorial Standards
          </Link>
          <Link href="/library/constitution" className="text-gold hover:text-gold-light">
            Volume I — Constitution →
          </Link>
          <Link href="/library/governance-code" className="text-gold hover:text-gold-light">
            Volume II — Governance Code →
          </Link>
          <Link href="/library/sessions" className="text-gold hover:text-gold-light">
            Session Records →
          </Link>
        </div>
      </div>
    </>
  );
}
