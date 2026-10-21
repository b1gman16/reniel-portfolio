"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Envelope,
  GithubLogo,
  House,
  LinkedinLogo,
  List,
  MapPin,
  PaperPlaneTilt,
  User,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { nav, site } from "@/data/site";
import { GlassButton } from "@/components/ui/glass-button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { IconComponent } from "@/lib/icons";

const navIcons: Record<string, IconComponent> = {
  "#home": House,
  "#work": Briefcase,
  "#about": User,
  "#contact": PaperPlaneTilt,
};

const navItems = nav.map((n) => ({ ...n, Icon: navIcons[n.href] ?? House }));

const socials = [
  { label: "GitHub", href: `https://github.com/${site.githubUsername}`, Icon: GithubLogo },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinLogo },
  { label: "Email", href: `mailto:${site.email}`, Icon: Envelope },
];

function Portrait() {
  // flex-1 lets the photo take whatever height is left, so the sidebar never needs to scroll.
  return (
    <div className="relative min-h-24 flex-1 overflow-hidden rounded-sm [@media(max-height:560px)]:hidden">
      {site.portrait ? (
        <Image
          src={site.portrait}
          alt={`Portrait of ${site.name}`}
          fill
          sizes="264px"
          className="object-cover object-top grayscale"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center rounded-sm border border-dashed border-silver bg-[repeating-linear-gradient(135deg,transparent_0_8px,rgba(128,128,128,0.08)_8px_9px)] p-4 text-center">
          <p className="label text-muted">Portrait placeholder<br />public/images/portrait.png</p>
        </div>
      )}
    </div>
  );
}

function Socials() {
  return (
    <ul className="flex items-center gap-2">
      {socials.map((s) => (
        <li key={s.label}>
          <GlassButton
            href={s.href}
            size="icon"
            aria-label={s.label}
            title={s.label}
            {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <s.Icon size={18} aria-hidden />
          </GlassButton>
        </li>
      ))}
    </ul>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col gap-0.5">
        {navItems.map((n) => (
          <li key={n.href}>
            <a
              href={n.href}
              onClick={onNavigate}
              className="label flex min-h-10 items-center gap-3 rounded-sm px-2 transition-colors hover:bg-ink/5"
            >
              <n.Icon size={18} aria-hidden />
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Availability() {
  if (!site.availability.show) return null;
  return (
    <p className="label flex items-center gap-2 text-muted">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
      {site.availability.label}
    </p>
  );
}

const ease = "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  // false while the hero is mostly on screen; true once the visitor has scrolled past it
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setPastHero((entry?.intersectionRatio ?? 0) < 0.35),
      { threshold: [0, 0.35] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Desktop sidebar: pinned to the viewport, never scrolls. Hidden over the hero, eases in after it. */}
      <aside
        inert={!pastHero}
        className={`glass-light fixed inset-y-0 left-0 z-30 hidden h-dvh w-[264px] flex-col gap-5 overflow-hidden border-r border-line p-5 lg:flex ${ease} ${
          pastHero ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-full opacity-0"
        }`}
      >
        <Portrait />
        <div className="shrink-0">
          <h2 className="font-display text-2xl font-medium leading-tight tracking-tight">{site.name}</h2>
          <p className="mt-2 text-sm">{site.role}</p>
          <p className="label mt-1.5 flex items-center gap-1.5 text-muted">
            <MapPin size={14} aria-hidden />
            {site.location}
          </p>
        </div>
        <div className="shrink-0"><NavLinks /></div>
        <div className="flex shrink-0 flex-col gap-3 border-t border-line pt-4">
          <div className="flex items-center justify-between">
            <Socials />
            <ThemeToggle />
          </div>
          <Availability />
        </div>
      </aside>

      {/* Mobile / tablet top bar: same behavior, slides down after the hero */}
      <header
        inert={!pastHero}
        className={`glass-light fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-line px-4 lg:hidden ${ease} ${
          pastHero ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <a href="#home" className="font-display text-lg tracking-tight">{site.name}</a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <GlassButton
            type="button"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </GlassButton>
        </div>
      </header>
      {open && pastHero && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-14 z-40 flex max-h-[calc(100dvh-3.5rem)] flex-col gap-5 overflow-y-auto border-b border-line bg-canvas/95 p-5 backdrop-blur-md lg:hidden"
        >
          <NavLinks onNavigate={() => setOpen(false)} />
          <div className="flex flex-col gap-3 border-t border-line pt-4">
            <Socials />
            <Availability />
          </div>
        </div>
      )}
    </>
  );
}