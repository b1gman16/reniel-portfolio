import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import TagList from "@/components/TagList";
import RevealClip from "@/components/RevealClip";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Reniel Tejones`,
    description: project.oneLiner,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      {/* HEADER */}
      <div className="grain relative mx-auto max-w-6xl px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-16">
        <span
          className="ghost-numeral pointer-events-none absolute -top-4 right-4 hidden select-none text-[13rem] md:top-0 md:block md:text-[16rem]"
          aria-hidden
        >
          {project.index}
        </span>

        <div className="relative grid gap-8 md:grid-cols-12">
          <div className="hidden md:col-span-1 md:flex md:items-start md:justify-center">
            <span className="label-vertical">{project.year}</span>
          </div>

          <div className="md:col-span-11">
            <Link href="/work" className="underline-grow pb-1 text-sm text-mid">
              ← All work
            </Link>

            <div className="mt-10">
              <span className="text-sm text-faint">{project.index}</span>
              <h1 className="mt-3 font-display text-5xl italic leading-[1.02] md:text-7xl">
                {project.name}
              </h1>
              <TagList tags={project.tags} accent={project.accent} className="mt-5" />
              <p className="mt-6 max-w-lg text-lg text-mid">{project.oneLiner}</p>
            </div>

            <div className="meta-row mt-14 grid gap-8 border-t hairline pt-6 sm:grid-cols-2">
              <div>
                <p className="meta-label">ROLE</p>
                <p className="meta-values mt-2">{project.role}</p>
              </div>
              <div>
                <p className="meta-label">STACK</p>
                <p className="meta-values mt-2">{project.stack.join(" / ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <RevealClip className="aspect-[16/9] w-full overflow-hidden">
          <div
            data-cursor={project.name}
            className={`h-full w-full ${project.slug === "hallguard" ? "halftone" : ""}`}
          >
            <ProjectVisual variant={project.visual} accent={project.accent} />
          </div>
        </RevealClip>
      </div>

      {/* SECTIONS */}
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-16 md:gap-20">
          {project.sections.map((section, i) => (
            <Reveal key={section.heading}>
              <div
                className="grid gap-4 border-t-2 pt-8 md:grid-cols-12 md:gap-10"
                style={{ borderColor: project.accent }}
              >
                <h2 className="font-display text-2xl italic md:col-span-4 md:text-3xl">
                  <span className="mr-2 not-italic text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4 md:col-span-7 md:col-start-6">
                  {section.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-mid">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* NEXT PROJECT */}
      <div className="border-t hairline">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex max-w-6xl flex-col gap-2 px-6 py-16 md:px-10 md:py-24"
        >
          <span className="text-sm text-faint">Next project</span>
          <span className="font-display text-4xl transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
            {next.name} →
          </span>
        </Link>
      </div>
    </article>
  );
}