import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

type Chip = {
    label: string;
    sub?: string;
    x: string;
    y: string;
    z: number;
};

const SPRING = { stiffness: 160, damping: 22, mass: 0.6 };

export function InteractiveStage({
    children,
    chips = [],
    className,
}: {
    children: ReactNode;
    chips?: Chip[];
    className?: string;
}) {
    const root = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const rotateX = useSpring(0, SPRING);
    const rotateY = useSpring(0, SPRING);

    useEffect(() => {
        if (reduce) {
            rotateX.set(0);
            rotateY.set(0);
            return;
        }
        rotateX.set(6);
        rotateY.set(-8);
    }, [reduce, rotateX, rotateY]);

    function reset() {
        rotateX.set(reduce ? 0 : 6);
        rotateY.set(reduce ? 0 : -8);
    }

    function onMove(e: MouseEvent<HTMLDivElement>) {
        if (reduce) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const el = root.current;
        if (!el) return;
        const box = el.getBoundingClientRect();
        const px = (e.clientX - box.left) / box.width - 0.5;
        const py = (e.clientY - box.top) / box.height - 0.5;
        rotateX.set(6 + py * -10);
        rotateY.set(-8 + px * 14);
    }

    return (
        <div
            ref={root}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className={`stage-scene ${className ?? ''}`}
        >
            <motion.div
                className="stage-rig"
                style={{ rotateX, rotateY }}
            >
                <div className="stage-card">{children}</div>
                {chips.map((chip) => (
                    <div
                        key={chip.label}
                        className="stage-chip"
                        style={{ left: chip.x, top: chip.y, transform: `translateZ(${chip.z}px)` }}
                        aria-hidden="true"
                    >
                        <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-accent">{chip.label}</span>
                        {chip.sub && <span className="mt-0.5 block text-xs text-muted">{chip.sub}</span>}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

const HERO_BIDS = [
    { supplier: 'Nordbau GmbH', amount: '€412,300', tco: '€428,100', width: 72 },
    { supplier: 'Delta Steel Co.', amount: '€448,150', tco: '€451,400', width: 84 },
    { supplier: 'Meridian Supply', amount: '€463,900', tco: '€470,200', width: 92 },
];

/** Home hero: live bid comparison in a pointer-tilted stage. */
export function HeroWorkspace() {
    const [lead, setLead] = useState(0);
    const current = HERO_BIDS[lead];

    return (
        <InteractiveStage
            chips={[
                { label: 'Lowest TCO', sub: current.tco, x: '4%', y: '8%', z: 64 },
                { label: 'Clarifications', sub: '2 open threads', x: '74%', y: '14%', z: 40 },
                { label: 'Award trail', sub: 'ready to export', x: '68%', y: '82%', z: 28 },
            ]}
        >
            <div className="border border-subtle bg-layer p-6 md:p-8" aria-label="Interactive bid comparison">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">RFQ package</p>
                        <p className="mt-1 text-xl font-normal text-primary">Structural Steel, Block C</p>
                    </div>
                    <span className="inline-flex items-center gap-2 border border-subtle bg-paper px-3 py-1 text-xs font-semibold text-support">
                        <span className="live-dot h-1.5 w-1.5 bg-support" aria-hidden="true" />
                        Bids closed
                    </span>
                </div>

                <p className="sr-only" aria-live="polite">
                    Leading bid {current.supplier}, TCO {current.tco}
                </p>

                <div className="mt-6 space-y-1" role="listbox" aria-label="Supplier bids">
                    {HERO_BIDS.map((bid, i) => {
                        const active = i === lead;
                        return (
                            <button
                                key={bid.supplier}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onClick={() => setLead(i)}
                                className={`flex w-full items-center gap-4 px-2 py-2 text-left transition-colors duration-150 ${
                                    active ? 'bg-highlight' : 'hover:bg-paper'
                                }`}
                            >
                                <span className="w-32 shrink-0 truncate text-xs font-medium text-muted">{bid.supplier}</span>
                                <div className="h-2 flex-1 overflow-hidden bg-subtle">
                                    <span
                                        className={`block h-full origin-left ${active ? 'bg-accent' : 'bg-strong'}`}
                                        style={{ width: `${bid.width}%` }}
                                    />
                                </div>
                                <span className={`w-20 shrink-0 text-right font-mono text-xs tabular-nums ${active ? 'font-semibold text-primary' : 'text-muted'}`}>
                                    {bid.amount}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-subtle pt-4">
                    <span className="text-xs text-muted">Select a bid · TCO {current.tco}</span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
                        {current.supplier}
                    </span>
                </div>
            </div>
        </InteractiveStage>
    );
}
