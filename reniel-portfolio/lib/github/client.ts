import "server-only";

export const REVALIDATE_SECONDS = 30 * 60;

export function getUsername(): string {
  return process.env.GITHUB_USERNAME || "b1gman16";
}

export function getToken(): string | undefined {
  return process.env.GITHUB_TOKEN || undefined;
}

export function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function isRateLimited(res: Response): boolean {
  return (
    (res.status === 403 || res.status === 429) &&
    (res.headers.get("x-ratelimit-remaining") === "0" || res.status === 429)
  );
}
