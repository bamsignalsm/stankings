import Link from "next/link";
import {
  ALIGNMENT_QUESTIONS,
  CHALLENGE_PERSPECTIVES,
  DOCUMENT_WORKFLOW_STEPS,
  DRAFTING_PRINCIPLE,
  EDITORIAL_MOTTO,
  FEELS_OFF_RULE,
  INSTITUTIONAL_MISSION,
  SESSION_ARTIFACTS,
  THREE_READS_RULE,
  WORKFLOW_PHASES,
} from "@/lib/editorial/methodology";
import { EDITOR_DECISION_47 } from "@/lib/editorial/decisions";
import { LIBRARY_SESSIONS } from "@/lib/library-sessions/records";
import {
  LIB_SESS_FRAMEWORK,
  LIB_SESS_PURPOSE,
} from "@/lib/frameworks/library-sessions-portal";
import { LibraryProgressReport } from "@/components/library-sessions/LibraryProgressReport";

const STATUS_LABELS = {
  recorded: "Recorded",
  reviewed: "Reviewed",
  archived: "Archived",
} as const;

export function LibrarySessionsHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Institutional Memory · {LIB_SESS_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Library Session Records
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{LIB_SESS_PURPOSE}</p>
          <p className="mx-auto mt-6 max-w-xl font-serif italic text-gold">
            &ldquo;{EDITORIAL_MOTTO}&rdquo;
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EDITOR_DECISION_47}
        </blockquote>

        <p className="mb-12 text-sm text-cream-muted">{DRAFTING_PRINCIPLE}</p>

        <section className="mb-16">
          <LibraryProgressReport />
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">Recorded Sessions</h2>
          <div className="space-y-4">
            {LIBRARY_SESSIONS.map((session) => (
              <article
                key={session.sessionId}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-gold">{session.sessionId}</p>
                    <h3 className="font-serif text-xl font-semibold text-cream">
                      <Link
                        href={`/library/sessions/${session.sessionId}`}
                        className="hover:text-gold-light"
                      >
                        {session.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-cream-muted">{session.date}</p>
                  </div>
                  <span className="rounded border border-gold-subtle px-2 py-1 text-[10px] uppercase tracking-wider text-gold">
                    {STATUS_LABELS[session.status]}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-cream-muted">{session.summary[0]}</p>
                <Link
                  href={`/library/sessions/${session.sessionId}`}
                  className="mt-3 inline-block text-sm text-gold hover:text-gold-light"
                >
                  Read session record →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Seven Phases</h2>
            <ol className="space-y-2 text-sm text-cream-muted">
              {WORKFLOW_PHASES.map((p) => (
                <li key={p.id}>
                  <span className="text-gold">{p.phase}.</span> {p.title} — {p.description}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Session Artifacts</h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {SESSION_ARTIFACTS.map((a) => (
                <li key={a}>• {a}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Institutional Question
          </h2>
          <p className="mb-6 font-serif text-lg text-gold">{INSTITUTIONAL_MISSION}</p>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-gold">
            Four Alignment Questions
          </h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-cream-muted">
            {ALIGNMENT_QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Three Reads Rule</h2>
            <div className="space-y-4">
              {THREE_READS_RULE.map((r) => (
                <div key={r.read} className="rounded border border-gold-subtle p-4">
                  <p className="text-xs uppercase tracking-wider text-gold">{r.read}</p>
                  <p className="mt-1 text-sm text-cream-muted">{r.question}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Document Workflow</h2>
            <ol className="space-y-2 text-sm text-cream-muted">
              {DOCUMENT_WORKFLOW_STEPS.map((s) => (
                <li key={s.id}>
                  <span className="text-gold">{s.step}.</span> {s.title} — {s.question}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
            Challenge Perspectives
          </h2>
          <div className="flex flex-wrap gap-2">
            {CHALLENGE_PERSPECTIVES.map((p) => (
              <span
                key={p}
                className="rounded border border-gold-subtle px-3 py-1 text-xs text-cream-muted"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100">
            {FEELS_OFF_RULE}
          </p>
        </section>

        <section className="flex flex-wrap gap-4 text-sm">
          <Link href="/library/stankings-library" className="text-gold hover:text-gold-light">
            ← Stankings Library Portal
          </Link>
          <Link href="/library/constitutional-convention" className="text-gold hover:text-gold-light">
            Constitutional Convention →
          </Link>
          <Link href="/library/governance-code" className="text-gold hover:text-gold-light">
            Governance Code →
          </Link>
        </section>
      </div>
    </>
  );
}
