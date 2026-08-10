import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repo = process.cwd();
const sourceRoots = [
  path.join(repo, "app"),
  path.join(repo, "components"),
];
const assetRoot = path.join(repo, "public", "agentik", "assets");

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
const remoteRuntimeReferences = [];

for (const file of textFiles) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/\/agentik\/assets\/[A-Za-z0-9._-]+/g)) {
    localReferences.add(match[0]);
  }
  if (/framerusercontent\.com|agentik\.framer\.ai|framer\.com\/projects/.test(source)) {
    remoteRuntimeReferences.push(path.relative(repo, file));
  }
}

for (const reference of localReferences) {
  await access(path.join(repo, "public", reference));
}

const requiredRouteFiles = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/about/page.tsx",
  "app/careers/page.tsx",
  "app/contact/page.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/404/page.tsx",
  "app/[...missing]/page.tsx",
  "app/not-found.tsx",
];
for (const relativePath of requiredRouteFiles) {
  await access(path.join(repo, relativePath));
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
  throw new Error(`Empty Agentik assets:\n${emptyAssets.join("\n")}`);
}
if (remoteRuntimeReferences.length) {
  throw new Error(`Remote Agentik runtime references:\n${remoteRuntimeReferences.join("\n")}`);
}

console.log("Agentik asset audit passed.");
console.log(`${localReferences.size} explicit local runtime references checked.`);
console.log(`${requiredRouteFiles.length} required route entry files checked.`);
console.log(`${storedAssets.length} files stored under public/agentik/assets (${(totalBytes / 1024 / 1024).toFixed(1)} MiB).`);
console.log("0 Framer runtime references found.");
