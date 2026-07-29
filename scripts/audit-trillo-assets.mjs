import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = join(projectRoot, "public");
const assetRoot = join(publicRoot, "trillo", "assets");
const sourceRoots = [
  join(projectRoot, "app", "Trillo"),
  join(projectRoot, "components", "trillo"),
];
const requiredRoutes = [
  "app/Trillo/page.tsx",
  "app/Trillo/404/page.tsx",
  "app/Trillo/not-found.tsx",
  "app/Trillo/[...missing]/page.tsx",
];
const textExtensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const visualExtensions =
  "avif|gif|jpe?g|png|svg|webp|woff2?|ttf|otf|mp4|webm|mov";
const localAssetPattern = new RegExp(
  `\\/(?:trillo\\/assets|fonts)\\/[^"'\\\`()\\s<>?#]+\\.(?:${visualExtensions})`,
  "gi",
);
const remoteVisualPattern = new RegExp(
  `https?:\\/\\/[^\\s"'\\\`()<>]+\\.(?:${visualExtensions})(?:\\?[^\\s"'\\\`()<>]*)?`,
  "gi",
);
const framerAssetHostPattern =
  /https?:\/\/(?:[^/\s"'`]*\.)?(?:framerusercontent\.com|framer\.website)(?:[/:][^\s"'`)<>]*)?/gi;

function collectFiles(target) {
  if (!existsSync(target)) {
    return [];
  }

  const details = statSync(target);
  if (details.isFile()) {
    return [target];
  }

  return readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = join(target, entry.name);
    return entry.isDirectory() ? collectFiles(child) : [child];
  });
}

const sourceFiles = sourceRoots
  .flatMap(collectFiles)
  .filter((file) => textExtensions.has(extname(file).toLowerCase()));
const bundledAssets = collectFiles(assetRoot);
const referencedAssets = new Set();
const remoteReferences = [];
const failures = [];

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const sourcePath = relative(projectRoot, file);

  for (const match of source.matchAll(framerAssetHostPattern)) {
    remoteReferences.push({ file: sourcePath, url: match[0] });
  }

  for (const match of source.matchAll(remoteVisualPattern)) {
    remoteReferences.push({ file: sourcePath, url: match[0] });
  }

  for (const match of source.matchAll(localAssetPattern)) {
    if (!match[0].includes("${")) {
      referencedAssets.add(match[0]);
    }
  }
}

for (const asset of [
  ...Array.from({ length: 5 }, (_, index) => `/trillo/assets/brand-${index + 1}.svg`),
  ...Array.from(
    { length: 2 },
    (_, index) => `/trillo/assets/platform-card-${index + 1}.avif`,
  ),
]) {
  referencedAssets.add(asset);
}

for (const route of requiredRoutes) {
  if (!existsSync(join(projectRoot, route))) {
    failures.push(`missing route entry: ${route}`);
  }
}

for (const assetUrl of referencedAssets) {
  const file = join(publicRoot, assetUrl);
  if (!existsSync(file) || !statSync(file).isFile()) {
    failures.push(`missing local asset: ${assetUrl}`);
  } else if (statSync(file).size === 0) {
    failures.push(`empty local asset: ${assetUrl}`);
  }
}

for (const file of bundledAssets) {
  if (statSync(file).size === 0) {
    failures.push(`empty bundled asset: /${relative(publicRoot, file)}`);
  }
}

if (remoteReferences.length > 0) {
  failures.push(
    ...remoteReferences.map(
      ({ file, url }) => `remote visual reference in ${file}: ${url}`,
    ),
  );
}

if (failures.length > 0) {
  console.error("Trillo asset audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const bytes = bundledAssets.reduce(
  (total, file) => total + statSync(file).size,
  0,
);

console.log(
  [
    "Trillo asset audit passed.",
    `${referencedAssets.size} local runtime references checked.`,
    `${bundledAssets.length} files stored under public/trillo/assets (${(
      bytes /
      1024 /
      1024
    ).toFixed(1)} MiB).`,
    "0 remote visual references found.",
  ].join("\n"),
);
