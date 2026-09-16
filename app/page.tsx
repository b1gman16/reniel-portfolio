import Link from "next/link";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";

const process = [
  {
    step: "01",
    name: "Understand",
    body: "Understand the problem, the requirements, the users, and the constraints before touching a single tool.",
  },
  {
    step: "02",
    name: "Explore",
    body: "Research technologies, approaches, references, and alternatives — and figure out what actually fits.",
  },
  {
    step: "03",
    name: "Build",
    body: "Turn the chosen approach into something functional, piece by piece.",
  },
  {
    step: "04",
    name: "Integrate",
    body: "Connect the different components — hardware, software, services — into one working system.",
  },
  {
    step: "05",
    name: "Improve",
    body: "Test, troubleshoot, learn from what breaks, and iterate.",
  },
];

const exploring = [
  {
    name: "Business websites",
    body: "Becoming increasingly interested in building websites for real businesses, not just for demonstration.",
  },
  {
    name: "Branding & digital experiences",
    body: "Exploring how visual identity, design, UX, and a website work together as one experience.",
  },
  {
    name: "Systems & infrastructure",
    body: "Continuing to explore Linux, networking, Docker, and servers through HomeOps.",
  },
  {
    name: "Building for real problems",
    body: "Drawn to projects where technology is a tool for solving something practical, not the goal itself.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        <p className="text-sm text-mid">Computer Engineering · Philippines</p>
        <h1 className="mt-6 max-w-4xl font-display text-[13vw] leading-[0.98] tracking-tight text-ink sm:text-7xl md:text-8xl">
          I build things
          <br />
          from ideas.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-mid">
          Computer Engineering graduate exploring the space between
          technology, design, and business — from intelligent systems and
          infrastructure to websites and digital experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <Link
            href="/work"
            className="border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-paper"
          >
            View selected work
          </Link>
          <Link href="/about" className="underline-grow pb-1">
            About me
          </Link>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Selected work</h2>
            <Link href="/work" className="hidden underline-grow pb-1 text-sm text-mid md:block">
              All work
            </Link>
          </div>

          <div className="mt-14 flex flex-col gap-24 md:mt-20 md:gap-32">
            {projects.map((project, i) => (
              <Reveal key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group grid items-center gap-8 md:grid-cols-12 md:gap-10"
                >
                  <div
                    className={`overflow-hidden md:col-span-7 ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]">
                      <ProjectVisual variant={project.visual} />
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <span className="text-sm text-faint">{project.index}</span>
                    <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-sm uppercase tracking-wide text-accent">
                      {project.tags.join(" · ")}
                    </p>
                    <p className="mt-4 max-w-sm text-mid">{project.oneLiner}</p>
                    <span className="mt-6 inline-block underline-grow pb-1 text-sm">
                      Read the case study
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Link
            href="/work"
            className="mt-16 inline-block underline-grow pb-1 text-sm text-mid md:hidden"
          >
            All work
          </Link>
        </div>
      </section>

      {/* HOW I BUILD */}
      <section className="border-t hairline bg-dark text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-3xl md:text-4xl">How I build</h2>
          <p className="mt-4 max-w-lg text-white/60">
            Different projects, same underlying process. HallGuard meant
            connecting hardware, computer vision, and cloud services. HomeOps
            means combining Linux, networking, and containers. Ocean View
            Resort means connecting design, development, and what an actual
            business needs.
          </p>

          <ol className="mt-14 grid gap-x-10 gap-y-10 md:mt-20 md:grid-cols-5">
            {process.map((p) => (
              <li key={p.step} className="border-t border-white/15 pt-6">
                <span className="text-sm text-white/40">{p.step}</span>
                <p className="mt-3 font-display text-xl">{p.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CURRENTLY EXPLORING */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-3xl md:text-4xl">Currently exploring</h2>
          <p className="mt-4 max-w-lg text-mid">
            Not a fixed career declaration — just where my attention is
            heading right now.
          </p>

          <div className="mt-14 grid gap-10 border-t hairline pt-10 sm:grid-cols-2 md:mt-16">
            {exploring.map((e) => (
              <div key={e.name}>
                <p className="font-display text-xl">{e.name}</p>
                <p className="mt-3 text-mid">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
