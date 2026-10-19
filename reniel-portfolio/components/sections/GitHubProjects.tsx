import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { RepositoryCard } from "@/components/projects/RepositoryCard";
import { PanelGlow } from "@/components/ui/panel-glow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { featuredProjects } from "@/data/featured-projects";
import { site } from "@/data/site";
import { getRepositories } from "@/lib/github/repositories";
import { revealDelay } from "@/lib/reveal";

export async function GitHubProjects() {
  const result = await getRepositories({
    includeForks: site.github.includeForks,
    includeArchived: site.github.includeArchived,
    pinned: [...site.github.pinned],
    exclude: featuredProjects.flatMap((p) => (p.repo ? [p.repo] : [])),
  });
  const profile = `https://github.com/${site.githubUsername}?tab=repositories`;

  return (
    <section
      data-reveal
      style={revealDelay(0)}
      aria-labelledby="repos-title"
      className="glass-light relative col-span-12 rounded-sm border border-line p-5 md:p-6 lg:col-span-8"
    >
      <PanelGlow />
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionLabel className="text-muted">From GitHub / Auto-updated</SectionLabel>
          <h2 id="repos-title" className="mt-2 font-display text-3xl leading-none md:text-4xl">Latest repositories</h2>
        </div>
        <a href={profile} target="_blank" rel="noopener noreferrer" className="label inline-flex min-h-11 shrink-0 items-center gap-1 underline underline-offset-4">
          View all <ArrowUpRight size={14} weight="bold" aria-hidden />
        </a>
      </div>

      <div className="mt-5">
        {result.status !== "ok" ? (
          <p className="rounded-sm border border-dashed border-silver p-5 text-sm text-muted" role="status">
            Repositories are unavailable right now. {result.message}{" "}
            <a href={profile} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">Browse them on GitHub.</a>
          </p>
        ) : result.repos.length === 0 ? (
          <p className="rounded-sm border border-dashed border-silver p-5 text-sm text-muted">No public repositories to show yet.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {result.repos.slice(0, site.github.maxVisible).map((r) => (
              <RepositoryCard key={r.fullName} repo={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}