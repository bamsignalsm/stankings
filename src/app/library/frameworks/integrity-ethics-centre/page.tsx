import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { IEC_BODY, IEC_FRAMEWORK, IEC_PURPOSE } from "@/lib/frameworks/integrity-ethics-centre";
import { EXECUTIVE_DECISION_39 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Integrity & Ethics Centre Framework",
  description: "FRAMEWORK-IEC-001 — integrity registers and annual declarations per Article XI.",
  robots: { index: false, follow: false },
};

export default function IntegrityEthicsFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {IEC_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IEC_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{IEC_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_39}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{IEC_BODY}</div>
        <Link href="/library/integrity-ethics" className="text-gold hover:text-gold-light">
          Integrity & Ethics Centre →
        </Link>
      </div>
    </div>
  );
}
