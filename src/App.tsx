import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { content, Locale } from './content';

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

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const normalizedPath = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const isDutchRoute = normalizedPath === '/eu-nl' || normalizedPath.startsWith('/eu-nl/');
  const locale: Locale = isDutchRoute ? 'nl' : 'en';
  const t = content[locale];
  const pathPrefix = isDutchRoute ? '/eu-nl' : '';

  const applyPrefix = (href: string) => {
    if (!href || href === '#') {
      return href;
    }

    if (href.startsWith('#')) {
      return `${pathPrefix}${href}`;
    }

    return href;
  };

  useEffect(() => {
    document.documentElement.lang = locale === 'nl' ? 'nl' : 'en';
    document.title = t.seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.seo.description);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', t.seo.ogDescription ?? t.seo.description);
    }
  }, [locale, t]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isDutchRoute) {
      return;
    }

    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '') {
      return;
    }

    const langParam = new URLSearchParams(window.location.search).get('lang');
    if (langParam) {
      return;
    }

    const languages = navigator.languages ?? [navigator.language];
    const shouldRedirect = languages.some((lang) => lang?.toLowerCase().startsWith('nl'));

    if (shouldRedirect) {
      window.location.replace('/eu-nl/');
    }
  }, [isDutchRoute]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [navOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [locale]);

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

  const footerNote = t.footer.note.replace('{year}', currentYear.toString());

  return (
    <div className="page-shell">
      <header className="top-nav" ref={stickyRef} data-sticky>
        <a className="nav-logo" href={applyPrefix('#top')} aria-label="Metics home">
          <img src="/Metics-blue.png" alt="Metics" />
        </a>
        <nav className={`nav-links${navOpen ? ' active' : ''}`} id="primary-navigation">
          {t.nav.map((item) => (
            <a key={item.anchor} href={applyPrefix(item.anchor)} onClick={handleNavLinkClick}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="ghost" href={applyPrefix('#contact')}>
            {t.hero.ctas.secondary}
          </a>
          <a className="solid" href={applyPrefix('#contact')}>
            {t.hero.ctas.primary}
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
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.heading}</h1>
              <p className="hero-sub">{t.hero.subheading}</p>
              <div className="hero-cta">
                <a className="solid" href={applyPrefix('#contact')}>
                  {t.hero.ctas.primary}
                </a>
                <a className="ghost" href={applyPrefix('#value')}>
                  {t.hero.ctas.secondary}
                </a>
              </div>
              <div className="hero-meta">
                {t.hero.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="device-frame">
                <div className="device-screen">
                  <div className="screen-header">
                    <span className="pill live">{t.hero.pills[0]}</span>
                    <span className="pill">{t.hero.pills[1]}</span>
                  </div>
                  <div className="screen-chart">
                    <div className="chart-line" />
                    <div className="chart-line" />
                    <div className="chart-line" />
                    <div className="chart-highlight" />
                  </div>
                  <div className="screen-cards">
                    {t.hero.screenCards.map((card) => (
                      <article key={card.title}>
                        <h4>{card.title}</h4>
                        <p>{card.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
              <div className="floating-card" data-depth="0.1">
                <p className="label">{t.hero.floatingCard.label}</p>
                <h3>{t.hero.floatingCard.heading}</h3>
                <p className="detail">{t.hero.floatingCard.body}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="value" id="value">
          <div className="section-heading">
            <p className="eyebrow">{t.value.eyebrow}</p>
            <h2>{t.value.heading}</h2>
            <p className="lede">{t.value.lede}</p>
          </div>
          <div className="value-grid">
            {t.value.cards.map((card) => (
              <div className="value-card" key={card.heading}>
                <span className="icon" role="img" aria-hidden="true">
                  {card.icon}
                </span>
                <h3>{card.heading}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panels" id="features">
          <div className="section-heading">
            <p className="eyebrow">{t.features.eyebrow}</p>
            <h2>{t.features.heading}</h2>
          </div>
          <div className="panel-grid">
            {t.features.columns.map((column) => (
              <article className="panel" key={column.heading}>
                <h3>{column.heading}</h3>
                <ul>
                  {column.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cases" id="use-cases">
          <div className="section-heading">
            <p className="eyebrow">{t.useCases.eyebrow}</p>
            <h2>{t.useCases.heading}</h2>
          </div>
          <div className="case-grid">
            {t.useCases.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p className="pain">{item.problem}</p>
                <p className="solution">{item.solution}</p>
                <p className="outcome">{item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="credibility" id="credibility">
          <div className="section-heading">
            <p className="eyebrow">{t.credibility.eyebrow}</p>
            <h2>{t.credibility.heading}</h2>
          </div>
          <div className="cred-grid">
            {t.credibility.stats.map((stat) => (
              <div className="cred-card" key={stat.metric}>
                <h3>{stat.metric}</h3>
                <p>{stat.body}</p>
              </div>
            ))}
          </div>
          <div className="badge-row">
            {t.credibility.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </section>

        <section className="workflow" id="workflow">
          <div className="section-heading">
            <p className="eyebrow">{t.workflow.eyebrow}</p>
            <h2>{t.workflow.heading}</h2>
          </div>
          <div className="workflow-grid">
            {t.workflow.steps.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="faqs" id="faqs">
          <div className="section-heading">
            <p className="eyebrow">{t.faqs.eyebrow}</p>
            <h2>{t.faqs.heading}</h2>
          </div>
          <div className="faq-grid">
            {t.faqs.items.map((faq, index) => (
              <details key={faq.question} {...(index === 0 ? { open: true } : {})}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="cta-card">
            <h2>{t.cta.heading}</h2>
            <p>{t.cta.body}</p>
            <form className="cta-form" onSubmit={handleSubmit} noValidate>
              <label className="sr-only" htmlFor="email">
                {t.cta.fieldLabel}
              </label>
              <input type="email" id="email" name="email" placeholder={t.cta.placeholder} required />
              <button type="submit">{t.cta.submit}</button>
            </form>
            {showThanks && <p className="thanks">{t.cta.thanks}</p>}
            <p className="cta-footnote">
              {t.cta.footnote.intro}{' '}
              <a href={applyPrefix(t.cta.footnote.primary.href)}>{t.cta.footnote.primary.label}</a>{' '}
              {t.cta.footnote.separator}{' '}
              <a href={t.cta.footnote.secondary.href}>{t.cta.footnote.secondary.label}</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-meta">
            <a className="logo" href={applyPrefix('#top')} aria-label="Metics home">
              <img src="/Metics-blue.png" alt="Metics logo" />
            </a>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            {t.footer.sections.map((section) => (
              <div key={section.heading}>
                <h4>{section.heading}</h4>
                {section.links.map((link) => (
                  <a key={link.label} href={applyPrefix(link.href)}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-note">{footerNote}</div>
        </div>
      </footer>
    </div>
  );
}
