import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { DECISION_WORKSPACES } from "@/lib/decision-workspace";
import {
  CDW_BODY,
  CDW_FRAMEWORK,
  CDW_PURPOSE,
  CDW_WORKFLOW_SECTIONS,
} from "@/lib/frameworks/constitutional-decision-workspace";
import { CONSTITUTIONAL_DECISION_HIERARCHY } from "@/lib/constitution/articles/article-vi";
import { EXECUTIVE_DECISION_34 } from "@/lib/iki";

export const metadata: Metadata = {
  title: "Constitutional Decision Workspace Framework",
  description: "FRAMEWORK-CDW-001 — constitutional decision workflow and Institutional Decision Register.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalDecisionWorkspaceFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {CDW_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {CDW_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{CDW_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <blockquote className="mb-8 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_34}
        </blockquote>
        <ol className="mb-8 space-y-1 text-sm text-cream-muted">
          {CONSTITUTIONAL_DECISION_HIERARCHY.map((item, i) => (
            <li key={item}>
              {i + 1}. {item}
            </li>
          ))}
        </ol>
        <ul className="mb-8 space-y-1">
          {CDW_WORKFLOW_SECTIONS.map((s) => (
            <li key={s.id} className="text-sm text-cream-muted">
              — {s.label}
            </li>
          ))}
        </ul>
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{CDW_BODY}</div>
        <ul className="space-y-2">
          {DECISION_WORKSPACES.map((w) => (
            <li key={w.slug}>
              <Link href={`/library/decision-workspace/${w.slug}`} className="text-gold hover:text-gold-light">
                {w.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/decision-workspace" className="text-gold hover:text-gold-light">
            Decision Workspace →
          </Link>
          <Link href="/library/constitution/article-vi" className="text-cream-muted hover:text-gold">
            Article VI →
          </Link>
        </div>
      </div>
    </div>
  );
}
