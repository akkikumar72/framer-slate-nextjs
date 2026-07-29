import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const manifestPath = join(root, "public/palmer/assets/source-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const failures = [];

for (const [name, record] of Object.entries(manifest.assets)) {
  const file = join(root, "public", record.local);
  try {
    const details = await stat(file);
    if (!details.isFile() || details.size === 0) {
      failures.push(`${name}: empty or not a file`);
    }
  } catch {
    failures.push(`${name}: missing ${record.local}`);
  }
}

const requiredRoutes = [
  "app/palmer/page.tsx",
  "app/palmer/work/page.tsx",
  "app/palmer/work/[slug]/page.tsx",
  "app/palmer/gallery/page.tsx",
  "app/palmer/contact/page.tsx",
  "app/palmer/article/[slug]/page.tsx",
  "app/palmer/404/page.tsx",
  "app/palmer/not-found.tsx",
  "app/palmer/[...missing]/page.tsx",
];

for (const route of requiredRoutes) {
  try {
    await access(join(root, route));
  } catch {
    failures.push(`missing route entry: ${route}`);
  }
}

const codeFiles = [
  "components/palmer/assets.ts",
  "components/palmer/data.ts",
  "components/palmer/shared/PalmerShell.tsx",
  "components/palmer/shared/PalmerShell.module.css",
  "components/palmer/static/PalmerStaticPages.tsx",
  "components/palmer/static/PalmerStaticPages.module.css",
];

for (const file of codeFiles) {
  const source = await readFile(join(root, file), "utf8");
  if (/https:\/\/framerusercontent\.com/.test(source)) {
    failures.push(`external Framer asset URL in ${file}`);
  }
}

if (manifest.failures.length > 0) {
  failures.push(`${manifest.failures.length} acquisition failures in source manifest`);
}

if (failures.length > 0) {
  console.error("Palmer asset audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Palmer asset audit passed: ${Object.keys(manifest.assets).length} localized assets, ${manifest.routes.length} source routes.`,
);
