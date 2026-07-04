import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AuthorityArticlePage } from "@/components/authority/AuthorityHub";
import { getLegalArticle, LEGAL_SECTIONS } from "@/lib/authority/legal";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEGAL_SECTIONS.filter((s) => s.href.startsWith("/legal/")).map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLegalArticle(slug);
  if (!article) return { title: "Legal Center" };
  return buildPageMetadata({
    title: article.title,
    description: article.sections[0]?.body ?? article.title,
    path: `/legal/${slug}`,
  });
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "compliance") {
    redirect("/compliance");
  }
  const article = getLegalArticle(slug);
  if (!article) notFound();

  return (
    <AuthorityArticlePage
      eyebrow="Legal Center"
      backHref="/legal"
      backLabel="Legal Center"
      article={article}
    />
  );
}
