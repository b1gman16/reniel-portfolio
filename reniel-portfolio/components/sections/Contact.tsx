import { ArrowUpRight, Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";

const links = [
  { label: "GitHub", href: `https://github.com/${site.githubUsername}`, Icon: GithubLogo },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinLogo },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="glass-light col-span-12 flex flex-col justify-between gap-10 rounded-sm border border-ink p-6 md:p-8 lg:col-span-5">
      <div>
        <SectionLabel className="text-muted">Contact</SectionLabel>
        <h2 id="contact-title" className="mt-2 font-display text-5xl leading-[0.9] md:text-6xl">Have something that needs building?</h2>
      </div>
      <div className="flex flex-col gap-4">
        <a href={`mailto:${site.email}`} className="group inline-flex min-h-11 items-center gap-3 border-b border-ink py-2 text-lg">
          <Envelope size={22} aria-hidden />
          <span className="min-w-0 flex-1 break-all">{site.email}</span>
          <ArrowUpRight size={22} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <ul className="flex gap-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                <l.Icon size={20} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}