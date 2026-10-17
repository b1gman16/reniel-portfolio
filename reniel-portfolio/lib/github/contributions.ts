import "server-only";
import { REVALIDATE_SECONDS, getToken, getUsername, githubHeaders, isRateLimited } from "./client";
import type { ContributionDay, ContributionsResult } from "./types";

const QUERY = `
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel weekday } }
      }
    }
  }
}`;

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type RawDay = { date?: unknown; contributionCount?: unknown; contributionLevel?: unknown; weekday?: unknown };

function normalizeDay(d: RawDay): ContributionDay | null {
  if (
    typeof d.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
    typeof d.contributionCount !== "number" ||
    typeof d.weekday !== "number"
  ) {
    return null;
  }
  const level = typeof d.contributionLevel === "string" ? LEVELS[d.contributionLevel] : undefined;
  return {
    date: d.date,
    count: d.contributionCount,
    level: level ?? (d.contributionCount > 0 ? 1 : 0),
    weekday: d.weekday,
  };
}

export async function getContributions(): Promise<ContributionsResult> {
  if (!getToken()) {
    return {
      status: "no_token",
      message: "Contribution data needs a GITHUB_TOKEN on the server. See the README.",
    };
  }

  // UTC day boundaries keep the request (and cache key) stable within a day.
  const now = new Date();
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
  const from = new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...githubHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: getUsername(), from: from.toISOString(), to: to.toISOString() },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (isRateLimited(res)) {
      return { status: "rate_limited", message: "GitHub rate limit reached. Try again later." };
    }
    if (!res.ok) {
      return { status: "error", message: `GitHub responded with ${res.status}.` };
    }

    const json = (await res.json()) as {
      errors?: { type?: string; message?: string }[];
      data?: { user?: { contributionsCollection?: { contributionCalendar?: { totalContributions?: number; weeks?: { contributionDays?: RawDay[] }[] } } } | null };
    };

    if (json.errors?.length) {
      const limited = json.errors.some((e) => e.type === "RATE_LIMITED");
      return {
        status: limited ? "rate_limited" : "error",
        message: limited ? "GitHub rate limit reached. Try again later." : "GitHub returned a GraphQL error.",
      };
    }

    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal?.weeks) return { status: "error", message: "No contribution data returned." };

    const weeks = cal.weeks
      .map((w) => (w.contributionDays ?? []).map(normalizeDay).filter((d): d is ContributionDay => d !== null))
      .filter((w) => w.length > 0);

    if (weeks.length === 0) return { status: "error", message: "No contribution data returned." };

    return {
      status: "ok",
      total: typeof cal.totalContributions === "number" ? cal.totalContributions : 0,
      weeks,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return { status: "error", message: "Could not reach GitHub." };
  }
}
