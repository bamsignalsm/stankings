import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { CPP_BODY, CPP_FRAMEWORK, CPP_PURPOSE } from "@/lib/frameworks/custodian-programme-portal";
import { EXECUTIVE_DECISION_44 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Custodian Programme Portal Framework",
  description: "FRAMEWORK-CPP-001 — Leadership Continuity Framework per Article XVI.",
  robots: { index: false, follow: false },
};

export default function CustodianProgrammeFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CPP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CPP_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CPP_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_44}
        </blockquote>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CPP_BODY}</div>
        <Link href="/library/custodian-programme" className="text-gold hover:text-gold-light">
          Custodian Programme →
        </Link>
      </div>
    </div>
  );
}
