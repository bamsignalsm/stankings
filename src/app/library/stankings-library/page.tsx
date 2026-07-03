import type { Metadata } from "next";
import { StankingsLibraryPortalHub } from "@/components/stankings-library/StankingsLibraryPortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "The Stankings Library Portal",
  description:
    "Institutional memory — knowledge objects, learning, and the constitutional Library per Article XIII.",
  robots: { index: false, follow: false },
};

export default function StankingsLibraryPortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <StankingsLibraryPortalHub />
    </div>
  );
}
