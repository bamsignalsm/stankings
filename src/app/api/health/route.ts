import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/health — liveness
 * GET /api/health?ready=1 — readiness (includes Supabase connectivity)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ready = searchParams.get("ready") === "1";

  const base = {
    status: "ok" as const,
    service: "stankings-hq",
    version: process.env.npm_package_version ?? "0.1.0",
    timestamp: new Date().toISOString(),
  };

  if (!ready) {
    return NextResponse.json(base, { status: 200 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("stankings_members").select("id", { head: true, count: "exact" });
    if (error) {
      return NextResponse.json(
        { ...base, status: "degraded", ready: false, database: "unreachable", detail: error.message },
        { status: 503 },
      );
    }
    return NextResponse.json({ ...base, ready: true, database: "connected" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown";
    return NextResponse.json(
      { ...base, status: "degraded", ready: false, database: "error", detail: message },
      { status: 503 },
    );
  }
}
