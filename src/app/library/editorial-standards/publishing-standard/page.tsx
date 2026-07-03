import type { Metadata } from "next";
import { SLPSHub } from "@/components/editorial/SLPSHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Stankings Library Publishing Standard (SLPS-001)",
  description:
    "Permanent publishing framework — structure, metadata, lifecycle, and presentation for every official publication.",
  robots: { index: false, follow: false },
};

export default function PublishingStandardPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <SLPSHub />
    </div>
  );
}
