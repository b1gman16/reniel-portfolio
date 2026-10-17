# Reniel Tejones — Portfolio (Chrome Noir)

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GitHub REST + GraphQL.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in GITHUB_TOKEN
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Edit your content
- `data/site.ts` — links, email, portrait path, availability label, GitHub display options (forks, archived, max cards, pinned repos)
- `data/featured-projects.ts` — Bayfront and HallGuard (uncomment `image`, add `links`, update `note`)
- `data/technologies.ts` — tools strip
- Photos: `public/images/portrait.jpg`, `public/images/bayfront/`, `public/images/hallguard/`

## GitHub credentials
- Repos work without a token (60 req/hr/IP, cached 30 min). A token raises the limit.
- The contribution heatmap **requires** a token (GraphQL is authenticated). Create a token at GitHub → Settings → Developer settings → Personal access tokens. A classic token with only `read:user` is enough for public contributions; do not grant more. Private contributions show only if your profile setting "Include private contributions" is on and the API returns them.
- Put it in `GITHUB_TOKEN` (server-only; never `NEXT_PUBLIC_`). `.env*` files are git-ignored.

## Deploy to Vercel
1. Push to GitHub, import the repo in Vercel.
2. Add env vars `GITHUB_USERNAME` and `GITHUB_TOKEN` (Production + Preview).
3. Deploy. GitHub data refreshes every ~30 min via ISR (`revalidate = 1800`) with no redeploy.

## Notes
- API endpoints: `GET /api/github/repos`, `GET /api/github/contributions`.
- Heatmap tooltips work on hover, keyboard focus, and tap.
- `lucide-react` is pinned to 0.468.x; bump if you want newer icons.
