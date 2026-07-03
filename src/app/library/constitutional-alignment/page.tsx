import type { Metadata } from "next";
import { ConstitutionalAlignmentHub } from "@/components/constitutional-alignment/ConstitutionalAlignmentHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Alignment Engine",
  description:
    "Article II operationalized — constitutional compliance for every Board proposal before approval.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalAlignmentPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalAlignmentHub />
    </div>
  );
}
