import type { Metadata } from "next";
import { otherProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Experiments — Reniel Tejones",
  description: "Smaller builds and exercises that didn't need a full case study.",
};

export default function ExperimentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
      <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl">
        Other work
      </h1>
      <p className="mt-6 max-w-lg text-mid">
        Smaller builds and exercises — not every project needs a full case
        study to be worth showing.
      </p>

      <div className="mt-16 flex flex-col md:mt-20">
        {otherProjects.map((project) => (
          <div
            key={project.name}
            className="grid gap-2 border-t hairline py-8 md:grid-cols-12 md:items-baseline md:gap-10 md:py-10"
          >
            <h2 className="font-display text-2xl md:col-span-4">{project.name}</h2>
            <p className="text-sm uppercase tracking-wide text-accent md:col-span-3">
              {project.stack}
            </p>
            <p className="text-mid md:col-span-5">{project.description}</p>
          </div>
        ))}
        <div className="border-t hairline" />
      </div>
    </div>
  );
}