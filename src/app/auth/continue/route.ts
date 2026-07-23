import { createClient } from "@/lib/supabase/server";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { ensurePassportForUser } from "@/lib/passport/person";
import { resolvePostAuthDestination } from "@/lib/passport/routing";
import { NextResponse } from "next/server";

/**
 * Canonical post-auth continue — all login surfaces should land here
 * so capability routing is never skipped (O-5).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const nextParam = searchParams.get("next");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(`${origin}${USER_LOGIN_PATH}`);
  }

  if (!user.email_confirmed_at) {
    return NextResponse.redirect(
      `${origin}/auth/verify-email?next=${encodeURIComponent(nextParam ?? "/")}`
    );
  }

  const passport = await ensurePassportForUser({
    userId: user.id,
    email: user.email,
    fullName: user.user_metadata?.full_name ?? null,
  });

  if (passport.recoveryRequired) {
    return NextResponse.redirect(`${origin}/passport/recovery`);
  }

  const destination = await resolvePostAuthDestination(user.id, {
    email: user.email,
    next: nextParam,
  });

  return NextResponse.redirect(`${origin}${destination}`);
}
