import type { Metadata } from "next";
import { ConstitutionalCeremonyPortalHub } from "@/components/constitutional-ceremony/ConstitutionalCeremonyPortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Ceremony",
  description:
    "Ratification, oath, and commitment — constitutional office holder records per Article XVII.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalCeremonyPortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalCeremonyPortalHub />
    </div>
  );
}
