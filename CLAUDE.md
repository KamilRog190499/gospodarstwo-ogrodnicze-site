# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

**Every claim in this file is meant to be checkable against the code.** It describes the
state of the project, not how it got there - the version-by-version history lives in
`docs/inwentaryzacja.md` under "Historia wersji". If something here disagrees with the code,
the code is right and this file is a bug: fix it, do not work around it.

## Project

Static site for **Gospodarstwo Ogrodnicze „Saran”** - a family horticultural holding in
Cholewianka 36, 24-120 Kazimierz Dolny (woj. lubelskie), selling balcony, bedding and
perennial flowers plus large-flowered chrysanthemums from its own cultivation.

It replaces the WordPress site at `http://gospodarstwo-saran.pl/`. The brief is to keep that
site's structure and character - the menu, the "photo + long cultivation description + list
of available colours" pattern, the seasonal blocks - with cleaned-up typography, spacing and
accessibility.

**No e-commerce.** Orders are taken by phone or on site only. The site is a business card
plus an informational catalogue. Do not add a cart, checkout, forms, accounts or prices.

## Repository status

The site is built and the content is migrated. `npm run lint` and `npm run build` are clean
and `linkinator` finds no dead internal link.

- **Nine pages**, plus a 404: `/`, `/kwiaty-balkonowe/`, `/rabatowe/`, `/bratki/`,
  `/chryzantemy/`, `/inspiracje/`, `/o-nas/`, `/faq/`, `/kontakt/`. All three of the old
  WordPress offer addresses are kept unchanged; `/bratki/` and `/faq/` are the two addresses
  with no predecessor.
- **17 plant entries** in `src/content/plants/` - 14 migrated from the old site, plus two
  extra chrysanthemum types and the pansy, all three written by the owners. By group:
  Balkonowe 11, Rabatowe 2, Bratki 1, Chryzantemy 3.
- **48 photographs** in `src/assets/`. 14 of the 17 entries have their own frame; **dahlia,
  pelargonia bluszczolistna and sundaville are still placeholders**.
- `/` is a preview of the whole site: intro, season cards, four offer tiles opening with a
  mosaic of that group's photographs, the plantings slideshow in a reduced variant, the
  Facebook block and a map block. What each home page block may and may not repeat is argued
  out in `docs/inwentaryzacja.md` under "Strona główna jako witryna".

**Not done:** the privacy policy, `deploy.yml`, the Facebook token, and everything in
`docs/inwentaryzacja.md` under "Czego nadal brakuje".

## Repository map

Read this before adding a file - most things already have a home.

| Path                           | Role                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/offer.ts`            | **The four groups and the four category pages, in one table.** Exports `plantGroups`, which `src/content.config.ts` turns into the schema's `z.enum` and `navigation.ts` turns into menu entries. A new group starts here, never in the schema. Also holds `plantCount()`, the Polish three-form plural.                               |
| `src/data/season.ts`           | **The only place selling dates are written down.** `saleWindows`, and `currentSeason` resolved at build time.                                                                                                                                                                                                                          |
| `src/data/navigation.ts`       | The menu: six top-level entries, one of which (`Oferta`) is a `NavGroup` holding the four category pages derived from `offer.ts`. Also `offerPages`, `footerOfferLinks` and `allPages` (flattened, for the 404).                                                                                                                       |
| `src/data/contact.ts`          | Four phone numbers, the address, the directions URL, the Facebook link. `email` and `openingHours` are `null` - see Open items.                                                                                                                                                                                                        |
| `src/data/gallery.ts`          | The photograph registry: the `gallery` array for the slideshow, plus single frames pinned by name (`heroPhoto`, `tunnelPhoto`, `historyPhoto`, `chrysanthemumPhoto`, `pansyPhoto`) and the two strips (`chrysanthemumStrip`, `pansyStrip`). Each entry is an import plus a Polish `alt`.                                               |
| `src/data/plant-links.ts`      | Maps a plant named on a slideshow caption to its entry's anchor. `href: null` means "sold, but no entry to link to yet".                                                                                                                                                                                                               |
| `src/data/facebook.ts`         | Types and image resolution for the generated snapshot. The only reader of `facebook-posts.json` and `src/assets/facebook/`.                                                                                                                                                                                                            |
| `src/data/version.ts`          | The footer's build stamp, from `package.json` and git.                                                                                                                                                                                                                                                                                 |
| `src/content.config.ts`        | The zod schemas for `plants`, `pages` and `faq`.                                                                                                                                                                                                                                                                                       |
| `src/layouts/BaseLayout.astro` | The one layout: head, skip link, header, `<main>`, footer, JSON-LD.                                                                                                                                                                                                                                                                    |
| `src/components/`              | 19 components. `SeasonCards`, `OfferOverview` (home tiles), `OfferSection` (a whole category page), `PlantEntry`, `PhotoSlot` (a pending photograph), `PhotoStrip`, `Compositions` (the slideshow), `Intro`, `Header`, `Nav`, `Footer`, `Contact`, `Directions`, `MapEmbed`, `ConsentBanner`, `History`, `FacebookNews`, `Faq`, `Seo`. |
| `src/scripts/`                 | The only JavaScript sent to the browser: `consent.ts` (map consent), `compositions.ts` (the slideshow), `lightbox.ts` (the overlay preview), `nav.ts` (closing the menu panel - an enhancement, never a dependency).                                                                                                                   |
| `scripts/fetch-facebook.mjs`   | Build-time only. Run by `.github/workflows/facebook-feed.yml`, daily.                                                                                                                                                                                                                                                                  |
| `docs/inwentaryzacja.md`       | The project chronicle: what was on the old site, where it went, every open question, and the version history.                                                                                                                                                                                                                          |
| `docs/przekierowania.md`       | The 301 map.                                                                                                                                                                                                                                                                                                                           |
| `docs/facebook.md`             | Written for the owners: how to issue the token.                                                                                                                                                                                                                                                                                        |

## Design handoff - the source of truth

`docs/design/README.md` is the full specification: colour tokens, the type scale, the spacing
formulas, every section, the exact Polish copy, the interaction rules and the list of what is
still missing. **Read it before writing any markup or CSS.** It is high-fidelity - scale and
spacing are final and are to be reproduced exactly.

**One exception, and it is at the top of that file: the "Poranek w tunelu" (2a) theme,
approved September 2026, supersedes the handoff's colour table and its two typefaces.**
`src/styles/tokens.css` is the source of truth for both. In short: paper `#FAF7F0`, ink
`#1F2A21`, the single accent green split into `--green` `#5A6D46` (text, links, focus) and
`--sage` `#6B7F55` (decorative, type >=24px only). Do not copy `#FCFBF5`, `#23281F`,
`#4E5C40`, Instrument Serif or Karla out of the handoff - they are the pre-2a record, kept
for provenance.

| File                                         | Role                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/design/README.md`                      | The specification.                                                                                                                                |
| `docs/design/saran-strona-glowna-v3.dc.html` | **The design to implement.**                                                                                                                      |
| `docs/design/saran-zielnik-v2.dc.html`       | Rejected alternative ("zielnik"). Its "Rytm roku" section and numbered plant tables may return on subpages - not without asking the client first. |
| `docs/design/support.js`                     | Prototype runtime. Committed only so the `.dc.html` files open in a browser; **never ships to production.**                                       |

The `.dc.html` files are design references written in HTML, not production code: the template
lives between `<x-dc>` and `</x-dc>`, the logic in the `<script type="text/x-dc">` at the
bottom, and `{{ … }}` / `<sc-for>` / `<sc-if>` are prototype-environment constructs.
Reproduce the design in the target framework's idiom; do not copy the markup. Inline styles
are deliberate in a prototype - in production they move into design tokens and CSS.

Open a prototype by loading its `.dc.html` file directly in a browser; it needs `support.js`
next to it, which is why that file is committed. Filenames were normalised to ASCII
kebab-case when the handoff was imported and the file table in `docs/design/README.md` was
updated to match. The files are otherwise verbatim.

## Reference project

`../alpaki-kazimierz/alpaki-kazimierz-site` is a finished site by the same owner on the stack
recommended here. Its `CLAUDE.md`, `README.md` and `docs/plan-implementacji.md` already argue
out most of the architectural decisions - read them rather than relitigating. Copy its
patterns, not its content: different business, so its content, data, images, legal pages and
SEO copy do not transfer.

## Language convention

**Code is written in English; content is Polish.** Identifiers, file and component names,
code comments and frontmatter field names are English. Everything a visitor reads - UI
strings, Markdown copy, `alt` texts - is Polish, as is documentation aimed at the site owners
(`README.md`, `docs/*.md`). An English comment may of course quote a Polish UI string.

Deliberate exceptions, all of them because the name is an address:

- `src/pages/*.astro` filenames - **they are the public URLs.**
- `src/content/**` filenames - they become slugs and anchors.
- `src/assets/plants/*.jpg` - each must carry the same name as its Markdown file.
- Section `id`s and the composition ids in `gallery.ts` - published URL fragments.
- The `plantGroups` values and `compositionKinds` in `gallery.ts` - displayed labels that are
  also keys.

## Stack and commands

Astro + TypeScript (strict), static output, **no client-side framework and no hydration**.
Plain CSS - no Tailwind, no SCSS. Node >= 22.12, npm >= 9.6.5. `@astrojs/sitemap` and `sharp`
are the only other runtime dependencies.

```bash
npm run dev             # astro dev - http://localhost:4321
npm run build           # astro build -> dist/
npm run preview         # astro preview
npm run lint            # astro check && eslint .
npm run format          # prettier --write .
npm run fetch:facebook  # the feed refresh, by hand; needs FB_PAGE_ID and FB_ACCESS_TOKEN
```

No test framework, and none is planned. Verification is `astro check` + `eslint`, then,
against a running preview:

```bash
npx linkinator http://localhost:4321 --recurse   # dead links, missing assets
npx lighthouse http://localhost:4321 --view      # run separately for desktop and mobile
```

plus manual viewport checks.

## Implementation rules that are easy to get wrong

- **The design is deliberately austere.** No border radius, no shadows, no counters, no
  testimonials, no animations, no icons, no emoji. Hierarchy comes from 1px lines, type size
  and spacing. Two page backgrounds at most (`--paper`, `--paper-dim`) plus two dark blocks
  (`--green-deep` history, `--ink` footer). **One sanctioned gradient exists:**
  `--hero-scrim`, the scrim under the home page `h1` where it lies on the photograph. It is a
  legibility device with measured contrast, not decoration - do not use it anywhere else, and
  re-measure the _eyebrow_ (not the heading - it sits highest, in the thinnest part of the
  gradient) if the photograph, the scrim padding, or the heading's length **or size** changes.
  The scrim's height comes from its content, so shrinking the heading moves the eyebrow along
  the gradient just as surely as rewording it does. Measured in a browser in September 2026
  after `--text-h1` came down: eyebrow 5.00:1 and heading 8.43:1 at 1440px, 4.90:1 and 9.36:1
  at 400px, taken against the brightest pixel actually in the frame. The method - compositing
  the photograph with the gradient in a canvas and sweeping the text's band for the worst
  pixel - is written out in `docs/inwentaryzacja.md`; an offline estimate is not a measurement.
- **The layout is fluid, and there is exactly one breakpoint.** Everything is `clamp()`,
  `auto-fit` and `minmax()`. The single media query in the project is `Intro.astro`, where the
  hero switches from 3:2 to 3:1 at 700px - a choice of crop, not of layout, and its own
  comment says so. Do not add breakpoints to fix a layout; fix the `minmax()` value.
  (`prefers-reduced-motion` in `global.css` is not a breakpoint.)
- **Design tokens go in `src/styles/tokens.css`**; components must not hardcode colours or
  spacing.
- **Fonts are self-hosted**, as `@fontsource-variable/newsreader` (serif, with its italic -
  the masthead needs it) and `@fontsource-variable/public-sans` (sans). Nothing is fetched
  from a Google CDN at runtime; see the header of `src/styles/fonts.css` for which axis files
  are loaded and why.
- **The one sanctioned exception to "no carousels" is the "Inspiracje" slideshow**
  (`Compositions.astro`): a slide is a planting with a name, a container type, its plants as
  links into the offer, an anchor and the phone. The handoff says "nie dodawaj karuzel"; the
  owners asked for one anyway and it stays. **Do not turn it back into a grid.** What keeps
  it honest: it is a scroll-snap strip, so with no JavaScript every photograph is still there
  and reachable; each slide carries its own caption; and the auto-advance pauses on hover and
  focus, stops for good on the first interaction, and never runs under
  `prefers-reduced-motion`. It renders at **two addresses** - `/inspiracje/` with its
  defaults, and the home page with `level={2}` and the filter, the rail, the anchors and the
  structured data switched off. Those four props are not styling; each one stops the two
  copies from contradicting each other, and the component's header comment gives the reason
  for each. `src/scripts/compositions.ts` drives one strip per `[data-comp]`, so scope every
  query to the root if you touch it; a `document.querySelector` there would make the home
  page buttons move the wrong track.
- **A plant entry is a component fed by data**, not hand-written markup:
  `{ name, group, order, slot, image?, imageAlt?, facts?[<=4], colors?[] }`. There is no
  `caption` field - the owners had the per-entry captions removed. Editorial text belongs in
  the content collection, so a typo in a field breaks the build. `facts` is capped at four
  because that is how many lines the owners listed themselves (the handoff draws three), and
  the labels come from a fixed vocabulary - both in `docs/inwentaryzacja.md`. A fact is only
  ever something their own text states outright. `image` and `imageAlt` are required
  together.
- **Do not shorten or rewrite the plant descriptions.** The long, concrete cultivation copy
  is the strongest thing on the current site and the reason people find it in search. The
  owners may replace their own text, but then whatever the new version drops goes on the list
  in `docs/inwentaryzacja.md` for them to review, never silently.
- **Non-editorial data goes in typed `src/data/*.ts`**, imported directly - one place per
  fact, so a phone number changes once and updates the intro CTA, the contact list, the
  footer and the JSON-LD together. See the repository map above for which file owns what.
- **The Google map is consent-gated**, not lazy-loaded: nothing reaches Google before the
  visitor agrees. The "Wyznacz trasę" link works without consent and stays visible as the
  alternative. The map is on two pages (`/kontakt/` and the home page's `Directions.astro`);
  `consent.ts` fills in every `[data-map]` on a page and the one flag serves the whole site,
  so a second map costs no second question. It does mean the consent bar appears on the home
  page - that is the design working, not a regression.
- **The selling calendar is computed at build time from the date**, and `src/data/season.ts`
  is the only place selling dates are written down. The windows are the owners' own: March
  for pansies (and primroses), April to June for balcony and bedding flowers, 1 October to
  1 November for chrysanthemums. **A window that covers today makes its groups "now"; when no
  window covers today, the next one to open makes its groups "soon", and nothing else says
  anything** - so the page carries at most one seasonal message at a time.
  - **Where the marker appears - two places, and only two.** `SeasonCards.astro` on the home
    page lights the dark `.card--lit` block and prints "W trakcie" / "Wkrótce" in the
    overline; the two states are told apart by the overline alone, which works because only
    one card is ever lit. `OfferSection.astro` prints a line under the heading on each
    category page - "Sprzedaż trwa: …", "Sprzedaż wkrótce: …", or the bare dates - because
    someone arriving from a search never sees the home page.
  - **The home page offer tiles say nothing about the date.** They are four equal doors to
    four pages, and a door that changes colour with the month is a worse door. The marker was
    put on them for one release and taken off again; `OfferOverview.astro` says so in its own
    header. The season cards carry no link either - the tiles are the one way to a category
    page.
  - The handoff's 1.12–28.02 "Sprzedaż wznawiamy w marcu" message is **not designed** and is
    not shipped; what does appear in winter is the one word "WKRÓTCE" on the pansy card,
    which is on the owners' list to confirm. All of this is argued out in
    `docs/inwentaryzacja.md` under "Kalendarz sprzedaży".
- **The prototype props `showAllEntries` and `showPending` do not transfer**, and the two
  dashed "Do napisania" / "Do potwierdzenia" blocks are notes to the client, not design
  elements - they do not ship. Neither does the footer's "makieta v3 · struktura wg obecnej
  strony" label.
- **Accessibility is part of the spec, not a polish pass:** skip link, `:focus-visible`
  outline `2px solid var(--focus-ring)` with `3px` offset (never remove it), 44 px minimum
  touch targets (48 px menu, 50 px primary button), one `<h1>` per page - the masthead name
  is a `<p>`, the `h1` belongs to the page - and `aria-current="page"` on the active nav item.
  `--focus-ring` is a variable rather than a fixed colour because it has to change with the
  ground: the default `--green` is 2.63:1 on `--ink` and 1.67:1 on `--green-deep`, under the
  3:1 that WCAG 1.4.11 asks of a focus indicator. **Every dark container raises it in one
  line** (`--focus-ring: var(--green-lit)`); `.footer`, `.history` and `.lightbox` do. A dark
  element on a light ground (`.cta`, `.skip`) does not need it - the 3px offset puts the ring
  on the paper around it.
- **The menu has one group, and it is a native `<details>`.** Six top-level entries, of which
  `Oferta` is a `NavGroup` in `src/data/navigation.ts` rather than a destination - there is no
  `/oferta/` page and there should not be one, because it would be a second copy of the home
  page tiles. The eight flat items were called out as flat and small by a UX review in
  September 2026; the rebuild answers both, and `--text-nav` records the departure from the
  handoff's `0.78rem`.
  - **`src/scripts/nav.ts` is an enhancement, not a dependency.** Every handler in it only
    ever sets `open = false` - Escape, a click outside, focus leaving the group. With the
    script absent, blocked or thrown, the panel still opens, closes and announces its state,
    because `<details>` does all of that itself. **Never move opening into the script**, and
    do not replace the element with a button and a class toggle.
  - **`data-current` on the `<summary>`, `aria-current="page"` on the link inside.** A summary
    is not a link and leads nowhere, so it gets the green underline only; the hidden category
    link keeps the real `aria-current`, which is how a screen reader still finds which of the
    four it is on. The panel stays **closed** on a category page - open-by-default would drop
    an overlay across the `h1` of the four pages people most often arrive on from search.
  - **The FAQ is the same element again, and needs no script at all.** `/faq/` is an accordion
    of `<details>` with the `h2` inside the `<summary>` - valid HTML, and it keeps the page's
    outline. An accordion in the page flow has no outside to click and nothing to escape from,
    so unlike the menu it ships with no JavaScript whatsoever. It is not exclusive: two
    answers may be open at once. Both use the same 1px chevron - one site, one mark for "this
    opens".
  - **The footer pays for the panel.** Hiding four ranking addresses behind a summary costs
    them a click from every page. What pays it back is the footer's flat list of every page
    and the "Pozostałe grupy" nav at the foot of every category page. Do not trim either.
- **The header tagline** "Sprzedaż kwiatów balkonowych, rabatowych i chryzantem" is the exact
  tagline from the current site - do not reword it, and **do not move it.** It was once
  relocated to the footer, where it landed one line above the footer blurb, which is a
  superset of it; it was moved back. Moving it is a client-visible change to the spec: ask,
  then write it down in `docs/`.
- **Contact list layout:** the phone rows use `grid` with a fixed `minmax(8ch, auto)` first
  track. A previous flex version made the four numbers start at four different positions;
  that was a reported defect. Keep the grid.
- **The Facebook block refreshes itself, and three properties of that design are
  load-bearing.** `scripts/fetch-facebook.mjs` fetches the three latest posts once a day on
  the self-hosted runner and **commits them to `main`** - the text as
  `src/data/facebook-posts.json`, the photographs as real files in `src/assets/facebook/` -
  so the ordinary build carries them out. All three properties are lost by the obvious
  "simplification":
  1. The photographs are downloaded, never linked: a `full_picture` URL is signed and expires
     within days, so a snapshot of those URLs rots into broken images while looking fresh.
  2. Because the files are ours, the visitor's browser never contacts Meta - which is the
     only reason this block needs no consent gate while the map does. A Facebook plugin, an
     iframe or a hotlinked image would each hand every visitor's IP to Meta on page load.
  3. Because the snapshot is in git, a token that has stopped working means "the feed did not
     refresh", never "the page is blank", and the images go through `sharp` like every other
     picture here.

  Do not move the refresh to the browser, to the web server, or to a Meta embed. The secrets
  are not set yet, so the block renders nothing - that is its designed empty state, not a
  fault.

- **SEO:** the current site ranks on plant names. Preserve the old URLs or set up 301
  redirects, and record the mapping in `docs/przekierowania.md` as the reference project does.

## Open items - do not resolve these unilaterally

Anything unconfirmed ships with a visible "pending confirmation" state rather than a guessed
value. The full list is in `docs/inwentaryzacja.md` under "Czego nadal brakuje"; the ones
that shape code decisions:

1. **Photographs** - what is left is one 4:3 frame each for dahlia, pelargonia
   bluszczolistna and sundaville, plus an archival photograph for the history block. None of
   the three turned up in the old site's live pages or in its WordPress media library (which
   is reachable at `<site>/wp-json/wp/v2/media`, independently of anything linked from a live
   page, and did hold real unused photographs from 2019-2020); the farm's Facebook page is
   the remaining place to look, and needs a logged-in browser. Each remaining `PhotoSlot`
   names the crop it wants. A plant photograph goes in `src/assets/plants/` under the same
   name as its Markdown file, with `image` and `imageAlt` in the frontmatter - the schema
   requires the pair. Two rules for anything new: downscale to 2000px and **bake in the EXIF
   rotation** - many of the supplied files arrived as portrait frames flagged sideways, and
   `<Picture>` does not honour that flag.
   **Wanting owner confirmation:** the Polish `alt` texts throughout; which chrysanthemum
   type each photograph shows (the igielkowa is unmistakable, the sredniokwiatowa is a
   judgement about bloom size); and the species in two frames recovered from the media
   library - calibrachoa (easily confused with a trailing petunia by eye) and niecierpek
   nowogwinejski (its source sat under a caption block mislabelled "Pelargonie"). The gallery
   photographs are deliberately not assigned to individual plant entries, because they are
   mixed plantings rather than single-species portraits.
2. **Selling hours in season** and an **e-mail address** - the owners have not given them, so
   `email` and `openingHours` in `src/data/contact.ts` are `null` and the JSON-LD omits
   `openingHoursSpecification` rather than guessing.
   **This is now also what caps `/faq/` at six questions.** Every answer on that page is
   something the repository already knows; the questions people actually ring up about and
   the site cannot answer - hours in season, card payment, minimum order, wholesale terms,
   an e-mail - are listed in `docs/inwentaryzacja.md` for the owners, not guessed at on the
   page. A FAQ is the one place where a guess is quoted straight back at a visitor as the
   holding's own word.
3. **A privacy policy** - does not exist and must be written; required, because the site
   embeds the Google map and links Facebook. Until it exists nothing links to it: not the
   footer, not the map's consent placeholder. Add the link in both places at once.
4. **A logo** - the handoff says there is none, but the old site has one (`cropped-logo2`).
   `public/favicon.svg` is a provisional typographic stand-in, and it still carries the
   pre-2a colours.
5. **The selling calendar** wants a pass, and it is a whole table rather than one question:
   the wording "W trakcie" (the handoff says "Trwa teraz"), the section heading "Kiedy co
   sprzedajemy", the new card captions, the title "Bratki i prymulki na otwarcie sezonu", how
   early "Wkrótce" should light up, and the fact that **winter is no longer silent**.
   Primroses are on the site as a word only: they sell in the March window but no description
   or photograph exists, so no entry and no group were invented.
6. **What the new descriptions dropped.** Replacing the WordPress copy cost a handful of
   concrete details, tunbergia's and werbena's spring selling window among them. The full
   table is in `docs/inwentaryzacja.md` under "Wymiana opisów"; nothing goes back in without
   the owners saying so.

## Deployment

The reference project deploys from `main` via GitHub Actions on a **self-hosted runner**:
`npm ci`, `npm run build`, then `scp dist/` to a LAN host and run a deploy script there over
SSH. Assume the same shape here, and confirm the host, paths and script name before writing
`.github/workflows/deploy.yml` - they are per-site.

**`deploy.yml` does not exist yet**, and when it is written it needs a **daily** `schedule:`
alongside `push:`, not a monthly one. Four of the five season transitions fall on the first
of a month, but the fifth is 2 November, and a monthly build would leave "CHRYZANTEMY ·
W TRAKCIE" standing for the whole month after the season ended. The daily Facebook workflow
does not cover this: it commits only when there are new posts, so on a quiet November it
never triggers a build at all. Until this exists, the season marker is frozen at whatever the
last build said.

`version` in `package.json` is the source of truth for the site version and is bumped by hand
on every push to `main` (patch for copy/styling, minor for a new section or page).
