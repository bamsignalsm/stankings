"use client";

import { useId, useState, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const baseId = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);

  return (
    <div>
      <div role="tablist" aria-label="Sections" className="flex flex-wrap gap-2 border-b border-gold-subtle pb-2">
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={`rounded-sm px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                selected
                  ? "bg-gold/15 text-gold"
                  : "text-cream-muted hover:text-gold"
              }`}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) =>
        item.id === active ? (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            className="pt-6"
          >
            {item.panel}
          </div>
        ) : null,
      )}
    </div>
  );
}
