import type { Metadata } from "next";
import { CustodianProgrammePortalHub } from "@/components/custodian-programme/CustodianProgrammePortalHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "The Custodian Programme",
  description:
    "Leadership continuity and custodian development — constitutional programme per Article XVI.",
  robots: { index: false, follow: false },
};

export default function CustodianProgrammePortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <CustodianProgrammePortalHub />
    </div>
  );
}
