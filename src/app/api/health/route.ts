import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildStandardHealthPayload } from "@/lib/deploy-metadata";
import { getAppVersion, getPublicEnvStatus, isPublicEnvReady } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/health — liveness (no database)
 * GET /api/health?ready=1 — readiness (env + Supabase)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ready = searchParams.get("ready") === "1";

  if (!ready) {
    return NextResponse.json(
      buildStandardHealthPayload({
        application: "stankings",
        version: getAppVersion(),
        status: "ok",
        database: "skipped",
      }),
      { status: 200 },
    );
  }

  const env = getPublicEnvStatus();
  if (!isPublicEnvReady()) {
    return NextResponse.json(
      buildStandardHealthPayload({
        application: "stankings",
        version: getAppVersion(),
        status: "degraded",
        database: "skipped",
        diagnostics: {
          ready: false,
          env,
          detail: "Required public environment variables missing or placeholder",
        },
      }),
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
        buildStandardHealthPayload({
          application: "stankings",
          version: getAppVersion(),
          status: "degraded",
          database: "unreachable",
          diagnostics: { ready: false, env, detail: error.message },
        }),
        { status: 503 },
      );
    }

    return NextResponse.json(
      buildStandardHealthPayload({
        application: "stankings",
        version: getAppVersion(),
        status: "ok",
        database: "connected",
        diagnostics: { ready: true, env },
      }),
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown";
    return NextResponse.json(
      buildStandardHealthPayload({
        application: "stankings",
        version: getAppVersion(),
        status: "degraded",
        database: "error",
        diagnostics: { ready: false, env, detail: message },
      }),
      { status: 503 },
    );
  }
}
