# Component Inventory — alechemenway.com

Measured from 358 elements. Library detected: **Tailwind CSS** (0.87 confidence, 83% class density). No component framework (Radix/shadcn) signals.

## Buttons

Ghost / outline style. No filled buttons on the page.

```css
background: transparent;
color: #9c968b;              /* ink-muted */
border: 1px solid rgb(255 255 255 / 0.1);   /* --line */
border-radius: 9999px;       /* full pill */
padding: 0;
font-size: 16px;
font-weight: 400;
```

- Shape: pill (fully rounded).
- Weight: light borders, no shadow, no fill. Reads as a quiet secondary action.
- CTA density is deliberately low; the site leans on links, not buttons.

## Links

23 instances. The primary interactive element.

```css
color: #9c968b;              /* muted at rest */
font-size: 12.5px;           /* nav scale */
font-weight: 400;
transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

- Hover shifts color toward `#f4f1eb` (ink) or `#e8b04b` (accent gold).

## Navigation

Single sticky header.

```css
position: sticky; top: 0;
z-index: 50;
backdrop-filter: blur(12px);       /* backdrop-blur-md */
background: rgb(10 10 11 / 0.6);   /* bg/60 */
border-bottom: 1px solid transparent;
color: #f4f1eb;
transition: colors 300ms;
```

- Translucent, blurred, pinned. Border stays transparent until scroll.

## Footer

```css
color: #9c968b;
padding: 40px 0;
font-size: 12.5px;
```

## Cards / Surfaces

- Surface color `#16151a` on `#0a0a0b` background.
- Corner radius token `--radius-2xl: 16px`.
- Flat: no box-shadow anywhere on the page. Depth comes from gradient glows and 10%-white hairlines, not elevation.

## Layout system

- **21 grid containers, 47 flex containers.**
- Container: `max-width: 1200px`, `padding: 32px`, centered.
- Grid columns in use: 2-col (11×), 3-col (7×), 4-col (1×), 1-col (1×).
- Common grid template: two equal `556px` columns, `gap: 24px`.
- Flex: mostly `row / nowrap` (26×) and `column / nowrap` (13×).
- Gap scale: 6, 8, 10, 12, 14, 16, 24, 28px.

## Z-index map

Only 3 values across 2 layers — restrained stacking.

| Layer | z-index | Element |
|-------|---------|---------|
| sticky | 50 | header |
| base | 1–2 | absolute background layer, content wrapper |

## Icons

- 1 unique SVG, outlined style, `sm` size, `currentColor` fill.
- Icon usage is minimal; typography and gradient carry the design.

## Imagery

- 1 image, `object-fit: cover`, square corners, 3:2 landscape.
