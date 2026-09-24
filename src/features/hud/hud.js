import markup from './hud.html?raw';
import './hud.css';

export { markup };

/* --- chapter label + scroll progress (works with or without GSAP) ------ */
export function initHud() {
  var hudEl = document.querySelector('.hud');
  var hudFootEl = document.querySelector('.hud-foot');

  // Both questions — what ground is under the header, which chapter is on
  // screen — are asked of whatever is actually painted at a point. That
  // works the same for chapters in normal flow and for the stage, where
  // every chapter sits at the same place and only the one on top counts.
  // (clip-path and visibility clip hit-testing too, so a sheet that is
  // mid-exit answers only where it is still drawn.)
  function closestAt(y, attr) {
    var stack = document.elementsFromPoint(Math.round(window.innerWidth / 2), y);
    for (var i = 0; i < stack.length; i++) {
      var g = stack[i].closest && stack[i].closest('[' + attr + ']');
      if (g) return g.getAttribute(attr);
    }
    return null;
  }
  // Effects painted in WebGL are not in the DOM to be hit-tested; the stage
  // answers for them when it is running (see setOverlay below).
  var overlay = null;
  function groundAt(y) {
    var g = overlay && overlay(Math.round(window.innerWidth / 2), y);
    return g || closestAt(y, 'data-ground') || 'ink';
  }
  function paintHud() {
    hudEl.dataset.hud = groundAt(26) === 'ink' ? 'light' : 'dark';
    hudFootEl.dataset.hud = groundAt(window.innerHeight - 26) === 'ink' ? 'light' : 'dark';
  }

  var labelEl = document.getElementById('chapterLabel');
  var barEl = document.getElementById('progressBar');
  var pctEl = document.getElementById('progressPct');

  function updateHud() {
    queued = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    barEl.style.width = (p * 100).toFixed(1) + '%';
    pctEl.textContent = String(Math.round(p * 100)).padStart(2, '0');

    var current = closestAt(Math.round(window.innerHeight * 0.55), 'data-chapter');
    if (current && labelEl.textContent !== current) labelEl.textContent = current;
    paintHud();
  }

  // Read on the next frame rather than inside the scroll event: by then the
  // scroll-driven animation for this position has been applied, so the HUD
  // reads the layers as they are about to be painted, not a frame stale.
  var queued = false;
  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateHud);
  }
  updateHud();
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  return {
    refresh: queue,
    setOverlay: function (fn) { overlay = fn; queue(); }
  };
}
