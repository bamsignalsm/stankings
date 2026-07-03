"use client";

import { useState } from "react";
import { LIBRARY_SACRED_GATE } from "@/lib/institutional";

interface LibrarySacredGateProps {
  onEnter: () => void;
}

export function LibrarySacredGate({ onEnter }: LibrarySacredGateProps) {
  const [exiting, setExiting] = useState(false);

  function handleEnter() {
    setExiting(true);
    window.setTimeout(onEnter, 600);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-ink sacred-vignette transition-opacity duration-700 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto max-w-2xl px-8 text-center">
        <p className="mb-16 text-[10px] font-medium uppercase tracking-[0.5em] text-legacy-gold/60">
          Stankings Group
        </p>

        <h1 className="mb-12 font-serif text-4xl font-semibold uppercase tracking-[0.12em] text-cream md:text-5xl lg:text-6xl">
          {LIBRARY_SACRED_GATE.title}
        </h1>

        <div className="mb-16 space-y-3">
          {LIBRARY_SACRED_GATE.lines.map((line) => (
            <p
              key={line}
              className="font-serif text-lg italic tracking-wide text-cream-muted md:text-xl"
            >
              {line}
            </p>
          ))}
        </div>

        <p className="mb-20 font-mono text-xs uppercase tracking-[0.35em] text-gold/70">
          {LIBRARY_SACRED_GATE.version}
        </p>

        <button
          type="button"
          onClick={handleEnter}
          className="group relative overflow-hidden rounded-sm border border-gold/40 bg-transparent px-12 py-4 text-sm font-medium uppercase tracking-[0.25em] text-gold transition hover:border-gold hover:bg-gold/10"
        >
          <span className="relative z-10">{LIBRARY_SACRED_GATE.enterLabel}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition group-hover:translate-x-full duration-700" />
        </button>
      </div>
    </div>
  );
}
