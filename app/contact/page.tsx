import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Reniel Tejones",
  description: "Get in touch.",
};

const links = [
  { label: "Email", value: "renieltejones@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=renieltejones@gmail.com" },
  { label: "GitHub", value: "github.com/b1gman16", href: "https://github.com/b1gman16" },
  { label: "LinkedIn", value: "linkedin.com/in/renieltejones", href: "https://www.linkedin.com/in/reniel-tejones-292967244/" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-40">
      <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl">
        Have something worth building?
      </h1>
      <p className="mt-6 max-w-md text-lg text-mid">
        I&apos;m interested in interesting projects, collaborations, and
        opportunities to build useful things.
      </p>

      <div className="mt-16 flex flex-col md:mt-20">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex items-baseline justify-between border-t hairline py-8 md:py-10"
          >
            <span className="font-display text-2xl md:text-3xl">{link.label}</span>
            <span className="text-mid transition-transform duration-300 group-hover:translate-x-1 md:text-lg">
              {link.value} →
            </span>
          </a>
        ))}
        <div className="border-t hairline" />
      </div>
    </div>
  );
}
