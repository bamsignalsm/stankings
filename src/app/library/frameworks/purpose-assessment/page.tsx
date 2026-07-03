import type { Metadata } from "next";
import { PAFFrameworkPage } from "@/components/frameworks/PAFFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Purpose Assessment Framework",
  description: "Decision gate 1 — CANON-003 operationalized. Purpose before profit.",
  robots: { index: false, follow: false },
};

export default function PurposeAssessmentPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <PAFFrameworkPage />
    </div>
  );
}
