import { ArrowUpRight, Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { GlassButton } from "@/components/ui/glass-button";
import { PanelGlow } from "@/components/ui/panel-glow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { revealDelay } from "@/lib/reveal";

const links = [
  { label: "GitHub", href: `https://github.com/${site.githubUsername}`, Icon: GithubLogo },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinLogo },
];

export function Contact() {
  return (
    <section
      id="contact"
      data-reveal
      style={revealDelay(140)}
      aria-labelledby="contact-title"
      className="glass-light relative col-span-12 flex flex-col justify-between gap-6 rounded-sm border border-ink p-5 md:p-6 lg:col-span-5"
    >
      <PanelGlow />
      <div>
        <SectionLabel className="text-muted">Contact</SectionLabel>
        <h2 id="contact-title" className="mt-2 font-display text-3xl font-medium leading-[1.1] md:text-4xl">Have something that needs building?</h2>
      </div>
      <div className="flex flex-col gap-4">
        <a href={`mailto:${site.email}`} className="group inline-flex min-h-11 items-center gap-3 border-b border-ink py-2 text-base">
          <Envelope size={20} aria-hidden />
          <span className="min-w-0 flex-1 break-all">{site.email}</span>
          <ArrowUpRight size={20} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <ul className="flex gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <GlassButton
                href={l.href}
                size="icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <l.Icon size={20} aria-hidden />
              </GlassButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}