export function PolicyHeader({
  eyebrow,
  title,
  updated,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
}) {
  return (
    <header className="mb-8 border-b border-gold-subtle pb-6">
      <p className="text-xs font-medium tracking-[0.35em] text-gold uppercase">{eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-cream md:text-4xl">{title}</h1>
      {updated ? (
        <p className="mt-2 text-xs tracking-widest text-cream-muted uppercase">
          Last updated {updated}
        </p>
      ) : null}
    </header>
  );
}
