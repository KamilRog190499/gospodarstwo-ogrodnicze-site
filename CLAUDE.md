# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static site for **Gospodarstwo Ogrodnicze „Saran”** - a family horticultural holding in
Cholewianka 36, 24-120 Kazimierz Dolny (woj. lubelskie), selling balcony, bedding and perennial
flowers plus large-flowered chrysanthemums from its own cultivation.

It replaces the current WordPress site at `http://gospodarstwo-saran.pl/`. The brief is to keep
that site's structure and character - the menu, the "photo + long cultivation description + list
of available colours" pattern, the seasonal blocks - with cleaned-up typography, spacing and
accessibility.

**No e-commerce.** Orders are taken by phone or on site only. The site is a business card plus an
informational catalogue. Do not add a cart, checkout, forms, accounts or prices.

## Repository status

**The site is built as eight pages and the content is migrated.** Astro scaffolded, design
tokens and components in place, all 16 migrated plants and the farm history carried over from
the WordPress site, plus one entry - the pansy - that was never on it. **`/` is a preview of
the whole site** - intro, season cards, four offer tiles each opening with a mosaic of that
group's own photographs, the plantings slideshow in a reduced variant, and a map block. It
was an entrance through 0.6 and showed four photographs against 47 in the repository, none of
them on the offer tiles; 0.7 put the pictures back and only the pictures, so the subpages keep
what makes them worth opening (the cultivation descriptions, the colour lists, the filters,
the phone numbers). What each home page block may and may not repeat is argued out in
`docs/inwentaryzacja.md` under "Strona główna jako witryna". The offer lives on
`/kwiaty-balkonowe/`, `/rabatowe/`
and `/chryzantemy/` - the WordPress addresses, unchanged - and on `/bratki/`, the one offer
address with no predecessor; the gallery, the history and the contact block have their own pages
at `/inspiracje/`, `/o-nas/` and `/kontakt/`. A slideshow of 23 of the owners' own photographs
is in, and two of them fill the spring card and the history block. A second batch of eight
chrysanthemum photographs landed in September 2026; three were chosen, filling the autumn season
card (16:9) and all three chrysanthemum entries (4:3) - the first per-plant photographs on the
site, and the reason `PlantEntry` now renders `image`/`imageAlt` when an entry has them. The
chrysanthemum group also grew from one entry to three (wielkokwiatowa, sredniokwiatowa,
igielkowa) on text the owners supplied themselves, and `/chryzantemy/` carries a `PhotoStrip` of
four general frames under the list - mixed plantings, deliberately attributed to no single type.
**A fourth batch, six pansy photographs, landed in September 2026** and brought a whole new
group with it: `Bratki` in the schema enum, one entry (`bratek-ogrodowy.md`), the page
`/bratki/` and a menu item placed chronologically between "Rabatowe" and "Chryzantemy". All six
are in - one 4:3 frame on the entry, four in a `PhotoStrip` under the list, and the sixth on a
**third season card**: the pansies sell in March and April, months the spring card used to
swallow, so `SeasonCards` now runs one card per selling window (bratki, balcony flowers,
chrysanthemums) where the handoff draws two. Cards 2 and 3 keep the handoff's copy verbatim,
including the "Maj - czerwiec · szczyt sezonu" caption that the interim single-card fix had
reworded. **A fifth batch, this one text, landed in September 2026: the owners' own cultivation
descriptions for all 14 plants outside the chrysanthemum group.** They replaced the WordPress
copy on eleven entries wholesale and closed the last three content gaps - the pansy, which had
no description at all, and `pelargonia-rabatowa.md` and `niecierpek-nowogwinejski.md`, which
were one and two sentences. The sentences the new text drops are listed in
`docs/inwentaryzacja.md` rather than merged back in; nothing is put in the owners' mouths. The
batch also came with 4-6 bullet lines per plant, so `facts` now takes **four** (the handoff
draws three) and the labels were collapsed into one vocabulary - both recorded in the same
document. **A sixth batch, ten balcony and bedding photographs, landed in September 2026**,
not supplied by the owners but recovered from the old site's own WordPress media library -
a `wp-json/wp/v2/media` query surfaced 58 photographs from 2019-2020 that were uploaded but
never placed on any live page. Alstromeria, fuksja, goździk, begonia, tunbergia, werbena,
heliotrop, pelargonia rabatowa, calibrachoa and niecierpek nowogwinejski now have their 4:3
frame; three remain placeholders - dahlia, pelargonia bluszczolistna and sundaville - found
nowhere in that library and still to be sought on the farm's Facebook page. Two of the ten
are read off the photograph rather than confirmed: calibrachoa's is hard to tell from a
trailing petunia by eye, and niecierpek's photograph came from a WordPress caption block
mislabelled "Pelargonie" - both **want owner confirmation**, recorded in
`docs/inwentaryzacja.md`. `npm run lint` and `npm run build` are clean, and `linkinator`
finds no dead internal link.

**Version 0.8 added the one thing on the site that changes by itself: the Facebook block.**
The catalogue changes once a season and nothing on it could say _chrysanthemums are on sale
now_ - the owners already write that on their Facebook page and were never going to write it
twice. `scripts/fetch-facebook.mjs` fetches the three latest posts once a day on the
self-hosted runner and **commits them to `main`** - the text as `src/data/facebook-posts.json`,
the photographs as real files in `src/assets/facebook/` - so the ordinary build carries them
out. `FacebookNews.astro` renders them on the home page between the plantings and the map.
The secrets are not set yet, so the block currently renders nothing, which is its designed
empty state.

**Three properties of that design are load-bearing, and all three are lost by the obvious
"simplification".** (1) The photographs are downloaded, never linked: a `full_picture` URL is
signed and expires within days, so a snapshot of those URLs rots into broken images while
looking fresh. (2) Because the files are ours, the visitor's browser never contacts Meta -
which is the only reason this block needs no consent gate while the map does; a Facebook
plugin, an iframe or a hotlinked image would each hand every visitor's IP to Meta on page
load. (3) Because the snapshot is in git, a token that has stopped working means "the feed did
not refresh", never "the page is blank", and the images go through `sharp` like every other
picture here. Do not move the refresh to the browser, to the web server, or to a Meta embed.
The reasoning is in the header of the fetch script, `docs/facebook.md` is written for the
owners, and the decisions that are theirs to review - automatic publication with no human in
the loop, and the thin `alt` texts - are in `docs/inwentaryzacja.md`.

What is not done: the privacy policy, the deploy workflow, the Facebook token, and everything
in `docs/inwentaryzacja.md` under "Czego nadal brakuje".

## Design handoff - the source of truth

`docs/design/README.md` is the full specification: colour tokens, the type scale, the spacing
formulas, every section, the exact Polish copy, the interaction rules and the list of what is
still missing. **Read it before writing any markup or CSS.** It is high-fidelity - scale and
spacing are final and are to be reproduced exactly.

**One exception, and it is at the top of that file: the "Poranek w tunelu" (2a) theme,
approved September 2026, supersedes the handoff's colour table and its two typefaces.**
`src/styles/tokens.css` is the source of truth for both. In short: paper `#FAF7F0`, ink
`#1F2A21`, the single accent green split into `--green` `#5A6D46` (text, links, focus) and
`--sage` `#6B7F55` (decorative, type >=24px only); Newsreader for the serif and Public Sans
for the sans, both self-hosted. Do not copy `#FCFBF5`, `#23281F`, `#4E5C40`, Instrument Serif
or Karla out of the handoff - they are the pre-2a record, kept for provenance.

| File                                         | Role                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/design/README.md`                      | The specification.                                                                                                                                |
| `docs/design/saran-strona-glowna-v3.dc.html` | **The design to implement.**                                                                                                                      |
| `docs/design/saran-zielnik-v2.dc.html`       | Rejected alternative ("zielnik"). Its "Rytm roku" section and numbered plant tables may return on subpages - not without asking the client first. |
| `docs/design/support.js`                     | Prototype runtime. Committed only so the `.dc.html` files open in a browser; **never ships to production.**                                       |

The `.dc.html` files are design references written in HTML, not production code: the template
lives between `<x-dc>` and `</x-dc>`, the logic in the `<script type="text/x-dc">` at the bottom,
and `{{ … }}` / `<sc-for>` / `<sc-if>` are prototype-environment constructs. Reproduce the design
in the target framework's idiom; do not copy the markup. Inline styles are deliberate in a
prototype - in production they move into design tokens and CSS.

Open a prototype by loading its `.dc.html` file directly in a browser; it needs `support.js` next
to it, which is why that file is committed. Filenames were normalised to ASCII kebab-case when the
handoff was imported and the file table in `docs/design/README.md` was updated to match. The files
are otherwise verbatim.

## Reference project

`../alpaki-kazimierz/alpaki-kazimierz-site` is a finished site by the same owner on the stack
recommended here. Its `CLAUDE.md`, `README.md` and `docs/plan-implementacji.md` already argue out
most of the architectural decisions - read them rather than relitigating. Copy its patterns, not
its content: different business, so its content, data, images, legal pages and SEO copy do not
transfer.

## Language convention

**Code is written in English; content is Polish.** Identifiers, file and component names, comments
and frontmatter field names are English. Everything a visitor reads - UI strings, Markdown copy,
`alt` texts - is Polish, as is documentation aimed at the site owners (`README.md`, `docs/*.md`).

The deliberate exception: `src/pages/*.astro` filenames are Polish, because **they are the public
URLs**. Content filenames are Polish too where they become slugs or anchors.

## Intended stack and commands

Astro + TypeScript (strict), static output, **no client-side framework and no hydration**. Plain
CSS - no Tailwind, no SCSS. Node >= 22.12, npm >= 9.6.5. (The handoff leaves the framework open;
Astro is chosen to match the reference project.)

```bash
npm run dev       # astro dev - http://localhost:4321
npm run build     # astro build -> dist/
npm run preview   # astro preview
npm run lint      # astro check && eslint .
npm run format    # prettier --write .
```

No test framework, and none is planned. Verification is `astro check` + `eslint`, then, against a
running preview:

```bash
npx linkinator http://localhost:4321 --recurse   # dead links, missing assets
npx lighthouse http://localhost:4321 --view      # run separately for desktop and mobile
```

plus manual viewport checks. The design is built to work from ~320 px to 1400 px+ with **no media
queries at all** - everything is `clamp()`, `auto-fit` and `minmax()`. Do not add breakpoints to
fix a layout; fix the `minmax()` value.

## Implementation rules that are easy to get wrong

- **The design is deliberately austere.** No border radius, no shadows, no counters, no
  testimonials, no animations, no icons, no emoji. Hierarchy comes from 1px lines, type size
  and spacing. Two page backgrounds at most (`--paper`, `--paper-dim`) plus two dark blocks
  (`--green-deep` history, `--ink` footer). **One sanctioned gradient exists:** `--hero-scrim`,
  the scrim under the home page `h1` where it lies on the photograph. It is a legibility
  device with measured contrast, not decoration - do not use it anywhere else, and re-measure
  the _eyebrow_ (not the heading - it sits highest, in the thinnest part of the gradient) if
  the photograph, the scrim padding or the heading length changes.
- **The one sanctioned exception is the "Inspiracje" slideshow** (`Compositions.astro`, which
  replaced `Slideshow.astro` in September 2026: a slide is now a planting with a name, a
  container type, its plants as links into the offer, an anchor and the phone). The handoff
  says "nie dodawaj karuzel"; the owners asked for one anyway, in September 2026, and it stays.
  **Do not turn it back into a grid.** What keeps it honest is worth preserving if it is ever
  rewritten: it is a scroll-snap strip, so with no JavaScript every photograph is still there and
  reachable; each slide carries its own caption; and the auto-advance pauses on hover and focus,
  stops for good on the first interaction, and never runs under `prefers-reduced-motion`.
  Since 0.7 the exception stands at **two addresses**: `/inspiracje/` renders the component
  with its defaults and the home page with `level={2}` and the filter, the rail, the anchors
  and the structured data switched off. Those four are not styling props - each one stops the
  two copies from contradicting each other, and the reason for each is in the component's own
  header comment. `src/scripts/compositions.ts` drives one strip per `[data-comp]`, so scope
  every query to the root if you touch it; a `document.querySelector` there would make the
  home page buttons move the wrong track.
- **Design tokens go in `src/styles/tokens.css`** from the colour table in the handoff; components
  must not hardcode colours or spacing.
- **Fonts are self-hosted.** The handoff shows a Google Fonts `<link>` for the prototype and then
  says to host locally for a Polish commercial site - do that. Instrument Serif and Karla are both
  OFL. Nothing is fetched from a Google CDN at runtime.
- **A plant entry is a component fed by data**, not hand-written markup:
  `{ name, group, image, body, facts[<=4], colors[] }` - the owners had the per-entry captions
  removed in September 2026, so no `caption` field exists. The three entries in the prototype
  are a sample; the live site has several dozen. Editorial text belongs in an Astro content
  collection with a zod schema, so a typo in a field breaks the build. The handoff draws three
  facts; the cap is four because that is how many lines the owners listed themselves, and the
  labels come from a fixed vocabulary - both in `docs/inwentaryzacja.md`. A fact is only ever
  something their own text states outright.
- **Do not shorten or rewrite the plant descriptions.** The long, concrete cultivation copy is the
  strongest thing on the current site and the reason people find it in search. The owners may
  replace their own text - they did in September 2026 - but then whatever the new version drops
  goes on the list in `docs/inwentaryzacja.md` for them to review, never silently.
- **Non-editorial data** (the four phone numbers, address, nav items, Facebook link) goes in typed
  `src/data/*.ts`, imported directly - one place per fact, so a number changes once and updates
  the intro CTA, the contact list, the footer and the JSON-LD together.
- **The Google map is consent-gated**, not lazy-loaded: nothing reaches Google before the visitor
  agrees. Either click-to-load or a consent banner writing one flag to `localStorage`. The
  "Wyznacz trasę" link works without consent and stays visible as the alternative. Since 0.7
  the map is on two pages (`/kontakt/` and the home page's `Directions.astro`); `consent.ts`
  fills in every `[data-map]` on a page and the one flag serves the whole site, so a second
  map costs no second question. It does mean the consent bar now appears on the home page -
  that is the design working, not a regression.
- **The season blocks are computed at build time from the date**, not from a prop. The handoff
  suggests 1.03-31.08 spring/summer (card 1) and 1.09-30.11 autumn (card 2); the spring window is
  **split** in `src/data/season.ts` because the pansies sell 1.03-30.04 and everything else from
  May, so there are three cards and three windows. For 1.12-28.02 the handoff proposes a
  "Sprzedaż wznawiamy w marcu" message - **that state is not designed**, so all three cards go
  quiet and their eyebrows name the season instead. **Ask the client before shipping a message
  there.** The season only changes when the site is rebuilt, so the deploy workflow needs a
  monthly `schedule:` alongside `push:`.
- **The prototype props `showAllEntries` and `showPending` do not transfer**, and the two dashed
  "Do napisania" / "Do potwierdzenia" blocks are notes to the client, not design elements - they
  do not ship. Neither does the footer's "makieta v3 · struktura wg obecnej strony" label.
- **Accessibility is part of the spec, not a polish pass:** skip link, `:focus-visible` outline
  `2px solid var(--focus-ring)` with `3px` offset (never remove it), 44 px minimum touch targets
  (48 px menu, 50 px primary button), one `<h1>` per page - the masthead name is a `<p>`, the
  `h1` belongs to the page - and `aria-current="page"` on the active nav item. `--focus-ring`
  is a variable rather than a fixed colour because it has to change with the ground: the
  default `--green` is 2.63:1 on `--ink` and 1.67:1 on `--green-deep`, under the 3:1 that WCAG
  1.4.11 asks of a focus indicator. **Every dark container raises it in one line**
  (`--focus-ring: var(--green-lit)`); `.footer`, `.history`, `.card--now` and `.lightbox` do.
  A dark element on a light ground (`.cta`, `.skip`) does not need it - the 3px offset puts
  the ring on the paper around it.
- **The header tagline** "Sprzedaż kwiatów balkonowych, rabatowych i chryzantem" is the exact
  tagline from the current site - do not reword it, and **do not move it.** Version 0.5 relocated
  it to the footer's first column to buy header height; it landed one line above the footer blurb,
  which is a superset of it, and the only record of the decision was a comment in the code
  asserting it had been agreed. 0.6 put it back in the masthead. Moving it is a client-visible
  change to the spec: ask, then write it down in `docs/`.
- **Contact list layout:** the phone rows use `grid` with a fixed `minmax(8ch, auto)` first track.
  A previous flex version made the four numbers start at four different positions; that was a
  reported defect. Keep the grid.
- **SEO:** the current site ranks on plant names. Preserve the old URLs or set up 301 redirects,
  and record the mapping in `docs/przekierowania.md` as the reference project does.

## Open items - do not resolve these unilaterally

From the handoff, in order of importance. Anything unconfirmed ships with a visible "pending
confirmation" state rather than a guessed value.

1. **Photographs** - the gallery, all three season cards, all three chrysanthemum entries, the
   pansy and ten of the thirteen balcony/bedding plants are filled; what is left is one 4:3
   frame each for dahlia, pelargonia bluszczolistna and sundaville, plus an archival photograph
   for the history block. None of the three turned up in the old site's live pages or its
   WordPress media library (see below) - the farm's Facebook page is the remaining place to
   look, and needs a logged-in browser to check, unlike the media-library search. The type each
   chrysanthemum photograph shows was read off the picture, not confirmed by the owners - the
   igielkowa is unmistakable, the sredniokwiatowa is a judgement about bloom size and **wants
   confirming**; the sixth photo batch has the same open question twice over, for calibrachoa
   (easily confused with a trailing petunia by eye) and niecierpek nowogwinejski (its source
   photo sat under a WordPress caption block mislabelled "Pelargonie"). Each remaining
   `PhotoSlot` names the crop it wants. A plant photograph goes in `src/assets/plants/` under
   the same name as its Markdown file, with `image` and `imageAlt` in the frontmatter - the
   schema requires the pair. Two rules for anything new: downscale to 2000px and **bake in the
   EXIF rotation** - 22 of the 23 gallery files and one of the two chrysanthemum files arrived
   as portrait frames flagged sideways, and `<Picture>` does not honour that flag. The old
   site's images are mostly 1024px Pixabay stock and are not reused, but its WordPress media
   library - reachable at `<site>/wp-json/wp/v2/media`, independent of anything linked from a
   live page - turned out to hold real, unused photographs from 2019-2020; the sixth batch
   came from there. The Polish `alt` texts - the gallery's, the four chrysanthemum ones and the
   ten from the sixth batch - were written from what is visible and **want a pass from the
   owners**; the gallery photographs are deliberately not assigned to individual plant entries,
   because they are mixed plantings rather than single-species portraits.
2. **Selling hours in season** and an **e-mail address** - the owners have not given them, so
   `email` and `openingHours` in `src/data/contact.ts` are `null` and the JSON-LD omits
   `openingHoursSpecification` rather than guessing.
3. **A privacy policy** - does not exist and must be written; required, because the site embeds
   the Google map and links Facebook. Until it exists nothing links to it: not the footer, not
   the map's consent placeholder. Add the link in both places at once.
4. **A logo** - the handoff says there is none, but the old site has one
   (`cropped-logo2`). `public/favicon.svg` is a provisional typographic stand-in.
5. **The third season card** wants a pass: whether May-August is the right span for card 2
   now that March and April belong to card 1, and whether "Bratki na otwarcie sezonu" is the
   title they would use. The pansy's own text and colour chips are settled - the September
   2026 batch supplied the description and repeated the colour list read off the photographs,
   which confirms it. The home page `h1` and the footer blurb still name only three groups -
   both sit close to the tagline, so neither was reworded. See `docs/inwentaryzacja.md`.
6. **What the new descriptions dropped.** Replacing the WordPress copy on eleven entries cost
   a handful of concrete details, tunbergia's and werbena's spring selling window among them.
   The full table is in `docs/inwentaryzacja.md` under "Wymiana opisów"; nothing goes back in
   without the owners saying so. The older colour-list and chrysanthemum discrepancies between
   the handoff and the owners' text are listed in the same document - their text won everywhere.

## Deployment

The reference project deploys from `main` via GitHub Actions on a **self-hosted runner**: `npm ci`,
`npm run build`, then `scp dist/` to a LAN host and run a deploy script there over SSH. Assume the
same shape here, and confirm the host, paths and script name before writing
`.github/workflows/deploy.yml` - they are per-site.

`version` in `package.json` is the source of truth for the site version and is bumped by hand on
every push to `main` (patch for copy/styling, minor for a new section or page).
