'use strict';

(function initTyped() {
  const el = document.querySelector('.typed');
  if (!el) return;
  const items = el.dataset.typedItems.split(',').map(s => s.trim());
  new Typed('.typed', {
    strings: items,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
})();

(function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('mobile-nav-active');
    const icon = toggle.querySelector('i');
    icon.classList.toggle('icofont-navigation-menu');
    icon.classList.toggle('icofont-close');
  });

  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('mobile-nav-active')) return;
    const header = document.getElementById('header');
    if (!header.contains(e.target) && !toggle.contains(e.target)) {
      document.body.classList.remove('mobile-nav-active');
      const icon = toggle.querySelector('i');
      icon.classList.add('icofont-navigation-menu');
      icon.classList.remove('icofont-close');
    }
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        const icon = toggle.querySelector('i');
        icon.classList.add('icofont-navigation-menu');
        icon.classList.remove('icofont-close');
      }
    });
  });
})();

(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.parentElement.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));
})();

(function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const toggleBtn = () => {
    btn.classList.toggle('active', window.scrollY > 100);
  };

  window.addEventListener('scroll', toggleBtn, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

window.addEventListener('load', () => {
  ['css-icofont', 'css-boxicons', 'css-aos'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.media = 'all';
  });

  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
  });
});
