import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorityArticlePage } from "@/components/authority/AuthorityHub";
import { getSecurityArticle, SECURITY_SECTIONS } from "@/lib/authority/security";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SECURITY_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSecurityArticle(slug);
  if (!article) return { title: "Security Center" };
  return buildPageMetadata({
    title: article.title,
    description: article.sections[0]?.body ?? article.title,
    path: `/security/${slug}`,
  });
}

export default async function SecurityTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getSecurityArticle(slug);
  if (!article) notFound();

  return (
    <AuthorityArticlePage
      eyebrow="Security Center"
      backHref="/security"
      backLabel="Security Center"
      article={article}
    />
  );
}
