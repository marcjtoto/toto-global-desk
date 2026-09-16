# Content operations — ToTo Global Desk

Timezone for editions: **America/Chicago**.
Publishing gate: **Marc only**. Hermes and workers may draft, preview, and queue. They may not `git push`, deploy, or set `status: published`.

All unsourced material is **SAMPLE** or **DEMO**. A social post is a lead, not proof.

## What the site actually is

**Format:** static Astro 7 + **MDX content collections**. No CMS, no database, no API.

| Kind | Disk path | URL |
| --- | --- | --- |
| Stories | `src/content/stories/{en\|pt-br}/*.mdx` | `/{lang}/article/{slug}/` |
| Case files | `src/content/cases/{en\|pt-br}/*.mdx` | `/{lang}/investigations/{slug}/` |
| Drafts (not on site) | `editorial/drafts/` | none until moved |

Schema: `src/content.config.ts`. Invalid frontmatter **fails `npm run build`**.

Pair languages with the same `translationKey`. PT-BR first, then English.

## How the homepage is generated (do not restyle)

`src/pages/[lang]/index.astro` via `homepageSlots()` in `src/lib/content.ts`:

| Slot | Rule |
| --- | --- |
| Lead | `featured: true`, else newest story |
| Breaking bar | first story with `breaking: true` |
| Mid cards | next two stories after the lead |
| Live updates | four newest stories |
| Most read | lead + next two (no analytics yet) |
| Data Lab / video / art | original SVGs in `public/art/` — not agency photos |
| Timestamps | `published` (ISO date on cards; `MM-DD` on live rail) |
| Tags | kicker + desk |

Desks (`desk` enum): `investigations`, `brazil`, `usa`, `world`, `corruption-watch`, `war-watch`, `data-lab`, `opinion`, `breaking`.

Primary beats map to desks/beats:

| Beat | `beat` field | Default `desk` |
| --- | --- | --- |
| STF Crisis Watch | `stf-crisis` | `brazil` |
| Corruption Watch | `corruption` | `corruption-watch` |
| Immigration Watch | `immigration` | `usa` or `world` |
| Trump & White House | `trump-white-house` | `usa` |
| War & Security | `war-security` | `war-watch` |

## Required story fields

**On disk (schema):** `title`, `dek`, `desk`, `published`, `authors`, `lang`, `translationKey`, `claims[]`, `sources[]`.

**Defaults:** `status: demo`, `kicker: DEMO`, `sample: true`.

**Edition extras (optional until a real piece):** `beat`, `editionStatus` (`breaking` / `developing` / `verified-update` / `monitoring`), `editionSlot` (`morning` / `midday` / `evening` / `breaking`), `whatHappened`, `whyItMatters`, `whatChanged`, `whatToWatch`, `rightOfReply`, `correctionLog[]`, `mediaNeeds[]`.

**In the MDX body (required for any non-SAMPLE story):** what happened, why it matters, what changed, timeline, confirmed vs unconfirmed, sources, right-of-reply, corrections.

Claim labels: Verified, Strongly Supported, Reported/Unconfirmed, Disputed, False/Misleading, Unknown.

Source types: `primary` | `secondary` | `lead`.

## Pipeline (enter → validate → preview → queue → Marc)

1. **Scan** approved watchlists only (`editorial/watchlists/`). No random social firehose.
2. **Detect** material change (new official document, on-record statement, independent corroboration).
3. **Kanban** a row in `editorial/queue/APPROVAL_QUEUE.md`.
4. **Draft** in `editorial/drafts/` from `editorial/templates/story.mdx`. PT-BR first.
5. **Ledger** sources in `editorial/ledgers/{id}.md`.
6. **Validate:** schema + evidence labels + red-team (strongest innocent explanation).
7. **Preview locally only:**
   ```bash
   cd E:/totodev/toto-global-desk
   npm run dev
   ```
   Open http://127.0.0.1:4321/pt-br/ and the article URL. Drafts are **invisible** until copied into `src/content/stories/`.
8. **Queue** as `publication_ready` in the approval file.
9. **Marc** moves the file into `src/content/stories/`, sets `sample: false` only when sourced, tests, then may commit/deploy.

**Never:** push, Pages deploy, or `status: published` without Marc.

## Daily editions (America/Chicago)

| Clock | Edition |
| --- | --- |
| 07:00 | Morning Briefing |
| 13:00 | Midday Update |
| 19:00 | Evening Desk Report |
| as needed | Breaking — only if verified and material |

Each edition packet (in `editorial/editions/YYYY-MM-DD-{slot}-SAMPLE.md` until sourced):

- 1 lead
- 3–5 latest-update cards
- 1 desk briefing from the five primary beats
- What changed today
- What to watch next
- Media needs + rights notes
- PT-BR then EN

## Report to Marc (07:00 / 13:00 / 19:00)

One short note:

- edition ready count
- breaking items
- stories needing approval
- evidence conflicts / legal risk
- content IDs / files
- preview: `npm run dev` → http://127.0.0.1:4321/pt-br/

## 30–60 minute automation (ARMED — queue only)

Schedule (America/Chicago, machine local):

- every 45 minutes: `editorial/scripts/scan-watchlists.py scan`
- 07:00 / 13:00 / 19:00: `... report`

Behavior: hash approved watchlist homepages. On change, add an **intake** row. Does **not** write stories, does **not** `git push`, does **not** deploy. First run stores a baseline only.

## Folders

```
editorial/drafts/          not published
editorial/queue/           Marc's gate
editorial/watchlists/      approved sources
editorial/ledgers/         source ledgers
editorial/editions/        daily packets
editorial/calendar/        SAMPLE calendar
editorial/templates/       MDX template
src/content/stories/       live site only after Marc
src/content/cases/         live dossiers only after Marc
```
