import type { Metadata } from "next";
import { GRFFrameworkPage } from "@/components/frameworks/GRFFrameworkPage";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Generational Review Framework",
  description:
    "CANON-006 operationalized — think in generations, act in the present. Long-term assessment for material proposals.",
  robots: { index: false, follow: false },
};

export default function GenerationalReviewPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <GRFFrameworkPage />
    </div>
  );
}
