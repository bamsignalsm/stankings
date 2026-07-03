import {
  DEVELOPMENT_METHODOLOGY,
  FUTURE_PLATFORM_SECTIONS,
} from "@/lib/knowledge";

export function DevelopmentMethodology() {
  return (
    <section className="border-b border-gold-subtle bg-ink-light py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-gold">
          Official development methodology
        </p>
        <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-cream">
          The Institution and its Digital Twin
        </h2>
        <p className="mb-10 text-center text-sm text-cream-muted">
          stankings.com is not a website project. It is the Institutional
          Knowledge Platform — built in parallel with the Canon and the Library.
        </p>
        <div className="flex flex-col items-center gap-0">
          {DEVELOPMENT_METHODOLOGY.map((step, i) => (
            <div key={step.label} className="flex w-full max-w-md flex-col items-center">
              <div className="w-full rounded-lg border border-gold-subtle bg-ink-muted px-5 py-4 text-center">
                <p className="font-serif text-lg font-semibold text-cream">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-cream-muted">{step.description}</p>
              </div>
              {i < DEVELOPMENT_METHODOLOGY.length - 1 && (
                <div className="py-2 text-gold/50" aria-hidden>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
            stankings.com — future architecture
          </p>
          <div className="grid gap-6 sm:grid-cols-3 text-sm">
            <div>
              <p className="mb-2 font-medium text-cream">Public</p>
              <ul className="space-y-1 text-cream-muted">
                {FUTURE_PLATFORM_SECTIONS.public.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-cream">Private Library</p>
              <ul className="space-y-1 text-cream-muted">
                {FUTURE_PLATFORM_SECTIONS.privateLibrary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-cream">Portals</p>
              <ul className="space-y-1 text-cream-muted">
                {FUTURE_PLATFORM_SECTIONS.portals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
