import type { Metadata } from "next";
import { EIAFrameworkPage } from "@/components/frameworks/EIAFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Ecosystem Impact Assessment",
  description:
    "CANON-005 operationalized — every new company, division, or major product requires an Ecosystem Impact Assessment.",
  robots: { index: false, follow: false },
};

export default function EcosystemImpactAssessmentPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <EIAFrameworkPage />
    </div>
  );
}
