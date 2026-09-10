# Editorial website implementation review

Implemented locally on `codex/editorial-website` in `/private/tmp/alechemenway-editorial`, based on `9976706`. Preview: http://127.0.0.1:4318 . The original main checkout is unchanged apart from its pre-existing untracked `.superpowers/` directory. Alec approved the Cursor review on 2026-09-10. Remote publication remains pending separate authorization.

## Result

The selected A design is now a Next.js homepage plus About, three work cases, and two essay routes. Selected Work uses the approved aligned rows. Shared React server components preserve source citations, synthetic labels, and the single-advisor/single-session result. The current author essay paragraphs match recorded fixtures exactly. Career availability and the existing résumé live on About. Legacy `/projects` and `/work-with-me` retain their previous content and shell, with their existing animation isolated in a route group.

Existing fonts, portraits, project image, dependencies, and analytics are reused. The editorial CSS is scoped to the new shell. The page-height and list-reset issues found during review are fixed. No new dependencies, auth, database, deployment configuration, or external integration was introduced.

## Verification

- New rendered contract first failed against the old homepage (missing the approved navigation), then passed after implementation.
- `node scripts/assert-editorial-site.mjs`: PASS, nine routes, links/anchors, one H1 and unique IDs, exact essay paragraphs, draft robots, evidence qualifications, résumé response, and legacy routes.
- `node scripts/assert-about-animation-logic.mjs`: PASS for the retained legacy component.
- `npm run lint`: exit 0; one pre-existing anonymous-default-export warning in `.design/tailwind.config.js`. Browserslist also reports stale compatibility data; dependencies were not changed.
- `tsc --noEmit`: PASS. Initial failure was stale generated dev route types from the old root page; restarting with a fresh dev cache resolved it.
- `npm run build -- --webpack`: PASS after final fixes; all page routes statically prerendered.
- `git diff --check`: PASS.
- Browser: desktop 1440px, phone 390px, narrow 320px; homepage and all six detail routes fit the narrow viewport. Hero and About portraits plus the Rep Coaching image load. Citation click reopens the collapsed sample source. Wrapper background covers the full content height. The acceptance checklist has visible disc markers.
- Independent reviewer: final verdict ship, no remaining findings. Browser/build results were verified by the implementing agent; the reviewer independently reviewed the source.

Superseded homepage/navigation/resume/old-About assertion scripts are replaced by rendered contracts for the approved experience, rather than retaining assertions that require the retired hero-only layout. Existing legacy About animation assertions remain.

## Before commit and publication

1. Cursor review complete: Alec explicitly approved the visual pass on 2026-09-10 ("Cursor review: approved"). The pre-commit review gate is satisfied.
2. The two author-edited essay anecdotes originated in explicitly fictional draft slots. They remain labeled Essay draft with noindex/nofollow metadata. Before public release, Alec must verify those incidents and durations or approve replacement wording. Noindex is an indexing preference, not an access-control mechanism.
3. The RIA timing is user-reported and narrowly qualified; it is not a firm-wide benchmark. Reference willingness/permission remains a publication check. The portfolio-access pilot is a recommendation, not a completed pilot.
4. Deployment requires explicit current authorization. Keep push/merge that triggers Vercel publication pending that authorization.

## Files changed

- `docs/plans/2026-09-10-editorial-website.md`
- `scripts/assert-about-field-notes.mjs`
- `scripts/assert-editorial-site.mjs`
- `scripts/assert-home-hero-only.mjs`
- `scripts/assert-home-resume-download.mjs`
- `scripts/assert-site-chrome.mjs`
- `src/app/(legacy)/layout.tsx`
- `src/app/(legacy)/projects/page.tsx`
- `src/app/(legacy)/template.tsx`
- `src/app/(legacy)/work-with-me/page.tsx`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/page.tsx`
- `src/app/(site)/work/dailyok/page.tsx`
- `src/app/(site)/work/rep-coaching/page.tsx`
- `src/app/(site)/work/ria/page.tsx`
- `src/app/(site)/writing/acceptance-criteria/page.tsx`
- `src/app/(site)/writing/workflow/page.tsx`
- `src/app/about/page.tsx`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/components/editorial/AboutAlec.tsx`
- `src/components/editorial/AcceptanceCriteriaEssay.tsx`
- `src/components/editorial/Connect.tsx`
- `src/components/editorial/DailyOKCase.tsx`
- `src/components/editorial/EditorialFrame.tsx`
- `src/components/editorial/EditorialHeader.tsx`
- `src/components/editorial/Introduction.tsx`
- `src/components/editorial/PersonalIntroduction.tsx`
- `src/components/editorial/Perspective.tsx`
- `src/components/editorial/ReadingPage.tsx`
- `src/components/editorial/RepCoachingCase.tsx`
- `src/components/editorial/RiaCase.tsx`
- `src/components/editorial/RiaExample.tsx`
- `src/components/editorial/SelectedThinking.tsx`
- `src/components/editorial/SelectedWork.tsx`
- `src/components/editorial/WorkflowEssay.tsx`
- `src/styles/editorial.css`
- `tests/content/acceptance-criteria.json`
- `tests/content/workflow.json`
- `docs/editorial-implementation-review.md` (this record).

## Files intentionally not touched

- Existing `public/` assets and résumé PDF, images, dependencies and lockfile, provider code, legacy components, and deployment configuration.
- Original main checkout and approved prototype artifacts.

## Follow-up needed

Cursor review is approved. Resolve the essay publication checks and authorize deployment before publishing.
