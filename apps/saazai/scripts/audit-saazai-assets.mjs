import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = join(projectRoot, "public");
const saazaiAssetRoot = join(publicRoot, "saazai", "assets");
const sourceRoots = [
  join(projectRoot, "app"),
  join(projectRoot, "components", "saazai"),
];
const textExtensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const visualExtensions =
  "avif|gif|jpe?g|png|svg|webp|woff2?|ttf|otf|mp4|webm|mov";
const localAssetPattern = new RegExp(
  `\\/(?:saazai\\/assets|fonts)\\/[^"'\\\`()\\s<>?#]+\\.(?:${visualExtensions})(?:\\?[^"'\\\`()\\s<>#]*)?(?:#[^"'\\\`()\\s<>]*)?`,
  "gi",
);
const bareSaazaiAssetPattern = new RegExp(
  `["'\`]([^"'\\\`()\\s<>/]+\\.(?:${visualExtensions}))["'\`]`,
  "gi",
);
const remoteVisualPattern = new RegExp(
  `https?:\\/\\/[^\\s"'\\\`()<>]+\\.(?:${visualExtensions})(?:\\?[^\\s"'\\\`()<>]*)?`,
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

const sourceFiles = sourceRoots
  .flatMap(collectFiles)
  .filter((file) => textExtensions.has(extname(file).toLowerCase()));
const bundledAssets = collectFiles(saazaiAssetRoot);
const referencedAssets = new Set();
const remoteReferences = [];

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const sourcePath = relative(projectRoot, file);

  for (const match of source.matchAll(framerHostPattern)) {
    remoteReferences.push({ file: sourcePath, url: match[0] });
  }

  for (const match of source.matchAll(remoteVisualPattern)) {
    remoteReferences.push({ file: sourcePath, url: match[0] });
  }

  for (const match of source.matchAll(localAssetPattern)) {
    referencedAssets.add(match[0].split(/[?#]/, 1)[0]);
  }

  for (const match of source.matchAll(bareSaazaiAssetPattern)) {
    referencedAssets.add(`/saazai/assets/${match[1]}`);
  }
}

for (const file of bundledAssets.filter((asset) => extname(asset) === ".svg")) {
  const source = readFileSync(file, "utf8");

  for (const match of source.matchAll(
    /(?:href|xlink:href)=["']([^"']+)["']/gi,
  )) {
    const value = match[1];
    if (
      !value.startsWith("#") &&
      !value.startsWith("data:") &&
      /^https?:\/\//i.test(value)
    ) {
      remoteReferences.push({
        file: relative(projectRoot, file),
        url: value,
      });
    }
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

for (const file of bundledAssets) {
  if (statSync(file).size === 0) {
    emptyAssets.push(`/${relative(publicRoot, file)}`);
  }
}

if (remoteReferences.length > 0) {
  console.error("Remote Saazai visual references found:");
  for (const reference of remoteReferences) {
    console.error(`- ${reference.file}: ${reference.url}`);
  }
}

if (missingAssets.length > 0) {
  console.error("Missing local Saazai assets:");
  for (const asset of missingAssets) {
    console.error(`- ${asset}`);
  }
}

if (emptyAssets.length > 0) {
  console.error("Empty local Saazai assets:");
  for (const asset of [...new Set(emptyAssets)]) {
    console.error(`- ${asset}`);
  }
}

if (
  remoteReferences.length > 0 ||
  missingAssets.length > 0 ||
  emptyAssets.length > 0
) {
  process.exitCode = 1;
} else {
  const bytes = bundledAssets.reduce(
    (total, file) => total + statSync(file).size,
    0,
  );

  console.log(
    [
      "Saazai asset audit passed.",
      `${referencedAssets.size} local runtime references checked.`,
      `${bundledAssets.length} files stored under public/saazai/assets (${(
        bytes /
        1024 /
        1024
      ).toFixed(1)} MiB).`,
      "0 remote visual references found.",
    ].join("\n"),
  );
}
