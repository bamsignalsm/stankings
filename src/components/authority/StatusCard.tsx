import Link from "next/link";
import type { ServiceHealth, StatusServiceCard } from "@/lib/authority/types";

const HEALTH_STYLES: Record<ServiceHealth, string> = {
  operational: "border-success/40 bg-success/15 text-cream",
  degraded: "border-gold/40 bg-gold/10 text-gold",
  outage: "border-danger/40 bg-danger/20 text-cream",
  maintenance: "border-info/40 bg-info/15 text-cream",
  unknown: "border-gold-subtle bg-ink-muted text-cream-muted",
};

const HEALTH_LABEL: Record<ServiceHealth, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
  maintenance: "Maintenance",
  unknown: "Unknown",
};

export function StatusBadge({ health }: { health: ServiceHealth }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${HEALTH_STYLES[health]}`}
    >
      {HEALTH_LABEL[health]}
    </span>
  );
}

export function StatusCard({ service }: { service: StatusServiceCard }) {
  const inner = (
    <>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-cream">{service.name}</h3>
        <StatusBadge health={service.health} />
      </div>
      <p className="text-sm text-cream-muted">{service.description}</p>
      <p className="mt-3 text-xs leading-relaxed text-cream-muted/90">{service.note}</p>
    </>
  );

  const className =
    "block rounded-lg border border-gold-subtle bg-ink-muted p-5 transition hover:border-gold/30";

  if (service.href?.startsWith("http")) {
    return (
      <a href={service.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  if (service.href) {
    return (
      <Link href={service.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function StatusGrid({ services }: { services: StatusServiceCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <StatusCard key={service.id} service={service} />
      ))}
    </div>
  );
}
