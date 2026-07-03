"use client";

import { useState } from "react";
import type { CanonAISummaries } from "@/lib/canon/types";

interface AISummaryTabsProps {
  summaries: CanonAISummaries;
}

const TABS = [
  { id: "one", label: "One paragraph", key: "oneParagraph" as const },
  { id: "five", label: "5 min read", key: "fiveMinute" as const },
  { id: "fifteen", label: "15 min read", key: "fifteenMinute" as const },
  { id: "full", label: "Full text", key: null },
] as const;

export function AISummaryTabs({ summaries }: AISummaryTabsProps) {
  const [active, setActive] = useState<string>("one");

  return (
    <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">AI Summary</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-sm border px-3 py-1.5 text-xs transition ${
              active === tab.id
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold-subtle text-cream-muted hover:border-gold/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="leading-relaxed text-cream-muted">
        {active === "full"
          ? "See structured sections below for the authoritative full text."
          : summaries[TABS.find((t) => t.id === active)!.key!]}
      </p>
    </section>
  );
}
