import type { ReactNode } from "react";

export function List({
  items,
  ordered = false,
}: {
  items: ReactNode[];
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-2 ${ordered ? "list-decimal pl-5" : ""}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-cream-muted">
          {!ordered ? <span className="text-gold" aria-hidden>◆</span> : null}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}
