import type { Metadata } from "next";
import { InstitutionalKnowledgeGraphHub } from "@/components/knowledge-graph/InstitutionalKnowledgeGraphHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Knowledge Graph",
  description:
    "Connected institutional knowledge per CANON-021 — the living brain of the Stankings Library.",
  robots: { index: false, follow: false },
};

export default function KnowledgeGraphPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionalKnowledgeGraphHub />
    </div>
  );
}
