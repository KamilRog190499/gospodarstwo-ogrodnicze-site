/** Editorial content collections.
 *
 *  The zod schemas are strict on purpose: a mistake in the frontmatter must break the
 *  build rather than quietly ship a plant with no colours or a photograph with no
 *  description. The prose itself lives in the Markdown body, not in the frontmatter.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// The `z` re-exported from "astro:content" is deprecated in Astro 7; take it straight from
// Astro so the schema is validated by the same zod instance the content layer uses.
import { z } from "astro/zod";
import { plantGroups } from "./data/offer";
import { compositionKinds } from "./data/compositions";
import { plantSlugs } from "./data/plant-links";

/** The plants in the offer. Each renders as one entry on its group's category page, with
 *  the Markdown body as the cultivation description.
 *
 *  The file name becomes the anchor (`/kwiaty-balkonowe/#alstromeria`), which is why the
 *  names are Polish.
 */
const plants = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/plants" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        /** Sets the chip beside the heading and groups the entries on the page. The values
         *  come from `src/data/offer.ts`, so the union the components use and the enum the
         *  build validates against cannot drift apart. */
        group: z.enum(plantGroups),
        /** Where the entry stands among its group's.
         *
         *  **It stopped meaning "position on the page" for one of the three groups.**
         *  `/kwiaty-balkonowe/` runs alphabetically since it absorbed `Rabatowe` in September
         *  2026 - thirty-four entries in editorial order is a list nobody can find a plant in
         *  (`OfferSection.astro`, prop `sort`). There it now decides only which four names and
         *  which two photographs the home page tile shows, which is the question it was always
         *  really answering: what the owners consider worth putting first. On `/bratki/` and
         *  `/chryzantemy/` it still sets the order of the page as well.
         *
         *  Values are unique across the whole collection rather than per group, which is why
         *  the merge needed no renumbering. Nothing requires that and nothing checks it. */
        order: z.number().int().positive(),
        /** What the photograph should show, e.g. "zdjęcie - fuksja, 4:3". Printed inside
         *  the placeholder until a real photograph arrives, so whoever takes the pictures
         *  can read the brief off the page itself. */
        slot: z.string(),
        image: image().optional(),
        imageAlt: z.string().min(10).optional(),
        /** Where a photograph that is **not the holding's own** came from, and under what
         *  licence. Absent on every frame the owners supplied, which is what it is for: the
         *  presence of this field is the machine-readable answer to "is this picture ours?".
         *
         *  Eighteen entries carry it - the September 2026 stand-ins from Wikimedia Commons,
         *  taken because the offer had eighteen plants with no picture at all and a column of
         *  striped placeholders. They are **temporary**, which is why `slot` stays on those
         *  entries too: the brief for the photograph the owners still owe is not cancelled by
         *  a borrowed frame standing in for it. When a real one arrives, this field and the
         *  file go together and nothing else changes.
         *
         *  `PlantEntry` prints it as a line under the photograph. That is not a reversal of
         *  the September 2026 removal of per-entry captions: a caption is editorial text about
         *  the plant, this is the attribution CC BY and CC BY-SA require in exchange for the
         *  right to publish the file, and it disappears with the file it belongs to.
         *
         *  `licenseUrl` is optional because one of the eighteen is public domain and has no
         *  deed to link; the licence then prints as plain text and the file page carries the
         *  provenance. Every source is recorded in docs/inwentaryzacja.md as well, because a
         *  frontmatter field is lost the moment the entry is rewritten. */
        imageCredit: z
          .object({
            /** A person, cleaned up from the Commons "Artist" field by hand - those hold wiki
             *  signatures, copyright notices and chained derivative-work credits. */
            author: z.string().min(2),
            /** As the licence names itself: "CC BY-SA 4.0", "CC0", "domena publiczna". */
            license: z.string().min(2),
            licenseUrl: z.url().optional(),
            /** The file's **description page**, not the image - that is where the licence,
             *  the full author string and the file's own history actually live. */
            sourceUrl: z.url(),
          })
          .optional(),
        /** At most four, because that is how many lines the owners themselves listed under
         *  the longest descriptions. The design specifies three in a single row; the grid is
         *  `auto-fit`, so a fourth wraps rather than breaking - the deviation is recorded in
         *  docs/inwentaryzacja.md. Only facts the owners own text states outright - nothing
         *  added from general horticultural knowledge. Absent where their text does not say. */
        facts: z
          .array(z.object({ label: z.string(), value: z.string() }))
          .min(1)
          .max(4)
          .optional(),
        /* **There is no `colors` field, and its absence is a decision rather than an
           oversight.** Twenty-two entries carried one - 104 chips under a "Dostępne kolory"
           label - until the owners had the whole block removed in September 2026. It went from
           the schema too, not just from the markup: a field no component reads is the dead
           weight this file exists to prevent. The 104 values are archived verbatim in
           docs/inwentaryzacja.md, and nineteen of the twenty-two entries still name their
           colours in the prose body, which is where the old WordPress site kept them for the
           other seventeen all along. Do not re-add this without the owners asking - the brief
           lists "lista dostępnych kolorów" as a pattern to carry over, so putting it back is as
           client-visible as taking it out was. */
      })
      .superRefine((entry, ctx) => {
        // A photograph without a description is exactly what the old site shipped - every
        // one of its images has an empty `alt`. Both or neither.
        if (Boolean(entry.image) !== Boolean(entry.imageAlt)) {
          ctx.addIssue({
            code: "custom",
            message: "`image` and `imageAlt` go together - a photograph needs a description.",
            path: ["imageAlt"],
          });
        }
        // Attribution for a photograph that is not here is either a leftover from a removed
        // stand-in or a credit pointed at the wrong entry. Both are worth a failed build:
        // the field's whole job is to say which files are borrowed, and it cannot do that
        // while it outlives them.
        if (entry.imageCredit && !entry.image) {
          ctx.addIssue({
            code: "custom",
            message:
              "`imageCredit` without `image` - attribution for a photograph that is not here.",
            path: ["imageCredit"],
          });
        }
      }),
});

/** Descriptive sections that are not a plant - currently the history of the holding. */
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    /** Overline above the heading. */
    label: z.string(),
  }),
});

/** The questions on `/faq/`.
 *
 *  One file per question, ordered by `order`, exactly as `plants` works - so there is no new
 *  convention to learn and a typo in a field still breaks the build.
 *
 *  **Every answer on that page has to be something the repository already knows.** The
 *  owners have not given selling hours, an e-mail address or a card-payment policy
 *  (src/data/contact.ts), so no question asks about them; the list of what to ask them is in
 *  docs/inwentaryzacja.md. A FAQ is the one page where a guess is quoted straight back at a
 *  visitor as if the holding had said it.
 *
 *  Which is what `data` is for. Two answers are not prose at all - the phone numbers and the
 *  selling calendar - and typing either into a Markdown body would put a second copy of a
 *  fact that already has an owner (`contact.ts`, `season.ts`) somewhere nothing keeps in
 *  step. The body carries the sentence, the flag tells `Faq.astro` which live block to set
 *  under it.
 */
const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    order: z.number().int().positive(),
    /** Which live block to render under the prose, if any. `phones` prints the numbers from
     *  `contact.ts`; `season` prints the windows from `season.ts`.
     *
     *  **Nothing sets `season` any more.** The owners had the window list taken off "Kiedy co
     *  jest w sprzedaży?" in September 2026 - the dates live on the season cards and under
     *  every category page's heading, and the FAQ was printing them in a third, worse form.
     *  The value is kept because the block still works and the calendar is still the one in
     *  `season.ts`; see docs/inwentaryzacja.md. */
    data: z.enum(["phones", "season"]).optional(),
  }),
});

/** The plantings shown on `/inspiracje/` - a basket, a box, a planter or a bed that the
 *  holding put together and photographed.
 *
 *  They lived in `src/data/gallery.ts` as a field on each photograph, which was right while
 *  a planting was a name and a list of plants. The owners' September 2026 pass gave every
 *  one of them a paragraph of description and a paragraph of advice, and two thousand words
 *  of Polish prose do not belong in a TypeScript file - the rule this very file opens with.
 *  One `.md` per planting, the file name is the anchor, exactly as `plants` and `faq` work.
 *
 *  **`tip` is prose in the frontmatter, and that is a deliberate exception.** The body holds
 *  the description; the advice is a second, separate paragraph that the panel prints under
 *  its own label, and a body cannot carry two blocks without splitting rendered HTML on an
 *  `<hr>`. It is unformatted, single-paragraph text, so it costs nothing to keep it in a
 *  field - the same trade `faq` makes with `question`.
 *
 *  `image` and `imageAlt` are **required** here, unlike in `plants`: all 23 photographs
 *  exist, so there is no "waiting for a picture" state to design for.
 */
const compositions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/compositions" }),
  schema: ({ image }) =>
    z.object({
      /** The panel's heading, and what a search engine gets. Every title names the plant it
       *  is about - the three that did not were given it when the owners' titles came in. */
      title: z.string(),
      /** Sets the filter row and the panel's overline. Values from `src/data/compositions.ts`. */
      kind: z.enum(compositionKinds),
      /** Position in the strip, and in the rail under it. */
      order: z.number().int().positive(),
      image: image(),
      imageAlt: z.string().min(10),
      /** Keys of `plantLinks`, so a misspelt plant breaks the build.
       *
       *  **Only what the owners named.** Three plantings hold something they left unnamed -
       *  the small white filler in 3 and 4, the silver-leaved trailer in 21. Those are
       *  described in the prose and left out of this list rather than guessed at; the
       *  questions are in docs/inwentaryzacja.md. */
      plants: z.array(z.enum(plantSlugs)).default([]),
      /** "Nasza podpowiedź" - how to build something like this, in one paragraph. */
      tip: z.string().min(40),
    }),
});

export const collections = { plants, pages, faq, compositions };
