import Link from "next/link";
import { SITE } from "@/lib/data";
import {
  INSTITUTION_STACK,
  THE_FIRST_PRINCIPLE,
  THE_OPENING,
  VOLUME_ZERO_EDITION,
  VOLUME_ZERO_TAGLINE,
} from "@/lib/first-principles";
import {
  VOLUME_ZERO_AMENDMENT_POLICY,
  VOLUME_ZERO_CANON_COUNT,
} from "@/lib/volume-zero/version";
import type { KnowledgeObject } from "@/lib/standards/ls-001";
import { KnowledgeMetadataPanel } from "@/components/library-engine/KnowledgeObjectCard";

interface FirstPrinciplesDraftOneProps {
  canon: KnowledgeObject | null;
  canon002?: KnowledgeObject | null;
}

export function FirstPrinciplesDraftOne({ canon, canon002 }: FirstPrinciplesDraftOneProps) {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Volume 0 · {VOLUME_ZERO_EDITION}
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream md:text-5xl">
            The First Principles
          </h1>
          <p className="mb-4 text-lg italic text-gold/90">{VOLUME_ZERO_TAGLINE}</p>
          <p className="text-cream-muted">
            Philosophy — not law. {VOLUME_ZERO_CANON_COUNT} Canons sealed at Version 1.0.
            Changes require formal Council review.
          </p>
          <p className="mt-6">
            <Link
              href="/library/constitution"
              className="text-sm text-gold hover:text-gold-light"
            >
              Volume I — The Constitution →
            </Link>
          </p>
          <p className="mt-4 text-sm text-cream-muted/70">Founder: {SITE.founder}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <aside className="mb-16 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
            The institutional stack
          </p>
          <ol className="space-y-1 text-sm text-cream-muted">
            {INSTITUTION_STACK.map((layer, i) => (
              <li key={layer} className="flex items-center gap-3">
                <span className="w-4 text-right text-xs text-gold/50">{i}</span>
                <span className={i <= 1 ? "text-cream" : undefined}>{layer}</span>
                {layer === "Software" && (
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-gold/60">
                    nine layers down
                  </span>
                )}
              </li>
            ))}
          </ol>
        </aside>

        <nav className="mb-12 flex flex-wrap gap-4 text-sm lg:hidden">
          <a href="#the-opening" className="text-gold">
            The Opening
          </a>
          <a href="#the-first-principle" className="text-cream-muted hover:text-gold">
            The First Principle
          </a>
          <a href="#the-stankings-canon" className="text-cream-muted hover:text-gold">
            The Stankings Canon
          </a>
        </nav>

        <article className="min-w-0">
          <section id="the-opening" className="mb-16 scroll-mt-28">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              The Opening
            </p>
            <div className="space-y-4 leading-relaxed text-cream-muted">
              {THE_OPENING.split("\n\n").map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className={para.length < 60 ? "font-serif text-lg text-cream/90" : undefined}
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section
            id="the-first-principle"
            className="mb-16 scroll-mt-28 border-t border-gold-subtle pt-16"
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              The First Principle
            </p>
            <div className="rounded-lg border border-gold/40 bg-gold-subtle p-8 md:p-12">
              <div className="space-y-4 font-serif text-lg leading-relaxed text-cream md:text-xl">
                {THE_FIRST_PRINCIPLE.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </div>
            {canon && (
              <div className="mt-8">
                <KnowledgeMetadataPanel ko={canon} />
              </div>
            )}
          </section>

          <section
            id="the-stankings-canon"
            className="mb-16 scroll-mt-28 border-t border-gold-subtle pt-16"
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              The Stankings Canon
            </p>
            <div className="space-y-4">
              <Link
                href="/library/canon/CANON-001"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-001</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Institutions Exist to Serve
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  The foundational principle upon which everything else is built.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-002"
                className="block rounded-lg border border-gold/30 bg-gold-subtle p-6 transition hover:border-gold/40"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-002</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Trust Is Institutional Capital
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Trust is the greatest form of institutional capital. Every decision
                  measured by the Trust Test.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-003"
                className="block rounded-lg border border-gold/30 bg-gold-subtle p-6 transition hover:border-gold/40"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-003</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Purpose Precedes Profit
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Every institution must solve meaningful problems — profit sustains,
                  purpose justifies.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-004"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-004</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Leadership Is Stewardship
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Authority is entrusted, never owned. Every leader leaves the institution
                  stronger for those who follow.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-005"
                className="block rounded-lg border border-gold/30 bg-gold-subtle p-6 transition hover:border-gold/40"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-005</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  The Ecosystem Is Greater Than Any Single Institution
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Every company has its lane. The ecosystem is always greater than the sum
                  of its parts.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-006"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-006</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Think in Generations, Act in the Present
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Build beyond your tenure. Every decision must strengthen the institution
                  for those who come after us.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-007"
                className="block rounded-lg border border-gold/30 bg-gold-subtle p-6 transition hover:border-gold/40"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-007</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Truth Before Convenience
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Evidence over assumption. Every significant decision captured in
                  institutional memory.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-008"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-008</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Excellence Is a Discipline, Not an Event
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Ordinary things done extraordinarily well — every day, not only when
                  someone is watching.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-009"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-009</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Learn Continuously, Improve Deliberately
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Learning is not an event — experience becomes institutional knowledge
                  that strengthens every generation.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-010"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-010</p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  People Are Ends, Never Merely Means
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Dignity, fairness, and respect — people are the reason the institution
                  exists.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-011"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-011</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Operational Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Simplicity Creates Strength
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Clarity over complexity — simple where possible, sophisticated only
                  where necessary.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-012"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-012</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Architectural Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Build Platforms, Not Silos
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Shared capabilities strengthen the ecosystem — build once, reuse
                  responsibly.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-013"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-013</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Innovation Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Innovate with Purpose
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Innovation serves purpose — experiment boldly, scale on proven value.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-014"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-014</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Credibility Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Our Word Is a Commitment
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Speak carefully, promise responsibly — reputation measured by promises kept.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-015"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-015</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Resilience Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Accountability Builds Resilience
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Failures addressed with integrity — experience becomes institutional wisdom.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-016"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-016</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Strategic Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Build for Institutional Strength
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Stronger before bigger — growth measured by institutional capability.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-017"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-017</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Defining Strategic Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Reduce Uncertainty
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  We build trusted institutions that reduce uncertainty and increase confidence.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-018"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-018</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Strategic Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Principles Before Opportunity
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  No opportunity justifies abandoning the principles upon which we are built.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-019"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-019</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Legacy Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Leave It Better Than You Found It
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Every generation strengthens the institution for those who follow.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-020"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-020</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Capstone Legacy Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Exercise Sound Judgment
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Policies guide. Canons shape. Judgment applies principles wisely.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-021"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-021</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Knowledge Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Knowledge Is an Institutional Asset
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Preserve knowledge with the same seriousness as capital — the Library is memory.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-022"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-022</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Civilization Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Create Value That Outlasts Us
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Leave society stronger than we found it — measured by what remains because we were here.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-023"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-023</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Civilization Canon
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Remain Humble Enough to Learn
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Stable principles, adaptable methods — the better idea wins when evidence supports it.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-024"
                className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/30"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-024</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Volume 0 Pillar
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Raise the Standard
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Leave every industry stronger — compete through excellence, not lowered standards.
                </p>
              </Link>
              <Link
                href="/library/canon/CANON-025"
                className="block rounded-lg border border-gold/30 bg-gold-subtle p-6 transition hover:border-gold/40"
              >
                <p className="mb-1 font-mono text-sm text-gold">CANON-025</p>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-gold/80">
                  Volume 0 Capstone
                </p>
                <h3 className="font-serif text-xl font-semibold text-cream">
                  Be Worthy of Endurance
                </h3>
                <p className="mt-2 text-sm text-cream-muted">
                  Endurance is earned — stewardship of civilization, not mere survival through time.
                </p>
              </Link>
            </div>
            <p className="mt-6 rounded-lg border border-gold/30 bg-gold-subtle px-4 py-3 text-center text-sm text-cream">
              Volume 0 complete — {VOLUME_ZERO_CANON_COUNT} Canons at Version 1.0.{" "}
              <Link href="/library/canon-maturity" className="text-gold hover:text-gold-light">
                Canon Maturity Dashboard →
              </Link>
              {" · "}
              <Link href="/library/constitution" className="text-gold hover:text-gold-light">
                Volume I begins →
              </Link>
            </p>
            <p className="mt-4 text-center text-xs italic text-cream-muted">
              {VOLUME_ZERO_AMENDMENT_POLICY.split("\n\n")[0]}
            </p>
            <p className="mt-6 text-sm text-cream-muted">
              Moral Foundation: CANON-001–010 · Operational:{" "}
              <Link href="/library/canon/CANON-011" className="text-gold hover:text-gold-light">
                CANON-011
              </Link>
              {" · Architectural: "}
              <Link href="/library/canon/CANON-012" className="text-gold hover:text-gold-light">
                CANON-012
              </Link>
              {" · Innovation: "}
              <Link href="/library/canon/CANON-013" className="text-gold hover:text-gold-light">
                CANON-013
              </Link>
              {" · Credibility: "}
              <Link href="/library/canon/CANON-014" className="text-gold hover:text-gold-light">
                CANON-014
              </Link>
              {" · Resilience: "}
              <Link href="/library/canon/CANON-015" className="text-gold hover:text-gold-light">
                CANON-015
              </Link>
              {" · Strategic: "}
              <Link href="/library/canon/CANON-016" className="text-gold hover:text-gold-light">
                CANON-016
              </Link>
              {", "}
              <Link href="/library/canon/CANON-017" className="text-gold hover:text-gold-light">
                CANON-017
              </Link>
              {", "}
              <Link href="/library/canon/CANON-018" className="text-gold hover:text-gold-light">
                CANON-018
              </Link>
              {" · Legacy: "}
              <Link href="/library/canon/CANON-019" className="text-gold hover:text-gold-light">
                CANON-019
              </Link>
              {", "}
              <Link href="/library/canon/CANON-020" className="text-gold hover:text-gold-light">
                CANON-020
              </Link>
              {", "}
              <Link href="/library/canon/CANON-021" className="text-gold hover:text-gold-light">
                CANON-021
              </Link>
              {", "}
              <Link href="/library/canon/CANON-022" className="text-gold hover:text-gold-light">
                CANON-022
              </Link>
              {", "}
              <Link href="/library/canon/CANON-023" className="text-gold hover:text-gold-light">
                CANON-023
              </Link>
              {", "}
              <Link href="/library/canon/CANON-024" className="text-gold hover:text-gold-light">
                CANON-024
              </Link>
              {", "}
              <Link href="/library/canon/CANON-025" className="text-gold hover:text-gold-light">
                CANON-025
              </Link>
              {" · Capstone: "}
              <Link href="/library/canon-maturity" className="text-gold/80 hover:text-gold-light">
                CMD
              </Link>
              {" · Civilization: "}
              <Link href="/library/legacy" className="text-gold/80 hover:text-gold-light">
                LEGACY
              </Link>
              {", "}
              <Link href="/library/knowledge-challenges" className="text-gold/80 hover:text-gold-light">
                KCP
              </Link>
              {", "}
              <Link href="/library/industry-leadership" className="text-gold/80 hover:text-gold-light">
                ILD
              </Link>
              {" · Culture: "}
              <Link href="/library/canon/CANON-008" className="text-gold hover:text-gold-light">
                CANON-008
              </Link>
              {" · Learning: "}
              <Link href="/library/canon/CANON-009" className="text-gold hover:text-gold-light">
                CANON-009
              </Link>
              {" · People: "}
              <Link href="/library/canon/CANON-010" className="text-gold hover:text-gold-light">
                CANON-010
              </Link>
              {" · "}Gates:{" "}
              <Link href="/library/frameworks/purpose-assessment" className="text-gold hover:text-gold-light">
                PAF
              </Link>
              {" → "}
              <Link href="/library/frameworks/trust-impact-assessment" className="text-gold hover:text-gold-light">
                TIA
              </Link>
              {" → "}
              <Link href="/library/frameworks/ecosystem-impact-assessment" className="text-gold hover:text-gold-light">
                EIA
              </Link>
              {" → "}
              <Link href="/library/frameworks/generational-review" className="text-gold hover:text-gold-light">
                GRF
              </Link>
              {" · Decisions: "}
              <Link href="/library/frameworks/institutional-decision-record" className="text-gold hover:text-gold-light">
                IDR
              </Link>
              {" · Leadership: "}
              <Link href="/library/frameworks/leadership-stewardship" className="text-gold hover:text-gold-light">
                LSF
              </Link>
              {" · "}
              <Link href="/library/excellence" className="text-gold hover:text-gold-light">
                Excellence Standards
              </Link>
              {" · Learning: "}
              <Link href="/library/lessons" className="text-gold hover:text-gold-light">
                Lessons Learned
              </Link>
              {" · People: "}
              <Link href="/library/frameworks/human-impact-review" className="text-gold hover:text-gold-light">
                Human Impact Review
              </Link>
              {" · Simplicity: "}
              <Link href="/library/frameworks/simplicity-review" className="text-gold hover:text-gold-light">
                Simplicity Review
              </Link>
              {" · Platforms: "}
              <Link href="/library/platforms" className="text-gold hover:text-gold-light">
                Platform Registry
              </Link>
              {" · "}
              <Link href="/library/frameworks/platform-assessment" className="text-gold hover:text-gold-light">
                Platform Assessment
              </Link>
              {" · Innovation: "}
              <Link href="/library/frameworks/innovation-governance" className="text-gold hover:text-gold-light">
                Innovation Governance
              </Link>
              {" · Commitments: "}
              <Link href="/library/commitments" className="text-gold hover:text-gold-light">
                Commitment Registry
              </Link>
              {" · Incidents: "}
              <Link href="/library/incidents" className="text-gold hover:text-gold-light">
                Incident Center
              </Link>
              {" · "}
              <Link href="/library/canon-dashboard" className="text-gold hover:text-gold-light">
                Canon Dashboard
              </Link>
              {" · Strength: "}
              <Link href="/library/frameworks/institutional-strength-assessment" className="text-gold hover:text-gold-light">
                Strength Assessment
              </Link>
              {" · Uncertainty: "}
              <Link href="/library/frameworks/uncertainty-reduction" className="text-gold hover:text-gold-light">
                URF
              </Link>
              {" · Principles: "}
              <Link href="/library/frameworks/principles-alignment-review" className="text-gold hover:text-gold-light">
                PAR
              </Link>
              {" · Improvement: "}
              <Link href="/library/improvements" className="text-gold hover:text-gold-light">
                IIR
              </Link>
              {" · "}
              <Link href="/library/frameworks/annual-stewardship-review" className="text-gold/80 hover:text-gold-light">
                ASR
              </Link>
              {" · Judgment: "}
              <Link href="/library/decision-intelligence" className="text-gold hover:text-gold-light">
                IDI
              </Link>
              {" · Knowledge: "}
              <Link href="/library/knowledge-graph" className="text-gold hover:text-gold-light">
                IKG
              </Link>
              {" · Legacy: "}
              <Link href="/library/legacy" className="text-gold hover:text-gold-light">
                LEGACY
              </Link>
              {" · Humility: "}
              <Link href="/library/knowledge-challenges" className="text-gold hover:text-gold-light">
                KCP
              </Link>
              {" · Industry: "}
              <Link href="/library/industry-leadership" className="text-gold hover:text-gold-light">
                ILD
              </Link>
              {" · Maturity: "}
              <Link href="/library/canon-maturity" className="text-gold hover:text-gold-light">
                CMD
              </Link>
              {" · "}
              <Link href="/library/ecosystem" className="text-gold/80 hover:text-gold-light">
                Ecosystem Map
              </Link>
            </p>
            {canon002 && (
              <div className="mt-8">
                <KnowledgeMetadataPanel ko={canon002} compact />
              </div>
            )}
          </section>

          <section className="mb-16 border-t border-gold-subtle pt-16">
            <p className="text-sm text-cream-muted">
              Volume 0 is philosophy. Constitutional law begins in{" "}
              <Link href="/library/constitution" className="text-gold hover:text-gold-light">
                Volume I — The Constitution
              </Link>
              . Governed by{" "}
              <Link href="/library/standards/ls-001" className="text-gold hover:text-gold-light">
                LS-001
              </Link>
              .
            </p>
          </section>

          <Link href="/library" className="text-sm text-gold hover:text-gold-light">
            ← Back to The Stankings Library
          </Link>
        </article>
      </div>
    </>
  );
}
