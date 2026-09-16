# ToTo Global Desk

Independent international news, intelligence and investigations.

Public DEMO: https://marcjtoto.github.io/toto-global-desk/en/

See [CONTENT_OPERATIONS.md](CONTENT_OPERATIONS.md) for how stories enter the site. Drafts in `editorial/` are not published until Marc approves.

## Requirements

- Node.js 22.12 or newer
- npm

## Commands

```bash
cd E:/totodev/toto-global-desk
npm install
npm run dev
```

Open http://127.0.0.1:4321/ (redirects to `/en/`). Portuguese: http://127.0.0.1:4321/pt-br/

```bash
npm run build
npm run preview
```

`build` also runs Pagefind against `dist/` for full-text search.

## What is in the box

- Bilingual homepage (EN / PT-BR)
- Desks: Investigations, Brazil, USA, World, Corruption Watch, War Watch, Data Lab, Opinion
- Article pages with claim labels and source cards
- Case-file pages with evidence log and timeline
- Methodology, corrections, contact (no fake anonymity)
- Dark / light reading mode
- Client search plus Pagefind after build

## Docs

- [architecture.md](docs/architecture.md)
- [editorial-standards.md](docs/editorial-standards.md)
- [publishing-workflow.md](docs/publishing-workflow.md)
- [deployment-options.md](docs/deployment-options.md)

## Hard rules

- No domain purchase, paid account, or public deploy without Marc’s approval.
- Do not mix this folder with `totodev-rp` or the live FiveM server.
