import { PanelGlow } from "@/components/ui/panel-glow";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="glass-light relative col-span-12 rounded-sm border border-line p-6 md:p-8 lg:col-span-7">
      <PanelGlow />
      <SectionLabel className="text-muted">Background</SectionLabel>
      <h2 id="about-title" className="mt-2 font-display text-4xl leading-none md:text-5xl">Engineer first, builder always</h2>
      <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed">
        <p>I&rsquo;m a Computer Engineering graduate from the Philippines, based in Cebu. I build websites, business systems, AI-assisted applications, and software that talks to hardware.</p>
        <p>I care more about solving a real problem than collecting technologies. My capstone, HallGuard, joined computer vision, a Raspberry Pi, and a mobile app. Bayfront Resort is a real-world hospitality project spanning the website and property management workflows.</p>
      </div>
    </section>
  );
}