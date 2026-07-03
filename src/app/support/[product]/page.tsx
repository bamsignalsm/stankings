import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import { getSupportProduct, SUPPORT_PRODUCTS } from "@/lib/institutional/public-site";

interface PageProps {
  params: Promise<{ product: string }>;
}

export async function generateStaticParams() {
  return SUPPORT_PRODUCTS.map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product } = await params;
  const p = getSupportProduct(product);
  if (!p) return { title: "Support Center" };
  return { title: `${p.name} Support`, description: p.description };
}

export default async function ProductSupportPage({ params }: PageProps) {
  const { product } = await params;
  const p = getSupportProduct(product);
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
          <p className="text-xs uppercase tracking-widest text-gold">Primary contact</p>
          <a
            href={`mailto:${p.supportEmail}`}
            className="mt-2 block font-serif text-2xl text-cream hover:text-gold"
          >
            {p.supportEmail}
          </a>
          {p.slug !== "general" ? (
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

        {p.slug === "general" ? (
          <p className="text-sm text-cream-muted">
            Product-specific issues should go to{" "}
            <Link href="/support/bamsignal" className="text-gold">BamSignal</Link>,{" "}
            <Link href="/support/yike" className="text-gold">Yike</Link>, or{" "}
            <Link href="/support/bayright" className="text-gold">BayRight</Link> support.
          </p>
        ) : (
          <p className="text-sm text-cream-muted">
            Institutional questions (governance, careers, media):{" "}
            <Link href="/support/general" className="text-gold">
              General Enquiries
            </Link>
          </p>
        )}
      </div>
    </InstitutionalPageShell>
  );
}
