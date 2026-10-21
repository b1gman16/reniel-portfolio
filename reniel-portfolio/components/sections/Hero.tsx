import { ArrowDown, ArrowUpRight, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { DitheredPortrait } from "@/components/ui/dithered-portrait";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { technologies } from "@/data/technologies";
import { revealDelay } from "@/lib/reveal";

const links = [
  { label: "github", href: `https://github.com/${site.githubUsername}` },
  { label: "linkedin", href: site.linkedin },
  { label: "email", href: `mailto:${site.email}` },
];

export function Hero() {
  return (
    // Full width on desktop: the sidebar is hidden here, so cancel the layout's sidebar offset.
    <section id="home" className="screen border-b border-line lg:-ml-[264px]">
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-6 pt-12 md:px-10 lg:grid-cols-12 lg:grid-rows-1 lg:gap-12 lg:pt-10">
        {/* Name, description, links */}
        <div className="flex flex-col justify-center pb-2 lg:col-span-7 lg:pb-10">
          <div data-reveal="now" style={revealDelay(0)}>
            <SectionLabel className="text-muted">Independent Builder / Cebu, PH</SectionLabel>
          </div>

          <h1
            data-reveal="now"
            style={revealDelay(100)}
            className="mt-4 break-words text-[length:clamp(2.25rem,min(4.6vw,9vh),4.5rem)] leading-[0.95] tracking-tight"
          >
            {site.name}
          </h1>

          <p
            data-reveal="now"
            style={revealDelay(200)}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/85 lg:text-[17px]"
          >
            I build websites, business systems, and intelligent tools that turn real-world problems into working solutions.
          </p>
          <p
            data-reveal="now"
            style={revealDelay(280)}
            className="mt-4 max-w-xl text-base leading-relaxed text-ink/85 lg:text-[17px]"
          >
            Computer Engineering graduate from Cebu. Lately: HallGuard, an AI + IoT safety system, and the web and property-management workflows behind Bayfront Resort.
          </p>

          <div data-reveal="now" style={revealDelay(360)} className="mt-7 flex flex-wrap gap-4">
            <Button href="#work" icon={ArrowDown}>Explore selected work</Button>
            <Button href="#contact" icon={PaperPlaneTilt}>Get in touch</Button>
          </div>

          <ul data-reveal="now" style={revealDelay(440)} className="mt-7 flex flex-wrap gap-x-5 gap-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group inline-flex min-h-9 items-center gap-1 font-mono text-xs lowercase tracking-wide text-muted transition-colors hover:text-ink"
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                  <ArrowUpRight
                    size={12}
                    weight="bold"
                    aria-hidden
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Portrait: stands on the technologies bar */}
        <div
          data-reveal="now"
          style={revealDelay(220)}
          className="relative h-[22rem] self-end lg:col-span-5 lg:h-[min(72dvh,46rem)]"
        >
          {site.portrait ? (
            <DitheredPortrait src={site.portrait} alt={`Portrait of ${site.name}`} />
          ) : (
            <div className="flex h-full items-center justify-center border border-dashed border-silver p-4 text-center">
              <p className="label text-muted">Portrait placeholder<br />public/images/portrait.jpg</p>
            </div>
          )}
        </div>
      </div>

      {/* Technologies marquee. Edit the list in data/technologies.ts */}
      <div
        data-reveal="now"
        style={revealDelay(520)}
        className="glass-light flex flex-col gap-2 border-t border-line px-6 py-3 sm:flex-row sm:items-center sm:gap-6 md:px-10"
      >
        <p className="label shrink-0 text-muted">Currently building with</p>
        <LogoMarquee items={technologies} className="flex-1" />
      </div>
    </section>
  );
}