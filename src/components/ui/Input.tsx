import type { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-sm text-cream placeholder:text-cream-muted/60 transition-colors duration-[var(--ds-duration-normal)] focus:border-gold/50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
