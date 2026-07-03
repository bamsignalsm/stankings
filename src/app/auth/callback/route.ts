import { createClient } from "@/lib/supabase/server";
import { bootstrapSuperAdmin } from "@/lib/supabase/admin";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/library";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        try {
          await bootstrapSuperAdmin(
            user.id,
            user.email,
            user.user_metadata?.full_name
          );
        } catch {
          // Service role not configured yet — super admin must be set manually
        }
      }

      if (!user?.email_confirmed_at) {
        return NextResponse.redirect(
          `${origin}/auth/verify-email?next=${encodeURIComponent(next)}`
        );
      }

      const { data: member } = await supabase
        .from("stankings_members")
        .select("status, role")
        .eq("id", user!.id)
        .single();

      if (member?.role === "super_admin" && member?.status === "approved") {
        return NextResponse.redirect(`${origin}/energy`);
      }

      if (member?.status !== "approved") {
        return NextResponse.redirect(`${origin}/auth/pending-approval`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}${USER_LOGIN_PATH}?error=auth`);
}
