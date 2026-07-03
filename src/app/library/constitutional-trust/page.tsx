import type { Metadata } from "next";
import { ConstitutionalTrustCentreHub } from "@/components/constitutional-trust/ConstitutionalTrustCentreHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Trust Centre",
  description:
    "Digital trust infrastructure — identity, privacy, consent, AI governance, and the Stankings Trust Network per Article XII.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalTrustPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalTrustCentreHub />
    </div>
  );
}
