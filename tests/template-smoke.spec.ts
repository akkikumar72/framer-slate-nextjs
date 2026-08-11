import { expect, test, type Page } from "@playwright/test";
import {
  discoverTemplates,
  startTemplate,
} from "./helpers/template-server";

type Interaction = (page: Page) => Promise<void>;

const interactions: Record<string, Interaction> = {
  agenio: async (page) => {
    const question = page.getByRole("button", {
      name: "What if I only need one specific AI service?",
    });
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText("Absolutely — you don’t need a full automation package", {
        exact: false,
      }),
    ).toBeVisible();
  },
  agentik: async (page) => {
    const step = page.getByRole("button", { name: /Build your plan/ });
    await step.click();
    await expect(step).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByLabel("Step 2: Build your plan")).toBeVisible();
  },
  dashfluence: async (page) => {
    const story = page.getByRole("button", {
      name: "Show Customer Acquisition",
    });
    await story.click();
    await expect(story).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByLabel("Hero story 2 of 3")).toBeVisible();
  },
  fuel: async (page) => {
    await page.getByRole("button", { name: "Next testimonial" }).click();
    await expect(page.getByText("Gracia Michelle", { exact: true })).toBeVisible();
  },
  grovia: async (page) => {
    const tab = page.getByRole("tab", { name: "KPI tracking" });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(
      page.getByRole("tabpanel").getByRole("heading", {
        name: "Measure what matters most",
      }),
    ).toBeVisible();
  },
  jayden: async (page) => {
    const service = page.getByRole("button", { name: /UI\/UX Design/ });
    await service.click();
    await expect(service).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("User Research", { exact: false })).toBeVisible();
  },
  palmer: async (page) => {
    await page.getByRole("button", { name: "Play Palmer project reel" }).click();
    await expect(
      page.getByRole("dialog", { name: "Palmer project reel" }),
    ).toBeVisible();
    const closeReel = page.getByRole("button", { name: "Close reel" });
    await expect(closeReel).toBeVisible();
    await closeReel.click();

    const response = await page.goto(
      new URL("/work/arc-bloom", page.url()).toString(),
      { waitUntil: "domcontentloaded" },
    );
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Arc & Bloom /",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("region", {
        name: "Arc & Bloom project information",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page).toHaveTitle(/Arc Bloom/);
  },
  payble: async (page) => {
    const yearly = page.getByRole("button", { name: /^Yearly/ });
    await yearly.click();
    await expect(yearly).toHaveAttribute("aria-pressed", "true");
    const plus = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "Plus" }),
    });
    await expect(plus).toContainText("$8");
    await expect(plus).toContainText("paid yearly");
  },
  pilar: async (page) => {
    const brown = page.getByRole("button", { name: "Brown" });
    await brown.click();
    await expect(brown).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-pliar-theme]").first()).toHaveAttribute(
      "data-pliar-theme",
      "brown",
    );
    expect(new URL(page.url()).searchParams.get("theme")).toBe("brown");
  },
  rivero: async (page) => {
    const question = page.getByRole("button", {
      name: "How can this platform help my business?",
    });
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText("Rivero helps businesses streamline HR operations", {
        exact: false,
      }),
    ).toBeVisible();

    const response = await page.goto(
      new URL("/reviews", page.url()).toString(),
      { waitUntil: "domcontentloaded" },
    );
    expect(response?.status()).toBe(200);

    const images = page.getByRole("img", {
      name: "Rivero customer",
      exact: true,
    });
    await expect(images).toHaveCount(4);
    const sources = await images.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("src")),
    );
    expect(sources).toEqual([
      "/rivero/assets/06becc88e3401d28.png",
      "/rivero/assets/5cc9f957bc378f67.png",
      "/rivero/assets/8fc876fa23447d35.png",
      "/rivero/assets/d214f296bdfb3a9b.png",
    ]);
    await expect
      .poll(() =>
        images.evaluateAll((elements) =>
          elements.every((element) => {
            const image = element as HTMLImageElement;
            return image.complete && image.naturalWidth > 0;
          }),
        ),
      )
      .toBe(true);
  },
  saazai: async (page) => {
    await page.getByRole("button", { name: "Next testimonial" }).click();
    await expect(
      page.getByText("I really didn’t think an AI could feel this personal", {
        exact: false,
      }),
    ).toBeVisible();
  },
  showcase: async (page) => {
    await page.getByRole("link", { name: /Browse all/ }).click();
    expect(new URL(page.url()).hash).toBe("#catalog");
    await expect(
      page.getByRole("region", { name: "Template catalog" }),
    ).toBeVisible();
  },
  slate: async (page) => {
    const tab = page.getByRole("tab", { name: "Capture Content" });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(
      page.getByRole("heading", { name: "Capture From Anywhere" }),
    ).toBeVisible();
  },
  trillo: async (page) => {
    const view = page.getByRole("button", { name: "Real-Time Insights" });
    await view.click();
    await expect(view).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("img", { name: "Trillo sales dashboard view 2" }),
    ).toHaveAttribute("aria-hidden", "false");
  },
};

const templates = discoverTemplates();
const expectedSlugs = templates.map(({ slug }) => slug).sort();
const handlerSlugs = Object.keys(interactions).sort();
if (JSON.stringify(handlerSlugs) !== JSON.stringify(expectedSlugs)) {
  throw new Error(
    `Browser interaction handlers do not match templates. Expected ${expectedSlugs.join(", ")}; received ${handlerSlugs.join(", ")}.`,
  );
}

test.describe.configure({ mode: "serial" });

for (const template of templates) {
  test(`${template.name} hydrates, interacts, and renders invalid routes`, async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    const hydrationErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        /hydration|hydrating|server rendered|did not match/i.test(message.text())
      ) {
        hydrationErrors.push(message.text());
      }
    });

    const server = await startTemplate(template);
    try {
      const normalUrl = new URL(
        template.firstRoute.path,
        `${server.baseUrl}/`,
      ).toString();
      const response = await page.goto(normalUrl, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(template.firstRoute.status);

      const title = await page.title();
      if (template.firstRoute.title) {
        expect(title).toBe(template.firstRoute.title);
      } else {
        expect(title).toContain(template.firstRoute.titleIncludes);
      }

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).not.toBeNull();
      expect(
        normalizePath(new URL(canonical!, normalUrl).pathname),
      ).toBe(normalizePath(template.firstRoute.canonical));
      await expectVisibleText(page, template.firstRoute.marker);

      await interactions[template.slug](page);

      for (const invalidRoute of template.invalidRoutes) {
        const invalidResponse = await page.goto(
          new URL(invalidRoute.path, `${server.baseUrl}/`).toString(),
          { waitUntil: "domcontentloaded" },
        );
        expect(invalidResponse?.status()).toBe(invalidRoute.status);
        await expectVisibleText(page, invalidRoute.marker);
      }

      expect(pageErrors).toEqual([]);
      expect(hydrationErrors).toEqual([]);
    } finally {
      await server.stop();
    }
  });
}

function normalizePath(value: string) {
  return value === "/" ? value : value.replace(/\/+$/, "");
}

async function expectVisibleText(page: Page, marker: string) {
  const matchingText = page
    .getByText(marker, { exact: false })
    .or(page.getByRole("heading", { name: marker, exact: false }))
    .or(page.getByRole("region", { name: marker, exact: false }));
  await expect(
    matchingText.filter({ visible: true }).first(),
  ).toBeVisible();
}
