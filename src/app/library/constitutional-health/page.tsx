import type { Metadata } from "next";
import { ConstitutionalHealthDashboardHub } from "@/components/constitutional-health/ConstitutionalHealthDashboardHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Health Dashboard",
  description:
    "Institutional health beyond profit — constitutional review, maturity, and continual improvement per Article XIV.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalHealthPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalHealthDashboardHub />
    </div>
  );
}
