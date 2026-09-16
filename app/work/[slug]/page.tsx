import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";

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
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-16">
        <Link href="/work" className="underline-grow pb-1 text-sm text-mid">
          ← All work
        </Link>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <span className="text-sm text-faint">{project.index}</span>
            <h1 className="mt-3 font-display text-5xl leading-[1.02] md:text-7xl">
              {project.name}
            </h1>
            <p className="mt-5 text-sm uppercase tracking-wide text-accent">
              {project.tags.join(" · ")}
            </p>
            <p className="mt-6 max-w-lg text-lg text-mid">{project.oneLiner}</p>
          </div>
          <div className="flex flex-col justify-end gap-4 text-sm md:col-span-4">
            <div>
              <p className="text-faint">Timeline</p>
              <p className="mt-1 text-ink">{project.year}</p>
            </div>
            <div>
              <p className="text-faint">My role</p>
              <p className="mt-1 text-ink">{project.role}</p>
            </div>
            <div>
              <p className="text-faint">Tools</p>
              <p className="mt-1 text-ink">{project.stack.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="aspect-video w-full overflow-hidden">
          <ProjectVisual
            variant={
              project.visual as unknown as ComponentProps<typeof ProjectVisual>["variant"]
            }
          />
        </div>
      </div>

      {/* SECTIONS */}
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-16 md:gap-20">
          {project.sections.map((section) => (
            <Reveal key={section.heading}>
              <div className="grid gap-4 border-t hairline pt-8 md:grid-cols-12 md:gap-10">
                <h2 className="font-display text-2xl md:col-span-4 md:text-3xl">
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
