// @ts-check
/** Refreshes the Facebook snapshot the home page builds from.
 *
 *  Run by `.github/workflows/facebook-feed.yml` on the self-hosted runner, once a day. It
 *  writes two things and nothing else:
 *
 *    src/data/facebook-posts.json      the posts, as data
 *    src/assets/facebook/<id>-<n>.jpg  the photographs and the films' poster frames
 *    src/assets/facebook/<id>-<n>.mp4  the films themselves, carried as they came
 *    src/assets/facebook/avatar.jpg    the page's own profile picture
 *
 *  All of it is committed to the repository. That is the whole design, and the reasons are
 *  worth keeping because each one is a way this could have been built and should not be:
 *
 *  - **The files are downloaded, never linked.** A `full_picture` or a video `source` URL from
 *    Facebook is signed and expires within days; a snapshot holding those URLs goes to broken
 *    images while still looking fresh. Worse, an `<img>` or a `<video>` pointing at
 *    `fbcdn.net` hands the visitor's IP address to Meta on every page view, which is exactly
 *    what `src/scripts/consent.ts` exists to prevent for the one other third party on this
 *    site. Local files mean the block needs no consent gate at all - and they are what makes
 *    § 5 of the privacy policy true rather than aspirational.
 *  - **The snapshot lives in git, not on the web server.** Astro runs images through sharp at
 *    build time, so a photograph delivered after the deploy would be the one unoptimised file
 *    on the site. Committing the snapshot puts the refresh through the normal build, and gives
 *    the feed a free property: a token that has stopped working means "the feed did not
 *    refresh", not "the page is empty".
 *  - **Nothing is swapped in until every download has succeeded.** Everything lands in a
 *    staging directory first. A run interrupted halfway must not leave `src/assets/facebook/`
 *    holding half a post while the snapshot still describes the whole of it.
 *
 *  This replaced a much smaller script in September 2026, when the owners asked for the card
 *  to be reproduced exactly as it stands on the sibling site alpaki-kazimierzdolny.pl. What
 *  the old one fetched was a date, a message and one photograph; everything else here - the
 *  albums, the films, the tagged names, the counters, the avatar, the full-size photographs -
 *  is what that card needs. `scripts/fetch-news.ts` in that repository is the original.
 *
 *  **Two tokens, and the difference is the whole reason this file has a token dance.** The
 *  secret holds a *system user* token - the long-lived one, and the only one worth storing.
 *  Meta's new Pages experience will not read a page's feed with it, and says so in a way that
 *  reads like a permissions problem when it is not ("Invalid OAuth 2.0 Access Token", subcode
 *  2069032, "a Page access token is required"). So the system user token is spent once, on
 *  /me/accounts, for the page's own access token, and every call after that uses the page
 *  token. The page token inherits the system user token's lifetime, so there is nothing here
 *  to refresh on a timer; when the system user token dies, the very first call fails.
 *
 *  The page token is derived at run time, which means it is not a repository secret and GitHub
 *  has nothing registered to redact. That is what the `::add-mask::` below is for. Never print
 *  it, and never let it into an error message.
 *
 *  Environment: `FB_PAGE_ID` and `FB_SYSTEM_USER_TOKEN`. See docs/facebook.md for how they are
 *  issued and what to do when the feed stops refreshing.
 */

import { Buffer } from "node:buffer";
import { mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

/** Pinned rather than floating: an unpinned Graph version changes response shapes on Meta's
 *  schedule instead of ours. Bumping it is a deliberate edit with a test run after it. */
const GRAPH_VERSION = "v26.0";

/** How many posts the snapshot keeps. The home page block shows two, and the snapshot holds
 *  exactly what is shown - an unused third post is a photograph, and possibly a film, committed
 *  to the repository forever for nobody to look at.
 *
 *  It was three until September 2026; the argument for two is in the head of
 *  `src/components/FacebookNews.astro`. **This number and the slice in that component are one
 *  decision in two places** - change them together, or the repository starts carrying files the
 *  page never renders. */
const KEEP = 2;

/** How many to ask Facebook for. Far more than we keep, because posts with neither text nor a
 *  photograph are dropped below and a page can publish a run of them. Note that this is a
 *  ceiling and not a promise: the block is built to render one post as readily as two, because
 *  a feed really can come back with only one thing worth showing. */
const REQUEST = 25;

/** Per post. A roll of forty photographs would otherwise mean forty files in three formats and
 *  four widths - several hundred derivatives for one card. */
const MAX_IMAGES = 10;

/** The longest edge of a still we are willing to carry.
 *
 *  This is the whole reason `largestImages` below exists. `attachments{media{image}}` does not
 *  return the photograph - it returns Facebook's own render of it, capped at 720px on the
 *  short edge. Downscaled to the 920px the card asks for, that is a resample of an already-
 *  compressed JPEG at almost 1:1, and it looks exactly as soft as it is. The Photo node's
 *  `images` field has the real sizes; this is the ceiling we take from it.
 *
 *  2000 rather than whatever Facebook has, because that is the "sources downscaled to max
 *  2000px" rule the rest of this repository follows (CLAUDE.md), and it is also the width the
 *  preview overlay asks for. Past that the extra pixels are never drawn and only cost sharp
 *  time on every scheduled run.
 */
const MAX_SOURCE_PX = 2000;

/** A ceiling on one video file.
 *
 *  Films are copied here for the same reason photographs are - a `<video src>` pointing at
 *  Facebook would hand Meta the IP address of everyone who opens the home page, and the
 *  section exists precisely so that never happens.
 *
 *  **12, not the sibling site's 40, and the difference is git.** There the cache is gitignored
 *  and lives in the runner's working directory, so a film that scrolls out of the feed is
 *  genuinely gone. Here the snapshot is committed, so every film ever downloaded stays in the
 *  history of this repository forever, even after the sweep at the bottom of this file deletes
 *  it from the working tree. At a film every few weeks that is tolerable; at 40 MB apiece it
 *  would not be. A film over the cap still appears as a post - it keeps its poster frame and
 *  its link out, which is the path the card already draws.
 *
 *  If the repository ever starts to feel heavy, the answer is to stop carrying films at all,
 *  not to raise this number.
 */
const MAX_VIDEO_MB = 12;

const root = fileURLToPath(new URL("..", import.meta.url));
const assetDir = path.join(root, "src", "assets", "facebook");
const stagingDir = path.join(root, ".facebook-staging");
const snapshotPath = path.join(root, "src", "data", "facebook-posts.json");

/** Exits non-zero without having touched the snapshot. Every failure path goes through here,
 *  so "the script failed" always means "yesterday's snapshot is still intact".
 *
 *  @param {string} message
 *  @returns {never}
 */
function fail(message) {
  console.error(`fetch-facebook: ${message}`);
  process.exit(1);
}

/* ------------------------------------------------------------------ Graph API ------- */

/** @typedef {{ src?: string }} GraphImage */
/** @typedef {{ image?: GraphImage, source?: string }} GraphMedia */
/** The object an attachment points at. For a video that is the Video node, which is where its
 *  duration comes from.
 *  @typedef {{ id?: string }} GraphTarget */
/** One `StoryAttachment`. `media_type` is Meta's own classifier ("photo", "video", "link");
 *  `media` is a `StoryAttachmentMedia`, whose reference lists exactly two fields, `image` and
 *  `source`, with no promise that either is filled in for any given type.
 *  @typedef {{ media_type?: string, media?: GraphMedia, target?: GraphTarget }} GraphItem */
/** @typedef {GraphItem & { subattachments?: { data?: GraphItem[] } }} GraphAttachment */
/** One entry of `message_tags`: somebody the owners tagged inside the text. `offset` and
 *  `length` count Unicode code points, which is not how JavaScript indexes a string. Nothing
 *  here does arithmetic with them beyond the trim correction in `tagsOf`; `src/utils/message.ts`
 *  is the one place that resolves them.
 *  @typedef {{ id?: string, name?: string, type?: string, offset?: number, length?: number }} GraphTag */
/**
 * @typedef {{
 *   id: string,
 *   message?: string,
 *   message_tags?: GraphTag[],
 *   created_time: string,
 *   permalink_url?: string,
 *   attachments?: { data?: GraphAttachment[] },
 *   reactions?: { summary?: { total_count?: number } },
 *   comments?: { summary?: { total_count?: number } },
 *   shares?: { count?: number },
 * }} GraphPost
 */

/** The token is a parameter rather than a module-level constant because there are two of them
 *  and they are not interchangeable - see the note at the top of this file. Passing it in is
 *  what makes each call site say which one it meant.
 *
 *  @template T
 *  @param {string} apiPath @param {Record<string, string>} params @param {string} token
 *  @returns {Promise<T>}
 */
async function graph(apiPath, params, token) {
  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${apiPath}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set("access_token", token);

  let response;
  try {
    // Without a deadline a hung connection holds the workflow open until GitHub's own six-hour
    // timeout.
    response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  } catch (error) {
    throw new Error(`could not reach the Graph API for /${apiPath}`, { cause: error });
  }

  if (!response.ok) {
    // Graph puts the useful part in the body - an expired token says so there, and the status
    // alone would leave whoever reads the failed run guessing.
    const body = await response.text();
    throw new Error(`Graph API ${response.status} for /${apiPath}: ${body.slice(0, 500)}`);
  }

  return /** @type {T} */ (await response.json());
}

/* ------------------------------------------------------------------ tokens ---------- */

/** Trades the system user token for the page's own access token - see the note at the top.
 *
 *  Matched on the page id, not on the page's name. The name is something the owners can change
 *  from their phone on a whim, and a rename must not be able to stop the build; FB_PAGE_ID is
 *  already the thing that decides which page this site follows, so it decides here too.
 *
 *  @param {string} pageId @param {string} systemUserToken @returns {Promise<string>}
 */
async function pageAccessToken(pageId, systemUserToken) {
  /** @type {{ data?: { id?: string, name?: string, access_token?: string }[] }} */
  const accounts = await graph(
    "me/accounts",
    // Spelled out rather than left to Graph API's default projection, for the same reason the
    // feed request below spells its sub-fields out.
    { fields: "id,name,access_token", limit: "100" },
    systemUserToken,
  );

  const match = accounts.data?.find((account) => account.id === pageId);

  if (!match?.access_token) {
    // Deliberately specific: the Graph error this replaces ("Invalid OAuth 2.0 Access Token")
    // points at the token when the actual fault is almost always an assignment missing in
    // Business settings.
    const seen = accounts.data?.length ?? 0;
    throw new Error(
      `the system user token carries no access token for page ${pageId} (/me/accounts ` +
        `returned ${seen} page(s)). In Meta Business Suite check that the system user is ` +
        "assigned to that page - Business settings -> System users -> Assign assets - with a " +
        "task that allows reading its content, that the token carries pages_show_list (which " +
        "is what makes /me/accounts list the page at all), and that FB_PAGE_ID names that " +
        "same page. See docs/facebook.md.",
    );
  }

  /* A derived token is not a repository secret, so GitHub has nothing registered to redact and
     would print it in full if it ever reached a log. This registers it; GitHub masks the value
     from here on, including in this very line. Guarded, because outside Actions nothing reads
     the command and the line would simply be the token. */
  if (process.env.GITHUB_ACTIONS === "true") {
    console.log(`::add-mask::${match.access_token}`);
  }

  return match.access_token;
}

/* ------------------------------------------------------------------ media ----------- */

/** One thing a card will show, as read off the feed - nothing downloaded yet.
 *
 *  @typedef {{
 *    kind: "photo" | "video",
 *    image?: string,
 *    video?: string,
 *    videoId?: string,
 *    photoId?: string,
 *  }} MediaSource
 */

/** Everything a post has to show.
 *
 *  Deliberately free of network calls: this runs for all 25 fetched posts, and only the three
 *  that survive the filter are worth spending requests on.
 *
 *  @param {GraphPost} post @returns {MediaSource[]}
 */
function mediaOf(post) {
  /** @type {MediaSource[]} */
  const found = [];

  for (const attachment of post.attachments?.data ?? []) {
    // An album can mix photographs and video, so each part is read in its own right rather
    // than inheriting whatever the wrapper happened to say it was.
    const items = attachment.subattachments?.data?.length
      ? attachment.subattachments.data
      : [attachment];

    for (const item of items) {
      const image = item.media?.image?.src;

      if (item.media_type === "video") {
        const video = item.media?.source;
        if (image || video) found.push({ kind: "video", image, video, videoId: item.target?.id });
        continue;
      }

      if (image) found.push({ kind: "photo", image, photoId: item.target?.id });
    }
  }

  return found.slice(0, MAX_IMAGES);
}

/** The tags of one post, lined up with the message as the snapshot stores it.
 *
 *  The subtlety is `.trim()`. The message is trimmed before it is written, and Facebook's
 *  offsets were measured against the untrimmed text - so every offset has to move back by
 *  however much came off the front, or a post that happens to start with a newline puts every
 *  one of its links a character or two to the right. Counted in code points, like the offsets
 *  themselves.
 *
 *  A tag reaching past the end of the trimmed text is dropped. That can only happen if Facebook
 *  and we disagree about the text, and half a link is worse than none.
 *
 *  @param {GraphPost} post @param {string} message
 */
function tagsOf(post, message) {
  const raw = post.message ?? "";
  const shift = [...raw].length - [...raw.trimStart()].length;
  const length = [...message].length;

  return (post.message_tags ?? []).flatMap((tag) => {
    if (!tag.id || typeof tag.offset !== "number" || typeof tag.length !== "number") return [];

    const offset = tag.offset - shift;
    if (offset < 0 || tag.length <= 0 || offset + tag.length > length) return [];

    return [
      {
        id: tag.id,
        name: tag.name ?? "",
        // Defaulted to the one kind whose id cannot be addressed, so a missing classifier costs
        // a mention its own link rather than producing a broken one.
        type: tag.type ?? "user",
        offset,
        length: tag.length,
      },
    ];
  });
}

/** Asks the Photo nodes for a size worth showing, and maps each id to the best address.
 *
 *  One request per photograph, which at KEEP x MAX_IMAGES tops out at thirty and in practice
 *  runs to about a dozen. `target.id` was already in the feed response.
 *
 *  Not `?ids=` - Graph answers that with "The ids query parameter is deprecated in v26.0+",
 *  which is the version this file pins.
 *
 *  Failure is deliberately cheap, per photograph and for the lot. A miss costs resolution, not
 *  the run: the caller falls back to the 720px render the feed already gave us, and the post
 *  still appears. Stopping a new post from reaching the page over a picture being soft would
 *  be out of all proportion.
 *
 *  @param {string[]} ids @param {string} token @returns {Promise<Map<string, string>>}
 */
async function largestImages(ids, token) {
  /** @type {Map<string, string>} */
  const best = new Map();
  if (ids.length === 0) return best;

  /** @type {string | null} */
  let firstError = null;

  const found = await Promise.all(
    ids.map(async (id) => {
      try {
        /** @type {{ images?: { source?: string, width?: number, height?: number }[] }} */
        const photo = await graph(id, { fields: "images" }, token);
        return { id, sizes: photo.images ?? [] };
      } catch (error) {
        firstError ??= error instanceof Error ? error.message : String(error);
        return { id, sizes: [] };
      }
    }),
  );

  for (const { id, sizes } of found) {
    const usable = sizes.filter(
      (size) => typeof size.source === "string" && size.width && size.height,
    );
    if (usable.length === 0) continue;

    // Largest first, then the first one that fits under the cap. If every size is over it -
    // which Facebook's list makes unlikely - the smallest is still better than nothing.
    usable.sort((a, b) => (b.width ?? 0) * (b.height ?? 0) - (a.width ?? 0) * (a.height ?? 0));
    const fits = usable.find(
      (size) => Math.max(size.width ?? 0, size.height ?? 0) <= MAX_SOURCE_PX,
    );
    const chosen = (fits ?? usable[usable.length - 1]).source;
    if (chosen) best.set(id, chosen);
  }

  const missing = ids.length - best.size;
  if (missing > 0) {
    console.warn(
      `fetch-facebook: ${missing} of ${ids.length} photograph(s) came back without a usable ` +
        "size; those keep Facebook's 720px render, which looks noticeably softer." +
        (firstError ? ` First error: ${firstError}` : ""),
    );
  }

  return best;
}

/** How long the film runs, for the badge on its corner. `null` when Facebook will not say; the
 *  badge then shows the play mark alone rather than a made-up number.
 *
 *  @param {string} videoId @param {string} token @returns {Promise<number | null>}
 */
async function videoSeconds(videoId, token) {
  try {
    /** @type {{ length?: number }} */
    const video = await graph(videoId, { fields: "length" }, token);
    return typeof video.length === "number" ? Math.round(video.length) : null;
  } catch {
    // A missing duration costs a label, not the run.
    return null;
  }
}

/** Downloads one still and writes it, baking in the EXIF rotation on the way.
 *
 *  **Re-encoded only when it has to be, and that is a departure from the sibling site**, which
 *  writes every file exactly as it came. Two rules meet here and they pull opposite ways. This
 *  repository bakes in EXIF orientation, because `<Picture>` does not honour that flag and a
 *  frame flagged sideways ships sideways. But a Facebook photograph has already been through
 *  Meta's JPEG encoder, and re-encoding it here would make the file Astro optimises a third
 *  generation - which is the very thing the quality ladder in `FacebookPost.astro` was raised
 *  to compensate for.
 *
 *  So: ask sharp what the orientation is, and only pay for a re-encode when the answer is not
 *  "upright". Meta's own renders normally are, so in the ordinary case the bytes are written
 *  exactly as they arrived.
 *
 *  @param {string} url @param {string} file
 */
async function fetchPhoto(url, file) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const input = Buffer.from(await response.arrayBuffer());
  const { orientation } = await sharp(input).metadata();

  if (orientation !== undefined && orientation !== 1) {
    // `.rotate()` with no argument applies the flag and drops it. Quality high enough that the
    // second encode is not the thing anyone notices about the picture.
    await writeFile(file, await sharp(input).rotate().jpeg({ quality: 92 }).toBuffer());
    return;
  }

  await writeFile(file, input);
}

/** Downloads a film, unless it is too big to be worth carrying - see MAX_VIDEO_MB. Returns
 *  false when it was skipped, so the caller can keep the still and drop playback rather than
 *  dropping the post.
 *
 *  @param {string} url @param {string} file @returns {Promise<boolean>}
 */
async function fetchVideo(url, file) {
  // Asked before fetching: a HEAD costs nothing next to twenty minutes of film.
  const head = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(20_000) });
  const size = Number(head.headers.get("content-length") ?? 0);

  if (size > MAX_VIDEO_MB * 1024 * 1024) {
    console.warn(
      `fetch-facebook: skipping a film (${(size / 1048576).toFixed(1)} MB, limit ` +
        `${MAX_VIDEO_MB} MB) - the post keeps its poster frame and its link.`,
    );
    return false;
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
  return true;
}

/* ------------------------------------------------------------------ the run --------- */

async function main() {
  const pageId = process.env.FB_PAGE_ID;
  const systemUserToken = process.env.FB_SYSTEM_USER_TOKEN;
  if (!pageId || !systemUserToken) {
    fail("FB_PAGE_ID and FB_SYSTEM_USER_TOKEN must both be set - see docs/facebook.md");
  }

  /* Everything below this line talks to the page with the page's own token. The system user
     token is not used again. */
  let token;
  try {
    token = await pageAccessToken(pageId, systemUserToken);
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }

  /** @type {{ name?: string, picture?: { data?: { url?: string, is_silhouette?: boolean } } }} */
  let page;
  /** @type {{ data?: GraphPost[] }} */
  let feed;

  try {
    page = await graph(pageId, { fields: "name,picture.type(large){url,is_silhouette}" }, token);

    feed = await graph(
      `${pageId}/posts`,
      {
        fields: [
          "id",
          "message",
          /* Who the owners tagged, and where in the text. Free - it rides along with the
             message rather than costing a request - and without it a tagged florist is just a
             name, while on their own page it is a link to their work. */
          "message_tags",
          "created_time",
          "permalink_url",
          /* Sub-fields spelled out rather than a bare `media`: asking for an object field
             without naming what you want leaves Graph API to pick a default projection, and
             that is not worth relying on. `source` is the playable video file - the whole
             reason a film can be watched here without the browser ever reaching Meta - and
             `target` carries the node id, which is where the full-size photograph and the
             film's duration come from. */
          "attachments{media_type,target,media{image,source},subattachments{media_type,target,media{image,source}}}",
          "reactions.summary(total_count).limit(0)",
          "comments.summary(total_count).limit(0)",
          "shares",
        ].join(","),
        limit: String(REQUEST),
      },
      token,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // Told apart on purpose. An expired or revoked token is the one failure that needs a person
    // to do something, and it must not read like a network hiccup in the run log.
    if (message.includes("OAuthException") || message.includes('"code":190')) {
      fail(
        `the access token is no longer valid (${message}). It has to be reissued - see ` +
          "docs/facebook.md. Nothing was changed.",
      );
    }
    fail(message);
  }

  /* The only rule: a post with neither text nor a photograph has nothing to render and would
   * come out as an empty rectangle. Everything else goes through - a change of cover photo
   * included, which is the cost of showing the feed as it is (docs/inwentaryzacja.md). */
  const chosen = (feed.data ?? [])
    .filter((post) => post?.id && post.created_time)
    .map((post) => ({ post, media: mediaOf(post) }))
    .filter(({ post, media }) => (post.message ?? "").trim().length > 0 || media.length > 0)
    .slice(0, KEEP);

  if (chosen.length === 0) {
    // Not an error: a page really can have nothing renderable. The old snapshot stays, and the
    // age fuse in src/data/facebook.ts empties the section once it passes 60 days.
    console.warn("fetch-facebook: no post worth showing - the snapshot stays as it is.");
    return;
  }

  /* Everything is downloaded into a staging directory first and only then swapped in. */
  await rm(stagingDir, { recursive: true, force: true });
  await mkdir(stagingDir, { recursive: true });

  /** @type {string | null} */
  let avatarFile = null;
  const avatarUrl = page.picture?.data?.url;
  // `is_silhouette` is Facebook's default blank avatar. Copying it would put a grey anonymous
  // head on every card; the card handles a missing avatar already.
  if (avatarUrl && !page.picture?.data?.is_silhouette) {
    avatarFile = "avatar.jpg";
    try {
      await fetchPhoto(avatarUrl, path.join(stagingDir, avatarFile));
    } catch (error) {
      fail(
        `could not download the page's profile picture: ` +
          `${error instanceof Error ? error.message : error}`,
      );
    }
  }

  /* Asked once for every photograph in all three posts, before a byte is downloaded, so that
     what lands in src/assets/facebook/ is the size worth keeping rather than the size the feed
     happened to volunteer. See MAX_SOURCE_PX. */
  const fullSize = await largestImages(
    [...new Set(chosen.flatMap(({ media }) => media.flatMap((item) => item.photoId ?? [])))],
    token,
  );

  const posts = [];
  for (const { post, media } of chosen) {
    /** @type {{ kind: "photo" | "video", image?: string, video?: string, seconds?: number }[]} */
    const files = [];

    for (const [index, item] of media.entries()) {
      // The id carries a page prefix and an underscore; keep it as the file's own name so the
      // sweep below can tell one post's files from another's. Sanitised anyway: the id becomes
      // a filename, and a value from a remote API is never trusted with a path.
      const base = `${post.id.replace(/[^\w-]/g, "_")}-${index}`;
      /** @type {{ kind: "photo" | "video", image?: string, video?: string, seconds?: number }} */
      const entry = { kind: item.kind };

      if (item.image) {
        entry.image = `${base}.jpg`;
        // The full-size address where the Photo node gave one, the feed's 720px render where
        // it did not - which is the fallback largestImages warns about.
        const source = (item.photoId && fullSize.get(item.photoId)) || item.image;
        try {
          await fetchPhoto(source, path.join(stagingDir, entry.image));
        } catch (error) {
          fail(
            `could not download a photograph for post ${post.id}: ` +
              `${error instanceof Error ? error.message : error}`,
          );
        }
      }

      if (item.kind === "video" && item.video) {
        const file = `${base}.mp4`;
        let carried = false;
        try {
          carried = await fetchVideo(item.video, path.join(stagingDir, file));
        } catch (error) {
          fail(
            `could not download a film for post ${post.id}: ` +
              `${error instanceof Error ? error.message : error}`,
          );
        }
        if (carried) {
          entry.video = file;
          if (item.videoId) {
            const seconds = await videoSeconds(item.videoId, token);
            if (seconds !== null) entry.seconds = seconds;
          }
        }
      }

      // A film too big to carry and with no still either has nothing left to show.
      if (entry.image || entry.video) files.push(entry);
    }

    const message = (post.message ?? "").trim();

    posts.push({
      id: post.id,
      message,
      tags: tagsOf(post, message),
      publishedAt: post.created_time,
      permalink: post.permalink_url ?? `https://www.facebook.com/${post.id}`,
      media: files,
      reactions: post.reactions?.summary?.total_count ?? 0,
      comments: post.comments?.summary?.total_count ?? 0,
      // Facebook omits `shares` at zero. Keeping that distinction rather than defaulting to 0
      // is what lets the card leave the entry out instead of printing a zero.
      shares: post.shares?.count ?? null,
    });
  }

  /* The swap, in the one order that survives being interrupted.
   *
   * New files first, then the snapshot that names them, and only then the sweep. Deleting
   * first would open a window where the previous snapshot still describes files that have just
   * been removed - and `src/data/facebook.ts` throws on exactly that, so the next build would
   * fail rather than quietly drop a picture. In this order the worst an interrupted run leaves
   * behind is a few orphaned files, which the next run sweeps up. */
  await mkdir(assetDir, { recursive: true });

  /** Every file the new snapshot names. Built with the empties filtered out rather than left
   *  in, because it is also the count printed at the end. */
  const keep = new Set(
    [
      ...posts.flatMap((post) => post.media.flatMap((item) => [item.image, item.video])),
      avatarFile,
    ].filter((file) => typeof file === "string"),
  );

  // 1. Everything the new snapshot will name is in place before anything names it.
  for (const file of await readdir(stagingDir)) {
    await rename(path.join(stagingDir, file), path.join(assetDir, file));
  }
  await rm(stagingDir, { recursive: true, force: true });

  // 2. The snapshot now describes files that exist.
  await writeFile(
    snapshotPath,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        page: { name: page.name ?? null, avatar: avatarFile },
        posts,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  // 3. Only now drop what nothing points at any more. Files belonging to posts that have
  //    scrolled out of the snapshot - or that were deleted on Facebook - go with them. Meta's
  //    platform terms ask for that, and without it the repository grows by a photograph a day
  //    forever.
  for (const existing of await readdir(assetDir)) {
    if (!keep.has(existing)) await rm(path.join(assetDir, existing), { force: true });
  }

  const films = posts.flatMap((post) => post.media).filter((item) => item.video).length;

  console.log(
    `fetch-facebook: ${posts.length} post(s) from "${page.name ?? pageId}", ` +
      `${keep.size} file(s) in src/assets/facebook/, ${films} of them films.`,
  );
}

await main();
