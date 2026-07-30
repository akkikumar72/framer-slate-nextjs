import manifest from "@/public/palmer/assets/source-manifest.json";

type AssetRecord = { local: string };
const assets = manifest.assets as Record<string, AssetRecord>;

export function palmerAsset(name: string) {
  const record = assets[name];
  if (!record) {
    throw new Error(`Missing localized Palmer asset: ${name}`);
  }
  return record.local;
}
