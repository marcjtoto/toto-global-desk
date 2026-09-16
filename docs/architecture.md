# Architecture

ToTo Global Desk is a static Astro 7 site. There is no CMS and no database in v1.

## Runtime

- Node 22+ to build
- Output: HTML, CSS, JS in `dist/`
- Content: MDX collections compiled at build time

## Trees

| Path | Role |
| --- | --- |
| `src/pages/[lang]/` | Localized routes |
| `src/content/stories/` | Articles (`en/`, `pt-br/`) |
| `src/content/cases/` | Investigation dossiers |
| `src/content.config.ts` | Zod schemas |
| `src/i18n/` | Chrome copy and static pages |
| `src/components/` | Masthead, claims, sources, evidence, timeline |
| `src/styles/global.css` | Newsprint tokens, dark/light |

## Routing

- `/` → `/en/`
- `/en/...` English
- `/pt-br/...` Português (Brasil)
- Language switcher keeps the rest of the path

## Search

- Dev/preview: in-page filter on `/[lang]/search`
- Production build: Pagefind index in `dist/` via `npm run build`

## What is intentionally missing

- Auth, comments, analytics, tip encryption, maps, paywall
- Any connection to FiveM, Cloudflare Workers, or prior ToTo sites
