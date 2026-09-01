# Motion — alechemenway.com

**Feel:** mixed · **Scroll-linked:** yes · **Reduced-motion:** honored

The page uses one easing curve for nearly everything and a small, disciplined set of durations. Motion is understated: fades, short upward slides, subtle scale.

## Duration tokens

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 150ms | Micro state changes (color, small hovers) |
| `sm` | 200ms | Transforms, control feedback |
| `md` | 300ms | Default (color/background/border transitions) |
| `lg` | 500ms | Larger reveals, section entrances |

## Easing

One family carries the whole page:

```
--ease-custom: cubic-bezier(0.4, 0, 0.2, 1);   /* 42 uses (Tailwind default "ease-in-out") */
```

Supporting curves defined but rarely used: `ease-out cubic-bezier(0, 0, 0.2, 1)`, `ease-out-quint cubic-bezier(0.22, 1, 0.36, 1)`.

## Transition properties

Standard Tailwind transition groups, all on the custom easing:

```css
transition: color, background-color, border-color, fill, stroke,
            --tw-gradient-* 300ms cubic-bezier(0.4, 0, 0.2, 1);
transition: transform, translate, scale, rotate 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

## Keyframes

```css
@keyframes fade-in  { from { opacity: 0; }                              to { opacity: 1; } }
@keyframes slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes scale-in { from { opacity: 0; transform: scale(0.96); }      to { opacity: 1; transform: none; } }
@keyframes pop      { 0% { transform: scale(0.9); } 60% { transform: scale(1.03); } 100% { transform: scale(1); } }
```

Defaults: `animation-duration: 300ms`, `animation-timing-function: var(--ease-custom)`, `animation-fill-mode: both`.

## Scroll behavior

Scroll-linked reveals are present. Sections enter with a fade + short upward slide as they cross into view.

## Accessibility

Full reduced-motion guard is in place:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
