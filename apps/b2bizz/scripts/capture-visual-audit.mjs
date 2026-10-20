import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import sharp from "sharp";

const auditDirectory = process.env.AUDIT_DIR ?? "/tmp/b2bizz-visual-audit";
const name = process.env.VIEWPORT_NAME ?? "desktop";
const width = Number(process.env.VIEWPORT_WIDTH ?? 1291);
const height = Number(process.env.VIEWPORT_HEIGHT ?? 918);
const referenceUrl = process.env.REFERENCE_URL ?? "https://b2bizz-wbs.framer.website/";
const localUrl = process.env.LOCAL_URL ?? "http://localhost:3021/b2bizz";

const targets = [
  ["reference", referenceUrl],
  ["local", localUrl],
];

const landmarks = [
  "Built for B2B, focused on results.",
  "Trusted by fast-moving B2B teams",
  "Informed strategy, Operational strength, and sustainable results.",
  "Accelerating B2B growth across diverse industries",
  "What makes us the right partner",
  "Expert services that move your business forward",
  "Proven performance, Measurable results",
  "Our method for strategic B2B growth",
  "Is your B2B business ready for the next level?",
  "Pages links",
];

fs.mkdirSync(auditDirectory, { recursive: true });

function normalize(value) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

async function settlePage(page) {
  await page.waitForTimeout(450);
  await page.evaluate(() => document.fonts.ready);
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < scrollHeight; y += 400) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1400);
}

async function measurePage(page) {
  return page.evaluate(
    ({ landmarkTexts, normalizeSource }) => {
      const normalizeText = new Function(`return (${normalizeSource})`)();
      const elements = [...document.querySelectorAll("h1,h2,h3,p,div,span")];
      const result = {};

      for (const text of landmarkTexts) {
        const element = elements.find(
          (candidate) =>
            normalizeText(candidate.textContent) === text &&
            candidate.getBoundingClientRect().width > 0 &&
            candidate.getBoundingClientRect().height > 0,
        );
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const styles = getComputedStyle(element);
        result[text] = {
          tag: element.tagName,
          top: Number((rect.top + scrollY).toFixed(2)),
          left: Number(rect.left.toFixed(2)),
          width: Number(rect.width.toFixed(2)),
          height: Number(rect.height.toFixed(2)),
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight,
          color: styles.color,
        };
      }

      return {
        viewport: { width: innerWidth, height: innerHeight },
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        landmarks: result,
      };
    },
    { landmarkTexts: landmarks, normalizeSource: normalize.toString() },
  );
}

const browser = await chromium.launch({ headless: true });
const measurements = {};

try {
  for (const [targetName, url] of targets) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
    await settlePage(page);
    measurements[targetName] = await measurePage(page);
    await page.screenshot({
      path: path.join(auditDirectory, `${name}-${targetName}.png`),
      fullPage: true,
      animations: "disabled",
    });
    await page.close();
  }
} finally {
  await browser.close();
}

const referencePath = path.join(auditDirectory, `${name}-reference.png`);
const localPath = path.join(auditDirectory, `${name}-local.png`);
const [referenceMetadata, localMetadata] = await Promise.all([
  sharp(referencePath).metadata(),
  sharp(localPath).metadata(),
]);
const columnWidth = 500;
const referenceHeight = Math.round(
  (referenceMetadata.height * columnWidth) / referenceMetadata.width,
);
const localHeight = Math.round(
  (localMetadata.height * columnWidth) / localMetadata.width,
);
const compositeHeight = Math.max(referenceHeight, localHeight);

await sharp({
  create: {
    width: columnWidth * 2 + 12,
    height: compositeHeight,
    channels: 3,
    background: "#202020",
  },
})
  .composite([
    {
      input: await sharp(referencePath).resize({ width: columnWidth }).png().toBuffer(),
      left: 0,
      top: 0,
    },
    {
      input: await sharp(localPath).resize({ width: columnWidth }).png().toBuffer(),
      left: columnWidth + 12,
      top: 0,
    },
  ])
  .png()
  .toFile(path.join(auditDirectory, `${name}-side-by-side.png`));

fs.writeFileSync(
  path.join(auditDirectory, `${name}-metrics.json`),
  `${JSON.stringify(measurements, null, 2)}\n`,
);

console.log(JSON.stringify({ auditDirectory, name, measurements }, null, 2));
