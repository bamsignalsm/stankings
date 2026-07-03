import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LS001Standard } from "@/components/library-engine/LS001Standard";
import { MemberBanner } from "@/components/MemberBanner";
import { getKnowledgeObjectByIdentifier } from "@/lib/library-engine/queries";

export const metadata: Metadata = {
  title: "LS-001 — The Knowledge Object Standard",
  description: "Library Standard LS-001 — foundation of the Institutional Brain.",
  robots: { index: false, follow: false },
};

export default async function LS001Page() {
  const ko = await getKnowledgeObjectByIdentifier("LS-001");
  if (!ko) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <LS001Standard knowledgeObject={ko} />
    </div>
  );
}
