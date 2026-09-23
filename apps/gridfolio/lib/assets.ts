import assets from "./asset-map.json";
export function asset(name: string): string {
  const entry = assets[name as keyof typeof assets];
  if (!entry) throw new Error(`Unknown GridFolio asset: ${name}`);
  return entry.local;
}
