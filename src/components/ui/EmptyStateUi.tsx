export function EmptyStateUi({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-center">
      <p className="font-serif text-xl text-cream">{title}</p>
      <p className="mt-2 text-sm text-cream-muted">{body}</p>
    </div>
  );
}
