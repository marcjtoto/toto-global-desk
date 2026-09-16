# Publishing workflow

1. Write or translate MDX under `src/content/stories/` or `src/content/cases/`.
2. Fill schema fields: desk, dates, claims, sources. For cases, evidence + timeline + subjectResponse.
3. Keep `status: demo` until the piece is real reporting.
4. Run `npm run dev` and read the article and the opposite language.
5. Run `npm run build`. Fix schema errors; they fail the build.
6. Local git commit when Marc has tested the pages.
7. Do **not** push, attach a remote, or deploy without a separate approval.

## Git rule for this repo

Small logical commits. No force-push. No secrets in content files.

## Replacement of DEMO

When a real story is ready: new MDX, real sources, claim labels that match the file, right-to-reply logged, DEMO kicker removed only then.
