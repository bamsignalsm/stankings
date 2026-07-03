import type { Metadata } from "next";
import { ConstitutionDraftOne } from "@/components/ConstitutionDraftOne";
import { MemberBanner } from "@/components/MemberBanner";
import { getKnowledgeObjectByIdentifier } from "@/lib/library-engine/queries";

export const metadata: Metadata = {
  title: "Constitution — Draft One Archive",
  description: "Pre-v1.0 constitutional working text — archived for reference.",
  robots: { index: false, follow: false },
};

export default async function ConstitutionDraftOnePage() {
  const canon = await getKnowledgeObjectByIdentifier("CANON-001");

  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionDraftOne canon={canon ?? null} />
    </div>
  );
}
