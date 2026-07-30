import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const sourcePath = join(
  root,
  "public/palmer/assets/source-manifest.json",
);
const targetPath = join(
  root,
  "components/palmer/assets.generated.json",
);
const source = JSON.parse(await readFile(sourcePath, "utf8"));
const assetMap = Object.fromEntries(
  Object.entries(source.assets)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, record]) => [name, record.local]),
);

await writeFile(targetPath, `${JSON.stringify(assetMap, null, 2)}\n`);
console.log(`Generated ${Object.keys(assetMap).length} Palmer runtime assets.`);
