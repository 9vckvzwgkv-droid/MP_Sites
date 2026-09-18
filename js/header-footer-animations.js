/* MAELIE — micro-interactions header/footer. No business logic touched. */
(function () {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const header = document.querySelector('.site-header');
  const footer = document.querySelector('.site-footer');
  if (!header && !footer) return;

  // Petit effet d'entrée différé sur les liens : visuel, sans modifier leur comportement.
  if (header) {
    const links = header.querySelectorAll('.nav-links a');
    links.forEach((link, i) => {
      link.style.animation = `maelieNavIn .55s cubic-bezier(.22,.8,.2,1) ${0.18 + i * 0.07}s both`;
    });
  }

  // Le footer gagne son mouvement lorsqu'il entre réellement dans le viewport.
  if (footer && 'IntersectionObserver' in window) {
    footer.classList.add('ma-footer-ready');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        footer.classList.add('ma-footer-visible');
        obs.unobserve(footer);
      });
    }, { threshold: 0.12 });
    observer.observe(footer);
  }
})();
