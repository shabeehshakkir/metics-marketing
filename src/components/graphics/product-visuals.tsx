/**
 * Metics product visuals — abstract, scalable illustrations of the platform.
 *
 * Each component is self-contained, scales with its container
 * (SVG viewBox / fluid divs), and plays a subtle framer-motion entrance
 * when scrolled into view. Pass `animated={false}` to render statically;
 * `prefers-reduced-motion` is respected automatically.
 */
import { motion, useReducedMotion } from 'framer-motion';

const SNAP: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: '-60px' } as const;
const METICS_SANS = '"Inter Tight", Inter, Helvetica Neue, Arial, sans-serif';

export interface VisualProps {
    /** Play the entrance animation on scroll into view. Default true. */
    animated?: boolean;
    className?: string;
}

/** Fast rise-in, or nothing when animation is off. */
function fadeUp(anim: boolean, delay = 0, y = 8) {
    return anim
        ? {
              initial: { opacity: 0, y },
              whileInView: { opacity: 1, y: 0 },
              viewport: VIEWPORT,
              transition: { duration: 0.28, delay, ease: SNAP },
          }
        : {};
}

/* ────────────────────────────────────────────────────────────────────
   BidComparisonVisual
   RFQ package card with supplier rows and animated bid bars.
──────────────────────────────────────────────────────────────────── */

const BIDS = [
    { supplier: 'Nordbau GmbH', amount: '€1.24M', width: 68, leading: true },
    { supplier: 'Steelworks AG', amount: '€1.31M', width: 74, leading: false },
    { supplier: 'Baustahl Weber KG', amount: '€1.38M', width: 79, leading: false },
    { supplier: 'Ferrum Industries', amount: '€1.47M', width: 86, leading: false },
];

export function BidComparisonVisual({ animated = true, className }: VisualProps) {
    const reduce = useReducedMotion();
    const anim = animated && !reduce;

    return (
        <motion.div
            {...fadeUp(anim, 0, 8)}
            className={`product-stage w-full border border-subtle bg-white p-6 md:p-8 ${className ?? ''}`}
        >
            {/* Package header */}
            <div className="flex items-start justify-between gap-4 border-b border-subtle pb-5">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                        RFQ-2041
                    </p>
                    <p className="mt-1.5 text-lg font-normal leading-snug tracking-tight text-primary">
                        Structural Steel Package
                    </p>
                </div>
                <span className="mt-0.5 shrink-0 border border-subtle bg-layer px-3 py-1 text-xs font-medium text-muted">
                    4 bids received
                </span>
            </div>

            {/* Supplier rows */}
            <div className="mt-5 space-y-1">
                {BIDS.map((bid, i) => (
                    <div
                        key={bid.supplier}
                        className={`-mx-2 px-2 py-2 transition-colors duration-150 ${
                            bid.leading ? 'bg-highlight' : 'hover:bg-layer'
                        }`}
                    >
                        <div className="mb-1.5 flex items-baseline justify-between gap-4">
                            <span className="flex items-center gap-2 text-sm font-medium text-primary">
                                {bid.supplier}
                                {bid.leading && (
                                    <span className="border border-subtle bg-layer px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                                        Leading
                                    </span>
                                )}
                            </span>
                            <span
                                className={`font-mono text-sm tabular-nums tracking-tight ${
                                    bid.leading ? 'text-primary' : 'text-muted'
                                }`}
                            >
                                {bid.amount}
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden bg-subtle">
                            <motion.div
                                {...(anim
                                    ? {
                                          initial: { scaleX: 0 },
                                          whileInView: { scaleX: 1 },
                                          viewport: VIEWPORT,
                                          transition: {
                                              duration: 0.38,
                                              delay: 0.04 + i * 0.05,
                                              ease: SNAP,
                                          },
                                      }
                                    : {})}
                                style={{ width: `${bid.width}%` }}
                                className={`h-full origin-left ${
                                    bid.leading ? 'bg-accent' : 'bg-primary/25'
                                }`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-6 border-t border-subtle pt-4 text-xs leading-relaxed text-muted">
                Normalised for scope and delivery terms · Closes 21 Mar
            </p>
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────────────────
   WorkflowVisual
   Horizontal 4-step flow: RFQ → Bids → Award → PO.
──────────────────────────────────────────────────────────────────── */

const STEPS = [
    { x: 70, label: 'RFQ', sub: 'Issued' },
    { x: 236, label: 'Bids', sub: '4 received' },
    { x: 402, label: 'Award', sub: 'Approved' },
    { x: 568, label: 'PO', sub: 'PO-1187' },
];

export function WorkflowVisual({ animated = true, className }: VisualProps) {
    const reduce = useReducedMotion();
    const anim = animated && !reduce;

    return (
        <div className={`w-full ${className ?? ''}`}>
            <svg
                viewBox="0 0 640 132"
                width="100%"
                role="img"
                aria-label="Procurement workflow: RFQ, bids, award, purchase order"
            >
                {/* Connector lines */}
                {STEPS.slice(0, -1).map((step, i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1={step.x + 22}
                        y1={48}
                        x2={STEPS[i + 1].x - 22}
                        y2={48}
                        stroke="rgba(22,22,22,0.18)"
                        strokeWidth={1.5}
                        {...(anim
                            ? {
                                  initial: { pathLength: 0, opacity: 0 },
                                  whileInView: { pathLength: 1, opacity: 1 },
                                  viewport: VIEWPORT,
                                  transition: {
                                      duration: 0.28,
                                      delay: 0.08 + i * 0.08,
                                      ease: SNAP,
                                  },
                              }
                            : {})}
                    />
                ))}

                {/* Nodes */}
                {STEPS.map((step, i) => {
                    const last = i === STEPS.length - 1;
                    return (
                        <motion.g
                            key={step.label}
                            {...(anim
                                ? {
                                      initial: { opacity: 0, scale: 0.72 },
                                      whileInView: { opacity: 1, scale: 1 },
                                      viewport: VIEWPORT,
                                      transition: {
                                          type: 'spring',
                                          stiffness: 520,
                                          damping: 28,
                                          delay: 0.04 + i * 0.08,
                                      },
                                  }
                                : {})}
                            style={{ transformOrigin: `${step.x}px 48px` }}
                        >
                            <rect
                                x={step.x - 18}
                                y={30}
                                width={36}
                                height={36}
                                fill={last ? '#ff6719' : '#FFFFFF'}
                                stroke={last ? '#ff6719' : 'rgba(22,22,22,0.18)'}
                                strokeWidth={1.5}
                            />
                            <text
                                x={step.x}
                                y={48}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontFamily={METICS_SANS}
                                fontSize={14}
                                fill={last ? '#FFFFFF' : '#161616'}
                            >
                                {i + 1}
                            </text>
                            <text
                                x={step.x}
                                y={92}
                                textAnchor="middle"
                                fontFamily={METICS_SANS}
                                fontSize={13}
                                fontWeight={600}
                                fill="#161616"
                            >
                                {step.label}
                            </text>
                            <text
                                x={step.x}
                                y={112}
                                textAnchor="middle"
                                fontFamily={METICS_SANS}
                                fontSize={11}
                                fill="rgba(22,22,22,0.45)"
                            >
                                {step.sub}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────────────
   AnalyticsVisual
   Spend-analytics abstraction: area chart with stat chips.
──────────────────────────────────────────────────────────────────── */

const CHART_LINE =
    'M0 158 C 48 150, 78 122, 124 128 C 170 134, 198 92, 246 86 C 294 80, 322 104, 372 68 C 414 38, 448 46, 480 30';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export function AnalyticsVisual({ animated = true, className }: VisualProps) {
    const reduce = useReducedMotion();
    const anim = animated && !reduce;

    return (
        <motion.div
            {...fadeUp(anim, 0, 8)}
            className={`product-stage w-full border border-subtle bg-white p-6 md:p-8 ${className ?? ''}`}
        >
            {/* Header with stat chips */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                    Spend Analytics
                </p>
                <div className="flex gap-3">
                    <div className="border border-subtle bg-layer px-4 py-2.5">
                        <p className="text-lg font-light leading-none tracking-tight text-primary">
                            €2.4M
                        </p>
                        <p className="mt-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">
                            Managed spend
                        </p>
                    </div>
                    <div className="border border-subtle bg-layer px-4 py-2.5">
                        <p className="text-lg font-light leading-none tracking-tight text-secondary">
                            11.2%
                        </p>
                        <p className="mt-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">
                            Avg. savings
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-6">
                <svg
                    viewBox="0 0 520 190"
                    width="100%"
                    role="img"
                    aria-label="Savings trend over six months"
                >
                    <defs>
                        <linearGradient id="metics-area-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff6719" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#ff6719" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Horizontal grid + y-axis ticks */}
                    {[
                        { y: 30, label: '€1.5M' },
                        { y: 94, label: '€1.0M' },
                        { y: 158, label: '€0.5M' },
                    ].map((tick) => (
                        <g key={tick.y}>
                            <line
                                x1={40}
                                y1={tick.y}
                                x2={520}
                                y2={tick.y}
                                stroke="rgba(0,0,0,0.06)"
                                strokeWidth={1}
                            />
                            <text
                                x={0}
                                y={tick.y + 3.5}
                                fontFamily={METICS_SANS}
                                fontSize={10}
                                fill="rgba(22,22,22,0.4)"
                            >
                                {tick.label}
                            </text>
                        </g>
                    ))}

                    <g transform="translate(40 0)">
                        {/* Area fill */}
                        <motion.path
                            d={`${CHART_LINE} L 480 170 L 0 170 Z`}
                            fill="url(#metics-area-fill)"
                            stroke="none"
                            {...(anim
                                ? {
                                      initial: { opacity: 0 },
                                      whileInView: { opacity: 1 },
                                      viewport: VIEWPORT,
                                      transition: { duration: 0.32, delay: 0.18, ease: SNAP },
                                  }
                                : {})}
                        />
                        {/* Line */}
                        <motion.path
                            d={CHART_LINE}
                            fill="none"
                            stroke="#ff6719"
                            strokeWidth={2}
                            {...(anim
                                ? {
                                      initial: { pathLength: 0 },
                                      whileInView: { pathLength: 1 },
                                      viewport: VIEWPORT,
                                      transition: { duration: 0.55, delay: 0.06, ease: SNAP },
                                  }
                                : {})}
                        />
                        {/* Endpoint marker */}
                        <motion.circle
                            cx={480}
                            cy={30}
                            r={4}
                            fill="#FFFFFF"
                            stroke="#ff6719"
                            strokeWidth={2}
                            {...(anim
                                ? {
                                      initial: { opacity: 0, scale: 0 },
                                      whileInView: { opacity: 1, scale: 1 },
                                      viewport: VIEWPORT,
                                      transition: { type: 'spring', stiffness: 500, damping: 22, delay: 0.52 },
                                  }
                                : {})}
                            style={{ transformOrigin: '480px 30px' }}
                        />
                    </g>

                    {/* x-axis month ticks */}
                    {MONTHS.map((month, i) => (
                        <text
                            key={month}
                            x={40 + (i * 480) / (MONTHS.length - 1)}
                            y={186}
                            textAnchor={i === 0 ? 'start' : i === MONTHS.length - 1 ? 'end' : 'middle'}
                            fontFamily={METICS_SANS}
                            fontSize={10}
                            fill="rgba(22,22,22,0.4)"
                        >
                            {month}
                        </text>
                    ))}
                </svg>
            </div>
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────────────────
   RecordTimelineVisual
   Vertical audit-trail timeline of a shared procurement record.
──────────────────────────────────────────────────────────────────── */

const EVENTS = [
    { title: 'RFQ issued', meta: 'Structural steel package · 14 Mar', accent: false },
    { title: 'Clarification posted', meta: 'Answer shared with all bidders · 18 Mar', accent: false },
    { title: 'Bid received', meta: 'Nordbau GmbH · €1.24M · 21 Mar', accent: false },
    { title: 'Approval granted', meta: 'Commercial director · 24 Mar', accent: false },
    { title: 'PO issued', meta: 'PO-1187 sent to supplier · 25 Mar', accent: true },
];

export function RecordTimelineVisual({ animated = true, className }: VisualProps) {
    const reduce = useReducedMotion();
    const anim = animated && !reduce;

    return (
        <div className={`relative w-full ${className ?? ''}`}>
            {/* Hairline spine */}
            <div
                aria-hidden="true"
                className="absolute bottom-3 left-[7px] top-3 w-px bg-subtle"
            />
            <div className="space-y-4">
                {EVENTS.map((event, i) => (
                    <motion.div
                        key={event.title}
                        {...fadeUp(anim, i * 0.05, 6)}
                        className="relative flex items-start gap-4 pl-0"
                    >
                        {/* Dot */}
                        <span
                            aria-hidden="true"
                            className={`relative z-10 mt-4 block h-[15px] w-[15px] shrink-0 ${
                                event.accent
                                    ? 'border-[1.5px] border-accent bg-accent'
                                    : 'border-[1.5px] border-strong bg-white'
                            }`}
                        />
                        {/* Event card */}
                        <div className="min-w-0 flex-1 border border-subtle bg-white px-4 py-3 transition-colors duration-150 hover:border-accent hover:bg-highlight">
                            <p className="text-sm font-medium leading-snug text-primary">
                                {event.title}
                            </p>
                            <p className="mt-0.5 truncate text-xs leading-relaxed text-muted">
                                {event.meta}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────────────
   TCOVisual
   Total-cost-of-ownership stacked bar comparison.
──────────────────────────────────────────────────────────────────── */

const TCO_SEGMENTS = [
    { key: 'base', label: 'Base price', className: 'bg-primary/75' },
    { key: 'logistics', label: 'Logistics', className: 'bg-primary/30' },
    { key: 'risk', label: 'Delay risk', className: 'bg-accent/80' },
] as const;

const TCO_ROWS: {
    supplier: string;
    total: string;
    best: boolean;
    segments: Record<(typeof TCO_SEGMENTS)[number]['key'], number>;
}[] = [
    {
        supplier: 'Nordbau GmbH',
        total: '€1.31M',
        best: true,
        segments: { base: 78, logistics: 8, risk: 6 },
    },
    {
        supplier: 'Steelworks AG',
        total: '€1.37M',
        best: false,
        segments: { base: 74, logistics: 12, risk: 10 },
    },
    {
        supplier: 'Ferrum Industries',
        total: '€1.42M',
        best: false,
        segments: { base: 82, logistics: 9, risk: 9 },
    },
];

export function TCOVisual({ animated = true, className }: VisualProps) {
    const reduce = useReducedMotion();
    const anim = animated && !reduce;

    return (
        <motion.div
            {...fadeUp(anim, 0, 8)}
            className={`product-stage w-full border border-subtle bg-white p-6 md:p-8 ${className ?? ''}`}
        >
            <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                    Total Cost of Ownership
                </p>
                <p className="text-xs text-muted">Structural steel · 24-week programme</p>
            </div>

            <div className="mt-6 space-y-1">
                {TCO_ROWS.map((row, i) => (
                    <div
                        key={row.supplier}
                        className={`-mx-2 px-2 py-2 transition-colors duration-150 ${
                            row.best ? 'bg-highlight' : 'hover:bg-layer'
                        }`}
                    >
                        <div className="mb-1.5 flex items-baseline justify-between gap-4">
                            <span className="flex items-center gap-2 text-sm font-medium text-primary">
                                {row.supplier}
                                {row.best && (
                                    <span className="border border-subtle bg-layer px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                                        Best TCO
                                    </span>
                                )}
                            </span>
                            <span
                                className={`font-mono text-sm tabular-nums tracking-tight ${
                                    row.best ? 'text-primary' : 'text-muted'
                                }`}
                            >
                                {row.total}
                            </span>
                        </div>
                        <div className="flex h-2 w-full gap-px overflow-hidden bg-subtle">
                            {TCO_SEGMENTS.map((segment, j) => (
                                <motion.div
                                    key={segment.key}
                                    {...(anim
                                        ? {
                                              initial: { scaleX: 0 },
                                              whileInView: { scaleX: 1 },
                                              viewport: VIEWPORT,
                                              transition: {
                                                  duration: 0.32,
                                                  delay: 0.04 + i * 0.06 + j * 0.05,
                                                  ease: SNAP,
                                              },
                                          }
                                        : {})}
                                    style={{ width: `${row.segments[segment.key]}%` }}
                                    className={`h-full origin-left ${segment.className}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-subtle pt-4">
                {TCO_SEGMENTS.map((segment) => (
                    <span
                        key={segment.key}
                        className="flex items-center gap-2 text-xs text-muted"
                    >
                        <span
                            aria-hidden="true"
                            className={`h-2.5 w-2.5 ${segment.className}`}
                        />
                        {segment.label}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
