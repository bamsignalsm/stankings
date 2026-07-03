import Link from "next/link";
import { notFound } from "next/navigation";
import { getLibrarySession } from "@/lib/library-sessions/records";

const STATUS_LABELS = {
  recorded: "Recorded",
  reviewed: "Reviewed",
  archived: "Archived",
} as const;

export function LibrarySessionDetail({ sessionId }: { sessionId: string }) {
  const session = getLibrarySession(sessionId);
  if (!session) notFound();

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/library/sessions"
            className="mb-6 inline-block text-sm text-gold hover:text-gold-light"
          >
            ← All session records
          </Link>
          <p className="mb-2 font-mono text-xs text-gold">{session.sessionId}</p>
          <h1 className="mb-3 font-serif text-3xl font-semibold text-cream md:text-4xl">
            {session.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-cream-muted">
            <span>{session.date}</span>
            <span className="rounded border border-gold-subtle px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
              {STATUS_LABELS[session.status]}
            </span>
            {session.reviewedAt && <span>Reviewed {session.reviewedAt}</span>}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Summary</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-cream-muted">
            {session.summary.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {session.decisions.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Decisions</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-cream-muted">
              {session.decisions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-gold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {session.methodology && session.methodology.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Methodology</h2>
            <ul className="space-y-2 text-sm text-cream-muted">
              {session.methodology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {session.editorDecisionRefs && session.editorDecisionRefs.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
              Editorial References
            </h2>
            <ul className="font-mono text-sm text-gold">
              {session.editorDecisionRefs.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </section>
        )}

        <footer className="border-t border-gold-subtle pt-8 text-xs text-cream-muted">
          <p>
            Library Session Record · Institutional memory · Not constitutional text
          </p>
        </footer>
      </div>
    </>
  );
}
