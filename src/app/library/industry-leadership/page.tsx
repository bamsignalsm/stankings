import type { Metadata } from "next";
import { IndustryLeadershipHub } from "@/components/industry-leadership/IndustryLeadershipHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Industry Leadership Dashboard",
  description:
    "Industry standards to raise and annual progress per CANON-024 — leave every industry stronger.",
  robots: { index: false, follow: false },
};

export default function IndustryLeadershipPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <IndustryLeadershipHub />
    </div>
  );
}
