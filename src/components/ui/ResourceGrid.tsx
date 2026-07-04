import Link from "next/link";

export interface ResourceItem {
  title: string;
  summary: string;
  href: string;
  external?: boolean;
}

export function ResourceGrid({ items }: { items: ResourceItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) =>
        item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
          >
            <h3 className="font-serif text-lg text-cream">{item.title}</h3>
            <p className="mt-2 text-sm text-cream-muted">{item.summary}</p>
            <p className="mt-3 text-xs text-gold">External ↗</p>
          </a>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
          >
            <h3 className="font-serif text-lg text-cream">{item.title}</h3>
            <p className="mt-2 text-sm text-cream-muted">{item.summary}</p>
          </Link>
        ),
      )}
    </div>
  );
}
