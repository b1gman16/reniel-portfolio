import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PanelGlow } from "@/components/ui/panel-glow";
import type { FeaturedProject } from "@/data/featured-projects";

function ImageSlot({ project, dark }: { project: FeaturedProject; dark: boolean }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
        <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width:1024px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    );
  }
  return (
    <div className={`flex aspect-[16/10] items-center justify-center rounded-sm border border-dashed p-4 text-center ${dark ? "border-graphite" : "border-silver"}`}>
      <p className={`label ${dark ? "text-silver" : "text-muted"}`}>Add image<br />{project.imageHint}</p>
    </div>
  );
}

export function ProjectCard({ project, tone, className = "" }: { project: FeaturedProject; tone: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <article className={`group relative flex flex-col gap-6 rounded-sm border p-6 md:p-8 ${dark ? "dark-panel glass-dark border-graphite text-bone" : "glass-light border-line"} ${className}`}>
      <PanelGlow tone={tone} />
      <ImageSlot project={project} dark={dark} />
      <div>
        <p className={`label ${dark ? "text-silver" : "text-muted"}`}>{project.label}</p>
        <h3 className="mt-3 font-display text-4xl leading-[0.95] md:text-5xl">{project.title}</h3>
        <p className={`mt-4 max-w-xl text-[15px] leading-relaxed ${dark ? "text-bone/80" : "text-ink/80"}`}>{project.description}</p>
      </div>

      {project.metrics && (
        <dl className="grid grid-cols-2 gap-px border border-graphite bg-graphite/70">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-obsidian/60 p-4">
              <dd className="font-display text-3xl">{m.value}</dd>
              <dt className="label mt-1 text-[10px] leading-snug text-silver">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <ul className="flex flex-wrap gap-2">
        {project.areas.map((a) => (
          <li key={a} className={`label rounded-sm border px-2 py-1 text-[10px] normal-case tracking-wide ${dark ? "border-graphite text-silver" : "border-line text-muted"}`}>{a}</li>
        ))}
      </ul>

      <p className={`text-xs leading-relaxed ${dark ? "text-silver" : "text-muted"}`}>{project.note}</p>

      {project.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-4">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group/link inline-flex min-h-9 items-center gap-1 text-sm underline underline-offset-4">
              {l.label}
              <ArrowUpRight size={14} weight="bold" aria-hidden className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}