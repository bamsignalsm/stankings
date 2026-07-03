import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { CTC_BODY, CTC_FRAMEWORK, CTC_PURPOSE } from "@/lib/frameworks/constitutional-trust-centre";
import { EXECUTIVE_DECISION_40 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitutional Trust Centre Framework",
  description: "FRAMEWORK-CTC-001 — CIGF and Stankings Trust Network governance per Article XII.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalTrustFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CTC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CTC_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CTC_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_40}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CTC_BODY}</div>
        <Link href="/library/constitutional-trust" className="text-gold hover:text-gold-light">
          Trust Centre →
        </Link>
      </div>
    </div>
  );
}
