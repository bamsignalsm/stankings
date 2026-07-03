import Link from "next/link";
import {
  SLPS_APPLIES_TO,
  SLPS_CHAPTER_METADATA_FIELDS,
  SLPS_DIAGRAM_METADATA_FIELDS,
  SLPS_HUB_SECTIONS,
  SLPS_MIGRATION_REGISTRY,
  SLPS_PUBLICATION_METADATA_FIELDS,
  SLPS_PUBLICATION_STATUSES,
  SLPS_PUBLICATION_STRUCTURE,
  SLPS_PURPOSE,
  SLPS_VISUAL_IDENTITY,
} from "@/lib/editorial/slps";
import { EDITOR_DECISION_50 } from "@/lib/editorial/decisions";
import { SLPS_FRAMEWORK } from "@/lib/frameworks/library-publishing-standard";

function SectionBlock({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <p className="mb-2 font-mono text-xs text-gold">Section {number}</p>
      <h2 className="mb-4 font-serif text-xl font-semibold text-cream">{title}</h2>
      {children}
    </section>
  );
}

export function SLPSHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Editorial Standards · {SLPS_FRAMEWORK.shortId} · {SLPS_FRAMEWORK.identifier} · v
            {SLPS_FRAMEWORK.version}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Stankings Library Publishing Standard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{SLPS_PURPOSE}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EDITOR_DECISION_50}
        </blockquote>

        <nav className="mb-12 rounded-lg border border-gold-subtle bg-ink p-4">
          <p className="mb-3 text-xs uppercase tracking-wider text-gold">Twelve Sections</p>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SLPS_HUB_SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-cream-muted hover:text-gold-light">
                  {s.number}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-6">
          <SectionBlock id="purpose" number={1} title="Purpose">
            <p className="text-sm text-cream-muted">{SLPS_PURPOSE}</p>
            <ul className="mt-4 space-y-1 text-sm text-cream-muted">
              {SLPS_APPLIES_TO.map((v) => (
                <li key={v}>• {v}</li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock id="lifecycle" number={2} title="Publication Lifecycle">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {SLPS_PUBLICATION_STATUSES.map((status, i) => (
                <span key={status} className="flex items-center gap-2">
                  <span className="rounded border border-gold-subtle px-3 py-1 text-cream-muted">
                    {status}
                  </span>
                  {i < SLPS_PUBLICATION_STATUSES.length - 1 && (
                    <span className="text-gold">↓</span>
                  )}
                </span>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="structure" number={3} title="Standard Publication Structure">
            <ol className="space-y-2 font-mono text-sm text-cream-muted">
              {SLPS_PUBLICATION_STRUCTURE.map((s, i) => (
                <li key={s.id}>
                  {i > 0 && <span className="text-gold">↓ </span>}
                  {s.step}. {s.title}
                </li>
              ))}
            </ol>
          </SectionBlock>

          <SectionBlock id="publication-metadata" number={4} title="Metadata Standards — Publication">
            <p className="mb-4 text-sm text-cream-muted">Visible metadata — not hidden.</p>
            <div className="flex flex-wrap gap-2">
              {SLPS_PUBLICATION_METADATA_FIELDS.map((f) => (
                <span
                  key={f}
                  className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted"
                >
                  {f}
                </span>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="chapter-metadata" number={5} title="Chapter Standards">
            <div className="flex flex-wrap gap-2">
              {SLPS_CHAPTER_METADATA_FIELDS.map((f) => (
                <span
                  key={f}
                  className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted"
                >
                  {f}
                </span>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="diagram-metadata" number={6} title="Diagram Standards">
            <div className="flex flex-wrap gap-2">
              {SLPS_DIAGRAM_METADATA_FIELDS.map((f) => (
                <span
                  key={f}
                  className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted"
                >
                  {f}
                </span>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="review" number={7} title="Review & Approval Workflow">
            <p className="text-sm text-cream-muted">
              Integrates with Editorial Workflow (FRAMEWORK-EDW-001) and Implementation Readiness.
              Founder Approval required before Published status.
            </p>
          </SectionBlock>

          <SectionBlock id="version-control" number={8} title="Version Control">
            <p className="text-sm text-cream-muted">
              Edition, Version, Revision History, and Session History are mandatory. No publication
              without traceable lineage.
            </p>
          </SectionBlock>

          <SectionBlock id="visual-design" number={9} title="Visual Design System">
            <ul className="space-y-2 text-sm text-cream-muted">
              {SLPS_VISUAL_IDENTITY.map((v) => (
                <li key={v}>• {v}</li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock id="cross-references" number={10} title="Cross-Reference Requirements">
            <p className="text-sm text-cream-muted">
              Every publication links to Constitution, Canons, related volumes, and Knowledge Objects
              where applicable.
            </p>
          </SectionBlock>

          <SectionBlock id="session-history" number={11} title="Session History Requirements">
            <p className="text-sm text-cream-muted">
              Major decisions recorded in Library Session Records (LIB-YYYY-MM-DD-NNN) per
              Editor&apos;s Decision No. 47.
            </p>
          </SectionBlock>

          <SectionBlock id="revision-history" number={12} title="Revision History Requirements">
            <p className="text-sm text-cream-muted">
              Version lineage, amendments, and supersession documented in every publication.
            </p>
          </SectionBlock>
        </div>

        <section className="mt-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Volume Migration Registry</h2>
          <p className="mb-4 text-sm text-cream-muted">
            Existing volumes prepared for SLPS migration.
          </p>
          <ul className="space-y-3">
            {SLPS_MIGRATION_REGISTRY.map((row) => (
              <li key={row.slug} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <Link href={row.href} className="text-gold hover:text-gold-light">
                  {row.volume}
                </Link>
                <span className="text-xs uppercase tracking-wider text-cream-muted">
                  {row.status.replace("_", " ")}
                  {"note" in row && row.note ? ` · ${row.note}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/editorial-standards" className="text-gold hover:text-gold-light">
            ← Editorial Standards
          </Link>
          <Link
            href="/library/editorial-standards/publishing-system"
            className="text-gold hover:text-gold-light"
          >
            SLPS-CORE Publishing System →
          </Link>
          <Link
            href="/library/editorial-standards/publishing-standard/generator"
            className="text-gold hover:text-gold-light"
          >
            Publication Generator →
          </Link>
        <Link href="/library/governance-code/book-i/foundational-charter" className="text-gold hover:text-gold-light">
          Book I Foundational Charter →
          </Link>
        </div>
      </div>
    </>
  );
}
