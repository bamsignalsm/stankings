export interface TimelineItem {
  title: string;
  detail: string;
  meta?: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-0 border-l border-gold-subtle pl-6">
      {items.map((item) => (
        <li key={item.title} className="relative pb-8 last:pb-0">
          <span
            className="absolute top-1.5 -left-[1.9rem] h-2.5 w-2.5 rounded-full bg-gold"
            aria-hidden
          />
          {item.meta ? (
            <p className="text-xs tracking-widest text-gold uppercase">{item.meta}</p>
          ) : null}
          <h3 className="font-serif text-lg text-cream">{item.title}</h3>
          <p className="mt-1 text-sm text-cream-muted">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
}
