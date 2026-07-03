import type { Metadata } from "next";
import { SLPSCoreHub } from "@/components/slps-core/SLPSCoreHub";

export const metadata: Metadata = {
  title: "Stankings Library Publishing System (SLPS-CORE)",
  description:
    "The publishing engine that enforces SLPS-001 — seven modules for metadata, cross-references, review, search, and future AI.",
};

export default function PublishingSystemPage() {
  return (
    <main className="min-h-screen bg-ink pt-20">
      <SLPSCoreHub />
    </main>
  );
}
