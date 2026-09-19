"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";

export default function ProjectSpread({
  project,
  index,
  total,
  size = "tall",
  halftone = false,
}: {
  project: Project;
  index: number;
  total: number;
  size?: "tall" | "full";
  halftone?: boolean;
}) {
  const textColor = project.light ? "text-ink-inverse" : "text-ink";
  const midColor = project.light ? "text-mid-inverse" : "text-mid";
  const hairlineColor = project.light ? "hairline-inverse" : "hairline";

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className={`group relative block w-full overflow-hidden border-b ${hairlineColor} ${
        size === "full" ? "h-[92vh] min-h-[560px]" : "h-[62vh] min-h-[420px]"
      }`}
    >
      <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04] ${halftone ? "halftone" : ""}`}>
        <ProjectVisual variant={project.visual} accent={project.accent} />
      </div>

      <div className={`absolute inset-0 flex flex-col justify-between p-6 md:p-10 ${textColor}`}>
        {/* top row */}
        <div className="flex items-start justify-between text-xs tracking-[0.16em]">
          <span className={midColor}>
            {project.index} — {project.tags[0]?.toUpperCase()}
          </span>
          <span className="hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
            VIEW CASE STUDY ↗
          </span>
        </div>

        {/* huge wordmark */}
        <h3 className="font-display text-[13vw] italic uppercase leading-[0.88] tracking-tight sm:text-[9vw] lg:text-[7rem]">
          {project.name}
        </h3>

        {/* bottom row */}
        <div className="flex items-end justify-between gap-6">
          <p className={`max-w-xs text-sm leading-relaxed ${midColor}`}>
            {project.oneLiner}
          </p>
          <span className="shrink-0 text-xs tracking-[0.16em]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </Link>
  );
}