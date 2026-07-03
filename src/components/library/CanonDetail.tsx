import Link from "next/link";
import type { CanonSection } from "@/lib/canon";
import type { CanonExtendedMetadata } from "@/lib/canon/types";
import { CanonApplicationsBanner, CanonExtendedPanelsTail } from "@/components/canon/CanonExtendedPanels";
import type { KnowledgeObject } from "@/lib/standards/ls-001";
import {
  KNOWLEDGE_OBJECT_TYPE_LABELS,
  VISIBILITY_LABELS,
} from "@/lib/standards/ls-001";
import { KnowledgeMetadataPanel } from "@/components/library-engine/KnowledgeObjectCard";

interface CanonDetailProps {
  canon: KnowledgeObject;
  structuredSections?: CanonSection[] | null;
  extended?: CanonExtendedMetadata | null;
}

function objectHref(identifier: string): string {
  if (identifier.startsWith("CANON-")) {
    return `/library/canon/${encodeURIComponent(identifier)}`;
  }
  if (identifier === "LS-001") return "/library/standards/ls-001";
  if (identifier === "LS-002") return "/library/standards/ls-002";
  if (identifier === "FRAMEWORK-PAF-001") {
    return "/library/frameworks/purpose-assessment";
  }
  if (identifier === "FRAMEWORK-LSF-001") {
    return "/library/frameworks/leadership-stewardship";
  }
  if (identifier === "FRAMEWORK-EIA-001") {
    return "/library/frameworks/ecosystem-impact-assessment";
  }
  if (identifier === "FRAMEWORK-GRF-001") {
    return "/library/frameworks/generational-review";
  }
  if (identifier === "FRAMEWORK-IDR-001") {
    return "/library/frameworks/institutional-decision-record";
  }
  if (identifier === "FRAMEWORK-EXF-001") {
    return "/library/frameworks/excellence";
  }
  if (identifier.startsWith("IDR-")) {
    return `/library/decisions/${encodeURIComponent(identifier)}`;
  }
  if (identifier.startsWith("LEX-")) {
    const slug = identifier.replace("LEX-", "").toLowerCase().replace(/_/g, "-");
    return `/library/lexicon/${slug}`;
  }
  return `/energy/library/objects/${encodeURIComponent(identifier)}`;
}

function ImportanceStars({ rating }: { rating: number }) {
  return (
    <span className="text-gold tracking-widest" aria-label={`${rating} of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-cream-muted/30">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function CanonSection({
  title,
  children,
  placeholder,
}: {
  title: string;
  children?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <section className="border-t border-gold-subtle py-10">
      <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        {title}
      </h2>
      {children ?? (
        <p className="text-sm italic text-cream-muted/70">
          {placeholder ?? "Reserved for future institutional content."}
        </p>
      )}
    </section>
  );
}

export function CanonDetail({ canon, structuredSections, extended }: CanonDetailProps) {
  const importance = canon.importance ?? 3;
  const relatedLinks = [
    ...canon.dependencies.map((id) => ({ identifier: id, kind: "depends on" as const })),
    ...canon.references
      .filter((r) => r.identifier.startsWith("CANON-"))
      .map((r) => ({ identifier: r.identifier, kind: "related" as const })),
  ];

  return (
    <>
      <section className="border-b border-gold-subtle py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-mono text-sm text-gold">{canon.identifier}</p>
          <h1 className="mb-8 font-serif text-4xl font-semibold leading-tight text-cream md:text-5xl">
            {canon.title}
          </h1>

          <dl className="space-y-6 border-y border-gold-subtle py-8">
            <div>
              <dt className="mb-1 text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                Status
              </dt>
              <dd className="capitalize text-cream">{canon.status.replace("_", " ")}</dd>
            </div>
            <div>
              <dt className="mb-1 text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                Importance
              </dt>
              <dd>
                <ImportanceStars rating={importance} />
              </dd>
            </div>
            {relatedLinks.length > 0 && (
              <div>
                <dt className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                  Related Objects
                </dt>
                <dd className="flex flex-wrap gap-3">
                  {relatedLinks.map((r) => (
                    <Link
                      key={`${r.kind}-${r.identifier}`}
                      href={objectHref(r.identifier)}
                      className="font-mono text-sm text-gold hover:text-gold-light"
                    >
                      {r.identifier}
                    </Link>
                  ))}
                </dd>
              </div>
            )}
            {canon.referencedBy.length > 0 && (
              <div>
                <dt className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                  Referenced By
                </dt>
                <dd className="flex flex-col gap-2">
                  {canon.referencedBy.map((r) => (
                    <Link
                      key={r.identifier}
                      href={r.href ?? `/energy/library/objects/${encodeURIComponent(r.identifier)}`}
                      className="text-sm text-cream-muted hover:text-gold"
                    >
                      {r.title}{" "}
                      <span className="font-mono text-xs text-gold/70">({r.identifier})</span>
                    </Link>
                  ))}
                </dd>
              </div>
            )}
            <div>
              <dt className="mb-1 text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                Version
              </dt>
              <dd className="text-cream">v{canon.version}</dd>
            </div>
            <div>
              <dt className="mb-1 text-[10px] uppercase tracking-[0.3em] text-cream-muted">
                Visibility
              </dt>
              <dd className="text-cream">{VISIBILITY_LABELS[canon.visibility]}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        {extended && (
          <div className="mb-12">
            <CanonApplicationsBanner extended={extended} />
          </div>
        )}

        {structuredSections && structuredSections.length > 0 ? (
          <div className="space-y-12">
            {structuredSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 ${index > 0 ? "border-t border-gold-subtle pt-12" : ""}`}
              >
                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                  {section.title}
                </h2>
                <div
                  className={`space-y-4 font-serif leading-relaxed text-cream ${
                    section.id === "statement" || section.id === "the-trust-test"
                      ? "text-xl md:text-2xl"
                      : "text-lg"
                  }`}
                >
                  {section.paragraphs.map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          canon.bodyMarkdown && (
            <CanonSection title="Canon Text">
              <div className="space-y-4 font-serif text-lg leading-relaxed text-cream">
                {canon.bodyMarkdown.split("\n\n").map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </CanonSection>
          )
        )}

        {canon.identifier === "CANON-002" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Decision Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-002 enables measurable trust impact on every significant proposal.
            </p>
            <Link
              href="/library/frameworks/trust-impact-assessment"
              className="text-gold hover:text-gold-light"
            >
              Trust Impact Assessment Framework →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-003" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Decision Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-003 gates every new institution — Purpose Assessment before profit.
            </p>
            <Link
              href="/library/frameworks/purpose-assessment"
              className="text-gold hover:text-gold-light"
            >
              Purpose Assessment Framework →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-004" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Leadership Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-004 governs how we lead — stewardship plans for every leadership role.
            </p>
            <Link
              href="/library/frameworks/leadership-stewardship"
              className="text-gold hover:text-gold-light"
            >
              Leadership Stewardship Framework →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-005" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Ecosystem Architecture
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-005 protects institutional harmony — every company knows its lane.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/library/ecosystem"
                className="text-gold hover:text-gold-light"
              >
                Ecosystem Map →
              </Link>
              <Link
                href="/library/frameworks/ecosystem-impact-assessment"
                className="text-gold hover:text-gold-light"
              >
                Ecosystem Impact Assessment →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-006" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Generational Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-006 defines our relationship with time — think in generations, act in the present.
            </p>
            <Link
              href="/library/frameworks/generational-review"
              className="text-gold hover:text-gold-light"
            >
              Generational Review Framework →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-007" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Decision Architecture
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-007 governs how we decide — truth before convenience, evidence before conclusions.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/library/frameworks/institutional-decision-record"
                className="text-gold hover:text-gold-light"
              >
                Institutional Decision Record →
              </Link>
              <Link
                href="/library/decisions"
                className="text-gold hover:text-gold-light"
              >
                Decision Record Registry →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-008" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Culture Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-008 defines how we behave — excellence as daily discipline, not occasional achievement.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/library/frameworks/excellence"
                className="text-gold hover:text-gold-light"
              >
                Excellence Framework →
              </Link>
              <Link
                href="/library/excellence"
                className="text-gold hover:text-gold-light"
              >
                Standards of Excellence →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-009" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Learning Infrastructure
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-009 defines how we learn — every experience becomes institutional knowledge.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/library/frameworks/lessons-learned"
                className="text-gold hover:text-gold-light"
              >
                Lessons Learned Repository →
              </Link>
              <Link
                href="/library/lessons"
                className="text-gold hover:text-gold-light"
              >
                Lessons Learned Registry →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-010" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              People &amp; Dignity
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-010 defines how we treat people — dignity, fairness, and respect in every decision.
            </p>
            <Link
              href="/library/frameworks/human-impact-review"
              className="text-gold hover:text-gold-light"
            >
              Human Impact Review →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-011" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Operational Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-011 begins the Operational Canons — simplicity as engineering philosophy.
            </p>
            <Link
              href="/library/frameworks/simplicity-review"
              className="text-gold hover:text-gold-light"
            >
              Simplicity Review →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-012" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Architectural Module
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-012 begins the Architectural Canons — shared platforms over silos.
              Every engineer should know what exists before building.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/library/platforms"
                className="text-gold hover:text-gold-light"
              >
                Platform Registry →
              </Link>
              <Link
                href="/library/frameworks/platform-assessment"
                className="text-gold hover:text-gold-light"
              >
                Platform Assessment →
              </Link>
              <Link
                href="/library/ecosystem"
                className="text-cream-muted hover:text-gold"
              >
                Ecosystem Map →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-013" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Innovation Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-013 begins the Innovation Canons — purposeful innovation without
              institutional drift. Emerging technologies governed, not feared.
            </p>
            <Link
              href="/library/frameworks/innovation-governance"
              className="text-gold hover:text-gold-light"
            >
              Innovation Governance Framework →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-014" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Credibility Module
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-014 begins the Credibility Canons — promises made thoughtfully,
              fulfilled faithfully. Every significant public commitment traceable.
            </p>
            <Link
              href="/library/commitments"
              className="text-gold hover:text-gold-light"
            >
              Commitment Registry →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-015" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Resilience Module
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-015 begins the Resilience Canons — accountability when things go wrong,
              blameless learning, institutional improvement.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/incidents" className="text-gold hover:text-gold-light">
                Incident Center →
              </Link>
              <Link
                href="/library/frameworks/incident-accountability"
                className="text-gold hover:text-gold-light"
              >
                IIAF →
              </Link>
              <Link href="/library/canon-dashboard" className="text-cream-muted hover:text-gold">
                Canon Dashboard →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-016" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Strategic Framework
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-016 begins the Strategic Canons — how to grow by strengthening the
              institution, not merely enlarging it.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/library/frameworks/institutional-strength-assessment"
                className="text-gold hover:text-gold-light"
              >
                Institutional Strength Assessment →
              </Link>
              <Link href="/library/ecosystem" className="text-cream-muted hover:text-gold">
                Ecosystem Map →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-017" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Defining Strategic Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-017 unifies the ecosystem — we build trusted institutions that reduce
              uncertainty and increase confidence. The confidence business.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              We build trusted institutions that reduce uncertainty and increase confidence.
            </blockquote>
            <Link
              href="/library/frameworks/uncertainty-reduction"
              className="text-gold hover:text-gold-light"
            >
              Uncertainty Reduction Framework →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-018" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Strategic Governance Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-018 protects the institution from itself — opportunities are temporary,
              principles endure. Every compromise creates a precedent.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Opportunities are temporary. Principles endure.
            </blockquote>
            <Link
              href="/library/frameworks/principles-alignment-review"
              className="text-gold hover:text-gold-light"
            >
              Principles Alignment Review →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-019" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Legacy Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-019 bridges Family Constitution and Group Constitution — every custodian
              improves the institution for those who follow. Not consume; compound.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Receive with gratitude. Improve with diligence. Pass forward with honour.
            </blockquote>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/improvements" className="text-gold hover:text-gold-light">
                Improvement Register →
              </Link>
              <Link
                href="/library/frameworks/annual-stewardship-review"
                className="text-cream-muted hover:text-gold"
              >
                Annual Stewardship Review →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-020" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Capstone Legacy Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-020 bridges character and institutional intelligence — policies guide,
              Canons shape, judgment applies. Technology supports; it never replaces accountability.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Principles establish direction. Knowledge provides understanding. Judgment determines action.
            </blockquote>
            <Link
              href="/library/decision-intelligence"
              className="text-gold hover:text-gold-light"
            >
              Institutional Decision Intelligence →
            </Link>
          </section>
        )}

        {canon.identifier === "CANON-021" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Constitutional Knowledge Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-021 explains why the Library exists — knowledge is an institutional asset,
              not a document. The dynasty stands when knowledge survives people.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Acquire. Preserve. Share. Improve.
            </blockquote>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/knowledge-graph" className="text-gold hover:text-gold-light">
                Knowledge Graph →
              </Link>
              <Link href="/library/standards/ls-001" className="text-cream-muted hover:text-gold">
                LS-001 →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-022" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Civilization Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-022 marks where the institution begins speaking about civilization — not
              politics or ideology, but nation-building through enduring value. The ultimate
              measure is what remains because we were here.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Build responsibly. Serve faithfully. Create lasting value. Leave society stronger
              than we found it.
            </blockquote>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/legacy" className="text-gold hover:text-gold-light">
                Legacy Dashboard →
              </Link>
              <Link href="/library/lexicon/legacy" className="text-cream-muted hover:text-gold">
                Lexicon: Legacy →
              </Link>
              <Link
                href="/library/frameworks/annual-stewardship-review"
                className="text-cream-muted hover:text-gold"
              >
                Department ASR (CANON-019) →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-023" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Civilization Canon — Teachability
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-023 protects what successful institutions eventually risk losing: the willingness
              to keep asking questions. Stable principles; adaptable methods. Longevity earns respect;
              evidence earns improvement.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Learn continuously. Question respectfully. Improve courageously. Remain humble.
            </blockquote>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/knowledge-challenges" className="text-gold hover:text-gold-light">
                Knowledge Challenge Process →
              </Link>
              <Link href="/library/lexicon/humility" className="text-cream-muted hover:text-gold">
                Lexicon: Humility →
              </Link>
              <Link href="/library/lessons" className="text-cream-muted hover:text-gold">
                Lessons Learned →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-024" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Volume 0 Pillar — Standard Setter
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-024 is where companies stop being businesses and become standard setters. Not
              domination or monopoly — every institution improves the industry it enters. Mission
              one: serve customers. Mission two: improve the industry.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Do not merely compete. Improve. Do not merely participate. Elevate.
            </blockquote>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/industry-leadership" className="text-gold hover:text-gold-light">
                Industry Leadership Dashboard →
              </Link>
              <Link href="/library/lexicon/standard" className="text-cream-muted hover:text-gold">
                Lexicon: Standard →
              </Link>
              <Link href="/library/legacy" className="text-cream-muted hover:text-gold">
                Stewardship Reports →
              </Link>
            </div>
          </section>
        )}

        {canon.identifier === "CANON-025" && (
          <section className="mt-12 border-t border-gold-subtle pt-10">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Volume 0 Capstone — Closing Canon
            </h2>
            <p className="mb-4 text-sm text-cream-muted">
              CANON-025 closes Volume 0. We began with why institutions exist; we end with why they
              deserve to continue. Stewardship of civilization — endurance earned, not inherited.
            </p>
            <blockquote className="mb-4 border-l-2 border-gold/40 pl-4 font-serif italic text-cream">
              Serve faithfully. Steward responsibly. Improve continually. Remain worthy.
            </blockquote>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/library/canon-maturity" className="text-gold hover:text-gold-light">
                Canon Maturity Dashboard →
              </Link>
              <Link href="/library/lexicon/endurance" className="text-cream-muted hover:text-gold">
                Lexicon: Endurance →
              </Link>
              <Link href="/library/constitution" className="text-cream-muted hover:text-gold">
                Volume I — Constitution →
              </Link>
            </div>
          </section>
        )}

        {extended && <CanonExtendedPanelsTail extended={extended} />}

        <CanonSection title="Historical Notes">
          {canon.historicalNotes ? (
            <p className="text-cream-muted leading-relaxed">{canon.historicalNotes}</p>
          ) : undefined}
        </CanonSection>

        <CanonSection
          title="Discussion"
          placeholder="Council deliberation and amendment discourse will be recorded here."
        />

        <CanonSection title="Versions">
          <p className="text-sm text-cream-muted">
            Current: v{canon.version} ·{" "}
            <span className="capitalize">{canon.status.replace("_", " ")}</span>
            {canon.updatedAt && <> · Last updated {canon.updatedAt}</>}
          </p>
        </CanonSection>

        <CanonSection
          title="Print"
          placeholder="Print-ready export — forthcoming."
        />

        <CanonSection
          title="AI Explanation"
          placeholder="Institutional AI may explain this canon in plain language for custodians in training."
        />

        <CanonSection
          title="Teaching Notes"
          placeholder="Reflection questions and learning path material for the Custodian Programme."
        />

        <div className="mt-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            LS-001 Metadata
          </p>
          <KnowledgeMetadataPanel ko={canon} compact />
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/canon" className="text-gold hover:text-gold-light">
            ← All Canons
          </Link>
          <Link href="/library" className="text-cream-muted hover:text-gold">
            The Stankings Library
          </Link>
          {canon.volumeSlug === "first-principles" && (
            <Link
              href="/library/first-principles"
              className="text-cream-muted hover:text-gold"
            >
              Volume 0 — {KNOWLEDGE_OBJECT_TYPE_LABELS[canon.objectType]} in context →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
