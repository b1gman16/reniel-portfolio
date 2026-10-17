import { NextResponse } from "next/server";
import { getContributions } from "@/lib/github/contributions";


export const revalidate = 1800;

export async function GET() {
  const result = await getContributions();
  const ok = result.status === "ok";
  return NextResponse.json(result, {
    status: ok ? 200 : result.status === "no_token" ? 200 : 502,
    headers: { "Cache-Control": ok ? "public, s-maxage=1800, stale-while-revalidate=3600" : "no-store" },
  });
}
