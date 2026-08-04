import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const manifestPath = join(root, "public/pilar/assets/source-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const failures = [];
const runtimeAssets = new Set(Object.values(manifest.assets).map((record) => record.local));
const declaredFiles = [
  ...Object.entries(manifest.assets),
  ...Object.entries(manifest.backups ?? {}).map(([name, record]) => [`backup:${name}`, record]),
];

for (const [name, record] of declaredFiles) {
  const path = join(root, "public", record.local);
  try {
    const details = await stat(path);
    if (!details.isFile() || details.size === 0) failures.push(`${name}: empty or not a file`);
  } catch {
    failures.push(`${name}: missing ${record.local}`);
  }
}

const requiredRoutes = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/contact/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/not-found.tsx",
];

for (const route of requiredRoutes) {
  try {
    await access(join(root, route));
  } catch {
    failures.push(`missing route entry: ${route}`);
  }
}

const codeFiles = [
  "components/pilar/PliarShell.tsx",
  "components/pilar/PliarShell.module.css",
  "components/pilar/PliarHome.tsx",
  "components/pilar/PliarHome.module.css",
  "components/pilar/PliarSecondary.tsx",
  "components/pilar/PliarSecondary.module.css",
  "components/pilar/PliarLegal.tsx",
  "components/pilar/PliarLegal.module.css",
  "components/pilar/data.ts",
];

let generatedLandscapeReferences = 0;
const requiredThemeLandscapes = new Set([
  "pilar/assets/landscape-theme-blue.webp",
  "pilar/assets/landscape-theme-brown.webp",
  "pilar/assets/landscape-theme-violet.webp",
]);
const referencedThemeLandscapes = new Set();

for (const file of codeFiles) {
  const source = await readFile(join(root, file), "utf8");
  if (/https:\/\/(?:[^\s"']+\.)?(?:framerusercontent\.com|pliar\.framer\.website|fonts\.gstatic\.com)/.test(source)) {
    failures.push(`remote runtime asset dependency in ${file}`);
  }

  const localReferences = source.matchAll(/["'(](\/pilar\/assets\/[^\s"')]+)/g);
  for (const match of localReferences) {
    const assetPath = match[1].slice(1);
    if (!runtimeAssets.has(assetPath)) failures.push(`unmanifested runtime asset in ${file}: ${match[1]}`);
    if (assetPath === "pilar/assets/landscape-v3.webp") generatedLandscapeReferences += 1;
    if (requiredThemeLandscapes.has(assetPath)) referencedThemeLandscapes.add(assetPath);
  }
}

if (generatedLandscapeReferences < 2) {
  failures.push("generated landscape must cover both the hero and reusable landscape cards");
}

for (const themedLandscape of requiredThemeLandscapes) {
  if (!referencedThemeLandscapes.has(themedLandscape)) {
    failures.push(`missing theme landscape runtime reference: ${themedLandscape}`);
  }
}

if (failures.length > 0) {
  console.error("Pilar asset audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Pilar asset audit passed: ${Object.keys(manifest.assets).length} runtime assets, ${Object.keys(manifest.backups ?? {}).length} local backups, ${manifest.routes.length} route states.`);
