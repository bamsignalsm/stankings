import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { LEADERSHIP_PROFILES } from "@/lib/leadership";
import {
  LGOV_BODY,
  LGOV_FRAMEWORK,
  LGOV_PURPOSE,
  LEADERSHIP_COMPETENCY_MATRIX,
  ANNUAL_CONSTITUTIONAL_LEADERSHIP_REVIEW_CRITERIA,
} from "@/lib/frameworks/leadership-governance-portal";
import { EXECUTIVE_DECISION_33 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Leadership Governance Portal Framework",
  description: "FRAMEWORK-LGOV-001 — leadership standards, competency matrix, and constitutional reviews.",
  robots: { index: false, follow: false },
};

export default function LeadershipGovernanceFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {LGOV_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {LGOV_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{LGOV_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_33}
        </blockquote>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">Competency Matrix</h2>
          <ul className="space-y-2 text-sm text-cream-muted">
            {LEADERSHIP_COMPETENCY_MATRIX.map((row) => (
              <li key={row.standard}>
                <strong className="text-cream">{row.standard}</strong> — {row.assessmentFocus}
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-lg text-gold">Annual Review Criteria</h2>
          <ul className="space-y-1 text-sm text-cream-muted">
            {ANNUAL_CONSTITUTIONAL_LEADERSHIP_REVIEW_CRITERIA.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        </section>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{LGOV_BODY}</div>
        <ul className="space-y-2">
          {LEADERSHIP_PROFILES.map((p) => (
            <li key={p.slug}>
              <Link href={`/library/leadership/${p.slug}`} className="text-gold hover:text-gold-light">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/leadership" className="text-gold hover:text-gold-light">
            Leadership Portal →
          </Link>
          <Link href="/library/constitution/article-v" className="text-cream-muted hover:text-gold">
            Article V →
          </Link>
        </div>
      </div>
    </div>
  );
}
