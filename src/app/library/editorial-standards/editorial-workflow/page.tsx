import type { Metadata } from "next";
import { EditorialWorkflowHub } from "@/components/editorial/EditorialWorkflowHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Editorial Workflow",
  description:
    "Permanent editorial process for every constitutional, governance, and institutional publication.",
  robots: { index: false, follow: false },
};

export default function EditorialWorkflowPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <EditorialWorkflowHub />
    </div>
  );
}
