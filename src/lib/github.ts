export type GithubStats = {
  publicRepos: number;
  followers: number;
};

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GithubContributions = {
  days: ContributionDay[];
  totalLastYear: number;
};

const GITHUB_USERNAME = "therafiniac";

// Server-side fetch, revalidated hourly (Next.js data cache) — real data,
// but not hammering GitHub's unauthenticated rate limit (60 req/hr/IP) on
// every request. Fails silently to null so a GitHub outage never breaks
// the page; the hero just omits the live stat.
export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (typeof data.public_repos !== "number") return null;

    return {
      publicRepos: data.public_repos,
      followers: typeof data.followers === "number" ? data.followers : 0,
    };
  } catch {
    return null;
  }
}

function isContributionDay(value: unknown): value is ContributionDay {
  const day = value as ContributionDay;
  return (
    typeof value === "object" &&
    value !== null &&
    typeof day.date === "string" &&
    typeof day.count === "number" &&
    typeof day.level === "number"
  );
}

// Real, verifiable activity data (see AGENTS.md: every claim on this site
// has to be interview-defensible) — not GitHub's own official API, which
// has no unauthenticated endpoint for contribution history (the real one
// needs a GraphQL token this site has no server-side secret for). This is
// the same public, unauthenticated, widely-used community mirror of
// github.com/users/{user}/contributions that similar "GitHub activity"
// widgets rely on elsewhere; same fail-silently-to-null contract as
// getGithubStats above if it's ever unreachable or changes shape.
export async function getGithubContributions(): Promise<GithubContributions | null> {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data.contributions)) return null;

    const days = data.contributions.filter(isContributionDay);
    const totalLastYear = data.total?.lastYear;
    if (days.length === 0 || typeof totalLastYear !== "number") return null;

    return { days, totalLastYear };
  } catch {
    return null;
  }
}
