import type { Metadata } from "next";
import { ConstitutionalDecisionWorkspaceHub } from "@/components/decision-workspace/ConstitutionalDecisionWorkspaceHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Decision Workspace",
  description:
    "Constitutional decision-making workflow — hierarchy, evidence, and Institutional Decision Register per Article VI.",
  robots: { index: false, follow: false },
};

export default function DecisionWorkspacePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalDecisionWorkspaceHub />
    </div>
  );
}
