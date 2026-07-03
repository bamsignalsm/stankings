import type { Metadata } from "next";
import { PrinciplesAlignmentReviewFrameworkPage } from "@/components/frameworks/PrinciplesAlignmentReviewFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Principles Alignment Review",
  description:
    "CANON-018 operationalized — every major initiative demonstrates alignment with institutional principles before approval.",
  robots: { index: false, follow: false },
};

export default function PrinciplesAlignmentReviewPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <PrinciplesAlignmentReviewFrameworkPage />
    </div>
  );
}
