"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import TagList from "@/components/TagList";

export default function ProjectRow({
  project,
  reverse = false,
  description,
}: {
  project: Project;
  reverse?: boolean;
  description: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const revealIfVisible = () => {
      const { top, bottom } = element.getBoundingClientRect();
      if (top < window.innerHeight + 120 && bottom > 0) {
        setImageVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", revealIfVisible);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
          observer.disconnect();
          window.removeEventListener("scroll", revealIfVisible);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 120px 0px" }
    );

    observer.observe(element);
    window.addEventListener("scroll", revealIfVisible, { passive: true });
    revealIfVisible();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfVisible);
    };
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid items-center gap-8 md:grid-cols-12 md:gap-10"
    >
      <div
        className={`duotone relative overflow-hidden md:col-span-7 ${
          reverse ? "md:order-2" : ""
        }`}
        style={{ "--tint": project.accent } as React.CSSProperties}
        onMouseMove={handleMove}
        data-cursor="View"
      >
        <motion.div
          ref={imageRef}
          className="aspect-[4/3] w-full"
          animate={{
            clipPath: imageVisible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "clip-path" }}
        >
          <motion.div
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectVisual variant={project.visual} accent={project.accent} />
          </motion.div>
        </motion.div>

        {/* cursor-following badge, desktop only */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-center text-[10px] font-medium uppercase tracking-wide text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex"
          style={{ x: springX, y: springY }}
        >
          View
        </motion.div>
      </div>

      <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
        <span className="text-sm text-faint">{project.index}</span>
        <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
          {project.name}
        </h3>
        <TagList tags={project.tags} accent={project.accent} className="mt-4" />
        <p className="mt-4 max-w-sm text-mid">{description}</p>
        <span className="mt-6 inline-block underline-grow pb-1 text-sm">
          Read the case study
        </span>
      </div>
    </Link>
  );
}