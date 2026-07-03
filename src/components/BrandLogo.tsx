import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  /** header: compact nav · footer: slightly larger */
  variant?: "header" | "footer";
  priority?: boolean;
  className?: string;
};

const VARIANT_CLASS = {
  header:
    "h-9 w-auto min-w-[120px] max-w-[min(52vw,200px)] sm:min-w-[140px] sm:max-w-[220px] md:h-11 md:min-w-[160px] md:max-w-[240px]",
  footer: "h-11 w-auto min-w-[150px] max-w-[260px] sm:h-12 sm:max-w-[280px]",
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
        sizes="(max-width: 640px) 180px, 240px"
        className={`object-contain object-left transition-opacity group-hover:opacity-90 ${VARIANT_CLASS[variant]}`}
      />
    </Link>
  );
}
