import Link from "next/link";
import type { GovernanceBreadcrumbItem } from "@/lib/governance-code/types";

export function GovernanceBreadcrumbs({ items }: { items: GovernanceBreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-cream-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <span className="text-gold">→</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold-light">
                {item.label}
              </Link>
            ) : (
              <span className="text-cream">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
