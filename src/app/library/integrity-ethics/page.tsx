import type { Metadata } from "next";
import { IntegrityEthicsCentreHub } from "@/components/integrity-ethics/IntegrityEthicsCentreHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Integrity & Ethics Centre",
  description:
    "Constitutional integrity registers — conflicts, gifts, related parties, declarations, and ethics reporting per Article XI.",
  robots: { index: false, follow: false },
};

export default function IntegrityEthicsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <IntegrityEthicsCentreHub />
    </div>
  );
}
