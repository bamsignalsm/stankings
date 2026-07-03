import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GovernanceChapter1ArchitecturePanel } from "@/components/governance-code/GovernanceChapter1ArchitecturePanel";
import { GovernanceChapterShellPanel } from "@/components/governance-code/GovernanceChapterShellPanel";
import { MemberBanner } from "@/components/MemberBanner";
import { BOOK_I_CHAPTER_01_ID } from "@/lib/governance-code/books/book-i/chapters/chapter-01-architecture";
import { getBookIChapter } from "@/lib/governance-code/books/book-i/chapters";

type Props = { params: Promise<{ chapterId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getBookIChapter(chapterId);
  if (!chapter) return { title: "Book I Chapter" };
  return {
    title: `${chapter.chapter} — ${chapter.title}`,
    description: chapter.purpose,
    robots: { index: false, follow: false },
  };
}

export async function generateStaticParams() {
  const { BOOK_I_CHAPTERS } = await import("@/lib/governance-code/books/book-i/chapters");
  return BOOK_I_CHAPTERS.map((c) => ({ chapterId: c.id }));
}

export default async function BookIChapterPage({ params }: Props) {
  const { chapterId } = await params;
  const chapter = getBookIChapter(chapterId);
  if (!chapter) notFound();

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
      {chapterId === BOOK_I_CHAPTER_01_ID && chapter.status === "architecture_review" ? (
        <GovernanceChapter1ArchitecturePanel />
      ) : (
        <GovernanceChapterShellPanel chapter={chapter} />
      )}
    </div>
  );
}
