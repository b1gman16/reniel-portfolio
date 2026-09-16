import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectRow from "@/components/ProjectRow";
import HeroHeadline from "@/components/HeroHeadline";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import StaggerIn from "@/components/StaggerIn";
import ProcessList from "@/components/ProcessList";

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
      <section className="relative mx-auto max-w-6xl overflow-hidden px-6 pt-20 pb-16 md:px-10 md:pt-28">
        <StaggerIn>
          <p className="text-sm text-mid">Computer Engineering · Philippines</p>
        </StaggerIn>

        <HeroHeadline
          lines={["I build things", "from ideas."]}
          className="mt-6 max-w-5xl font-display text-[15vw] leading-[0.92] tracking-tight text-ink sm:text-8xl md:text-[7.5rem]"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <StaggerIn delay={520} className="md:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-mid">
              Computer Engineering graduate exploring the space between
              technology, design, and business — from intelligent systems
              and infrastructure to websites and digital experiences.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <Magnetic>
                <Link
                  href="/work"
                  data-cursor="Go"
                  className="inline-block border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-paper"
                >
                  View selected work
                </Link>
              </Magnetic>
              <Link href="/about" className="underline-grow pb-1">
                About me
              </Link>
            </div>
          </StaggerIn>

          <StaggerIn delay={600} className="md:col-span-5 md:justify-self-end">
            <div className="seal flex h-28 w-28 flex-col items-center justify-center border border-ink text-center md:h-32 md:w-32">
              <span className="font-display text-xs italic leading-tight text-mid">
                built,
                <br />
                not just
                <br />
                imagined
              </span>
            </div>
          </StaggerIn>
        </div>
      </section>

      <div className="mt-16 md:mt-20">
        <Marquee
          items={[
            "Computer Vision",
            "Embedded Systems",
            "Infrastructure",
            "Web & Design",
            "Business",
          ]}
        />
      </div>

      {/* SELECTED WORK */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Selected work</h2>
            <Link href="/work" className="hidden underline-grow pb-1 text-sm text-mid md:block">
              All work
            </Link>
          </div>

          <div className="mt-14 flex flex-col gap-24 md:mt-20 md:gap-32">
            {projects.map((project, i) => (
              <ProjectRow
                key={project.slug}
                project={project}
                reverse={i % 2 === 1}
                description={project.oneLiner}
              />
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
      <section className="grain border-b hairline bg-dark text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-3xl md:text-4xl">How I build</h2>
          <p className="mt-4 max-w-lg text-white/60">
            Different projects, same underlying process. HallGuard meant
            connecting hardware, computer vision, and cloud services. HomeOps
            means combining Linux, networking, and containers. Bayfront
            Resort means connecting design, development, and what an actual
            business needs.
          </p>

          <ProcessList steps={process} />
        </div>
      </section>

      {/* CURRENTLY EXPLORING */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-3xl md:text-4xl">Currently exploring</h2>
          <p className="mt-4 max-w-lg text-mid">
            Not a fixed career declaration — just where my attention is
            heading right now.
          </p>

          <div className="mt-14 grid gap-10 border-t hairline pt-10 sm:grid-cols-2 md:mt-16">
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
      </section>
    </>
  );
}