export type GithubStats = {
  publicRepos: number;
  followers: number;
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
