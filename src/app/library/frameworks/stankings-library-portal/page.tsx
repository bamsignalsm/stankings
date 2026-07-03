import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { SLP_BODY, SLP_FRAMEWORK, SLP_PURPOSE } from "@/lib/frameworks/stankings-library-portal";
import { EXECUTIVE_DECISION_41 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Stankings Library Portal Framework",
  description: "FRAMEWORK-SLP-001 — Knowledge Governance Framework per Article XIII.",
  robots: { index: false, follow: false },
};

export default function StankingsLibraryFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {SLP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {SLP_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{SLP_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_41}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{SLP_BODY}</div>
        <Link href="/library/stankings-library" className="text-gold hover:text-gold-light">
          Library Portal →
        </Link>
      </div>
    </div>
  );
}
