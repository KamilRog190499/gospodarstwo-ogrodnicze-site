/** Where a plant named on a planting lives in the offer.
 *
 *  The plantings on `/inspiracje/` name their plants, and a name that is not a link is the
 *  whole complaint about that page: someone who has just seen a basket they like has
 *  nowhere to go. The addresses are the anchors `PlantEntry.astro` already renders
 *  (`id={entry.id}`, which is the content collection's slug), so a link lands on the plant
 *  rather than at the top of a category page.
 *
 *  Kept apart from the plantings themselves so that 23 photographs referring to the same
 *  plant refer to one entry, and a moved page is one edit. `plantSlugs` is what
 *  `src/content.config.ts` validates each planting's `plants` list against, so a misspelt
 *  name breaks the build instead of printing a chip for a plant nobody grows.
 *
 *  ## Three states, not two
 *
 *  `href: null` used to mean one thing - "we sell this, but there is no entry to link to
 *  yet". The owners' September 2026 pass over the plantings named species that are in the
 *  frames without being on sale at all, so the file now says which is which:
 *
 *  - **linked** - the entry exists; the chip is a link.
 *  - **`href: null`** - we sell it, the description is still to be written (the list is in
 *    docs/inwentaryzacja.md). The chip prints the name without pretending to be a link.
 *  - **`companion: true`** - it grows in the planting and is *not* sold separately. The chip
 *    says "dodatek", because a name with no link and no explanation reads as an oversight.
 *
 *  `qualifier` is for the plants whose Polish name alone does not tell a reader what they
 *  are looking at - an ornamental grass, a foliage plant, a variety name. It is a property
 *  of the plant, not of one frame, which is why it lives here: the colours a given planting
 *  happens to show are said by that planting's own description.
 */

/** The keys, as a tuple, so the schema and the type cannot drift apart - the same trick
 *  `offer.ts` uses for `plantGroups`. */
export const plantSlugs = [
  "begonia",
  "bidens",
  "brachyscome",
  "calibrachoa",
  "gaura",
  "gozdzik",
  "hortensja",
  "koleus",
  "lizymacja",
  "niecierpek-nowogwinejski",
  "pelargonia-bluszczolistna",
  "pelargonia-rabatowa",
  "pennisetum",
  "petunia-surfinia",
  "plektrantus",
  "werbena",
  "wilczomlecz",
] as const;

export type PlantSlug = (typeof plantSlugs)[number];

export interface PlantLink {
  /** Plural, as a caption reads it: "Begonie", not "Begonia". */
  label: string;
  /** The entry's anchor. `null` where there is no entry to link to - see the note above for
   *  the two different reasons that happens. */
  href: string | null;
  /** What kind of plant this is, where the name alone will not tell a reader. Lower case:
   *  the chip prints it after the name, in the quieter ink. */
  qualifier?: string;
  /** Grows in the plantings but is not sold on its own. */
  companion?: true;
}

export const plantLinks: Record<PlantSlug, PlantLink> = {
  begonia: { label: "Begonie", href: "/kwiaty-balkonowe/#begonia" },
  calibrachoa: { label: "Calibrachoa", href: "/kwiaty-balkonowe/#calibrachoa" },
  gozdzik: { label: "Goździki", href: "/kwiaty-balkonowe/#gozdzik" },
  "niecierpek-nowogwinejski": {
    label: "Niecierpki nowogwinejskie",
    href: "/rabatowe/#niecierpek-nowogwinejski",
  },
  "pelargonia-bluszczolistna": {
    label: "Pelargonie bluszczolistne",
    href: "/kwiaty-balkonowe/#pelargonia-bluszczolistna",
  },
  "pelargonia-rabatowa": {
    label: "Pelargonie rabatowe",
    href: "/rabatowe/#pelargonia-rabatowa",
  },
  werbena: { label: "Werbena", href: "/kwiaty-balkonowe/#werbena" },

  /* Sold, no entry written yet. `kwiaty-balkonowe.astro` names surfinie in its `description`
     and the collection has nothing under it; the other six came in with the owners' pass
     over the plantings. All seven are on the list in docs/inwentaryzacja.md - the
     descriptions are theirs to write, not ours to invent. */
  bidens: { label: "Bidens", href: null },
  brachyscome: { label: "Brachyscome", href: null, qualifier: "stokrotka australijska" },
  hortensja: { label: "Hortensje", href: null },
  koleus: { label: "Koleus", href: null, qualifier: "liście ozdobne" },
  "petunia-surfinia": { label: "Petunie i surfinie", href: null },
  plektrantus: { label: "Plektrantus", href: null, qualifier: "liście ozdobne" },
  wilczomlecz: { label: "Wilczomlecz", href: null, qualifier: "Euphorbia ‘Shades in Pink’" },

  /* In the frames, not in the offer. */
  gaura: { label: "Gaura", href: null, companion: true },
  lizymacja: { label: "Lizymacja ‘Aurea’", href: null, companion: true },
  pennisetum: { label: "Pennisetum", href: null, qualifier: "trawa ozdobna", companion: true },
};
