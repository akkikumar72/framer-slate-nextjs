import { mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const origin = "https://b2bizz-wbs.framer.website";
const outputDir = join(process.cwd(), "public", "b2bizz", "assets");
const supported = /\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp)$/i;

const sitemap = await fetch(`${origin}/sitemap.xml`).then((response) => {
  if (!response.ok) throw new Error(`Sitemap request failed: ${response.status}`);
  return response.text();
});
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const assets = new Map();

for (const route of routes) {
  const response = await fetch(route);
  if (!response.ok && response.status !== 404) {
    throw new Error(`Page request failed: ${response.status} ${route}`);
  }
  const html = await response.text();
  for (const match of html.matchAll(/https:\/\/framerusercontent\.com\/(images|assets)\/([A-Za-z0-9._-]+)/g)) {
    const url = match[0];
    const filename = match[2];
    if (!supported.test(filename)) continue;
    const entry = assets.get(filename) ?? { url, routes: new Set() };
    entry.routes.add(new URL(route).pathname);
    assets.set(filename, entry);
  }
}

const extras = [
  {
    filename: "geist-latin.woff2",
    url: "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_Re-Q4mJPby1QNtA.woff2",
    routes: new Set(["shared-font"]),
  },
  { filename: "DubX211MjQXoVbiY3wBvbHWIyo.jpg", url: "https://framerusercontent.com/images/DubX211MjQXoVbiY3wBvbHWIyo.jpg", routes: new Set(["/blog"]) },
  { filename: "EhbPZDnfZ0GPCwniRRydyxCEM.jpg", url: "https://framerusercontent.com/images/EhbPZDnfZ0GPCwniRRydyxCEM.jpg", routes: new Set(["/blog"]) },
  { filename: "BTgcWmDsTlepQdIb7uADmS9PKs.svg", url: "https://framerusercontent.com/images/BTgcWmDsTlepQdIb7uADmS9PKs.svg", routes: new Set(["/case-study"]) },
  { filename: "youtube-smPos0mJvh8.webp", url: "https://i.ytimg.com/vi_webp/smPos0mJvh8/maxresdefault.webp", routes: new Set(["/blog/[slug]"]) },
];
for (const entry of extras) assets.set(entry.filename, entry);

await mkdir(outputDir, { recursive: true });
const failures = [];
for (const [filename, entry] of assets) {
  const response = await fetch(entry.url);
  if (!response.ok) {
    failures.push({ filename, status: response.status, url: entry.url });
    continue;
  }
  await writeFile(join(outputDir, basename(filename)), Buffer.from(await response.arrayBuffer()));
}

const aliases = {
  "logo.svg": "wvz41ynJzUlpgV2u1qUDqmGjhJA.svg",
  "header-shape.png": "VCaXkRh8SXoPc4MrUGSS0EbIsk.png",
  "menu-arrow.svg": "Ue91TqY5sigTxWrqvBiOWLkz4FY.svg",
  "button-arrow.svg": "lF4qvKFOOsAkrC72wGno0l1d2kg.svg",
  "cta-background.jpg": "AY6PQekAWDMcCklwuXMbqPS9CeE.jpg",
};
for (const [alias, source] of Object.entries(aliases)) {
  const response = await fetch(assets.get(source)?.url ?? "");
  if (!response.ok) {
    failures.push({ filename: alias, status: response.status, url: source });
    continue;
  }
  await writeFile(join(outputDir, alias), Buffer.from(await response.arrayBuffer()));
}

const manifest = {
  source: origin,
  generatedAt: new Date().toISOString(),
  routes,
  assets: [...assets].map(([filename, entry]) => ({
    filename,
    source: entry.url,
    routes: [...entry.routes],
  })),
  aliases,
  failures,
};
await writeFile(join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Saved ${assets.size - failures.length} assets from ${routes.length} routes.`);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
