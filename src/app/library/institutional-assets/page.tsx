import type { Metadata } from "next";
import { InstitutionalAssetRegistryHub } from "@/components/institutional-assets/InstitutionalAssetRegistryHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Asset Registry",
  description:
    "Constitutional Asset Register — trust, knowledge, technology, and digital assets per Article VII.",
  robots: { index: false, follow: false },
};

export default function InstitutionalAssetsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionalAssetRegistryHub />
    </div>
  );
}
