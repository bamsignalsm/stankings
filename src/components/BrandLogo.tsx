import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  /** header: site nav · footer: site footer · auth: centered member access */
  variant?: "header" | "footer" | "auth";
  priority?: boolean;
  className?: string;
};

const VARIANT_CLASS = {
  header:
    "h-10 w-auto max-w-[min(68vw,300px)] sm:h-11 sm:max-w-[min(72vw,340px)] md:h-12 md:max-w-[380px] lg:max-w-[420px]",
  footer: "h-12 w-auto max-w-[320px] sm:h-[52px] sm:max-w-[360px] md:max-w-[400px]",
  auth: "h-12 w-auto max-w-[min(88vw,340px)] sm:h-14 sm:max-w-[380px]",
} as const;

const VARIANT_SIZES = {
  header: "(max-width: 640px) 280px, 420px",
  footer: "(max-width: 640px) 320px, 400px",
  auth: "(max-width: 640px) 300px, 380px",
} as const;

export function BrandLogo({
  variant = "header",
  priority = false,
  className = "",
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center ${className}`}
      aria-label={BRAND.logo.alt}
    >
      <Image
        src={BRAND.logo.src}
        alt={BRAND.logo.alt}
        width={BRAND.logo.width}
        height={BRAND.logo.height}
        priority={priority}
        sizes={VARIANT_SIZES[variant]}
        className={`object-contain transition-opacity group-hover:opacity-90 ${variant === "auth" ? "object-center" : "object-left"} ${VARIANT_CLASS[variant]}`}
      />
    </Link>
  );
}
