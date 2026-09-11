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
    /** Which live block to render under the prose, if any. `phones` prints the four numbers
     *  from `contact.ts`; `season` prints the windows from `season.ts`. */
    data: z.enum(["phones", "season"]).optional(),
  }),
});

export const collections = { plants, pages, faq };
