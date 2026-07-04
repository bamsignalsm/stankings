export function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
      <p className="text-xs text-cream-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl text-cream">{value}</p>
      {hint ? <p className="mt-1 text-xs text-cream-muted">{hint}</p> : null}
    </div>
  );
}
