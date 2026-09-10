export function sanitizeTipTapHTML(html: string): string {
  if (!html) return '';

  let result = html;

  // Remove data-start and data-end attributes (TipTap selection artifacts with
  // non-deterministic values that cause hydration mismatches).
  result = result.replace(/\s+(?:data-start|data-end)="[^"]*"/g, '');

  // Remove empty TipTap selection anchor spans BEFORE cleaning classes,
  // otherwise the class-cleaning step strips the "selectionAnchor" token.
  // e.g. <span aria-hidden="true" class="PDq2pG_selectionAnchor"></span>
  result = result.replace(
    /<span[^>]*\bclass="[^"]*?selectionAnchor[^"]*?"[^>]*>\s*<\/span>/g,
    '',
  );

  // Remove classes that contain TipTap selection anchor references.
  // e.g. "PDq2pG_selectionAnchorContainer" -> ""
  result = result.replace(/\s+class="[^"]*?"/g, (match) => {
    const value = match.slice(7, -1);
    if (!value.includes('selectionAnchor')) return match;
    const cleaned = value
      .split(/\s+/)
      .filter((cls) => !/_selectionAnchor/.test(cls))
      .join(' ');
    return cleaned ? ` class="${cleaned}"` : '';
  });

  return result;
}

export function stripHtml(html: string): string {
  if (!html) return '';
  return sanitizeTipTapHTML(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
