import type { Metadata } from "next";
import { LibrarySessionsHub } from "@/components/library-sessions/LibrarySessionsHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Library Session Records",
  description:
    "Institutional memory — session records, progress reports, and editorial methodology per Editor's Decision No. 47.",
  robots: { index: false, follow: false },
};

export default function LibrarySessionsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <LibrarySessionsHub />
    </div>
  );
}
