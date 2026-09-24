import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function registerMotion() {
  gsap.registerPlugin(ScrollTrigger);
  // A phone's toolbar sliding in and out resizes the window on every scroll
  // direction change; re-measuring the whole stage for that is pure jank.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/* --- smooth scroll -------------------------------------------------------
   `resolve(target)` may turn an anchor's target into a scroll position —
   on the stage, where every chapter lives at the same place on screen, the
   stage is the only thing that knows where in the scroll a chapter is. */
export function initSmoothScroll(resolve) {
  var lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  // NOT lagSmoothing(0), the usual Lenis snippet: with smoothing off, a
  // single long frame is applied in full, and a short timeline created just
  // before it renders straight to its end. That silently ate the whole
  // feature-swap spin. Bounded smoothing treats any frame over 500ms as
  // 33ms, so a hitch pauses the animation instead of skipping it.
  gsap.ticker.lagSmoothing(500, 33);
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var y = resolve ? resolve(target) : null;
      if (y == null) lenis.scrollTo(target, { offset: -10 });
      else lenis.scrollTo(y);
    });
  });
  return lenis;
}
