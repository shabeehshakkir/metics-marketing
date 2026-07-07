import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CTABanner } from '../components/shared';

const proofPoints = [
    {
        title: 'Start with one package',
        body: 'Create an RFQ from a BOQ, a template, or a blank sheet. Invite the suppliers who should see it.'
    },
    {
        title: 'Keep bids comparable',
        body: 'Suppliers answer in the same structure, so price, scope, and delivery dates sit side by side.'
    },
    {
        title: 'Decide with the record open',
        body: 'Clarifications, revisions, approvals, and notes stay attached to the package.'
    },
    {
        title: 'Issue the PO',
        body: 'Turn an awarded bid into a purchase order without rebuilding the work in another system.'
    },
];

const roles = [
    {
        tab: 'Contractors',
        title: 'General contractors',
        body: 'Each package gets one record: the RFQ, supplier list, bids, clarifications, approvals, and PO. The status is always current. Delays show up early enough to do something about them.',
        outcome: 'Award cycles get shorter within the first few packages.'
    },
    {
        tab: 'QS teams',
        title: 'QS and commercial teams',
        body: 'Supplier responses land in a consistent structure. You compare at package or line level without rebuilding the spreadsheet. The commercial review starts when bids close, not after someone cleans the data.',
        outcome: 'The analysis starts the same day bids close.'
    },
    {
        tab: 'Developers',
        title: 'Developers and owners',
        body: 'Package status, bid comparisons, and approval history are live. You do not need a report from every project team to see where things stand. Ask harder questions earlier, before decisions lock in.',
        outcome: 'You carry the budget risk. Now you have the data to manage it.'
    },
    {
        tab: 'Suppliers',
        title: 'Suppliers',
        body: 'RFQs come with scope, line items, and dates. Bid status updates when it changes. Clarification threads stay attached to the package. No chasing, no resubmitting the same document twice.',
        outcome: 'Suppliers price faster when the RFQ makes sense.'
    },
];

const testimonials = [
    {
        quote: 'The bid comparison used to take two days of spreadsheet work. Now the data is ready when bids close.',
        name: 'Rachel T.',
        role: 'Commercial Manager'
    },
    {
        quote: 'The award record shows exactly why each supplier was chosen. That still holds up when a client asks six months later.',
        name: 'James O.',
        role: 'Head of Procurement'
    },
    {
        quote: 'For the first time I can see the spend picture across every package without waiting for a report from the project team.',
        name: 'Maria S.',
        role: 'Development Director'
    }
];

const tools = [
    {
        kicker: 'RFQ builder',
        heading: 'A package starts as structured work, not a messy attachment.',
        body: 'Metics gives each tender a clear shape: scope, line items, drawings, dates, rules, suppliers, and internal reviewers. You can still import from spreadsheets, but the working record lives in one place.',
    },
    {
        kicker: 'Bid room',
        heading: 'Supplier answers arrive ready to compare.',
        body: 'Every bid keeps its commercial terms, comments, alternates, and files attached to the right line. Buyers can ask questions without losing the thread.',
    },
    {
        kicker: 'Award record',
        heading: 'The reason for the award stays with the award.',
        body: 'Shortlists, scoring notes, approvals, and final purchase orders are kept together. When someone asks why a supplier won, the answer is already there.',
    },
    {
        kicker: 'Spend analytics',
        heading: 'The numbers that matter once the tenders are running.',
        body: 'Actual PO spend tracks against the target prices set at RFQ stage. Cycle time, supplier concentration, and a procurement health score are visible without a separate report.',
    },
];

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.08 }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

export default function Home() {
    useReveal();
    const [activeRole, setActiveRole] = useState(0);

    return (
        <div className="platform-editorial">
            <section className="home-hero overflow-hidden relative py-20 lg:py-32">
                {/* Decorative background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-accent blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-secondary blur-[120px]" />
                </div>

                <div className="home-hero-inner relative z-10">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="platform-kicker"
                    >
                        Metics Platform
                    </motion.p>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif leading-tight mb-6"
                    >
                        The procurement workspace your projects can live in.
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="platform-hero-lede max-w-3xl mx-auto text-lg md:text-xl text-primary opacity-80 mb-8"
                    >
                        Procurement goes wrong when the cost picture, the supplier risk, and the approval trail live in different places. Metics puts the tender, the bids, the decision, and the purchase order in one record.
                    </motion.p>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="home-hero-hook italic mb-10 text-accent font-medium"
                    >
                        Most teams find out the real cost of a supplier relationship after the award. Metics shows it before.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="platform-hero-actions flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link className="platform-primary-link px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-accent transition-colors shadow-lg shadow-black/10" to="/contact">Book a walkthrough</Link>
                        <Link className="platform-secondary-link px-8 py-4 border-2 border-primary/10 rounded-lg font-bold hover:border-accent transition-colors" to="/platform">See how it works</Link>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="home-hero-stats bg-white/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
                    >
                        <div className="home-hero-stats-item text-sm md:text-base">
                            <span className="block text-accent font-bold uppercase tracking-wider text-[10px] mb-1">Approach</span>
                            <strong>Decision intelligence</strong> - not just workflow
                        </div>
                        <div className="hidden md:block w-px h-8 bg-black/10 mx-auto" />
                        <div className="home-hero-stats-item text-sm md:text-base">
                            <span className="block text-accent font-bold uppercase tracking-wider text-[10px] mb-1">Access</span>
                            <strong>Free for suppliers</strong> - no participation fee
                        </div>
                        <div className="hidden md:block w-px h-8 bg-black/10 mx-auto" />
                        <div className="home-hero-stats-item text-sm md:text-base">
                            <span className="block text-accent font-bold uppercase tracking-wider text-[10px] mb-1">Compliance</span>
                            <strong>CSRD-ready</strong> - sustainability built in
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="platform-proof-strip" aria-label="How the workflow runs">
                <div className="platform-proof-grid">
                    {proofPoints.map((item) => (
                        <article className="platform-proof-card reveal" key={item.title}>
                            <h2>{item.title}</h2>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="platform-belief-section">
                <div className="platform-belief-inner reveal">
                    <p>
                        The teams that award well are the ones who saw the full picture before the decision was made.
                    </p>
                    <span>That is what Metics is built to give you.</span>
                </div>
            </section>

            <section className="home-roles-section">
                <div className="home-roles-inner">
                    <div className="editorial-section-heading reveal">
                        <p className="platform-kicker">Who it&rsquo;s for</p>
                        <h2>Different pressures. One procurement record.</h2>
                    </div>
                    <div className="home-roles-tabs" role="tablist">
                        {roles.map((role, i) => (
                            <button
                                key={role.tab}
                                role="tab"
                                aria-selected={activeRole === i}
                                className={`home-role-tab${activeRole === i ? ' active' : ''}`}
                                onClick={() => setActiveRole(i)}
                            >
                                {role.tab}
                            </button>
                        ))}
                    </div>
                    <div key={activeRole} className="home-role-panel" role="tabpanel">
                        <h3>{roles[activeRole].title}</h3>
                        <p>{roles[activeRole].body}</p>
                        <div className="home-role-outcome">{roles[activeRole].outcome}</div>
                        <Link className="home-role-more-link" to="/solutions">
                            See all roles <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="platform-tools-section">
                <div className="platform-tools-heading reveal">
                    <p className="platform-kicker">What&rsquo;s inside</p>
                    <h2>The useful parts are built in. The noisy parts are left out.</h2>
                </div>
                <div className="platform-tool-list">
                    {tools.map((item, index) => (
                        <article className="platform-tool-row reveal" key={item.heading}>
                            <div className="platform-tool-number">{String(index + 1).padStart(2, '0')}</div>
                            <div>
                                <span>{item.kicker}</span>
                                <h3>{item.heading}</h3>
                            </div>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </div>
                <div className="home-tools-footer reveal">
                    <Link className="platform-secondary-link" to="/platform">Full platform overview</Link>
                </div>
            </section>

            <section className="home-testimonials-section">
                <div className="home-testimonials-inner">
                    <div className="editorial-section-heading reveal">
                        <p className="platform-kicker">What teams say</p>
                        <h2>From the people running the tenders.</h2>
                    </div>
                    <div className="testimonials-featured reveal">
                        <p className="testimonials-pull-quote">"{testimonials[0].quote}"</p>
                        <p className="testimonials-pull-attribution">{testimonials[0].name}, {testimonials[0].role}</p>
                    </div>
                    <div className="testimonials-card-grid">
                        {testimonials.slice(1).map((t) => (
                            <article className="testimonials-card reveal" key={t.name}>
                                <p className="testimonials-card-quote">"{t.quote}"</p>
                                <div className="testimonials-card-attribution">
                                    <span className="testimonials-card-name">{t.name}</span>
                                    <span className="testimonials-card-role">{t.role}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <CTABanner
                heading="See how a package moves through Metics"
                body="Bring one real procurement workflow to the call. We will walk through how the RFQ, supplier responses, approvals, and PO would sit in the platform."
                primaryLabel="Book a demo"
                primaryTo="/contact"
                secondaryLabel="View pricing"
                secondaryTo="/pricing"
            />
        </div>
    );
}
