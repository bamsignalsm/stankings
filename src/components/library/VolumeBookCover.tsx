"use client";

import Link from "next/link";
import { useState } from "react";
import type { LibraryVolumeMeta } from "@/lib/library";
import { getVolumeHref } from "@/lib/library";

const STATUS_LABELS: Record<LibraryVolumeMeta["status"], string> = {
  published: "Published",
  "in-progress": "Draft One",
  planned: "Planned",
  archived: "Archived",
};

function volumeEditionLabel(volume: LibraryVolumeMeta): string {
  if (volume.slug === "first-principles" || volume.slug === "constitution") {
    return "Version 1.0";
  }
  if (volume.slug === "governance-code") {
    return "Foundational Draft";
  }
  const defaults: Record<LibraryVolumeMeta["status"], string> = {
    published: "First Edition",
    "in-progress": "Draft One",
    planned: "Not yet bound",
    archived: "Archived Edition",
  };
  return defaults[volume.status];
}

function volumeStatusLabel(volume: LibraryVolumeMeta): string {
  if (volume.slug === "first-principles") return "Approved";
  if (volume.slug === "constitution") return "In Force";
  if (volume.slug === "governance-code") return "Foundational Draft";
  return STATUS_LABELS[volume.status];
}

interface VolumeBookCoverProps {
  volume: LibraryVolumeMeta;
  href?: string;
}

export function VolumeBookCover({ volume, href }: VolumeBookCoverProps) {
  const link = href ?? getVolumeHref(volume.slug);
  const [open, setOpen] = useState(false);

  const volumeLabel =
    volume.number === 0 ? "VOL. 0" : `VOL. ${String(volume.number).padStart(2, "0")}`;

  return (
    <Link
      href={link}
      className="group block perspective-[1200px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div
        className={`relative mx-auto aspect-[3/4] w-full max-w-[220px] transition-transform duration-500 ease-out ${
          open ? "[transform:rotateY(-8deg)_translateX(4px)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Spine */}
        <div
          className="book-cover-spine absolute left-0 top-0 z-10 h-full w-3 rounded-l-sm"
          aria-hidden
        />

        {/* Cover */}
        <div className="book-cover relative ml-3 flex h-full flex-col justify-between overflow-hidden rounded-r-sm border border-gold/15 p-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')] opacity-40" />

          <div className="relative">
            <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.35em] text-gold/50">
              {volumeLabel}
            </p>
            <div className="mb-4 h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" />
            <h3 className="gold-emboss font-serif text-lg font-semibold leading-tight text-gold md:text-xl">
              {volume.title}
            </h3>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-cream-muted/80">
              {volume.subtitle}
            </p>
          </div>

          <div className="relative">
            <p className="mb-3 font-serif text-sm italic text-cream-muted/90">
              {volume.question}
            </p>
            <div className="flex items-center justify-between gap-2 border-t border-gold/20 pt-3">
              <span className="text-[9px] uppercase tracking-wider text-gold/60">
                {volumeEditionLabel(volume)}
              </span>
              <span className="rounded border border-gold/25 px-2 py-0.5 text-[8px] uppercase tracking-wider text-cream-muted">
                {volumeStatusLabel(volume)}
              </span>
            </div>
          </div>

          {/* Page edge hint on hover */}
          <div
            className={`absolute -right-1 top-2 bottom-2 w-1 rounded-r bg-gradient-to-r from-cream/5 to-cream/15 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-gold/70 opacity-0 transition group-hover:opacity-100">
        Open volume →
      </p>
    </Link>
  );
}
