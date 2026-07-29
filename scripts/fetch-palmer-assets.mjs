import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const site = "https://palmer-template.framer.website";
const assetRoot = join(process.cwd(), "public", "palmer", "assets");
const routes = [
  "/",
  "/work",
  "/gallery",
  "/contact",
  "/404",
  "/work/sonder-goods",
  "/work/halo-wear",
  "/work/lucent-lab",
  "/work/arc-bloom",
  "/work/atelier-nara",
  "/article/gregory-lalle",
  "/article/clive-willow",
  "/article/raven-claw",
  "/article/clay-nicolas",
];

await mkdir(assetRoot, { recursive: true });

const browserManifest = JSON.parse(
  await readFile(join(assetRoot, "manifest.json"), "utf8"),
);
const records = new Map();

for (const asset of browserManifest.assets) {
  if (!asset.name || asset.name.startsWith("svg-")) {
    continue;
  }

  const localName = `${asset.id}${extname(asset.path)}`;
  records.set(asset.name, {
    kind: asset.kind,
    local: `/palmer/assets/${localName}`,
    source: asset.url,
  });
}

const sourceUrls = new Map();
const routeAssets = {};

for (const route of routes) {
  const response = await fetch(`${site}${route}`);
  if (!response.ok && route !== "/404") {
    throw new Error(`Unable to fetch ${route}: ${response.status}`);
  }

  const html = (await response.text()).replaceAll("&amp;", "&");
  const matches = html.matchAll(
    /https:\/\/framerusercontent\.com\/(?:images|assets)\/[^"'()<>\s]+/g,
  );
  const namesForRoute = new Set();

  for (const match of matches) {
    const value = match[0].replace(/[),.;]+$/, "");
    const url = new URL(value);
    const name = basename(url.pathname);
    namesForRoute.add(name);
    const current = sourceUrls.get(name);
    const score = Number(url.searchParams.get("width") || 0);

    if (!current || score > current.score) {
      sourceUrls.set(name, { score, url: value });
    }
  }
  routeAssets[route] = [...namesForRoute];
}

const explicitAssets = [
  "https://framerusercontent.com/assets/nCpxWS6DaPlPe0lHzStXAPCo3lw.woff2",
  "https://framerusercontent.com/assets/8yoV9pUxquX7VD7ZXlNYKQmkmk.woff2",
  "https://framerusercontent.com/assets/PfdOpgzFf7N2Uye9JX7xRKYTgSc.woff2",
  "https://framerusercontent.com/assets/dHHUz45rhM2KCQpj9zttNVlibk.woff2",
  "https://framerusercontent.com/assets/n9CXKI3tsmCPeC6MCT9NziShSuQ.woff2",
  "https://framerusercontent.com/assets/fEkvm0HYUUFHc0WiH6ssCVGITR0.mp4",
  "https://framerusercontent.com/images/Lb6dFhKJo6UvYVXUafcZv0n5E.jpg?scale-down-to=1024&width=1792&height=2560",
  "https://framerusercontent.com/images/fd3PfavaULEOqoI2kVj4XmiR5g.png?scale-down-to=1024&width=896&height=1280",
];

for (const value of explicitAssets) {
  const url = new URL(value);
  const name = basename(url.pathname);
  sourceUrls.set(name, { score: Number.POSITIVE_INFINITY, url: value });
}

let downloaded = 0;
let reused = 0;
const failures = [];

for (const [name, candidate] of [...sourceUrls].sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  if (records.has(name)) {
    reused += 1;
    continue;
  }

  const output = join(assetRoot, name);
  try {
    const existing = await stat(output);
    if (existing.size > 0) {
      records.set(name, {
        kind: extname(name).slice(1),
        local: `/palmer/assets/${name}`,
        source: candidate.url,
      });
      reused += 1;
      continue;
    }
  } catch {}

  try {
    const response = await fetch(candidate.url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(output, buffer);
    records.set(name, {
      kind: response.headers.get("content-type") || extname(name).slice(1),
      local: `/palmer/assets/${name}`,
      source: candidate.url,
    });
    downloaded += 1;
  } catch (error) {
    failures.push({ name, source: candidate.url, error: String(error) });
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  site,
  routes,
  routeAssets,
  assets: Object.fromEntries([...records].sort(([a], [b]) => a.localeCompare(b))),
  failures,
};

await writeFile(
  join(assetRoot, "source-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(
  JSON.stringify(
    {
      discovered: sourceUrls.size,
      localized: records.size,
      downloaded,
      reused,
      failures: failures.length,
    },
    null,
    2,
  ),
);

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
