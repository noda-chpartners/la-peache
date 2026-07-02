function setDelay(element: Element) {
  const delay = element.getAttribute('data-animate-delay');

  if (delay) {
    element.style.setProperty('--animate-delay', `${delay}ms`);
  }
}

function initScrollAnimate() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animated = document.querySelectorAll('[data-animate]');

  animated.forEach((element) => {
    setDelay(element);

    if (reducedMotion) {
      element.classList.add('is-visible');
    }
  });

  if (reducedMotion) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  animated.forEach((element) => {
    observer.observe(element);
  });
}

initScrollAnimate();

document.addEventListener('astro:page-load', initScrollAnimate);
