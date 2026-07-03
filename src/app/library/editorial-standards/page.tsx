import type { Metadata } from "next";
import { EditorialStandardsHub } from "@/components/editorial/EditorialStandardsHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: "How the Stankings Library is built — editorial workflow and publishing standards.",
  robots: { index: false, follow: false },
};

export default function EditorialStandardsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <EditorialStandardsHub />
    </div>
  );
}
