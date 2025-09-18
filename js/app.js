const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const sticky = document.querySelector('[data-sticky]');
const floatingCards = document.querySelectorAll('[data-depth]');
const yearSpan = document.getElementById('year');
const mediaQuery = window.matchMedia('(pointer: fine)');

document.body.classList.remove('no-js');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

if (navToggle && navLinks) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-controls', 'primary-navigation');
  navLinks.id = 'primary-navigation';

  navToggle.addEventListener('click', () => {
    const expanded = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', expanded.toString());
    document.body.classList.toggle('nav-open', expanded);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

window.addEventListener('scroll', () => {
  const shouldCollapse = window.scrollY > 40;
  sticky?.style.setProperty('transform', shouldCollapse ? 'scale(0.98)' : 'scale(1)');
  sticky?.style.setProperty('background', shouldCollapse ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.82)');
  sticky?.style.setProperty(
    'box-shadow',
    shouldCollapse ? '0 24px 70px rgba(35, 39, 47, 0.12)' : '0 18px 50px rgba(32, 36, 43, 0.08)'
  );
});

const handleParallax = (event) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  const normX = (clientX / innerWidth - 0.5) * 2;
  const normY = (clientY / innerHeight - 0.5) * 2;

  floatingCards.forEach((card) => {
    const depth = Number(card.dataset.depth ?? 0.1);
    const translateX = normX * depth * -18;
    const translateY = normY * depth * -12;
    card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  });
};

let parallaxActive = false;

const updateParallax = (mq) => {
  const matches = mq.matches ?? mediaQuery.matches;
  if (matches && !parallaxActive) {
    document.addEventListener('pointermove', handleParallax);
    parallaxActive = true;
  } else if (!matches && parallaxActive) {
    document.removeEventListener('pointermove', handleParallax);
    floatingCards.forEach((card) => {
      card.style.transform = 'translate3d(0, 0, 0)';
    });
    parallaxActive = false;
  }
};

updateParallax(mediaQuery);

if (typeof mediaQuery.addEventListener === 'function') {
  mediaQuery.addEventListener('change', updateParallax);
} else if (typeof mediaQuery.addListener === 'function') {
  mediaQuery.addListener(updateParallax);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 960) {
    navLinks?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
});

const form = document.querySelector('.cta-form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput?.value) {
    form.reset();
    form.insertAdjacentHTML(
      'afterend',
      '<p class="thanks">Thanks, the Metics team will reach out shortly.</p>'
    );
    setTimeout(() => {
      form.parentElement?.querySelector('.thanks')?.remove();
    }, 4000);
  }
});
