import type { Metadata } from "next";
import { InstitutionalStrengthAssessmentFrameworkPage } from "@/components/frameworks/InstitutionalStrengthAssessmentFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Strength Assessment",
  description:
    "CANON-016 operationalized — evaluate acquisitions, investments, and initiatives for institutional strength.",
  robots: { index: false, follow: false },
};

export default function InstitutionalStrengthAssessmentPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InstitutionalStrengthAssessmentFrameworkPage />
    </div>
  );
}
