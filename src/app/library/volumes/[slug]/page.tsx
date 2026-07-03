import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVolumeBySlug } from "@/lib/library";
import { MemberBanner } from "@/components/MemberBanner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const volume = getVolumeBySlug(slug);
  return {
    title: volume ? `${volume.title} — ${volume.subtitle}` : "Volume",
  };
}

export default async function VolumePage({ params }: PageProps) {
  const { slug } = await params;
  const volume = getVolumeBySlug(slug);

  if (!volume || slug === "constitution" || slug === "first-principles") notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/library"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← The Stankings Library
          </Link>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            {volume.subtitle}
          </p>
          <h1 className="mb-3 font-serif text-4xl font-semibold text-cream">
            {volume.title}
          </h1>
          <p className="mb-2 text-lg italic text-gold/90">{volume.question}</p>
          <p className="text-cream-muted">{volume.purpose}</p>
          {volume.openingQuote && (
            <blockquote className="mt-6 border-l-2 border-gold/40 pl-4 font-serif text-lg italic text-cream/90">
              &ldquo;{volume.openingQuote}&rdquo;
            </blockquote>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 rounded-lg border border-amber-400/30 bg-amber-400/10 p-6">
          <p className="text-sm text-amber-200">
            This volume is not yet written to Library standards. Content will
            appear here as each chapter meets Founder&apos;s Resolution No. 001.
          </p>
        </div>

        <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
          This volume will contain
        </h2>
        <ul className="mb-10 space-y-2 border-l-2 border-gold/30 pl-6">
          {volume.contains.map((item) => (
            <li key={item} className="text-cream-muted">
              {item}
            </li>
          ))}
        </ul>

        {slug === "charter" && (
          <p className="text-sm text-cream-muted">
            Note: Institutional structure material from Draft Zero (formerly
            Constitution Chapter Two) will be rewritten for this volume.{" "}
            <Link href="/library/archive/draft-zero" className="text-gold">
              View Draft Zero archive
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
