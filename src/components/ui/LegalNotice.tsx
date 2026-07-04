export function LegalNotice({ children }: { children: React.ReactNode }) {
  return (
    <aside
      role="note"
      className="rounded-lg border border-gold/30 bg-gold-subtle p-4 text-sm leading-relaxed text-cream-muted"
    >
      {children}
    </aside>
  );
}
