import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { findTemplate, startTemplate, type TemplateServer } from './helpers/template-server';
const template = findTemplate('alytics');
let server: TemplateServer;
test.beforeAll(async () => { server = await startTemplate(template); await mkdir('output/playwright/alytics', { recursive: true }); });
test.afterAll(async () => { await server?.stop(); });
for (const width of [1474, 810, 390]) {
  test(`Alytics complete route coverage and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1080 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if(message.type()==='error' && /hydrated|hydration|server rendered/i.test(message.text())) errors.push(message.text()); });
    for (const route of template.routes) {
      const response = await page.goto(`${server.baseUrl}${route.path}`);
      expect(response?.status(), route.path).toBe(200);
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${route.path}$`));
      const layout = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
      expect(layout.content, route.path).toBeLessThanOrEqual(layout.width + 1);
      // Load below-the-fold assets so the check covers real images rather than lazy placeholders.
      const images = page.locator('main img');
      for (const image of await images.all()) {
        if (!await image.isVisible()) continue;
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('main h1')).toBeInViewport();
      const captureName = route.path.replaceAll('/', '-').replace(/^-/, '');
      await page.screenshot({ path: `output/playwright/alytics/${captureName}-${width}.png`, fullPage: true });
    }
    for (const route of template.invalidRoutes) {
      const response = await page.goto(`${server.baseUrl}${route.path}`);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { name: '404!', exact: true })).toBeVisible();
      await expect(page).toHaveTitle('Page Not Found – Alytics');
    }
    expect(errors).toEqual([]);
  });
}
test('Alytics billing, independent FAQs, mobile menu, slideshow and truthful form', async ({ page }) => {
  await page.goto(`${server.baseUrl}/alytics`);
  const pricing = page.locator('#pricing');
  await pricing.getByRole('button', { name: 'Yearly -20%' }).click();
  for (const price of ['$139', '$199', '$599']) await expect(pricing.locator('strong[aria-hidden="false"]').filter({hasText:price})).toBeVisible();
  await pricing.getByRole('button', { name: 'Monthly', exact: true }).click();
  for (const price of ['$39', '$99', '$299']) await expect(pricing.locator('strong[aria-hidden="false"]').filter({hasText:price})).toBeVisible();
  const questions = page.locator('#faq button');
  for (const question of await questions.all()) {
    if (await question.getAttribute('aria-expanded') === 'true') await question.click();
    await question.press('Enter');
    await expect(question).toHaveAttribute('aria-expanded', 'true');
    const answerId = await question.getAttribute('aria-controls');
    await expect(page.locator(`#${answerId}`)).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Next testimonial' }).click();
  const mobileCard = page.locator('[aria-roledescription="slide"][data-active="true"]');
  await expect(mobileCard).toContainText('Elena Park');
  await page.getByRole('button', { name: 'Previous testimonial' }).click();
  await expect(mobileCard).toContainText('Carter June');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Features', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await page.goto(`${server.baseUrl}/alytics/newsletter`);
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(page.getByText('Please enter your name.', { exact: true })).toBeVisible();
  await page.getByLabel('Name', { exact: true }).fill('Preview Tester');
  await page.getByLabel('Email', { exact: true }).fill('preview@example.com');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('No subscription was created');
});


test('Showcase exposes Alytics with its preview and route redirect', async ({ page, request }) => {
  const showcase = await startTemplate(findTemplate('showcase'));
  try {
    await page.goto(showcase.baseUrl);
    const card = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Alytics', exact: true }) });
    await expect(card.getByRole('link', { name: 'Open Alytics' })).toHaveAttribute('href', 'http://localhost:3015/alytics');
    await expect(card.getByRole('img')).toHaveJSProperty('complete', true);
    expect(await card.getByRole('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const redirect = await request.get(`${showcase.baseUrl}/alytics/blog`, { maxRedirects: 0 });
    expect(redirect.status()).toBe(307);
    expect(redirect.headers().location).toBe('http://localhost:3015/alytics/blog');
  } finally {
    await showcase.stop();
  }
});
