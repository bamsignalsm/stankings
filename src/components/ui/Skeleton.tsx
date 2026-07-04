export function Skeleton({
  className = "",
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`animate-pulse rounded-sm bg-ink-muted ${className}`}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}
