import { Buildings, Cpu, Globe, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { PanelGlow } from "@/components/ui/panel-glow";
import { SectionLabel } from "@/components/ui/SectionLabel";

const items = [
  { Icon: Globe, title: "Websites", desc: "Design and build, from brand sites to full web apps." },
  { Icon: Buildings, title: "Business systems", desc: "Internal tools and workflows around how a business actually runs." },
  { Icon: Sparkle, title: "AI-assisted tools", desc: "Applications that use AI where it earns its place." },
  { Icon: Cpu, title: "Hardware + software", desc: "Embedded devices connected to apps and cloud services." },
];

export function Capabilities() {
  return (
    <section aria-labelledby="cap-title" className="dark-panel glass-dark relative col-span-12 flex flex-col rounded-sm border border-graphite p-5 text-bone md:p-6 lg:col-span-4">
      <PanelGlow tone="dark" />
      <SectionLabel className="text-silver">Capabilities</SectionLabel>
      <h2 id="cap-title" className="mt-2 font-display text-3xl leading-none md:text-4xl">What I build</h2>
      {/* The list stretches to the height of the neighbouring repositories panel */}
      <ul className="mt-5 flex flex-1 flex-col divide-y divide-graphite border-y border-graphite">
        {items.map(({ Icon, title, desc }) => (
          <li key={title} className="flex flex-1 items-center gap-3 py-3">
            <Icon size={20} aria-hidden className="shrink-0 text-silver" />
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-bone/70">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}