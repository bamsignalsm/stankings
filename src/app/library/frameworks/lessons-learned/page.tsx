import type { Metadata } from "next";
import { LLRFrameworkPage } from "@/components/frameworks/LLRFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Lessons Learned Repository",
  description:
    "CANON-009 operationalized — structured lessons from every significant initiative.",
  robots: { index: false, follow: false },
};

export default function LessonsLearnedFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <LLRFrameworkPage />
    </div>
  );
}
