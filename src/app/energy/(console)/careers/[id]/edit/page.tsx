import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCareerPost } from "../../../actions";
import { CareerPostForm } from "@/components/energy/CareerPostForm";
import type { CareerPost } from "@/lib/types";

export default async function EditCareerPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const post = data as CareerPost;

  const boundAction = updateCareerPost.bind(null, post.id);

  return (
    <div>
      <Link
        href="/energy/careers"
        className="mb-6 inline-block text-sm text-cream-muted hover:text-gold"
      >
        ← Back to careers
      </Link>
      <h1 className="mb-8 font-serif text-3xl font-semibold text-cream">
        Edit Career Post
      </h1>
      <CareerPostForm action={boundAction} post={post} />
    </div>
  );
}
