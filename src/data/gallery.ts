/** The photographs the design asks for by name.
 *
 *  Every frame here is pinned to one place on the site - the band at the top of the home
 *  page, a season card, the strip under a category list - so a photograph is chosen in one
 *  place rather than in the component that happens to show it.
 *
 *  `alt` is not optional: a photograph without a description is what the old site shipped,
 *  every one of its images with an empty `alt`.
 *
 *  ## What used to be here
 *
 *  This file also held `gallery`, the 23-frame presentation shoot, with a `composition`
 *  field on each entry carrying the planting's name and its plants. Those moved to the
 *  `compositions` content collection (`src/content/compositions/`) when the owners' pass
 *  over the plantings gave each one a paragraph of description and a paragraph of advice -
 *  two thousand words of Polish prose that belong in Markdown, not in a TypeScript file.
 *  `src/data/compositions.ts` holds what is left: the kinds, and the by-name lookup the two
 *  blocks outside `/inspiracje/` use to reach a planting's photograph.
 */
import type { ImageMetadata } from "astro";

import chrysanthemums from "../assets/chrysanthemums/cultivation-rows.jpg";
import offer01 from "../assets/chrysanthemums/offer-01.jpg";
import offer02 from "../assets/chrysanthemums/offer-02.jpg";
import offer03 from "../assets/chrysanthemums/offer-03.jpg";
import offer04 from "../assets/chrysanthemums/offer-04.jpg";
import pansy01 from "../assets/pansies/offer-01.jpg";
import pansy02 from "../assets/pansies/offer-02.jpg";
import pansy03 from "../assets/pansies/offer-03.jpg";
import pansy04 from "../assets/pansies/offer-04.jpg";
import pansyCrate from "../assets/pansies/crate-yellow.jpg";
import heroGlasshouse from "../assets/hero/hero-glasshouse.jpg";

export interface GalleryPhoto {
  src: ImageMetadata;
  alt: string;
}

/** The full-bleed band at the top of the home page.
 *
 *  Was the shoot's one landscape frame (`gallery-19`) through 0.7. Replaced in September 2026
 *  on explicit instruction, with a generated image, not a photograph of the holding - flagged
 *  to the requester as a conflict with the rest of this file's premise (`chrysanthemumStrip`,
 *  `pansyStrip`: real frames of the actual plantings, stock imagery deliberately not reused)
 *  and confirmed anyway. Deliberately **not** swapped in over the real photograph, which is
 *  still what `/inspiracje/` shows as `pelargonie-w-pelnym-kolorze` - only the band changed.
 *
 *  Still a landscape frame (1448x1086, 4:3 - same ratio the old choice was made on) because
 *  the band's crop rule still holds; widths and the `width`/`height` hint on `<Picture>` in
 *  `Intro.astro` were brought down to match this file's real ceiling instead of the old 2000px
 *  one. The scrim contrast note in `Intro.astro` was measured against the old photograph's
 *  brightest pixel and **has not been re-verified against this one** - re-check before treating
 *  the eyebrow's legibility as settled. */
export const heroPhoto: GalleryPhoto = {
  src: heroGlasshouse,
  alt: "Bujna kompozycja czerwonych, różowych i białych pelargonii w donicach i koszach wiszących",
};

/** The autumn card's frame: "galeria - chryzantemy przed 1 listopada, 16:9".
 *
 *  Deliberately not one of the plantings: those are the spring presentation, and a single
 *  autumn frame in the middle of them would read as a mistake rather than as a season.
 *
 *  It is also why `/inspiracje/` is a spring page for the whole year - the complaint the
 *  redesign notes raise as point 7. The fix is an autumn shoot of *plantings*, which does
 *  not exist yet; this frame is a row of pots for sale and is not one. */
export const chrysanthemumPhoto: GalleryPhoto = {
  src: chrysanthemums,
  alt: "Rzędy żółtych chryzantem wielkokwiatowych w doniczkach, w tle odmiany pomarańczowe",
};

/** The early-spring card's frame: a crate of pansies, seen from above.
 *
 *  The sixth photograph of the pansy batch, and the one left out of `pansyStrip` because in
 *  a row of four it only repeated `offer-02`'s yellow. Alone on a card it is the opposite -
 *  it is the frame that reads as March at a glance, and it keeps the card from borrowing the
 *  balcony tunnel that belongs to the card after it.
 *
 *  1080x1920 and committed byte-for-byte, like three of the four in the strip: under the
 *  2000px ceiling, so a resize would be a no-op. The card box is 16:9, so `cover` keeps
 *  roughly the middle third of the height - the crop stays a mass of pansies either way,
 *  which is why the `alt` names no row or edge.
 *
 *  **The alt text is read off the picture, not confirmed by the owners** (docs/inwentaryzacja.md). */
export const pansyPhoto: GalleryPhoto = {
  src: pansyCrate,
  alt: "Skrzynka żółtych bratków z ciemnobordową plamką, widziana z góry",
};

/** The strip under the plant list on `/chryzantemy/`: the whole autumn offer in one row.
 *
 *  These are mixed plantings - many colours and all three types in one frame - so unlike the
 *  three entry photographs they are **not** attributed to a type, and the `alt` texts name
 *  colours rather than a form. Order here is the order on the page.
 *
 *  They arrived already downscaled by Facebook to 736x1000, under the 2000px the rest of the
 *  repo holds to, so they are committed byte-for-byte: the resize step would be a no-op and
 *  re-encoding would only cost quality. That ceiling is why `PhotoStrip` asks for 720px at
 *  most - the originals off a phone would be worth having. */
export const chrysanthemumStrip: GalleryPhoto[] = [
  {
    src: offer01,
    alt: "Rzędy kulistych chryzantem w tunelu - amarantowe, biało-żółte i czerwone, w tle żółte",
  },
  {
    src: offer02,
    alt: "Kuliste chryzantemy w tunelu foliowym - czerwone, różowe, białe, żółte i pomarańczowe",
  },
  {
    src: offer03,
    alt: "Doniczki z chryzantemami ustawione w dwóch rzędach przy drodze, w kilkunastu kolorach",
  },
  {
    src: offer04,
    alt: "Ekspozycja chryzantem - żółte, amarantowe i liliowe obok białych o wąskich płatkach",
  },
];

/** The strip under the plant list on `/bratki/`: what a March crate actually looks like.
 *
 *  Same reasoning as `chrysanthemumStrip` and the same deliberate restraint: the entry's own
 *  photograph shows the flower, this row shows the offer. The frames are crates rather than
 *  single-variety portraits, so nothing here is attributed to a variety and the `alt` texts
 *  name colours instead. Order here is the order on the page.
 *
 *  Also kept out of the plantings for the reason `chrysanthemumPhoto` is: the slideshow is the
 *  spring presentation of finished baskets and boxes, and a sales crate in the middle of it
 *  would read as a mistake.
 *
 *  These arrived without EXIF and already upright, unlike the gallery batch - no rotation had
 *  to be baked in. Three of the four are 1080x1920 and are committed byte-for-byte: they are
 *  under the 2000px ceiling, so a resize would be a no-op and re-encoding would only cost
 *  quality. `offer-01` came in at 1484x2048 and was scaled to 2000px like everything else.
 *
 *  **The alt texts are read off the pictures, not confirmed by the owners** (docs/inwentaryzacja.md). */
export const pansyStrip: GalleryPhoto[] = [
  {
    src: pansy01,
    alt: "Dziewięć skrzynek z bratkami ustawionych obok siebie - żółte, białe, fioletowe, liliowe i różowe",
  },
  { src: pansy02, alt: "Skrzynka jednolicie żółtych bratków bez ciemnej plamki, widziana z góry" },
  { src: pansy03, alt: "Białe i kremowe bratki z ciemnofioletową plamką pośrodku kwiatu" },
  { src: pansy04, alt: "Fioletowe bratki z białym obrzeżem płatków i żółtym oczkiem" },
];
