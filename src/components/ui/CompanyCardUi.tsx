import Link from "next/link";

export function CompanyCardUi({
  name,
  tagline,
  href,
  status,
}: {
  name: string;
  tagline: string;
  href: string;
  status?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/40"
    >
      {status ? <p className="text-xs tracking-widest text-gold uppercase">{status}</p> : null}
      <h3 className="mt-1 font-serif text-xl text-cream">{name}</h3>
      <p className="mt-2 text-sm text-cream-muted">{tagline}</p>
    </Link>
  );
}
