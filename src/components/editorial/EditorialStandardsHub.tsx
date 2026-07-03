import Link from "next/link";
import { EDW_FRAMEWORK } from "@/lib/frameworks/editorial-workflow-portal";

const EDITORIAL_STANDARDS = [
  {
    title: "Editorial Workflow",
    description:
      "Permanent process from vision through implementation, audit, and preservation.",
    href: "/library/editorial-standards/editorial-workflow",
    identifier: EDW_FRAMEWORK.identifier,
    status: "Published",
  },
  {
    title: "Stankings Library Publishing Standard",
    description:
      "SLPS-001 — structure, metadata, lifecycle, and presentation for every official publication.",
    href: "/library/editorial-standards/publishing-standard",
    identifier: "SLPS-001",
    status: "Published",
  },
  {
    title: "Publication Generator",
    description: "Scaffold new publications from SLPS-001 — metadata, structure, and status tracking.",
    href: "/library/editorial-standards/publishing-standard/generator",
    identifier: "PUB-ENGINE-001",
    status: "Published",
  },
  {
    title: "Foundational Charter Standard",
    description:
      "FC-001 — the governing introduction to every Book. Ten sections, writing rules, chapter approval tests.",
    href: "/library/editorial-standards/foundational-charter",
    identifier: "FC-001",
    status: "Published",
  },
  {
    title: "Chapter Education Standard",
    description:
      "CEF-001 — every chapter is governance and teaching. Reflection questions, practical scenarios, cross-references.",
    href: "/library/editorial-standards/chapter-education",
    identifier: "CEF-001",
    status: "Published",
  },
  {
    title: "Stankings Library Publishing System",
    description:
      "SLPS-CORE — the engine that enforces SLPS-001. Metadata, cross-references, review, search, and future AI.",
    href: "/library/editorial-standards/publishing-system",
    identifier: "SLPS-CORE",
    status: "Published",
  },
];

export function EditorialStandardsHub() {
  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            The Stankings Library
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Editorial Standards
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            How the Library is built — not what it contains, but how publications earn their place
            in institutional memory.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {EDITORIAL_STANDARDS.map((item) => (
            <article
              key={item.href}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs text-gold">{item.identifier}</p>
                <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                  {item.status}
                </span>
              </div>
              <h2 className="mb-2 font-serif text-xl text-cream">
                <Link href={item.href} className="hover:text-gold-light">
                  {item.title}
                </Link>
              </h2>
              <p className="mb-4 text-sm text-cream-muted">{item.description}</p>
              <Link href={item.href} className="text-sm text-gold hover:text-gold-light">
                Read standard →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library" className="text-gold hover:text-gold-light">
            ← The Library
          </Link>
          <Link href="/library/sessions" className="text-gold hover:text-gold-light">
            Session Records →
          </Link>
        </div>
      </div>
    </>
  );
}
