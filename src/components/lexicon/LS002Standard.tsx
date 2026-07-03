import Link from "next/link";
import type { KnowledgeObject } from "@/lib/standards/ls-001";
import {
  EDITOR_IN_CHIEF_DECISION_3,
  LEXICON_TERM_WORKFLOW,
  LS_002,
  LS_002_CLOSING,
  LS_002_PURPOSE,
} from "@/lib/standards/ls-002";
import { LexiconTermCatalog } from "@/components/lexicon/LexiconModule";
import { KnowledgeMetadataPanel } from "@/components/library-engine/KnowledgeObjectCard";

interface LS002StandardProps {
  knowledgeObject: KnowledgeObject;
}

export function LS002Standard({ knowledgeObject }: LS002StandardProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Library Standard · Version {LS_002.version} · Approved
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {LS_002.title}
          </h1>
          <p className="font-mono text-sm text-gold/80">{LS_002.id}</p>
          <p className="mt-4 text-cream-muted">
            The official institutional vocabulary — defined before Canon 002.
          </p>
          <Link
            href="/library/lexicon"
            className="mt-6 inline-block text-sm text-gold hover:text-gold-light"
          >
            Open the Lexicon Module →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">Purpose</h2>
          <div className="space-y-4 leading-relaxed text-cream-muted">
            {LS_002_PURPOSE.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Approved Definitions
          </h2>
          <LexiconTermCatalog />
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Editor-in-Chief Decision No. 3
          </h2>
          <div className="space-y-4 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-cream">
            {EDITOR_IN_CHIEF_DECISION_3.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <ol className="mt-6 space-y-2 text-sm text-cream-muted">
            {LEXICON_TERM_WORKFLOW.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-gold/50">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 border-t border-gold-subtle pt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-gold">
            Closing Principle
          </h2>
          <blockquote className="rounded-lg border border-gold-subtle bg-ink-muted p-8 font-serif text-lg italic leading-relaxed text-cream-muted">
            {LS_002_CLOSING.split("\n\n").map((line, i, arr) => (
              <span key={line.slice(0, 20)}>
                {line}
                {i < arr.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </span>
            ))}
          </blockquote>
        </section>

        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            LS-001 Metadata
          </p>
          <KnowledgeMetadataPanel ko={knowledgeObject} compact />
        </div>

        <Link href="/library" className="mt-12 inline-block text-sm text-gold hover:text-gold-light">
          ← Back to The Stankings Library
        </Link>
      </div>
    </>
  );
}
