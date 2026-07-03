import type { Metadata } from "next";
import { StewardshipPortalHub } from "@/components/stewardship/StewardshipPortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Stewardship Portal",
  description:
    "Observable stewardship — profiles, succession, declarations and custodian progress per Article III.",
  robots: { index: false, follow: false },
};

export default function StewardshipPortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <StewardshipPortalHub />
    </div>
  );
}
