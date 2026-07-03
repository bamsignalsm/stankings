import Link from "next/link";
import { loginUrl, USER_REGISTER_PATH } from "@/lib/auth-paths";
import {
  DRAFT_ZERO_NOTE,
  EDITORIAL_RULE,
  FOUNDERS_DECLARATION,
  FOUNDERS_RESOLUTION_001,
  LIBRARY_DNA,
  RULE_OF_ORIGINAL_THOUGHT,
} from "@/lib/library";
import {
  METADATA_RULE,
  RULE_OF_DELIBERATE_MATURITY,
  SINGLE_SOURCE_OF_TRUTH_PRINCIPLE,
} from "@/lib/knowledge";
import {
  CURSOR_ROLE,
  INSTITUTIONAL_BUILDER_HIERARCHY,
  LIBRARY_COUNCIL_MANDATE,
  STANKINGS_IDENTITY_ROLES,
} from "@/lib/institutional";
import { DevelopmentMethodology } from "@/components/DevelopmentMethodology";
import { MuseumVolumes } from "@/components/library/MuseumVolumes";
import { SITE } from "@/lib/data";

export function LibraryHub() {
  return (
    <>
      <MuseumVolumes />

      <DevelopmentMethodology />

      {/* Single Source of Truth */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            The Single Source of Truth Principle
          </p>
          <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-8 font-serif text-xl italic leading-relaxed text-cream">
            &ldquo;{SINGLE_SOURCE_OF_TRUTH_PRINCIPLE}&rdquo;
          </blockquote>
          <p className="mb-6 text-sm text-cream-muted">{METADATA_RULE}</p>
          <blockquote className="mb-6 rounded-lg border border-gold-subtle bg-ink-muted p-6 font-serif text-base italic text-cream-muted">
            &ldquo;{RULE_OF_DELIBERATE_MATURITY}&rdquo;
          </blockquote>
          <div className="flex flex-wrap gap-4">
          <Link
            href="/library/editorial-standards/editorial-workflow"
            className="text-sm text-gold hover:text-gold-light"
          >
            Editorial Workflow →
          </Link>
          <Link
            href="/library/standards/ls-001"
            className="text-sm text-gold hover:text-gold-light"
          >
              Read LS-001 (members) →
            </Link>
            <Link
              href="/library/canon"
              className="text-sm text-cream-muted hover:text-gold"
            >
              Canon Engine (members) →
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional stack */}
      <section className="border-b border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-gold">
            {CURSOR_ROLE}
          </p>
          <h2 className="mb-2 text-center font-serif text-2xl font-semibold text-cream">
            No feature skips the queue
          </h2>
          <p className="mb-8 text-center text-sm text-cream-muted">
            Canon before code. Every engineering decision traces upward.
          </p>
          <ol className="mx-auto max-w-md space-y-2">
            {INSTITUTIONAL_BUILDER_HIERARCHY.map((layer, i) => (
              <li
                key={layer}
                className="flex items-center gap-3 text-sm text-cream-muted"
              >
                <span className="w-5 text-right font-mono text-xs text-gold/50">
                  {i + 1}
                </span>
                <span className={i <= 2 ? "font-medium text-cream" : undefined}>
                  {layer}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stankings Identity */}
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            Stankings Identity
          </p>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Not login. Stewardship.
          </h2>
          <p className="mb-8 text-sm text-cream-muted">
            Each role unlocks more of the Library — not to hide knowledge, but
            because responsibility deepens with access.
          </p>
          <ol className="space-y-3">
            {STANKINGS_IDENTITY_ROLES.map((role) => (
              <li
                key={role.id}
                className="flex flex-col gap-1 border-l border-gold/20 pl-4 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-medium text-cream">{role.label}</span>
                <span className="text-xs text-cream-muted">{role.libraryAccess}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Learning Path — scaffold */}
      <section className="border-b border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-md px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            Custodian Programme
          </p>
          <h2 className="mb-2 font-serif text-2xl font-semibold text-cream">
            Learning Path
          </h2>
          <p className="mb-8 text-sm text-cream-muted">
            Future custodians do not see documents. They see a path — reading,
            reflection, and stewardship over time.
          </p>
          <p className="mb-6 text-sm text-cream-muted">
            Volume I is <span className="text-gold">frozen for Convention review</span>.
            Presentation, indexing, and cross-linking strengthen before Volume II.
          </p>
          <Link
            href="/library/constitutional-convention"
            className="mb-4 inline-block rounded border border-gold/40 px-6 py-3 text-sm text-gold hover:bg-gold-subtle"
          >
            Constitutional Convention →
          </Link>
          <p className="mb-6 text-sm text-cream-muted">
            Volume II has begun —{" "}
            <Link href="/library/governance-code/book-i" className="text-gold hover:text-gold-light">
              Book I — Governance Bodies
            </Link>
            {" "}implements the Constitution in daily practice. One Book at a time.
          </p>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6 text-left">
            <p className="mb-1 text-xs uppercase tracking-wider text-gold">
              Future Custodian
            </p>
            <p className="mb-4 text-sm text-cream-muted">Age 14 · Preview</p>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-ink">
              <div className="h-full w-[70%] rounded-full bg-gold/80" />
            </div>
            <p className="mb-4 font-mono text-xs text-cream-muted">70% complete</p>
            <p className="text-sm text-cream">
              Today&apos;s reading:{" "}
              <Link href="/library/constitution/article-xvii" className="text-gold hover:text-gold-light">
                Article XVII — Constitutional Ratification, Oath & Commitment
              </Link>
              {" · "}Leadership is accepted as a constitutional commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Declaration */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            Founder&apos;s Declaration
          </p>
          <div className="space-y-4 rounded-lg border border-gold-subtle bg-ink-muted p-8 leading-relaxed text-cream-muted">
            {FOUNDERS_DECLARATION.split("\n\n").map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Resolution 001 + rules */}
      <section className="border-t border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
              Founder&apos;s Resolution No. 001
            </p>
            <blockquote className="rounded-lg border border-gold/30 bg-gold-subtle p-8 font-serif text-xl italic leading-relaxed text-cream">
              &ldquo;{FOUNDERS_RESOLUTION_001}&rdquo;
            </blockquote>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
              The Rule of Original Thought
            </p>
            <blockquote className="rounded-lg border border-gold-subtle bg-ink-muted p-8 font-serif text-lg italic leading-relaxed text-cream-muted">
              &ldquo;{RULE_OF_ORIGINAL_THOUGHT}&rdquo;
            </blockquote>
          </div>
          <p className="text-sm text-cream-muted">{DRAFT_ZERO_NOTE}</p>
          <Link
            href="/library/archive/draft-zero"
            className="inline-block text-sm text-gold hover:text-gold-light"
          >
            View Draft Zero (archived, members only) →
          </Link>
        </div>
      </section>

      {/* DNA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-gold">
            The DNA of the Library
          </p>
          <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-cream">
            Eight editorial principles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LIBRARY_DNA.map((principle) => (
              <div
                key={principle.title}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <h3 className="mb-2 font-serif text-lg font-semibold text-cream">
                  {principle.title}
                </h3>
                <p className="text-sm text-cream-muted">{principle.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-serif text-lg italic text-cream-muted">
            &ldquo;{EDITORIAL_RULE}&rdquo;
          </p>
        </div>
      </section>

      {/* Library Council */}
      <section className="border-t border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            Constitutional — Planned
          </p>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            {LIBRARY_COUNCIL_MANDATE.title}
          </h2>
          <p className="mb-6 text-sm text-cream-muted">{LIBRARY_COUNCIL_MANDATE.note}</p>
          <ul className="space-y-2 text-sm text-cream-muted">
            {LIBRARY_COUNCIL_MANDATE.responsibilities.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold/60">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lexicon */}
      <section className="border-t border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
            Controlled Vocabulary
          </p>
          <h2 className="mb-4 font-serif text-3xl font-semibold text-cream">
            The Stankings Lexicon
          </h2>
          <p className="mb-8 text-cream-muted">
            Thirty-one approved definitions under{" "}
            <Link href="/library/standards/ls-002" className="text-gold hover:text-gold-light">
              LS-002
            </Link>
            . Institution, Trust, Stewardship, Custodian — one meaning, one institution.
          </p>
          <Link
            href="/library/lexicon"
            className="inline-block rounded-sm border border-gold-subtle px-8 py-3 text-sm text-cream transition hover:border-gold/40 hover:text-gold"
          >
            Open the Lexicon Module (members) →
          </Link>
        </div>
      </section>

      {/* Member CTA */}
      <section className="border-t border-gold-subtle bg-ink-light py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
            Enter as a steward
          </h2>
          <p className="mb-8 text-cream-muted">
            Volume 0, Volume I, the Canon, the Lexicon, and the Draft Zero
            archive await verified members.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={USER_REGISTER_PATH}
              className="rounded-sm border border-gold bg-gold px-8 py-3 text-sm font-semibold text-ink hover:bg-gold-light"
            >
              Create member account
            </Link>
            <Link
              href={loginUrl("/library/constitution")}
              className="rounded-sm border border-gold-subtle px-8 py-3 text-sm text-cream hover:border-gold/40 hover:text-gold"
            >
              Sign in to read the Constitution
            </Link>
          </div>
          <p className="mt-8 text-xs text-cream-muted/60">
            — {SITE.founder}, Founder
          </p>
        </div>
      </section>
    </>
  );
}
