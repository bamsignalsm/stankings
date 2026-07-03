import Link from "next/link";
import type { LibraryVolumeMeta } from "@/lib/library";
import { getVolumeHref } from "@/lib/library";

const STATUS_LABELS: Record<LibraryVolumeMeta["status"], string> = {
  published: "Available",
  "in-progress": "Draft One",
  planned: "Planned",
  archived: "Archived",
};

const STATUS_COLORS: Record<LibraryVolumeMeta["status"], string> = {
  published: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "in-progress": "text-gold border-gold/30 bg-gold/10",
  planned: "text-cream-muted border-cream-muted/20 bg-cream-muted/5",
  archived: "text-cream-muted/70 border-cream-muted/20 bg-cream-muted/5",
};

interface VolumeCardProps {
  volume: LibraryVolumeMeta;
  href?: string;
}

export function VolumeCard({ volume, href }: VolumeCardProps) {
  const link = href ?? getVolumeHref(volume.slug);

  const card = (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="font-serif text-3xl font-light text-gold/40">
          {volume.number === 0 ? "00" : String(volume.number).padStart(2, "0")}
        </span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[volume.status]}`}
        >
          {STATUS_LABELS[volume.status]}
        </span>
      </div>
      <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gold">
        {volume.subtitle}
      </p>
      <h3 className="mb-2 font-serif text-xl font-semibold leading-snug text-cream">
        {volume.title}
      </h3>
      {volume.openingQuote && (
        <p className="mb-3 border-l border-gold/30 pl-3 text-xs italic leading-relaxed text-cream-muted/90">
          &ldquo;{volume.openingQuote}&rdquo;
        </p>
      )}
      <p className="mb-3 text-sm italic text-gold/80">{volume.question}</p>
      <p className="mb-4 text-sm leading-relaxed text-cream-muted">
        {volume.purpose}
      </p>
      {volume.targetPages && (
        <p className="text-xs text-cream-muted/60">Target: {volume.targetPages}</p>
      )}
      <p className="mt-4 text-xs text-gold/80 transition group-hover:text-gold">
        {volume.status === "planned" ? "View volume →" : "Read volume →"}
      </p>
    </>
  );

  return (
    <Link
      href={link}
      className="group flex flex-col rounded-lg border border-gold-subtle bg-ink-muted p-6 transition-all hover:border-gold/30 hover:bg-ink-light"
    >
      {card}
    </Link>
  );
}
