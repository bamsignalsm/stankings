import { createClient } from "@/lib/supabase/server";
import { bootstrapSuperAdmin } from "@/lib/supabase/admin";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { ensurePassportForUser } from "@/lib/passport/person";
import { resolvePostAuthDestination } from "@/lib/passport/routing";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");

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
          // Service role not configured yet
        }

        let recoveryRequired = false;
        try {
          const passport = await ensurePassportForUser({
            userId: user.id,
            email: user.email,
            fullName: user.user_metadata?.full_name ?? null,
          });
          recoveryRequired = Boolean(passport.recoveryRequired);
        } catch {
          // Passport ensure best-effort on callback
        }

        if (!user.email_confirmed_at) {
          return NextResponse.redirect(
            `${origin}/auth/verify-email?next=${encodeURIComponent(nextParam ?? "/library")}`
          );
        }

        if (recoveryRequired) {
          return NextResponse.redirect(`${origin}/passport/recovery`);
        }

        const destination = await resolvePostAuthDestination(user.id, {
          email: user.email,
          next: nextParam,
        });

        return NextResponse.redirect(`${origin}${destination}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}${USER_LOGIN_PATH}?error=auth`);
}
