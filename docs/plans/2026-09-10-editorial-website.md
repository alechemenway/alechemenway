# Editorial Website Implementation Plan

> Execute inline with one writer; independent reviewer handles post-edit review.

**Goal:** Implement the selected A prototype in Next.js with the redesigned Selected Work section and six reading pages.

**Architecture:** Route groups separate the new editorial experience from retained legacy /projects and /work-with-me. Static React server components hold reviewed content, a shared RIA example, header, and reading-page shell. Scoped CSS preserves the approved layout without affecting legacy styles. Existing Next image/font support is reused; no dependencies are added.

**Spec:** Approved prototype in the current task, including SELECTED-WORK-REVIEW.md. Source copied from the local artifact; implementation must preserve current author essays and their draft status.

## Content boundaries

- Synthetic RIA brief clearly labeled; one-advisor, single-session timing qualifier remains.
- Author essay anecdotes originated fiction and were initially draft/noindex. Alec confirmed factual accuracy and authorized live publication on 2026-09-10; publication labels and metadata now reflect that confirmation.
- Preserve existing résumé PDF; make it accessible from About, consistent with agreed career placement.
- Preserve direct legacy routes and their content.

## Steps

- [x] Baseline: isolated codex/editorial-website worktree; static old contracts checked. About HTML check requires absent legacy server.
- [x] Write a new rendered-page contract check and demonstrate failure against the current implementation before building.
- [x] Add editorial route group, shared header/reading shell, home sections, shared RIA example, and six dedicated page routes with metadata.
- [x] Scope approved A CSS; omit B rules and prototype chrome. Reuse current portrait/project assets through next/image.
- [x] Retain legacy page shells; restrict legacy entry animation to legacy routes. Replace superseded homepage assertions with current rendered contracts; retain unchanged legacy component tests.
- [x] Lint, typecheck, Next production build, SSR link/content/robots/evidence checks. Run development preview for visual checks.
- [x] Review desktop/mobile, citation and anchor navigation, résumé, and legacy routes. Independent code review, fix material findings.
- [x] Record release blockers and verification in `docs/editorial-implementation-review.md`.
- [x] Alec approved the Cursor visual review on 2026-09-10: "Cursor review: approved". Alec subsequently authorized live deployment on 2026-09-10.

## Verification

Use existing installed dependencies through a local node_modules symlink. Run `npm run lint`, `npx tsc --noEmit`, `npm run build -- --webpack`, then `node scripts/assert-editorial-site.mjs` against the local Next server. The rendered checker validates ordered homepage sections, route status/links, unique headings/IDs, protected external links, source disclosure, exact author-content paragraphs, draft robots tags, About résumé, and legacy route availability.

A >400-line diff invokes the user's mandatory Cursor review before commit. Complete implementation and automated review first; do not claim committed, pushed, or deployed until those actions occur.
