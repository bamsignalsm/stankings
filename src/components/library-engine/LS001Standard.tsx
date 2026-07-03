import Link from "next/link";
import type { KnowledgeObject } from "@/lib/standards/ls-001";
import {
  KNOWLEDGE_OBJECT_TYPES,
  KNOWLEDGE_OBJECT_TYPE_LABELS,
  LIBRARY_ENGINE_PHASES,
  LS_001,
  LS_001_PRINCIPLES,
  LS_001_PURPOSE,
  LS_001_CLOSING,
  LS_001_AI_SECTION,
  LS_001_CROSS_REF_SECTION,
  LS_001_PUBLICATION_SECTION,
  LS_001_VERSION_SECTION,
  LS_001_VISIBILITY_SECTION,
  RULE_OF_DELIBERATE_MATURITY,
} from "@/lib/standards/ls-001";
import { KnowledgeMetadataPanel } from "@/components/library-engine/KnowledgeObjectCard";

interface LS001StandardProps {
  knowledgeObject: KnowledgeObject;
}

export function LS001Standard({ knowledgeObject }: LS001StandardProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Library Standard · Version {LS_001.version} · Approved
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {LS_001.title}
          </h1>
          <p className="font-mono text-sm text-gold/80">{LS_001.id}</p>
          <p className="mt-4 text-cream-muted">
            The foundation of the Institutional Brain. Built before another page is
            written.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 font-serif text-lg italic text-cream">
          &ldquo;{RULE_OF_DELIBERATE_MATURITY}&rdquo;
        </blockquote>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <div className="space-y-4 leading-relaxed text-cream-muted">
            {LS_001_PURPOSE.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Principles</h2>
          <p className="mb-4 text-cream-muted">Every Knowledge Object shall:</p>
          <ul className="space-y-2 border-l-2 border-gold/30 pl-6">
            {LS_001_PRINCIPLES.map((p) => (
              <li key={p} className="text-cream-muted">
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Knowledge Object Types
          </h2>
          <div className="flex flex-wrap gap-2">
            {KNOWLEDGE_OBJECT_TYPES.map((t) => (
              <span
                key={t}
                className="rounded border border-gold-subtle bg-ink-muted px-2 py-1 text-xs text-cream-muted"
              >
                {KNOWLEDGE_OBJECT_TYPE_LABELS[t]}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Visibility Levels
          </h2>
          <p className="leading-relaxed text-cream-muted">{LS_001_VISIBILITY_SECTION}</p>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Version Control</h2>
          <p className="leading-relaxed text-cream-muted">{LS_001_VERSION_SECTION}</p>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Cross Referencing
          </h2>
          <p className="leading-relaxed text-cream-muted">{LS_001_CROSS_REF_SECTION}</p>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Artificial Intelligence
          </h2>
          <p className="leading-relaxed text-cream-muted">{LS_001_AI_SECTION}</p>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">Publication</h2>
          <p className="leading-relaxed text-cream-muted">{LS_001_PUBLICATION_SECTION}</p>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-gold">
            Closing Principle
          </h2>
          <div className="space-y-4 leading-relaxed text-cream-muted">
            {LS_001_CLOSING.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Implementation Roadmap
          </h2>
          {(["a", "b", "c"] as const).map((phase) => {
            const p = LIBRARY_ENGINE_PHASES[phase];
            return (
              <div key={phase} className="mb-8">
                <p className="mb-2 text-sm text-gold">
                  Phase {phase.toUpperCase()} — {p.title}
                  {"priority" in p ? ` (${p.priority} Priority)` : ""}
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {p.modules.map((m) => (
                    <li
                      key={m}
                      className="rounded border border-gold-subtle/50 bg-ink-muted px-3 py-2 text-xs text-cream-muted"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <KnowledgeMetadataPanel ko={knowledgeObject} />

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/energy/library" className="text-sm text-gold hover:text-gold-light">
            Library Engine dashboard →
          </Link>
          <Link href="/library" className="text-sm text-cream-muted hover:text-gold">
            ← Back to The Stankings Library
          </Link>
        </div>
      </div>
    </>
  );
}
