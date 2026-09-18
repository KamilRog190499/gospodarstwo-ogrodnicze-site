/** Turns a Facebook post's text into the pieces `NewsCard.astro` renders.
 *
 *  Three things in a post's text mean something more than the characters they are made of:
 *  a person or page the hosts tagged, a hashtag they wrote, and an address they pasted.
 *  Facebook renders all three as links and so do we. The section is a view of their page;
 *  a mention that is only ink here would silently drop the attribution they made there.
 *
 *  Only the mentions are data. Facebook reports them in `message_tags` with a position in
 *  the text; hashtags and addresses are not reported at all and have to be found by
 *  pattern. That asymmetry is why this file exists rather than a regular expression at the
 *  call site: the three kinds have to be reconciled against one another before anything is
 *  rendered, or a hashtag inside an address turns one link into three.
 *
 *  ## Where a mention points, and why a person is not a page
 *
 *  For a page, a group or an event the `id` in a tag is the real one and
 *  `facebook.com/{id}` opens it. For a **person** it is not: Graph hands back an
 *  app-scoped id, minted for our integration, and `facebook.com/{that}` is a dead address.
 *  It cannot be traded for the real profile either - asked directly, Graph answers
 *  `(#100) Invalid parameter` with the page token and `(#3) Application does not have the
 *  capability` with the system user token. Resolving it needs `user_link` *and* that person
 *  having authorised our app, which for a photographer the hosts tagged will never happen.
 *
 *  So a person's mention points at the post it was written in, where the name is a real
 *  link to the real profile. That address is already on the card, under "Zobacz na
 *  Facebooku" - this is a second way into the same place rather than a new direction, and
 *  it is the only form in which the blue and the underline are telling the truth.
 *
 *  A tag arriving with no `type` at all is treated as a person, because that is the
 *  direction that cannot produce a broken link.
 *
 *  ## The offsets are code points
 *
 *  This is the part that breaks quietly. Graph API counts `offset` and `length` in Unicode
 *  code points; a JavaScript string is indexed in UTF-16 code units, and the two disagree
 *  the moment a post contains an emoji - which on this page is most of them. `slice()` on
 *  the raw string would be right until the first 🤗 and then off by one for everything
 *  after it, per emoji, with no error anywhere. So the text is split into code points once,
 *  up front, and every position in this file counts those.
 *
 *  Patterns still have to be matched against a real string, so `codePointAt` below maps
 *  UTF-16 indices back. It is built once per message rather than computed per match.
 *
 *  ## Order of operations at the call site
 *
 *  `nbsp()` from ./typography runs *before* this, on the whole message. That is safe and
 *  deliberate: it replaces a space with U+00A0, one character for one character, so it
 *  changes neither the code point count nor any offset Facebook gave us. Running it
 *  afterwards, per segment, would be worse - a segment cannot see the word in front of it,
 *  so a conjunction sitting right before a mention would be missed.
 */

/** One entry of Facebook's `message_tags`, as the cache stores it. */
export interface MessageTag {
  /** Facebook's id for the thing tagged. Real for a page, a group or an event; app-scoped
   *  and unusable as an address for a person - see the note above. */
  id: string;
  /** Facebook's own classifier: "user", "page", "group", "event". Absent in a cache
   *  written before this field existed. */
  type?: string;
  /** The tagged name as it appears in the text. Kept for the cache's own legibility; the
   *  rendered label is cut from the message itself, because that is what the reader sees
   *  and the two can differ after a rename. */
  name: string;
  /** Where the name starts, counted in code points. See the note above. */
  offset: number;
  /** How long it is, counted in code points. */
  length: number;
}

export type MessageSegment =
  | { kind: "text"; text: string }
  | { kind: "mention" | "hashtag" | "link"; text: string; href: string; title?: string };

/** An address. Deliberately stops before trailing punctuation: a sentence ending
 *  "…zapisy na https://example.com/rejestracja." must not carry the full stop into the
 *  link, and neither must a closing bracket. */
const URL_PATTERN = /https?:\/\/[^\s<>"']+[^\s<>"'.,:;!?)\]}»„”]/gu;

/** A hashtag. `\p{L}` rather than `\w`, because the hosts write Polish: `#ĄlpakiŁąka`
 *  has to match as one word, and `\w` would cut it at the first accented letter. */
const HASHTAG_PATTERN = /#[\p{L}\p{N}_]+/gu;

/** How long an address may read before it is cut. Past this a pasted Facebook event link -
 *  the kind carrying a hundred characters of `acontext` - stops being information and
 *  starts being a wall. The full address stays in `href` and in `title`. */
const LABEL_MAX = 42;

/** What an address shows. Facebook's own shortening: the host without `www.`, then as much
 *  of the path as fits. The scheme goes - nobody reads it and it costs eight characters of
 *  the budget. */
function label(url: string): string {
  let host: string;
  let rest: string;

  try {
    const parsed = new URL(url);
    host = parsed.hostname.replace(/^www\./, "");
    rest = parsed.pathname === "/" ? "" : parsed.pathname;
    rest += parsed.search + parsed.hash;
  } catch {
    // Matched as an address but not parseable as one. Shown as written rather than dropped.
    return url.length > LABEL_MAX ? `${url.slice(0, LABEL_MAX - 1)}…` : url;
  }

  const whole = host + rest;
  if (whole.length <= LABEL_MAX) return whole;

  // The host is never cut - it is the part that tells the reader where the link goes.
  return `${host}${rest.slice(0, Math.max(0, LABEL_MAX - host.length - 1))}…`;
}

/** A claimed piece of the message, in code points. */
interface Range {
  start: number;
  end: number;
  kind: "mention" | "hashtag" | "link";
  href: string;
  title?: string;
}

/** Splits a post's text into the pieces the card renders.
 *
 *  Ranges are claimed in order of authority: a mention comes from Facebook and is taken as
 *  given; an address is found next, so that a `#fragment` at its end stays part of it; a
 *  hashtag last. Anything overlapping a range already claimed is dropped rather than
 *  nested, because a link inside a link has no sensible rendering.
 */
export function segments(
  message: string,
  tags: MessageTag[] = [],
  /** The post's own address on facebook.com, where a person's mention has to point. */
  permalink = "",
): MessageSegment[] {
  if (message.length === 0) return [];

  const chars = [...message];

  /* UTF-16 index → code point index, for the two pattern passes below. Built by walking
     the code points once and recording where each one starts. */
  const codePointAt = new Map<number, number>();
  let unit = 0;
  chars.forEach((char, index) => {
    codePointAt.set(unit, index);
    unit += char.length;
  });
  codePointAt.set(unit, chars.length);

  const claimed: Range[] = [];

  /** Whether a range is free to take. */
  const free = (start: number, end: number): boolean =>
    !claimed.some((range) => start < range.end && end > range.start);

  for (const tag of tags) {
    const start = tag.offset;
    const end = tag.offset + tag.length;
    // A tag pointing outside the text is Facebook's bug, not ours; it is skipped rather
    // than allowed to produce an empty link.
    if (start < 0 || end > chars.length || start >= end) continue;
    if (!free(start, end)) continue;
    /* A page, a group or an event can be addressed by its id. A person cannot - see the
       note at the top - so the mention points at the post instead. Without a permalink to
       point at there is nothing honest to link to, and the name stays plain text. */
    const addressable = tag.type === "page" || tag.type === "group" || tag.type === "event";
    const href = addressable ? `https://www.facebook.com/${tag.id}` : permalink;
    if (!href) continue;

    claimed.push({ start, end, kind: "mention", href });
  }

  for (const [pattern, kind] of [
    [URL_PATTERN, "link"],
    [HASHTAG_PATTERN, "hashtag"],
  ] as const) {
    // The patterns are module-level and carry `g`, so `lastIndex` has to be reset or the
    // second message on a page starts searching where the first one stopped.
    pattern.lastIndex = 0;

    for (const match of message.matchAll(pattern)) {
      const start = codePointAt.get(match.index);
      const end = codePointAt.get(match.index + match[0].length);
      if (start === undefined || end === undefined) continue;
      if (!free(start, end)) continue;

      claimed.push(
        kind === "link"
          ? { start, end, kind, href: match[0], title: match[0] }
          : {
              start,
              end,
              kind,
              href: `https://www.facebook.com/hashtag/${encodeURIComponent(match[0].slice(1))}`,
            },
      );
    }
  }

  claimed.sort((a, b) => a.start - b.start);

  const out: MessageSegment[] = [];
  let cursor = 0;

  const plain = (start: number, end: number): void => {
    if (end > start) out.push({ kind: "text", text: chars.slice(start, end).join("") });
  };

  for (const range of claimed) {
    plain(cursor, range.start);
    const text = chars.slice(range.start, range.end).join("");
    out.push({
      kind: range.kind,
      text: range.kind === "link" ? label(text) : text,
      href: range.href,
      ...(range.title ? { title: range.title } : {}),
    });
    cursor = range.end;
  }

  plain(cursor, chars.length);
  return out;
}
