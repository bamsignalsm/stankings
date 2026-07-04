"use client";

import { Input } from "./Input";

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
      <Input
        id="global-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="py-3"
      />
    </div>
  );
}
