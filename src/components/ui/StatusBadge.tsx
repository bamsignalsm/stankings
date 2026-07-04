export type UiStatus = "operational" | "degraded" | "outage" | "maintenance" | "unknown" | "healthy" | "down";

const STYLES: Record<UiStatus, string> = {
  operational: "border-success/40 bg-success/15 text-cream",
  healthy: "border-success/40 bg-success/15 text-cream",
  degraded: "border-gold/40 bg-gold/10 text-gold",
  outage: "border-danger/40 bg-danger/20 text-cream",
  down: "border-danger/40 bg-danger/20 text-cream",
  maintenance: "border-info/40 bg-info/15 text-cream",
  unknown: "border-gold-subtle bg-ink-muted text-cream-muted",
};

export function StatusBadge({ status, label }: { status: UiStatus; label?: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${STYLES[status]}`}
    >
      {label ?? status.replace("_", " ")}
    </span>
  );
}
