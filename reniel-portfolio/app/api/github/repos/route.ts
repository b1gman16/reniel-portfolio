import { NextResponse } from "next/server";
import { getRepositories } from "@/lib/github/repositories";
import { site } from "@/data/site";

export const revalidate = 1800;

export async function GET() {
  const result = await getRepositories({
    includeForks: site.github.includeForks,
    includeArchived: site.github.includeArchived,
    pinned: [...site.github.pinned],
  });
  const ok = result.status === "ok";
  return NextResponse.json(result, {
    status: ok ? 200 : 502,
    headers: { "Cache-Control": ok ? "public, s-maxage=1800, stale-while-revalidate=3600" : "no-store" },
  });
}
