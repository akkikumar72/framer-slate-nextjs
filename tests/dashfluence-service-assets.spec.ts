import { expect, test } from "@playwright/test";
import { findTemplate, startTemplate } from "./helpers/template-server";

const services = [
  {
    asset: "8pav5SU3BnJ6wETIuurnrNxivo.png",
    tagline: "We develop unique stories that resonate deeply.",
    title: "Digital Strategy & Funnel Mapping",
  },
  {
    asset: "P6VdABYaeMyqzy5lJeVzQ2GSH90-home.webp",
    tagline: "Building Unique Stories With Deep Impact",
    title: "Strategy & Content Production",
  },
  {
    asset: "FZtr09azaTHn6YwdMESKE3Ss3tg.jpg",
    tagline: "Creating Meaningful Stories That Connect Deeply",
    title: "SEO & Organic Growth",
  },
  {
    asset: "6hoh6HKRqD2wucm9QOitChDY4S0.png",
    tagline: "Designing Stories That Touch Every Audience",
    title: "Paid Media Management",
  },
  {
    asset: "pwOCQ86eV6uTDBY7fWUfJB09WU-home.webp",
    tagline: "Creating Unique Narratives With Emotional Depth",
    title: "CRO & Analytics Optimization",
  },
] as const;

test("Dashfluence homepage uses bounded lazy service images", async ({ page }) => {
  const server = await startTemplate(findTemplate("dashfluence"));
  try {
    const response = await page.goto(`${server.baseUrl}/Dashfluence`, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);

    const section = page.locator("section").filter({
      has: page.getByRole("heading", { name: /Performance-Driven Services/ }),
    });
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    const images = section.locator("img");
    await expect(images).toHaveCount(6);
    for (const image of await images.all()) {
      await expect(image).toHaveAttribute("loading", "lazy");
      await expect(image).toHaveAttribute("decoding", "async");
    }

    const sources = await images.evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLImageElement).getAttribute("src") ?? ""),
    );
    expect(sources.some((source) => source.includes(services[1].asset))).toBe(true);
    expect(sources.some((source) => source.includes(services[4].asset))).toBe(true);
    expect(
      sources.some((source) => source.includes("P6VdABYaeMyqzy5lJeVzQ2GSH90.jpg")),
    ).toBe(false);
    expect(
      sources.some((source) => source.includes("pwOCQ86eV6uTDBY7fWUfJB09WU.jpg")),
    ).toBe(false);

    const activeImage = section.getByRole("img", {
      name: "Digital marketing team at work",
    });
    const activeCaption = activeImage.locator("..");
    for (const [index, service] of services.entries()) {
      const link = section.getByRole("link", { name: service.title });
      const alternate = services[(index + 1) % services.length];
      const alternateLink = section.getByRole("link", { name: alternate.title });

      await alternateLink.focus();
      await expect(activeImage).toHaveAttribute(
        "src",
        `/dashfluence/assets/${alternate.asset}`,
      );
      await page.mouse.move(0, 0);
      await link.hover();
      await expect(activeImage).toHaveAttribute(
        "src",
        `/dashfluence/assets/${service.asset}`,
      );
      await expect(activeCaption.getByText(service.title, { exact: true })).toBeVisible();
      await expect(activeCaption.getByText(service.tagline, { exact: true })).toBeVisible();

      await page.mouse.move(0, 0);
      await alternateLink.hover();
      await expect(activeImage).toHaveAttribute(
        "src",
        `/dashfluence/assets/${alternate.asset}`,
      );
      await link.focus();
      await expect(activeImage).toHaveAttribute(
        "src",
        `/dashfluence/assets/${service.asset}`,
      );
      await expect(activeCaption.getByText(service.title, { exact: true })).toBeVisible();
      await expect(activeCaption.getByText(service.tagline, { exact: true })).toBeVisible();
      await expect(link).toBeVisible();
    }
  } finally {
    await server.stop();
  }
});
