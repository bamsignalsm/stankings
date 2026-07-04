import type { ReactNode } from "react";

type Tone = "info" | "success" | "warning" | "danger";

const TONES: Record<Tone, string> = {
  info: "border-info/40 bg-info/15 text-cream",
  success: "border-success/40 bg-success/15 text-cream",
  warning: "border-gold/40 bg-gold/10 text-gold",
  danger: "border-danger/40 bg-danger/20 text-cream",
};

export function Alert({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      className={`rounded-lg border p-4 text-sm leading-relaxed ${TONES[tone]}`}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="opacity-90">{children}</div>
    </div>
  );
}
