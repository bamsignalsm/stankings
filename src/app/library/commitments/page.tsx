import type { Metadata } from "next";
import { CommitmentRegistryHub } from "@/components/commitments/CommitmentRegistryHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Commitment Registry",
  description:
    "Institutional promise tracking — public commitments, SLAs, and fulfilment evidence per CANON-014.",
  robots: { index: false, follow: false },
};

export default function CommitmentRegistryPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <CommitmentRegistryHub />
    </div>
  );
}
