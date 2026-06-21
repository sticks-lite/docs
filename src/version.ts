import packageJson from "../package.json";

export const STICKS_LITE_VERSION = packageJson.version;

export function withVersionPlaceholders(markdown: string): string {
  return markdown
    .replace(/\\`/g, "`")
    .replace(/\{\{VERSION\}\}/g, STICKS_LITE_VERSION);
}
