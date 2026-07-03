import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import {
  GOVERNANCE_ARCHITECTURE_STACK,
  GAR_REGISTER_DOMAINS,
  OASP_BODY,
  OASP_FRAMEWORK,
  OASP_PURPOSE,
} from "@/lib/frameworks/ownership-stewardship-portal";
import { EXECUTIVE_DECISION_36 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Ownership & Stewardship Portal Framework",
  description: "FRAMEWORK-OASP-001 — ownership philosophy, governance architecture, and legal layer separation.",
  robots: { index: false, follow: false },
};

export default function OwnershipStewardshipFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {OASP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {OASP_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{OASP_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_36}
        </blockquote>
        <pre className="mb-8 whitespace-pre-wrap rounded-lg border border-gold-subtle bg-ink-muted p-6 text-sm text-cream-muted">
          {GOVERNANCE_ARCHITECTURE_STACK.map((l) => l.layer).join("\n↓\n")}
        </pre>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">GAR Domains</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {GAR_REGISTER_DOMAINS.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
        </section>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{OASP_BODY}</div>
        <Link href="/library/ownership-stewardship" className="text-gold hover:text-gold-light">
          Ownership Portal →
        </Link>
      </div>
    </div>
  );
}
