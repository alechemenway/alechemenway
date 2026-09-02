# About Field Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public About page with the approved Field Notes treatment while preserving the selected portrait opening, existing factual claims, explicit receipt provenance, and one primary conversion action.

**Architecture:** Keep the page as one Next.js App Router server component. Use existing `Wrap`, `Eyebrow`, `Accent`, `Button`, the imported portrait, and Tailwind design tokens; add no dependency, page-level client state, or shared abstraction. Keep `/about` server-visible by bypassing the global route-entry animation for this route and omitting viewport-triggered reveal wrappers. Protect the visitor-visible contract with a rendered-route assertion that inspects `/about` over HTTP rather than coupling to TSX source text.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, `next/image`, Cheerio, Node.js.

**Spec:** `docs/2026-09-02-about-interface-options.md`

## Global Constraints

- The visible headline “I sell enterprise SaaS and self-source pipeline with AI.” must not appear.
- Preserve a single screen-reader-only `<h1>About Alec Hemenway</h1>`.
- Keep the approved opening unchanged: `Field notes / About`, the existing positioning deck, compact `$3M+ · 4 years · 60+` record line, portrait, Minneapolis caption, and studio-portrait marker.
- Keep all existing sales, pipeline, role, timeframe, AI-system, principles, personal-note, and response-time claims unchanged unless the approved prototype explicitly added a qualifier.
- Label résumé receipts `Self-reported context`; label the GitHub receipt `Public artifact`.
- The `$3M+` and role receipts remain self-reported context; the `60+` skills evidence must say it describes artifacts, not customer adoption or commercial usage.
- Keep exactly three field-note chapters and exactly one visually primary CTA to `/work-with-me`; email remains a restrained text link.
- Keep the global header, footer, theme tokens, Work with me page, and all unrelated route behavior untouched; the shared template change applies only when `pathname === '/about'`.
- Add no dependency, backend, form, analytics event, or new client component.
- Preserve server-visible reading order, keyboard focus, reduced-motion behavior, and a no-overflow layout at 375 px.
- Do not stage or commit `.superpowers/`; it contains the throwaway prototype.

---

### Task 1: Rendered About-page contract

**Files:**

- Create: `scripts/assert-about-field-notes.mjs`
- Test: `scripts/assert-about-field-notes.mjs`

**Interfaces:**

- Consumes: an already-running Next.js site at `ABOUT_TEST_URL`, defaulting to `http://127.0.0.1:3010/about`.
- Produces: exit code `0` only when the rendered About page exposes the approved Field Notes information architecture and link provenance.

- [ ] **Step 1: Write the failing rendered-route assertion**

```js
import * as cheerio from 'cheerio'

const url = process.env.ABOUT_TEST_URL ?? 'http://127.0.0.1:3010/about'
const response = await fetch(url)

if (!response.ok) {
  throw new Error(`About page returned HTTP ${response.status}.`)
}

const html = await response.text()
const $ = cheerio.load(html)
const pageText = $('main').text().replaceAll(/\s+/g, ' ').trim()
const expectedChapters = [
  ['Field note 01', 'The selling foundation.'],
  ['Field note 02', 'Sourcing becomes a system.'],
  ['Field note 03', 'The system leaves artifacts.'],
]

if ($('main h1').length !== 1 || !$('main h1').hasClass('sr-only')) {
  throw new Error('About should render one screen-reader-only H1.')
}

if ($('main h1').text().trim() !== 'About Alec Hemenway') {
  throw new Error(
    'About H1 should name Alec without restoring the removed headline.',
  )
}

if (
  pageText.includes('I sell enterprise SaaS and self-source pipeline with AI.')
) {
  throw new Error('The removed About headline should not be visible.')
}

if ($('main [style*="opacity:0"]').length > 0) {
  throw new Error('About content should remain visible without JavaScript.')
}

const chapters = $('[data-field-note]')
if (chapters.length !== expectedChapters.length) {
  throw new Error('About should render exactly three field-note chapters.')
}

expectedChapters.forEach(([kicker, heading], index) => {
  const chapter = chapters.eq(index)
  if (
    !chapter.text().includes(kicker) ||
    chapter.find('h2').text().trim() !== heading
  ) {
    throw new Error(
      `Field-note chapter ${index + 1} is missing or out of order.`,
    )
  }
})

const receipts = $('[data-receipt]')
const expectedReceipts = [
  {
    provenance: 'Self-reported context',
    label: 'Résumé — role and quota history',
    href: '/Alec_Hemenway_Resume_2026_1pg_v4.pdf',
  },
  {
    provenance: 'Self-reported context',
    label: 'Résumé — sourcing outcomes',
    href: '/Alec_Hemenway_Resume_2026_1pg_v4.pdf',
  },
  {
    provenance: 'Public artifact',
    label: 'GitHub — open-source work',
    href: 'https://github.com/alechemenway',
  },
]

if (receipts.length !== expectedReceipts.length) {
  throw new Error('About should render exactly three receipt links.')
}

expectedReceipts.forEach((expected, index) => {
  const actual = receipts.eq(index)
  const rel = new Set((actual.attr('rel') ?? '').split(/\s+/))
  const visibleText = actual.text().replaceAll(/\s+/g, ' ').trim()

  if (
    actual.attr('data-provenance') !== expected.provenance ||
    actual.attr('href') !== expected.href ||
    !visibleText.includes(expected.provenance) ||
    !visibleText.includes(expected.label) ||
    actual.attr('target') !== '_blank' ||
    !rel.has('noopener') ||
    !rel.has('noreferrer')
  ) {
    throw new Error(
      `Receipt ${index + 1} does not match its approved contract.`,
    )
  }
})

if (!pageText.includes('not customer adoption or commercial usage')) {
  throw new Error('The 60+ artifact count needs its approved qualifier.')
}

const primaryActions = $('[data-primary-action="true"]')
if (
  primaryActions.length !== 1 ||
  primaryActions.attr('href') !== '/work-with-me'
) {
  throw new Error('About should expose one primary action to Work with me.')
}

if ($('a[href="mailto:alec@hemenway.io"]').length !== 1) {
  throw new Error('About should retain one restrained email link.')
}

console.log('Rendered About page matches the approved Field Notes contract.')
```

- [ ] **Step 2: Start the current site and verify RED**

Run: `npm run dev -- --hostname 127.0.0.1 --port 3010`

Run in a second shell: `ABOUT_TEST_URL=http://127.0.0.1:3010/about node scripts/assert-about-field-notes.mjs`

Expected: FAIL with `About should render one screen-reader-only H1.` because the production page still exposes the old visible headline.

---

### Task 2: Production Field Notes page

**Files:**

- Modify: `src/app/about/page.tsx`
- Modify: `src/app/template.tsx`
- Test: `scripts/assert-about-field-notes.mjs`

**Interfaces:**

- Consumes: existing design tokens, `Wrap`, `Eyebrow`, `Accent`, `Button`, and `@/images/about-hero-2026.png`.
- Produces: a server-rendered `/about` route with three `[data-field-note]` chapters, three `[data-receipt]` links, and one `[data-primary-action="true"]` link.

- [ ] **Step 1: Keep the About route visible before JavaScript**

```tsx
import { usePathname } from 'next/navigation'

const reduce = useReducedMotion()
const pathname = usePathname()

if (reduce || pathname === '/about') return <>{children}</>
```

Add this About-only exception to `src/app/template.tsx`. Do not wrap About sections in `Reveal`; the complete page must be present without `opacity:0` in server HTML.

- [ ] **Step 2: Replace the cover with the approved portrait-led opening**

```tsx
<section className="pt-[110px] text-center max-[760px]:pt-[62px] max-[760px]:text-left">
  <Eyebrow className="justify-center max-[760px]:justify-start">
    Field notes / About
  </Eyebrow>
  <h1 className="sr-only">About Alec Hemenway</h1>
  <p className="mx-auto mt-[34px] max-w-[720px] text-[21px] leading-[1.55] text-ink-2 max-[760px]:mt-[26px] max-[760px]:text-[18px]">
    Enterprise AE, AI GTM builder, and operator of the systems I use to source,
    qualify, and win pipeline.
  </p>
  <p className="mt-[34px] font-mono text-[11px] leading-[1.8] tracking-[0.04em] text-ink-2 max-[760px]:mt-[26px]">
    The record —{' '}
    <b className="font-medium text-ink">$3M+ self-sourced pipeline</b>
    <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
    <span className="max-[760px]:block max-[760px]:py-[7px]">
      <b className="font-medium text-ink">4 years</b> quota streak
    </span>
    <i className="px-2 text-accent not-italic max-[760px]:hidden">·</i>
    <span className="max-[760px]:block max-[760px]:py-[7px]">
      <b className="font-medium text-ink">60+</b> Claude Code skills
    </span>
  </p>
</section>
```

Use a `relative aspect-[16/8.8]` portrait plate with `object-[50%_21%]` on desktop, `aspect-[4/5]` at 760 px, and the existing image filter. Put `Alec Hemenway · Minneapolis` and `(01) Studio portrait` in a two-part caption immediately below it.

- [ ] **Step 3: Render the three causal field-note chapters**

Each chapter uses this exact semantic shape, with existing approved copy inserted in order:

```tsx
<section
  data-field-note
  className="relative mx-auto mt-[116px] max-w-[720px] max-[760px]:mt-[72px]"
>
  <div aria-hidden className="mb-[30px] h-px w-[72px] bg-accent" />
  <div className="font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
    Field note 01
  </div>
  <h2 className="mt-4 max-w-[16ch] text-[clamp(36px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em] max-[760px]:text-[32px]">
    The selling foundation.
  </h2>
  <p className="mt-[22px] font-serif text-[31px] leading-[1.3] max-[760px]:text-[26px]">
    Before the systems, there was the number—and the discipline to keep carrying
    it.
  </p>
  <aside>
    <b>[Role result]</b> Seller performance establishes the foundation before
    the AI layer enters the record.
  </aside>
  <p>
    I’ve spent the last seven years selling enterprise software, moving from SDR
    to Senior AE at or near 100% of quota every year. What changed in the last
    two is how I source: I stopped treating cold outbound as a volume problem
    and started treating it as a <strong>system problem</strong>.
  </p>
  <p>
    At Staffbase I ranked <strong>#2 of 22 AEs at 97%</strong> of $690K quota,
    generating <strong>$1.4M in self-sourced pipeline</strong> with 75% from
    net-new logos. I multi-threaded into CHRO, CIO, VP IT, Procurement, and CFO
    buying committees, displacing SharePoint and Workplace by Meta through
    competitive ROI positioning.
  </p>
</section>
```

Use the exact approved sequence and text from the spec/prototype: selling foundation and Staffbase; sourcing system and Coram; inspectable artifacts and AI-system details. Keep the margin annotations inline below 1100 px and positioned outside the 720 px text column at larger widths.

- [ ] **Step 4: Add explicit receipt provenance**

```tsx
<a
  data-receipt
  data-provenance="Self-reported context"
  href="/Alec_Hemenway_Resume_2026_1pg_v4.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-[30px] grid grid-cols-[auto_auto_1fr_auto] items-center gap-[11px] border-y border-line py-4 font-mono text-[10px] text-ink-2 uppercase max-[760px]:grid-cols-[6px_1fr_auto]"
>
  <span aria-hidden className="size-[6px] rounded-full bg-accent" />
  <span className="text-accent">Self-reported context</span>
  <span className="text-ink normal-case">Résumé — role and quota history</span>
  <span aria-hidden className="text-ink">
    ↗
  </span>
</a>
```

Repeat for `Résumé — sourcing outcomes`. The third receipt uses `data-provenance="Public artifact"`, `href="https://github.com/alechemenway"`, and label `GitHub — open-source work`.

- [ ] **Step 5: Add three evidence interruptions and operating principles**

Render `4 years`, `$3M+`, and `60+` as large serif evidence sections with their approved qualifiers and alternating desktop alignment. The third qualifier is exactly:

```tsx
<p>
  Published open-source work. The count describes artifacts, not customer
  adoption or commercial usage.
</p>
```

Render `What stays true.` followed by the four existing principles in a numbered vertical list. Use `mt-[123px]` desktop and `mt-[77px]` mobile; offset alternating rows by 72 px on desktop only.

- [ ] **Step 6: Add the personal postscript and single-action closing**

```tsx
<aside className="mx-auto mt-[90px] max-w-[900px] border border-line bg-bg-2 px-[50px] py-[43px] max-[760px]:mt-[66px] max-[760px]:px-7 max-[760px]:py-[30px]">
  <h2 className="font-serif text-[34px] text-accent italic">Off the record.</h2>
  <p className="mt-[18px] max-w-[65ch] text-[16px] leading-[1.75] text-ink-2">
    Outside the pipeline you’ll find me on a golf course, on a trail somewhere,
    or shipping the next skill. I’m looking for the next high-stakes enterprise
    AE seat — ideally at a company building or selling AI.
  </p>
</aside>
```

The closing uses the existing heading and response-time paragraph, one solid `Button` with `data-primary-action="true"`, `href="/work-with-me"`, and `arrow="→"`, followed by one underlined `mailto:alec@hemenway.io` text link.

- [ ] **Step 7: Verify GREEN and full local checks**

Run: `ABOUT_TEST_URL=http://127.0.0.1:3010/about node scripts/assert-about-field-notes.mjs`

Expected: `Rendered About page matches the approved Field Notes contract.`

Run: `node scripts/assert-home-hero-only.mjs && node scripts/assert-home-resume-download.mjs && node scripts/assert-site-chrome.mjs`

Expected: all three existing structural assertions exit `0`.

Run: `npm run lint`

Expected: exit `0` with no lint errors.

Run: `npm run build`

Expected: exit `0`, and `/about` appears in the generated route list.

---

### Task 3: Responsive, review, and release gates

**Files:**

- Modify if required by observed defects: `src/app/about/page.tsx`
- Modify if required by observed defects: `src/app/template.tsx`
- Modify if required by an invalid assertion: `scripts/assert-about-field-notes.mjs`
- Update: `/Users/alechemenway/dev/.session-logs/alechemenway-2026-09-02.html`

**Interfaces:**

- Consumes: the locally passing `/about` implementation from Task 2.
- Produces: responsive visual evidence, independent post-edit review, approved Cursor diff, one Git commit, a GitHub PR, and a verified Vercel production release.

- [ ] **Step 1: Run browser QA against the production build**

Inspect `/about` at 1280×720 and 375×812 in dark and light themes. Confirm one H1, ordered headings, portrait crop, receipt labels and targets, exactly one solid CTA, zero horizontal overflow, zero console errors, and complete content with reduced motion enabled.

- [ ] **Step 2: Run the required post-edit reviewer**

Ask `@reviewer` to audit the changed files for security, correctness, accessibility, maintainability, and repository conventions. Resolve every blocking finding, rerun the route assertion, lint, and build, then record the verdict.

- [ ] **Step 3: Complete the two-minute Cursor visual diff gate**

Run: `cursor-diff`

Review every intended hunk in `src/app/about/page.tsx`, `src/app/template.tsx`, `scripts/assert-about-field-notes.mjs`, the design spec, and this plan. Leave `.superpowers/` unstaged and untouched.

- [ ] **Step 4: Commit and push the reviewed change**

```bash
git add src/app/about/page.tsx src/app/template.tsx scripts/assert-about-field-notes.mjs docs/2026-09-02-about-interface-options.md docs/superpowers/plans/2026-09-02-about-field-notes.md
git commit -m "feat: replace about page with field notes"
git push -u origin codex/about-proof-record-variations
```

- [ ] **Step 5: Create the PR and verify its preview deployment**

Create a PR into `main` with the approved design, provenance contract, and verification evidence. Wait for GitHub and Vercel preview checks. Open the preview `/about`, rerun the rendered-route assertion against its public URL, and confirm the preview is READY.

- [ ] **Step 6: Merge and verify production**

Merge the passing PR. Resolve the merge commit and Vercel production deployment ID, wait for READY, verify `https://www.alechemenway.com/about` with the same rendered-route assertion, confirm HTTP 200 and the production commit, and scan the new deployment for runtime errors.

- [ ] **Step 7: Update the persistent session log**

Append a timestamped milestone that names the commit, PR, production deployment, verification result, and this impact line:

```html
<div class="impact">
  <b>Enables:</b> the public About page now turns Alec’s sales record, AI-native
  sourcing method, and inspectable artifacts into one credible hiring narrative
  with a single next step.
</div>
```

---

## Self-review

- **Spec coverage:** The removed headline and fixed opening are Task 2 Step 1; the three causal chapters are Step 2; explicit receipt provenance is Step 3; evidence qualifiers and principles are Step 4; the personal note and one primary CTA are Step 5; rendered, responsive, reduced-motion, and release verification are Tasks 1–3.
- **Scope control:** The plan modifies only the About page, the shared template's About-only animation branch, its rendered-route assertion, the selected design/spec record, this plan, and the required session log. It adds no dependency or shared abstraction and leaves `.superpowers/`, global chrome, and all other route behavior untouched.
- **Test quality:** The new assertion makes a real HTTP request and inspects rendered HTML. It catches observable visitor-facing regressions in structure, server visibility, receipt destinations, and external-link safety rather than grepping TSX source or mocking the framework.
- **Type consistency:** The DOM hooks are consistently named `data-field-note`, `data-receipt`, `data-provenance`, and `data-primary-action` in the implementation and assertion.
- **Placeholder scan:** The plan contains no deferred implementation markers; every content, semantic, verification, and release requirement is explicit.
