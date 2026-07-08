# Metics graphics system

Reusable icons, product visuals, and background patterns for the marketing site.
Everything is resolution-independent (SVG viewBox / fluid divs), matches the
site design system (paper/ink/accent, Newsreader/Schibsted Grotesk, hairline borders), and
respects `prefers-reduced-motion`.

```tsx
import { PackageIcon, BidComparisonVisual, DotGrid } from '../components/graphics';
```

## Icons (`icons.tsx`)

All icons share `IconProps`: `size?: number` (default 24), `className?: string`,
`strokeWidth?: number` (default 1.5), plus standard SVG props. They inherit
color from `currentColor` — set it via a text color class (`text-accent`,
`text-primary/60`, …). Use anywhere the old emoji strings appeared
(feature cards, nav, footers, lists).

| Export | Meaning |
|---|---|
| `Icon` | Base wrapper (24px viewBox, round stroke) for building new icons |
| `PackageIcon` | RFQ / package of works |
| `ScalesIcon` | Bids / bid levelling |
| `ChartBarIcon` | Comparison / benchmarks |
| `ShieldCheckIcon` | Approvals / governance |
| `DocumentIcon` | Purchase order / document |
| `TrendLineIcon` | Analytics / trends |
| `NetworkIcon` | Suppliers / network |
| `ClockIcon` | Cycle time |
| `CoinsIcon` | Savings |
| `LeafIcon` | Sustainability |
| `AlertIcon` | Risk |
| `SearchIcon` | Audit / search |
| `BuildingIcon` | Construction / GC segment |
| `FactoryIcon` | Manufacturing segment |
| `BoltIcon` | Energy segment |
| `LandmarkIcon` | Public sector segment |
| `ArrowRightIcon`, `PlusIcon`, `MinusIcon`, `CloseIcon`, `QuoteIcon` | UI primitives (links, accordions, dialogs, testimonials) |

## Product visuals (`product-visuals.tsx`)

All visuals share `VisualProps`: `animated?: boolean` (default `true`,
scroll-triggered entrance, auto-disabled under reduced motion) and
`className?: string`. Each fills its container width.

| Export | What it shows | Suggested placement |
|---|---|---|
| `BidComparisonVisual` | RFQ package card with supplier rows and animated bid bars (leading bid in accent) | Home hero side panel, or the "one shared record" tour row |
| `WorkflowVisual` | 4-step flow RFQ → Bids → Award → PO with draw-in connectors | Platform tour "workflow" section, or Home "how it works" band |
| `AnalyticsVisual` | Area chart with gradient fill, axis ticks, serif stat chips (€2.4M / 11.2%) | Spend-analytics feature section |
| `RecordTimelineVisual` | Vertical audit-trail timeline with event cards ending in "PO issued" | Audit/compliance section, or paired with governance copy |
| `TCOVisual` | Stacked TCO bars (base + logistics + delay risk) for three suppliers, with legend | TCO comparison feature row on the Platform page |

Cards (`BidComparisonVisual`, `AnalyticsVisual`, `TCOVisual`) bring their own
white surface, border, and shadow — place them directly on paper or dark
backgrounds. `WorkflowVisual` and `RecordTimelineVisual` are transparent and
sit on light backgrounds; wrap them in your own card if needed.

## Background patterns (`patterns.tsx`)

Decorative only: `pointer-events-none`, `aria-hidden`, default
`absolute inset-0`. Put them inside a `relative overflow-hidden` parent,
behind content.

| Export | Props | What it is / where it fits |
|---|---|---|
| `DotGrid` | `className?`, `light?` | 24px dot grid at ~6% opacity — hero backdrops |
| `HairlineGrid` | `className?`, `light?` | 48px line grid at ~4% opacity — dark CTA bands, section texture |
| `RadialGlow` | `className?`, `position?: 'top' \| 'center' \| 'bottom'` | Accent glow at ~6% opacity — behind hero headlines or dark sections |
| `TopographyLines` | `className?`, `light?` | Subtle SVG contour lines at ~5% opacity — large quiet sections (about, careers) |

`light` switches dots/lines to white for use on `bg-ink` sections.
