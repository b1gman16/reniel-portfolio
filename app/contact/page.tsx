import type { Metadata } from "next";
import Mark from "@/components/Mark";

export const metadata: Metadata = {
  title: "Contact — Reniel",
  description: "Get in touch.",
};

const links = [
  { label: "Email", value: "hello@renieltejones.dev", href: "mailto:hello@renieltejones.dev" },
  { label: "GitHub", value: "github.com/renieltejones", href: "https://github.com/" },
  { label: "LinkedIn", value: "linkedin.com/in/renieltejones", href: "https://www.linkedin.com/" },
];

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-6 px-6 pt-16 pb-10 md:grid-cols-12 md:px-10 md:pt-24">
        <div className="hidden md:col-span-1 md:flex md:items-start md:justify-center">
          <span className="label-vertical">CONTACT</span>
        </div>
        <div className="md:col-span-11">
          <h1 className="font-display text-[13vw] italic uppercase leading-[0.88] tracking-tight sm:text-7xl md:text-8xl">
            Have something
            <br />
            worth building?
          </h1>
          <p className="mt-8 max-w-md text-lg text-mid">
            I&apos;m interested in interesting projects, collaborations, and
            opportunities to build useful things.
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col border-t hairline md:mt-20">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            data-cursor="Open"
            className="group flex items-center justify-between border-b hairline px-6 py-10 md:px-10 md:py-14"
          >
            <span className="flex items-baseline gap-4">
              <span className="text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-4xl italic transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
                {link.label}
              </span>
            </span>
            <span className="hidden text-mid transition-transform duration-300 group-hover:-translate-x-1 md:block md:text-lg">
              {link.value} →
            </span>
          </a>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl justify-end px-6 py-10 md:px-10">
        <Mark className="h-6 w-6 text-faint" />
      </div>
    </div>
  );
}