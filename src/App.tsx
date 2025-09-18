import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

const navLinks = [
  { href: '#features', label: 'Platform' },
  { href: '#value', label: 'Value' },
  { href: '#use-cases', label: 'Use Cases' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' }
];

function useStickyHeader(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const handleScroll = () => {
      const shouldCollapse = window.scrollY > 40;
      if (ref.current) {
        ref.current.style.transform = shouldCollapse ? 'scale(0.98)' : 'scale(1)';
        ref.current.style.background = shouldCollapse
          ? 'rgba(255, 255, 255, 0.94)'
          : 'rgba(255, 255, 255, 0.82)';
        ref.current.style.boxShadow = shouldCollapse
          ? '0 24px 70px rgba(35, 39, 47, 0.12)'
          : '0 18px 50px rgba(32, 36, 43, 0.08)';
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);
}

function useFloatingCardParallax() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'));
    if (!cards.length) {
      return;
    }

    const mq = window.matchMedia('(pointer: fine)');
    let parallaxActive = false;

    const handlePointer = (event: PointerEvent) => {
      const normX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normY = (event.clientY / window.innerHeight - 0.5) * 2;

      cards.forEach((card) => {
        const depth = Number(card.dataset.depth ?? 0.1);
        const translateX = normX * depth * -18;
        const translateY = normY * depth * -12;
        card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    };

    const enable = () => {
      if (!parallaxActive) {
        document.addEventListener('pointermove', handlePointer);
        parallaxActive = true;
      }
    };

    const disable = () => {
      if (parallaxActive) {
        document.removeEventListener('pointermove', handlePointer);
        cards.forEach((card) => {
          card.style.transform = 'translate3d(0, 0, 0)';
        });
        parallaxActive = false;
      }
    };

    const evaluate = (matches: boolean) => {
      if (matches) {
        enable();
      } else {
        disable();
      }
    };

    evaluate(mq.matches);

    const listener = (event: MediaQueryListEvent) => evaluate(event.matches);
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', listener);
    } else {
      mq.addListener(listener);
    }

    return () => {
      disable();
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', listener);
      } else {
        mq.removeListener(listener);
      }
    };
  }, []);
}

export default function App() {
  const stickyRef = useRef<HTMLElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const thanksTimer = useRef<number>();

  useStickyHeader(stickyRef);
  useFloatingCardParallax();

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [navOpen]);

  useEffect(() => {
    return () => {
      if (thanksTimer.current) {
        window.clearTimeout(thanksTimer.current);
      }
    };
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleNavToggle = () => {
    setNavOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setNavOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>('input[type="email"]');
    if (emailInput?.value) {
      emailInput.value = '';
      setShowThanks(true);
      if (thanksTimer.current) {
        window.clearTimeout(thanksTimer.current);
      }
      thanksTimer.current = window.setTimeout(() => setShowThanks(false), 4000);
    }
  };

  return (
    <div className="page-shell">
      <header className="top-nav" ref={stickyRef} data-sticky>
        <a className="nav-logo" href="#top" aria-label="Metics home">
          <img src="/Metics-blue.png" alt="Metics" />
        </a>
        <nav className={`nav-links${navOpen ? ' active' : ''}`} id="primary-navigation">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={handleNavLinkClick}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="ghost" href="#contact">
            Get Started
          </a>
          <a className="solid" href="#contact">
            Request a Demo
          </a>
        </div>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          aria-controls="primary-navigation"
          onClick={handleNavToggle}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Procurement Made Smarter. Built for Construction.</p>
              <h1>
                Metics connects buyers and suppliers with a transparent, data-driven platform — simplifying RFQs,
                bids, and purchase orders from start to finish.
              </h1>
              <p className="hero-sub">
                Speed decisions, stay audit-ready, and deliver every package with confidence.
              </p>
              <div className="hero-cta">
                <a className="solid" href="#contact">
                  Request a Demo
                </a>
                <a className="ghost" href="#value">
                  Get Started
                </a>
              </div>
              <div className="hero-meta">
                <span>CSV/API Imports</span>
                <span>Audit Trails</span>
                <span>Real-time Collaboration</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="device-frame">
                <div className="device-screen">
                  <div className="screen-header">
                    <span className="pill live">Live RFQs</span>
                    <span className="pill">PO Auto-generated</span>
                  </div>
                  <div className="screen-chart">
                    <div className="chart-line" />
                    <div className="chart-line" />
                    <div className="chart-line" />
                    <div className="chart-highlight" />
                  </div>
                  <div className="screen-cards">
                    <article>
                      <h4>Steel Package RFQ</h4>
                      <p>3 bids received · Partial awards enabled</p>
                    </article>
                    <article>
                      <h4>MEP Tender</h4>
                      <p>Supplier chat active · Documents synced</p>
                    </article>
                    <article>
                      <h4>Finishes Procurement</h4>
                      <p>PO ready · Export PDF</p>
                    </article>
                  </div>
                </div>
              </div>
              <div className="floating-card" data-depth="0.1">
                <p className="label">Buyer View</p>
                <h3>Compare bids side-by-side.</h3>
                <p className="detail">Every metric, fee, and delivery promise in one view.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="value" id="value">
          <div className="section-heading">
            <p className="eyebrow">Value Propositions</p>
            <h2>Everything you need to run procurement at construction pace.</h2>
            <p className="lede">
              Metics blends structured workflows with real-time collaboration so every project can move from RFQ to PO
              without friction.
            </p>
          </div>
          <div className="value-grid">
            <div className="value-card">
              <span className="icon" role="img" aria-hidden="true">
                ⚡
              </span>
              <h3>Speed Up Procurement</h3>
              <p>Generate RFQs, compare bids, and award contracts in minutes — not weeks.</p>
            </div>
            <div className="value-card">
              <span className="icon" role="img" aria-hidden="true">
                📊
              </span>
              <h3>Transparent Decisions</h3>
              <p>Every bid, comparison, and PO is tracked with clear analytics and audit trails.</p>
            </div>
            <div className="value-card">
              <span className="icon" role="img" aria-hidden="true">
                🤝
              </span>
              <h3>Seamless Collaboration</h3>
              <p>Real-time chat, supplier onboarding, and document sharing in one place.</p>
            </div>
            <div className="value-card">
              <span className="icon" role="img" aria-hidden="true">
                🏗️
              </span>
              <h3>Construction-Ready</h3>
              <p>Tailored to contractors, QS firms, and suppliers.</p>
            </div>
          </div>
        </section>

        <section className="panels" id="features">
          <div className="section-heading">
            <p className="eyebrow">Platform Overview</p>
            <h2>Built for both sides of the table.</h2>
          </div>
          <div className="panel-grid">
            <article className="panel">
              <h3>For Buyers</h3>
              <ul>
                <li>Create RFQs with headers, lines, attributes and flexible bidding modes.</li>
                <li>Invite authorized suppliers or open to all in category; receive multiple bids.</li>
                <li>Compare bids side-by-side, negotiate via chat, and award the best offer.</li>
                <li>Auto-generate Purchase Orders on award and export as PDF instantly.</li>
                <li>Edit RFQs pre-deadline, save drafts, or import via CSV/API.</li>
                <li>Manage suppliers, documents, contracts, and team roles in one place.</li>
              </ul>
            </article>
            <article className="panel">
              <h3>For Suppliers</h3>
              <ul>
                <li>Register once, set company categories, and receive category-matched RFQs.</li>
                <li>Submit bids, including partial quantities, with reusable terms and remarks.</li>
                <li>Track bid status and buyer responses; accept or reject Purchase Orders.</li>
                <li>Maintain a client list, publish product catalogues, and manage inquiries.</li>
                <li>Store compliance documents and organisation templates with version control.</li>
              </ul>
            </article>
            <article className="panel">
              <h3>Collaboration & Control</h3>
              <ul>
                <li>Real-time chat for each RFQ with notifications and activity updates.</li>
                <li>Role-based access, auditability, and document version control.</li>
                <li>Support for Incoterms and international trade contexts.</li>
                <li>Every decision captured with analytics, scorecards, and exportable summaries.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="cases" id="use-cases">
          <div className="section-heading">
            <p className="eyebrow">Use Cases</p>
            <h2>Designed for the full construction supply chain.</h2>
          </div>
          <div className="case-grid">
            <article>
              <h3>General Contractor</h3>
              <p className="pain">Problem: Fragmented tendering across trades creates delays and cost drift.</p>
              <p className="solution">Solution: Issue RFQs per package, collect comparable bids, split awards, auto PO.</p>
              <p className="outcome">Outcome: Faster award cycles, documented decisions, predictable delivery.</p>
            </article>
            <article>
              <h3>Quantity Surveyor / Consultant</h3>
              <p className="pain">Problem: Manual bid normalization and reporting wastes time.</p>
              <p className="solution">Solution: Tender comparisons, partial bidding support, automated summaries.</p>
              <p className="outcome">Outcome: Less spreadsheet work, clearer advice to clients, repeatable governance.</p>
            </article>
            <article>
              <h3>Developer / Project Owner</h3>
              <p className="pain">Problem: Limited visibility into supplier capacity and cost risk.</p>
              <p className="solution">Solution: Transparent comparisons, partial awards, live bid and PO updates.</p>
              <p className="outcome">Outcome: Lower risk, better budget adherence, traceable procurement.</p>
            </article>
            <article>
              <h3>SME Supplier</h3>
              <p className="pain">Problem: Hard to discover opportunities and prove reliability.</p>
              <p className="solution">Solution: Category-matched RFQs, reusable T&C templates, public catalogues.</p>
              <p className="outcome">Outcome: More invitations, higher win rate, cleaner POs and communication.</p>
            </article>
            <article>
              <h3>Enterprise Procurement</h3>
              <p className="pain">Problem: High RFQ volume and compliance demands.</p>
              <p className="solution">Solution: CSV/API import, controlled supplier lists, audit trails, PO PDFs.</p>
              <p className="outcome">Outcome: Scalable operations, governance by design, ERP-ready workflows.</p>
            </article>
          </div>
        </section>

        <section className="credibility" id="credibility">
          <div className="section-heading">
            <p className="eyebrow">Proof Points</p>
            <h2>Trusted tooling for every stage of the build.</h2>
          </div>
          <div className="cred-grid">
            <div className="cred-card">
              <h3>80%</h3>
              <p>Reduction in time to shortlist suppliers after first month on Metics.</p>
            </div>
            <div className="cred-card">
              <h3>24/7</h3>
              <p>Live access to RFQs, supplier chats, and PO documents across teams.</p>
            </div>
            <div className="cred-card">
              <h3>100%</h3>
              <p>Audit-ready tender history with exportable summaries for governance.</p>
            </div>
          </div>
          <div className="badge-row">
            <span>ISO-ready workflows</span>
            <span>GDPR compliant</span>
            <span>SSO & SAML support</span>
            <span>EU data residency</span>
          </div>
        </section>

        <section className="workflow" id="workflow">
          <div className="section-heading">
            <p className="eyebrow">Flow</p>
            <h2>From enquiry to PO, every step stays connected.</h2>
          </div>
          <div className="workflow-grid">
            <article>
              <h3>1. Launch RFQ</h3>
              <p>Import via CSV/API or build from templates. Define attributes, attachments, and bidding rules.</p>
            </article>
            <article>
              <h3>2. Collaborate & Compare</h3>
              <p>Invite suppliers, chat in context, compare responses with price and qualitative scoring.</p>
            </article>
            <article>
              <h3>3. Award & Automate</h3>
              <p>Make partial or full awards, auto-generate POs, and sync documentation for handover.</p>
            </article>
          </div>
        </section>

        <section className="faqs" id="faqs">
          <div className="section-heading">
            <p className="eyebrow">FAQs</p>
            <h2>Answers for buyers and suppliers.</h2>
          </div>
          <div className="faq-grid">
            <details open>
              <summary>Can suppliers bid partially?</summary>
              <p>
                Yes. Buyers can enable partial bidding; suppliers then quote partial quantities. Buyers can also make
                partial awards across suppliers.
              </p>
            </details>
            <details>
              <summary>Can I restrict an RFQ to selected suppliers?</summary>
              <p>Yes. Choose Closed (selected/authorized suppliers) or Open (all in category).</p>
            </details>
            <details>
              <summary>Do POs generate automatically?</summary>
              <p>
                Yes. Awarding a bid auto-generates a purchase order with agreed terms; buyers can export a PDF.
              </p>
            </details>
            <details>
              <summary>Can I edit an RFQ after publishing?</summary>
              <p>
                Before the deadline: yes, with notifications to participants. Critical fields may lock after bids arrive
                to keep fairness.
              </p>
            </details>
            <details>
              <summary>Can I integrate with my ERP?</summary>
              <p>Yes, import RFQs via CSV or API; mapping templates supported.</p>
            </details>
            <details>
              <summary>How do suppliers get RFQs?</summary>
              <p>By category matching after they set company and product categories.</p>
            </details>
            <details>
              <summary>Is there in-platform communication?</summary>
              <p>Yes, real-time chat on each RFQ, plus notifications and an updates feed.</p>
            </details>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="cta-card">
            <h2>Ready to modernise procurement?</h2>
            <p>Request a demo and see how Metics brings every RFQ, bid, and PO into one connected workspace.</p>
            <form className="cta-form" onSubmit={handleSubmit} noValidate>
              <label className="sr-only" htmlFor="email">
                Work email
              </label>
              <input type="email" id="email" name="email" placeholder="Work email" required />
              <button type="submit">Request a Demo</button>
            </form>
            {showThanks && <p className="thanks">Thanks, the Metics team will reach out shortly.</p>}
            <p className="cta-footnote">
              Prefer to start now? <a href="#">Get Started</a> or join the beta.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-meta">
            <a className="logo" href="#top" aria-label="Metics home">
              <img src="/Metics-blue.png" alt="Metics logo" />
            </a>
            <p>Construction procurement made transparent for buyers and suppliers.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Platform</h4>
              <a href="#features">Features</a>
              <a href="#use-cases">Use Cases</a>
              <a href="#faqs">FAQs</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#contact">Request a Demo</a>
              <a href="#contact">Get Started</a>
              <a href="#">Privacy</a>
            </div>
          </div>
          <div className="footer-note">© {currentYear} Metics. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
