import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  findTemplate,
  startTemplate,
  type TemplateServer,
} from "./helpers/template-server";

const template = findTemplate("gridfolio");
let server: TemplateServer;

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  server = await startTemplate(template);
});

test.afterAll(async () => {
  await server?.stop();
});

async function expectDialogLifecycle(
  page: Page,
  trigger: Locator,
  title: string,
) {
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: title, exact: true });
  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
}

test("desktop controls open all five dialogs and restore focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${server.baseUrl}/gridfolio`);

  await expectDialogLifecycle(
    page,
    page.getByRole("button", { name: "About", exact: true }),
    "Antonio Misk",
  );
  await expectDialogLifecycle(
    page,
    page.getByRole("button", { name: "Resume", exact: true }),
    "My resume",
  );
  await expectDialogLifecycle(
    page,
    page.getByRole("button", { name: "Contact", exact: true }),
    "Let's have a chat",
  );

  for (const caseStudy of ["ChatAI", "Startup AI"] as const) {
    const trigger = page.getByRole("button", {
      name: `View ${caseStudy} case study`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: caseStudy, exact: true });
    await expect(dialog).toBeVisible();
    const review = dialog.getByText("Review", { exact: true });
    await review.scrollIntoViewIfNeeded();
    await expect(review).toBeVisible();
    await dialog.getByRole("button", { name: "Close dialog", exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

test("contact form validates locally and reports an honest preview result", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${server.baseUrl}/gridfolio`);
  await page.getByRole("button", { name: "Contact", exact: true }).click();

  const dialog = page.getByRole("dialog", {
    name: "Let's have a chat",
    exact: true,
  });
  const form = dialog.locator("form");
  const submit = form.getByRole("button", { name: /send/i });
  await submit.click();
  expect(await form.locator(":invalid").count()).toBeGreaterThan(0);

  await form.getByLabel("Name", { exact: true }).fill("Preview Tester");
  await form.getByLabel("Email", { exact: true }).fill("preview@example.com");
  await form.getByLabel("Message", { exact: true }).fill("Hello from the local preview.");

  const writeRequests: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      writeRequests.push(`${request.method()} ${request.url()}`);
    }
  });
  await submit.click();
  await expect(dialog.getByRole("status")).toHaveText(
    "Preview only. No message has been sent.",
  );
  expect(writeRequests).toEqual([]);
});

test("unknown GridFolio paths render the branded 404", async ({ page }) => {
  const response = await page.goto(`${server.baseUrl}/gridfolio/__missing__`);
  expect(response?.status()).toBe(404);
  await expect(page.locator("main")).toBeVisible();
  const artwork = page.getByRole("img", { name: "404", exact: true });
  await expect.poll(() => artwork.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
});

test("mobile menu navigates to dialogs without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/gridfolio`);

  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");

  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
    exact: true,
  });
  await expect(navigation).toBeVisible();
  const about = navigation.getByRole("button", { name: "About", exact: true });
  await expect(about).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(menu).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(navigation.getByRole("button", { name: "Contact", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(menu).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(about).toBeFocused();
  await about.click();
  await expect(
    page.getByRole("dialog", { name: "Antonio Misk", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");

  const layout = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(layout.content).toBeLessThanOrEqual(layout.viewport + 1);
  await expect(menu).toBeFocused();
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("dialog", { name: "Mobile menu", exact: true })).toBeHidden();
  await expect(page.getByRole("button", { name: "About", exact: true })).toBeVisible();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
});

test("reduced motion keeps the home page and controls visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/gridfolio`);

  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "View ChatAI case study",
      exact: true,
    }),
  ).toBeVisible();
});

test("showcase exposes the GridFolio card and both route spellings", async ({ page, request }) => {
  const showcase = await startTemplate(findTemplate("showcase"));
  try {
    await page.goto(showcase.baseUrl);
    const card = page.getByRole("link", { name: "Open GridFolio", exact: true });
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", "http://localhost:3017/gridfolio");
    const image = card.locator("img");
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    for (const path of ["/gridfolio", "/GridFolio"]) {
      const response = await request.get(`${showcase.baseUrl}${path}`, { maxRedirects: 0 });
      expect(response.status()).toBe(307);
      expect(response.headers().location).toBe("http://localhost:3017/gridfolio");
    }
  } finally {
    await showcase.stop();
  }
});
