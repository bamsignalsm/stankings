import type { Metadata } from "next";
import { ImprovementsRegistryHub } from "@/components/improvements/ImprovementsRegistryHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Institutional Improvement Register",
  description:
    "Living register of institutional improvements per CANON-019 — how the Group matures across generations.",
  robots: { index: false, follow: false },
};

export default function ImprovementsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ImprovementsRegistryHub />
    </div>
  );
}
