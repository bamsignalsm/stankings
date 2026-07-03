import Link from "next/link";
import type { ReactNode } from "react";

interface InstitutionalPageShellProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function InstitutionalPageShell({
  eyebrow,
  title,
  description,
  children,
  backHref,
  backLabel = "Back",
}: InstitutionalPageShellProps) {
  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          {backHref ? (
            <Link
              href={backHref}
              className="mb-6 inline-block text-sm text-gold transition hover:text-gold-light"
            >
              ← {backLabel}
            </Link>
          ) : null}
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-lg leading-relaxed text-cream-muted">{description}</p>
          ) : null}
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">{children}</div>
      </section>
    </div>
  );
}

interface InstitutionalCardGridProps {
  items: {
    href: string;
    title: string;
    summary: string;
    external?: boolean;
  }[];
}

export function InstitutionalCardGrid({ items }: InstitutionalCardGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) =>
        item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
          >
            <h2 className="font-serif text-xl font-semibold text-cream">{item.title}</h2>
            <p className="mt-2 text-sm text-cream-muted">{item.summary}</p>
            <p className="mt-3 text-xs text-gold">External ↗</p>
          </a>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
          >
            <h2 className="font-serif text-xl font-semibold text-cream">{item.title}</h2>
            <p className="mt-2 text-sm text-cream-muted">{item.summary}</p>
          </Link>
        ),
      )}
    </div>
  );
}

interface ContentSectionsProps {
  sections: { heading: string; body: string }[];
  lastUpdated?: string;
}

export function ContentSections({ sections, lastUpdated }: ContentSectionsProps) {
  return (
    <div className="space-y-8">
      {lastUpdated ? (
        <p className="text-xs uppercase tracking-widest text-cream-muted">
          Last updated {lastUpdated}
        </p>
      ) : null}
      {sections.map((section) => (
        <article key={section.heading}>
          <h2 className="mb-3 font-serif text-2xl font-semibold text-cream">
            {section.heading}
          </h2>
          <p className="leading-relaxed text-cream-muted">{section.body}</p>
        </article>
      ))}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    operational: "bg-success/30 text-cream border-success/50",
    maintenance: "bg-gold/10 text-gold border-gold/30",
    incident: "bg-danger/30 text-cream border-danger/50",
    resolved: "bg-info/30 text-cream border-info/50",
    investigating: "bg-danger/30 text-cream border-danger/50",
    identified: "bg-gold/10 text-gold border-gold/30",
    monitoring: "bg-info/30 text-cream border-info/50",
  };
  const cls = styles[status] ?? "bg-ink-muted text-cream-muted border-gold-subtle";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}
    >
      {status}
    </span>
  );
}
