export function asset(localPath: string): string {
  if (!localPath.startsWith("/roco/assets/")) throw new Error(`Expected a local Roco asset: ${localPath}`);
  return localPath;
}
