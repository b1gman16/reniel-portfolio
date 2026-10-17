export type Repo = {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
  homepage: string | null;
  isFork: boolean;
  isArchived: boolean;
  visibility: string;
};

export type ReposResult =
  | { status: "ok"; repos: Repo[]; totalPublic: number; fetchedAt: string }
  | { status: "rate_limited" | "error"; repos: []; message: string };

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  weekday: number; // 0 = Sunday
};

export type ContributionsResult =
  | { status: "ok"; total: number; weeks: ContributionDay[][]; fetchedAt: string }
  | { status: "no_token" | "rate_limited" | "error"; message: string };
