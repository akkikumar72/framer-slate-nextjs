import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { findTemplate, startTemplate, type TemplateServer } from "./helpers/template-server";

const template = findTemplate("roco");
const validPaths = new Set(template.routes.map(({ path }) => path));
const projectRoutes = template.routes.filter(({ path }) => path.startsWith("/roco/projects/"));
const deliveryUnavailable = "Message delivery is not configured yet. Please use a contact link to get in touch.";
let server: TemplateServer;

test.beforeAll(async () => {
  // Exercise the real unconfigured API without allowing a developer's endpoint
  // to receive test messages. The helper passes this environment to its child.
  const endpoint = process.env.ROCO_CONTACT_ENDPOINT;
  process.env.ROCO_CONTACT_ENDPOINT = "";
  try {
    server = await startTemplate(template);
  } finally {
    if (endpoint === undefined) delete process.env.ROCO_CONTACT_ENDPOINT;
    else process.env.ROCO_CONTACT_ENDPOINT = endpoint;
  }
  await mkdir("output/playwright/roco", { recursive: true });
});

test.afterAll(async () => { await server?.stop(); });

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    // Missing-route probes intentionally produce an HTTP 404 console message.
    if (message.type() === "error" && !/Failed to load resource:.*404/.test(message.text())) {
      errors.push(message.text());
    }
  });
  return errors;
}

for (const viewport of [
  { width: 1280, height: 900 },
  { width: 810, height: 1080 },
  { width: 390, height: 844 },
]) {
  test(`Roco's 55 routes retain source content, metadata, local assets and layout at ${viewport.width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.setViewportSize(viewport);
    const errors = collectErrors(page);
    const destinations = new Set<string>();
    expect(template.routes).toHaveLength(55);
    expect(projectRoutes).toHaveLength(47);

    for (const route of template.routes) {
      const response = await page.goto(`${server.baseUrl}${route.path}`);
      expect(response?.status(), route.path).toBe(route.status);
      await expect(page).toHaveTitle(route.title!);
      await expect(page.locator("main h1")).toHaveText(route.marker);
      await expect(page.locator("main h1")).toBeVisible();
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!, server.baseUrl).pathname, route.path).toBe(route.canonical);

      if (route.path.startsWith("/roco/projects/")) {
        await expect(page.getByRole("heading", { name: "My Approach", exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Conclusion", exact: true })).toBeVisible();
        expect(await page.locator("main p").count(), route.path).toBeGreaterThanOrEqual(8);
      }

      const links = await page.locator("a[href]").evaluateAll((elements) => elements.map((element) => (element as HTMLAnchorElement).href));
      for (const href of links) {
        const url = new URL(href);
        if (url.origin !== server.baseUrl) continue;
        expect(validPaths.has(url.pathname), `${route.path} links to unexpected route ${url.pathname}`).toBe(true);
        destinations.add(url.pathname);
      }

      // Scroll every rendered image into view so lazy assets are tested too.
      const images = page.locator("img:visible");
      expect(await images.count(), route.path).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image, `${route.path}: image must load`).toHaveJSProperty("complete", true);
        const state = await image.evaluate((element) => {
          const image = element as HTMLImageElement;
          return { width: image.naturalWidth, src: image.currentSrc || image.src };
        });
        expect(state.width, state.src).toBeGreaterThan(0);
        expect(new URL(state.src).origin).toBe(server.baseUrl);
        expect(new URL(state.src).pathname).toMatch(/^\/roco\//);
      }

      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route.path).toBeLessThanOrEqual(viewport.width + 1);
      // Keep visual evidence for every static family and one complete detail.
      if (!route.path.startsWith("/roco/projects/") || route.path === projectRoutes[0].path) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: `output/playwright/roco/${route.path.replaceAll("/", "-").slice(1)}-${viewport.width}.png`, fullPage: true });
      }
    }

    expect([...destinations].sort()).toEqual([...validPaths].sort());
    for (const route of template.invalidRoutes) {
      const response = await page.goto(`${server.baseUrl}${route.path}`);
      expect(response?.status(), route.path).toBe(route.status);
      await expect(page.getByRole("heading", { name: "404", exact: true })).toBeVisible();
      await expect(page.getByText(route.marker, { exact: true })).toBeVisible();
      await expect(page.getByRole("link", { name: "Back Home", exact: true })).toHaveAttribute("href", "/roco");
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route.path).toBeLessThanOrEqual(viewport.width + 1);
    }
    expect(errors).toEqual([]);
  });
}

test("Roco root and uppercase entry points redirect to its canonical route", async ({ request }) => {
  for (const route of [
    { path: "/", status: 307 },
    { path: "/Roco", status: 308 },
  ]) {
    const response = await request.get(`${server.baseUrl}${route.path}`, { maxRedirects: 0 });
    expect(response.status(), route.path).toBe(route.status);
    expect(new URL(response.headers().location, server.baseUrl).pathname).toBe("/roco");
  }
});

test("Roco's home and project index preserve the source card order and destinations", async ({ page }) => {
  await page.goto(`${server.baseUrl}/roco`);
  const recent = page.locator('main a[href^="/roco/projects/"]');
  const recentPaths = await recent.evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));
  expect([...new Set(recentPaths)]).toEqual(projectRoutes.slice(0, 2).map(({ path }) => path));
  for (const route of projectRoutes.slice(0, 2)) {
    await expect(page.locator(`main a[href="${route.path}"]`).first()).toContainText(route.marker);
  }
  await page.locator(`main a[href="${projectRoutes[0].path}"]`).first().click();
  await expect(page).toHaveURL(`${server.baseUrl}${projectRoutes[0].path}`);
  await expect(page.locator("main h1")).toHaveText(projectRoutes[0].marker);
  await expect(page.getByRole("link", { name: "View Projects", exact: true }).first()).toHaveAttribute("href", "/roco/projects");
  await expect(page.getByRole("link", { name: "Explore Next.js", exact: true }).first()).toHaveAttribute("href", "https://nextjs.org/");
  await page.getByRole("link", { name: "Back to Projects", exact: true }).first().click();
  await expect(page).toHaveURL(`${server.baseUrl}/roco/projects`);
  const cards = await page.locator('main a[href^="/roco/projects/"]').evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));
  expect([...new Set(cards)]).toEqual(projectRoutes.map(({ path }) => path));
});

test("Roco mobile navigation opens, closes and tracks the selected page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/roco`);
  const open = page.getByRole("button", { name: "Open navigation", exact: true });
  const close = page.getByRole("button", { name: "Close navigation", exact: true });
  await expect(open).toHaveAttribute("aria-expanded", "false");
  await open.click();
  await expect(close).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation").getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
  await close.press("Enter");
  await expect(open).toHaveAttribute("aria-expanded", "false");

  await open.click();
  await page.getByRole("navigation").getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(`${server.baseUrl}/roco/about`);
  await expect(open).toBeVisible();
  await open.click();
  await expect(page.getByRole("navigation").getByRole("link", { name: "About", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByRole("navigation").getByRole("link", { name: "Projects", exact: true }).click();
  await page.locator(`main a[href="${projectRoutes[0].path}"]`).first().click();
  await open.click();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Projects", exact: true })).toHaveAttribute("aria-current", "page");
  await close.click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
});

test("Roco contact validates fields and reports its unconfigured API without delivering a message", async ({ page }) => {
  await page.goto(`${server.baseUrl}/roco/contact`);
  const form = page.locator("main form");
  const name = form.getByLabel("Name", { exact: true });
  const email = form.getByLabel("Email", { exact: true });
  const message = form.getByLabel("Message", { exact: true });
  const submit = form.getByRole("button", { name: "Send Message", exact: true });
  const writes: string[] = [];
  const externalWrites: string[] = [];
  page.on("request", (request) => {
    if (["GET", "HEAD", "OPTIONS"].includes(request.method())) return;
    const entry = `${request.method()} ${request.url()}`;
    writes.push(entry);
    if (new URL(request.url()).origin !== server.baseUrl) externalWrites.push(entry);
  });

  await submit.click();
  await expect(name).toBeFocused();
  expect(await name.evaluate((element) => (element as HTMLInputElement).validity.valueMissing)).toBe(true);
  expect(writes).toEqual([]);
  await name.fill("Preview Tester");
  await email.fill("not-an-email");
  await message.fill("A local regression test only.");
  await submit.click();
  await expect(email).toBeFocused();
  expect(await email.evaluate((element) => (element as HTMLInputElement).validity.typeMismatch)).toBe(true);
  expect(writes).toEqual([]);

  await email.fill("preview@example.com");
  const responsePromise = page.waitForResponse((response) => response.url() === `${server.baseUrl}/roco/api/contact` && response.request().method() === "POST");
  await submit.click();
  const response = await responsePromise;
  expect(response.status()).toBe(503);
  expect(await response.json()).toEqual({ error: deliveryUnavailable });
  await expect(form.getByText(deliveryUnavailable, { exact: true })).toBeVisible();
  await expect(name).toHaveValue("Preview Tester");
  await expect(email).toHaveValue("preview@example.com");
  await expect(message).toHaveValue("A local regression test only.");
  await expect(submit).toBeEnabled();
  expect(writes).toEqual([`POST ${server.baseUrl}/roco/api/contact`]);
  expect(externalWrites).toEqual([]);
});

test("Roco contact rejects malformed payloads before attempting delivery", async ({ request }) => {
  for (const data of [null, [], "message", {}, { name: "Preview", email: "invalid", message: "Test" }]) {
    const response = await request.post(`${server.baseUrl}/roco/api/contact`, { data });
    expect(response.status()).toBe(400);
    expect((await response.json()).error).toBeTruthy();
  }
});

test("Roco reduced motion leaves the homepage, ticker and navigation usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${server.baseUrl}/roco`);
  await expect(page.locator("main h1")).toHaveText(template.routes[0].marker);
  for (const heading of ["Recent Projects", "Kind Words from Clients", "Stack"]) {
    const landmark = page.getByRole("heading", { name: heading, exact: true });
    await landmark.scrollIntoViewIfNeeded();
    await expect(landmark).toBeVisible();
  }
  const runningAnimations = await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").length);
  expect(runningAnimations).toBe(0);
  await page.locator(`main a[href="${projectRoutes[0].path}"]`).first().click();
  await expect(page.locator("main h1")).toHaveText(projectRoutes[0].marker);
});

test("Showcase exposes Roco with a loaded preview and working route redirects", async ({ page, request }) => {
  const showcase = await startTemplate(findTemplate("showcase"));
  try {
    await page.goto(showcase.baseUrl);
    const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "Roco", exact: true }) });
    await expect(card.getByRole("link", { name: "Open Roco", exact: true })).toHaveAttribute("href", "http://localhost:3019/roco");
    const preview = card.getByRole("img", { name: "Roco template home page", exact: true });
    await expect(preview).toBeVisible();
    await expect(preview).toHaveJSProperty("complete", true);
    expect(await preview.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    for (const path of ["/roco", projectRoutes[0].path]) {
      const redirect = await request.get(`${showcase.baseUrl}${path}`, { maxRedirects: 0 });
      expect(redirect.status()).toBe(307);
      expect(redirect.headers().location).toBe(`http://localhost:3019${path}`);
    }
  } finally {
    await showcase.stop();
  }
});
