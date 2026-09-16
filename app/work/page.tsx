import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectRow from "@/components/ProjectRow";

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

      <div className="mt-20 flex flex-col gap-24 border-t hairline pt-16 md:mt-28 md:gap-32 md:pt-20">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            reverse={i % 2 === 1}
            description={project.summary}
          />
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