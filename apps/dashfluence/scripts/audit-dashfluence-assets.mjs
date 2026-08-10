import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repo = process.cwd();
const sourceRoots = [
  path.join(repo, "app", "Dashfluence"),
  path.join(repo, "components", "dashfluence"),
];
const assetRoot = path.join(repo, "public", "dashfluence", "assets");

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

console.log("Dashfluence asset audit passed.");
console.log(`${localReferences.size} explicit local runtime references checked.`);
console.log(`${storedAssets.length} files stored under public/dashfluence/assets (${(totalBytes / 1024 / 1024).toFixed(1)} MiB).`);
console.log("0 remote visual references found.");
