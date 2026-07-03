import type { Metadata } from "next";
import { UncertaintyReductionFrameworkPage } from "@/components/frameworks/UncertaintyReductionFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Uncertainty Reduction Framework",
  description:
    "CANON-017 operationalized — every proposal demonstrates how it reduces uncertainty and increases confidence.",
  robots: { index: false, follow: false },
};

export default function UncertaintyReductionPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <UncertaintyReductionFrameworkPage />
    </div>
  );
}
