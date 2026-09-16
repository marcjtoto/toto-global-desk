# Approval queue

Workers and Hermes stop here. Marc moves `publication_ready` → published (test, then optionally commit/deploy).

| ID | Slot | Beat | Lang | Status | Files | Risk | Preview |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ED-001 | morning 2026-09-16 | all five | pt-br+en | publication_ready | `src/content/stories/{pt-br,en}/` (7 keys) + `editorial/editions/2026-09-16_001.md` | High (STF) | `npm run preview` → http://127.0.0.1:4321/pt-br/ |

Statuses: `intake` · `research` · `draft` · `factcheck` · `publication_ready` · `published` · `killed`

**Gate:** type **APPROVE EDITION 001** to allow git push / Pages. Until then: local preview only.

**Current:** 1 edition-ready · 0 breaking-tagged · 1 intake (watch changes). Last watch note: Home | Homeland Security
| WATCH-20260916-0409-d02969 | watch | immigration | — | intake | `https://www.dhs.gov` | source-change only — not a story | research `https://www.dhs.gov` (2026-09-16 04:09 CDT) |

