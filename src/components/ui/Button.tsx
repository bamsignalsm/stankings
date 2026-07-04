import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-gold bg-gold text-ink hover:bg-gold-light focus-visible:outline-gold",
  secondary:
    "border-gold-subtle bg-transparent text-cream hover:border-gold/40 hover:text-gold focus-visible:outline-gold",
  ghost:
    "border-transparent bg-transparent text-cream-muted hover:text-gold focus-visible:outline-gold",
  danger:
    "border-danger/50 bg-danger/20 text-cream hover:bg-danger/30 focus-visible:outline-danger",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-sm border font-semibold transition-colors duration-[var(--ds-duration-normal)] ease-[var(--ds-easing-standard)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
