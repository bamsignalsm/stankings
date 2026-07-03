import type { Metadata } from "next";
import { FoundationalCharterStandardHub } from "@/components/editorial/FoundationalCharterStandardHub";

export const metadata: Metadata = {
  title: "Foundational Charter Standard (FC-001)",
  description:
    "The governing introduction to every Book — ten sections, writing rules, and chapter approval tests.",
};

export default function FoundationalCharterStandardPage() {
  return (
    <main className="min-h-screen bg-ink pt-20">
      <FoundationalCharterStandardHub />
    </main>
  );
}
