import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/library/:path*",
    "/constitution/:path*",
    "/documents/:path*",
    "/energy",
    "/energy/:path*",
    "/skl",
    "/skl/:path*",
    "/auth/login",
    "/auth/register",
    "/login",
    "/signup",
    "/auth/:path*",
  ],
};
