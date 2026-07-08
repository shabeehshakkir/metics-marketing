/**
 * Metics background patterns — decorative, low-opacity elements.
 *
 * All patterns are absolutely-positioned-friendly (default `absolute inset-0`),
 * pointer-events-none, and aria-hidden. Place inside a `relative` parent with
 * `overflow-hidden`, behind content. Pass `className` to reposition or resize.
 */

export interface PatternProps {
    className?: string;
    /** For dark sections, switches hairlines/dots to white. Default false. */
    light?: boolean;
}

/* ── Dot grid ── */
export function DotGrid({ className, light = false }: PatternProps) {
    const dot = light ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,26,0.5)';
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 opacity-[0.06] ${className ?? ''}`}
            style={{
                backgroundImage: `radial-gradient(${dot} 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
            }}
        />
    );
}

/* ── Hairline grid ── */
export function HairlineGrid({ className, light = false }: PatternProps) {
    const line = light ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.8)';
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 opacity-[0.04] ${className ?? ''}`}
            style={{
                backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
            }}
        />
    );
}

/* ── Radial accent glow ── */
export function RadialGlow({
    className,
    position = 'top',
}: {
    className?: string;
    /** Where the glow emanates from. Default 'top'. */
    position?: 'top' | 'center' | 'bottom';
}) {
    const origin =
        position === 'top' ? '50% 0%' : position === 'bottom' ? '50% 100%' : '50% 50%';
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
            style={{
                background: `radial-gradient(ellipse 70% 55% at ${origin}, rgba(255,103,25,0.06), transparent 65%)`,
            }}
        />
    );
}

/* ── Topography contour lines ── */
export function TopographyLines({ className, light = false }: PatternProps) {
    const stroke = light ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.9)';
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 opacity-[0.05] ${className ?? ''}`}
        >
            <svg
                viewBox="0 0 800 600"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                stroke={stroke}
                strokeWidth={1}
            >
                <path d="M-40 480 C 120 420, 200 500, 360 440 C 520 380, 600 470, 840 400" />
                <path d="M-40 420 C 130 360, 220 440, 380 380 C 540 320, 620 410, 840 340" />
                <path d="M-40 360 C 140 305, 240 380, 400 322 C 560 264, 640 350, 840 282" />
                <path d="M-40 300 C 150 252, 260 318, 420 264 C 580 210, 660 288, 840 226" />
                <path d="M-40 240 C 160 200, 280 256, 440 208 C 600 160, 680 226, 840 172" />
                <path d="M-40 180 C 170 150, 300 194, 460 154 C 620 114, 700 164, 840 120" />
                <path d="M-40 120 C 180 100, 320 132, 480 102 C 640 72, 720 102, 840 70" />
            </svg>
        </div>
    );
}
