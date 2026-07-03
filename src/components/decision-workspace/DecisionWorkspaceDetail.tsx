import type { ReactNode } from "react";
import Link from "next/link";
import type { ConstitutionalDecisionWorkspace } from "@/lib/decision-workspace/types";
import { CDW_WORKFLOW_SECTIONS } from "@/lib/frameworks/constitutional-decision-workspace";

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-10 border-b border-gold-subtle/50 pb-10 last:border-0">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{label}</h2>
      {children}
    </section>
  );
}

function workflowStatusClass(status: string) {
  const map: Record<string, string> = {
    complete: "text-forest",
    in_progress: "text-gold",
    pending: "text-cream-muted",
    not_applicable: "text-cream-muted/50",
  };
  return map[status] ?? "text-cream-muted";
}

interface DecisionWorkspaceDetailProps {
  workspace: ConstitutionalDecisionWorkspace;
}

export function DecisionWorkspaceDetail({ workspace }: DecisionWorkspaceDetailProps) {
  const sectionLabel = (id: string) => CDW_WORKFLOW_SECTIONS.find((s) => s.id === id)?.label ?? id;

  return (
    <>
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library/decision-workspace"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← Constitutional Decision Workspace
          </Link>
          {workspace.decisionIdentifier && (
            <p className="mb-1 font-mono text-xs text-gold">{workspace.decisionIdentifier}</p>
          )}
          <h1 className="mb-2 font-serif text-4xl font-semibold text-cream">{workspace.title}</h1>
          <p className="capitalize text-cream-muted">
            {workspace.status.replace("_", " ")} · {workspace.responsibleAuthority}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Section label="Proposal Summary">
          <p className="text-cream-muted">{workspace.proposalSummary}</p>
        </Section>

        <Section label="Constitutional Decision Hierarchy">
          <ul className="space-y-3 text-sm">
            {workspace.hierarchyChecks.map((check, i) => (
              <li key={check.criterion} className="rounded border border-gold-subtle bg-ink-muted p-4">
                <p className="text-cream">
                  <span className="font-mono text-gold">{i + 1}.</span> {check.criterion}
                </p>
                <p className={`mt-1 text-xs uppercase tracking-wider ${workflowStatusClass(check.status)}`}>
                  {check.status.replace("_", " ")}
                </p>
                {check.summary && <p className="mt-2 text-cream-muted">{check.summary}</p>}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Workflow Progress">
          <ul className="space-y-2">
            {workspace.workflowSections.map((section) => (
              <li
                key={section.sectionId}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-gold-subtle px-4 py-2 text-sm"
              >
                <span className="text-cream">
                  {section.href ? (
                    <Link href={section.href} className="hover:text-gold">
                      {sectionLabel(section.sectionId)}
                    </Link>
                  ) : (
                    sectionLabel(section.sectionId)
                  )}
                </span>
                <span className={`text-xs uppercase tracking-wider ${workflowStatusClass(section.status)}`}>
                  {section.status.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {workspace.decisionIdentifier && (
          <Section label="Decision Record">
            <Link
              href={`/library/decisions/${workspace.decisionIdentifier}`}
              className="text-gold hover:text-gold-light"
            >
              {workspace.decisionIdentifier} →
            </Link>
          </Section>
        )}

        <Section label="Canon References">
          <div className="flex flex-wrap gap-3">
            {workspace.canonReferences.map((ref) => (
              <Link
                key={ref}
                href={`/library/canon/${ref}`}
                className="font-mono text-sm text-gold hover:text-gold-light"
              >
                {ref}
              </Link>
            ))}
          </div>
        </Section>

        <Section label="Constitution Articles">
          <ul className="space-y-1">
            {workspace.constitutionArticles.map((art) => (
              <li key={art}>
                <Link href="/library/constitution/article-vi" className="text-sm text-gold hover:text-gold-light">
                  {art}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {workspace.similarDecisions.length > 0 && (
          <Section label="Prior Similar Decisions">
            <ul className="space-y-2">
              {workspace.similarDecisions.map((d) => (
                <li key={d.title}>
                  {d.href ? (
                    <Link href={d.href} className="text-gold hover:text-gold-light">
                      {d.title}
                    </Link>
                  ) : (
                    d.title
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section label="Knowledge Objects">
          <ul className="space-y-2">
            {workspace.knowledgeObjects.map((ko) => (
              <li key={ko.title}>
                {ko.href ? (
                  <Link href={ko.href} className="text-gold hover:text-gold-light">
                    {ko.title}
                  </Link>
                ) : (
                  ko.title
                )}
              </li>
            ))}
          </ul>
        </Section>

        {workspace.postImplementationReview && (
          <Section label="Post-Implementation Review">
            <p className="text-cream-muted">
              {workspace.postImplementationReview.status}: {workspace.postImplementationReview.summary}
            </p>
            {workspace.postImplementationReview.href && (
              <Link
                href={workspace.postImplementationReview.href}
                className="mt-2 inline-block text-sm text-gold hover:text-gold-light"
              >
                View review →
              </Link>
            )}
          </Section>
        )}

        {workspace.lessonsLearned.length > 0 && (
          <Section label="Lessons Learned">
            <ul className="space-y-2 text-cream-muted">
              {workspace.lessonsLearned.map((lesson) => (
                <li key={lesson} className="flex gap-2">
                  <span className="text-gold/60">—</span>
                  {lesson}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <Link href="/library/constitution/article-vi" className="text-gold hover:text-gold-light">
            Article VI →
          </Link>
          <Link href="/library/decision-workspace" className="text-cream-muted hover:text-gold">
            All workspaces →
          </Link>
        </div>
      </div>
    </>
  );
}
