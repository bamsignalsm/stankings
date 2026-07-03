import type { Metadata } from "next";
import { HIRFrameworkPage } from "@/components/frameworks/HIRFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Human Impact Review",
  description:
    "CANON-010 operationalized — dignity and fairness gate for customer-facing products, policies, and changes.",
  robots: { index: false, follow: false },
};

export default function HumanImpactReviewPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <HIRFrameworkPage />
    </div>
  );
}
