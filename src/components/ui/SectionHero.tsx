import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

export function SectionHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <section className="border-b border-gold-subtle py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : null}
        <p className="mb-4 text-xs font-medium tracking-[0.35em] text-gold uppercase">{eyebrow}</p>
        <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">{title}</h1>
        {description ? (
          <p className="max-w-3xl text-lg leading-relaxed text-cream-muted">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
