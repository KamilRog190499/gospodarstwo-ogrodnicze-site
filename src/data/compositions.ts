/** The plantings: the vocabulary their content collection is validated against.
 *
 *  Same role `offer.ts` plays for the plant groups. `compositionKinds` is the `z.enum` in
 *  `src/content.config.ts` **and** the order of the filter buttons in `Compositions.astro`,
 *  so a new kind is one edit here and nothing else - and so is dropping one: the schema then
 *  fails the build on every `.md` still carrying the old value, by name. That is the safety
 *  net, not an obstacle. It lived in `gallery.ts` until the plantings moved out of that file
 *  into `src/content/compositions/`.
 *
 *  These are **published filter labels**, so changing one is client-visible. The full 5 -> 3
 *  table is in `docs/inwentaryzacja.md` under "Trzy rodzaje obsadzeń zamiast pięciu".
 */
import { getEntry } from "astro:content";

import type { GalleryPhoto } from "./gallery";

/** What a visitor is planting up - which is the question the filter asks ("Co obsadzasz").
 *
 *  Three, since September 2026; there were five, one per container. Twenty-three plantings
 *  over five buttons is under five frames each, and the split was finer than the decision it
 *  was helping anyone make - a hanging basket and a railing box take the same trailing plants
 *  and are one answer, not two. Hangs, stands, grows in the ground: that is the whole axis,
 *  and the order below is it.
 *
 *  **"Ekspozycja" did not survive, and dropping it fixed an error rather than shortening a
 *  list.** It named the circumstance of the photograph - a stand, a row under the tunnel -
 *  which is not something anybody plants up, so it was the one button that answered a
 *  different question from the label above it. All four of its frames say in their own `alt`
 *  what they actually are: three are rows of pots and went to `Donica`, and the fourth is
 *  "koszy i obsadzonych skrzynek" and went to `Kosz i skrzynka`. The word stays in those
 *  plantings' titles and prose, where it is the owners' own description of a picture.
 *
 *  Adding a kind (docs: the autumn shoot is still missing) is still one member here and
 *  nothing else: the schema grows with it and the filter row grows with it. */
export const compositionKinds = ["Kosz i skrzynka", "Donica", "Rabata"] as const;

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
