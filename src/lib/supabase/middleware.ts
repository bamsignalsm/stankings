import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_AUTH_PATH,
  ENERGY_HOME_PATH,
  USER_LOGIN_PATH,
  USER_REGISTER_PATH,
  isEnergyPanelPath,
  resolveEnergyNext,
} from "@/lib/auth-paths";
import { isProtectedPath } from "@/lib/auth";

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
      const url = request.nextUrl.clone();
      url.pathname = "/auth/unauthorized";
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
    const member = await getMemberStatus(supabase, user.id);
    const next = request.nextUrl.searchParams.get("next") || "/library";
    const url = request.nextUrl.clone();

    if (member?.role === "super_admin" && member?.status === "approved") {
      url.pathname = ENERGY_HOME_PATH;
    } else if (member?.status === "approved") {
      url.pathname = next;
    } else {
      url.pathname = "/auth/pending-approval";
    }
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (
    user?.email_confirmed_at &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    const member = await getMemberStatus(supabase, user.id);
    const next = request.nextUrl.searchParams.get("next") || "/library";
    const url = request.nextUrl.clone();
    url.pathname =
      member?.role === "super_admin" && member?.status === "approved"
        ? ENERGY_HOME_PATH
        : member?.status === "approved"
          ? next
          : "/auth/pending-approval";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
