import { createClient } from "@/lib/supabase/server";

export async function MemberBanner() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className="border-b border-gold-subtle bg-ink-muted">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm">
        <p className="text-cream-muted">
          Member access ·{" "}
          <span className="text-cream">{user.email}</span>
        </p>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="text-gold transition hover:text-gold-light"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
