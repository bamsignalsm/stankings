import { NextResponse } from "next/server";
import { LAUNCH_PRODUCTS } from "@/lib/launch-war-room/products";

export const dynamic = "force-dynamic";

/** Read-only probe of external product health endpoints. Visibility only — no controls. */
export async function GET() {
  const results = await Promise.all(
    LAUNCH_PRODUCTS.filter((p) => p.healthUrl.startsWith("http")).map(async (product) => {
      const started = Date.now();
      try {
        const res = await fetch(product.healthUrl, {
          method: "GET",
          signal: AbortSignal.timeout(8000),
          cache: "no-store",
        });
        return {
          id: product.id,
          name: product.name,
          url: product.healthUrl,
          ok: res.ok,
          status: res.status,
          latencyMs: Date.now() - started,
        };
      } catch (e) {
        return {
          id: product.id,
          name: product.name,
          url: product.healthUrl,
          ok: false,
          status: 0,
          latencyMs: Date.now() - started,
          error: e instanceof Error ? e.message : "probe failed",
        };
      }
    }),
  );

  return NextResponse.json({
    probedAt: new Date().toISOString(),
    readOnly: true,
    products: results,
  });
}
