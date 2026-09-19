import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectSpread from "@/components/ProjectSpread";
import Magnetic from "@/components/Magnetic";
import ProcessList from "@/components/ProcessList";
import Annotation from "@/components/Annotation";
import CatMark from "@/components/CatMark";
import Mark from "@/components/Mark";

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
    name: "Digital design",
    body: "Exploring how visual identity, UX, and a website work together as one experience.",
  },
  {
    name: "Systems",
    body: "Continuing to learn Linux, networking, Docker, and infrastructure through HomeOps.",
  },
  {
    name: "Building",
    body: "Continuing to develop the ability to take ideas and turn them into working systems.",
  },
];

export default function Home() {
  return (
    <>
      {/* POSTER-WALL HERO */}
      <section className="grain grid grid-cols-12 gap-px bg-hairline">
        {/* headline cell */}
        <div className="col-span-12 flex min-h-[62vh] flex-col justify-between bg-bg p-6 md:col-span-7 md:min-h-[74vh] md:p-10">
          <div className="flex items-start justify-between text-xs tracking-[0.16em] text-mid">
            <span>COMPUTER ENGINEERING · CEBU, PHILIPPINES</span>
            <Mark className="h-5 w-5 text-mid" />
          </div>
          <h1 className="font-display text-[16vw] italic uppercase leading-[0.86] tracking-tight text-ink sm:text-[8.5vw] md:text-[6.2vw]">
            I build
            <br />
            things
            <br />
            from ideas.
          </h1>
        </div>

        {/* scattered metadata cell */}
        <div className="relative col-span-12 flex min-h-[36vh] flex-col justify-between bg-bg p-6 md:col-span-5 md:min-h-[74vh] md:p-10">
          <span className="self-end font-display text-2xl italic text-faint">2026</span>
          <div className="flex flex-col gap-1 text-xs tracking-[0.16em] text-mid">
            {["TECHNOLOGY", "DESIGN", "SYSTEMS", "BUSINESS"].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <p className="max-w-xs text-mid">
            Still figuring out where they intersect.
          </p>
        </div>

        {/* CTA cell */}
        <div className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 bg-bg p-6 text-sm md:col-span-5 md:p-10">
          <Magnetic>
            <Link
              href="/work"
              data-cursor="Go"
              className="inline-block border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-bg"
            >
              View selected work
            </Link>
          </Magnetic>
          <Link href="/about" className="underline-grow pb-1">
            About me
          </Link>
        </div>

        {/* vertical label cell */}
        <div className="col-span-4 hidden items-center justify-center bg-bg p-6 md:col-span-2 md:flex">
          <span className="label-vertical">STILL BUILDING</span>
        </div>

        {/* annotation cell */}
        <div className="col-span-8 flex items-center bg-bg p-6 md:col-span-5 md:p-10">
          <Annotation rotate={-3} className="text-2xl">
            not finished, building
          </Annotation>
        </div>
      </section>

      {/* SELECTED WORK — full-bleed spreads */}
      <section id="work">
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

      {/* HOW I BUILD — the one light-contrast band */}
      <section className="border-b hairline-inverse bg-surface text-ink-inverse">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl italic md:text-4xl">How I build</h2>
            <Mark className="h-6 w-6 text-mid-inverse" />
          </div>
          <p className="mt-4 max-w-lg text-mid-inverse">
            Different projects, same underlying process. HallGuard meant
            connecting hardware, computer vision, and cloud services. HomeOps
            means combining Linux, networking, and containers. Ocean View
            Resort means connecting design, development, and what an actual
            business needs.
          </p>

          <ProcessList steps={process} />
        </div>
      </section>

      {/* CURRENTLY EXPLORING */}
      <section className="border-b hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="hidden md:col-span-2 md:flex md:items-start md:justify-center">
            <span className="label-vertical">EXPLORING</span>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-display text-3xl italic md:text-4xl">Currently exploring</h2>
            <p className="mt-4 max-w-lg text-mid">
              Not a fixed career declaration — just where my attention is
              heading right now.
            </p>

            <div className="mt-14 grid gap-10 border-t hairline pt-10 sm:grid-cols-2">
              {exploring.map((e, i) => (
                <div key={e.name} className="flex gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: projects[i % projects.length].accent }}
                    aria-hidden
                  />
                  <div>
                    <p className="font-display text-xl">{e.name}</p>
                    <p className="mt-3 text-mid">{e.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BEYOND THE WORK — teaser */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl italic md:text-4xl">Beyond the work</h2>
            <CatMark className="h-8 w-8 text-mid" />
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t hairline pt-8">
            {["Film", "Music", "Building", "Training", "Design", "Cats"].map((tag) => (
              <span key={tag} className="font-display text-2xl italic text-mid md:text-3xl">
                {tag}
              </span>
            ))}
          </div>
          <Link href="/about#beyond" className="mt-8 inline-block underline-grow pb-1 text-sm text-mid">
            More about me
          </Link>
        </div>
      </section>
    </>
  );
}