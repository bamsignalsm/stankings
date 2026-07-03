import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { STEWARDSHIP_PROFILES } from "@/lib/stewardship";
import {
  STEWARDSHIP_DASHBOARD_FIELDS,
  STEWARDSHIP_PORTAL_BODY,
  STEWARDSHIP_PORTAL_FRAMEWORK,
  STEWARDSHIP_PORTAL_PURPOSE,
} from "@/lib/frameworks/stewardship-portal";
import { EXECUTIVE_DECISION_31 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Stewardship Portal Framework",
  description: "FRAMEWORK-STEWARDSHIP-PORTAL-001 — observable stewardship per Article III.",
  robots: { index: false, follow: false },
};

export default function StewardshipPortalFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {STEWARDSHIP_PORTAL_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {STEWARDSHIP_PORTAL_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{STEWARDSHIP_PORTAL_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_31}
        </blockquote>
        <ul className="mb-8 space-y-2">
          {STEWARDSHIP_DASHBOARD_FIELDS.map((f) => (
            <li key={f} className="text-sm text-cream-muted">
              — {f}
            </li>
          ))}
        </ul>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{STEWARDSHIP_PORTAL_BODY}</div>
        <ul className="space-y-2">
          {STEWARDSHIP_PROFILES.map((p) => (
            <li key={p.slug}>
              <Link href={`/library/stewardship/${p.slug}`} className="text-gold hover:text-gold-light">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/stewardship" className="text-gold hover:text-gold-light">
            Stewardship Portal →
          </Link>
          <Link href="/library/constitution/article-iii" className="text-cream-muted hover:text-gold">
            Article III →
          </Link>
        </div>
      </div>
    </div>
  );
}
