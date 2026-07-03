import type { Metadata } from "next";
import { AnnualStewardshipReviewFrameworkPage } from "@/components/frameworks/AnnualStewardshipReviewFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Annual Stewardship Review",
  description:
    "CANON-019 operationalized — every department documents what it preserved, improved, learned, and passed forward.",
  robots: { index: false, follow: false },
};

export default function AnnualStewardshipReviewPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <AnnualStewardshipReviewFrameworkPage />
    </div>
  );
}
