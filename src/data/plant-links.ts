/** Where a plant named on a photograph lives in the offer.
 *
 *  The compositions on `/inspiracje/` name their plants, and a name that is not a link is
 *  the whole complaint about that page: someone who has just seen a basket they like has
 *  nowhere to go. The addresses are the anchors `PlantEntry.astro` already renders
 *  (`id={entry.id}`, which is the content collection's slug), so a link lands on the plant
 *  rather than at the top of a category page.
 *
 *  Kept apart from `gallery.ts` so that 23 photographs referring to the same plant refer to
 *  one entry, and a moved page is one edit.
 *
 *  `href: null` is deliberate and load-bearing: it means "we sell this, but there is no
 *  entry to link to yet". The panel then prints the name without a link instead of
 *  promising a page that does not exist.
 */

export type PlantSlug =
  "begonia" | "pelargonia-bluszczolistna" | "pelargonia-rabatowa" | "petunia-surfinia";

export interface PlantLink {
  /** Plural, as a caption reads it: "Begonie", not "Begonia". */
  label: string;
  href: string | null;
}

export const plantLinks: Record<PlantSlug, PlantLink> = {
  begonia: { label: "Begonie", href: "/kwiaty-balkonowe/#begonia" },
  "pelargonia-bluszczolistna": {
    label: "Pelargonie bluszczolistne",
    href: "/kwiaty-balkonowe/#pelargonia-bluszczolistna",
  },
  "pelargonia-rabatowa": {
    label: "Pelargonie rabatowe",
    href: "/rabatowe/#pelargonia-rabatowa",
  },
  /** No entry in `src/content/plants/` - `kwiaty-balkonowe.astro` names surfinie in its
   *  `description` and the collection has nothing under it. Three photographs name petunias,
   *  so the plant is real and the gap is ours. Add `src/content/plants/petunia.md` and set
   *  this to `/kwiaty-balkonowe/#petunia` (docs/inwentaryzacja.md). */
  "petunia-surfinia": { label: "Petunie i surfinie", href: null },
};
