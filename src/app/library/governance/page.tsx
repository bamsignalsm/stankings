import type { Metadata } from "next";
import { ConstitutionalGovernanceHub } from "@/components/governance/ConstitutionalGovernanceHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Governance Portal",
  description:
    "Governance bodies, reserved powers, and constitutional accountability per Article IV.",
  robots: { index: false, follow: false },
};

export default function GovernancePortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalGovernanceHub />
    </div>
  );
}
