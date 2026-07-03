"use client";

import { useState } from "react";
import type { HealthDimensionScore } from "@/lib/constitutional-health/types";
import { renderStars } from "@/lib/constitutional-health/register";

interface HealthDimensionCardProps {
  dimension: HealthDimensionScore;
}

export function HealthDimensionCard({ dimension }: HealthDimensionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const trendLabel = {
    improving: "↑ Improving",
    stable: "→ Stable",
    declining: "↓ Declining",
  }[dimension.trend];

  const trendColor = {
    improving: "text-forest",
    stable: "text-cream-muted",
    declining: "text-burgundy",
  }[dimension.trend];

  return (
    <article
      className={`rounded-lg border bg-ink-muted transition-colors ${
        expanded ? "border-gold/50" : "border-gold-subtle"
      }`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="font-serif text-lg text-cream">{dimension.label}</p>
          <p className={`text-xs ${trendColor}`}>{trendLabel}</p>
        </div>
        <p className="text-2xl tracking-widest text-gold">{renderStars(dimension.score)}</p>
      </button>

      {expanded && (
        <div className="border-t border-gold-subtle px-5 pb-5 pt-4 text-sm">
          {dimension.priorScore !== undefined && (
            <p className="mb-3 text-xs text-cream-muted">
              Prior: {renderStars(dimension.priorScore)} · Current: {dimension.score}/{dimension.maxScore}
            </p>
          )}
          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-gold">Evidence</p>
            <ul className="list-inside list-disc space-y-1 text-cream-muted">
              {dimension.evidence.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-gold">Recommendations</p>
            <ul className="list-inside list-disc space-y-1 text-cream-muted">
              {dimension.recommendations.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            {dimension.relatedCanons.map((c) => (
              <span key={c} className="rounded border border-gold-subtle px-2 py-0.5 text-xs text-gold">
                {c}
              </span>
            ))}
            {dimension.relatedArticles.map((a) => (
              <span key={a} className="rounded border border-gold-subtle/50 px-2 py-0.5 text-xs text-cream-muted">
                {a}
              </span>
            ))}
          </div>
          {dimension.improvementPlan && (
            <p className="mt-4 text-xs text-cream-muted">
              Plan: <span className="text-gold">{dimension.improvementPlan}</span>
            </p>
          )}
        </div>
      )}
    </article>
  );
}
