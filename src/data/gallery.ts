/** The photograph registry: the gallery strip, plus the frames placed one by one.
 *
 *  `gallery` is the presentation shoot - photographs of the holding's own plantings, in the
 *  order they appear on `/inspiracje/`. Everything exported under it is a single frame the
 *  design asks for by name, pinned here rather than in the component, so one photograph is
 *  chosen in one place.
 *
 *  Order in `gallery` is the order on the page. `alt` is not optional: a photograph without a
 *  description is what the old site shipped, every one of its images with an empty `alt`.
 *
 *  The descriptions say what is in frame - colour, form, setting - and name a species only
 *  where the flower is unmistakable. Several of these are mixed plantings that the owners
 *  can identify and we cannot; **the alt texts want a pass from them** before this counts
 *  as finished (docs/inwentaryzacja.md).
 *
 *  The file names are numbers rather than plant names for the same reason: a guessed
 *  species baked into a file name outlives the guess.
 *
 *  ## `composition`
 *
 *  New here. `/inspiracje/` used to show these as 23 photographs in a queue: no names, one
 *  address for all of them, and not a single link out - the most sales-shaped page on the
 *  site was a dead end. A photograph that shows a finished planting now carries what makes
 *  it one: a stable `id` to link to, the kind of container, a short name, and which plants
 *  are in it.
 *
 *  `plants` is filled **only where the `alt` text itself names the species** - petunias,
 *  begonias, pelargoniums. Everything else is an empty array on purpose: those are mixed
 *  plantings, the owners can identify them and we cannot, and the panel says so rather than
 *  guessing. Filling the remaining fifteen is a question for them, not a task for us.
 */
import type { ImageMetadata } from "astro";

import type { PlantSlug } from "./plant-links";

import gallery01 from "../assets/gallery/gallery-01.jpg";
import gallery02 from "../assets/gallery/gallery-02.jpg";
import gallery03 from "../assets/gallery/gallery-03.jpg";
import gallery04 from "../assets/gallery/gallery-04.jpg";
import gallery05 from "../assets/gallery/gallery-05.jpg";
import gallery06 from "../assets/gallery/gallery-06.jpg";
import gallery07 from "../assets/gallery/gallery-07.jpg";
import gallery08 from "../assets/gallery/gallery-08.jpg";
import gallery09 from "../assets/gallery/gallery-09.jpg";
import gallery10 from "../assets/gallery/gallery-10.jpg";
import gallery11 from "../assets/gallery/gallery-11.jpg";
import gallery12 from "../assets/gallery/gallery-12.jpg";
import gallery13 from "../assets/gallery/gallery-13.jpg";
import gallery14 from "../assets/gallery/gallery-14.jpg";
import gallery15 from "../assets/gallery/gallery-15.jpg";
import gallery16 from "../assets/gallery/gallery-16.jpg";
import gallery17 from "../assets/gallery/gallery-17.jpg";
import gallery18 from "../assets/gallery/gallery-18.jpg";
import gallery19 from "../assets/gallery/gallery-19.jpg";
import gallery20 from "../assets/gallery/gallery-20.jpg";
import gallery21 from "../assets/gallery/gallery-21.jpg";
import gallery22 from "../assets/gallery/gallery-22.jpg";
import gallery23 from "../assets/gallery/gallery-23.jpg";
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
import homeHero from "../assets/home/hero-title.jpg";

/** What was planted, not what is growing in it - the thing a visitor is choosing between.
 *
 *  Order here is the order of the filter buttons on `/inspiracje/`. Adding a season means
 *  adding a member (docs: the autumn shoot is still missing), and nothing else. */
export const compositionKinds = [
  "Kosz wiszący",
  "Skrzynka",
  "Donica",
  "Rabata",
  "Ekspozycja",
] as const;

export type CompositionKind = (typeof compositionKinds)[number];

export interface Composition {
  /** URL fragment, so one planting can be linked to and can be found. Once published these
   *  are addresses - rename with the same care as a page slug. */
  id: string;
  kind: CompositionKind;
  /** Short name; the panel's heading. Descriptive rather than poetic - it is also what a
   *  search engine gets. */
  title: string;
  /** Keys of `plantLinks`. Empty where the planting is mixed and unidentified - see the
   *  note at the top of this file. */
  plants: PlantSlug[];
}

export interface GalleryPhoto {
  src: ImageMetadata;
  alt: string;
  /** Present where the frame shows a finished planting. Absent frames still appear in the
   *  strip; they just carry no name and no links. */
  composition?: Composition;
}

export const gallery: GalleryPhoto[] = [
  {
    src: gallery01,
    alt: "Obsadzenie fioletowych petunii przy drewnianym płocie, na trawniku",
    composition: {
      id: "fioletowe-petunie-przy-plocie",
      kind: "Rabata",
      title: "Fioletowe petunie przy płocie",
      plants: ["petunia-surfinia"],
    },
  },
  {
    src: gallery02,
    alt: "Różowe petunie w wysokiej donicy na słupku, pośrodku trawnika",
    composition: {
      id: "rozowe-petunie-w-donicy-na-slupku",
      kind: "Donica",
      title: "Różowe petunie w donicy na słupku",
      plants: ["petunia-surfinia"],
    },
  },
  {
    src: gallery03,
    alt: "Skrzynka z różowymi i białymi kwiatami, ustawiona na trawie",
    composition: {
      id: "skrzynka-rozowo-biala",
      kind: "Skrzynka",
      title: "Skrzynka różowo-biała",
      plants: [],
    },
  },
  {
    src: gallery04,
    alt: "Wiszący kosz z różowo-białymi kwiatami o długich, zwisających pędach",
    composition: {
      id: "kosz-z-dlugimi-pedami",
      kind: "Kosz wiszący",
      title: "Kosz z długimi pędami",
      plants: [],
    },
  },
  {
    src: gallery05,
    alt: "Szeroka kaskada drobnych czerwonych kwiatów w podłużnym pojemniku",
    composition: {
      id: "czerwona-kaskada",
      kind: "Skrzynka",
      title: "Czerwona kaskada",
      plants: [],
    },
  },
  {
    src: gallery06,
    alt: "Begonie w odcieniach pomarańczu i czerwieni w okrągłej donicy",
    composition: {
      id: "begonie-pomaranczowo-czerwone",
      kind: "Donica",
      title: "Begonie pomarańczowo-czerwone",
      plants: ["begonia"],
    },
  },
  {
    src: gallery07,
    alt: "Begonie czerwone i żółte ustawione obok siebie na ekspozycji",
    composition: {
      id: "begonie-czerwone-i-zolte",
      kind: "Ekspozycja",
      title: "Begonie czerwone i żółte",
      plants: ["begonia"],
    },
  },
  {
    src: gallery08,
    alt: "Begonie białe i czerwone w dwóch rzędach doniczek",
    composition: {
      id: "begonie-biale-i-czerwone",
      kind: "Ekspozycja",
      title: "Begonie białe i czerwone",
      plants: ["begonia"],
    },
  },
  {
    src: gallery09,
    alt: "Begonie w odcieniach różu i łososia, gęsto obsadzone",
    composition: {
      id: "begonie-rozowe-i-lososiowe",
      kind: "Ekspozycja",
      title: "Begonie różowe i łososiowe",
      plants: ["begonia"],
    },
  },
  {
    src: gallery10,
    alt: "Czerwone begonie w donicy ustawionej na żwirze",
    composition: {
      id: "czerwone-begonie-na-zwirze",
      kind: "Donica",
      title: "Czerwone begonie na żwirze",
      plants: ["begonia"],
    },
  },
  {
    src: gallery11,
    alt: "Różowe kwiaty na rabacie obrzeżonej cegłą",
    composition: {
      id: "rabata-obrzezona-cegla",
      kind: "Rabata",
      title: "Rabata obrzeżona cegłą",
      plants: [],
    },
  },
  {
    src: gallery12,
    alt: "Obfita kaskada drobnych białych kwiatów w pojemniku",
    composition: {
      id: "biala-kaskada",
      kind: "Skrzynka",
      title: "Biała kaskada",
      plants: [],
    },
  },
  {
    src: gallery13,
    alt: "Rabata z pelargoniami i roślinami o srebrzystych liściach",
    composition: {
      id: "pelargonie-i-srebrne-liscie",
      kind: "Rabata",
      title: "Pelargonie i srebrne liście",
      /** Read as bedding pelargoniums because the frame is a bed - **to confirm with the
       *  owners**, it could as well be the ivy-leaved ones. */
      plants: ["pelargonia-rabatowa"],
    },
  },
  {
    src: gallery14,
    alt: "Rabata gęsto obsadzona różowymi i purpurowymi drobnymi kwiatami",
    composition: {
      id: "rabata-rozowo-purpurowa",
      kind: "Rabata",
      title: "Rabata różowo-purpurowa",
      plants: [],
    },
  },
  {
    src: gallery15,
    alt: "Fioletowe i białe drobne kwiaty w sąsiadujących pojemnikach",
    composition: {
      id: "fiolet-obok-bieli",
      kind: "Skrzynka",
      title: "Fiolet obok bieli",
      plants: [],
    },
  },
  {
    src: gallery16,
    alt: "Mieszane obsadzenie białych i różowych drobnych kwiatów",
    composition: {
      id: "biel-i-roz-mieszane",
      kind: "Rabata",
      title: "Biel i róż mieszane",
      plants: [],
    },
  },
  {
    src: gallery17,
    alt: "Wiszące kosze z zielono-białymi kaskadami pod dachem tunelu foliowego",
    composition: {
      id: "kosze-pod-dachem-tunelu",
      kind: "Kosz wiszący",
      title: "Kosze pod dachem tunelu",
      plants: [],
    },
  },
  {
    src: gallery18,
    alt: "Ekspozycja koszy i obsadzonych skrzynek wewnątrz tunelu foliowego",
    composition: {
      id: "ekspozycja-w-tunelu",
      kind: "Ekspozycja",
      title: "Ekspozycja w tunelu",
      plants: [],
    },
  },
  {
    src: gallery19,
    alt: "Rabata z czerwonymi i różowymi pelargoniami w pełnym kwitnieniu",
    composition: {
      id: "pelargonie-w-pelnym-kwitnieniu",
      kind: "Rabata",
      title: "Pelargonie w pełnym kwitnieniu",
      /** Same reading, same caveat as `pelargonie-i-srebrne-liscie`. */
      plants: ["pelargonia-rabatowa"],
    },
  },
  {
    src: gallery20,
    alt: "Drewniana skrzynia obsadzona drobnymi biało-różowymi kwiatami",
    composition: {
      id: "drewniana-skrzynia",
      kind: "Skrzynka",
      title: "Drewniana skrzynia",
      plants: [],
    },
  },
  {
    src: gallery21,
    alt: "Kosz z czerwonymi i białymi petuniami oraz srebrzystymi liśćmi",
    composition: {
      id: "kosz-z-petuniami-i-srebrem",
      kind: "Kosz wiszący",
      title: "Kosz z petuniami i srebrem",
      plants: ["petunia-surfinia"],
    },
  },
  {
    src: gallery22,
    alt: "Ciemne donice z trawami ozdobnymi i żółtymi kwiatami na kostce",
    composition: {
      id: "trawy-i-zolte-kwiaty",
      kind: "Donica",
      title: "Trawy i żółte kwiaty",
      plants: [],
    },
  },
  {
    src: gallery23,
    alt: "Zielono-żółta kaskada zwisająca z kosza w tunelu foliowym",
    composition: {
      id: "zielono-zolta-kaskada",
      kind: "Kosz wiszący",
      title: "Zielono-żółta kaskada",
      plants: [],
    },
  },
];

/** The frames `/inspiracje/` shows as plantings, in page order.
 *
 *  Derived rather than a second list: a photograph cannot be in the strip and out of the
 *  registry, and adding one is one edit above. */
export const compositions = gallery.filter(
  (photo): photo is GalleryPhoto & { composition: Composition } => photo.composition !== undefined,
);

/** The tunnel shot the spring card asks for: "galeria — tunel z kwiatami balkonowymi". */
export const tunnelPhoto = gallery[17]!;

/** The autumn card's frame: "galeria — chryzantemy przed 1 listopada, 16:9".
 *
 *  Deliberately outside `gallery`: that strip is the spring presentation, and a single
 *  autumn frame in the middle of it would read as a mistake rather than as a season.
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
    alt: "Rzędy kulistych chryzantem w tunelu — amarantowe, biało-żółte i czerwone, w tle żółte",
  },
  {
    src: offer02,
    alt: "Kuliste chryzantemy w tunelu foliowym — czerwone, różowe, białe, żółte i pomarańczowe",
  },
  {
    src: offer03,
    alt: "Doniczki z chryzantemami ustawione w dwóch rzędach przy drodze, w kilkunastu kolorach",
  },
  {
    src: offer04,
    alt: "Ekspozycja chryzantem — żółte, amarantowe i liliowe obok białych o wąskich płatkach",
  },
];

/** The strip under the plant list on `/bratki/`: what a March crate actually looks like.
 *
 *  Same reasoning as `chrysanthemumStrip` and the same deliberate restraint: the entry's own
 *  photograph shows the flower, this row shows the offer. The frames are crates rather than
 *  single-variety portraits, so nothing here is attributed to a variety and the `alt` texts
 *  name colours instead. Order here is the order on the page.
 *
 *  Also outside `gallery` for the reason `chrysanthemumPhoto` is: the slideshow is the spring
 *  presentation of finished baskets and boxes, and a sales crate in the middle of it would
 *  read as a mistake.
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
    alt: "Dziewięć skrzynek z bratkami ustawionych obok siebie — żółte, białe, fioletowe, liliowe i różowe",
  },
  { src: pansy02, alt: "Skrzynka jednolicie żółtych bratków bez ciemnej plamki, widziana z góry" },
  { src: pansy03, alt: "Białe i kremowe bratki z ciemnofioletową plamką pośrodku kwiatu" },
  { src: pansy04, alt: "Fioletowe bratki z białym obrzeżem płatków i żółtym oczkiem" },
];

/** The home page's own photograph, under the intro text and the two CTAs.
 *
 *  Outside `gallery` for the same reason `chrysanthemumPhoto` and the pansy strip are: this
 *  is a single frame asked for by name, not part of the `/inspiracje/` presentation shoot.
 *
 *  A panoramic garden composition made specifically for the opening band. The flower bed
 *  remains legible on every crop while the quieter middle gives the page heading room to breathe.
 *
 *  **Not on the design handoff** - the Intro section there is text and two CTAs only, no
 *  photograph. Added on the owners' own request rather than the handoff's say-so.
 *
 *  **The alt text is read off the picture, not confirmed by the owners** (docs/inwentaryzacja.md):
 *  the flowers read as impatiens by shape, but the bed is not attributed to a single species. */
export const homeHeroPhoto: GalleryPhoto = {
  src: homeHero,
  alt: "Kolorowa ekspozycja wiszących koszy z różowymi i białymi petuniami w szklarni",
};

/** The photograph in the history block. The design brief there says "zdjęcie archiwalne";
 *  this one is current, because nothing archival exists yet - a better fit than an empty
 *  panel, and still worth replacing if the owners find an old photograph. */
export const historyPhoto = gallery[16]!;
