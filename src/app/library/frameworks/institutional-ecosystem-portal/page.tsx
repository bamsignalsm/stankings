import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import {
  IEP_BODY,
  IEP_FRAMEWORK,
  IEP_PURPOSE,
  IER_REGISTER_FIELDS,
  INSTITUTIONAL_PROFILE_FIELDS,
} from "@/lib/frameworks/institutional-ecosystem-portal";
import { EXECUTIVE_DECISION_37 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Institutional Ecosystem Portal Framework",
  description: "FRAMEWORK-IEP-001 — constitutional ecosystem register and architecture portal per Article IX.",
  robots: { index: false, follow: false },
};

export default function InstitutionalEcosystemFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {IEP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {IEP_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{IEP_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_37}
        </blockquote>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">Institutional Profile Fields</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {INSTITUTIONAL_PROFILE_FIELDS.map((f) => (
              <li key={f}>— {f}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">Register Domains</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {IER_REGISTER_FIELDS.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
        </section>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{IEP_BODY}</div>
        <Link href="/library/ecosystem-architecture" className="text-gold hover:text-gold-light">
          Ecosystem Architecture Portal →
        </Link>
      </div>
    </div>
  );
}
