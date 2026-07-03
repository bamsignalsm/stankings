import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GovernancePartShellPanel } from "@/components/governance-code/GovernancePartShellPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { getBookIPart } from "@/lib/governance-code/books/book-i/parts";

type Props = { params: Promise<{ partId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partId } = await params;
  const part = getBookIPart(partId);
  if (!part) return { title: "Book I Part" };
  return {
    title: `${part.part} — ${part.title}`,
    description: part.subtitle,
    robots: { index: false, follow: false },
  };
}

export async function generateStaticParams() {
  const { BOOK_I_PARTS } = await import("@/lib/governance-code/books/book-i/parts");
  return BOOK_I_PARTS.map((p) => ({ partId: p.id }));
}

export default async function BookIPartPage({ params }: Props) {
  const { partId } = await params;
  const part = getBookIPart(partId);
  if (!part) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Link
            href="/library/governance-code/book-i"
            className="text-sm text-cream-muted hover:text-gold"
          >
            ← Book I — Governance Bodies
          </Link>
        </div>
      </section>
      <GovernancePartShellPanel part={part} />
    </div>
  );
}
