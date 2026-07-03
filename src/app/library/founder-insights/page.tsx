import type { Metadata } from "next";
import { FounderInsightsHub } from "@/components/founder-insights/FounderInsightsHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Founder Insights",
  description:
    "Institutional learning from the Founder's operating experience — stewardship, sustainability, and long-term building.",
  robots: { index: false, follow: false },
};

export default function FounderInsightsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <FounderInsightsHub />
    </div>
  );
}
