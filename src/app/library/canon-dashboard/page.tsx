import type { Metadata } from "next";
import { CanonDashboardHub } from "@/components/canon/CanonDashboardHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Canon Dashboard",
  description:
    "Volume 0 philosophy mapped to frameworks and platform features — the living implementation bridge.",
  robots: { index: false, follow: false },
};

export default function CanonDashboardPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <CanonDashboardHub />
    </div>
  );
}
