import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAppVersion, getBuildId, getPublicEnvStatus, isPublicEnvReady } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/health — liveness (no database)
 * GET /api/health?ready=1 — readiness (env + Supabase)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ready = searchParams.get("ready") === "1";

  const base = {
    status: "ok" as const,
    service: "stankings-hq",
    version: getAppVersion(),
    build: getBuildId(),
    timestamp: new Date().toISOString(),
  };

  if (!ready) {
    return NextResponse.json(base, { status: 200 });
  }

  const env = getPublicEnvStatus();
  if (!isPublicEnvReady()) {
    return NextResponse.json(
      {
        ...base,
        status: "degraded",
        ready: false,
        env,
        database: "skipped",
        detail: "Required public environment variables missing or placeholder",
      },
      { status: 503 },
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("stankings_members")
      .select("id", { head: true, count: "exact" });

    if (error) {
      return NextResponse.json(
        {
          ...base,
          status: "degraded",
          ready: false,
          env,
          database: "unreachable",
          detail: error.message,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ...base,
      ready: true,
      env,
      database: "connected",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown";
    return NextResponse.json(
      {
        ...base,
        status: "degraded",
        ready: false,
        env,
        database: "error",
        detail: message,
      },
      { status: 503 },
    );
  }
}
