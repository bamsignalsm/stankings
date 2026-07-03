import type { Metadata } from "next";
import { DecisionRecordHub } from "@/components/decisions/DecisionRecordHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Decision Record Registry",
  description:
    "Institutional memory of significant decisions — evidence, rationale, and lessons learned per CANON-007.",
  robots: { index: false, follow: false },
};

export default function DecisionRecordsPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <DecisionRecordHub />
    </div>
  );
}
