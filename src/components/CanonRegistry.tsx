import Link from "next/link";
import { KnowledgeObjectCard } from "@/components/library-engine/KnowledgeObjectCard";
import { listKnowledgeObjects } from "@/lib/library-engine/queries";
import {
  KNOWLEDGE_ENGINEERING_MANIFESTO,
  METADATA_RULE,
  SINGLE_SOURCE_OF_TRUTH_PRINCIPLE,
} from "@/lib/knowledge";
import { RULE_OF_DELIBERATE_MATURITY } from "@/lib/standards/ls-001";

export async function CanonRegistry() {
  const objects = await listKnowledgeObjects();
  const canons = objects.filter((ko) => ko.objectType === "canon");

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            The Canon Engine
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Stankings Canon
          </h1>
          <p className="text-cream-muted">
            Authoritative knowledge objects registered under LS-001.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-8 leading-relaxed text-cream-muted">
          {KNOWLEDGE_ENGINEERING_MANIFESTO}
        </p>

        <blockquote className="mb-6 rounded-lg border border-gold/30 bg-gold-subtle p-6 font-serif text-lg italic text-cream">
          &ldquo;{SINGLE_SOURCE_OF_TRUTH_PRINCIPLE}&rdquo;
        </blockquote>

        <blockquote className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6 font-serif text-lg italic text-cream-muted">
          &ldquo;{RULE_OF_DELIBERATE_MATURITY}&rdquo;
        </blockquote>

        <p className="mb-12 text-sm text-cream-muted">{METADATA_RULE}</p>

        <div className="mb-8 flex flex-wrap gap-4 text-sm">
          <Link href="/library/standards/ls-001" className="text-gold hover:text-gold-light">
            Read LS-001 →
          </Link>
          <Link href="/library/standards/ls-002" className="text-gold hover:text-gold-light">
            Read LS-002 (Lexicon) →
          </Link>
          <Link href="/library/lexicon" className="text-cream-muted hover:text-gold">
            Lexicon Module →
          </Link>
          <Link
            href="/library/frameworks/purpose-assessment"
            className="text-cream-muted hover:text-gold"
          >
            Purpose Assessment →
          </Link>
          <Link
            href="/library/frameworks/trust-impact-assessment"
            className="text-cream-muted hover:text-gold"
          >
            Trust Impact Assessment →
          </Link>
          <Link
            href="/library/frameworks/leadership-stewardship"
            className="text-cream-muted hover:text-gold"
          >
            Leadership Stewardship →
          </Link>
          <Link
            href="/library/frameworks/ecosystem-impact-assessment"
            className="text-cream-muted hover:text-gold"
          >
            Ecosystem Impact Assessment →
          </Link>
          <Link
            href="/library/ecosystem"
            className="text-cream-muted hover:text-gold"
          >
            Ecosystem Map →
          </Link>
          <Link
            href="/library/frameworks/generational-review"
            className="text-cream-muted hover:text-gold"
          >
            Generational Review →
          </Link>
          <Link
            href="/library/frameworks/institutional-decision-record"
            className="text-cream-muted hover:text-gold"
          >
            Decision Records →
          </Link>
          <Link
            href="/library/decisions"
            className="text-cream-muted hover:text-gold"
          >
            Decision Registry →
          </Link>
          <Link
            href="/library/frameworks/excellence"
            className="text-cream-muted hover:text-gold"
          >
            Excellence Framework →
          </Link>
          <Link
            href="/library/excellence"
            className="text-cream-muted hover:text-gold"
          >
            Standards of Excellence →
          </Link>
        </div>

        <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
          Registered canons ({canons.length})
        </h2>
        <div className="mb-16 space-y-6">
          {canons.map((ko) => (
            <KnowledgeObjectCard key={ko.identifier} ko={ko} />
          ))}
        </div>

        <Link href="/library" className="text-sm text-gold hover:text-gold-light">
          ← Back to The Stankings Library
        </Link>
      </div>
    </>
  );
}
