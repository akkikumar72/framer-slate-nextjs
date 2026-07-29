import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = JSON.parse(
  await readFile(join(root, "public/palmer/assets/source-manifest.json"), "utf8"),
);
const outputDir = join(root, ".codex-evidence/palmer/assets");
const entries = Object.entries(manifest.assets).filter(([name]) =>
  /\.(avif|jpe?g|png|webp)$/i.test(name),
);

await mkdir(outputDir, { recursive: true });

for (let page = 0; page < Math.ceil(entries.length / 24); page += 1) {
  const subset = entries.slice(page * 24, page * 24 + 24);
  const composites = [];

  for (let index = 0; index < subset.length; index += 1) {
    const [name, record] = subset[index];
    const localPath = join(root, "public", record.local);
    const thumb = await sharp(localPath)
      .rotate()
      .resize(260, 180, { fit: "cover" })
      .jpeg({ quality: 82 })
      .toBuffer();
    const label = Buffer.from(
      `<svg width="260" height="34" xmlns="http://www.w3.org/2000/svg">
        <rect width="260" height="34" fill="#111"/>
        <text x="8" y="14" fill="#fff" font-family="Arial" font-size="10">${name.slice(0, 31)}</text>
        <text x="8" y="28" fill="#999" font-family="Arial" font-size="9">${record.local.split("/").at(-1)}</text>
      </svg>`,
    );
    const tile = await sharp({
      create: { width: 260, height: 214, channels: 3, background: "#111" },
    })
      .composite([
        { input: thumb, top: 0, left: 0 },
        { input: label, top: 180, left: 0 },
      ])
      .jpeg({ quality: 88 })
      .toBuffer();
    composites.push({
      input: tile,
      left: (index % 4) * 270,
      top: Math.floor(index / 4) * 224,
    });
  }

  await sharp({
    create: {
      width: 1070,
      height: Math.ceil(subset.length / 4) * 224 - 10,
      channels: 3,
      background: "#000",
    },
  })
    .composite(composites)
    .jpeg({ quality: 88 })
    .toFile(join(outputDir, `contact-sheet-${page + 1}.jpg`));
}

console.log(`Generated ${Math.ceil(entries.length / 24)} contact sheets.`);
