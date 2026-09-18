/** Polish typography: one-letter conjunctions and prepositions must not end a line.
 *
 *  The mockup solved this with hand-written `&nbsp;` in the markup. Keeping those in
 *  Markdown would mean invisible characters inside copy the owners are meant to edit,
 *  so we insert them at render time and leave the content files as plain text.
 */

/** Non-breaking space (U+00A0), spelled out - it has to be visible in the source. */
const NBSP = " ";

/** Single-letter words: a, i, o, u, w, z (and their capitalised forms).
 *
 *  The preceding delimiter is matched with a lookbehind rather than consumed. Consuming
 *  it would eat the delimiter the next match needs, so in a run like "…a i o u…" only
 *  every other word would get its non-breaking space.
 */
const SINGLE_LETTER_WORDS = /(?<=^|[\s(„"–-])([aiouwzAIOUWZ]) /g;

/** Replaces the space after a single-letter word with a non-breaking space. */
export function nbsp(text: string): string {
  return text.replace(SINGLE_LETTER_WORDS, `$1${NBSP}`);
}
