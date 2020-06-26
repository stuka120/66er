export function flatMultipleLineBreaks(html: string): string {
  return html.replace(/\n\s*\n/g, "").replace(/^\s+|\s+$/g, "");
}
