import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CareerPost } from "@/lib/types";

export default async function AdminCareersPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("stankings_career_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (posts ?? []) as CareerPost[];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
            Career Posts
          </h1>
          <p className="text-cream-muted">
            All recruitment across the Group is published centrally from here.
          </p>
        </div>
        <Link
          href="/energy/careers/new"
          className="shrink-0 rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-light"
        >
          New role
        </Link>
      </div>

      <div className="space-y-3">
        {list.length === 0 && (
          <p className="text-cream-muted">No career posts yet.</p>
        )}
        {list.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gold-subtle bg-ink-muted p-4"
          >
            <div>
              <p className="font-medium text-cream">{post.title}</p>
              <p className="text-sm text-cream-muted">
                {post.company_area} · {post.location} · {post.employment_type}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase text-gold">{post.status}</span>
              <Link
                href={`/energy/careers/${post.id}/edit`}
                className="text-sm text-cream-muted hover:text-gold"
              >
                Edit
              </Link>
              <Link
                href={`/career/${post.slug}`}
                className="text-sm text-cream-muted hover:text-gold"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
