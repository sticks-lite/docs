import packageJson from "../package.json";

export const STICKS_LITE_VERSION = packageJson.version;
export const STICKS_LITE_VERSION_LABEL = `v${STICKS_LITE_VERSION}`;

export function renderVersionPlaceholders(markdown: string): string {
  return markdown
    .replaceAll("{{STICKS_LITE_VERSION}}", STICKS_LITE_VERSION)
    .replaceAll("{{STICKS_LITE_VERSION_LABEL}}", STICKS_LITE_VERSION_LABEL);
}
