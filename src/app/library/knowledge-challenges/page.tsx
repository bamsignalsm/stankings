import type { Metadata } from "next";
import { KnowledgeChallengeHub } from "@/components/knowledge-challenges/KnowledgeChallengeHub";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Knowledge Challenge Process",
  description:
    "Respectfully challenge institutional standards and decisions per CANON-023 — evidence over tradition.",
  robots: { index: false, follow: false },
};

export default function KnowledgeChallengesPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <KnowledgeChallengeHub />
    </div>
  );
}
