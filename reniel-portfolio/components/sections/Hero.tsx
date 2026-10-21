import { ArrowDown, Envelope, GithubLogo, LinkedinLogo, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { DitheredPortrait } from "@/components/ui/dithered-portrait";
import { GlassButton } from "@/components/ui/glass-button";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { technologies } from "@/data/technologies";
import { revealDelay } from "@/lib/reveal";

/* ---- Tweak the hero's look here ------------------------------------------ */

// Name glow: two stacked halos (tight + wide)
const GLOW = {
  near: 14, // px, size of the tight halo
  far: 28, // px, size of the wide halo
  strengthLight: 0.2, // 0 = none, 1 = solid. Light mode is a soft dark shadow
  strengthDark: 0.4, // dark mode is a light halo
};

// Dithered portrait
const PORTRAIT = {
  dotSize: 0.5, // CSS px per dot: 1 = fine detail, 2–3 = chunky halftone
  contrast: 1.5, // 1 = neutral, higher = punchier, lower = softer
  brightness: 0, // -40 darker ... +40 lighter
};

/* -------------------------------------------------------------------------- */

const glowStyle = {
  "--glow-light": `rgb(16 16 16 / ${GLOW.strengthLight})`,
  "--glow-dark": `rgb(243 241 235 / ${GLOW.strengthDark})`,
  textShadow: `0 0 ${GLOW.near}px var(--glow), 0 0 ${GLOW.far}px var(--glow)`,
} as React.CSSProperties;

const links = [
  { label: "GitHub", href: `https://github.com/${site.githubUsername}`, Icon: GithubLogo },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinLogo },
  { label: "Email", href: `mailto:${site.email}`, Icon: Envelope },
];

export function Hero() {
  return (
    // Full width on desktop: the sidebar is hidden here, so cancel the layout's sidebar offset.
    <section id="home" className="screen flex flex-col border-b border-line lg:-ml-[264px] lg:min-h-dvh">
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-6 py-12 md:px-10 lg:grid-cols-12 lg:gap-12 lg:py-10">
        {/* Greeting, intro, links */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div data-reveal="now" style={revealDelay(0)}>
            <SectionLabel className="text-muted">Independent Builder / Cebu, PH</SectionLabel>
          </div>

          <h1
            data-reveal="now"
            style={revealDelay(100)}
            className="mt-4 font-display font-medium leading-[0.95] tracking-tight"
          >
            <span className="block text-[length:clamp(1.25rem,min(2.6vw,5vh),2.25rem)] text-muted">Hi, I am</span>
            {/* The name glows: light halo in dark mode, soft shadow in light mode (see GLOW above) */}
            <span
              style={glowStyle}
              className="mt-2 block text-[length:clamp(2.75rem,min(7.2vw,12.5vh),6.5rem)] [--glow:var(--glow-light)] [[data-theme=dark]_&]:[--glow:var(--glow-dark)]"
            >
              <span className="block">Reniel</span>
              <span className="block">Tejones</span>
            </span>
          </h1>

          <p
            data-reveal="now"
            style={revealDelay(220)}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/85 [@media(max-height:760px)]:text-[15px]"
          >
            I turn ideas into things people can actually use. With a background in computer engineering, I build across software, hardware, and the web — figuring things out along the way. Lately, I’ve been exploring how technology and design can come together to create better digital experiences.
          </p>

          <div data-reveal="now" style={revealDelay(320)} className="mt-7 flex flex-wrap items-center gap-4">
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

        {/* Portrait: centered beside the text, fitted inside its box, never clipped */}
        <div
          data-reveal="now"
          style={revealDelay(200)}
          className="relative h-[22rem] w-full lg:col-span-5 lg:h-[min(62dvh,36rem)]"
        >
          {site.portrait ? (
            <DitheredPortrait
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              dotSize={PORTRAIT.dotSize}
              contrast={PORTRAIT.contrast}
              brightness={PORTRAIT.brightness}
            />
          ) : (
            <div className="flex h-full items-center justify-center border border-dashed border-silver p-4 text-center">
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