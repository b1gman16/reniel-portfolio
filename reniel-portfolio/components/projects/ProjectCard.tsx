import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PanelGlow } from "@/components/ui/panel-glow";
import type { FeaturedProject } from "@/data/featured-projects";

// .img-slot flexes to fill leftover height on desktop (see globals.css), so the text never overflows.
function ImageSlot({ project, dark }: { project: FeaturedProject; dark: boolean }) {
  if (project.image) {
    return (
      <div className="img-slot relative aspect-[16/9] overflow-hidden rounded-sm">
        <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width:1024px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    );
  }
  return (
    <div className={`img-slot flex aspect-[16/9] items-center justify-center rounded-sm border border-dashed p-4 text-center ${dark ? "border-graphite" : "border-silver"}`}>
      <p className={`label ${dark ? "text-silver" : "text-muted"}`}>Add image<br />{project.imageHint}</p>
    </div>
  );
}

export function ProjectCard({ project, tone, className = "" }: { project: FeaturedProject; tone: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <article className={`group relative flex flex-col gap-4 rounded-sm border p-5 md:p-6 lg:min-h-0 ${dark ? "dark-panel glass-dark border-graphite text-bone" : "glass-light border-line"} ${className}`}>
      <PanelGlow tone={tone} />
      <ImageSlot project={project} dark={dark} />
      <div>
        <p className={`label ${dark ? "text-silver" : "text-muted"}`}>{project.label}</p>
        <h3 className="mt-2 font-display text-3xl leading-[0.95] md:text-4xl">{project.title}</h3>
        <p className={`mt-3 max-w-xl text-sm leading-relaxed ${dark ? "text-bone/80" : "text-ink/80"}`}>{project.description}</p>
      </div>

      {project.metrics && (
        <dl className="grid grid-cols-2 gap-px border border-graphite bg-graphite/70">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-obsidian/60 p-3">
              <dd className="font-display text-2xl">{m.value}</dd>
              <dt className="label mt-0.5 text-[10px] leading-snug text-silver">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <ul className="flex flex-wrap gap-1.5">
        {project.areas.map((a) => (
          <li key={a} className={`label rounded-sm border px-2 py-1 text-[10px] normal-case tracking-wide ${dark ? "border-graphite text-silver" : "border-line text-muted"}`}>{a}</li>
        ))}
      </ul>

      <p className={`text-xs leading-relaxed ${dark ? "text-silver" : "text-muted"}`}>{project.note}</p>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-4">
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