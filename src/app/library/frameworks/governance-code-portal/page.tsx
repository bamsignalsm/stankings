import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { GC_BODY, GC_FRAMEWORK, GC_PURPOSE } from "@/lib/frameworks/governance-code-portal";
import { EXECUTIVE_DECISION_46 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Governance Code Portal Framework",
  description: "FRAMEWORK-GC-001 — Volume II Governance Code per Executive Decision No. 46.",
  robots: { index: false, follow: false },
};

export default function GovernanceCodeFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {GC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {GC_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{GC_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_46}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{GC_BODY}</div>
        <Link href="/library/governance-code" className="text-gold hover:text-gold-light">
          Governance Code Portal →
        </Link>
      </div>
    </div>
  );
}
