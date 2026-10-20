import { chromium } from "playwright";
import fs from "node:fs";

const widths = (process.env.PROBE_WIDTHS ?? "900,1024,1128,1199")
  .split(",")
  .map(Number);
const urls = {
  reference: process.env.REFERENCE_URL ?? "https://b2bizz-wbs.framer.website/",
  local: process.env.LOCAL_URL ?? "http://localhost:3021/b2bizz",
};
const labels = [
  "Built for B2B, focused on results.",
  "Informed strategy, Operational strength, and sustainable results.",
  "More about us",
  "Accelerating B2B growth across diverse industries",
  "What makes us the right partner",
  "B2B expertise that matters",
  "End-to-End consulting",
  "Data-Driven decisions",
  "Working with B2bizz was a game-changer for our B2B strategy. Their team didn’t just offer advice — they became an extension of our leadership. Their insights, professionalism, and tailored approach helped us unlock new growth and streamline our operations.",
  "Expert services that move your business forward",
  "Proven performance, Measurable results",
  "Lead generation boost for a B2B logistics company",
  "View all case studies",
  "Our method for strategic B2B growth",
  "Explore our services",
];

const browser = await chromium.launch({ headless: true });
const report = {};

function round(value) {
  return Number(value.toFixed(2));
}

try {
  for (const width of widths) {
    report[width] = {};
    for (const [name, url] of Object.entries(urls)) {
      const page = await browser.newPage({ viewport: { width, height: 800 } });
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
      await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1_000);

      report[width][name] = await page.evaluate(
        ({ targetLabels }) => {
          const normalize = (value) => value?.replace(/\s+/g, " ").trim() ?? "";
          const describe = (element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              tag: element.tagName,
              className:
                typeof element.className === "string"
                  ? element.className.slice(0, 100)
                  : "",
              rect: {
                x: Math.round(rect.x * 100) / 100,
                y: Math.round((rect.y + scrollY) * 100) / 100,
                width: Math.round(rect.width * 100) / 100,
                height: Math.round(rect.height * 100) / 100,
              },
              display: style.display,
              position: style.position,
              gridTemplateColumns: style.gridTemplateColumns,
              gap: style.gap,
              padding: style.padding,
              fontSize: style.fontSize,
              lineHeight: style.lineHeight,
              borderRadius: style.borderRadius,
            };
          };
          const all = [...document.querySelectorAll("body *")];
          const output = {};

          const findVisibleExact = (label, preferredTags = []) => {
            const matches = all.filter((element) => {
              const rect = element.getBoundingClientRect();
              return (
                normalize(element.textContent) === label &&
                rect.width > 0 &&
                rect.height > 0 &&
                rect.right > 0 &&
                rect.left < innerWidth
              );
            });
            return (
              matches.find((element) => preferredTags.includes(element.tagName)) ??
              matches.at(-1)
            );
          };

          const caseHeading = findVisibleExact(
            "Lead generation boost for a B2B logistics company",
            ["H2"],
          );
          let caseRoot = caseHeading;
          while (caseRoot?.parentElement) {
            const rect = caseRoot.getBoundingClientRect();
            if (rect.width > innerWidth - 160 && rect.height > 500) break;
            caseRoot = caseRoot.parentElement;
          }
          const caseBoxes = caseRoot
            ? [...caseRoot.querySelectorAll("img, div, a")]
                .map((element) => describe(element))
                .filter(
                  ({ rect }) =>
                    rect.width > 150 &&
                    rect.height > 80 &&
                    rect.x < innerWidth &&
                    rect.x + rect.width > 0,
                )
            : [];

          const aboutLink = findVisibleExact("More about us", ["A"]);
          const sectionSnapshot = (label) => {
            const heading = findVisibleExact(label, ["H1", "H2", "H3"]);
            const section = heading?.closest("section");
            if (!section) return null;
            const descendants = [...section.querySelectorAll("article, img, video, blockquote")]
              .map((element) => describe(element))
              .filter(
                ({ rect }) =>
                  rect.width > 80 &&
                  rect.height > 30 &&
                  rect.x < innerWidth &&
                  rect.x + rect.width > 0,
              );
            return {
              section: describe(section),
              children: [...section.children].map((element) => describe(element)),
              descendants,
            };
          };

          for (const label of targetLabels) {
            const exact = all.filter(
              (element) =>
                normalize(element.textContent) === label &&
                element.getBoundingClientRect().width > 0 &&
                element.getBoundingClientRect().height > 0,
            );
            const target =
              exact.find((element) => {
                const rect = element.getBoundingClientRect();
                return rect.right > 0 && rect.left < innerWidth;
              }) ?? exact.at(-1);
            if (!target) continue;

            const ancestors = [];
            let current = target;
            for (let depth = 0; current && depth < 6; depth += 1) {
              ancestors.push(describe(current));
              current = current.parentElement;
            }
            output[label] = ancestors;
          }

          return {
            scrollHeight: document.documentElement.scrollHeight,
            scrollWidth: document.documentElement.scrollWidth,
            elements: output,
            components: {
              aboutLink: aboutLink ? describe(aboutLink) : null,
              caseRoot: caseRoot ? describe(caseRoot) : null,
              caseBoxes,
              about: sectionSnapshot(
                "Informed strategy, Operational strength, and sustainable results.",
              ),
              industries: sectionSnapshot(
                "Accelerating B2B growth across diverse industries",
              ),
              why: sectionSnapshot("What makes us the right partner"),
              services: sectionSnapshot(
                "Expert services that move your business forward",
              ),
              stats: sectionSnapshot("Proven performance, Measurable results"),
              steps: sectionSnapshot("Our method for strategic B2B growth"),
            },
          };
        },
        { targetLabels: labels },
      );
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const output = `${JSON.stringify(report, null, 2)}\n`;
if (process.env.PROBE_OUT) {
  fs.writeFileSync(process.env.PROBE_OUT, output);
} else {
  console.log(output);
}
