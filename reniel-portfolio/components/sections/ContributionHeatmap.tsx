import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { getContributions } from "@/lib/github/contributions";
import { site } from "@/data/site";
import { PanelGlow } from "@/components/ui/panel-glow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Heatmap } from "./Heatmap";

export async function ContributionHeatmap() {
  const result = await getContributions();
  const profile = `https://github.com/${site.githubUsername}`;

  return (
    <section aria-labelledby="activity-title" className="dark-panel glass-dark relative col-span-12 rounded-sm border border-graphite p-6 text-bone md:p-8">
      <PanelGlow tone="dark" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel className="text-silver">GitHub activity / Last 12 months</SectionLabel>
          <h2 id="activity-title" className="mt-2 font-display text-4xl leading-none md:text-5xl">
            {result.status === "ok" ? `${result.total.toLocaleString("en-US")} contributions` : "Contribution activity"}
          </h2>
        </div>
        <a href={profile} target="_blank" rel="noopener noreferrer" className="label inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
          <GithubLogo size={18} aria-hidden />
          @{site.githubUsername}
        </a>
      </div>

      <div className="mt-6">
        {result.status === "ok" ? (
          <Heatmap weeks={result.weeks} />
        ) : (
          <p role="status" className="rounded-sm border border-dashed border-graphite p-5 text-sm text-silver">
            The contribution graph isn&rsquo;t available right now. {result.message}
          </p>
        )}
      </div>
      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-silver">
        Counts come straight from GitHub&rsquo;s contribution calendar. They include commits, pull requests, issues, and reviews, so they won&rsquo;t match every commit one might expect. Private activity appears only if the profile setting and API allow it.
      </p>
    </section>
  );
}