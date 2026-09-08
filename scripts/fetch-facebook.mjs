// @ts-check
/** Refreshes the Facebook snapshot the home page builds from.
 *
 *  Run by `.github/workflows/facebook-feed.yml` on the self-hosted runner, once a day. It
 *  writes two things and nothing else:
 *
 *    src/data/facebook-posts.json   the posts, as data
 *    src/assets/facebook/<id>.jpg   the photographs, as files
 *
 *  Both are committed to the repository. That is the whole design, and the reasons are worth
 *  keeping because each one is a way this could have been built and should not be:
 *
 *  - **The photographs are downloaded, never linked.** A `full_picture` URL from Facebook is
 *    signed and expires within days; a snapshot holding those URLs goes to broken images while
 *    still looking fresh. Worse, an `<img>` pointing at `fbcdn.net` hands the visitor's IP
 *    address to Meta on every page view, which is exactly what `src/scripts/consent.ts` exists
 *    to prevent for the one other third party on this site. Local files mean the block needs
 *    no consent gate at all.
 *  - **The snapshot lives in git, not on the web server.** Astro runs images through sharp at
 *    build time, so a file arriving after the deploy never gets optimised. Committing the
 *    snapshot puts the refresh through the normal build, and gives the feed a free property:
 *    a token that has stopped working means "the feed did not refresh", not "the page is
 *    empty".
 *  - **Nothing is written until every download has succeeded.** The network work happens
 *    first, entirely in memory; disk is touched only once there is a complete new snapshot to
 *    write. A half-finished run leaves the previous one exactly as it was.
 *
 *  Environment: `FB_PAGE_ID` and `FB_ACCESS_TOKEN` (a long-lived Page Access Token; see
 *  docs/facebook.md for how it is issued and what to do when it stops working).
 */

import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

/** Pinned rather than floating: an unpinned Graph version changes response shapes on Meta's
 *  schedule instead of ours. Bumping it is a deliberate edit with a test run after it. */
const GRAPH_VERSION = "v21.0";

/** How many posts the snapshot keeps. The home page block shows three, and the snapshot holds
 *  exactly what is shown - an unused fourth post is a photograph committed to the repository
 *  that nobody ever sees. */
const KEEP = 3;

/** How many to ask Facebook for. More than we keep, because posts with neither text nor a
 *  photograph are dropped below and a page can publish a run of them. */
const REQUEST = 15;

/** The rest of the site downscales to 2000px (CLAUDE.md); a Facebook original is usually well
 *  under that already, so this is a ceiling rather than a routine resize. */
const MAX_WIDTH = 2000;

const root = fileURLToPath(new URL("..", import.meta.url));
const assetDir = path.join(root, "src", "assets", "facebook");
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

/** A post id is `<pageId>_<postId>` - digits and one underscore. Sanitised anyway: the id
 *  becomes a filename, and a value from a remote API is never trusted with a path.
 *
 *  @param {string} id
 */
function assetName(id) {
  return `${id.replace(/[^A-Za-z0-9_]/g, "")}.jpg`;
}

/** One post as the Graph API returns it. Only `id` is guaranteed - a post can have no words,
 *  no photograph, and (on a shared post) no permalink of its own.
 *
 *  @typedef {{
 *    id: string,
 *    created_time?: string,
 *    message?: string,
 *    permalink_url?: string,
 *    full_picture?: string,
 *  }} GraphPost
 */

/** @param {string} pageId @param {string} token @returns {Promise<GraphPost[]>} */
async function fetchPosts(pageId, token) {
  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/posts`);
  url.searchParams.set("fields", "id,created_time,message,permalink_url,full_picture");
  url.searchParams.set("limit", String(REQUEST));
  url.searchParams.set("access_token", token);

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(`could not reach the Graph API: ${error instanceof Error ? error.message : error}`);
  }

  const body = await response.json().catch(() => null);

  if (body?.error) {
    const { code, type, message } = body.error;
    // Told apart on purpose. An expired or revoked token is the one failure that needs a
    // person to do something, and it must not read like a network hiccup in the run log.
    if (code === 190 || type === "OAuthException") {
      fail(
        `the Page Access Token is no longer valid (${type} ${code}: ${message}). ` +
          "It has to be reissued - see docs/facebook.md. Nothing was changed.",
      );
    }
    fail(`the Graph API refused the request (${type} ${code}: ${message})`);
  }

  if (!response.ok) fail(`the Graph API answered ${response.status} ${response.statusText}`);
  if (!Array.isArray(body?.data)) fail("the Graph API answered with no `data` array");

  return body.data;
}

/** Downloads and re-encodes one photograph. `.rotate()` with no argument bakes in the EXIF
 *  orientation - a project rule, because `<Picture>` does not honour that flag and most of the
 *  photographs on this site arrived as portrait frames marked sideways.
 *
 *  @param {string} url
 */
async function fetchPhoto(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const input = Buffer.from(await response.arrayBuffer());
  return sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 86 })
    .toBuffer();
}

async function main() {
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_ACCESS_TOKEN;
  if (!pageId || !token) fail("FB_PAGE_ID and FB_ACCESS_TOKEN must both be set");

  const raw = await fetchPosts(pageId, token);

  // A post with neither words nor a picture has nothing to put on a page, and one without a
  // date or a permalink cannot be rendered as a dated, linked entry. Beyond that there is no
  // filter: what the owners publish is what the site shows (docs/inwentaryzacja.md).
  const chosen = raw
    .filter(
      (post) =>
        post?.id &&
        post.created_time &&
        post.permalink_url &&
        (post.message?.trim() || post.full_picture),
    )
    .slice(0, KEEP);

  // Every download finishes before anything is written. See the header.
  /** @type {Map<string, Buffer>} */
  const photos = new Map();
  for (const post of chosen) {
    if (!post.full_picture) continue;
    try {
      photos.set(post.id, await fetchPhoto(post.full_picture));
    } catch (error) {
      fail(
        `could not download the photograph for post ${post.id}: ` +
          `${error instanceof Error ? error.message : error}`,
      );
    }
  }

  // The shape here is the contract `src/data/facebook.ts` types; the two change together.
  const snapshot = chosen.map((post) => ({
    id: post.id,
    createdAt: post.created_time ?? "",
    text: post.message?.trim() ?? "",
    permalink: post.permalink_url ?? "",
    image: photos.has(post.id) ? assetName(post.id) : null,
  }));

  await mkdir(assetDir, { recursive: true });
  for (const [id, buffer] of photos) {
    await writeFile(path.join(assetDir, assetName(id)), buffer);
  }

  // Photographs belonging to posts that have scrolled out of the snapshot - or that were
  // deleted on Facebook - go with them. Meta's platform terms ask for that, and without it
  // the repository grows by a photograph a day forever.
  const keep = new Set(snapshot.map((post) => post.image));
  for (const file of await readdir(assetDir)) {
    if (file.endsWith(".jpg") && !keep.has(file)) await unlink(path.join(assetDir, file));
  }

  await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

  console.log(`fetch-facebook: ${snapshot.length} post(s), ${photos.size} photograph(s) written.`);
}

await main();
