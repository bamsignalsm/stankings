import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CareerPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Stankings Group. All recruitment is published centrally by the Group.",
};

export default async function CareersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as CareerPost[];

  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            Stankings Group Careers
          </p>
          <h1 className="mb-6 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Build institutions that empower generations
          </h1>
          <p className="text-lg text-cream-muted">
            All recruitment across the Stankings ecosystem is published centrally
            by Stankings Group. Individual companies do not post roles
            independently.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          {posts.length === 0 ? (
            <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-center">
              <p className="text-cream-muted">
                No open positions at this time. Check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/careers/${post.slug}`}
                  className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
                >
                  <p className="text-xs uppercase tracking-widest text-gold">
                    {post.company_area}
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-semibold text-cream">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-cream-muted">
                    {post.location} · {post.employment_type}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
