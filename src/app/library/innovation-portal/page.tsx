import type { Metadata } from "next";
import { InnovationPortalHub } from "@/components/innovation-portal/InnovationPortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Innovation Portal — The Stankings Venture Studio",
  description:
    "Constitutional innovation pipeline — fair consideration, disciplined review, Venture Studio per Article X and Schedule H.",
  robots: { index: false, follow: false },
};

export default function InnovationPortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <InnovationPortalHub />
    </div>
  );
}
