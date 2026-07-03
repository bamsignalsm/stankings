import type { Metadata } from "next";
import { LessonsLearnedHub } from "@/components/lessons/LessonsLearnedHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Lessons Learned Registry",
  description:
    "Institutional learning from completed initiatives — searchable lessons per CANON-009.",
  robots: { index: false, follow: false },
};

export default function LessonsLearnedPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <LessonsLearnedHub />
    </div>
  );
}
