import type { Metadata } from "next";
import { ConstitutionCentreHub } from "@/components/constitution-centre/ConstitutionCentreHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitution Centre",
  description:
    "Constitution Register, amendment workspace, version history, and constitutional continuity per Article XV.",
  robots: { index: false, follow: false },
};

export default function ConstitutionCentrePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionCentreHub />
    </div>
  );
}
