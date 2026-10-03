/** The Facebook snapshot, as typed data for `FacebookNews.astro`.
 *
 *  `facebook-posts.json` and the files in `src/assets/facebook/` are **generated** by
 *  `scripts/fetch-facebook.mjs`; nobody edits them by hand, and since October 2026 they are
 *  not in the repository at all - they are the deploy runner's state, fetched and built with
 *  in one run of `.github/workflows/facebook-feed.yml`. This module is the only thing that
 *  reads them, and it exists to do two jobs the JSON cannot: give the posts a type, and turn
 *  a file name into an `ImageMetadata` that Astro will optimise.
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
 *  file in the message. That is not available here, and for two reasons now. The file names
 *  are post ids that do not exist until the workflow runs and change every time it does; and
 *  the snapshot itself is gitignored, so on a fresh clone it is simply not there, and a static
 *  import of a module that does not exist is a build error rather than an empty value.
 *  `import.meta.glob` answers both - a glob that matches nothing is an empty object, which is
 *  exactly the fallback wanted. It is not a shortcut taken to save typing.
 *
 *  ## A missing file is dropped rather than fatal, and that reverses what stood here
 *
 *  It used to throw. The argument was that the snapshot and its files arrived in one commit,
 *  so the two could only disagree if somebody had edited one of them by hand - a bug in the
 *  repository, and one worth stopping the build for. That argument went with the commit: the
 *  snapshot is the runner's state now, exactly as on alpaki-kazimierzdolny.pl, and an
 *  interrupted fetch should cost one photograph rather than the whole page. So a file the
 *  snapshot names and the disk does not have is left out, as it is on the sibling site.
 *
 *  No snapshot at all is not an error either: `posts` comes out empty and the section renders
 *  its empty state, which is what should be live in that state. See `hasPosts`.
 */
import type { ImageMetadata } from "astro";

import type { MessageTag } from "../utils/message";
import { fixturePosts, fixtureAvatar, fixturePageName } from "./facebook-fixture";

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

/* A glob of exactly one file, rather than an import of it - see the head of this module. The
   type parameter is doing a second job while it is here, and it is not decoration: TypeScript
   infers a plain JSON import from the file's *current contents*, so with an empty `posts`
   array the entries came out `never`, and on a day when every post happened to carry a
   photograph `image` inferred as `string` and the comparison against `undefined` below became
   "a comparison with no overlap" - a type error caused by nothing but that day's data. A glob
   is typed by its parameter and never by the bytes on disk, which is where the type of a
   generated file belongs. */
const snapshotModules = import.meta.glob<{ default: Snapshot }>("./facebook-posts.json", {
  eager: true,
});

/** `null` on a fresh clone, and on a runner whose working directory has been wiped before a
 *  fetch has ever succeeded there. */
const cache: Snapshot | null = Object.values(snapshotModules)[0]?.default ?? null;

/** Name shown on every card. From the snapshot where there is one, so a rename on Facebook
 *  arrives with the next refresh rather than needing a commit. */
const FALLBACK_PAGE_NAME = "Gospodarstwo Ogrodnicze Saran";

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

/** A file the snapshot names but the disk does not have is left out rather than fatal - see
 *  the note at the top. */
function onDisk<T>(file: string, from: Map<string, T>): T | null {
  return from.get(file) ?? null;
}

function fromSnapshot(entry: Snapshot["posts"][number]): FacebookPost {
  return {
    id: entry.id,
    message: entry.message,
    tags: entry.tags ?? [],
    publishedAt: new Date(entry.publishedAt),
    permalink: entry.permalink,
    media: entry.media.flatMap<FacebookMedia>((item) => {
      const image = item.image ? onDisk(item.image, images) : null;

      if (item.kind === "video") {
        const src = item.video ? onDisk(item.video, videos) : null;
        // Nothing to show and nothing to play - the whole item goes. The fetch script does not
        // write such an item, so this is reached only by a fetch that died between writing a
        // file and writing the snapshot that names it.
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

/** The posts as the snapshot holds them.
 *
 *  `import.meta.env.DEV` is true under `astro dev` and false in `astro build`. The fixture is
 *  invented copy attributed on screen to the owners' own Facebook page, so a build that ever
 *  fell back to it would publish words they never wrote under their name. Do not relax this
 *  into a plain fallback - see the head of facebook-fixture.ts.
 */
const loaded: FacebookPost[] =
  cache && cache.posts.length > 0
    ? cache.posts.map(fromSnapshot)
    : import.meta.env.DEV
      ? fixturePosts
      : [];

/** Whether there is anything worth printing as news. `false` puts the section into its empty
 *  state; it never removes the section.
 *
 *  **Age is not a condition here, and that reverses a rule this file used to carry.** A
 *  `MAX_AGE_DAYS = 60` fuse emptied the section once the newest post passed two months, on the
 *  argument that the failure mode of a broken pipeline is a snapshot serving the same posts
 *  forever, and that "news" from three months ago reads as a business that has closed. The
 *  owners were told what it was for and asked in September 2026 for the two latest posts to
 *  stand whatever their date. What that costs is the thing the fuse bought: a token that has
 *  stopped working now shows as a feed frozen at its last good day rather than as an empty
 *  block, and nothing on the page says which it is. The failed workflow run is the only
 *  alert left, so it is the one somebody has to watch.
 */
export const hasPosts: boolean = loaded.length > 0;

export const facebookPosts: FacebookPost[] = hasPosts ? loaded : [];

export const pageName: string =
  cache?.page.name ?? (import.meta.env.DEV ? fixturePageName : FALLBACK_PAGE_NAME);

/** The page's own profile picture, downloaded alongside the photographs.
 *
 *  `null` when Facebook reported none - it serves a blank silhouette for a page that never
 *  set one, and the card is better off with no avatar than with an anonymous grey head. With
 *  no snapshot at all the fixture's stand-in takes over, under the same rule as the posts
 *  themselves: nothing invented reaches a build.
 */
export const pageAvatar: ImageMetadata | null = cache?.page.avatar
  ? onDisk(cache.page.avatar, images)
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
