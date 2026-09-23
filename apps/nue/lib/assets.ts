import assetMap from "./asset-map.json";
export function asset(name: string): string {
  const value = (assetMap as Record<string, string>)[name];
  if (!value) throw new Error(`Unknown Nue asset: ${name}`);
  return value;
}
