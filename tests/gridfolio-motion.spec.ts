import { expect, test, type Page } from "@playwright/test";
import { findTemplate, startTemplate, type TemplateServer } from "./helpers/template-server";

// Exercise real motion even though the broader smoke suite disables animation.
test.use({ contextOptions: { reducedMotion: "no-preference" } });

let server: TemplateServer;
test.describe.configure({ mode: "serial" });
test.beforeAll(async () => { server = await startTemplate(findTemplate("gridfolio")); });
test.afterAll(async () => { await server?.stop(); });

async function readIntro(page: Page) {
  return page.locator("main > section").evaluate((card) => {
    const style = getComputedStyle(card);
    const contact = card.querySelector("nav button:last-child")!;
    return {
      y: scrollY,
      top: card.getBoundingClientRect().top,
      background: style.backgroundColor,
      shadow: style.boxShadow,
      text: getComputedStyle(card.querySelector("h1")!).color,
      contact: getComputedStyle(contact).backgroundColor,
      position: style.position,
    };
  });
}

async function captureFade(page: Page, target: number) {
  return page.evaluate(async (y) => {
    const card = document.querySelector("main > section")!;
    const samples: { t: number; alpha: number; top: number; contact: number }[] = [];
    const requestedAt = performance.now();
    let startedAt: number | undefined;
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise<void>((resolve, reject) => {
      function sample() {
        const background = getComputedStyle(card).backgroundColor;
        const transition = card.getAnimations().find((animation) =>
          animation instanceof CSSTransition && animation.transitionProperty === "background-color",
        );
        // Anchor samples to the native transition, not hydration or scroll-event latency.
        if (typeof transition?.startTime === "number") startedAt = transition.startTime;
        if (startedAt === undefined) {
          if (performance.now() - requestedAt > 5000) reject(new Error("The intro dissolve did not start"));
          else requestAnimationFrame(sample);
          return;
        }
        const elapsed = Number(document.timeline.currentTime) - startedAt;
        const rgba = background.match(/[\d.]+/g)!.map(Number);
        const contact = getComputedStyle(card.querySelector("nav button:last-child")!).backgroundColor;
        samples.push({
          t: elapsed,
          alpha: rgba.length === 4 ? rgba[3] : 1,
          top: card.getBoundingClientRect().top,
          contact: Number(contact.match(/[\d.]+/)![0]),
        });
        if (elapsed < 1050) requestAnimationFrame(sample);
        else resolve();
      }
      requestAnimationFrame(sample);
    });
    return samples;
  }, target);
}

for (const width of [1280, 810]) {
  test(`sticky intro dissolves down and back at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${server.baseUrl}/gridfolio`);
    await expect(page.locator("main > section")).toHaveCSS("background-color", "rgba(0, 0, 0, 0.08)");
    await page.evaluate(() => scrollTo({ top: 6, behavior: "instant" }));
    expect((await readIntro(page)).background).toBe("rgba(0, 0, 0, 0.08)");

    const down = await captureFade(page, 7);
    // The measured dissolve is still near its light state after 200ms,
    // passes through gray, and settles after roughly 800ms. A 300ms fade fails.
    const early = down.find((sample) => sample.t >= 200)!;
    const middle = down.find((sample) => sample.t >= 450)!;
    expect(early.alpha).toBeLessThan(0.25);
    expect(middle.alpha).toBeGreaterThan(0.25);
    expect(middle.alpha).toBeLessThan(0.95);
    expect(middle.contact).toBeGreaterThan(10);
    expect(middle.contact).toBeLessThan(250);
    expect(down.at(-1)!.alpha).toBe(1);
    expect(down.every((sample) => Math.abs(sample.top - 8) < 1)).toBe(true);

    await page.evaluate(() => scrollTo({ top: 550, behavior: "instant" }));
    const pinned = await readIntro(page);
    expect(pinned.top).toBeCloseTo(8, 0);
    expect(pinned.background).toBe("rgb(0, 0, 0)");
    expect(pinned.text).toBe("rgb(255, 255, 255)");
    expect(pinned.contact).toBe("rgb(255, 255, 255)");
    expect(pinned.shadow).toContain("0px 12px 20px");
    if (width === 1280) {
      await page.getByRole("button", { name: "Contact", exact: true }).hover();
      await expect(page.getByRole("button", { name: "Contact", exact: true })).toHaveCSS("background-color", "rgba(255, 255, 255, 0.72)");
      await page.mouse.move(0, 0);
    }

    const up = await captureFade(page, 0);
    expect(up.find((sample) => sample.t >= 200)!.alpha).toBeGreaterThan(0.8);
    expect(up.find((sample) => sample.t >= 450)!.alpha).toBeLessThan(0.8);
    expect(up.at(-1)!.alpha).toBeCloseTo(0.08, 2);
    const restored = await readIntro(page);
    expect(restored.text).toBe("rgb(0, 0, 0)");
    expect(restored.contact).toBe("rgb(0, 0, 0)");
    if (width === 1280) {
      await page.getByRole("button", { name: "Contact", exact: true }).hover();
      await expect(page.getByRole("button", { name: "Contact", exact: true })).toHaveCSS("background-color", "rgba(0, 0, 0, 0.56)");
    }
  });
}

test("reversing a dissolve midway returns cleanly to the light state", async ({ page }) => {
  await page.goto(`${server.baseUrl}/gridfolio`);
  const samples = await page.evaluate(async () => {
    const card = document.querySelector("main > section")!;
    const alpha = () => {
      const values = getComputedStyle(card).backgroundColor.match(/[\d.]+/g)!.map(Number);
      return values.length === 4 ? values[3] : 1;
    };
    const start = performance.now();
    scrollTo({ top: 100, behavior: "instant" });
    await new Promise<void>((resolve, reject) => {
      function tick() {
        const progress = alpha();
        if (progress >= 0.4 && progress < 0.99) resolve();
        else if (performance.now() - start > 5000) reject(new Error("No intermediate intro state was rendered"));
        else requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    const before = alpha();
    const backgroundTransition = () => card.getAnimations().find((animation) =>
      animation instanceof CSSTransition && animation.transitionProperty === "background-color",
    );
    const outgoing = backgroundTransition();
    const reversedAt = performance.now();
    scrollTo({ top: 0, behavior: "instant" });
    const reversal = await new Promise<{ after: number; from: number }>((resolve, reject) => {
      function tick() {
        const after = alpha();
        const incoming = backgroundTransition();
        if (incoming && incoming !== outgoing) {
          const first = String((incoming.effect as KeyframeEffect).getKeyframes()[0].backgroundColor);
          const values = first.match(/[\d.]+/g)!.map(Number);
          resolve({ after, from: values.length === 4 ? values[3] : 1 });
        } else if (performance.now() - reversedAt > 5000) reject(new Error("The intro dissolve did not reverse"));
        else requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    return { before, ...reversal };
  });
  expect(samples.before).toBeGreaterThan(0.2);
  expect(samples.before).toBeLessThan(0.99);
  // Reverse from an intermediate gray, without snapping to either endpoint.
  expect(samples.from).toBeGreaterThan(0.08);
  expect(samples.from).toBeLessThan(1);
  expect(samples.after).toBeGreaterThan(0.08);
  expect(samples.after).toBeLessThan(1);
  await expect(page.locator("main > section")).toHaveCSS("background-color", "rgba(0, 0, 0, 0.08)");
});

test("phone stays in flow and reduced motion skips the dissolve", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${server.baseUrl}/gridfolio`);
  const initial = await readIntro(page);
  await page.evaluate(() => scrollTo({ top: 300, behavior: "instant" }));
  const mobile = await readIntro(page);
  expect(mobile.background).toBe(initial.background);
  expect(mobile.text).toBe("rgb(0, 0, 0)");
  expect(mobile.shadow).toBe("none");
  expect(mobile.position).toBe("relative");
  expect(mobile.top).toBeCloseTo(-292, 0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator("main > section")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  const durations = await page.locator("main > section").evaluate((card) => [
    card, card.querySelector("h1")!, card.querySelector("h2")!, card.querySelector("nav button:last-child")!,
  ].map((element) => getComputedStyle(element).transitionDuration));
  expect(durations).toEqual(["0s", "0s", "0s", "0s"]);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator("main > section")).toHaveCSS("background-color", "rgba(0, 0, 0, 0.08)");
});
