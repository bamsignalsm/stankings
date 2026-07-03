import type { Metadata } from "next";
import { DraftZeroArchive } from "@/components/DraftZeroArchive";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Draft Zero — Archived",
  description: "Archived constitutional draft that helped discover the institution.",
  robots: { index: false, follow: false },
};

export default function DraftZeroPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <DraftZeroArchive />
    </div>
  );
}
