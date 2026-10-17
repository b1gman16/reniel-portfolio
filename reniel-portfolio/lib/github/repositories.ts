import "server-only";
import { REVALIDATE_SECONDS, getUsername, githubHeaders, isRateLimited } from "./client";
import type { Repo, ReposResult } from "./types";

const MAX_PAGES = 5; // 500 repos is plenty

type RawRepo = Record<string, unknown>;

function toRepo(r: RawRepo): Repo | null {
  if (typeof r.name !== "string" || typeof r.html_url !== "string") return null;
  return {
    name: r.name,
    fullName: typeof r.full_name === "string" ? r.full_name : r.name,
    description: typeof r.description === "string" ? r.description : null,
    language: typeof r.language === "string" ? r.language : null,
    stars: typeof r.stargazers_count === "number" ? r.stargazers_count : 0,
    forks: typeof r.forks_count === "number" ? r.forks_count : 0,
    updatedAt: typeof r.pushed_at === "string" ? r.pushed_at : String(r.updated_at ?? ""),
    url: r.html_url,
    homepage:
      typeof r.homepage === "string" && /^https?:\/\//.test(r.homepage) ? r.homepage : null,
    isFork: r.fork === true,
    isArchived: r.archived === true,
    visibility: typeof r.visibility === "string" ? r.visibility : "public",
  };
}

export async function getRepositories(opts: {
  includeForks?: boolean;
  includeArchived?: boolean;
  exclude?: string[];
  pinned?: string[];
} = {}): Promise<ReposResult> {
  const user = getUsername();
  const all: Repo[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&direction=desc&per_page=100&page=${page}`;
      const res = await fetch(url, {
        headers: githubHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (isRateLimited(res)) {
        return { status: "rate_limited", repos: [], message: "GitHub rate limit reached. Try again later." };
      }
      if (!res.ok) {
        return { status: "error", repos: [], message: `GitHub responded with ${res.status}.` };
      }
      const json: unknown = await res.json();
      if (!Array.isArray(json)) {
        return { status: "error", repos: [], message: "Unexpected GitHub response." };
      }
      for (const item of json) {
        const repo = toRepo(item as RawRepo);
        if (repo) all.push(repo);
      }
      if (json.length < 100) break;
    }
  } catch {
    return { status: "error", repos: [], message: "Could not reach GitHub." };
  }

  const exclude = new Set((opts.exclude ?? []).map((n) => n.toLowerCase()));
  const pinned = (opts.pinned ?? []).map((n) => n.toLowerCase());

  const repos = all
    .filter((r) => opts.includeForks || !r.isFork)
    .filter((r) => opts.includeArchived || !r.isArchived)
    .filter((r) => !exclude.has(r.name.toLowerCase()))
    .sort((a, b) => {
      const pa = pinned.indexOf(a.name.toLowerCase());
      const pb = pinned.indexOf(b.name.toLowerCase());
      if (pa !== -1 || pb !== -1) return (pa === -1 ? 999 : pa) - (pb === -1 ? 999 : pb);
      return b.updatedAt.localeCompare(a.updatedAt);
    });

  return { status: "ok", repos, totalPublic: all.length, fetchedAt: new Date().toISOString() };
}
