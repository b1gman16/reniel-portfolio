import Link from "next/link";
import Image from "next/image";

import { projects } from "@/data/projects";

import ProjectSpread from "@/components/ProjectSpread";
import Magnetic from "@/components/Magnetic";
import ProcessList from "@/components/ProcessList";
import Annotation from "@/components/Annotation";
import CatMark from "@/components/CatMark";

const process = [
  {
    step: "01",
    name: "Understand",
    body: "I start by understanding the problem, the people involved, and what the thing actually needs to accomplish.",
  },
  {
    step: "02",
    name: "Explore",
    body: "I research technologies, references, alternatives, and possible approaches before committing to one.",
  },
  {
    step: "03",
    name: "Build",
    body: "I turn the idea into something functional — piece by piece, learning whatever I need along the way.",
  },
  {
    step: "04",
    name: "Integrate",
    body: "I connect the different parts into one working experience, whether that's software, hardware, services, or design.",
  },
  {
    step: "05",
    name: "Improve",
    body: "I test, troubleshoot, break things, fix them, and keep refining until the result gets better.",
  },
];

const exploring = [
  {
    name: "Business websites",
    body: "Building websites for real businesses and learning how design, technology, and business objectives intersect.",
  },
  {
    name: "Digital design",
    body: "Exploring visual identity, interaction, typography, and the relationship between brand and digital experience.",
  },
  {
    name: "Systems",
    body: "Learning Linux, networking, Docker, infrastructure, and self-hosting through HomeOps.",
  },
  {
    name: "Building",
    body: "Getting better at taking an unclear idea and turning it into something that actually exists.",
  },
];

export default function Home() {
  return (
    <>
      {/* ============================================================
          HERO
      ============================================================ */}

      <section className="grain site-grid">
        {/* NAME */}

        <div className="grid-cell col-span-12 min-h-[22vh] p-5 sm:p-8 md:col-span-7 md:min-h-[32vh] md:p-10">
          <div className="flex h-full flex-col justify-between">
            <div className="meta flex justify-between">
              <span>RENIEL TEJONES</span>

              <span>CEBU / PHILIPPINES</span>
            </div>

            <h1 className="display-xl uppercase">
              RENIEL
              <br />
              <span className="chrome-text">TEJONES</span>
            </h1>
          </div>
        </div>

        {/* PORTRAIT */}

        <div className="hero-portrait col-span-12 md:col-span-5 md:row-span-2">
          <Image
            src="/portrait.jpg"
            alt="Portrait of Reniel Tejones"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            className="hero-portrait-image"
          />

          <div className="portrait-label">
            RENIEL TEJONES / 2026
          </div>
        </div>

        {/* STATEMENT */}

        <div className="grid-cell col-span-12 flex min-h-[35vh] flex-col justify-between p-5 sm:p-8 md:col-span-7 md:p-10">
          <div className="flex items-start justify-between">
            <span className="meta">01 — INTRODUCTION</span>

            <span className="meta">BUILDER / ENGINEER</span>
          </div>

          <div>
            <p className="font-display max-w-3xl text-4xl leading-[0.9] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              I take ambiguous ideas and turn them into things that work.
            </p>

            <p className="mt-7 max-w-md text-sm leading-6 text-[var(--muted)]">
              Computer Engineering graduate interested in technology,
              systems, digital design, and the business behind what gets built.
            </p>
          </div>
        </div>

        {/* HERO FOOTER */}

        <div className="grid-cell col-span-12 flex flex-wrap items-center justify-between gap-6 p-5 sm:p-8 md:col-span-7 md:p-10">
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href="/work"
                className="editorial-button"
                data-cursor="WORK"
              >
                Selected work
              </Link>
            </Magnetic>

            <Link
              href="/about"
              className="underline-grow flex items-center text-xs uppercase tracking-[0.14em]"
            >
              About me
            </Link>
          </div>

          <Annotation rotate={-4}>
            still figuring it out.
          </Annotation>
        </div>

        {/* META STRIP */}

        <div className="grid-cell col-span-12 grid grid-cols-2 md:grid-cols-4">
          {[
            "COMPUTER ENGINEERING",
            "FULL-STACK",
            "SYSTEMS",
            "DIGITAL DESIGN",
          ].map((item, index) => (
            <div
              key={item}
              className="border-r border-[var(--line)] p-5 last:border-r-0 sm:p-7"
            >
              <span className="meta">
                0{index + 1}
              </span>

              <p className="mt-3 text-xs uppercase tracking-[0.12em]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SELECTED WORK
      ============================================================ */}

      <section id="work">
        <div className="border-b border-[var(--line)] px-5 py-8 sm:px-8 md:px-10 md:py-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="meta">02 — SELECTED WORK</span>

              <h2 className="font-display mt-3 text-5xl tracking-[-0.04em] md:text-7xl">
                Things I&apos;ve built.
              </h2>
            </div>

            <span className="hidden font-display text-7xl leading-none text-[var(--faint)] md:block">
              02
            </span>
          </div>
        </div>

        {projects.map((project, i) => (
          <ProjectSpread
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            size="tall"
            halftone={project.slug === "hallguard"}
          />
        ))}
      </section>

      {/* ============================================================
          PROCESS
      ============================================================ */}

      <section className="border-b border-[var(--line)] bg-[var(--paper)] text-[#101010]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:px-10 md:py-28">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="meta text-[#6d6a62]">
                03 — PROCESS
              </span>

              <h2 className="font-display mt-5 text-6xl leading-[0.8] tracking-[-0.05em] md:text-8xl">
                How
                <br />
                I build.
              </h2>

              <p className="mt-8 max-w-sm text-sm leading-6 text-[#6d6a62]">
                Different projects need different tools. The underlying
                approach stays surprisingly consistent.
              </p>
            </div>

            <div className="md:col-span-8">
              <ProcessList steps={process} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CURRENTLY
      ============================================================ */}

      <section className="border-b border-[var(--line)]">
        <div className="site-grid">
          <div className="grid-cell col-span-12 p-5 sm:p-8 md:col-span-3 md:p-10">
            <span className="label-vertical">
              CURRENTLY EXPLORING
            </span>
          </div>

          <div className="grid-cell col-span-12 p-5 sm:p-8 md:col-span-9 md:p-10">
            <span className="meta">04 — RIGHT NOW</span>

            <h2 className="font-display mt-5 text-5xl leading-[0.85] tracking-[-0.045em] md:text-7xl">
              Not a fixed
              <br />
              career declaration.
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Just the things currently holding my attention.
            </p>

            <div className="mt-16 grid gap-px bg-[var(--line)] sm:grid-cols-2">
              {exploring.map((item, index) => (
                <div
                  key={item.name}
                  className="bg-[var(--bg)] p-7 md:p-9"
                >
                  <span className="meta">
                    0{index + 1}
                  </span>

                  <h3 className="font-display mt-8 text-3xl md:text-4xl">
                    {item.name}
                  </h3>

                  <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT / PERSONAL
      ============================================================ */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:px-10 md:py-32">
          <div className="flex items-end justify-between">
            <div>
              <span className="meta">05 — OUTSIDE THE WORK</span>

              <h2 className="font-display mt-4 text-5xl tracking-[-0.04em] md:text-7xl">
                Beyond the work.
              </h2>
            </div>

            <CatMark className="h-9 w-9 text-[var(--muted)]" />
          </div>

          <div className="mt-14 border-t border-[var(--line)] pt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                "FILM",
                "MUSIC",
                "BUILDING",
                "TRAINING",
                "DESIGN",
                "CATS",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-display text-3xl italic text-[var(--muted)] transition-colors hover:text-[var(--white)] md:text-5xl"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/about#beyond"
              className="underline-grow mt-10 inline-block text-xs uppercase tracking-[0.15em]"
            >
              More about me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}