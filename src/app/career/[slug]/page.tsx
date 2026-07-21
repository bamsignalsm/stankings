import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentMember } from "@/lib/members";
import { ApplyForm } from "@/components/ApplyForm";
import type { CareerPost } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_posts")
    .select("title")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return { title: data?.title ? `${data.title} — Careers` : "Career" };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) notFound();
  const post = data as CareerPost;
  const member = await getCurrentMember();

  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/career"
            className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
          >
            ← All careers
          </Link>
          <p className="mb-2 text-xs uppercase tracking-widest text-gold">
            {post.company_area}
          </p>
          <h1 className="mb-3 font-serif text-4xl font-semibold text-cream">
            {post.title}
          </h1>
          <p className="text-cream-muted">
            {post.location} · {post.employment_type}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-cream">
              About the role
            </h2>
            <div className="space-y-4 whitespace-pre-wrap text-cream-muted">
              <p>{post.description}</p>
            </div>
            {post.requirements && (
              <>
                <h2 className="mb-4 mt-8 font-serif text-xl font-semibold text-cream">
                  Requirements
                </h2>
                <p className="whitespace-pre-wrap text-cream-muted">
                  {post.requirements}
                </p>
              </>
            )}
          </div>

          <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-6 font-serif text-xl font-semibold text-cream">
              Apply
            </h2>
            <ApplyForm
              postId={post.id}
              postTitle={post.title}
              defaultEmail={member?.email}
              defaultName={member?.full_name ?? undefined}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
