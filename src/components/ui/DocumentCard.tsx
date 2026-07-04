import Link from "next/link";

export function DocumentCard({
  title,
  summary,
  href,
  type,
}: {
  title: string;
  summary: string;
  href: string;
  type?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
    >
      {type ? <p className="text-xs tracking-widest text-gold uppercase">{type}</p> : null}
      <h3 className="mt-1 font-serif text-lg text-cream">{title}</h3>
      <p className="mt-2 text-sm text-cream-muted">{summary}</p>
    </Link>
  );
}
