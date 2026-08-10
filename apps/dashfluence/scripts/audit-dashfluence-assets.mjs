import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repo = process.cwd();
const sourceRoots = [
  path.join(repo, "app", "Dashfluence"),
  path.join(repo, "components", "dashfluence"),
];
const assetRoot = path.join(repo, "public", "dashfluence", "assets");
const homepageServiceAssets = [
  "8pav5SU3BnJ6wETIuurnrNxivo.png",
  "P6VdABYaeMyqzy5lJeVzQ2GSH90-home.webp",
  "FZtr09azaTHn6YwdMESKE3Ss3tg.jpg",
  "6hoh6HKRqD2wucm9QOitChDY4S0.png",
  "pwOCQ86eV6uTDBY7fWUfJB09WU-home.webp",
];
const homepageDerivatives = new Set([
  "P6VdABYaeMyqzy5lJeVzQ2GSH90-home.webp",
  "pwOCQ86eV6uTDBY7fWUfJB09WU-home.webp",
]);
const derivativeBudgetBytes = 153_600;
const homepageServiceBudgetBytes = 1_258_291;

async function filesUnder(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await filesUnder(target)));
    else files.push(target);
  }
  return files;
}

const sourceFiles = (await Promise.all(sourceRoots.map(filesUnder))).flat();
const textFiles = sourceFiles.filter((file) => /\.(?:css|ts|tsx)$/.test(file));
const localReferences = new Set();
const remoteVisualReferences = [];

for (const file of textFiles) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/\/dashfluence\/assets\/[A-Za-z0-9._-]+/g)) {
    localReferences.add(match[0]);
  }
  for (const match of source.matchAll(/["']([A-Za-z0-9_-]+\.(?:avif|gif|jpe?g|png|svg|webp|woff2?))["']/g)) {
    localReferences.add(`/dashfluence/assets/${match[1]}`);
  }
  if (/framerusercontent\.com|dashfluence\.framer\.ai/.test(source)) {
    remoteVisualReferences.push(path.relative(repo, file));
  }
}

for (const reference of localReferences) {
  await access(path.join(repo, "public", reference));
}

const storedAssets = await filesUnder(assetRoot);
const emptyAssets = [];
let totalBytes = 0;
for (const file of storedAssets) {
  const details = await stat(file);
  totalBytes += details.size;
  if (details.size === 0) emptyAssets.push(path.relative(repo, file));
}

if (emptyAssets.length) {
  throw new Error(`Empty Dashfluence assets:\n${emptyAssets.join("\n")}`);
}
if (remoteVisualReferences.length) {
  throw new Error(`Remote Dashfluence visual references:\n${remoteVisualReferences.join("\n")}`);
}

let homepageServiceBytes = 0;
for (const filename of homepageServiceAssets) {
  const details = await stat(path.join(assetRoot, filename));
  homepageServiceBytes += details.size;
  if (homepageDerivatives.has(filename) && details.size > derivativeBudgetBytes) {
    throw new Error(
      `Dashfluence homepage derivative ${filename} is ${details.size} bytes; allowed ${derivativeBudgetBytes} bytes.`,
    );
  }
}
if (homepageServiceBytes > homepageServiceBudgetBytes) {
  throw new Error(
    `Dashfluence homepage service assets total ${homepageServiceBytes} bytes; allowed ${homepageServiceBudgetBytes} bytes.`,
  );
}

console.log("Dashfluence asset audit passed.");
console.log(`${localReferences.size} explicit local runtime references checked.`);
console.log(`${storedAssets.length} files stored under public/dashfluence/assets (${(totalBytes / 1024 / 1024).toFixed(1)} MiB).`);
console.log(`Homepage service assets total ${homepageServiceBytes} bytes.`);
console.log("0 remote visual references found.");
