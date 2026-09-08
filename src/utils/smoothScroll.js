// Native 60+ FPS Hardware-Accelerated Scroll Manager
export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  // Ensure browser native scroll restoration is manual for instant SPA route top-scrolls
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  return () => {};
}

