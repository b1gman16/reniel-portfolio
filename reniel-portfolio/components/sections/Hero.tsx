import { ArrowDown, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { technologies } from "@/data/technologies";

export function Hero() {
  return (
    <section id="home" className="reveal border-b border-line">
      <div className="px-6 pb-14 pt-24 md:px-10 lg:pt-16">
        <SectionLabel className="text-muted">Independent Builder / Cebu, PH</SectionLabel>
        <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(4rem,13vw,10.5rem)] leading-[0.85] tracking-tight">
          I make ideas <em className="not-italic text-muted">work.</em>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="max-w-md text-lg leading-relaxed md:col-span-6 md:col-start-6">
            I build websites, business systems, and intelligent tools that turn real-world problems into working solutions.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-12">
            <Button href="#work" icon={ArrowDown}>Explore selected work</Button>
            <Button href="#contact" variant="outline" icon={PaperPlaneTilt}>Get in touch</Button>
          </div>
        </div>
      </div>

      {/* Technologies marquee: edit the list in data/technologies.ts */}
      <div className="glass-light flex flex-col gap-2 border-t border-line px-6 py-3 sm:flex-row sm:items-center sm:gap-6 md:px-10">
        <p className="label shrink-0 text-muted">Currently building with</p>
        <LogoMarquee items={technologies} className="flex-1" />
      </div>
    </section>
  );
}