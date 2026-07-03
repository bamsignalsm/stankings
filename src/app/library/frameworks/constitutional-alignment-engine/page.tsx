import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import {
  CAE_ALIGNMENT_QUESTION,
  CAE_BODY,
  CAE_COMPLIANCE_GATES,
  CAE_FRAMEWORK,
  CAE_PURPOSE,
  CONSTITUTIONAL_CHAIN_OF_AUTHORITY,
} from "@/lib/frameworks/constitutional-alignment-engine";
import { EXECUTIVE_DECISION_30 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitutional Alignment Engine Framework",
  description: "FRAMEWORK-CAE-001 — constitutional compliance before Board approval.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalAlignmentEngineFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CAE_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CAE_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CAE_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_30}
        </blockquote>
        <p className="mb-8 text-center font-serif text-lg italic text-cream">
          &ldquo;{CAE_ALIGNMENT_QUESTION}&rdquo;
        </p>
        <pre className="mb-8 whitespace-pre-wrap rounded-lg border border-gold-subtle bg-ink-muted p-6 text-sm text-cream-muted">
          {CONSTITUTIONAL_CHAIN_OF_AUTHORITY.join("\n↓\n")}
        </pre>
        <ul className="mb-8 space-y-2">
          {CAE_COMPLIANCE_GATES.map((g) => (
            <li key={g.id} className="text-sm text-cream-muted">
              — {g.label}
            </li>
          ))}
        </ul>
        <div className="whitespace-pre-wrap text-sm text-cream-muted">{CAE_BODY}</div>
        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/constitutional-alignment" className="text-gold hover:text-gold-light">
            CAE Dashboard →
          </Link>
          <Link href="/library/constitution/article-ii" className="text-cream-muted hover:text-gold">
            Article II →
          </Link>
        </div>
      </div>
    </div>
  );
}
