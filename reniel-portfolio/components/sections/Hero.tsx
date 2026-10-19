import { ArrowDown, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { technologies } from "@/data/technologies";
import { revealDelay } from "@/lib/reveal";

export function Hero() {
  return (
    <section id="home" className="screen border-b border-line">
      <div className="flex flex-1 flex-col justify-center px-6 pb-14 pt-24 md:px-10 lg:py-10">
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