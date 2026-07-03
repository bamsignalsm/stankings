import type { Metadata } from "next";
import { CanonMaturityHub } from "@/components/canon-maturity/CanonMaturityHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Canon Maturity Dashboard",
  description:
    "Volume 0 living operating system — canon maturity, metrics, and the Letter to the Future Custodian.",
  robots: { index: false, follow: false },
};

export default function CanonMaturityPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <CanonMaturityHub />
    </div>
  );
}
