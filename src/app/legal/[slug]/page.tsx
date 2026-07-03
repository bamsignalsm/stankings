import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ContentSections,
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import { getLegalContent } from "@/lib/institutional/legal-content";
import { getLegalDocument, LEGAL_DOCUMENTS } from "@/lib/institutional/public-site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEGAL_DOCUMENTS.filter((d) => !d.externalUrl).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) return { title: "Legal Center" };
  return { title: doc.title, description: doc.summary };
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) notFound();

  if (doc.externalUrl) {
    return (
      <InstitutionalPageShell
        eyebrow="Legal Center"
        title={doc.title}
        description={doc.summary}
        backHref="/legal"
        backLabel="Legal Center"
      >
        <p className="text-cream-muted">
          This policy is hosted on the product domain.{" "}
          <a href={doc.externalUrl} className="text-gold hover:text-gold-light">
            Open {doc.title} ↗
          </a>
        </p>
      </InstitutionalPageShell>
    );
  }

  const content = getLegalContent(slug);
  if (!content) notFound();

  return (
    <InstitutionalPageShell
      eyebrow="Legal Center"
      title={content.title}
      backHref="/legal"
      backLabel="Legal Center"
    >
      <ContentSections sections={content.sections} lastUpdated={content.lastUpdated} />
      <p className="mt-12 text-sm text-cream-muted">
        <Link href="/trust/privacy-principles" className="text-gold hover:text-gold-light">
          Privacy Principles →
        </Link>
      </p>
    </InstitutionalPageShell>
  );
}
