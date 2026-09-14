import { expect, test, type Locator } from '@playwright/test';
import { findTemplate, startTemplate, type TemplateServer } from './helpers/template-server';

let server: TemplateServer;
test.use({ contextOptions: { reducedMotion: 'no-preference' } });
test.beforeAll(async () => { server = await startTemplate(findTemplate('alytics')); });
test.afterAll(async () => { await server?.stop(); });

async function sampleTransform(locator: Locator, duration = 1400) {
  return locator.evaluate(async (element, duration) => {
    const samples: { x: number; y: number; rotation: number; scale: number; opacity: number }[] = [];
    const started = performance.now();
    await new Promise<void>(resolve => {
      const frame = () => {
        const style = getComputedStyle(element);
        const matrix = new DOMMatrixReadOnly(style.transform);
        samples.push({ x: matrix.m41, y: matrix.m42, rotation: Math.atan2(matrix.m12, matrix.m11) * 180 / Math.PI, scale: Math.hypot(matrix.m11, matrix.m12), opacity: Number(style.opacity) });
        if (performance.now() - started < duration) requestAnimationFrame(frame); else resolve();
      };
      requestAnimationFrame(frame);
    });
    return samples;
  }, duration);
}

for (const width of [1474, 810, 390]) {
  test(`Newsletter envelopes float and rock independently at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${server.baseUrl}/alytics`);
    const cta = page.locator('[data-newsletter-cta]');
    await cta.scrollIntoViewIfNeeded();
    const left = cta.locator('[data-newsletter-envelope="left"]');
    const right = cta.locator('[data-newsletter-envelope="right"]');
    await expect(left).toHaveCSS('opacity', '1');
    await expect(right).toHaveCSS('opacity', '1');
    const [rotation, float, rightRotation, rightFloat] = await Promise.all([
      sampleTransform(left.locator(':scope > div'), 2000), sampleTransform(left.locator('img'), 2000),
      sampleTransform(right.locator(':scope > div'), 2000), sampleTransform(right.locator('img'), 2000),
    ]);
    const angles = rotation.map(s => s.rotation);
    const offsets = float.map(s => s.y);
    expect(Math.min(...angles)).toBeGreaterThanOrEqual(-19.01);
    expect(Math.max(...angles)).toBeLessThanOrEqual(-2.99);
    expect(Math.max(...angles) - Math.min(...angles)).toBeGreaterThan(2);
    expect(Math.min(...offsets)).toBeGreaterThanOrEqual(-15.01);
    expect(Math.max(...offsets)).toBeLessThanOrEqual(0.01);
    expect(Math.max(...offsets) - Math.min(...offsets)).toBeGreaterThan(2);
    const rightAngles = rightRotation.map(sample => sample.rotation);
    const rightOffsets = rightFloat.map(sample => sample.y);
    expect(Math.min(...rightAngles)).toBeGreaterThanOrEqual(-6.01);
    expect(Math.max(...rightAngles)).toBeLessThanOrEqual(9.01);
    expect(Math.max(...rightAngles) - Math.min(...rightAngles)).toBeGreaterThan(2);
    expect(Math.min(...rightOffsets)).toBeGreaterThanOrEqual(-15.01);
    expect(Math.max(...rightOffsets)).toBeLessThanOrEqual(0.01);
    expect(Math.max(...rightOffsets) - Math.min(...rightOffsets)).toBeGreaterThan(2);
    // Like the source, finish the current leg when offscreen, then restore the base.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(async () => (await sampleTransform(left.locator(':scope > div'), 20))[0].rotation, { timeout: 5000 }).toBeCloseTo(-19, 1);
    await expect.poll(async () => (await sampleTransform(left.locator('img'), 20))[0].y, { timeout: 4000 }).toBeCloseTo(0, 1);
    await expect.poll(async () => (await sampleTransform(right.locator(':scope > div'), 20))[0].rotation).toBeCloseTo(9, 1);
  });
}

test('Blog cards reveal independently once and reverse their spring hover', async ({ page }) => {
  await page.setViewportSize({ width: 1474, height: 720 });
  await page.goto(`${server.baseUrl}/alytics`);
  const cards = page.locator('.home-blog-preview [data-reveal-threshold="0.5"]');
  const first = cards.first();
  await expect(first).toHaveAttribute('data-reveal', 'waiting');
  await first.evaluate(el => {
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: scrollY + r.top + r.height * 0.45 - innerHeight, behavior: 'instant' });
  });
  await expect(first).toHaveAttribute('data-reveal', 'waiting');
  await first.evaluate(el => {
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: scrollY + r.top + r.height * 0.55 - innerHeight, behavior: 'instant' });
  });
  await expect(first).toHaveAttribute('data-reveal', 'visible');
  await expect(first).toHaveCSS('opacity', '1');
  const card = first.locator('a');
  await card.hover();
  const image = card.locator('img');
  await expect.poll(async () => (await sampleTransform(image, 20))[0].scale).toBeCloseTo(1.08, 2);
  await page.mouse.move(10, 200);
  await expect.poll(async () => (await sampleTransform(image, 20))[0].scale).toBeCloseTo(1, 2);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveCSS('opacity', '1');
  const viewAll = page.getByRole('link', { name: 'View all', exact: true });
  await viewAll.hover();
  await expect(viewAll).toHaveCSS('opacity', '0.64');
  await expect.poll(async () => (await sampleTransform(viewAll.locator('svg'), 20))[0].rotation).toBeCloseTo(-45, 1);
});

test('Hero scroll tilt, rolling buttons, pricing and FAQ retain intermediate motion', async ({ page }) => {
  await page.setViewportSize({ width: 1474, height: 720 });
  await page.goto(`${server.baseUrl}/alytics`);
  const dashboard = page.locator('[data-dashboard-motion]');
  await expect(dashboard).toHaveCSS('opacity', '1');
  await expect.poll(() => dashboard.evaluate(e => Math.atan2(new DOMMatrixReadOnly(getComputedStyle(e).transform).m23, new DOMMatrixReadOnly(getComputedStyle(e).transform).m22) * 180 / Math.PI)).toBeCloseTo(23.833, 1);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await expect.poll(() => dashboard.evaluate(e => Math.atan2(new DOMMatrixReadOnly(getComputedStyle(e).transform).m23, new DOMMatrixReadOnly(getComputedStyle(e).transform).m22) * 180 / Math.PI)).toBeCloseTo(0, 1);
  const button = page.getByRole('link', { name: 'Get Started For Free', exact: true });
  await button.hover();
  await expect.poll(async () => (await sampleTransform(button.locator('.button-roll > span').last(), 20))[0].y).toBeCloseTo(-21, 1);
  const pricing = page.locator('#pricing');
  await pricing.getByRole('button', { name: 'Yearly -20%' }).click();
  for (const price of ['$139', '$199', '$599']) await expect(pricing.locator('strong[aria-hidden="false"]').filter({ hasText: price })).toHaveCSS('opacity', '1');
  const question = page.locator('#faq button').nth(1);
  await question.scrollIntoViewIfNeeded();
  await question.click();
  const answer = page.locator(`#${await question.getAttribute('aria-controls')}`);
  const heights = await answer.evaluate(async el => {
    const values: number[] = [];
    const started = performance.now();
    await new Promise<void>(resolve => { const frame = () => { values.push(el.getBoundingClientRect().height); if(performance.now() - started < 800)requestAnimationFrame(frame);else resolve(); };requestAnimationFrame(frame); });
    return values;
  });
  expect(Math.max(...heights) - Math.min(...heights)).toBeGreaterThan(1);
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await expect(page.getByRole('banner')).toHaveCSS('height','844px');
  await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('banner')).toHaveCSS('height','58px');
  await expect(page.getByRole('button',{name:'Open menu',exact:true})).toBeFocused();
});

test('Reduced motion leaves artwork still and keeps content and controls usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/alytics`);
  await page.locator('[data-newsletter-cta]').scrollIntoViewIfNeeded();
  const envelope = page.locator('[data-newsletter-envelope="left"] img');
  const samples = await sampleTransform(envelope, 700);
  expect(samples.every(sample => Math.abs(sample.y) < 0.01)).toBe(true);
  await expect(page.getByRole('link', { name: 'Subscribe Now', exact: true })).toBeVisible();
  const image = page.locator('.home-blog-preview a img').filter({visible:true}).first();
  await image.hover();
  expect((await sampleTransform(image, 100)).every(sample => Math.abs(sample.scale - 1) < 0.01)).toBe(true);
  const ticker = page.getByRole('group', {name:'Trusted companies',exact:true});
  await ticker.scrollIntoViewIfNeeded();
  await ticker.focus();
  const before = (await sampleTransform(ticker, 20))[0].x;
  await ticker.press('ArrowRight');
  expect((await sampleTransform(ticker, 20))[0].x).toBeLessThan(before);
});

test('Phone testimonials keep their order, support drag and do not autoplay', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/alytics`);
  const carousel = page.getByRole('region', { name: 'Customer testimonials', exact: true });
  await carousel.scrollIntoViewIfNeeded();
  const active = carousel.locator('[aria-roledescription="slide"][data-active="true"]');
  await expect(active).toContainText('Carter June');
  await page.waitForTimeout(5500);
  await expect(active).toContainText('Carter June');
  for (const name of ['Elena Park', 'James Nair', 'Marcus Lee', 'Sarah Bond', 'Carter June']) {
    await carousel.getByRole('button', { name: 'Next testimonial' }).click();
    await expect(active).toContainText(name);
  }
  // Switching from keyboard activation to a pointer drag must not cancel the gesture.
  await carousel.getByRole('button', {name:'Previous testimonial'}).press('Enter');
  await expect(active).toContainText('Sarah Bond');
  await expect(active).toBeInViewport({ratio:0.99});
  const box = await active.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + 280, box!.y + 130);
  await page.mouse.down();
  for (let step = 1; step <= 12; step++) {
    await page.mouse.move(box!.x + 280 - step * 20, box!.y + 130);
    await page.waitForTimeout(20);
  }
  await page.mouse.up();
  await expect(active).toContainText('Carter June');
});
