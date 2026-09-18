/** The Facebook snapshot, as typed data for `FacebookNews.astro`.
 *
 *  `facebook-posts.json` and the files in `src/assets/facebook/` are **generated** by
 *  `scripts/fetch-facebook.mjs` and committed; nobody edits them by hand. This module is the
 *  only thing that reads them, and it exists to do two jobs the JSON cannot: give the posts a
 *  type, and turn a file name into an `ImageMetadata` that Astro will optimise.
 *
 *  Nothing here runs in the browser and nothing here talks to Meta. A visitor's browser loads
 *  the photographs and the films from our own server, which is the whole reason this block
 *  needs no consent gate while the Google map does - and the sentence § 5 of the privacy
 *  policy makes about it. Any move to a plugin, an iframe or a hotlinked `full_picture` makes
 *  that policy false, not merely this module different.
 *
 *  ## Why this is the one registry in `src/data/` without explicit imports
 *
 *  `gallery.ts` lists its photographs as one `import` statement each, deliberately - one
 *  photograph chosen in one place, and a missing file breaks the build with the name of the
 *  file in the message. That is not available here: the file names are post ids that do not
 *  exist until the workflow runs, and change every time it does. `import.meta.glob` is the
 *  only way to hand Vite a set of files whose names are unknown when the code is written. It
 *  is not a shortcut taken to save typing.
 *
 *  ## A missing file is fatal here, and that is a difference from the sibling site
 *
 *  alpaki-kazimierzdolny.pl drops a photograph its cache names but the disk does not have,
 *  because that cache is gitignored and lives in the runner's working directory - an
 *  interrupted fetch there should cost one photograph rather than the whole page. Here the
 *  snapshot and its files are committed together in one commit, so the two can only disagree
 *  if somebody edited one of them by hand. That is a bug in the repository, and it stops the
 *  build.
 *
 *  The empty snapshot - which is what ships until the first successful refresh - is not an
 *  error and renders the section's empty state. See `hasPosts`.
 */
import type { ImageMetadata } from "astro";

import type { MessageTag } from "../utils/message";
import { fixturePosts, fixtureAvatar, fixturePageName } from "./facebook-fixture";
import snapshot from "./facebook-posts.json";

/** One thing a card shows. A film keeps its still as the poster, so a card looks the same
 *  before anybody presses play - and nothing of the film itself is fetched until they do. */
export type FacebookMedia =
  | { kind: "photo"; image: ImageMetadata }
  | {
      kind: "video";
      /** Poster frame. `null` only if Facebook gave a film with no still at all. */
      image: ImageMetadata | null;
      /** Our own copy, served from our own server. `null` when the file was over the size
       *  cap in scripts/fetch-facebook.mjs - the card then shows the still and links out. */
      src: string | null;
      /** Running time, for the badge. `null` when Facebook would not say. */
      seconds: number | null;
    };

export interface FacebookPost {
  /** Graph API post id, `<pageId>_<postId>`. Also the prefix of its file names. */
  id: string;
  /** The owners' own words, unedited. Empty when the post was only a photograph. */
  message: string;
  /** People and pages tagged inside `message`, as Facebook reported them. Positions count
   *  code points, not UTF-16 units - see the note in src/utils/message.ts, which is the only
   *  place allowed to do arithmetic with them. Empty when nobody was tagged, which is the
   *  ordinary case. */
  tags: MessageTag[];
  publishedAt: Date;
  /** `permalink_url` - where "Zobacz na Facebooku" goes. */
  permalink: string;
  /** In the order Facebook returns them; empty for a text-only post. */
  media: FacebookMedia[];
  reactions: number;
  comments: number;
  /** `null` means Facebook did not report the field, which it omits at zero - the card then
   *  leaves the entry out rather than printing "0". */
  shares: number | null;
}

/** The snapshot file's shape - the contract `scripts/fetch-facebook.mjs` writes. The two
 *  change together. */
interface Snapshot {
  fetchedAt: string | null;
  page: { name: string | null; avatar: string | null };
  posts: {
    id: string;
    message: string;
    tags?: MessageTag[];
    publishedAt: string;
    permalink: string;
    media: { kind: "photo" | "video"; image?: string; video?: string; seconds?: number }[];
    reactions: number;
    comments: number;
    shares: number | null;
  }[];
}

/** The cast is not laziness, and removing it breaks the build on a Tuesday. TypeScript infers
 *  a JSON import from the file's *current contents*: with an empty `posts` array the entries
 *  are `never`, and on a day when every post happens to carry a photograph `image` infers as
 *  `string`, which makes a comparison against `undefined` below "a comparison with no
 *  overlap" - a type error caused by nothing but that day's data. The file is generated, so
 *  its type belongs to the generator. */
const cache = snapshot as unknown as Snapshot;

/** Name shown on every card. From the snapshot where there is one, so a rename on Facebook
 *  arrives with the next refresh rather than needing a commit. */
const FALLBACK_PAGE_NAME = "Gospodarstwo Ogrodnicze Saran";

/** Past this, the section stops showing posts and falls back to its empty state.
 *
 *  This is a dead man's switch, not a preference. The failure mode of a broken pipeline -
 *  most likely a token that stopped working - is a snapshot that keeps serving the same three
 *  posts indefinitely, and a visitor reading "news" from three months ago concludes the
 *  holding has closed. The workflow fails loudly on a bad fetch, but nobody watches a mailbox
 *  forever; this is the part that does not depend on anyone noticing.
 *
 *  **It empties the section rather than hiding it**, which is where this parts company with
 *  the sibling site. There the whole block disappears; here the owners asked for a block that
 *  is always on the page, saying where the news lives. An empty state claims nothing, so it
 *  is safe to leave standing - which is exactly what a stale snapshot is not.
 */
const MAX_AGE_DAYS = 60;

const imageFiles = import.meta.glob<{ default: ImageMetadata }>("../assets/facebook/*.jpg", {
  eager: true,
});

/* Films take the `?url` route rather than astro:assets, which only handles images. Vite still
   fingerprints them and emits them into /_astro/, so they inherit the same long cache every
   other asset here gets. */
const videoFiles = import.meta.glob<string>("../assets/facebook/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

/** The glob keys are paths relative to this module; the snapshot names bare files. */
const basename = (filePath: string): string => filePath.slice(filePath.lastIndexOf("/") + 1);

const images = new Map<string, ImageMetadata>(
  Object.entries(imageFiles).map(([filePath, module]) => [basename(filePath), module.default]),
);

const videos = new Map<string, string>(
  Object.entries(videoFiles).map(([filePath, url]) => [basename(filePath), url]),
);

/** A file the snapshot names has to be on disk - see the note at the top. */
function required<T>(file: string, from: Map<string, T>): T {
  const found = from.get(file);
  if (found === undefined) {
    throw new Error(
      `facebook.ts: the snapshot names src/assets/facebook/${file}, which is not there. ` +
        "Re-run `npm run fetch:facebook` rather than editing the snapshot by hand.",
    );
  }
  return found;
}

function fromSnapshot(entry: Snapshot["posts"][number]): FacebookPost {
  return {
    id: entry.id,
    message: entry.message,
    tags: entry.tags ?? [],
    publishedAt: new Date(entry.publishedAt),
    permalink: entry.permalink,
    media: entry.media.flatMap<FacebookMedia>((item) => {
      const image = item.image ? required(item.image, images) : null;

      if (item.kind === "video") {
        const src = item.video ? required(item.video, videos) : null;
        // Nothing to show and nothing to play - the whole item goes. The fetch script does
        // not write such an item, so this is a guard rather than a path.
        if (!image && !src) return [];
        return [{ kind: "video", image, src, seconds: item.seconds ?? null }];
      }

      return image ? [{ kind: "photo", image }] : [];
    }),
    reactions: entry.reactions,
    comments: entry.comments,
    shares: entry.shares,
  };
}

/** The posts as the snapshot holds them, before the age fuse.
 *
 *  `import.meta.env.DEV` is true under `astro dev` and false in `astro build`. The fixture is
 *  invented copy attributed on screen to the owners' own Facebook page, so a build that ever
 *  fell back to it would publish words they never wrote under their name. Do not relax this
 *  into a plain fallback - see the head of facebook-fixture.ts.
 */
const loaded: FacebookPost[] =
  cache.posts.length > 0 ? cache.posts.map(fromSnapshot) : import.meta.env.DEV ? fixturePosts : [];

/** Whether there is anything worth printing as news. `false` puts the section into its empty
 *  state; it never removes the section. See MAX_AGE_DAYS. */
export const hasPosts: boolean =
  loaded.length > 0 &&
  Date.now() - Math.max(...loaded.map((post) => post.publishedAt.getTime())) <
    MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

export const facebookPosts: FacebookPost[] = hasPosts ? loaded : [];

export const pageName: string =
  cache.page.name ?? (import.meta.env.DEV ? fixturePageName : FALLBACK_PAGE_NAME);

/** The page's own profile picture, downloaded alongside the photographs.
 *
 *  `null` when Facebook reported none - it serves a blank silhouette for a page that never
 *  set one, and the card is better off with no avatar than with an anonymous grey head. With
 *  no snapshot at all the fixture's stand-in takes over, under the same rule as the posts
 *  themselves: nothing invented reaches a build.
 */
export const pageAvatar: ImageMetadata | null = cache.page.avatar
  ? required(cache.page.avatar, images)
  : import.meta.env.DEV
    ? fixtureAvatar
    : null;

/** Absolute date, in the form the rest of the site writes dates. It is what ships in the
 *  HTML; `src/scripts/facebook-news.ts` replaces it with "3 dni temu" in the browser, where
 *  the arithmetic can be done against the moment someone is actually reading. Baking a
 *  relative date into a static build means publishing a sentence that starts lying the next
 *  morning. */
const dateFormat = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  /* Pinned rather than left to the machine doing the build. The holding is in Poland and the
     date a visitor reads is the Polish calendar date; without this it would be whatever the
     runner's clock is set to, and a post published just after midnight would be dated to the
     previous day on a runner running UTC. */
  timeZone: "Europe/Warsaw",
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** `datetime` for <time>: the whole instant, not just the day.
 *
 *  A date alone is read as midnight **UTC**, so a script counting in hours as well as days
 *  reports a post published at nine in the morning as ten hours old at noon. And the day
 *  itself would disagree with the visible text: `toISOString()` is UTC while the text above
 *  is Warsaw time, so a post from half past midnight would carry `datetime` one day behind
 *  the date printed beside it. A full timestamp is valid for `<time>` and settles both. */
export function isoDateTime(date: Date): string {
  return date.toISOString();
}
