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

- **Ten pages**, plus a 404: `/`, `/kwiaty-balkonowe/`, `/rabatowe/`, `/bratki/`,
  `/chryzantemy/`, `/inspiracje/`, `/o-nas/`, `/faq/`, `/kontakt/`,
  `/polityka-prywatnosci/`. All three of the old WordPress offer addresses are kept
  unchanged; `/bratki/`, `/faq/` and `/polityka-prywatnosci/` are the three addresses with no
  predecessor. The last of them is also **the only page not in the menu** - it is reached from
  the footer, the consent bar and the map placeholder, and deliberately not from
  `navigation.ts`, which also feeds the 404's list of real destinations.
- **17 plant entries** in `src/content/plants/` - 14 migrated from the old site, plus two
  extra chrysanthemum types and the pansy, all three written by the owners. By group:
  Balkonowe 11, Rabatowe 2, Bratki 1, Chryzantemy 3.
- **48 photographs** in `src/assets/`. 14 of the 17 entries have their own frame; **dahlia,
  pelargonia bluszczolistna and sundaville are still placeholders**.
- `/` is a preview of the whole site: intro, season cards, four offer tiles opening with a
  mosaic of that group's photographs, the plantings slideshow in a reduced variant, the
  Facebook block and a map block. What each home page block may and may not repeat is argued
  out in `docs/inwentaryzacja.md` under "Strona główna jako witryna".

**Not done:** `deploy.yml`, the Facebook token, and everything in
`docs/inwentaryzacja.md` under "Czego nadal brakuje".

## Repository map

Read this before adding a file - most things already have a home.

| Path                           | Role                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/offer.ts`            | **The four groups and the four category pages, in one table.** Exports `plantGroups`, which `src/content.config.ts` turns into the schema's `z.enum` and `navigation.ts` turns into menu entries. A new group starts here, never in the schema. Also holds `plantCount()`, the Polish three-form plural.                               |
| `src/data/season.ts`           | **The only place selling dates are written down.** `saleWindows`, and `currentSeason` resolved at build time.                                                                                                                                                                                                                          |
| `src/data/navigation.ts`       | The menu: six top-level entries, one of which (`Oferta`) is a `NavGroup` holding the four category pages derived from `offer.ts`. Also `offerPages` and `allPages` (flattened, for the 404). `/polityka-prywatnosci/` is deliberately absent from all three.                                                                           |
| `src/data/contact.ts`          | Two phone numbers (Mateusz, Łukasz - the other two were withdrawn as out of date in September 2026), the address, the directions URL, the Facebook link. `email`, `openingHours`, `administrators` and `taxId` are all `null` - see Open items. The last two are read only by the privacy policy.                                      |
| `src/data/gallery.ts`          | The photographs pinned by name: `heroPhoto`, `chrysanthemumPhoto`, `pansyPhoto`, and the two strips (`chrysanthemumStrip`, `pansyStrip`). Each is an import plus a Polish `alt`. **The 23 plantings are no longer here** - they are the `compositions` collection.                                                                     |
| `src/data/plant-links.ts`      | Maps a plant named on a planting to its entry's anchor, and is the `z.enum` the plantings' `plants` lists are validated against. Three states: linked; `href: null` (sold, no entry written yet); `companion: true` (grows in the plantings, not sold separately - the chip says "dodatek").                                           |
| `src/data/facebook.ts`         | Types and image resolution for the generated snapshot. The only reader of `facebook-posts.json` and `src/assets/facebook/`.                                                                                                                                                                                                            |
| `src/data/version.ts`          | The footer's build stamp, from `package.json` and git.                                                                                                                                                                                                                                                                                 |
| `src/data/compositions.ts`     | The plantings' vocabulary: `compositionKinds` (the schema's `z.enum` and the filter row) and `compositionPhoto()`, the by-name lookup the history block and the spring season card use instead of an array position.                                                                                                                   |
| `src/content/compositions/`    | **The 23 plantings**, one `.md` each, the file name being the anchor. Body = the description, `tip` = "Nasza podpowiedź". Both are the owners' own words.                                                                                                                                                                              |
| `src/content.config.ts`        | The zod schemas for `plants`, `pages`, `faq` and `compositions`.                                                                                                                                                                                                                                                                       |
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
- Section `id`s and the file names in `src/content/compositions/` - published URL fragments.
- The `plantGroups` values and `compositionKinds` in `compositions.ts` - displayed labels that are
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
  and spacing.
- **Three light grounds and two dark ones, and that is the whole palette of backgrounds.**
  four warm papers - `--paper`, `--paper-linen`, `--paper-clay`, `--paper-blush` - on the light
  side; `--green-deep` (the history block on `/o-nas/`), `--green-band` (**all three** dark
  plates on the home page) and `--ink` (the footer) on the dark.
  - **The light grounds differ in hue, not in lightness, and that is forced rather than
    chosen.** `--ink-grey` carries every uppercase label and every photo caption, and it needs a
    ground of at least L 0.8353 to hold 4.5:1 against it. The four sit between 4.99:1 and
    4.61:1, so there is no room for a fifth, darker one. A cool ground, `--paper-sage`
    `#EBEEE1`, existed between the two September revisions at 4.54:1 - the floor itself - and
    was removed once the calendar and the directions block became dark plates and nothing was
    left standing on it.
  - **The dark plates must never touch each other.** Above L 0.076 the ochre overline fails and
    above L 0.098 the labels do, so the entire usable range of dark greens spans 1.80:1 end to
    end - two adjacent plates cannot read as two. On the home page a light section always parts
    them, which makes the order of sections a correctness constraint and not a preference. The
    one join that cannot be fixed is the last: `--green-band` against the `--ink` footer is
    1.44:1, and the footer colour is not up for negotiation.
    The third light ground arrived in September 2026 and reversed the "at most two backgrounds"
    rule that stood here, on the owner's report that the home page all blended together - the
    reversal and its reason are in `docs/inwentaryzacja.md`. **The grounds only work with the
    spacing that came with them:** `--pad-section` went up by a third in the same change, and a
    band repainted at the old spacing colours a section instead of parting it.
- **There is one accent outside the green family, and its territory is written down.**
  `--ochre` / `--ochre-lit` goes in overlines (`.eyebrow`) and in counters ("11 roślin"). It
  does **not** go in body text, buttons, prose links, the menu underline or the season chips.
  The value is the same token the sibling site alpaki-kazimierzdolny.pl uses, deliberately.
- **There is no tonal gradient in the design.** `--hero-scrim` existed until September 2026,
  under the home page `h1` where it lay on a photograph; the hero was rebuilt as two columns
  and the gradient went with it. `grep -rn "gradient" src/` still finds `PhotoSlot` and
  `MapEmbed`, and both are fine - hard-edged `repeating-linear-gradient` stripes hatching a
  pending frame, which draw a pattern and never a blend. **Nothing on this site now puts text
  on a photograph**, which is why no contrast here needs a browser to measure it any more;
  colour on colour is arithmetic. The scrim's measuring method is kept in
  `docs/inwentaryzacja.md` in case that ever changes - do not reinvent it, and never estimate
  it offline.
- **The layout is fluid, and there are now zero breakpoints.** Everything is `clamp()`,
  `auto-fit` and `minmax()`. The project's single media query lived in `Intro.astro`, where
  the hero switched from 3:2 to 3:1 at 700px; the rebuilt two-column hero keeps one ratio at
  every width and does not need it. Do not add breakpoints to fix a layout; fix the
  `minmax()` value. (`prefers-reduced-motion` in `global.css` is not a breakpoint, and it is
  the only `@media` left - `grep -rn "@media" src/` should return exactly one line.)
- **Design tokens go in `src/styles/tokens.css`**; components must not hardcode colours or
  spacing.
- **Fonts are self-hosted**, as `@fontsource-variable/fraunces` (serif, with its italic - the
  masthead needs it) and `@fontsource-variable/public-sans` (sans). Nothing is fetched from a
  Google CDN at runtime. Fraunces replaced Newsreader in September 2026 on the owner's choice,
  and **which of the six Fontsource files is imported is a decision with a price** - the header
  of `src/styles/fonts.css` weighs it out and records how it was settled. The short version:
  `opsz` is loaded, so the optical-size axis this design leans on is live and the two
  decorative axes (`SOFT`, `WONK`) are not; that is 175 kB lighter than the Newsreader it
  replaced, where `full` would have been 46 kB heavier. On mobile the bottleneck is the
  typefaces, not the photographs - the sibling project measured a jump from 79 to 87 on
  Lighthouse mobile from dropping a single face.
- **The one sanctioned exception to "no carousels" is the "Inspiracje" slideshow**
  (`Compositions.astro`): a slide is a planting with a name, a container type, its plants as
  links into the offer, an anchor and the phone. The handoff says "nie dodawaj karuzel"; the
  owners asked for one anyway and it stays. **Do not turn it back into a grid.** What keeps
  it honest: it is a scroll-snap strip, so with no JavaScript every photograph is still there
  and reachable; each slide carries its own caption; and the auto-advance pauses on hover and
  focus, stops for good on the first interaction, and never runs under
  `prefers-reduced-motion`. It renders at **two addresses** - `/inspiracje/` with its
  defaults, and the home page with `level={2}` and the filter, the rail, the anchors and the
  structured data and the prose switched off. Those five props are not styling; each one stops
  the two copies from contradicting each other, and the component's header comment gives the
  reason for each. **`ground="dark"` is the sixth and the odd one out** - it _is_ styling, and
  it is the home page copy alone, where this band is the page's one dark plate. It works by
  remapping the colour tokens on the container rather than by restating every rule, which is a
  deliberate departure from how `.history` and `.footer` do it and is argued in the component;
  the one thing that mechanism cannot reach is inherited `color`, which is why the block sets
  that explicitly. `prose` is the newest and the heaviest: the descriptions and the advice run
  to ~2000 words, which on the home page would make the preview longer than the page it
  previews. `src/scripts/compositions.ts` drives one strip per `[data-comp]`, so scope every
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
  - **The home page offer tiles carry a season chip**, in three states: "W sprzedaży",
    "Wkrótce", "Poza sezonem". This reverses what stood here - the marker was put on the tiles
    for one release, taken off on the argument that four equal doors to four pages is what that
    block is for and that a door changing colour with the month is a worse door, and put back
    in September 2026 on the owner's instruction after seeing both. The argument that lost is
    kept in the header of `OfferOverview.astro`, not deleted, together with the one that won:
    someone arriving in July and opening "Chryzantemy" meets a full catalogue with no hint that
    none of it is for sale for three months. **What to watch:** three groups are out of season
    for most of the year, so most of the time three tiles read "Poza sezonem" and one is lit.
    If that turns out to tell too gloomy a story, print the chip only where there is something
    to say - `currentSeason.groups[group]` is already `"now" | "soon" | null`. The season cards
    carry no link - the tiles are the one way to a category page.
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
  September 2026. **The rebuild answered "flat" and the grouping stays; the answer to "small"
  was reversed by the owner later that month and the bar is back on the handoff's `0.78rem`
  with `0.1em` of tracking.** A UX review is not the client. What remains of that release in
  this component is `--nav-pad-block`, now a flat `3px` instead of a clamp that made the bar
  70px tall: it is the least that still gives the current-page underline somewhere to sit, and
  it answers a defect the owners reported, so do not take it to zero. Both halves of the
  argument are kept at `--text-nav` in `tokens.css`.
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
    them a click from every page. What pays it back is the footer's list of the four category
    pages and the "Pozostałe grupy" nav at the foot of every category page. Do not trim either.
    **It is no longer a flat list of every page**, and that is the owners' call, not a
    regression: they said in September 2026 that "Inspiracje" is not part of the offer and had
    it taken out of the footer rather than moved to another column, so `/inspiracje/` is now
    reached from the menu and the home page only. Anything else that leaves the footer still
    has to be argued - this one item was.
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
  are not set yet, so there are no posts - and since September 2026 the block **still renders**,
  with a different lead and no cards. It used to disappear instead, which is the better rule in
  general; it changed because the home page rhythm now needs a light band between the plantings
  plate and the directions plate, and two dark plates cannot be parted from each other. The
  empty state claims no news, only that the owners post on Facebook and that new posts land
  here. Both leads and the heading are our words and are on the owners' review list.

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
   requires the pair. **A fourth photograph is now wanted and it is the most visible gap on
   the site: a portrait frame for the home page hero.** The rebuilt hero is a 4:5 figure, and
   the old rule that "only a landscape frame goes in this band" is reversed with it. Nothing
   in the repository fits - all 23 portrait frames in `src/assets/gallery/` are plantings that
   appear on the same page, the chrysanthemum strip is 736px wide, and the pansy strip is a
   March product. `heroPhoto` is therefore a 4:3 generated image cropped to 4:5, at about 1.6x
   rather than 2x; `Intro.astro` says what to do when a real frame arrives.
   Two rules for anything new: downscale to 2000px and **bake in the EXIF
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
3. **The privacy policy exists** - `/polityka-prywatnosci/`, eleven paragraphs on the sibling
   site's model, linked from the footer, the consent bar and the map placeholder. What is
   still the owners' to settle is inside it: **the controller's forenames and surnames**
   (`administrators` in `src/data/contact.ts`, `null`; § 1 names the holding and its address
   instead, which is a complete identification, not a placeholder), **the NIP** (`taxId`,
   likewise `null`), the e-mail from item 2, and the wording of the whole document, which is
   ours rather than theirs. One line in it is a promise about a machine: **"3 miesiące" for
   the server log** has to be matched by `logrotate` when `deploy.yml` is written, or the
   sentence changed. The full table is in `docs/inwentaryzacja.md` under "Polityka
   prywatności". **§ 5 is the paragraph to watch**: it states that the Facebook block never
   contacts Meta, which is true only while the snapshot is downloaded and self-hosted - any
   move to a plugin, an iframe or a hotlinked image makes the policy false, not just the
   component different.
4. **A logo** - the handoff says there is none, but the old site has one (`cropped-logo2`).
   `public/favicon.svg` is a provisional typographic stand-in, and it still carries the
   pre-2a colours.
5. **The selling calendar** wants a pass, and it is a whole table rather than one question:
   the wording "W trakcie" (the handoff says "Trwa teraz"), the section heading "Kiedy co
   sprzedajemy", the new card captions, the three card titles and bodies rewritten in
   September 2026 - "Bratki i prymulki", "Wiosenny sezon" and "Chryzantemy", which drop two
   of the handoff's own headings and leave two cards named exactly like the offer tiles a
   screen below them - how early "Wkrótce" should light up, and the fact that **winter is
   no longer silent**.
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
