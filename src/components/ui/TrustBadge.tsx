import Link from "next/link";

export function TrustBadge({
  label = "Trust Center",
  href = "/trust",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold transition hover:bg-gold/20"
    >
      <span aria-hidden>◆</span>
      {label}
    </Link>
  );
}
