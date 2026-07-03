import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { CHD_BODY, CHD_FRAMEWORK, CHD_PURPOSE } from "@/lib/frameworks/constitutional-health-dashboard";
import { EXECUTIVE_DECISION_42 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitutional Health Dashboard Framework",
  description: "FRAMEWORK-CHD-001 — CMF and Annual Constitutional Stewardship Report per Article XIV.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalHealthFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CHD_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CHD_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CHD_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_42}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CHD_BODY}</div>
        <Link href="/library/constitutional-health" className="text-gold hover:text-gold-light">
          Health Dashboard →
        </Link>
      </div>
    </div>
  );
}
