// End-to-end checks for the stage: every chapter, every transition, and the
// features that have to keep working through all of it.
import { test, expect } from '@playwright/test';

async function boot(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/');
  await page.waitForFunction(() => window.__stage && window.__stage.info().snapshotsPending === 0, null, { timeout: 30000 });
  return errors;
}

const info = page => page.evaluate(() => window.__stage.info());
const chapter = (i, id) => i.chapters.find(c => c.id === id);

// Jump the scroll to timeline time `t` (in screens) and let a frame render.
async function seek(page, t) {
  await page.evaluate(t => new Promise(done => {
    const i = window.__stage.info();
    window.__lenis.scrollTo(i.top + t * i.unit, { immediate: true, force: true });
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(done, 80)));
  }), t);
}

const handOff = page => page.evaluate(() => ({
  canvas: getComputedStyle(document.querySelector('canvas.fx')).visibility,
  form: getComputedStyle(document.getElementById('form')).visibility
}));

test.describe('stage', () => {
  test('boots cleanly, with every chapter a full-screen layer', async ({ page }) => {
    const errors = await boot(page);
    const i = await info(page);
    expect(i.chapters.map(c => c.id)).toEqual(['hero', 'form', 'how', 'watch', 'boards', 'price', 'close', 'foot']);
    const sizes = await page.evaluate(() => {
      const stage = document.getElementById('stage');
      return [...document.querySelectorAll('.layer')].map(l => ({ w: l.offsetWidth, h: l.offsetHeight, sw: stage.clientWidth, sh: stage.clientHeight }));
    });
    for (const s of sizes) {
      expect(s.w).toBe(s.sw);
      expect(s.h).toBeGreaterThanOrEqual(s.sh);
    }
    expect(errors).toEqual([]);
  });

  test('each chapter arrives on top, and the header names it', async ({ page }) => {
    await boot(page);
    for (const ch of (await info(page)).chapters) {
      await seek(page, ch.arrive + 0.05);
      const r = await page.evaluate(() => {
        const layer = document.elementFromPoint(innerWidth / 2, innerHeight / 2).closest('.layer');
        return { id: layer.id || layer.classList[0], chapter: layer.getAttribute('data-chapter') };
      });
      expect(r.id).toBe(ch.id);
      await expect.poll(() => page.textContent('#chapterLabel')).toBe(r.chapter);
    }
  });

  test('nothing overflows sideways at any point', async ({ page }) => {
    await boot(page);
    const i = await info(page);
    for (let t = 0; t < i.duration; t += 0.5) {
      await seek(page, t);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });

  test('a crumple hands the section to WebGL, and back when scrolled up', async ({ page }) => {
    await boot(page);
    const i = await info(page);
    test.skip(!i.webgl, 'no WebGL in this browser');
    const how = chapter(i, 'how'), form = chapter(i, 'form');
    await seek(page, how.start + (form.end - how.start) * 0.4);
    expect(await handOff(page)).toEqual({ canvas: 'visible', form: 'hidden' });
    await seek(page, how.start - 0.05);
    expect(await handOff(page)).toEqual({ canvas: 'hidden', form: 'visible' });
  });

  test('a lost WebGL context drops to the CSS crumple mid-exit', async ({ page }) => {
    await boot(page);
    const i = await info(page);
    test.skip(!i.webgl, 'no WebGL in this browser');
    const how = chapter(i, 'how'), form = chapter(i, 'form');
    await seek(page, how.start + (form.end - how.start) * 0.4);
    await page.evaluate(() => {
      const c = document.querySelector('canvas.fx');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      gl.getExtension('WEBGL_lose_context').loseContext();
    });
    await expect.poll(() => page.evaluate(() => {
      const s = getComputedStyle(document.getElementById('form'));
      return s.visibility === 'visible' && s.clipPath.startsWith('polygon') && s.transform !== 'none';
    })).toBe(true);
  });

  test('header nav links land on their chapter', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the header nav is hidden on narrow screens');
    await boot(page);
    await page.click('.hud__nav a[href="#price"]');
    await expect.poll(() => page.textContent('#chapterLabel'), { timeout: 15000 }).toBe('04 — Pricing');
    await page.click('.hud__nav a[href="#form"]');
    await expect.poll(() => page.textContent('#chapterLabel'), { timeout: 15000 }).toBe('01 — The form');
  });

  // The swap happens mid-spin, on the animation clock: allow for a software
  // renderer (see playwright.config.js) that only manages a few frames/sec.
  test('feature tabs still swap the deck', async ({ page, browserName }) => {
    const slow = browserName === 'webkit' ? 30000 : 5000;
    await boot(page);
    await seek(page, chapter(await info(page), 'how').arrive + 0.1);
    await page.click('#tab-profiles');
    await expect(page.locator('#tab-profiles')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#featDesc')).toContainText('One profile per direction', { timeout: slow });
    await expect.poll(() => page.evaluate(() =>
      document.querySelector('#railTrack .rcard:not([data-clone]) .rcard__t').textContent
    ), { timeout: slow }).toBe('One per direction');
  });

  test('the deck can still be dragged', async ({ page, isMobile, browserName }) => {
    test.skip(isMobile, 'mouse drag');
    test.slow(browserName === 'webkit', 'software renderer');
    await boot(page);
    await seek(page, chapter(await info(page), 'how').arrive + 0.1);
    const box = await page.locator('#rail').boundingBox();
    const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
    const before = await page.evaluate(() => document.getElementById('railTrack').style.transform);
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 260, cy, { steps: 12 });
    await page.mouse.up();
    await expect.poll(() => page.evaluate(() => document.getElementById('railTrack').style.transform),
      { timeout: browserName === 'webkit' ? 30000 : 5000 }).not.toBe(before);
  });

  test('a new width rebuilds the stage without errors', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop resize');
    const errors = await boot(page);
    await page.setViewportSize({ width: 820, height: 1180 });
    await page.waitForFunction(() => {
      const i = window.__stage.info();
      return i.unit === document.getElementById('stage').clientHeight && i.snapshotsPending === 0;
    }, null, { timeout: 20000 });
    const i = await info(page);
    await seek(page, chapter(i, 'price').arrive + 0.05);
    await expect.poll(() => page.textContent('#chapterLabel')).toBe('04 — Pricing');
    expect(errors).toEqual([]);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('reads as plain full-height sections with every state shown', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    const r = await page.evaluate(() => ({
      live: document.getElementById('stage').classList.contains('stage--live'),
      noMotion: document.documentElement.classList.contains('no-motion'),
      canvas: !!document.querySelector('canvas.fx'),
      heights: [...document.querySelectorAll('.layer')].map(l => l.offsetHeight),
      vh: innerHeight,
      fill: getComputedStyle(document.querySelector('.field')).getPropertyValue('--fill').trim(),
      strike: getComputedStyle(document.getElementById('strike')).transform
    }));
    expect(r.live).toBe(false);
    expect(r.noMotion).toBe(true);
    expect(r.canvas).toBe(false);
    for (const h of r.heights) expect(h).toBeGreaterThanOrEqual(r.vh - 1);
    expect(r.fill).toBe('1');
    expect(r.strike).toBe('matrix(1, 0, 0, 1, 0, 0)');
    // The tabs are content, not decoration: they must still switch.
    await page.click('#tab-storage');
    await expect(page.locator('#featDesc')).toContainText('Your profile stays in your browser');
    expect(errors).toEqual([]);
  });
});
