import type { Metadata } from "next";
import { otherProjects } from "@/data/projects";
import Mark from "@/components/Mark";

export const metadata: Metadata = {
  title: "Experiments — Reniel",
  description: "Smaller builds and exercises that didn't need a full case study.",
};

const spans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

export default function ExperimentsPage() {
  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-6 px-6 pt-16 pb-14 md:grid-cols-12 md:px-10 md:pt-24 md:pb-20">
        <div className="hidden md:col-span-1 md:flex md:items-start md:justify-center">
          <span className="label-vertical">ARCHIVE</span>
        </div>
        <div className="md:col-span-11">
          <div className="flex items-end justify-between">
            <h1 className="max-w-2xl font-display text-5xl italic leading-[1.05] md:text-6xl">
              Other work
            </h1>
            <Mark className="hidden h-6 w-6 text-faint md:block" />
          </div>
          <p className="mt-6 max-w-lg text-mid">
            Smaller builds and exercises — not every project needs a full
            case study to be worth showing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border-t hairline bg-hairline md:grid-cols-12">
        {otherProjects.map((project, i) => (
          <div
            key={project.name}
            className={`grain flex min-h-[220px] flex-col justify-between bg-bg p-8 ${spans[i % spans.length]}`}
          >
            <span className="text-xs tracking-[0.16em] text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-display text-3xl italic">{project.name}</h2>
              <p className="mt-3 text-xs tracking-[0.1em] text-accent">
                {project.stack.toUpperCase()}
              </p>
              <p className="mt-4 max-w-sm text-mid">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}