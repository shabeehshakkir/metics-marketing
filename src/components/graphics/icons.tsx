/**
 * Metics icon set — consistent 24px stroke icons.
 *
 * All icons: 24×24 viewBox, stroke = currentColor, strokeWidth 1.5,
 * fill none, round caps/joins. Size and stroke weight are overridable
 * per instance; color is inherited from the surrounding text color.
 */
import type { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'strokeWidth'> {
    /** Rendered width/height in px. Defaults to 24. */
    size?: number;
    className?: string;
    strokeWidth?: number;
}

/** Base wrapper — use to build additional icons with identical optics. */
export function Icon({
    size = 24,
    strokeWidth = 1.5,
    className,
    children,
    ...rest
}: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
            {...rest}
        >
            {children}
        </svg>
    );
}

/* ── Platform vocabulary ── */

/** RFQ / package of works */
export function PackageIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M21 8.4v7.2a1.5 1.5 0 0 1-.83 1.34l-7.5 3.75a1.5 1.5 0 0 1-1.34 0l-7.5-3.75A1.5 1.5 0 0 1 3 15.6V8.4a1.5 1.5 0 0 1 .83-1.34l7.5-3.75a1.5 1.5 0 0 1 1.34 0l7.5 3.75A1.5 1.5 0 0 1 21 8.4Z" />
            <path d="M3.3 7.3 12 11.6l8.7-4.3" />
            <path d="M12 11.6V21" />
            <path d="m7.5 5.2 8.6 4.3" />
        </Icon>
    );
}

/** Bids / sealed bid comparison */
export function ScalesIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M12 4.5v15" />
            <path d="M8.5 19.5h7" />
            <path d="M5.5 6.5h13" />
            <path d="m5.5 6.5-2.4 5.8" />
            <path d="m5.5 6.5 2.4 5.8" />
            <path d="M3.1 12.3a2.4 2.4 0 0 0 4.8 0" />
            <path d="m18.5 6.5-2.4 5.8" />
            <path d="m18.5 6.5 2.4 5.8" />
            <path d="M16.1 12.3a2.4 2.4 0 0 0 4.8 0" />
        </Icon>
    );
}

/** Comparison / bar chart */
export function ChartBarIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M3.5 20.5h17" />
            <path d="M7 20.5V13" />
            <path d="M12 20.5V7" />
            <path d="M17 20.5V10" />
        </Icon>
    );
}

/** Approval / governance */
export function ShieldCheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M12 3.5 19 6v5.6c0 4.3-2.9 7.2-7 8.9-4.1-1.7-7-4.6-7-8.9V6l7-2.5Z" />
            <path d="m9 12.2 2.1 2.1 4-4.6" />
        </Icon>
    );
}

/** Purchase order / document */
export function DocumentIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M13.5 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V8l-4.5-4.5Z" />
            <path d="M13.5 3.5V8H18" />
            <path d="M9 12.5h6" />
            <path d="M9 16h6" />
        </Icon>
    );
}

/** Analytics / trend line */
export function TrendLineIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M4 4v16h16" />
            <path d="m7.5 14.5 3.6-3.9 3 2.6 4.9-5.7" />
        </Icon>
    );
}

/** Suppliers / network */
export function NetworkIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="5.5" r="2.25" />
            <circle cx="5.25" cy="17.5" r="2.25" />
            <circle cx="18.75" cy="17.5" r="2.25" />
            <path d="M10.9 7.45 6.35 15.55" />
            <path d="m13.1 7.45 4.55 8.1" />
            <path d="M7.5 17.5h9" />
        </Icon>
    );
}

/** Cycle time / clock */
export function ClockIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="8.25" />
            <path d="M12 7.5V12l3 1.9" />
        </Icon>
    );
}

/** Savings / coins */
export function CoinsIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="8" cy="8" r="5.5" />
            <path d="M17.8 10.6a5.5 5.5 0 1 1-7.2 7.2" />
            <path d="M7 6h1v4" />
            <path d="m16.4 13.8.7.7-2.8 2.8" />
        </Icon>
    );
}

/** Sustainability / leaf */
export function LeafIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2.5c1 2 2 4 2 7.5 0 5.5-4.8 10-10 10Z" />
            <path d="M2.5 21c0-3 1.9-5.4 5.1-6 2.4-.5 4.9-2 5.9-3" />
        </Icon>
    );
}

/** Risk / alert triangle */
export function AlertIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M10.7 4.3 2.9 17.8a1.5 1.5 0 0 0 1.3 2.2h15.6a1.5 1.5 0 0 0 1.3-2.2L13.3 4.3a1.5 1.5 0 0 0-2.6 0Z" />
            <path d="M12 9.5v4" />
            <path d="M12 16.8h.01" />
        </Icon>
    );
}

/** Audit / search */
export function SearchIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m15.7 15.7 4.3 4.3" />
        </Icon>
    );
}

/** Construction / building */
export function BuildingIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M5 20.5v-15A1.5 1.5 0 0 1 6.5 4h6A1.5 1.5 0 0 1 14 5.5v15" />
            <path d="M14 9.5h3.5A1.5 1.5 0 0 1 19 11v9.5" />
            <path d="M3 20.5h18" />
            <path d="M8 8h3" />
            <path d="M8 11.5h3" />
            <path d="M8 15h3" />
        </Icon>
    );
}

/** Manufacturing / factory */
export function FactoryIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M3.5 20.5h17V9.4l-5.4 3.9V9.4l-5.6 4V5A1.5 1.5 0 0 0 8 3.5H5A1.5 1.5 0 0 0 3.5 5Z" />
            <path d="M7 17h.01" />
            <path d="M11.5 17h.01" />
            <path d="M16 17h.01" />
        </Icon>
    );
}

/** Energy / bolt */
export function BoltIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m13 3-8 9.6h7L11 21l8-9.6h-7L13 3Z" />
        </Icon>
    );
}

/** Public sector / landmark */
export function LandmarkIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M3.5 21h17" />
            <path d="M4.5 10.5h15" />
            <path d="M6 17.5v-7" />
            <path d="M10 17.5v-7" />
            <path d="M14 17.5v-7" />
            <path d="M18 17.5v-7" />
            <path d="M4 7.5 12 3l8 4.5" />
        </Icon>
    );
}

/* ── UI primitives ── */

export function ArrowRightIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M4.5 12h15" />
            <path d="m13.5 6 6 6-6 6" />
        </Icon>
    );
}

export function PlusIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </Icon>
    );
}

export function MinusIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M5 12h14" />
        </Icon>
    );
}

export function CloseIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m6 6 12 12" />
            <path d="m18 6-12 12" />
        </Icon>
    );
}

export function QuoteIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M5 12.5C5 9 6.8 6.8 9.5 6" />
            <path d="M5 12.5h4.5V17H5Z" />
            <path d="M14 12.5C14 9 15.8 6.8 18.5 6" />
            <path d="M14 12.5h4.5V17H14Z" />
        </Icon>
    );
}
