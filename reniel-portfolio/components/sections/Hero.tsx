import { ArrowDown, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroParallax } from "@/components/sections/HeroParallax";
import { technologies } from "@/data/technologies";
import { revealDelay } from "@/lib/reveal";

/*
  Set to false if your background image is LIGHT. When true, the hero copy and buttons switch to the
  light palette so they stay readable on top of a dark photo. Nothing else about the hero changes.
*/
const DARK_BACKGROUND = false;
const darkTokens = "[--ink:#f3f1eb] [--canvas:#0b0b0c] [--muted:#b4b5b8] [--line:#2a2b2f] text-ink";

export function Hero() {
  return (
    <section id="home" className="screen border-b border-line">
      <div
        className={`relative flex min-h-[40rem] flex-1 flex-col justify-start px-6 pb-14 pt-24 md:px-10 lg:min-h-0 lg:justify-center lg:py-10 ${
          DARK_BACKGROUND ? darkTokens : ""
        }`}
      >
        {/* Parallax stage: background, name, subject. Fades in with the rest of the hero. */}
        <div data-reveal="now" style={revealDelay(0)} className="absolute inset-0 [transform:none!important]">
          <HeroParallax />
        </div>

        {/* Existing hero copy, unchanged, layered above the stage */}
        <div className="relative z-10">
          <div data-reveal="now" style={revealDelay(0)}>
            <SectionLabel className="text-muted">Independent Builder / Cebu, PH</SectionLabel>
          </div>
          {/* Size follows both width and height so the headline always fits the screen */}
          <h1
            data-reveal="now"
            style={revealDelay(100)}
            className="mt-5 max-w-[11ch] font-display text-[length:clamp(3.5rem,min(13vw,20vh),10.5rem)] leading-[0.85] tracking-tight"
          >
            I make ideas <em className="not-italic text-muted">work.</em>
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <p
              data-reveal="now"
              style={revealDelay(220)}
              className="max-w-md text-base leading-relaxed md:col-span-6 md:col-start-6 lg:text-lg"
            >
              I build websites, business systems, and intelligent tools that turn real-world problems into working solutions.
            </p>
            <div data-reveal="now" style={revealDelay(340)} className="flex flex-wrap gap-4 md:col-span-12">
              <Button href="#work" icon={ArrowDown}>Explore selected work</Button>
              <Button href="#contact" icon={PaperPlaneTilt}>Get in touch</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies marquee: part of the same load-in cascade as the rest of the hero.
          Edit the list in data/technologies.ts */}
      <div
        data-reveal="now"
        style={revealDelay(440)}
        className="glass-light flex flex-col gap-2 border-t border-line px-6 py-3 sm:flex-row sm:items-center sm:gap-6 md:px-10"
      >
        <p className="label shrink-0 text-muted">Currently building with</p>
        <LogoMarquee items={technologies} className="flex-1" />
      </div>
    </section>
  );
}