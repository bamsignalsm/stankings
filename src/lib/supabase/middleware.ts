import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_AUTH_PATH,
  USER_LOGIN_PATH,
  USER_REGISTER_PATH,
  isEnergyPanelPath,
  resolveEnergyNext,
} from "@/lib/auth-paths";
import { isProtectedPath } from "@/lib/auth";
import { resolvePostAuthDestination } from "@/lib/passport/capability-routing";

async function getMemberStatus(
  supabase: ReturnType<typeof createServerClient>,
  userId: string
) {
  const { data } = await supabase
    .from("stankings_members")
    .select("status, role")
    .eq("id", userId)
    .single();

  return data as { status: string; role: string } | null;
}

function isMemberAuthPage(pathname: string): boolean {
  return pathname === USER_LOGIN_PATH || pathname === USER_REGISTER_PATH;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (pathname === "/skl" || pathname.startsWith("/skl/")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = USER_LOGIN_PATH;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    const { data: emp } = await supabase
      .from("workforce_employees")
      .select("id, status, skl_access, locked_pending_investigation")
      .eq("user_id", user.id)
      .in("status", ["active", "invited"])
      .eq("skl_access", true)
      .limit(1)
      .maybeSingle();
    if (!emp || emp.locked_pending_investigation) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  if (isEnergyPanelPath(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_AUTH_PATH;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (!user.email_confirmed_at) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/verify-email";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    const member = await getMemberStatus(supabase, user.id);
    if (member?.role !== "super_admin" || member?.status !== "approved") {
      // Workers never enter Energy — route by capability
      const destination = await resolvePostAuthDestination(supabase, user.id, {
        email: user.email,
      });
      const url = request.nextUrl.clone();
      url.pathname =
        destination.startsWith("/energy") ? "/auth/unauthorized" : destination;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  if (pathname === ADMIN_AUTH_PATH) {
    if (user?.email_confirmed_at) {
      const member = await getMemberStatus(supabase, user.id);
      if (member?.role === "super_admin" && member?.status === "approved") {
        const next = resolveEnergyNext(
          request.nextUrl.searchParams.get("next")
        );
        const url = request.nextUrl.clone();
        url.pathname = next;
        url.search = "";
        return NextResponse.redirect(url);
      }
    }
  }

  if (isProtectedPath(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = USER_LOGIN_PATH;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (!user.email_confirmed_at) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/verify-email";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    const member = await getMemberStatus(supabase, user.id);
    if (member?.status === "rejected") {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/pending-approval";
      return NextResponse.redirect(url);
    }

    if (member?.status !== "approved") {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/pending-approval";
      return NextResponse.redirect(url);
    }
  }

  if (user?.email_confirmed_at && isMemberAuthPage(pathname)) {
    const next = request.nextUrl.searchParams.get("next");
    const destination = await resolvePostAuthDestination(supabase, user.id, {
      email: user.email,
      next,
    });
    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (
    user?.email_confirmed_at &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    const next = request.nextUrl.searchParams.get("next");
    const destination = await resolvePostAuthDestination(supabase, user.id, {
      email: user.email,
      next,
    });
    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
