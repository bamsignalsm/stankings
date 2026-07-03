import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { GOVERNANCE_BODY_PROFILES } from "@/lib/governance";
import {
  CGOV_BODY,
  CGOV_FRAMEWORK,
  CGOV_PURPOSE,
  CONSTITUTIONAL_GOVERNANCE_HIERARCHY,
  RESERVED_POWERS_REGISTER,
} from "@/lib/frameworks/constitutional-governance-portal";
import { EXECUTIVE_DECISION_32 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitutional Governance Portal Framework",
  description: "FRAMEWORK-CGOV-001 — governance bodies, hierarchy, and reserved powers.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalGovernanceFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CGOV_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CGOV_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CGOV_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_32}
        </blockquote>
        <pre className="mb-8 whitespace-pre-wrap rounded-lg border border-gold-subtle bg-ink-muted p-6 text-sm text-cream-muted">
          {CONSTITUTIONAL_GOVERNANCE_HIERARCHY.join("\n↓\n")}
        </pre>
        <ul className="mb-8 space-y-2">
          {RESERVED_POWERS_REGISTER.map((p) => (
            <li key={p} className="text-sm text-cream-muted">
              — {p}
            </li>
          ))}
        </ul>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CGOV_BODY}</div>
        <ul className="space-y-2">
          {GOVERNANCE_BODY_PROFILES.map((p) => (
            <li key={p.slug}>
              <Link href={`/library/governance/${p.slug}`} className="text-gold hover:text-gold-light">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/governance" className="text-gold hover:text-gold-light">
            Governance Portal →
          </Link>
          <Link href="/library/constitution/article-iv" className="text-cream-muted hover:text-gold">
            Article IV →
          </Link>
        </div>
      </div>
    </div>
  );
}
