import type { Metadata } from "next";
import { FoundersChargeView } from "@/components/constitution/FoundersChargeView";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "The Founder's Charge",
  description:
    "Closing page of Volume I — a covenant for every generation of custodians. Stanley Ukeje, Founder & First Custodian.",
  robots: { index: false, follow: false },
};

export default function FoundersChargePage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <FoundersChargeView />
    </div>
  );
}
