import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work — Reniel Tejones",
  description: "Case studies across computer vision, infrastructure, and web.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
      <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl">
        Selected work
      </h1>
      <p className="mt-6 max-w-lg text-mid">
        Three projects, three different domains, one consistent habit: taking
        an idea and figuring out how to build the whole thing.
      </p>

      <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="group grid items-center gap-8 border-t hairline pt-10 md:grid-cols-12 md:gap-10"
            >
              <div
                className={`overflow-hidden md:col-span-7 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="aspect-4/3 w-full transition-transform duration-500 group-hover:scale-[1.02]">
                  <ProjectVisual
                    variant={project.visual as ComponentProps<typeof ProjectVisual>["variant"]}
                  />
                </div>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="text-sm text-faint">{project.index}</span>
                <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                  {project.name}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-wide text-accent">
                  {project.tags.join(" · ")}
                </p>
                <p className="mt-4 max-w-sm text-mid">{project.summary}</p>
                <span className="mt-6 inline-block underline-grow pb-1 text-sm">
                  Read the case study
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 border-t hairline pt-10 md:mt-32">
        <p className="max-w-md text-mid">
          Smaller builds — desktop apps, embedded exercises, a data science
          experiment — live in{" "}
          <Link href="/experiments" className="underline-grow pb-1 text-ink">
            Experiments
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
