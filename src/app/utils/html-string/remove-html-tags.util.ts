export function removeHtmlTags(html: string) {
  return html
    .replace(/<[^>]+>/gm, "")
    .replace(/\n\s*\n/g, "\n\n")
    .replace(/^\s+|\s+$/g, "");
}
