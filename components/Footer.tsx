import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-2xl">Have something worth building?</p>
          <p className="mt-2 max-w-sm text-sm text-mid">
            I&apos;m interested in interesting projects, collaborations, and
            opportunities to build useful things.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-mid">
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
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 pb-8 text-xs text-faint md:flex-row md:justify-between md:px-10">
        <p>Reniel Tejones — Computer Engineering, Philippines</p>
        <p>
          <Link href="/" className="underline-grow pb-1">
            Back to top
          </Link>
        </p>
      </div>
    </footer>
  );
}