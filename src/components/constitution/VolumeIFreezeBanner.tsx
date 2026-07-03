import Link from "next/link";
import { VOLUME_I_FREEZE } from "@/lib/constitutional-convention/freeze";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export function VolumeIFreezeBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-center text-xs text-cream-muted">
        Volume I v{CONSTITUTION_VERSION} ·{" "}
        <span className="text-gold">Frozen for Convention review</span>
        {" · "}
        <Link href="/library/constitutional-convention" className="hover:text-gold-light">
          Convention →
        </Link>
      </p>
    );
  }

  return (
    <div className="border-b border-gold/25 bg-gold-subtle/40">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-gold">
            Volume I v{CONSTITUTION_VERSION} — Convention Review
          </p>
          <p className="text-cream-muted">
            {VOLUME_I_FREEZE.articlesFrozen} Articles frozen · Text locked · Presentation strengthening
          </p>
        </div>
        <Link
          href="/library/constitutional-convention"
          className="shrink-0 rounded border border-gold/40 px-4 py-2 text-gold hover:bg-gold-subtle"
        >
          Constitutional Convention →
        </Link>
      </div>
    </div>
  );
}
