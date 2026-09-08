// Native 60+ FPS Hardware-Accelerated Smooth Scroll Manager
export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  // Ensure CSS smooth scroll is active for buttery anchor and programmatic scrolling
  document.documentElement.style.scrollBehavior = 'smooth';

  return () => {
    document.documentElement.style.scrollBehavior = 'auto';
  };
}

