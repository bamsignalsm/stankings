import type { Metadata } from "next";
import { LeadershipGovernanceHub } from "@/components/leadership/LeadershipGovernanceHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Leadership Governance",
  description:
    "Constitutional standards for leadership — profiles, competency matrix, and Annual Constitutional Leadership Review per Article V.",
  robots: { index: false, follow: false },
};

export default function LeadershipGovernancePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <LeadershipGovernanceHub />
    </div>
  );
}
