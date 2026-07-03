import { NextResponse } from "next/server";
import { retrieveLexiconForAI } from "@/lib/lexicon-engine/queries";

/**
 * AI retrieval endpoint — authoritative Lexicon definitions (LS-002).
 *
 * GET /api/lexicon/retrieve?term=trust
 * GET /api/lexicon/retrieve?q=institutional+asset&limit=5
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") ?? undefined;
  const query = searchParams.get("q") ?? searchParams.get("query") ?? undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 10, 25) : 10;

  if (!term && !query) {
    return NextResponse.json(
      {
        error: "Provide ?term= or ?q= query parameter",
        standard: "LS-002",
        example: "/api/lexicon/retrieve?term=trust",
      },
      { status: 400 }
    );
  }

  const payload = await retrieveLexiconForAI({ term, query, limit });

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "X-Stankings-Standard": "LS-002",
    },
  });
}
