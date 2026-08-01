import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const jaydenPublicRoot = path.join(publicRoot, "jayden");
const jaydenAssetRoot = path.join(jaydenPublicRoot, "assets");
const sourceRoots = [
  path.join(projectRoot, "app"),
  path.join(projectRoot, "components", "jayden"),
];
const sourceExtensions = /\.(?:css|ts|tsx)$/;
const visualExtensions =
  /\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp|woff2?)$/i;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeLocalUrl(value) {
  const cleanValue = value.split(/[?#]/, 1)[0];
  if (!cleanValue.startsWith("/jayden/")) {
    return null;
  }

  return path.join(publicRoot, cleanValue);
}

function isRemoteUrl(value) {
  return /^https?:\/\//i.test(value);
}

const sourceFiles = (await Promise.all(sourceRoots.map(walk)))
  .flat()
  .filter((file) => sourceExtensions.test(file));
const publicFiles = await walk(jaydenPublicRoot);
const svgFiles = publicFiles.filter((file) => file.endsWith(".svg"));
const referencedLocalFiles = new Set();
const remoteVisualReferences = [];

for (const file of sourceFiles) {
  const source = await fs.readFile(file, "utf8");
  const relativeFile = path.relative(projectRoot, file);

  for (const match of source.matchAll(
    /jaydenAsset\(["']([^"']+)["']\)/g,
  )) {
    referencedLocalFiles.add(path.join(jaydenAssetRoot, match[1]));
  }

  for (const match of source.matchAll(
    /["'`]([^"'`\s/]+\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp|woff2?))["'`]/gi,
  )) {
    referencedLocalFiles.add(path.join(jaydenAssetRoot, match[1]));
  }

  for (const match of source.matchAll(
    /\/jayden\/assets\/([^"')\s}]+)/g,
  )) {
    if (!match[1].startsWith("${")) {
      referencedLocalFiles.add(path.join(jaydenAssetRoot, match[1]));
    }
  }

  for (const match of source.matchAll(
    /(?:src|srcSet|poster)\s*=\s*["']([^"']+)["']/gi,
  )) {
    const value = match[1];
    if (isRemoteUrl(value)) {
      remoteVisualReferences.push({ file: relativeFile, value });
    }

    const localPath = normalizeLocalUrl(value);
    if (localPath) {
      referencedLocalFiles.add(localPath);
    }
  }

  for (const match of source.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
    const value = match[1].trim();
    if (value.startsWith("#") || value.startsWith("data:")) {
      continue;
    }

    if (isRemoteUrl(value)) {
      remoteVisualReferences.push({ file: relativeFile, value });
    }

    const localPath = normalizeLocalUrl(value);
    if (localPath) {
      referencedLocalFiles.add(localPath);
    }
  }
}

for (const file of svgFiles) {
  const source = await fs.readFile(file, "utf8");
  const relativeFile = path.relative(projectRoot, file);

  for (const match of source.matchAll(
    /(?:href|xlink:href)=["']([^"']+)["']/gi,
  )) {
    const value = match[1];
    if (
      !value.startsWith("#") &&
      !value.startsWith("data:") &&
      isRemoteUrl(value)
    ) {
      remoteVisualReferences.push({ file: relativeFile, value });
    }
  }
}

const missingFiles = [];
for (const file of referencedLocalFiles) {
  if (!visualExtensions.test(file)) {
    continue;
  }

  try {
    await fs.access(file);
  } catch {
    missingFiles.push(path.relative(projectRoot, file));
  }
}

if (remoteVisualReferences.length > 0 || missingFiles.length > 0) {
  if (remoteVisualReferences.length > 0) {
    console.error("Remote Jayden visual references found:");
    for (const reference of remoteVisualReferences) {
      console.error(`- ${reference.file}: ${reference.value}`);
    }
  }

  if (missingFiles.length > 0) {
    console.error("Missing local Jayden visual files:");
    for (const file of missingFiles) {
      console.error(`- ${file}`);
    }
  }

  process.exitCode = 1;
} else {
  const publicBytes = (
    await Promise.all(
      publicFiles.map(async (file) => (await fs.stat(file)).size),
    )
  ).reduce((total, size) => total + size, 0);

  console.log(
    [
      "Jayden asset audit passed.",
      `${referencedLocalFiles.size} referenced local files checked.`,
      `${publicFiles.length} files stored under public/jayden (${(
        publicBytes /
        1024 /
        1024
      ).toFixed(1)} MiB).`,
      "0 remote visual references found.",
    ].join("\n"),
  );
}
