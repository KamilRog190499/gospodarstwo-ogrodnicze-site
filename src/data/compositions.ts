/** The plantings: the vocabulary their content collection is validated against.
 *
 *  Same role `offer.ts` plays for the plant groups. `compositionKinds` is the `z.enum` in
 *  `src/content.config.ts` **and** the order of the filter buttons in `Compositions.astro`,
 *  so a new kind is one edit here and nothing else. It lived in `gallery.ts` until the
 *  plantings moved out of that file into `src/content/compositions/`; the values are
 *  unchanged, because they are published filter labels.
 */
import { getEntry } from "astro:content";

import type { GalleryPhoto } from "./gallery";

/** What was planted, not what is growing in it - the thing a visitor is choosing between.
 *
 *  Adding a season means adding a member (docs: the autumn shoot is still missing), and
 *  nothing else: the schema grows with it and the filter row grows with it. */
export const compositionKinds = [
  "Kosz wiszący",
  "Skrzynka",
  "Donica",
  "Rabata",
  "Ekspozycja",
] as const;

export type CompositionKind = (typeof compositionKinds)[number];

/** One planting's photograph, in the shape the rest of the site passes pictures around in.
 *
 *  One block outside `/inspiracje/` shows a frame that is also a planting: the spring season
 *  card. It used to reach for it by **array position** (`gallery[17]`), so reordering a
 *  single photograph would have quietly changed it. It asks by name now, and a name that
 *  does not resolve throws at build time rather than rendering the wrong picture.
 *
 *  There were two. The history block on `/o-nas/` borrowed `zielono-biala-kaskada-plektrantusa`
 *  until September 2026 and now has a photograph of its own (`historyPhoto` in
 *  src/data/gallery.ts) - a page about the holding should not be showing a picture that also
 *  carries another page. */
export async function compositionPhoto(id: string): Promise<GalleryPhoto> {
  const entry = await getEntry("compositions", id);
  if (!entry) {
    throw new Error(
      `Missing src/content/compositions/${id}.md - a block outside /inspiracje/ asks for this planting's photograph by name.`,
    );
  }
  return { src: entry.data.image, alt: entry.data.imageAlt };
}
