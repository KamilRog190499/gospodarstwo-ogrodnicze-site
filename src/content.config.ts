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

/** The plants in the offer. Each renders as one entry in the `#oferta` section, with the
 *  Markdown body as the cultivation description.
 *
 *  The file name becomes the anchor (`/#alstromeria`), which is why the names are Polish.
 */
const plants = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/plants" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        /** Sets the chip beside the heading and groups the entries on the page. */
        group: z.enum(["Balkonowe", "Rabatowe", "Bratki", "Chryzantemy"]),
        order: z.number().int().positive(),
        /** What the photograph should show, e.g. "zdjęcie — fuksja, 4:3". Printed inside
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

export const collections = { plants, pages };
