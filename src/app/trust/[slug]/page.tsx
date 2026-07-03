import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContentSections,
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import { getTrustContent } from "@/lib/institutional/trust-content";
import { TRUST_CENTER_SECTIONS } from "@/lib/institutional/public-site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRUST_CENTER_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getTrustContent(slug);
  if (!content) return { title: "Trust Center" };
  return { title: content.title, description: content.sections[0]?.body };
}

export default async function TrustTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getTrustContent(slug);
  if (!content) notFound();

  return (
    <InstitutionalPageShell
      eyebrow="Trust Center"
      title={content.title}
      backHref="/trust"
      backLabel="Trust Center"
    >
      <ContentSections sections={content.sections} lastUpdated={content.lastUpdated} />
    </InstitutionalPageShell>
  );
}
