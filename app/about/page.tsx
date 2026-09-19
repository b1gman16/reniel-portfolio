import type { Metadata } from "next";
import Annotation from "@/components/Annotation";
import CatMark from "@/components/CatMark";
import Mark from "@/components/Mark";

export const metadata: Metadata = {
  title: "About — Reniel",
  description:
    "Computer Engineering graduate who likes figuring things out, across software, infrastructure, and design.",
};

const toolbox = [
  {
    domain: "Software",
    items: ["Python", "Java", "C", "C#", "JavaScript", "React", "Next.js"],
    span: "md:col-span-4",
  },
  {
    domain: "Systems",
    items: ["Linux", "Docker", "Docker Compose", "SSH", "Networking", "Tailscale"],
    span: "md:col-span-4",
  },
  {
    domain: "Hardware",
    items: ["Arduino", "Raspberry Pi", "Sensors", "Camera systems", "IoT"],
    span: "md:col-span-4",
  },
  {
    domain: "AI / Computer Vision",
    items: ["YOLOv8", "Computer vision", "CVAT", "Dataset preparation", "Model training"],
    span: "md:col-span-5",
  },
  {
    domain: "Web",
    items: ["Responsive development", "UI/UX", "APIs", "Firebase", "Deployment"],
    span: "md:col-span-4",
  },
  {
    domain: "Creative",
    items: ["Video editing", "Digital media", "Audio / vocal mixing"],
    span: "md:col-span-3",
  },
];

const beyond = [
  { tag: "Film", span: "md:col-span-3" },
  { tag: "Music", span: "md:col-span-3" },
  { tag: "Cats", span: "md:col-span-6 md:row-span-2", big: true },
  { tag: "Building", span: "md:col-span-3" },
  { tag: "Training", span: "md:col-span-3" },
  { tag: "Design", span: "md:col-span-6" },
];

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-24">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="hidden md:col-span-1 md:flex md:items-start md:justify-center">
            <span className="label-vertical">ABOUT</span>
          </div>
          <h1 className="max-w-2xl font-display text-5xl italic leading-[1.05] md:col-span-11 md:text-6xl">
            I like figuring things out.
          </h1>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mid md:col-span-7">
            <p>
              I&apos;m a Computer Engineering graduate from the Philippines. My
              projects have taken me from embedded systems and IoT to computer
              vision, full-stack applications, Linux infrastructure, and
              business websites.
            </p>
            <p>
              What connects them isn&apos;t a particular language or
              technology. It&apos;s the process — taking an idea, understanding
              what it actually needs, figuring out how to build it, and putting
              the pieces together until they work as one system.
            </p>
            <p>
              I also spend time in more creative areas: video editing, digital
              media, and audio and vocal mixing. I don&apos;t treat those as
              separate from the technical work — they&apos;re the same
              instinct, applied to a different material.
            </p>
            <p>
              I don&apos;t have one perfectly defined specialization yet, and
              I&apos;m not in a hurry to force one.{" "}
              <Annotation rotate={-2.5} className="text-xl">
                not finished. building.
              </Annotation>{" "}
              Right now I&apos;m exploring the intersection of technology,
              design, and business — particularly websites and digital
              experiences that help real businesses communicate and grow.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="text-sm text-faint">Based in</p>
            <p className="mt-1">Philippines</p>
            <p className="mt-6 text-sm text-faint">Studied</p>
            <p className="mt-1">Computer Engineering</p>
            <p className="mt-6 text-sm text-faint">Currently</p>
            <p className="mt-1">Building, and figuring out what&apos;s next</p>
          </div>
        </div>
      </div>

      {/* SKILLS — full-bleed seam grid */}
      <div className="border-t hairline">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:px-10 md:pt-20">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl italic md:text-4xl">Skills</h2>
            <Mark className="h-6 w-6 text-faint" />
          </div>
          <p className="mt-4 max-w-lg text-mid">
            Organized by what I&apos;ve actually used on real projects, not by
            confidence score. Depth varies across the list — the case studies
            in Work show where it runs deepest.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-hairline md:grid-cols-12">
          {toolbox.map((group) => (
            <div key={group.domain} className={`bg-bg p-8 ${group.span}`}>
              <p className="font-display text-xl italic">{group.domain}</p>
              <ul className="mt-4 flex flex-col gap-2 text-mid">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BEYOND THE WORK — full-bleed seam grid, Cats gets the featured cell */}
      <div id="beyond" className="scroll-mt-24 border-t hairline">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:px-10 md:pt-20">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl italic md:text-4xl">Beyond the work</h2>
            <CatMark className="h-8 w-8 text-mid" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px bg-hairline md:grid-cols-12">
          {beyond.map((item) => (
            <div
              key={item.tag}
              className={`grain flex flex-col justify-center bg-bg p-8 ${item.span} ${
                item.big ? "min-h-[280px]" : "min-h-[160px]"
              }`}
            >
              <p
                className={`font-display italic ${
                  item.big ? "text-6xl md:text-7xl" : "text-3xl"
                }`}
              >
                {item.tag}
              </p>
              {item.tag === "Cats" && (
                <Annotation rotate={3} className="mt-6 block text-2xl">
                  he loves cats, apparently
                </Annotation>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}