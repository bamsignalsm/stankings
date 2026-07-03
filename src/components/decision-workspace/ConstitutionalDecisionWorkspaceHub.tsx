import Link from "next/link";
import {
  CDW_FRAMEWORK,
  CDW_PURPOSE,
  CDW_WORKFLOW_SECTIONS,
} from "@/lib/frameworks/constitutional-decision-workspace";
import { CONSTITUTIONAL_DECISION_HIERARCHY, ARTICLE_VI } from "@/lib/constitution/articles/article-vi";
import { DECISION_WORKSPACES, getDecisionWorkspaceStats } from "@/lib/decision-workspace";
import { EXECUTIVE_DECISION_34 } from "@/lib/iki";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    approved: "text-forest border-forest/30 bg-forest/10",
    implemented: "text-forest border-forest/30 bg-forest/10",
    declined: "text-burgundy border-burgundy/30 bg-burgundy/10",
    under_review: "text-gold border-gold/30 bg-gold/10",
    draft: "text-cream-muted border-gold-subtle",
  };
  return map[status] ?? "text-cream-muted border-gold-subtle";
}

export function ConstitutionalDecisionWorkspaceHub() {
  const stats = getDecisionWorkspaceStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Constitution {ARTICLE_VI.article} · {CDW_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Constitutional Decision Workspace
          </h1>
          <p className="text-cream-muted">{CDW_PURPOSE}</p>
          <blockquote className="mt-8 rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Opinion gives way to disciplined reasoning.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_34}
        </blockquote>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">
            Constitutional Decision Hierarchy
          </h2>
          <ol className="space-y-2 text-sm text-cream-muted">
            {CONSTITUTIONAL_DECISION_HIERARCHY.map((item, i) => (
              <li key={item} className="flex gap-3">
                <span className="font-mono text-gold">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm italic text-cream-muted/80">
            No decision approved solely for financial advantage if it materially conflicts with higher
            constitutional principles.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-semibold text-gold">Decision Workspace Workflow</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CDW_WORKFLOW_SECTIONS.map((section) => (
              <li
                key={section.id}
                className="rounded border border-gold-subtle bg-ink-muted px-4 py-2 text-sm text-cream-muted"
              >
                {section.href ? (
                  <Link href={section.href} className="hover:text-gold">
                    {section.label}
                  </Link>
                ) : (
                  section.label
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-cream-muted">
          <span>{stats.total} workspaces</span>
          <span className="text-forest">{stats.approved} decided</span>
          <span>{stats.withIdr} with decision records</span>
          <span className="text-gold">{stats.training} training cases</span>
        </div>

        <section className="mb-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-cream">Decision Workspaces</h2>
            <Link href="/library/decisions" className="text-sm text-gold hover:text-gold-light">
              Institutional Decision Register →
            </Link>
          </div>
          <ul className="space-y-4">
            {DECISION_WORKSPACES.map((workspace) => (
              <li key={workspace.slug}>
                <Link
                  href={`/library/decision-workspace/${workspace.slug}`}
                  className="block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    {workspace.decisionIdentifier && (
                      <p className="font-mono text-xs text-gold">{workspace.decisionIdentifier}</p>
                    )}
                    <span
                      className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusBadge(workspace.status)}`}
                    >
                      {workspace.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="font-serif text-lg text-cream">{workspace.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-cream-muted">{workspace.proposalSummary}</p>
                  <p className="mt-2 text-xs text-cream-muted">
                    Authority: {workspace.responsibleAuthority}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/library/constitution/article-vi" className="text-gold hover:text-gold-light">
            Article VI →
          </Link>
          <Link href="/library/decisions" className="text-cream-muted hover:text-gold">
            Decision Register →
          </Link>
          <Link href="/library/constitutional-alignment" className="text-cream-muted hover:text-gold">
            Constitutional Alignment →
          </Link>
          <Link
            href="/library/frameworks/constitutional-decision-workspace"
            className="text-cream-muted hover:text-gold"
          >
            CDW Framework →
          </Link>
        </div>
      </div>
    </>
  );
}
