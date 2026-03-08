/* ============================================================
   PMGI SCHOOL OF MINISTRY — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── MOBILE NAV TOGGLE ── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── HERO PARTICLES ── */
  const particleContainer = document.getElementById('particles');
  const NUM_PARTICLES = 60;

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    particleContainer.appendChild(p);
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.about-grid, .course-card, .degree-card, .lf-item, .pillar, .contact-method, .contact-form-wrap, .contact-info, .leadership-quote-wrap, .section-header'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger children within grids
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Stagger course cards and degree cards
  document.querySelectorAll('.course-card').forEach((el, i) => {
    el.dataset.revealDelay = i * 60;
  });
  document.querySelectorAll('.degree-card').forEach((el, i) => {
    el.dataset.revealDelay = i * 100;
  });
  document.querySelectorAll('.lf-item').forEach((el, i) => {
    el.dataset.revealDelay = i * 100;
  });
  document.querySelectorAll('.pillar').forEach((el, i) => {
    el.dataset.revealDelay = i * 80;
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── REGISTRATION FORM SUBMISSION ── */
  const form        = document.getElementById('reg-form');
  const submitBtn   = document.getElementById('submit-btn');
  const btnText     = submitBtn.querySelector('.btn-text');
  const btnLoader   = submitBtn.querySelector('.btn-loader');
  const formSuccess = document.getElementById('form-success');
  const formError   = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // UI: loading state
    btnText.hidden  = true;
    btnLoader.hidden = false;
    submitBtn.disabled = true;
    formSuccess.hidden = true;
    formError.hidden   = true;

    const payload = {
      firstName: form.firstName.value.trim(),
      lastName:  form.lastName.value.trim(),
      email:     form.email.value.trim(),
      phone:     form.phone.value.trim(),
      program:   form.program.value,
      course:    form.course.value,
      message:   form.message.value.trim(),
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        form.reset();
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      formError.hidden = false;
      formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      btnText.hidden   = false;
      btnLoader.hidden = true;
      submitBtn.disabled = false;
    }
  });

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── COURSE CARD HOVER GLOW ── */
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  /* ── YEAR IN FOOTER ── */
  const yr = document.querySelector('.footer-bottom p');
  if (yr) {
    yr.textContent = yr.textContent.replace(/\d{4}/, new Date().getFullYear());
  }

});
