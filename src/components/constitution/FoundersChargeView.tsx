import Link from "next/link";
import {
  FOUNDERS_CHARGE_LINES,
  FOUNDERS_CHARGE_SIGNATORY,
} from "@/lib/constitution/founders-charge";
import { CONSTITUTION_VERSION } from "@/lib/constitution/volume-i";

export function FoundersChargeView() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-gold/80">
          Volume I · Closing Page
        </p>
        <div className="mx-auto mb-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <h1 className="font-serif text-3xl font-semibold text-cream md:text-4xl">
          The Founder&apos;s Charge
        </h1>
        <p className="mt-4 text-sm text-cream-muted">
          Not a constitutional article. A closing covenant for every generation.
        </p>
        <div className="mx-auto mt-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      <blockquote className="space-y-6 font-serif text-xl leading-relaxed text-cream md:text-2xl">
        {FOUNDERS_CHARGE_LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </blockquote>

      <div className="mt-16 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-gold/40" />
        <p className="font-serif text-2xl text-cream">{FOUNDERS_CHARGE_SIGNATORY.name}</p>
        <p className="mt-1 text-sm italic text-gold">{FOUNDERS_CHARGE_SIGNATORY.title}</p>
        <p className="text-sm text-cream-muted">{FOUNDERS_CHARGE_SIGNATORY.organization}</p>
        <p className="mt-6 text-xs text-cream-muted">
          Volume I v{CONSTITUTION_VERSION} · Constitutional Congress pending seal
        </p>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-6 border-t border-gold-subtle pt-8 text-sm">
        <Link href="/library/constitution/article-xvii" className="text-gold hover:text-gold-light">
          Article XVII →
        </Link>
        <Link href="/library/constitutional-ceremony" className="text-gold hover:text-gold-light">
          Constitutional Ceremony →
        </Link>
        <Link href="/library/constitution" className="text-gold hover:text-gold-light">
          Constitution Portal →
        </Link>
      </div>
    </section>
  );
}
