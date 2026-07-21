import Link from "next/link";
import { USER_REGISTER_PATH } from "@/lib/auth-paths";
import {
  COMPANIES,
  CORE_PLATFORM,
  LIVE_PLATFORMS,
  PILLARS,
  SITE,
  SUCCESS_DIMENSIONS,
} from "@/lib/data";
import { CompanyCard } from "@/components/CompanyCard";
import { HeroSection } from "@/components/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* About */}
      <section id="about" className="border-t border-gold-subtle py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Who We Are
              </p>
              <h2 className="mb-6 font-serif text-4xl font-semibold text-cream md:text-5xl">
                Not a collection of companies.
                <br />
                <span className="text-cream-muted">An enduring institution.</span>
              </h2>
              <p className="mb-6 leading-relaxed text-cream-muted">
                Stankings Legacy Ltd exists as a permanent institution dedicated to creating
                lasting value through enterprise, technology, education, innovation,
                philanthropy, and ethical leadership. We are proudly African, building
                trust infrastructure that makes Nigerians feel safer making important
                decisions.
              </p>
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-xl italic text-cream/90">
                &ldquo;{SITE.motto}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-cream-muted">
                — {SITE.founder}, Founder
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Our Mission
                </h3>
                <p className="text-cream-muted">{SITE.mission}</p>
              </div>
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Our Vision
                </h3>
                <p className="text-cream-muted">{SITE.vision}</p>
              </div>
              <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  The Custodian Principle
                </h3>
                <p className="text-cream-muted">
                  No individual owns the legacy of Stankings Legacy Ltd. Every leader is
                  entrusted with preserving, strengthening, and responsibly transferring
                  that legacy. Leadership is stewardship. Authority is responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-gold-subtle bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl font-semibold text-cream md:text-4xl">
              Everything we build must serve a purpose
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITE.philosophy.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-gold-subtle bg-ink-muted p-5"
              >
                <span className="mt-0.5 text-gold">✦</span>
                <p className="text-cream-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section id="companies" className="border-t border-gold-subtle py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Centers of Excellence
            </p>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-cream md:text-4xl">
              Ten specialized institutions, one trusted ecosystem
            </h2>
            <p className="text-cream-muted">
              Each company exists to fulfill a clear and distinct purpose — becoming
              exceptionally competent in one mission while strengthening every other
              company in the Group.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIES.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Platforms */}
      <section id="platforms" className="border-t border-gold-subtle bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Live Now
            </p>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-cream md:text-4xl">
              Platforms you can use today
            </h2>
            <p className="text-cream-muted">
              Three Stankings Legacy Ltd companies are live and serving customers across
              Nigeria — marketplace, relationships, and financial infrastructure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {LIVE_PLATFORMS.map((platform) => (
              <a
                key={platform.domain}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-gold-subtle bg-ink-muted p-8 transition hover:border-gold/40 hover:bg-ink-light"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="font-serif text-2xl font-semibold text-cream group-hover:text-gold-light"
                  >
                    {platform.name}
                  </span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-400">
                    Live
                  </span>
                </div>
                <p className="mb-4 text-sm text-cream-muted">{platform.description}</p>
                <p
                  className="text-sm font-medium transition"
                  style={{ color: platform.color }}
                >
                  {platform.domain} ↗
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="border-t border-gold-subtle bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Three Pillars
            </p>
            <h2 className="font-serif text-3xl font-semibold text-cream md:text-4xl">
              Commerce funds education. Education develops people. Philanthropy strengthens society.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-subtle bg-gold-subtle">
                  <span className="font-serif text-2xl text-gold">
                    {pillar.title[0]}
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-2xl font-semibold text-cream">
                  {pillar.title}
                </h3>
                <p className="mb-4 text-sm text-gold">{pillar.subtitle}</p>
                <p className="mb-6 text-sm leading-relaxed text-cream-muted">
                  {pillar.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {pillar.companies.map((slug) => {
                    const company = COMPANIES.find((c) => c.slug === slug);
                    return company ? (
                      <Link
                        key={slug}
                        href={`/companies/${slug}`}
                        className="rounded-full border border-gold-subtle px-3 py-1 text-xs text-cream-muted transition hover:border-gold/30 hover:text-gold"
                      >
                        {company.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Dimensions */}
      <section className="border-t border-gold-subtle py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              How We Measure Success
            </p>
            <h2 className="font-serif text-3xl font-semibold text-cream md:text-4xl">
              Beyond revenue and profit
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {SUCCESS_DIMENSIONS.map((dim, i) => (
              <div
                key={dim.title}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <span className="mb-3 block font-serif text-3xl font-light text-gold/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 font-serif text-lg font-semibold text-cream">
                  {dim.title}
                </h3>
                <p className="text-sm text-cream-muted">{dim.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Platform */}
      <section className="border-t border-gold-subtle bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Stankings Core Platform
              </p>
              <h2 className="mb-6 font-serif text-3xl font-semibold text-cream md:text-4xl">
                One digital foundation for every company
              </h2>
              <p className="mb-6 leading-relaxed text-cream-muted">
                The Core Platform provides shared institutional capabilities —
                identity, trust, security, payments, analytics, and AI — so every
                company can focus on solving customer problems while operating
                efficiently, securely, and consistently.
              </p>
              <Link
                href="/library/constitution"
                className="inline-flex items-center gap-2 text-sm text-gold transition hover:text-gold-light"
              >
                Read Volume I — The Constitution (members) →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CORE_PLATFORM.map((cap) => (
                <div
                  key={cap}
                  className="rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream-muted"
                >
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Flow */}
      <section className="border-t border-gold-subtle py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Trust Infrastructure
          </p>
          <h2 className="mb-8 font-serif text-3xl font-semibold text-cream md:text-4xl">
            Everything reinforces everything
          </h2>
          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-left">
            <div className="space-y-3 font-mono text-sm text-cream-muted">
              <p>
                <span className="text-gold">Buyer</span> finds property on{" "}
                <span className="text-cream">Yike</span>
              </p>
              <p className="pl-4">↓</p>
              <p>
                <span className="text-gold">Stanhan</span> verifies property
              </p>
              <p className="pl-4">↓</p>
              <p>
                <span className="text-gold">BayRight</span> secures escrow
              </p>
              <p className="pl-4">↓</p>
              <p>
                <span className="text-gold">Stankings Passport</span> trust updated
              </p>
              <p className="pl-4">↓</p>
              <p className="text-cream">Buyer buys confidently</p>
            </div>
          </div>
          <p className="mt-8 text-cream-muted">
            Trust earned in one company flows across the entire ecosystem — with
            user consent and institutional integrity.
          </p>
        </div>
      </section>

      {/* Library CTA */}
      <section className="border-t border-gold-subtle bg-ink-light py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            The Stankings Library
          </p>
          <h2 className="mb-6 font-serif text-3xl font-semibold text-cream md:text-4xl">
            Institutional knowledge for generations
          </h2>
          <p className="mb-8 text-cream-muted">
            Volume 0 (The First Principles) holds our philosophy. Volume I
            (The Constitution) holds the law. The full Library structure,
            Lexicon, and Draft Zero archive are on the Library page.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/library"
              className="inline-block rounded-sm border border-gold bg-gold px-8 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
            >
              Enter The Library
            </Link>
            <Link
              href={USER_REGISTER_PATH}
              className="inline-block rounded-sm border border-gold-subtle px-8 py-3 text-sm font-medium text-cream transition hover:border-gold/40 hover:text-gold"
            >
              Member access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
