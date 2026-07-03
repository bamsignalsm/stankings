import type { Metadata } from "next";
import { ConstitutionPortalHub } from "@/components/constitution/ConstitutionPortalHub";
import { MemberBanner } from "@/components/MemberBanner";
import { CONSTITUTION_MOTTO, CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export const metadata: Metadata = {
  title: "Volume I — The Constitution",
  description: `The Stankings Group Constitution v${CONSTITUTION_VERSION}. ${CONSTITUTION_MOTTO}`,
  robots: { index: false, follow: false },
};

export default function ConstitutionPortalPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionPortalHub />
    </div>
  );
}
