import type { Metadata } from "next";
import { SRFrameworkPage } from "@/components/frameworks/SRFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Simplicity Review",
  description:
    "CANON-011 operationalized — simplicity gate for engineering PRs, architecture, and major features.",
  robots: { index: false, follow: false },
};

export default function SimplicityReviewPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <SRFrameworkPage />
    </div>
  );
}
