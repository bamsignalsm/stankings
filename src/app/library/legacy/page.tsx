import type { Metadata } from "next";
import { LegacyDashboardHub } from "@/components/legacy/LegacyDashboardHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Legacy Dashboard",
  description:
    "Annual Stewardship Reports — institutional performance and societal contribution per CANON-022.",
  robots: { index: false, follow: false },
};

export default function LegacyDashboardPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <LegacyDashboardHub />
    </div>
  );
}
