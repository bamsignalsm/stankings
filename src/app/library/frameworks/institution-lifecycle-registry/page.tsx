import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { ILR_BODY, ILR_FRAMEWORK, ILR_PURPOSE } from "@/lib/frameworks/institution-lifecycle-registry";
import { EXECUTIVE_DECISION_38 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Institution Lifecycle Registry Framework",
  description: "FRAMEWORK-ILR-001 — constitutional institution biography from conception to conclusion.",
  robots: { index: false, follow: false },
};

export default function InstitutionLifecycleFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {ILR_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {ILR_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{ILR_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_38}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{ILR_BODY}</div>
        <Link href="/library/institution-lifecycle" className="text-gold hover:text-gold-light">
          Lifecycle Registry →
        </Link>
      </div>
    </div>
  );
}
