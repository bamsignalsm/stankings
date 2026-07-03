import Link from "next/link";
import { CONSTITUTION_SCHEDULES } from "@/lib/constitution/schedules";

export function ConstitutionalSchedulesHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Volume I · Constitutional Schedules
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Schedules
          </h1>
          <p className="text-cream-muted">
            Timeless constitutional law in the Articles. Evolving operational detail in structured
            schedules — updated through controlled governance without amending core principles.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          {CONSTITUTION_SCHEDULES.map((schedule) => (
            <section
              key={schedule.id}
              id={schedule.id}
              className="scroll-mt-28 rounded-lg border border-gold-subtle bg-ink-muted p-6"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm text-gold">Schedule {schedule.letter}</p>
                  <h2 className="font-serif text-xl text-cream">{schedule.title}</h2>
                  <p className="mt-1 text-sm text-cream-muted">{schedule.description}</p>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    schedule.status === "active"
                      ? "border-forest/40 text-forest"
                      : "border-gold/40 text-gold"
                  }`}
                >
                  {schedule.status}
                </span>
              </div>
              <ul className="mb-4 space-y-1 text-sm text-cream-muted">
                {schedule.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gold/60">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              {schedule.href && (
                <Link href={schedule.href} className="text-sm text-gold hover:text-gold-light">
                  Open schedule →
                </Link>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution" className="text-gold hover:text-gold-light">
            Constitution Portal →
          </Link>
          <Link href="/library/institution-lifecycle" className="text-gold hover:text-gold-light">
            Lifecycle Registry →
          </Link>
          <Link href="/library/innovation-portal" className="text-gold hover:text-gold-light">
            Innovation Portal →
          </Link>
        </div>
      </div>
    </>
  );
}
