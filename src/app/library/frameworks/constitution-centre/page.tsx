import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { CCR_BODY, CCR_FRAMEWORK, CCR_PURPOSE } from "@/lib/frameworks/constitution-centre";
import { EXECUTIVE_DECISION_43 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitution Centre Framework",
  description: "FRAMEWORK-CCR-001 — Constitution Register per Article XV.",
  robots: { index: false, follow: false },
};

export default function ConstitutionCentreFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CCR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CCR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CCR_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_43}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CCR_BODY}</div>
        <Link href="/library/constitution-centre" className="text-gold hover:text-gold-light">
          Constitution Centre →
        </Link>
      </div>
    </div>
  );
}
