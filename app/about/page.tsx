import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Reniel Tejones",
  description:
    "Computer Engineering graduate who likes figuring things out, across software, infrastructure, and design.",
};

const toolbox = [
  {
    domain: "Software",
    items: ["Python", "Java", "C", "C#", "JavaScript", "React", "Next.js"],
  },
  {
    domain: "Systems & Infrastructure",
    items: ["Linux", "Docker", "Docker Compose", "SSH", "Networking", "Tailscale", "Self-hosting"],
  },
  {
    domain: "Hardware & IoT",
    items: ["Arduino", "Raspberry Pi", "Sensors", "Camera systems", "Embedded systems"],
  },
  {
    domain: "AI & Computer Vision",
    items: ["YOLOv8", "Computer vision", "Dataset preparation", "CVAT", "Model training"],
  },
  {
    domain: "Web",
    items: ["Responsive development", "UI/UX", "Deployment", "APIs", "Firebase"],
  },
  {
    domain: "Creative",
    items: ["Video editing", "Digital media", "Audio / vocal mixing"],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
      <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl">
        I like figuring things out.
      </h1>

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
            I&apos;m not in a hurry to force one. Right now I&apos;m
            exploring the intersection of technology, design, and business —
            particularly websites and digital experiences that help real
            businesses communicate and grow.
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

      {/* TOOLBOX */}
      <div className="mt-24 border-t hairline pt-14 md:mt-32 md:pt-20">
        <h2 className="font-display text-3xl md:text-4xl">Toolbox</h2>
        <p className="mt-4 max-w-lg text-mid">
          Organized by what I&apos;ve actually used on real projects, not by
          confidence score. Depth varies across the list — the case studies
          in Work show where it runs deepest.
        </p>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
          {toolbox.map((group) => (
            <div key={group.domain}>
              <p className="font-display text-xl">{group.domain}</p>
              <ul className="mt-4 flex flex-col gap-2 text-mid">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}