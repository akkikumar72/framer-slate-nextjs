import assetMap from "./assets.generated.json";

const assets = assetMap as Record<string, string>;

export function palmerAsset(name: string) {
  const local = assets[name];
  if (!local) {
    throw new Error(`Missing localized Palmer asset: ${name}`);
  }
  return local;
}
