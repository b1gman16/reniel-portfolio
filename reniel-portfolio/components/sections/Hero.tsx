import { ArrowDown, Envelope, GithubLogo, LinkedinLogo, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { DitheredPortrait } from "@/components/ui/dithered-portrait";
import { GlassButton } from "@/components/ui/glass-button";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { technologies } from "@/data/technologies";
import { revealDelay } from "@/lib/reveal";

/* ---- Tweak the portrait here --------------------------------------------- */
const PORTRAIT = {
  texture: 0.4, // 0 = smooth grayscale photo ... 1 = full halftone dots
  dotSize: 1.45, // CSS px per texture dot: 1 = fine, 2–3 = chunky
  contrast: 1.5, // 1 = neutral, higher = punchier, lower = softer
  brightness: +15, // -40 darker ... +40 lighter
};
/* -------------------------------------------------------------------------- */

const links = [
  { label: "GitHub", href: `https://github.com/${site.githubUsername}`, Icon: GithubLogo },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinLogo },
  { label: "Email", href: `mailto:${site.email}`, Icon: Envelope },
];

export function Hero() {
  return (
    // Full width on desktop: the sidebar is hidden here, so cancel the layout's sidebar offset.
    <section id="home" className="screen flex flex-col border-b border-line lg:-ml-[264px] lg:min-h-dvh">
      <div className="relative flex flex-1 flex-col lg:justify-center">
        {/* Text: left column on desktop, full width on mobile */}
        <div className="mx-auto w-full max-w-[88rem] px-6 pt-12 md:px-10 lg:py-10">
          {/* "@container" lets the name size itself to this column (cqw units). */}
          <div className="@container flex flex-col justify-center lg:w-[54%]">
            <div data-reveal="now" style={revealDelay(0)}>
              <SectionLabel className="text-muted">Independent Builder / Cebu, PH</SectionLabel>
            </div>

            {/* Hierarchy: small muted greeting, then the name at the largest size and heaviest weight, on one line */}
            <h1 data-reveal="now" style={revealDelay(100)} className="mt-5 font-display leading-none">
              <span className="block text-[length:clamp(1rem,3.4cqw,1.6rem)] font-normal tracking-normal text-muted">
                Hi, I am
              </span>
              <span className="mt-3 block whitespace-nowrap text-[length:min(11.5cqw,12vh,7.5rem)] font-semibold tracking-[-0.04em]">
                Reniel Tejones
              </span>
            </h1>

            <p
              data-reveal="now"
              style={revealDelay(220)}
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/70 lg:text-base"
            >
              I turn ideas into things people can actually use. With a background in computer engineering, I build across software, hardware, and the web — figuring things out along the way. Lately, I’ve been exploring how technology and design can come together to create better digital experiences.
            </p>

            <div data-reveal="now" style={revealDelay(320)} className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#work" icon={ArrowDown}>Explore selected work</Button>
              <Button href="#contact" icon={PaperPlaneTilt}>Get in touch</Button>
              <ul className="flex items-center gap-3 sm:ml-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <GlassButton
                      href={l.href}
                      size="icon"
                      aria-label={l.label}
                      title={l.label}
                      {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <l.Icon size={18} aria-hidden />
                    </GlassButton>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/*
          Portrait. Desktop: pinned to the hero's bottom-right corner, so the photo's cut edges meet the
          screen edge and the technologies bar. Mobile: full width under the text, sized to the photo's
          own proportions, sitting on the bar.
        */}
        <div
          data-reveal="now"
          style={revealDelay(200)}
          className="relative mt-8 w-full lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[min(86dvh,46rem)] lg:w-[min(46vw,52rem)]"
        >
          {site.portrait ? (
            <DitheredPortrait
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              align="bottom"
              alignX="right"
              texture={PORTRAIT.texture}
              dotSize={PORTRAIT.dotSize}
              contrast={PORTRAIT.contrast}
              brightness={PORTRAIT.brightness}
              className="block aspect-[var(--portrait-ratio,4/3)] w-full lg:aspect-auto lg:h-full"
            />
          ) : (
            <div className="flex h-64 items-center justify-center p-4 text-center lg:h-full">
              <p className="label text-muted">Portrait placeholder<br />public/images/portrait.png</p>
            </div>
          )}
        </div>
      </div>

      {/* Technologies marquee. Edit the list in data/technologies.ts */}
      <div
        data-reveal="now"
        style={revealDelay(480)}
        className="glass-light flex flex-col gap-2 border-t border-line px-6 py-3 sm:flex-row sm:items-center sm:gap-6 md:px-10"
      >
        <p className="label shrink-0 text-muted">Currently building with</p>
        <LogoMarquee items={technologies} className="flex-1" />
      </div>
    </section>
  );
}