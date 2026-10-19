import { ArrowSquareOut, GithubLogo, GitFork, Star } from "@phosphor-icons/react/dist/ssr";
import { LanguageIcon } from "@/lib/icons";
import type { Repo } from "@/lib/github/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function RepositoryCard({ repo }: { repo: Repo }) {
  return (
    // No blur here: the parent section is already glass, so inner cards just add a light tint.
    <article className="group flex flex-col justify-between gap-4 rounded-sm border border-line bg-ink/5 p-4 transition-colors hover:border-ink hover:bg-ink/10">
      <div>
        <div className="flex items-start justify-between gap-3">
          <p className="label flex items-center gap-1.5 text-muted">
            <LanguageIcon language={repo.language} />
            {repo.language ?? "Repository"}
          </p>
          <a href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`${repo.name} on GitHub`} title="View on GitHub" className="-m-2 p-2">
            <GithubLogo size={20} aria-hidden className="transition-transform group-hover:scale-110" />
          </a>
        </div>
        <h3 className="mt-3 break-words font-display text-2xl leading-none">{repo.name}</h3>
        {repo.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/75">{repo.description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
        <span className="flex items-center gap-1"><Star size={12} weight="fill" aria-hidden />{repo.stars}<span className="sr-only"> stars</span></span>
        {repo.forks > 0 && <span className="flex items-center gap-1"><GitFork size={12} aria-hidden />{repo.forks}<span className="sr-only"> forks</span></span>}
        {repo.updatedAt && <span>Updated {formatDate(repo.updatedAt)}</span>}
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${repo.name}`} title="Live demo" className="hover:text-ink">
            <ArrowSquareOut size={14} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}