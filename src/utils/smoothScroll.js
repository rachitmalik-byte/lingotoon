// Smooth Scroll Dampener - Lowers mousewheel sensitivity and provides silky inertia scrolling
export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  let isScrolling = false;
  let targetY = window.scrollY;
  let currentY = window.scrollY;
  const ease = 0.065; // Silky smooth, slower controlled glide

  const onWheel = (e) => {
    // Do not intercept if inside scrollable inputs/textareas or modals
    let target = e.target;
    while (target && target !== document.body) {
      const overflowY = window.getComputedStyle(target).overflowY;
      if (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        target.scrollHeight > target.clientHeight &&
        target !== document.documentElement
      ) {
        return;
      }
      target = target.parentElement;
    }

    e.preventDefault();

    // Lower sensitivity: multiply delta by 0.42 so scrolling feels slower and buttery smooth
    const delta = e.deltaY * 0.42;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(updateScroll);
    }
  };

  const updateScroll = () => {
    const diff = targetY - currentY;
    if (Math.abs(diff) < 0.6) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isScrolling = false;
      return;
    }

    currentY += diff * ease;
    window.scrollTo(0, currentY);

    if (isScrolling) {
      requestAnimationFrame(updateScroll);
    }
  };

  const onNativeScroll = () => {
    if (!isScrolling) {
      targetY = window.scrollY;
      currentY = window.scrollY;
    }
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onNativeScroll, { passive: true });

  return () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('scroll', onNativeScroll);
  };
}
