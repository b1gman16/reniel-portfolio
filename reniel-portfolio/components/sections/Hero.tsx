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
      <div className="mx-auto grid w-full max-w-[88rem] flex-1 gap-10 px-6 pb-0 pt-12 md:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-14 lg:pt-10">
        {/* Greeting, intro, links. "@container" lets the name size itself to this column (cqw units). */}
        <div className="@container flex flex-col justify-center lg:self-center lg:pb-10">
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

        {/* Portrait: no frame, no backdrop. The figure stands on the technologies bar. */}
        <div
          data-reveal="now"
          style={revealDelay(200)}
          className="relative h-[26rem] w-full lg:h-[min(78dvh,44rem)]"
        >
          {site.portrait ? (
            <DitheredPortrait
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              align="bottom"
              texture={PORTRAIT.texture}
              dotSize={PORTRAIT.dotSize}
              contrast={PORTRAIT.contrast}
              brightness={PORTRAIT.brightness}
              className="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
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