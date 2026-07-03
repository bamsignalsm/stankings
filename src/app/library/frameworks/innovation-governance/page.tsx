import type { Metadata } from "next";
import { InnovationGovernanceFrameworkPage } from "@/components/frameworks/InnovationGovernanceFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Innovation Governance Framework",
  description:
    "CANON-013 operationalized — governed innovation for emerging technologies without losing institutional identity.",
  robots: { index: false, follow: false },
};

export default function InnovationGovernancePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InnovationGovernanceFrameworkPage />
    </div>
  );
}
