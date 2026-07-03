import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LS002Standard } from "@/components/lexicon/LS002Standard";
import { MemberBanner } from "@/components/MemberBanner";
import { getKnowledgeObjectByIdentifier } from "@/lib/library-engine/queries";

export const metadata: Metadata = {
  title: "LS-002 — The Stankings Lexicon",
  description: "Library Standard LS-002 — official institutional vocabulary.",
  robots: { index: false, follow: false },
};

export default async function LS002Page() {
  const ko = await getKnowledgeObjectByIdentifier("LS-002");
  if (!ko) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <LS002Standard knowledgeObject={ko} />
    </div>
  );
}
