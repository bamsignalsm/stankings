interface ImpactStarsProps {
  rating: number;
  max?: number;
  label?: string;
}

export function ImpactStars({ rating, max = 5, label }: ImpactStarsProps) {
  const filled = Math.min(Math.max(rating, 0), max);
  return (
    <span
      className="text-gold tracking-widest"
      aria-label={label ?? `${filled} of ${max} stars`}
    >
      {"★".repeat(filled)}
      <span className="text-cream-muted/25">{"★".repeat(max - filled)}</span>
    </span>
  );
}

interface TrustTestBadgeProps {
  answer: "strengthen" | "uncertain" | "weaken";
}

const TRUST_TEST_STYLES = {
  strengthen: "border-forest/40 bg-forest/15 text-cream",
  uncertain: "border-gold/40 bg-gold/10 text-gold",
  weaken: "border-burgundy/40 bg-burgundy/15 text-cream",
} as const;

const TRUST_TEST_LABELS = {
  strengthen: "Strengthens trust",
  uncertain: "Uncertain — requires examination",
  weaken: "Weakens trust",
} as const;

export function TrustTestBadge({ answer }: TrustTestBadgeProps) {
  return (
    <span
      className={`inline-block rounded border px-3 py-1 text-xs uppercase tracking-wider ${TRUST_TEST_STYLES[answer]}`}
    >
      {TRUST_TEST_LABELS[answer]}
    </span>
  );
}
