import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DecisionWorkspaceDetail } from "@/components/decision-workspace/DecisionWorkspaceDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getDecisionWorkspace } from "@/lib/decision-workspace";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { DECISION_WORKSPACES } = await import("@/lib/decision-workspace");
  return DECISION_WORKSPACES.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workspace = getDecisionWorkspace(slug);
  if (!workspace) return { title: "Decision Workspace Not Found" };
  return {
    title: `${workspace.title} — Decision Workspace`,
    description: workspace.proposalSummary,
    robots: { index: false, follow: false },
  };
}

export default async function DecisionWorkspaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workspace = getDecisionWorkspace(slug);
  if (!workspace) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <DecisionWorkspaceDetail workspace={workspace} />
    </div>
  );
}
