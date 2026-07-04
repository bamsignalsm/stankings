import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorityArticlePage } from "@/components/authority/AuthorityHub";
import { COMPLIANCE_SECTIONS, getComplianceArticle } from "@/lib/authority/compliance";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPLIANCE_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getComplianceArticle(slug);
  if (!article) return { title: "Compliance Center" };
  return buildPageMetadata({
    title: article.title,
    description: article.sections[0]?.body ?? article.title,
    path: `/compliance/${slug}`,
  });
}

export default async function ComplianceTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getComplianceArticle(slug);
  if (!article) notFound();

  return (
    <AuthorityArticlePage
      eyebrow="Compliance Center"
      backHref="/compliance"
      backLabel="Compliance Center"
      article={article}
    />
  );
}
