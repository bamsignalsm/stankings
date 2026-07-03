import type { Metadata } from "next";
import { ConstitutionalSchedulesHub } from "@/components/constitution/ConstitutionalSchedulesHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Constitutional Schedules",
  description: "Volume I schedules — evolving operational detail attached to the Constitution.",
  robots: { index: false, follow: false },
};

export default function ConstitutionalSchedulesPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <ConstitutionalSchedulesHub />
    </div>
  );
}
