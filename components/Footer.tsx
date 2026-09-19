import Link from "next/link";
import Mark from "@/components/Mark";

export default function Footer() {
  return (
    <footer className="grain border-t hairline">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <Mark className="mb-6 h-6 w-6 text-faint" />
        <p className="font-display text-[13vw] italic leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
          Still building.
        </p>
        <p className="mt-6 max-w-md text-mid">
          I&apos;m interested in interesting projects, collaborations, and
          opportunities to build useful things.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <a className="underline-grow pb-1" href="mailto:hello@renieltejones.dev">
            Email
          </a>
          <a
            className="underline-grow pb-1"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="underline-grow pb-1"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 pb-8 pt-14 text-xs text-faint md:flex-row md:justify-between md:px-10">
        <p>Reniel — Computer Engineering, Philippines</p>
        <p>
          <Link href="/" className="underline-grow pb-1">
            Back to top
          </Link>
        </p>
      </div>
    </footer>
  );
}