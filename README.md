# Reniel Tejones — Portfolio

A minimalist, editorial portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` — homepage (hero, selected work, process, currently exploring)
- `app/work/page.tsx` — full work index
- `app/work/[slug]/page.tsx` — case study template, rendered per project
- `app/about/page.tsx` — bio + toolbox
- `app/experiments/page.tsx` — smaller projects
- `app/contact/page.tsx` — contact links
- `data/projects.ts` — all project + case-study copy lives here; edit this file to update content without touching layout code
- `components/ProjectVisual.tsx` — abstract SVG diagrams standing in for real screenshots (see below)
- `components/Reveal.tsx` — small scroll-reveal wrapper, used sparingly
- `app/globals.css` — color, font, and motion tokens (Tailwind v4 `@theme`)

## Before you ship this

1. **Swap in real project imagery.** `components/ProjectVisual.tsx` currently renders hand-built SVG diagrams (a camera/detection diagram for HallGuard, a dashboard grid for HomeOps, a line illustration for Ocean View Resort) so every page has something to look at. Replace these with real screenshots, photos, or diagrams from each project — drop images into `public/` and swap the `<ProjectVisual />` usage for an `<Image />` component.
2. **Update the contact links** in `components/Footer.tsx` and `app/contact/page.tsx` — the email/GitHub/LinkedIn URLs are placeholders.
3. **Fonts require internet access at build time.** The site uses `next/font/google` (Fraunces + Work Sans), which fetches font files from Google Fonts during `next build`/`next dev`. This works automatically on any machine with normal internet access.
4. Review and adjust the copy in `data/projects.ts` and `app/about/page.tsx` any time a project or your focus changes — that's the single source of truth for case-study content.

## Design notes

- Palette: warm-neutral paper background, near-black ink, a single muted teal accent (`--color-accent`) — no gradients, no card grids.
- Type: Fraunces (serif, display) for headlines, Work Sans for everything else.
- Motion is intentionally minimal — a shared scroll-reveal on project rows and case-study sections, hover states on links and images, nothing else.
