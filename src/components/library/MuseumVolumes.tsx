import { VolumeBookCover } from "@/components/library/VolumeBookCover";
import { LIBRARY_VOLUMES } from "@/lib/library";
import { MUSEUM_HIERARCHY } from "@/lib/institutional";

export function MuseumVolumes() {
  return (
    <section className="border-b border-gold-subtle bg-ink-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-2 text-center text-[10px] uppercase tracking-[0.4em] text-gold/70">
          The Collection
        </p>
        <h2 className="mb-3 text-center font-serif text-3xl font-semibold text-cream md:text-4xl">
          Volumes
        </h2>
        <p className="mx-auto mb-4 max-w-xl text-center text-sm text-cream-muted">
          Not folders. A museum of institutional memory — each volume a bound
          book on the shelf.
        </p>
        <p className="mb-14 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-cream-muted/60">
          {MUSEUM_HIERARCHY.join(" → ")}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {LIBRARY_VOLUMES.map((volume) => (
            <VolumeBookCover key={volume.slug} volume={volume} />
          ))}
        </div>
      </div>
    </section>
  );
}
