/* ===========================================================================
   ONEXTAP — entry point
   Mounts every feature's markup into index.html, then — motion permitting —
   hands the page to the stage, which plays it as one scroll timeline.
   =========================================================================== */

// Shared styles first, in cascade order.
import './shared/styles/tokens.css';
import './shared/styles/base.css';
import './shared/styles/layout.css';
import './shared/styles/buttons.css';
import './shared/styles/stage.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mountFeatures } from './app/mount.js';
import { createStage } from './app/stage.js';
import { pageChapters } from './app/chapters.js';
import { prefersReducedMotion, registerMotion, initSmoothScroll } from './shared/lib/motion.js';

import * as cursor from './features/cursor/cursor.js';
import * as hud from './features/hud/hud.js';
import * as hero from './features/hero/hero.js';
import * as formFields from './features/form-fields/form-fields.js';
import * as featureShowcase from './features/feature-showcase/feature-showcase.js';
import * as jobBoards from './features/job-boards/job-boards.js';
import * as pricing from './features/pricing/pricing.js';
import * as closing from './features/closing/closing.js';
import * as footer from './features/footer/footer.js';

// Keys match the data-mount attributes in index.html.
mountFeatures({
  'cursor': cursor,
  'hud': hud,
  'hero': hero,
  'form-fields': formFields,
  'feature-showcase': featureShowcase,
  'job-boards': jobBoards,
  'pricing': pricing,
  'closing': closing,
  'footer': footer
});

// Content that must work with or without motion.
var hudApi = hud.initHud();
var tabs = featureShowcase.initFeatureTabs();

// No motion wanted: the chapters stay in normal flow, one full screen each,
// with every state already shown (the .no-motion rules), and we stop.
if (prefersReducedMotion) {
  document.documentElement.classList.add('no-motion');
} else {
  registerMotion();

  var stage = null;
  var lenis = initSmoothScroll(function (target) { return stage && stage.scrollFor(target); });

  stage = createStage({
    track: document.getElementById('stageTrack'),
    stage: document.getElementById('stage'),
    chapters: pageChapters({
      hero: hero.initHero(),
      form: formFields.initFormFields(),
      features: featureShowcase.initFeatureChapter(),
      demo: featureShowcase.initDemoForm(),
      boards: jobBoards.initJobBoards(),
      pricing: pricing.initPricing(),
      closing: closing.initClosing(),
      footer: footer.initFooter()
    }),
    scrollTo: function (y, immediate) { lenis.scrollTo(y, { immediate: !!immediate }); }
  });

  var cur = cursor.initCursor();
  featureShowcase.initRail({
    paintFeature: tabs.paintFeature,
    setSwapHandler: tabs.setSwapHandler,
    cursor: cur
  });

  hudApi.setOverlay(stage.groundAt);
  ScrollTrigger.refresh();

  // The e2e tests read the stage's layout and drive the scroll from here
  // (dev server only; stripped from production builds).
  if (import.meta.env.DEV) { window.__stage = stage; window.__lenis = lenis; }
}
