import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = join(projectRoot, "public");
const assetRoot = join(publicRoot, "rivero", "assets");
const sourceRoots = [
  join(projectRoot, "app"),
  join(projectRoot, "components", "rivero"),
];
const requiredRoutes = [
  "app/page.tsx",
  "app/404/page.tsx",
  "app/not-found.tsx",
  "app/[...missing]/page.tsx",
  "app/about/page.tsx",
  "app/pricing-v1/page.tsx",
  "app/pricing-v2/page.tsx",
  "app/feature/page.tsx",
  "app/reviews/page.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/case-study/page.tsx",
  "app/case-study/[slug]/page.tsx",
  "app/integrations/page.tsx",
  "app/integrations/[slug]/page.tsx",
  "app/changelog/[slug]/page.tsx",
  "app/contact-us/page.tsx",
  "app/appointment/page.tsx",
  "app/legal/privacy-policy/page.tsx",
  "app/legal/terms-conditions/page.tsx",
];
const textExtensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const visualExtensions = "avif|gif|jpe?g|png|svg|webp|woff2?|ttf|otf|mp4|webm|mov";
const localAssetPattern = new RegExp(
  `\\/rivero\\/assets\\/[^"'\\\`()\\s<>?#]+\\.(?:${visualExtensions})`,
  "gi",
);
const remoteVisualPattern = new RegExp(
  `https?:\\/\\/[^\\s"'\\\`()<>]+\\.(?:${visualExtensions})(?:\\?[^\\s"'\\\`()<>]*)?`,
  "gi",
);
const framerRuntimePattern =
  /https?:\/\/(?:[^/\s"'`]*\.)?(?:framerusercontent\.com|framer\.website)(?:[/:][^\s"'`)<>]*)?/gi;

function collectFiles(target) {
  if (!existsSync(target)) return [];
  if (statSync(target).isFile()) return [target];
  return readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = join(target, entry.name);
    return entry.isDirectory() ? collectFiles(child) : [child];
  });
}

const sourceFiles = sourceRoots.flatMap(collectFiles).filter((file) => textExtensions.has(extname(file).toLowerCase()));
const bundledAssets = collectFiles(assetRoot).filter((file) => !file.endsWith("manifest.json"));
const referencedAssets = new Set();
const remoteReferences = [];
const failures = [];

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const sourcePath = relative(projectRoot, file);
  for (const match of source.matchAll(framerRuntimePattern)) remoteReferences.push({ file: sourcePath, url: match[0] });
  for (const match of source.matchAll(remoteVisualPattern)) remoteReferences.push({ file: sourcePath, url: match[0] });
  for (const match of source.matchAll(localAssetPattern)) {
    if (!match[0].includes("${")) referencedAssets.add(match[0]);
  }
}

for (const route of requiredRoutes) {
  if (!existsSync(join(projectRoot, route))) failures.push(`missing route entry: ${route}`);
}

for (const assetUrl of referencedAssets) {
  const file = join(publicRoot, assetUrl);
  if (!existsSync(file) || !statSync(file).isFile()) failures.push(`missing local asset: ${assetUrl}`);
  else if (statSync(file).size === 0) failures.push(`empty local asset: ${assetUrl}`);
}

for (const file of bundledAssets) {
  if (statSync(file).size === 0) failures.push(`empty bundled asset: /${relative(publicRoot, file)}`);
}

if (remoteReferences.length > 0) {
  failures.push(...remoteReferences.map(({ file, url }) => `remote visual reference in ${file}: ${url}`));
}

if (failures.length > 0) {
  console.error("Rivero asset audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const bytes = bundledAssets.reduce((total, file) => total + statSync(file).size, 0);
console.log([
  "Rivero asset audit passed.",
  `${referencedAssets.size} local runtime references checked.`,
  `${bundledAssets.length} files stored under public/rivero/assets (${(bytes / 1024 / 1024).toFixed(1)} MiB).`,
  "0 remote visual references found.",
].join("\n"));
