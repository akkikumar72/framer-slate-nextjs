import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = join(projectRoot, "public");
const fuelPublicRoot = join(publicRoot, "fuel");
const scanTargets = [
  join(projectRoot, "app"),
  join(projectRoot, "app", "layout.tsx"),
  join(projectRoot, "app", "globals.css"),
  join(projectRoot, "components", "FuelPage.tsx"),
  join(projectRoot, "components", "FuelPage.module.css"),
  join(projectRoot, "components", "fuel"),
  fuelPublicRoot,
];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
]);
const assetExtensions =
  "avif|gif|jpe?g|png|svg|webp|woff2?|ttf|otf|mp4|webm|mov|mp3|wav";
const localAssetPattern = new RegExp(
  `\\/fuel\\/[^"'\\\`()\\s<>?#]+\\.(?:${assetExtensions})(?:\\?[^"'\\\`()\\s<>#]*)?(?:#[^"'\\\`()\\s<>]*)?`,
  "gi",
);
const framerHostPattern =
  /https?:\/\/(?:[^/\s"'`]*\.)?(?:framerusercontent\.com|framer\.website|framer\.com)(?:[/:][^\s"'`)<>]*)?/gi;

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

const scannedFiles = [...new Set(scanTargets.flatMap(collectFiles))];
const textFiles = scannedFiles.filter((file) =>
  textExtensions.has(extname(file).toLowerCase()),
);
const framerReferences = [];
const referencedAssets = new Set();

for (const file of textFiles) {
  const source = readFileSync(file, "utf8");

  for (const match of source.matchAll(framerHostPattern)) {
    framerReferences.push({
      file: relative(projectRoot, file),
      url: match[0],
    });
  }

  for (const match of source.matchAll(localAssetPattern)) {
    referencedAssets.add(match[0].split(/[?#]/, 1)[0]);
  }
}

const missingAssets = [];
const emptyAssets = [];

for (const assetUrl of referencedAssets) {
  const assetPath = join(publicRoot, decodeURIComponent(assetUrl));

  if (!existsSync(assetPath) || !statSync(assetPath).isFile()) {
    missingAssets.push(assetUrl);
  } else if (statSync(assetPath).size === 0) {
    emptyAssets.push(assetUrl);
  }
}

const bundledAssets = collectFiles(fuelPublicRoot);
const emptyBundledAssets = bundledAssets
  .filter((file) => statSync(file).size === 0)
  .map((file) => `/${relative(publicRoot, file)}`);

if (framerReferences.length > 0) {
  console.error("Framer-hosted references found in the Fuel runtime:");
  for (const reference of framerReferences) {
    console.error(`- ${reference.file}: ${reference.url}`);
  }
}

if (missingAssets.length > 0) {
  console.error("Missing local Fuel assets:");
  for (const asset of missingAssets) {
    console.error(`- ${asset}`);
  }
}

const allEmptyAssets = [...new Set([...emptyAssets, ...emptyBundledAssets])];
if (allEmptyAssets.length > 0) {
  console.error("Empty local Fuel assets:");
  for (const asset of allEmptyAssets) {
    console.error(`- ${asset}`);
  }
}

if (
  framerReferences.length > 0 ||
  missingAssets.length > 0 ||
  allEmptyAssets.length > 0
) {
  process.exitCode = 1;
} else {
  console.log(
    `Fuel assets verified: ${referencedAssets.size} local references, ${bundledAssets.length} bundled files, 0 Framer-hosted references.`,
  );
}
