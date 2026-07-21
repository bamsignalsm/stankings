import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CareerPost } from "@/lib/types";
import { EmptyState } from "@/components/institutional/InstitutionalPageShell";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Careers at Stankings Legacy Ltd — culture, benefits, hiring philosophy, and open positions.",
  path: "/career",
});

export default async function CareersPage() {
  let posts: CareerPost[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stankings_career_posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    posts = (data ?? []) as CareerPost[];
  } catch {
    posts = [];
  }

  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-xs tracking-[0.35em] text-gold uppercase">
            Stankings Legacy Ltd Careers
          </p>
          <h1 className="mb-6 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Build institutions that empower generations
          </h1>
          <p className="text-lg text-cream-muted">
            All recruitment across the Stankings Legacy Ltd portfolio is published centrally.
            Individual products do not post roles independently.
          </p>
        </div>
      </section>

      <section className="border-b border-gold-subtle py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-3">
          {[
            {
              title: "Culture",
              body: "Stewardship over personality. Standards over shortcuts. Long-term thinking in daily work.",
            },
            {
              title: "Benefits",
              body: "Competitive compensation, meaningful work, and the opportunity to build institutions — not disposable products.",
            },
            {
              title: "Hiring philosophy",
              body: "We hire for character, craft, and custodianship. Leadership appointments follow stewardship questions, not charisma alone.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
              <h2 className="font-serif text-xl text-cream">{item.title}</h2>
              <p className="mt-2 text-sm text-cream-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 font-serif text-2xl text-cream">Open positions</h2>
          {posts.length === 0 ? (
            <EmptyState
              title="No open positions at this time"
              body={`Check back soon, or send a general expression of interest to ${CONTACTS.careers}.`}
            />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/career/${post.slug}`}
                  className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
                >
                  <p className="text-xs tracking-widest text-gold uppercase">{post.company_area}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-cream">{post.title}</h3>
                  <p className="mt-2 text-sm text-cream-muted">
                    {post.location} · {post.employment_type}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-2 font-serif text-xl text-cream">Application process</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-cream-muted">
              <li>Review the role and apply through the published posting.</li>
              <li>Applications are reviewed centrally by Stankings Legacy Ltd.</li>
              <li>Shortlisted candidates are contacted for interviews.</li>
              <li>Offers reflect stewardship expectations for the role.</li>
            </ol>
            <p className="mt-4 text-sm text-cream-muted">
              General enquiries:{" "}
              <a href={`mailto:${CONTACTS.careers}`} className="text-gold hover:text-gold-light">
                {CONTACTS.careers}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
