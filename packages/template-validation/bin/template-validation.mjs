#!/usr/bin/env node

import { spawn } from "node:child_process";
import {
  access,
  readFile,
  readdir,
  stat,
} from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, "template.config.json");
const command = process.argv[2];
const visualExtensions =
  "avif|gif|ico|jpe?g|mov|mp3|mp4|otf|png|svg|ttf|wav|webm|webp|woff2?";
const textExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".mjs",
  ".ts",
  ".tsx",
]);

if (!["assets", "routes"].includes(command)) {
  console.error("Usage: template-validation <assets|routes>");
  process.exit(1);
}

const config = JSON.parse(await readFile(configPath, "utf8"));

if (command === "assets") {
  await auditAssets(config);
} else {
  await verifyRoutes(config);
}

async function collectFiles(target) {
  try {
    const details = await stat(target);
    if (details.isFile()) {
      return [target];
    }
  } catch {
    return [];
  }

  const entries = await readdir(target, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      collectFiles(path.join(target, entry.name)),
    ),
  );
  return nested.flat();
}

async function auditAssets(template) {
  const sourceFiles = (
    await Promise.all(
      template.sourceRoots.map((root) =>
        collectFiles(path.join(projectRoot, root)),
      ),
    )
  )
    .flat()
    .filter((file) => textExtensions.has(path.extname(file).toLowerCase()));
  const assetFiles = (
    await Promise.all(
      template.assetRoots.map((root) =>
        collectFiles(path.join(projectRoot, root)),
      ),
    )
  ).flat();
  const referencedAssets = new Set();
  const failures = [];
  const allowedHosts = new Set(template.allowedRemoteVisualHosts ?? []);
  const prefixGroup = template.assetPrefixes
    .map((prefix) => escapeRegex(prefix))
    .join("|");
  const localAssetPattern = new RegExp(
    `(?:${prefixGroup})[^"'\\\`()\\s<>?#]+\\.(?:${visualExtensions})(?:\\?[^"'\\\`()\\s<>#]*)?(?:#[^"'\\\`()\\s<>]*)?`,
    "gi",
  );
  const remoteVisualPattern = new RegExp(
    `https?:\\/\\/[^\\s"'\\\`()<>]+\\.(?:${visualExtensions})(?:\\?[^\\s"'\\\`()<>]*)?`,
    "gi",
  );
  const legacyRoutePrefixPattern = new RegExp(
    `(?:href\\s*=\\s*["']|href\\s*:\\s*["']|redirect\\(\\s*["']|canonical\\s*:\\s*["']|pathname\\s*(?:===?|!==?)\\s*["']|startsWith\\(\\s*["'])\\/${escapeRegex(template.slug)}(?:[\\/#?"']|$)`,
    "i",
  );

  for (const file of sourceFiles) {
    const source = await readFile(file, "utf8");
    const relativeFile = path.relative(projectRoot, file);

    for (const match of source.matchAll(localAssetPattern)) {
      referencedAssets.add(match[0].split(/[?#]/, 1)[0]);
    }

    for (const match of source.matchAll(remoteVisualPattern)) {
      let host;
      try {
        host = new URL(match[0]).hostname;
      } catch {
        host = "";
      }
      if (!allowedHosts.has(host)) {
        failures.push(
          `remote visual reference in ${relativeFile}: ${match[0]}`,
        );
      }
    }

    if (
      /(?:from|import)\s*["'][^"']*(?:\.\.\/){2,}apps\//.test(source) ||
      /(?:from\s*|import\s*|require\(\s*)["']@framer-templates\/(?!template-validation|typescript-config)/.test(source)
    ) {
      failures.push(`cross-app source dependency in ${relativeFile}`);
    }

    if (legacyRoutePrefixPattern.test(source)) {
      failures.push(`legacy route prefix in navigation or metadata: ${relativeFile}`);
    }
  }

  for (const assetUrl of referencedAssets) {
    const assetPath = path.join(
      projectRoot,
      "public",
      decodeURIComponent(assetUrl).replace(/^\/+/, ""),
    );
    try {
      const details = await stat(assetPath);
      if (!details.isFile() || details.size === 0) {
        failures.push(`empty or invalid local asset: ${assetUrl}`);
      }
    } catch {
      failures.push(`missing local asset: ${assetUrl}`);
    }
  }

  for (const file of assetFiles) {
    const details = await stat(file);
    if (!details.isFile() || details.size === 0) {
      failures.push(
        `empty bundled asset: ${path.relative(projectRoot, file)}`,
      );
    }
  }

  if (failures.length > 0) {
    console.error(`${template.name} asset audit failed:`);
    for (const failure of [...new Set(failures)]) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(
    `${template.name} asset audit passed: ${referencedAssets.size} references, ${assetFiles.length} bundled files.`,
  );
}

async function verifyRoutes(template) {
  const validationPort = await chooseValidationPort(template.port);
  const server = spawn(
    process.platform === "win32" ? "next.cmd" : "next",
    [
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(validationPort),
    ],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_URL:
          process.env.NEXT_PUBLIC_SITE_URL ??
          `http://127.0.0.1:${validationPort}`,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let output = "";
  const appendOutput = (chunk) => {
    output = `${output}${chunk.toString()}`.slice(-12000);
  };
  server.stdout.on("data", appendOutput);
  server.stderr.on("data", appendOutput);

  try {
    await waitForServer(validationPort, server, () => output);
    const failures = [];

    for (const contract of [
      ...(template.routes ?? []),
      ...(template.invalidRoutes ?? []),
    ]) {
      const response = await fetch(
        `http://127.0.0.1:${validationPort}${contract.path}`,
      );
      const html = await response.text();
      const text = decodeHtml(
        html
          .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
          .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      );

      if (response.status !== contract.status) {
        failures.push(
          `${contract.path}: expected ${contract.status}, received ${response.status}`,
        );
      }
      if (
        contract.marker &&
        !text.includes(contract.marker) &&
        !decodeHtml(html).includes(contract.marker)
      ) {
        failures.push(
          `${contract.path}: missing visible marker "${contract.marker}"`,
        );
      }
      if (contract.titleIncludes) {
        const title = decodeHtml(
          html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "",
        );
        if (!title.includes(contract.titleIncludes)) {
          failures.push(
            `${contract.path}: title "${title}" does not include "${contract.titleIncludes}"`,
          );
        }
      }
      if (contract.canonical) {
        const canonicalUrl = findCanonical(html);
        if (!canonicalUrl) {
          failures.push(`${contract.path}: canonical link is missing`);
        } else {
          const canonicalPath = normalizePath(
            new URL(
              canonicalUrl,
              `http://127.0.0.1:${validationPort}`,
            ).pathname,
          );
          if (canonicalPath !== normalizePath(contract.canonical)) {
            failures.push(
              `${contract.path}: canonical ${canonicalPath} does not match ${contract.canonical}`,
            );
          }
        }
      }
    }

    if (failures.length > 0) {
      console.error(`${template.name} route verification failed:`);
      for (const failure of failures) {
        console.error(`- ${failure}`);
      }
      process.exitCode = 1;
    } else {
      console.log(
        `${template.name} route verification passed: ${(template.routes ?? []).length} valid and ${(template.invalidRoutes ?? []).length} invalid routes.`,
      );
    }
  } finally {
    server.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => server.once("close", resolve)),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  }
}

async function chooseValidationPort(preferredPort) {
  for (const candidate of [preferredPort + 10000, preferredPort + 20000]) {
    if (await isPortAvailable(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `No isolated validation port is available for ${preferredPort}.`,
  );
}

async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const probe = createServer();
    probe.unref();
    probe.once("error", () => resolve(false));
    probe.listen({ host: "127.0.0.1", port }, () => {
      probe.close(() => resolve(true));
    });
  });
}

async function waitForServer(port, server, getOutput) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(
        `Next.js server exited before becoming ready.\n${getOutput()}`,
      );
    }
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      await response.arrayBuffer();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error(`Timed out waiting for Next.js server on port ${port}.`);
}

function findCanonical(html) {
  return (
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
    )?.[1] ??
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i,
    )?.[1] ??
    null
  );
}

function normalizePath(value) {
  if (value === "/") {
    return value;
  }
  return value.replace(/\/+$/, "");
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
