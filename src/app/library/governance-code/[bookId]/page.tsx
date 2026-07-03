import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GovernanceBookShellPanel } from "@/components/governance-code/GovernanceBookShellPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { getGovernanceBook } from "@/lib/governance-code";

type Props = { params: Promise<{ bookId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookId } = await params;
  const book = getGovernanceBook(bookId);
  if (!book) return { title: "Governance Code Book" };
  return {
    title: `${book.book} — ${book.title}`,
    description: book.overview,
    robots: { index: false, follow: false },
  };
}

export async function generateStaticParams() {
  const { GOVERNANCE_CODE_BOOKS } = await import("@/lib/governance-code");
  return GOVERNANCE_CODE_BOOKS.map((b) => ({ bookId: b.id }));
}

export default async function GovernanceCodeBookPage({ params }: Props) {
  const { bookId } = await params;
  const book = getGovernanceBook(bookId);
  if (!book) notFound();

  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Link href="/library/governance-code" className="text-sm text-cream-muted hover:text-gold">
            ← Governance Code Portal
          </Link>
        </div>
      </section>
      <GovernanceBookShellPanel book={book} />
    </div>
  );
}
