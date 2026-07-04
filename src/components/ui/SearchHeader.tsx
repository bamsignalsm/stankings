"use client";

export function SearchHeader({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}) {
  return (
    <div className="mb-8">
      <label htmlFor="global-search-input" className="sr-only">
        {label}
      </label>
      <input
        id="global-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/60 focus:border-gold/50 focus:outline-none"
      />
    </div>
  );
}
