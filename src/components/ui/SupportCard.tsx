import Link from "next/link";

export function SupportCard({
  name,
  description,
  href,
  email,
}: {
  name: string;
  description: string;
  href: string;
  email?: string;
}) {
  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
      <h3 className="font-serif text-lg text-cream">{name}</h3>
      <p className="mt-2 text-sm text-cream-muted">{description}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href={href} className="text-gold hover:text-gold-light">
          Open queue →
        </Link>
        {email ? (
          <a href={`mailto:${email}`} className="text-cream-muted hover:text-gold">
            {email}
          </a>
        ) : null}
      </div>
    </div>
  );
}
