import type { Metadata } from "next";
import { ConstitutionalConventionHub } from "@/components/constitutional-convention/ConstitutionalConventionHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Convention",
  description:
    "Volume I verification — audit, cross-linking, commentary, diagrams, index, and search before Volume II.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalConventionPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalConventionHub />
    </div>
  );
}
