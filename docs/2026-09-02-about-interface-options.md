# About page — interface directions

**Date:** 2026-09-02

**Status:** Field Notes selected for production by Alec on 2026-09-02.

**Scope:** Approved production replacement for `src/app/about/page.tsx`; the global site shell remains unchanged.
**Source:** [Live About page](https://www.alechemenway.com/about) and `src/app/about/page.tsx`.

## Verdict

**Selected:** Direction 3, **The Proof Record**, rendered as the **Field Notes** variation. Keep its portrait-led opening exactly as approved, use the tighter post-portrait rhythm, retain the dark/amber visual system and existing factual claims, label résumé receipts as self-reported context and GitHub as a public artifact, then end with one decision CTA.

The live page already looks distinctive. Its weakness is the visitor's interpretation burden: four long biography paragraphs hold a coherent causal story, but the reader has to reconstruct that story. The redesign should clarify that structure rather than add a new visual motif.

## Requirements and constraints

### Problem to solve

Help a prospective hiring leader, revenue operator, technical collaborator, or partner answer four questions:

1. Who is Alec?
2. What is distinct about how he works?
3. What evidence supports that position?
4. What should I do next?

### Existing inputs to preserve

- Positioning: enterprise SaaS AE who self-sources pipeline with AI.
- Portrait and Minneapolis identity line.
- Proof points: `$3M+` self-sourced pipeline, `4 years` quota streak, and `60+` Claude Code skills.
- Role-specific context from Coram, Staffbase, and Jamf.
- The operator method: buyer-signal research, intent data, account prioritization, first-touch outbound, skills, MCPs, evals, and memory.
- Four operating principles.
- Existing destinations: Work with me, résumé, Projects, GitHub, LinkedIn, and email.
- Dark-first black, warm white, amber, serif-emphasis, and mono-instrument-label visual language.

### Boundaries

- Do not invent, strengthen, or relabel claims as independently verified.
- A receipt link appears only when a real public or résumé artifact supports it.
- Do not add a backend, form, personalization service, or new dependency.
- Do not turn About into a duplicate of the Work with me page.
- Keep the page readable without JavaScript and under reduced-motion preferences.

---

## Direction 1 — The Executive Proof Sheet

### Intent

Minimize interface surface and time-to-credibility. The page behaves like a one-screen executive brief with optional evidence disclosures.

### Interface signature

```ts
type AboutBriefProps = {
  identity: {
    name: string
    location: string
    portrait: ImageAsset
  }
  positioning: {
    headline: string
    explanation: string
  }
  proof: [ProofClaim, ProofClaim, ProofClaim]
  actions: {
    primary: LinkAction
    resume: LinkAction
    linkedin: LinkAction
    github: LinkAction
  }
}

type ProofClaim = {
  value: string
  label: string
  context: string
  evidence?: {
    kind: 'public-source' | 'self-reported-context'
    label: string
    href?: string
  }
}
```

```text
AboutBrief
├── MinimalMasthead
├── IdentityLockup
│   ├── NameLocation
│   └── Portrait
├── PositioningStatement
├── ProofStrip
│   └── ProofDisclosure × 3
├── PrimaryAction
└── UtilityLinks
```

### States and actions

- Default: identity, headline, explanation, three proof claims, and one primary action are visible.
- Expanded: selecting one proof claim reveals its existing role-specific context. Only one disclosure opens at once.
- Mobile: expanded context becomes an inline region or bottom sheet with explicit close behavior.
- Primary action: **Work with me**.
- Secondary action: **Download résumé**.
- Utility links: LinkedIn and GitHub.

### Visitor journey

A visitor reads the position, sees three credibility signals in the same visual field, opens only the claim they care about, then chooses Work with me or the résumé. They never have to parse a biography to find the case.

### What it hides

- Role chronology.
- Detailed system mechanics.
- The principle grid.
- Repeated contact prompts.
- Evidence classification, responsive disclosure behavior, and focus management.

### Trade-offs

This is the simplest interface and the fastest route to a decision. Exactly three proof objects act as a strong editorial guardrail.

It is also the least human and least differentiated from the newly simplified homepage. If About becomes another positioning headline plus proof strip, the route earns little reason to exist. The design becomes easy to misuse if disclosures grow into essays or if multiple CTAs receive equal weight.

### Wireframe

```text
┌─────────────────────────────────────────────────────────────┐
│ ALEC HEMENWAY                                      PROJECTS │
│                                                             │
│ Alec Hemenway · Minneapolis                  ┌─────────────┐ │
│                                              │             │ │
│ I sell enterprise SaaS and                   │   STUDIO    │ │
│ self-source pipeline with AI.                │  PORTRAIT   │ │
│                                              │             │ │
│ Enterprise AE, AI GTM builder, and operator  └─────────────┘ │
│ of the systems I use to source and win.                     │
│                                                             │
│  $3M+                  4 years                 60+            │
│  pipeline              quota streak           skills         │
│  [expand]              [expand]               [expand]       │
│                                                             │
│  ─ One evidence row appears here at a time ─                │
│                                                             │
│  [ Work with me → ]    Résumé   LinkedIn   GitHub            │
└─────────────────────────────────────────────────────────────┘
```

---

## Direction 2 — The Decision Router

### Intent

Maximize flexibility across visitor intent. The page maintains one identity and one evidence library, then changes the ordering and next action for three decision contexts.

### Interface signature

```ts
type VisitorIntent = 'hiring-leader' | 'revenue-operator' | 'technical-builder'

type Evidence = {
  id: string
  claim: string
  support: string
  source?: { label: string; href: string }
}

type IntentRoute = {
  id: VisitorIntent
  label: string
  decisionQuestion: string
  evidenceIds: string[]
  principleIds: string[]
  primaryAction: Action
  secondaryActions: Action[]
}

type AboutRouterProps = {
  identity: Identity
  sharedProof: Evidence[]
  routes: IntentRoute[]
  fullStory: RichText
  principles: Principle[]
}
```

```text
AboutRouter
├── IdentityAnchor
│   ├── Positioning
│   ├── StudioPortrait
│   └── SharedProofStrip
├── IntentRouter
│   ├── HiringLeaderChoice
│   ├── RevenueOperatorChoice
│   └── TechnicalBuilderChoice
├── DecisionPanel
│   ├── DecisionQuestion
│   ├── OrderedEvidenceStack
│   ├── RelevantPrinciples
│   └── IntentSpecificActions
├── FullStoryDisclosure
└── PersistentRouteSwitcher
```

### States and actions

- Unselected: invariant identity, global proof, and three intent choices.
- Selected: a route-specific decision question, evidence order, and CTA.
- Expanded: one evidence item reveals its existing detail or source.
- Switched: another route reorders the same evidence without navigation.
- Shareable: optional `?for=` state.
- Fallback: full linear story remains readable without JavaScript.

The routes change emphasis, never facts:

- Hiring leader: quota consistency, self-sourced pipeline, enterprise buying committees, résumé, then Work with me.
- Revenue operator: pipeline proof, the shift from volume to systems, and the operating method, then Projects.
- Technical builder or partner: skills, eval discipline, open-source work, and cross-functional fluency, then GitHub.

### Visitor journey

A visitor sees the core position first, selects the decision they are making, and receives a bounded evidence stack plus a matching next action. They can switch intent without losing the stable identity frame.

### What it hides

- One canonical evidence registry shared across all routes.
- Route-specific ordering and CTA priority.
- Responsive tab or segmented-control semantics.
- Accessible keyboard and no-JavaScript behavior.
- Optional shareable state and analytics.

### Trade-offs

This design makes the page more relevant to several audiences while preventing three separate About pages. It is the most flexible interface.

It also asks the visitor to classify themselves before the site has evidence that audience confusion is a real problem. Some visitors span categories, and the interaction can read as funnel machinery on a personal site. It becomes shallow if each route accumulates bespoke copy instead of recomposing shared evidence.

### Wireframe

```text
┌──────────────────────────────────────────────────────────────┐
│ ABOUT                                                        │
│ I sell enterprise SaaS and self-source pipeline with AI.     │
│ Enterprise AE · AI GTM builder · operator         [PORTRAIT] │
│ $3M+ pipeline      4-year quota streak      60+ skills       │
├──────────────────────────────────────────────────────────────┤
│ WHAT ARE YOU HERE TO DECIDE?                                 │
│ [ I’m hiring ] [ I run revenue ] [ I’m evaluating a builder ]│
├──────────────────────────────────────────────────────────────┤
│ CAN ALEC OWN AN ENTERPRISE NUMBER AND CREATE HIS OWN COVERAGE?│
│ 01  Four-year quota streak                         [inspect]  │
│ 02  $3M+ self-sourced pipeline                     [inspect]  │
│ 03  Enterprise buying-committee experience         [inspect]  │
│ [ See what I’m looking for → ]  [ Résumé ↓ ]  [ Email ↗ ]   │
├──────────────────────────────────────────────────────────────┤
│ Read the full story +        What stays true +                │
└──────────────────────────────────────────────────────────────┘
```

---

## Direction 3 — The Proof Record

### Intent

Optimize for earned trust. The page becomes a restrained documentary record with one causal reading order:

**proven seller → sourcing became a system problem → the operating system now compounds → decide whether to talk**

### Interface signature

```ts
type AboutProofRecord = {
  identity: {
    name: string
    location: string
    portrait: ImageAsset
    positioning: string
  }
  headlineProof: ProofPoint[]
  chapters: Array<{
    sequence: string
    title: string
    claim: string
    evidence: EvidenceItem[]
    method: string
    artifactActions?: Action[]
  }>
  principles: Principle[]
  personalNote: string
  decisionPrompt: {
    heading: string
    body: string
    primaryAction: Action
    secondaryActions: Action[]
  }
}
```

```text
AboutProofRecord
├── RecordCover
│   ├── PositioningStatement
│   ├── PortraitWithCaption
│   └── HeadlineProofStrip
├── CausalRecord
│   ├── 01 Proven selling discipline
│   ├── 02 Sourcing became a system problem
│   └── 03 The operating system now compounds
├── OperatingStandards
├── HumanFootnote
└── DecisionPrompt
```

Every chapter has the same small interface:

```text
CLAIM
One bounded capability statement.

EVIDENCE
Metric, role, timeframe, and relevant qualifier.

METHOD
What Alec did that produced or supported the outcome.

RECEIPT
A real résumé, project, or public artifact link when one exists.
```

### States and actions

- Desktop: positioning and portrait remain in a quiet left rail while the record advances on the right.
- Mobile: the same record becomes a single linear column; the proof strip follows the headline.
- Public evidence: show a contextual View receipt link.
- Résumé evidence: label it plainly and link the résumé; do not imply independent verification.
- Reduced motion: the entire record remains visible and readable.
- Primary action: the existing Work with me path or email decision CTA.
- Secondary actions: résumé and Projects; GitHub sits beside the skills receipt.

### Visitor journey

The first screen preserves the current position, portrait, and three proof points. The first chapter establishes that the sales foundation predates the AI layer. The second shows the causal change from volume to a repeatable sourcing system. The third makes the AI work concrete and inspectable. The principles then read as operating standards, not isolated slogans, before a single closing decision.

### What it hides

- Repeated biography details and role chronology.
- The relationship between aggregate and role-specific metrics.
- Evidence provenance and appropriate receipt treatment.
- Responsive coordination between portrait, chapters, and proof objects.
- The distinction between outcomes, methods, and inspectable artifacts.

### Trade-offs

This interface asks more reading than the executive sheet but less interpretation than the live page. Each claim is adjacent to evidence and method, which helps avoid implying that every sales outcome was caused by publishing AI skills.

The fixed reading order is less flexible than the router. It can also become résumé-like if chronology dominates. Causal chapter titles and method blocks should keep the subject on present capability. Cap the record at three chapters; more would recreate the current density under new labels.

### Wireframe

```text
┌───────────────────────┬─────────────────────────────────────┐
│                       │ ABOUT / THE PROOF RECORD             │
│ [STUDIO PORTRAIT]     │                                     │
│                       │ I sell enterprise SaaS and           │
│ Alec Hemenway         │ self-source pipeline with AI.        │
│ Minneapolis           │                                     │
│                       │ $3M+        4 years       60+         │
│ Enterprise SaaS AE    │ pipeline     quota streak skills     │
│ + AI GTM builder      ├─────────────────────────────────────┤
│                       │ 01 / PROVEN SELLING DISCIPLINE      │
│ [Download résumé]     │ CLAIM                               │
│                       │ EVIDENCE                            │
│                       │ METHOD                    [Résumé →] │
│                       ├─────────────────────────────────────┤
│                       │ 02 / SOURCING BECAME A SYSTEM       │
│                       │ CLAIM → EVIDENCE → METHOD           │
│                       ├─────────────────────────────────────┤
│                       │ 03 / THE SYSTEM NOW COMPOUNDS       │
│                       │ CLAIM → EVIDENCE → METHOD           │
│                       │                         [GitHub →]   │
├───────────────────────┴─────────────────────────────────────┤
│ OPERATING STANDARDS                                         │
│ Self-source / Consistency / Receipts / Systems              │
├─────────────────────────────────────────────────────────────┤
│ THINK WE’D WORK WELL TOGETHER?                              │
│ [See what I’m looking for →]  [Résumé ↓]                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Comparison

The Executive Proof Sheet has the smallest interface and makes correct use easiest: one position, three claims, one action. Its cost is page depth. It hides so much narrative that About risks becoming a second homepage, especially now that the homepage itself has been simplified.

The Decision Router is the most general-purpose. It supports several visitor intentions without separate pages, but the interface and internal model are larger than the proven need. The route selector also makes the visitor do work before receiving value. Adopt it only if analytics or interviews show that distinct audiences consistently fail to find their evidence path.

The Proof Record has the best depth for the current content. A small, repeated chapter interface hides claim provenance, role context, and system mechanics while keeping the causal story visible. It is slightly slower to scan than the proof sheet, but the headline proof strip covers that weakness. It is easier to use correctly than the router because it has one canonical reading order and no audience-specific copy surface.

## Synthesis — recommended page contract

### Keep

- The current hero headline, lede, portrait, location caption, and visual system.
- The three-item proof strip, placed entirely above the fold or immediately after the hero.
- The four current principles and personal note.
- The existing Work with me, résumé, Projects, GitHub, LinkedIn, and email destinations.

### Change in a future implementation

1. Replace the four-paragraph Info block with exactly three Proof Record chapters.
2. Recompose existing sentences into Claim, Evidence, Method, and Receipt fields; do not create new claims.
3. Keep the portrait as the stable visual anchor while the record scrolls on desktop; use normal flow on mobile.
4. Attach résumé evidence to sales-history claims and GitHub or Projects evidence to the 60+ skills claim.
5. Present the principles as a concise operating-standard strip after the record.
6. Keep the human footnote, but remove the adjacent four-link button cluster.
7. End with one decision band: Work with me as primary, résumé as secondary. Leave email, LinkedIn, and GitHub in contextual or global navigation positions.

### Success criteria for a future prototype

- A visitor can state Alec's role, differentiation, and all three proof points after a ten-second scan.
- Every major capability statement has adjacent evidence and a method explanation.
- No unsupported verified or receipt language appears.
- The full page contains one visually primary conversion action.
- The About and Work with me routes have distinct jobs: About establishes evidence; Work with me establishes opportunity fit.
- Keyboard, reduced-motion, no-JavaScript, and 375 px layouts preserve the complete reading order.

## Decision

**Selected: C — Proof Record, Field Notes variation.** Borrow Direction 1's compact proof strip. Keep the router out until visitor evidence justifies it.

The approved production version has three additional constraints:

1. Remove the visible “I sell enterprise SaaS and self-source pipeline with AI.” headline while retaining a screen-reader-only `About Alec Hemenway` H1.
2. Preserve the approved portrait-led opening exactly: centered field-notes eyebrow, positioning deck, compact record line, 16:8.8 desktop portrait plate, 4:5 mobile portrait plate, and two-part portrait caption.
3. Keep the roughly 20% tighter post-portrait rhythm and explicit receipt provenance: `Self-reported context` for résumé-backed role claims and `Public artifact` for GitHub-backed open-source work.

Alec authorized implementation, push, and production deployment on 2026-09-02.
