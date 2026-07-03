import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-mobile.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="object-cover object-[center_22%] md:hidden"
          sizes="100vw"
        />
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="hidden object-cover object-[56%_36%] md:block"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-ink/55 md:from-ink/65 md:via-ink/20 md:to-ink/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,rgba(10,10,11,0.15)_0%,rgba(10,10,11,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.06)_0%,transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center sm:py-20 md:py-24">
        <p className="hero-text-shadow mb-5 text-xs font-medium uppercase tracking-[0.35em] text-gold sm:mb-6">
          An African Institution
        </p>
        <h1 className="hero-text-shadow mb-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-cream sm:mb-6 sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl">
          Building Institutions
          <br />
          <span className="text-gradient-gold hero-gold-shadow">
            That Empower Generations
          </span>
        </h1>
        <p className="hero-text-shadow mx-auto mb-8 max-w-2xl text-base leading-relaxed text-cream/90 sm:mb-10 sm:text-lg">
          {SITE.brandPromise}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/#companies"
            className="w-full rounded-sm border border-gold bg-gold px-8 py-3 text-sm font-semibold text-ink shadow-[0_4px_24px_rgba(10,10,11,0.45)] transition hover:bg-gold-light sm:w-auto"
          >
            Explore Our Ecosystem
          </Link>
          <Link
            href="/library"
            className="w-full rounded-sm border border-gold-subtle bg-ink/45 px-8 py-3 text-sm font-medium text-cream backdrop-blur-sm transition hover:border-gold/40 hover:bg-ink/60 hover:text-gold sm:w-auto"
          >
            The Stankings Library
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce sm:bottom-8">
        <div className="h-8 w-5 rounded-full border border-gold-subtle bg-ink/30 p-1 backdrop-blur-sm">
          <div className="h-2 w-full rounded-full bg-gold/60" />
        </div>
      </div>
    </section>
  );
}
