import type { Metadata } from "next";
import { PlatformAssessmentFrameworkPage } from "@/components/frameworks/PlatformAssessmentFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Platform Assessment",
  description:
    "CANON-012 operationalized — platform gate for new technical capabilities across the ecosystem.",
  robots: { index: false, follow: false },
};

export default function PlatformAssessmentPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <PlatformAssessmentFrameworkPage />
    </div>
  );
}
