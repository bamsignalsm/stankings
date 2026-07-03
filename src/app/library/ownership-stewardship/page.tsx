import type { Metadata } from "next";
import { OwnershipStewardshipPortalHub } from "@/components/ownership-stewardship/OwnershipStewardshipPortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Ownership & Stewardship Portal",
  description:
    "Constitutional philosophy of ownership and custody — Governance Architecture Register per Article VIII.",
  robots: { index: false, follow: false },
};

export default function OwnershipStewardshipPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <OwnershipStewardshipPortalHub />
    </div>
  );
}
