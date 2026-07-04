import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";
import { getSupportQueue, SUPPORT_QUEUES } from "@/lib/authority/support";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ product: string }>;
}

export async function generateStaticParams() {
  return SUPPORT_QUEUES.map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product } = await params;
  const p = getSupportQueue(product);
  if (!p) return { title: "Support Center" };
  return buildPageMetadata({
    title: `${p.name} Support`,
    description: p.description,
    path: `/support/${product}`,
  });
}

export default async function ProductSupportPage({ params }: PageProps) {
  const { product } = await params;
  const p = getSupportQueue(product);
  if (!p) notFound();

  return (
    <InstitutionalPageShell
      eyebrow="Support Center"
      title={`${p.name} Support`}
      description={p.description}
      backHref="/support"
      backLabel="Support Center"
    >
      <div className="space-y-8">
        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <p className="text-xs tracking-widest text-gold uppercase">Queue contact</p>
          <a
            href={`mailto:${p.email}`}
            className="mt-2 block font-serif text-2xl text-cream hover:text-gold"
          >
            {p.email}
          </a>
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-gold hover:text-gold-light"
            >
              Visit {p.domain} ↗
            </a>
          ) : null}
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl text-cream">Common topics</h2>
          <ul className="space-y-2">
            {p.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-cream-muted">
                <span className="text-gold">◆</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-cream-muted">
          Institutional policies:{" "}
          <Link href="/trust" className="text-gold">
            Trust
          </Link>
          ,{" "}
          <Link href="/legal" className="text-gold">
            Legal
          </Link>
          ,{" "}
          <Link href="/security" className="text-gold">
            Security
          </Link>
          .
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
