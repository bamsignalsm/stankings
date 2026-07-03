import type { Metadata } from "next";
import { GovernanceCodePortalHub } from "@/components/governance-code/GovernanceCodePortalHub";
import { MemberBanner } from "@/components/MemberBanner";
import { GOVERNANCE_CODE_TITLE, GOVERNANCE_CODE_VERSION } from "@/lib/governance-code";

export const metadata: Metadata = {
  title: GOVERNANCE_CODE_TITLE,
  description: `Volume II v${GOVERNANCE_CODE_VERSION} — implements the Constitution through daily governance practice.`,
  robots: { index: false, follow: false },
};

export default function GovernanceCodePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <GovernanceCodePortalHub />
    </div>
  );
}
