import type { Metadata } from "next";
import { TIAFrameworkPage } from "@/components/frameworks/TIAFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Trust Impact Assessment Framework",
  description:
    "Decision-making machinery derived from CANON-002 — measure trust impact on every significant proposal.",
  robots: { index: false, follow: false },
};

export default function TrustImpactAssessmentPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <TIAFrameworkPage />
    </div>
  );
}
