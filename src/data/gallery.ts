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
 *  `src/data/compositions.ts` holds what is left: the kinds, and the by-name lookup the one
 *  block outside `/inspiracje/` still uses to reach a planting's photograph - the spring
 *  season card. The history block was the other one until it got `historyPhoto` below.
 *
 *  `historyPhoto` is also the one frame here that carries a **caption** on the page rather
 *  than only an `alt`; `History.astro` says why that is not a reversal of the September 2026
 *  decision to strip captions from the plant entries.
 */
import type { ImageMetadata } from "astro";

import { getCollection } from "astro:content";

import { offer, type PlantGroup } from "./offer";

import chrysanthemums from "../assets/chrysanthemums/cultivation-rows.jpg";
import offer01 from "../assets/chrysanthemums/offer-01.jpg";
import offer02 from "../assets/chrysanthemums/offer-02.jpg";
import offer03 from "../assets/chrysanthemums/offer-03.jpg";
import offer04 from "../assets/chrysanthemums/offer-04.jpg";
import chrysRows01 from "../assets/chrysanthemums/rows-01.jpg";
import chrysRows02 from "../assets/chrysanthemums/rows-02.jpg";
import chrysRows03 from "../assets/chrysanthemums/rows-03.jpg";
import chrysRows04 from "../assets/chrysanthemums/rows-04.jpg";
import chrysRows05 from "../assets/chrysanthemums/rows-05.jpg";
import chrysRows06 from "../assets/chrysanthemums/rows-06.jpg";
import chrysRows07 from "../assets/chrysanthemums/rows-07.jpg";
import chrysRows08 from "../assets/chrysanthemums/rows-08.jpg";
import chrysRows09 from "../assets/chrysanthemums/rows-09.jpg";
import chrysRows10 from "../assets/chrysanthemums/rows-10.jpg";
import chrysRows11 from "../assets/chrysanthemums/rows-11.jpg";
import chrysRows12 from "../assets/chrysanthemums/rows-12.jpg";
import chrysPot01 from "../assets/chrysanthemums/pots-01.jpg";
import chrysPot02 from "../assets/chrysanthemums/pots-02.jpg";
import chrysPot03 from "../assets/chrysanthemums/pots-03.jpg";
import chrysPot04 from "../assets/chrysanthemums/pots-04.jpg";
import pansy01 from "../assets/pansies/offer-01.jpg";
import pansy02 from "../assets/pansies/offer-02.jpg";
import pansy03 from "../assets/pansies/offer-03.jpg";
import pansy04 from "../assets/pansies/offer-04.jpg";
import pansy05 from "../assets/pansies/offer-05.jpg";
import pansy06 from "../assets/pansies/offer-06.jpg";
import pansy07 from "../assets/pansies/offer-07.jpg";
import balconyRows01 from "../assets/balcony/rows-01.jpg";
import balconyRows02 from "../assets/balcony/rows-02.jpg";
import balconyRows03 from "../assets/balcony/rows-03.jpg";
import balconyRows04 from "../assets/balcony/rows-04.jpg";
import balconyRows05 from "../assets/balcony/rows-05.jpg";
import balconyRows06 from "../assets/balcony/rows-06.jpg";
import balconyBasket01 from "../assets/balcony/baskets-01.jpg";
import balconyBasket02 from "../assets/balcony/baskets-02.jpg";
import balconyBasket03 from "../assets/balcony/baskets-03.jpg";
import balconyBasket04 from "../assets/balcony/baskets-04.jpg";
import balconyBasket05 from "../assets/balcony/baskets-05.jpg";
import balconyBasket06 from "../assets/balcony/baskets-06.jpg";
import balconyBasket07 from "../assets/balcony/baskets-07.jpg";
import balconyBasket08 from "../assets/balcony/baskets-08.jpg";
import balconyBasket09 from "../assets/balcony/baskets-09.jpg";
import balconyBasket10 from "../assets/balcony/baskets-10.jpg";
import balconyBasket11 from "../assets/balcony/baskets-11.jpg";
import balconyBasket12 from "../assets/balcony/baskets-12.jpg";
import balconyBasket13 from "../assets/balcony/baskets-13.jpg";
import balconyBasket14 from "../assets/balcony/baskets-14.jpg";
import balconyPot01 from "../assets/balcony/pots-01.jpg";
import balconyPot02 from "../assets/balcony/pots-02.jpg";
import balconyPlanter01 from "../assets/balcony/planters-01.jpg";
import balconyPlanter02 from "../assets/balcony/planters-02.jpg";
import pansyCrate from "../assets/pansies/crate-yellow.jpg";
import heroGlasshouse from "../assets/hero/hero-glasshouse.jpg";
import konskowolaStand from "../assets/farm/konskowola-stand.jpg";

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

/** The history block on `/o-nas/`: the holding's stand at the flower show in Konskowola.
 *
 *  **The first frame in this repository of the holding trading** rather than of a plant or a
 *  planting. Until September 2026 that block borrowed `gallery-17` through
 *  `compositionPhoto()`, a planting that is also on `/inspiracje/`; a photograph doing duty on
 *  two pages is a weaker answer than one that belongs to this page alone, and the borrow is
 *  gone with it. It illustrates a sentence the owners' own text already carries: "Sprzedaz
 *  kwiatow odbywa sie na terenie gospodarstwa oraz na targowiskach."
 *
 *  **This is not the holding's own tunnel, and the first version of this note said it was.**
 *  The owners corrected it when they gave the caption. The venue is a hall with numbered
 *  stalls - 51, 52, 53 and 59 are painted on the wall behind the racks - not Cholewianka. The
 *  banner in the frame is the holding's own and travels with them.
 *
 *  It does **not** close the open item. The design brief asks for an *archival* photograph
 *  there and this one is contemporary, so the request stays on the list in
 *  docs/inwentaryzacja.md - it is simply no longer urgent, because the frame now holds
 *  something true of the page.
 *
 *  1920x1080 and committed byte-for-byte, like three of the four in `pansyStrip`: under the
 *  2000px ceiling, so a resize would be a no-op and re-encoding would only cost quality. It
 *  also arrived without EXIF and already upright, so there was no rotation to bake in.
 *
 *  `History.astro` draws it at 3 / 2, so `cover` takes 150px off either side. Checked rather
 *  than assumed: the banner stays whole and roughly centred, which is why the `alt` names it.
 *
 *  The `alt` names **colours and not species**, the same restraint `chrysanthemumStrip` and
 *  `pansyStrip` keep and for the same reason: this is a mixed stand, not a portrait, and
 *  reading a species off a photograph is the one guess this repository does not make on a
 *  grower's own site. The red pelargoniums in front are plain enough; the cascades behind
 *  them are not, and calibrachoa has already been mistaken for a trailing petunia here once.
 *
 *  It also does not name Konskowola: **the `<figcaption>` in `History.astro` does that**, and
 *  an `alt` repeating its caption is what that component had to fix once already
 *  (`Compositions.astro`, on the slideshow). The picture describes itself, the caption says
 *  where it was taken.
 *
 *  Everything the banner says agrees with `contact.ts` - Cholewianka 36, Kazimierz Dolny, and
 *  722 238 987, which is Mateusz's current number and not one of the two withdrawn in
 *  September 2026. Nobody is in the frame (the two chairs are empty), so the likeness
 *  paragraph that docs/inwentaryzacja.md makes conditional on people appearing here does not
 *  come back into the privacy policy.
 *
 *  **The alt text is read off the picture, not confirmed by the owners** (docs/inwentaryzacja.md). */
export const historyPhoto: GalleryPhoto = {
  src: konskowolaStand,
  alt: "Stoisko gospodarstwa pod dachem hali - regały i skrzynki pełne kwiatów balkonowych w czerwieni, różu, żółci i bieli, pośrodku tablica z nazwą gospodarstwa",
};

/** The strip under the plant list on `/chryzantemy/`: the autumn offer, and since September
 *  2026 its colours.
 *
 *  None of these is attributed to a type and the `alt` texts name colours rather than a form.
 *  The count of types deliberately is not given: this said "all three types" while the group
 *  had three entries, and the fourth (drobnokwiatowa) would have turned a stale number into a
 *  claim about photographs nobody has re-read. Reading a type off a frame is the guess this
 *  repository does not make - see the open item in docs/inwentaryzacja.md.
 *
 *  **The strip does three jobs now and the order says which is which.** `offer-01..04` come
 *  first: mixed frames, many colours at once, "this is what the season looks like".
 *  `rows-01..11` follow, one solid block of colour each, running white -> cream -> copper ->
 *  yellow -> pink. That sequence is the closest thing the site has to an answer for the
 *  open item on colour lists: the chips say four colours, and this row shows that the crop
 *  holds pink, copper and deep orange besides. It is a picture, not a list, so it corrects
 *  nothing by itself - but nobody reading the page can now come away thinking four.
 *  `pots-01..04` close it: a single finished pot from the front, which is what a customer
 *  carries away rather than what is standing in the tunnel.
 *
 *  **Those four spent one iteration in a strip of their own**, labelled "Gotowe doniczki",
 *  on the argument that the crop and the product answer different questions and that merging
 *  them reads as one long undifferentiated wall of chrysanthemums. The owner saw it and had
 *  the second strip removed; the four frames moved here, at the end, and `OfferSection` went
 *  back to taking one row of photographs rather than a list of labelled rows. The argument is
 *  kept rather than deleted, because it is the one to reach for if this row ever does start
 *  reading as a wall - the answer then is a second strip, not a shorter first one.
 *
 *  All four are small-flowered mounds from the same album as
 *  `plants/chryzantema-drobnokwiatowa.jpg`, and none of them says so: reading a type off a
 *  photograph is the guess this repository does not make on a grower's own site.
 *
 *  Two source generations, and they do not match. `offer-01..04` arrived already downscaled
 *  by Facebook to 736x1000 and are committed byte-for-byte, because a resize would be a no-op
 *  and re-encoding would only cost quality. `rows-01..11` came off the holding's Facebook page
 *  at 1536-1946 x 2048 and were scaled to the 2000px ceiling like everything else, so they are
 *  visibly sharper than the four above them; `pots-01..04` came the same way and are 1500x2000.
 *  Nine of the eleven rows are 3:4; `rows-01`, `rows-02`, `rows-05` and `rows-08` are not, and
 *  `PhotoStrip`'s fixed 3:4 frame crops them - `rows-08` at 1900x2000 loses the most. The
 *  lightbox is what makes that acceptable: the whole frame is one click away.
 *
 *  **The alt texts are read off the pictures, not confirmed by the owners** (docs/inwentaryzacja.md). */
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
  {
    src: chrysRows01,
    alt: "Rzędy białych chryzantem o kulistych, gęsto ułożonych płatkach i żółtych środkach",
  },
  {
    src: chrysRows02,
    alt: "Białe kuliste chryzantemy ciasnym rzędem, od pierwszego planu w głąb tunelu",
  },
  {
    src: chrysRows03,
    alt: "Białe chryzantemy o długich, wąskich i rurkowatych płatkach, rzędy doniczek w tunelu",
  },
  { src: chrysRows04, alt: "Kremowobiałe chryzantemy z żółtym środkiem, rzędy doniczek w uprawie" },
  {
    src: chrysRows05,
    alt: "Kremowożółte kuliste chryzantemy z jaśniejszymi brzegami płatków, rzędy w tunelu",
  },
  {
    src: chrysRows06,
    alt: "Dwubarwne chryzantemy - kremowe płatki z rdzawomiedzianym spodem, rzędy doniczek",
  },
  {
    src: chrysRows07,
    alt: "Żółte chryzantemy o wąskich, szpiczastych płatkach, w kilku odcieniach żółci",
  },
  { src: chrysRows08, alt: "Gęsty rząd żółtych chryzantem o kulistych kwiatach, widziany z góry" },
  {
    src: chrysRows09,
    alt: "Nasycone żółtopomarańczowe chryzantemy o dużych kulistych kwiatach, rzędy w tunelu",
  },
  {
    src: chrysRows10,
    alt: "Duże kuliste chryzantemy w intensywnej żółci, pierwszy plan ostry, rzędy w głębi",
  },
  {
    src: chrysRows11,
    alt: "Różowe chryzantemy o kulistych, gęsto ułożonych płatkach, długie rzędy w tunelu",
  },
  /* Was `chryzantema-igielkowa.jpg`, the photograph of its own entry, until the owners folded
     the needle-petalled type into `chryzantema-sredniokwiatowa` in September 2026 and that entry
     was deleted. The frame stayed and moved here, which is what this strip is for - frames that
     belong to no single entry - and it is the same move the four `pots` frames made when the
     second strip was removed. The alt is the entry's own, unchanged: it describes the petals in
     the picture and claims nothing about which size class they belong to, which is exactly the
     question the merge settled elsewhere. */
  {
    src: chrysRows12,
    alt: "Różowo-białe chryzantemy o długich, wąskich i rurkowatych płatkach z podwiniętymi końcami, rzędy w uprawie",
  },
  {
    src: chrysPot01,
    alt: "Doniczka białych chryzantem o drobnych kwiatach, zwarta kulista kępa, w tle żółte i amarantowe",
  },
  {
    src: chrysPot02,
    alt: "Doniczka żółtych chryzantem o drobnych kwiatach na ciemnym tle, w głębi kolejne żółte",
  },
  {
    src: chrysPot03,
    alt: "Biała kępa drobnych chryzantem w doniczce, w tle rzędy żółtych i białych",
  },
  {
    src: chrysPot04,
    alt: "Doniczka amarantowych chryzantem o drobnych kwiatach z jaśniejszym środkiem, w tle żółte i białe",
  },
];

/** The strip under the plant list on `/bratki/`: what a March crate actually looks like.
 *
 *  Same reasoning as `chrysanthemumStrip` and the same deliberate restraint: the entries' own
 *  photographs show the flower, this row shows the offer. The frames are crates rather than
 *  single-variety portraits, so nothing here is attributed to a variety and the `alt` texts
 *  name colours instead. Order here is the order on the page, and it follows the order of the
 *  entries above it: pansies first, then the primrose crate, because `/bratki/` has held two
 *  entries since September 2026 rather than one.
 *
 *  Also kept out of the plantings for the reason `chrysanthemumPhoto` is: the slideshow is the
 *  spring presentation of finished baskets and boxes, and a sales crate in the middle of it
 *  would read as a mistake.
 *
 *  These arrived without EXIF and already upright, unlike the gallery batch - no rotation had
 *  to be baked in. Three of the first four are 1080x1920 and are committed byte-for-byte: they
 *  are under the 2000px ceiling, so a resize would be a no-op and re-encoding would only cost
 *  quality. `offer-01` came in at 1484x2048 and `offer-05..07` off the holding's Facebook page
 *  at 1389-1508 x 2048; all four were scaled to 2000px like everything else.
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
  {
    src: pansy05,
    alt: "Skrzynka bratków w odcieniach różu, karminu i bordo, każdy kwiat z ciemną plamką",
  },
  {
    src: pansy06,
    alt: "Skrzynka ciemnobordowych bratków o aksamitnych płatkach, wśród jasnozielonych liści",
  },
  {
    src: pansy07,
    alt: "Skrzynka prymulek - białe, żółte, czerwone, różowe i fioletowe nad rozetami pomarszczonych liści",
  },
];

/** The strip under the plant list on `/kwiaty-balkonowe/`: the balcony offer as it stands in
 *  the tunnel.
 *
 *  **This is the page that had no strip**, and until September 2026 the reason was material
 *  rather than code: the 23 frames in `src/assets/gallery/` are plantings shown on
 *  `/inspiracje/`, and eighteen of the group's own entry photographs were borrowed from
 *  Wikimedia Commons. Neither is an answer to "what does the balcony offer look like". A batch
 *  of 45 frames off the holding's own Facebook albums closed it; 24 of them are here.
 *
 *  **Three jobs, and the order says which is which** - the shape `chrysanthemumStrip` already
 *  uses. `rows-01..06` come first: the crop as it stands, trays and masses of one colour,
 *  pelargoniums then begonias then petunias. `baskets-01..14` follow, one finished hanging
 *  basket each - what a customer carries away rather than what is standing in the tunnel -
 *  running fuchsias, petunias, begonias. `pots-01..02` are the two hydrangeas, pot plants
 *  rather than baskets and the one thing in this group sold as a shrub.
 *
 *  **`planters-01..02` are the odd pair and are last on purpose: they are the only frames in
 *  this repository taken away from the holding.** Two of its planters standing outside a
 *  building in Kazimierz - the offer in use rather than for sale. They go on the owners' list
 *  rather than passing quietly, because another business's sign and doorway are legible in
 *  `planters-02`, and publishing that is theirs to allow rather than ours to assume
 *  (docs/inwentaryzacja.md). Cropping the sign off the top of the frame is the fallback if they
 *  would rather not.
 *
 *  **Nine mixed plantings in the batch were deliberately left out.** They are the genre of
 *  `/inspiracje/` - one basket carrying four species at once - and a second, shorter copy of
 *  the slideshow under the plant list would blur the line the page's own note draws when it
 *  sends people to Inspiracje for exactly that. It is `chrysanthemumPhoto`'s argument run the
 *  other way: a sales crate in the middle of the slideshow reads as a mistake, and so does a
 *  composition in the middle of the offer.
 *
 *  **Six more were already in the repository** as the entry photographs for `begonia`,
 *  `dahlia`, `lobelia`, `bakopa`, `petunia-surfinia` and `koleus` - found by comparing the
 *  batch against `src/assets/` rather than by eye. That is why the row does not simply repeat
 *  the list above it, and it is worth knowing before anyone adds back "the ones that got away".
 *
 *  **A seventh left the batch for an entry rather than for the strip.** The lilac hydrangea
 *  became `plants/hortensja.jpg` and retired that entry's Wikimedia stand-in - the first of the
 *  eighteen to go. The strip would otherwise have shown the holding's own hydrangeas a screen
 *  below a borrowed one on the same page.
 *
 *  **The `alt` texts name a genus only where the frame cannot be mistaken.** Pelargonium,
 *  fuchsia, tuberous begonia and hydrangea are named. **Surfinia, calibrachoa and busy lizzie
 *  are not**: surfinia is a trade name for a trailing petunia and not something a photograph
 *  can settle, calibrachoa has already been mistaken for a trailing petunia in this repository
 *  once, and the species in the batch's white-flowered crates is the same open question
 *  `plants/niecierpek-nowogwinejski.jpg` carries. `rows-05` and both `planters-*` therefore
 *  name no plant at all and describe colour and form instead, which is what `historyPhoto`
 *  does and for the same reason.
 *
 *  Processing is the strip rule, not the entry rule: scaled to the 2000px ceiling and **not**
 *  cropped, because `PhotoStrip` crops to 3:4 in CSS and the lightbox hands back the whole
 *  frame. Seven files arrived at 752x1020, under the ceiling, and are committed byte-for-byte -
 *  a resize would be a no-op and re-encoding would only cost quality. None of the 45 carried an
 *  EXIF orientation flag, so unlike the gallery batch there was no rotation to bake in.
 *
 *  **The alt texts are read off the pictures, not confirmed by the owners** (docs/inwentaryzacja.md). */
export const balconyStrip: GalleryPhoto[] = [
  {
    src: balconyRows01,
    alt: "Dwie partie pelargonii ustawione obok siebie w ostrym słońcu - po lewej czerwone, po prawej biało-różowe",
  },
  {
    src: balconyRows02,
    alt: "Pelargonie o koralowych kwiatach nad liśćmi z ciemną podkową, gęsty rząd w głąb uprawy",
  },
  {
    src: balconyRows03,
    alt: "Pelargonie biało-różowe z karminową plamką u nasady płatków, nad okrągłymi zielonymi liśćmi",
  },
  {
    src: balconyRows04,
    alt: "Begonie bulwiaste w skrzynkach - pełne kwiaty w czerwieni, łososiu, pomarańczu i żółci",
  },
  {
    src: balconyRows05,
    alt: "Białe pięciopłatkowe kwiaty nad ciemnozielonymi, lancetowatymi liśćmi, doniczki w turkusowych skrzynkach",
  },
  {
    src: balconyRows06,
    alt: "Rząd koszy z różowymi petuniami ciągnący się w głąb tunelu, nad nimi haki i konstrukcja",
  },
  {
    src: balconyBasket01,
    alt: "Fuksja o pełnych kwiatach - różowe działki odgięte nad purpurową koroną, kosz w tunelu",
  },
  { src: balconyBasket02, alt: "Fuksja o pełnych jasnoróżowych kwiatach na tle błękitnego nieba" },
  {
    src: balconyBasket03,
    alt: "Fuksja o pojedynczych kwiatach - różowe działki nad białą koroną, rząd koszy w głębi",
  },
  {
    src: balconyBasket04,
    alt: "Fuksja o pojedynczych kwiatach - czerwone działki nad kremowobiałą koroną",
  },
  {
    src: balconyBasket05,
    alt: "Kosz petunii o fioletowych kwiatach nakrapianych bielą, trzymany na tle tunelu",
  },
  {
    src: balconyBasket06,
    alt: "Kosz fioletowych petunii, w tle czerwone i różowe kosze pod folią",
  },
  {
    src: balconyBasket07,
    alt: "Kosz czerwonych petunii, długi rząd kolejnych koszy w głąb tunelu",
  },
  {
    src: balconyBasket08,
    alt: "Kosz petunii w różowo-białe pasy układające się w gwiazdę, zawieszony na rurze",
  },
  {
    src: balconyBasket09,
    alt: "Kosz białych petunii z różowym żyłkowaniem płatków, w tle czerwone i różowe",
  },
  {
    src: balconyBasket10,
    alt: "Kosz białych petunii postawiony na ziemi, kwiaty zwieszone poza krawędź doniczki",
  },
  {
    src: balconyBasket11,
    alt: "Kosz pełnych, karbowanych petunii w ciemnym różu, w tle fioletowe kosze",
  },
  {
    src: balconyBasket12,
    alt: "Kosz różowych petunii z bliska, za nim kolejne kosze ustawione w rząd",
  },
  {
    src: balconyBasket13,
    alt: "Begonia zwisająca o pełnym, morelowym kwiecie, w doniczce pod błękitnym niebem",
  },
  {
    src: balconyBasket14,
    alt: "Begonia zwisająca o pełnych, ognistopomarańczowych kwiatach, kosz pod konstrukcją tunelu",
  },
  {
    src: balconyPot01,
    alt: "Hortensja o czerwonych kwiatostanach i ząbkowanych liściach, doniczka ustawiona na kamieniu",
  },
  {
    src: balconyPot02,
    alt: "Hortensja o różowych kwiatostanach, obok kwiatostany jeszcze zielone i kremowe",
  },
  {
    src: balconyPlanter01,
    alt: "Duża biała donica pełna amarantowych kwiatów nad ciemnozielonymi liśćmi, przy budynku na kostce brukowej",
  },
  {
    src: balconyPlanter02,
    alt: "Dwie białe donice z amarantowymi kwiatami ustawione przed przeszklonym wejściem",
  },
];

/** One group of the home page show: the holding's own frames of one part of the offer, under
 *  that part's own name. */
export interface GalleryGroup {
  /** The name printed above the row. Taken from `offer.ts`, never written again here. */
  label: string;
  photos: GalleryPhoto[];
}

/** The group's name, read off the offer table rather than repeated.
 *
 *  `offer.ts` exists because the same three pages were once written down in two files that
 *  nothing kept in step; a literal "Kwiaty balkonowe" here would be the third. Keyed on the
 *  content group rather than the address, because that is the name the schema validates and the
 *  one that survives an address changing. */
function labelOf(group: PlantGroup): string {
  const page = offer.find((entry) => entry.groups.includes(group));
  if (!page) {
    throw new Error(`homeGallery: no offer page covers "${group}".`);
  }
  return page.menuLabel;
}

/** The strips, by group. The home page show is these three plus the entry photographs below. */
const stripOf: Record<PlantGroup, GalleryPhoto[]> = {
  Bratki: pansyStrip,
  Balkonowe: balconyStrip,
  Chryzantemy: chrysanthemumStrip,
};

/** **Every photograph of the offer that is the holding's own and is not already on the home
 *  page** - the three strips, plus the portrait frames from the plant entries.
 *
 *  ## What is in, and the two rules that decide it
 *
 *  1. **Ours, not borrowed.** Seventeen entries stand on a Wikimedia Commons stand-in, and
 *     those are excluded by `imageCredit` - the field exists only on a borrowed frame. This is
 *     not a preference: the lead above this block says the photographs are ours, taken here,
 *     and a stand-in of somebody else's hydrangea would make that sentence false. It also has
 *     an expiry: as the owners send their own frames, `imageCredit` comes off the entry and the
 *     photograph appears here on its own.
 *  2. **Taller than it is wide.** The row is a portrait window, and a landscape frame loses
 *     between 38% and 58% of its width to it - `pelargonia-rabatowa` is 1.78 and would keep
 *     42%. Four entry photographs are excluded by this (`chryzantema-wielkokwiatowa`,
 *     `pelargonia-rabatowa`, `petunia-surfinia`, `werbena`); all four are still on their own
 *     entry, in the 4:3 frame that suits them.
 *
 *  ## What is deliberately not here
 *
 *  - **The 23 plantings.** They are the best photographs in the repository and they are already
 *    on this page, in the slideshow one section below. Showing them twice on one screen is the
 *    repetition `docs/inwentaryzacja.md` spent a release removing, not a bigger gallery.
 *  - **`chrysanthemumPhoto` and `pansyPhoto`**, which are on this page too, in the season cards
 *    a screen above.
 *  - **`heroPhoto`**, a generated image rather than a photograph of the holding at all, and
 *    **`historyPhoto`**, which belongs to `/o-nas/`.
 *
 *  ## The order is the year, not the menu
 *
 *  Bratki open it because the holding's year opens in March, then the balcony flowers from
 *  April, then the chrysanthemums in October. `offer.ts` leads with Balkonowe because that
 *  order is importance and it says so about itself; this order is the one the lead text
 *  describes, and it is what makes a show of this length read as a year rather than as a pile.
 *
 *  Within a group the strip comes first, in the strip's own order - the crop, then what grows
 *  in it, then a finished pot or basket - and the entry portraits follow in the entries' own
 *  `order`, which is where the owners say which plant matters most. So a group runs from the
 *  scale of the holding down to the single plant, which is the same direction every category
 *  page runs in.
 *
 *  It is a function rather than a constant because the entry photographs live in the content
 *  collection, and `src/data/compositions.ts` already reaches for `astro:content` the same way.
 *
 *  The alt texts are the strips' and the entries' own, and carry the same caveat as everything
 *  else in this file: **read off the picture, not confirmed by the owners.**
 */
export async function homeGallery(): Promise<GalleryGroup[]> {
  const plants = await getCollection("plants");

  const entryPhotos = (group: PlantGroup): GalleryPhoto[] =>
    plants
      .filter((plant) => plant.data.group === group)
      .filter((plant) => plant.data.image && plant.data.imageAlt && !plant.data.imageCredit)
      .filter((plant) => plant.data.image!.width < plant.data.image!.height)
      .sort((a, b) => a.data.order - b.data.order)
      .map((plant) => ({ src: plant.data.image!, alt: plant.data.imageAlt! }));

  const groups: PlantGroup[] = ["Bratki", "Balkonowe", "Chryzantemy"];
  return groups.map((group) => ({
    label: labelOf(group),
    photos: [...stripOf[group], ...entryPhotos(group)],
  }));
}
