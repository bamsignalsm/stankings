import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { CCY_BODY, CCY_FRAMEWORK, CCY_PURPOSE } from "@/lib/frameworks/constitutional-ceremony-portal";
import { EXECUTIVE_DECISION_45 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitutional Ceremony Portal Framework",
  description: "FRAMEWORK-CCY-001 — Constitutional Register of Office Holders per Article XVII.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalCeremonyFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CCY_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CCY_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CCY_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_45}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CCY_BODY}</div>
        <Link href="/library/constitutional-ceremony" className="text-gold hover:text-gold-light">
          Constitutional Ceremony Portal →
        </Link>
      </div>
    </div>
  );
}
