import type { Metadata } from "next";
import { ExcellenceStandardsHub } from "@/components/excellence/ExcellenceStandardsHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Standards of Excellence",
  description:
    "Documented excellence standards per department — KPIs, checklists, and continuous improvement per CANON-008.",
  robots: { index: false, follow: false },
};

export default function ExcellenceStandardsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ExcellenceStandardsHub />
    </div>
  );
}
