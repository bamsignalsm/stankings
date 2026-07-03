import type { Metadata } from "next";
import { DecisionIntelligenceHub } from "@/components/decision-intelligence/DecisionIntelligenceHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Decision Intelligence",
  description:
    "Judgment Records and institutional reasoning per CANON-020 — how the Group decides, not only what was decided.",
  robots: { index: false, follow: false },
};

export default function DecisionIntelligencePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <DecisionIntelligenceHub />
    </div>
  );
}
