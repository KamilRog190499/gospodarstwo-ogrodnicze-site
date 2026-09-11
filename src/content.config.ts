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
        order: z.number().int().positive(),
        /** What the photograph should show, e.g. "zdjęcie - fuksja, 4:3". Printed inside
         *  the placeholder until a real photograph arrives, so whoever takes the pictures
         *  can read the brief off the page itself. */
        slot: z.string(),
        image: image().optional(),
        imageAlt: z.string().min(10).optional(),
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
        /** The colour chips. Absent for the plants the old site describes only as
         *  available "w różnych kolorach" - that sentence stays in the body instead,
         *  rather than being turned into invented chips. */
        colors: z.array(z.string()).min(1).optional(),
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
