import assetMap from './asset-map.json';
export function asset(filename: string): string {
    const result = (assetMap as Record<string, string>)[filename];
    if (!result)
        throw new Error(`Unknown Hulio asset: ${filename}`);
    return result;
}
