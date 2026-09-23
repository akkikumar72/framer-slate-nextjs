import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import {
  findTemplate,
  startTemplate,
  type TemplateServer,
} from "./helpers/template-server";

const template = findTemplate("nue");
const validPaths = new Set(template.routes.map(({ path }) => path));
const motionRoutes = [
  ...template.routes,
  template.invalidRoutes.find(({ path }) => path === "/nue/404")!,
];
let server: TemplateServer;

test.beforeAll(async () => {
  server = await startTemplate(template);
  await mkdir("output/playwright/nue", { recursive: true });
});
test.afterAll(async () => {
  await server?.stop();
});

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    // Intentional missing-route probes generate a browser network error.
    // Image requests are independently checked for successful loading below.
    if (
      message.type() === "error" &&
      !/Failed to load resource:.*404/.test(message.text())
    ) {
      errors.push(message.text());
    }
  });
  return errors;
}

async function expectNextBranding(page: Page, route: string) {
  const legacyBranding = await page.evaluate(() => {
    const content = [
      { source: "rendered text", value: document.body.innerText },
      { source: "page title", value: document.title },
      ...Array.from(
        document.querySelectorAll("a[href], link[href]"),
        (element) => ({
          source: `${element.tagName.toLowerCase()} href`,
          value: element.getAttribute("href") || "",
        }),
      ),
      ...Array.from(document.querySelectorAll("meta[content]"), (element) => ({
        source:
          element.getAttribute("name") ||
          element.getAttribute("property") ||
          "metadata",
        value: element.getAttribute("content") || "",
      })),
      ...Array.from(
        document.querySelectorAll("[aria-label], img[alt]"),
        (element) => ({
          source: "accessible label",
          value:
            element.getAttribute("aria-label") ||
            element.getAttribute("alt") ||
            "",
        }),
      ),
    ];
    return content.filter(({ value }) => /framer/i.test(value));
  });
  expect(legacyBranding, `${route}: public branding uses Next.js`).toEqual([]);
}

type MotionFrame = {
  time: number;
  opacity: number;
  transform: string;
  x: number;
  y: number;
  scale: number;
};
type MotionWindow = Window & {
  __nueMotion: Map<Element, MotionFrame[]>;
};

// Observe rendered frames from before hydration. Checking only a final opacity
// or a data attribute cannot catch an entrance that collapses into one paint.
async function recordMotion(page: Page) {
  await page.addInitScript(() => {
    const records = new Map<Element, MotionFrame[]>();
    (window as unknown as MotionWindow).__nueMotion = records;
    const sample = (time: number) => {
      for (const element of document.querySelectorAll(
        '[data-reveal], [data-motion^="about-photo-"]',
      )) {
        const style = getComputedStyle(element);
        const opacity = Number(style.opacity);
        const frames = records.get(element) || [];
        const previous = frames.at(-1);
        if (
          previous &&
          Math.abs(previous.opacity - opacity) < 0.0001 &&
          previous.transform === style.transform
        )
          continue;
        const matrix = new DOMMatrixReadOnly(style.transform);
        frames.push({
          time,
          opacity,
          transform: style.transform,
          x: matrix.m41,
          y: matrix.m42,
          scale: Math.hypot(matrix.m11, matrix.m12),
        });
        records.set(element, frames);
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
}

async function motionFrames(target: Locator) {
  return target.evaluate(
    (element) =>
      (window as unknown as MotionWindow).__nueMotion.get(element) || [],
  );
}

async function expectRealReveal(target: Locator, label: string) {
  if (await target.getAttribute("data-reveal")) {
    await expect(target, label).toHaveAttribute("data-reveal", "visible");
    await expect(target, label).toHaveCSS("transform", "none");
  }
  await expect(target, label).toHaveCSS("opacity", "1");
  const frames = await motionFrames(target);
  expect(
    frames.some(({ opacity }) => opacity <= 0.01),
    `${label}: hidden frame`,
  ).toBe(true);
  const inFlight = frames.filter(
    ({ opacity }) => opacity > 0.02 && opacity < 0.98,
  );
  expect(
    inFlight.length,
    `${label}: actual intermediate frames`,
  ).toBeGreaterThanOrEqual(2);
  expect(
    inFlight.at(-1)!.time - inFlight[0].time,
    `${label}: motion lasts more than one paint`,
  ).toBeGreaterThan(12);
  expect(frames.at(-1)!.opacity, `${label}: settled frame`).toBeGreaterThan(
    0.99,
  );
  return frames;
}

async function expectRevealCoverage(targets: Locator, label: string) {
  expect(await targets.count(), `${label}: content exists`).toBeGreaterThan(0);
  const missing = await targets.evaluateAll((elements) =>
    elements
      .filter(
        (element) =>
          !element.closest("[data-reveal]") &&
          !element.querySelector("[data-reveal]"),
      )
      .map(
        (element) => element.textContent?.trim() || element.getAttribute("alt"),
      ),
  );
  expect(missing, `${label}: content participates in a reveal`).toEqual([]);
}

// Use wheel input so intersection observers see the same scrolling as a visitor.
// Each step overlaps the previous viewport, including short headings and labels.
async function scrollThroughPage(page: Page) {
  for (let step = 0; step < 100; step++) {
    const before = await page.evaluate(() => ({
      y: scrollY,
      bottom:
        scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
      distance: Math.floor(innerHeight * 0.6),
    }));
    if (before.bottom) return;
    await page.mouse.wheel(0, before.distance);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(before.y);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  }
  throw new Error("Nue scroll coverage did not reach the page footer");
}

async function expectEveryScrolledReveal(page: Page) {
  const reveals = page.locator("main [data-reveal]");
  for (const reveal of await reveals.all()) {
    const inactive = await reveal.evaluate((element) =>
      Boolean(
        element.closest('[aria-roledescription="slide"][aria-hidden="true"]'),
      ),
    );
    if (inactive) continue;
    const label = await reveal.evaluate(
      (element) =>
        element.getAttribute("data-motion") ||
        element.textContent?.trim().slice(0, 70) ||
        element.querySelector("img")?.alt ||
        "Nue reveal",
    );
    await expectRealReveal(reveal, label);
  }
}

for (const viewport of [
  { width: 1280, height: 720 },
  { width: 810, height: 1080 },
  { width: 390, height: 844 },
]) {
  test(`Nue complete routes, metadata, assets and layout at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = collectErrors(page);
    expect(template.routes).toHaveLength(5);

    for (const route of template.routes) {
      const response = await page.goto(`${server.baseUrl}${route.path}`);
      expect(response?.status(), route.path).toBe(route.status);
      const title = `${route.path === "/nue" ? "" : `${route.marker} - `}Nue - Next.js Portfolio Template`;
      expect(route.title).toBe(title);
      await expect(page).toHaveTitle(title);
      await expect(page.locator("main h1")).toBeVisible();
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(new URL(canonical!, server.baseUrl).pathname).toBe(
        route.canonical,
      );
      await expect(page.locator("main")).toContainText(route.marker);
      await expectNextBranding(page, route.path);
      if (route.path === "/nue")
        await expect(
          page.getByRole("link", { name: "Explore Next.js", exact: true }),
        ).toHaveAttribute("href", "https://nextjs.org/docs");

      const images = page.locator("main img");
      expect(await images.count(), route.path).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image, `${route.path}: image must load`).toHaveJSProperty(
          "complete",
          true,
        );
        const imageState = await image.evaluate((element) => {
          const image = element as HTMLImageElement;
          return {
            width: image.naturalWidth,
            src: image.currentSrc || image.src,
          };
        });
        expect(imageState.width, imageState.src).toBeGreaterThan(0);
        expect(new URL(imageState.src).origin).toBe(server.baseUrl);
        expect(new URL(imageState.src).pathname).toMatch(/^\/nue\//);
      }

      const layout = await page.evaluate(() => ({
        viewport: innerWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(layout.content, route.path).toBeLessThanOrEqual(
        layout.viewport + 1,
      );
      const previous = page.getByRole("button", {
        name: "Previous testimonial",
      });
      for (
        let index = 0;
        index < 2 && (await previous.count()) && (await previous.isEnabled());
        index++
      ) {
        await previous.click();
      }
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `output/playwright/nue/${route.path.replaceAll("/", "-").slice(1)}-${viewport.width}.png`,
        fullPage: true,
      });
    }

    for (const route of template.invalidRoutes) {
      const response = await page.goto(`${server.baseUrl}${route.path}`);
      expect(response?.status(), route.path).toBe(route.status);
      await expect(
        page.getByRole("heading", { name: route.marker, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Back to home", exact: true }),
      ).toHaveAttribute("href", "/nue");
      await expectNextBranding(page, route.path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(viewport.width + 1);
    }
    expect(errors).toEqual([]);
  });
}

test("Every Nue internal navigation target resolves", async ({
  page,
  request,
}) => {
  const destinations = new Set<string>();
  for (const route of template.routes) {
    await page.goto(`${server.baseUrl}${route.path}`);
    const links = await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((element) => (element as HTMLAnchorElement).href),
      );
    for (const href of links) {
      const url = new URL(href);
      if (url.origin !== server.baseUrl) continue;
      expect(
        validPaths.has(url.pathname),
        `${route.path} links to unexpected route ${url.pathname}`,
      ).toBe(true);
      destinations.add(`${url.pathname}${url.hash}`);
    }
  }
  expect(destinations.size).toBeGreaterThanOrEqual(5);
  for (const destination of destinations) {
    const response = await request.get(`${server.baseUrl}${destination}`);
    expect(response.status(), destination).toBe(200);
    const hash = new URL(destination, server.baseUrl).hash;
    if (hash)
      expect(await response.text(), destination).toContain(
        `id="${decodeURIComponent(hash.slice(1))}"`,
      );
  }
});

test("Nue project navigation follows the complete sequence and returns to selected works", async ({
  page,
}) => {
  const projects = template.routes.slice(1);
  await page.goto(`${server.baseUrl}/nue`);
  await page.locator(`main a[href="${projects[0].path}"]`).click();
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    await expect(page).toHaveURL(`${server.baseUrl}${project.path}`);
    await expect(page.locator("main h1")).toHaveText(project.marker);
    const expectedNeighbors = [
      projects[index - 1]?.path,
      projects[index + 1]?.path,
    ]
      .filter(Boolean)
      .sort();
    const links = await page
      .locator('main a[href^="/nue/projects/"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")).sort(),
      );
    expect(links).toEqual(expectedNeighbors);
    const gallery = page.getByRole("link", {
      name: "View gallery",
      exact: true,
    });
    if (await gallery.count()) {
      await gallery.click();
      await expect(page).toHaveURL(
        `${server.baseUrl}${project.path}#project-gallery`,
      );
      await expect(page.locator("#project-gallery")).toBeInViewport();
    }
    if (index < projects.length - 1)
      await page.locator(`main a[href="${projects[index + 1].path}"]`).click();
  }
  for (let index = projects.length - 2; index >= 0; index--) {
    await page.locator(`main a[href="${projects[index].path}"]`).click();
    await expect(page).toHaveURL(`${server.baseUrl}${projects[index].path}`);
    await expect(page.locator("main h1")).toHaveText(projects[index].marker);
  }
  await page.locator('main a[href="/nue#project"]').click();
  await expect(page).toHaveURL(`${server.baseUrl}/nue#project`);
  await expect(
    page.getByRole("heading", { name: "Selected works", exact: true }),
  ).toBeInViewport();
});

test("Nue project images enlarge and dismiss with focus and scrolling restored", async ({
  page,
}) => {
  await page.goto(`${server.baseUrl}/nue/projects/greenora`);
  const opener = page.getByRole("button", {
    name: "Enlarge Greenora website design",
    exact: true,
  });
  const originalSource = await opener.getByRole("img").getAttribute("src");
  const originalOverflow = await page.evaluate(
    () => getComputedStyle(document.body).overflow,
  );
  const dialog = page.getByRole("dialog", {
    name: "Project image preview",
    exact: true,
  });

  for (const dismiss of ["Escape", "backdrop"] as const) {
    await opener.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img")).toHaveAttribute(
      "src",
      originalSource!,
    );
    await expect(dialog.getByRole("img")).toHaveJSProperty("complete", true);
    expect(
      await dialog
        .getByRole("img")
        .evaluate((element) => (element as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    if (dismiss === "Escape") await page.keyboard.press("Escape");
    else await dialog.click({ position: { x: 4, y: 4 } });
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", originalOverflow);
  }

  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 300);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(scrollBefore);
});

test("Nue testimonial controls and keyboard reach all three slides without wrapping", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/nue`);
  const carousel = page.getByRole("region", { name: "Client testimonials" });
  const previous = carousel.getByRole("button", {
    name: "Previous testimonial",
  });
  const next = carousel.getByRole("button", { name: "Next testimonial" });
  const active = carousel.locator(
    '[aria-roledescription="slide"][data-active="true"]',
  );
  const track = carousel.getByRole("list");
  await expect(active).toContainText("Paul Richards");
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await next.click();
  await expect(active).toContainText("David Thompson");
  await expect(active).toContainText("The transformation was incredible.");
  await expect(previous).toBeEnabled();
  await track.press("ArrowRight");
  await expect(active).toContainText("Tyler David");
  await expect(next).toBeDisabled();
  await track.press("ArrowRight");
  await expect(active).toContainText("Tyler David");
  await track.press("ArrowLeft");
  await expect(active).toContainText("David Thompson");
  await previous.click();
  await expect(active).toContainText("Paul Richards");
  await expect(previous).toBeDisabled();
  await expect(
    carousel.locator('[aria-roledescription="slide"][aria-hidden="false"]'),
  ).toHaveCount(1);
  await expect(
    carousel.locator('[aria-roledescription="slide"][inert]'),
  ).toHaveCount(2);
});

test("Nue FAQ answers open independently and support keyboard collapse", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/nue`);
  const questions = page.locator("#faq button");
  await expect(questions).toHaveCount(4);
  for (const question of await questions.all()) {
    await expect(question).toHaveAttribute("aria-expanded", "false");
    await question.press("Enter");
    await expect(question).toHaveAttribute("aria-expanded", "true");
    const answer = page.locator(
      `#${await question.getAttribute("aria-controls")}`,
    );
    await expect(answer).toHaveAttribute("aria-hidden", "false");
    await expect(answer).toBeVisible();
    expect(await answer.innerText()).not.toBe("");
  }
  await expect(page.locator('#faq button[aria-expanded="true"]')).toHaveCount(
    4,
  );
  for (const question of await questions.all()) {
    await question.press("Space");
    await expect(question).toHaveAttribute("aria-expanded", "false");
    const answer = page.locator(
      `#${await question.getAttribute("aria-controls")}`,
    );
    await expect(answer).toHaveAttribute("aria-hidden", "true");
    await expect(answer).toHaveCSS("height", "0px");
  }
});

test("Nue contact validates locally and prepares a correctly encoded email draft", async ({
  page,
}) => {
  await page.goto(`${server.baseUrl}/nue`);
  const form = page.locator("#contact form");
  const name = form.getByLabel("Name", { exact: true });
  const email = form.getByLabel("Email", { exact: true });
  const message = form.getByLabel("Message", { exact: true });
  const submit = form.getByRole("button", { name: "Submit", exact: true });
  await submit.click();
  await expect(name).toBeFocused();
  expect(
    await name.evaluate(
      (element) => (element as HTMLInputElement).validity.valueMissing,
    ),
  ).toBe(true);
  await expect(form.getByRole("status")).toHaveCount(0);
  await name.fill("   ");
  await email.fill("preview@example.com");
  await message.fill("   ");
  await submit.click();
  await expect(name).toBeFocused();
  await expect(form.getByRole("status")).toHaveCount(0);
  await name.fill("Preview Tester");
  await submit.click();
  await expect(message).toBeFocused();
  await expect(form.getByRole("status")).toHaveCount(0);
  await name.fill("Preview Tester");
  await email.fill("not-an-email");
  await message.fill("Hello & thanks!\nA local preview only.");
  await submit.click();
  await expect(email).toBeFocused();
  expect(
    await email.evaluate(
      (element) => (element as HTMLInputElement).validity.typeMismatch,
    ),
  ).toBe(true);
  await expect(form.getByRole("status")).toHaveCount(0);
  await email.fill("preview@example.com");
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method()))
      submissions.push(`${request.method()} ${request.url()}`);
  });
  await submit.click();
  await expect(form.getByRole("status")).toContainText("Your message is ready");
  const draftLink = form.getByRole("link", { name: /Open email draft/ });
  const draft = new URL((await draftLink.getAttribute("href"))!);
  expect(draft.protocol).toBe("mailto:");
  expect(draft.pathname).toBe("nue@gmail.com");
  expect(draft.searchParams.get("subject")).toBe(
    "Portfolio inquiry from Preview Tester",
  );
  expect(draft.searchParams.get("body")).toBe(
    "Hello & thanks!\nA local preview only.\n\nFrom Preview Tester\npreview@example.com",
  );
  await expect(page).toHaveURL(`${server.baseUrl}/nue`);
  expect(submissions).toEqual([]);
  // The draft link is deliberately not clicked: this suite never opens or sends mail.
  await message.fill("Updated local preview");
  await expect(form.getByRole("status")).toHaveCount(0);
});

test("Reduced motion leaves every Nue route visible without hidden content or active animations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of motionRoutes) {
    await page.goto(`${server.baseUrl}${route.path}`);
    await expect(page.locator("main h1")).toBeVisible();
    const states = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.map((element) => ({
        opacity: getComputedStyle(element).opacity,
        transform: getComputedStyle(element).transform,
        running: element
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
      })),
    );
    expect(states.length, route.path).toBeGreaterThan(
      route.path === "/nue/404" ? 3 : 10,
    );
    expect(
      states.every(
        ({ opacity, transform, running }) =>
          opacity === "1" && transform === "none" && running === 0,
      ),
      route.path,
    ).toBe(true);
  }
});

test.describe("Nue normal motion", () => {
  test.use({ contextOptions: { reducedMotion: "no-preference" } });

  test("Enabling reduced motion while the page animates reveals content and stops running animations", async ({
    page,
  }) => {
    await recordMotion(page);
    await page.goto(`${server.baseUrl}/nue`, { waitUntil: "domcontentloaded" });
    const avatar = page.locator('[data-motion="hero-avatar"]');
    await expect
      .poll(async () =>
        (await motionFrames(avatar)).some(
          ({ opacity }) => opacity > 0.02 && opacity < 0.98,
        ),
      )
      .toBe(true);
    await expect(page.locator('[data-motion="faq-heading"]')).toHaveCSS(
      "opacity",
      "0",
    );
    const activeBefore = await page.locator("[data-reveal]").evaluateAll(
      (elements) =>
        elements.flatMap((element) =>
          element
            .getAnimations()
            .filter((animation) => animation.playState === "running"),
        ).length,
    );
    expect(
      activeBefore,
      "The preference changes during active motion",
    ).toBeGreaterThan(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const states = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.map((element) => ({
        name: element.getAttribute("data-motion"),
        opacity: getComputedStyle(element).opacity,
        transform: getComputedStyle(element).transform,
        running: element
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
      })),
    );
    expect(
      states.filter(
        ({ opacity, transform }) => opacity !== "1" || transform !== "none",
      ),
      "The preference takes effect immediately for visible and offscreen content",
    ).toEqual([]);
    expect(
      states.filter(({ running }) => running > 0),
      "Animation work stops instead of continuing behind the reduced-motion CSS",
    ).toEqual([]);
  });

  test("Hero elements animate over real frames with the reference entrance stagger", async ({
    page,
  }) => {
    await recordMotion(page);
    await page.goto(`${server.baseUrl}/nue`);
    const sequences = new Map<string, MotionFrame[]>();
    for (const name of [
      "hero-avatar",
      "hero-name",
      "hero-checkmark",
      "hero-role",
      "hero-intro",
      "hero-remix",
      "hero-works",
      "selected-heading",
    ]) {
      const target = page.locator(`[data-motion="${name}"]`);
      await expect(target).toHaveCount(1);
      sequences.set(name, await expectRealReveal(target, name));
    }
    const starts = (name: string) =>
      sequences.get(name)!.find(({ opacity }) => opacity > 0.02)!.time;
    for (const [earlier, later, minimumGap] of [
      ["hero-avatar", "hero-name", 80],
      ["hero-name", "hero-role", 80],
      ["hero-role", "hero-intro", 80],
      ["hero-intro", "hero-remix", 80],
      ["hero-remix", "hero-works", 35],
      ["hero-works", "selected-heading", 80],
    ] as const) {
      expect(
        starts(later) - starts(earlier),
        `${earlier} precedes ${later}`,
      ).toBeGreaterThan(minimumGap);
    }
    expect(
      Math.abs(starts("hero-name") - starts("hero-checkmark")),
    ).toBeLessThan(120);
    const initial = (name: string) =>
      sequences.get(name)!.find(({ opacity }) => opacity <= 0.01)!;
    expect(initial("hero-avatar").scale).toBeCloseTo(0.6, 1);
    expect(initial("hero-checkmark").scale).toBeCloseTo(0.5, 1);
    expect(initial("hero-name").y).toBeCloseTo(10, 0);
    expect(initial("hero-role").y).toBeCloseTo(10, 0);
    expect(initial("hero-remix").scale).toBeCloseTo(0.8, 1);
    expect(initial("hero-works").x).toBeCloseTo(-10, 0);
    expect(starts("selected-heading") - starts("hero-avatar")).toBeLessThan(
      1700,
    );
  });

  test("The custom 404 avatar, title, explanation and home link animate in sequence", async ({
    page,
  }) => {
    await recordMotion(page);
    const response = await page.goto(`${server.baseUrl}/nue/404`);
    expect(response?.status()).toBe(404);
    const starts: number[] = [];
    for (const name of [
      "not-found-avatar",
      "not-found-title",
      "not-found-copy",
      "not-found-home",
    ]) {
      const frames = await expectRealReveal(
        page.locator(`[data-motion="${name}"]`),
        name,
      );
      starts.push(frames.find(({ opacity }) => opacity > 0.02)!.time);
    }
    for (let index = 1; index < starts.length; index++)
      expect(starts[index] - starts[index - 1]).toBeGreaterThan(80);
  });

  test("Homepage sections, cards, FAQ and contact reveal on real scroll and stay revealed", async ({
    page,
  }) => {
    await recordMotion(page);
    await page.goto(`${server.baseUrl}/nue`);
    for (const [selector, label] of [
      ["main h2", "Every section heading"],
      ['#project a[href^="/nue/projects/"]', "Selected work cards"],
      ["#about p, #about a", "About copy and action"],
      ["#services article h3, #services article p", "Service cards"],
      [
        "#experience article img, #experience article h3, #experience article p",
        "Experience cards",
      ],
      [
        "#stacks article img, #stacks article h3, #stacks article p",
        "Stack cards",
      ],
      ["#faq button", "Every FAQ question"],
      [
        "#contact .nue-contact-copy, #contact .nue-socials a, #contact label, #contact button[type=submit]",
        "Contact content and form",
      ],
    ]) {
      await expectRevealCoverage(page.locator(selector), label);
    }
    const faqHeading = page.locator('[data-motion="faq-heading"]');
    await expect(faqHeading).toHaveAttribute("data-reveal", "waiting");
    await expect(faqHeading).toHaveCSS("opacity", "0");
    await scrollThroughPage(page);
    await expectEveryScrolledReveal(page);
    for (const name of ["about-photo-portrait", "about-photo-workspace"]) {
      const frames = await expectRealReveal(
        page.locator(`[data-motion="${name}"]`),
        name,
      );
      expect(
        new Set(frames.map(({ transform }) => transform)).size,
        `${name}: photos rotate into place`,
      ).toBeGreaterThan(2);
    }
    const countBefore = (await motionFrames(faqHeading)).length;
    await page.locator("#hero").scrollIntoViewIfNeeded();
    await faqHeading.scrollIntoViewIfNeeded();
    await expect(faqHeading).toHaveAttribute("data-reveal", "visible");
    await expect(faqHeading).toHaveCSS("opacity", "1");
    expect((await motionFrames(faqHeading)).length).toBe(countBefore);
  });

  for (const route of template.routes.slice(1)) {
    test(`${route.marker} animates its entrance, metadata, overview and every project image`, async ({
      page,
    }) => {
      await recordMotion(page);
      await page.goto(`${server.baseUrl}${route.path}`);
      for (const name of [
        "project-back",
        "project-title",
        "project-intro",
        "project-cover",
      ]) {
        await expect(page.locator(`[data-motion="${name}"]`)).toHaveCount(1);
      }
      const gallery = page.getByRole("link", {
        name: "View gallery",
        exact: true,
      });
      await expect(gallery).toHaveCount(
        route.path.endsWith("clarity-path") ? 0 : 1,
      );
      if (await gallery.count()) {
        await expect(gallery).toHaveAttribute("href", "#project-gallery");
        await expect(page.locator("#project-gallery")).toHaveCount(1);
        await expectRevealCoverage(gallery, `${route.marker} View gallery`);
      }
      await expectRevealCoverage(
        page.locator("main h2"),
        "Project section headings",
      );
      await expectRevealCoverage(
        page.locator("main dt, main dd"),
        "All project metadata",
      );
      await expectRevealCoverage(
        page.locator("main p"),
        "Project introduction and overview copy",
      );
      await expectRevealCoverage(
        page.locator("main img"),
        "Every project image",
      );
      await expectRevealCoverage(
        page.getByRole("navigation", { name: "Project navigation" }),
        "Project pagination",
      );
      await scrollThroughPage(page);
      await expectEveryScrolledReveal(page);
      const starts = new Map<string, number>();
      for (const name of ["project-back", "project-title", "project-intro"]) {
        const frames = await motionFrames(
          page.locator(`[data-motion="${name}"]`),
        );
        starts.set(
          name,
          frames.find(({ opacity }) => opacity > 0.02)!.time,
        );
      }
      expect(
        starts.get("project-title")! - starts.get("project-back")!,
      ).toBeGreaterThan(80);
      expect(
        starts.get("project-intro")! - starts.get("project-title")!,
      ).toBeGreaterThan(35);
    });
  }
});

test("Every Nue page remains readable with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  try {
    for (const route of motionRoutes) {
      await page.goto(`${server.baseUrl}${route.path}`);
      await expect(page.locator("main h1")).toHaveText(route.marker);
      const hidden = await page.locator("main [data-reveal], main img").evaluateAll((elements) =>
        elements
          .filter(
            (element) =>
              !element.closest(
                '[aria-roledescription="slide"][aria-hidden="true"]',
              ),
          )
          .filter((element) => {
            for (
              let current: Element | null = element;
              current;
              current = current.parentElement
            ) {
              const style = getComputedStyle(current);
              if (
                Number(style.opacity) < 0.99 ||
                style.visibility === "hidden" ||
                style.display === "none"
              )
                return true;
            }
            return false;
          })
          .map(
            (element) =>
              element.getAttribute("data-motion") ||
              element.getAttribute("alt") ||
              element.textContent?.trim().slice(0, 60),
          ),
      );
      expect(hidden, `${route.path}: readable without hydration`).toEqual([]);
      if (route.path === "/nue") {
        const form = page.locator("#contact form");
        const controls = form.locator("input, textarea, button[type=submit]");
        await expect(controls).toHaveCount(4);
        for (const control of await controls.all())
          await expect(control).toBeDisabled();
        const fallback = page.getByRole("link", {
          name: "Email Nue directly",
          exact: true,
        });
        await expect(fallback).toBeVisible();
        await expect(fallback).toHaveAttribute("href", "mailto:nue@gmail.com");

        const navigations: string[] = [];
        const recordNavigation = (request: import("@playwright/test").Request) => {
          if (request.isNavigationRequest()) navigations.push(request.url());
        };
        page.on("request", recordNavigation);
        const name = form.getByLabel("Name", { exact: true });
        await name.focus();
        await expect(name).not.toBeFocused();
        await page.keyboard.press("Enter");
        await form
          .getByRole("button", { name: "Submit", exact: true })
          .click({ force: true });
        await expect(page).toHaveURL(`${server.baseUrl}/nue`);
        expect(navigations).toEqual([]);
        page.off("request", recordNavigation);
      }
    }
  } finally {
    await context.close();
  }
});

test("Showcase exposes Nue with its real preview and complete route redirect", async ({
  page,
  request,
}) => {
  const showcase = await startTemplate(findTemplate("showcase"));
  try {
    await page.goto(showcase.baseUrl);
    const card = page
      .locator("article")
      .filter({ has: page.getByRole("heading", { name: "Nue", exact: true }) });
    await expect(card.getByRole("link", { name: "Open Nue" })).toHaveAttribute(
      "href",
      "http://localhost:3016/nue",
    );
    await expect(card.getByRole("img")).toHaveJSProperty("complete", true);
    expect(
      await card
        .getByRole("img")
        .evaluate((element) => (element as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
    for (const path of ["/nue", "/nue/projects/greenora"]) {
      const redirect = await request.get(`${showcase.baseUrl}${path}`, {
        maxRedirects: 0,
      });
      expect(redirect.status()).toBe(307);
      expect(redirect.headers().location).toBe(`http://localhost:3016${path}`);
    }
  } finally {
    await showcase.stop();
  }
});
