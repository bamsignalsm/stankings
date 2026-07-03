import type { Metadata } from "next";
import { FirstPrinciplesDraftOne } from "@/components/FirstPrinciplesDraftOne";
import { MemberBanner } from "@/components/MemberBanner";
import { getKnowledgeObjectByIdentifier } from "@/lib/library-engine/queries";

export const metadata: Metadata = {
  title: "Volume 0 — The First Principles",
  description: "What do we believe? Philosophy — not law.",
  robots: { index: false, follow: false },
};

export default async function FirstPrinciplesPage() {
  const [canon, canon002] = await Promise.all([
    getKnowledgeObjectByIdentifier("CANON-001"),
    getKnowledgeObjectByIdentifier("CANON-002"),
  ]);

  return (
    <div className="pt-20">
      <MemberBanner />
      <FirstPrinciplesDraftOne canon={canon ?? null} canon002={canon002 ?? null} />
    </div>
  );
}
