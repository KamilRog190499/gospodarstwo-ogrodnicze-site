/** The Facebook snapshot, as typed data for `FacebookNews.astro`.
 *
 *  `facebook-posts.json` and the files in `src/assets/facebook/` are **generated** by
 *  `scripts/fetch-facebook.mjs` and committed; nobody edits them by hand. This module is the
 *  only thing that reads them, and it exists to do two jobs the JSON cannot: give the posts a
 *  type, and turn a file name into an `ImageMetadata` that Astro will optimise.
 *
 *  ## Why this is the one registry in `src/data/` without explicit imports
 *
 *  `gallery.ts` lists its photographs as one `import` statement each, deliberately - one
 *  photograph chosen in one place, and a missing file breaks the build with the name of the
 *  file in the message. That is not available here: the file names are post ids that do not
 *  exist until the workflow runs, and change every time it does. `import.meta.glob` is the
 *  only way to hand Vite a set of images whose names are unknown when the code is written. It
 *  is not a shortcut taken to save typing.
 *
 *  A snapshot naming an image file that is not on disk is a bug in the refresh, not a
 *  condition to render around, so it throws and the build stops. The empty snapshot - `[]`,
 *  which is what ships until the first successful refresh - is not an error and renders
 *  nothing.
 */
import type { ImageMetadata } from "astro";

import snapshot from "./facebook-posts.json";

/** The snapshot file's shape - the contract `scripts/fetch-facebook.mjs` writes. */
interface SnapshotPost {
  id: string;
  createdAt: string;
  text: string;
  permalink: string;
  image: string | null;
}

export interface FacebookPost extends Omit<SnapshotPost, "image"> {
  /** Graph API post id, `<pageId>_<postId>`. Also the photograph's file name. */
  id: string;
  /** ISO 8601, straight from `created_time`. */
  createdAt: string;
  /** The owners' own words, unedited. Empty when the post was only a photograph. */
  text: string;
  /** `permalink_url` - where "Zobacz na Facebooku" goes. */
  permalink: string;
  image: ImageMetadata | null;
}

/** The cast is not laziness, and removing it breaks the build on a Tuesday. TypeScript infers
 *  a JSON import from the file's *current contents*: with `[]` the array is `never[]`, and on
 *  a day when all three posts happen to carry a photograph `image` infers as `string`, which
 *  makes `image === null` below "a comparison with no overlap" - a type error caused by
 *  nothing but that day's data. The file is generated, so its type belongs to the generator. */
const posts = snapshot as unknown as SnapshotPost[];

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/facebook/*.jpg", {
  eager: true,
});

/** Keyed by bare file name; the glob keys are paths relative to this module. */
const images = new Map(
  Object.entries(files).map(([filePath, module]) => [
    filePath.slice(filePath.lastIndexOf("/") + 1),
    module.default,
  ]),
);

export const facebookPosts: FacebookPost[] = posts.map((post) => {
  const image = post.image === null ? null : (images.get(post.image) ?? null);

  if (post.image !== null && image === null) {
    throw new Error(
      `facebook.ts: the snapshot names src/assets/facebook/${post.image}, which is not there. ` +
        "Re-run `npm run fetch:facebook` rather than editing the snapshot by hand.",
    );
  }

  return { ...post, image };
});
