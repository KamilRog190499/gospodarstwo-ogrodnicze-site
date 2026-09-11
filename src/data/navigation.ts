/** The main menu.
 *
 *  Nine real pages, nine real addresses. Before this, five entries pointed at anchors on one
 *  page and three of them pointed at the *same* anchor (`#oferta`): the menu promised
 *  categories the document did not have, and two of the five items did nothing visible.
 *
 *  Three of the four offer slugs are the WordPress ones, unchanged, which is the whole point -
 *  docs/przekierowania.md: as real pages they stay 1:1 and need no 301 at all, instead of
 *  three ranking addresses collapsing into one anchor. `/bratki/` is the one address with no
 *  history behind it - the old site did not sell pansies anywhere on it.
 *
 *  The four offer entries are no longer written out here. They are derived from
 *  `src/data/offer.ts`, which is also where the home page tiles come from - the same four
 *  addresses used to be typed into two files.
 *
 *  ## Why the offer moved into a group
 *
 *  The menu was eight items of one weight in one centred row. A UX review called it flat, and
 *  it was: four of the eight were categories of a single thing, and nothing in the row said so.
 *  They now sit in one `NavGroup` that `Nav.astro` renders as a native `<details>` panel, and
 *  their labels grew to what a visitor would actually search for - the panel is a column, so
 *  the width that forced "Rabatowe" and "Bratki" is gone.
 *
 *  The cost of a panel is real and is paid for elsewhere: four ranking addresses are one click
 *  further from every page. Three things pay it back - the footer keeps all four as a flat
 *  list, `OfferSection.astro` ends every category page with a "Pozostałe grupy" nav to the
 *  other three, and the home page tiles are untouched.
 *
 *  ## Why "Strona główna" stayed
 *
 *  The same review asked for it to go. It stays: someone arriving from search straight on
 *  `/rabatowe/` has no visible way back to the entrance - the masthead is a link to `/`, but
 *  nothing about it says so, and this site's visitors are buying flowers, not reading web
 *  conventions. It is a departure from the handoff, which lists the menu without it
 *  (docs/design/README.md, section 1), and the reason is that there the menu pointed at
 *  anchors on a single page, where an entry leading back to the top would have meant nothing.
 *
 *  ## "O nas"
 *
 *  `/o-nas/` keeps its old WordPress address. The label was "Historia gospodarstwa", the one
 *  from the old menu, and became "O nas" in 1.0 - the same review, and the change is recorded
 *  in docs/inwentaryzacja.md because renaming a menu item is visible to the client. The phrase
 *  survives on the page itself as the overline above the heading, which is where it is true.
 *
 *  The subsets are exported from here rather than sliced by index where they are used. Both
 *  consumers took `navigation.slice(0, n)`, which an entry added at the front shifts silently;
 *  composing the menu out of named constants means the next menu change cannot break them
 *  either, and the footer's offer column still cannot drift away from the menu.
 */

import { offer } from "./offer";

export interface NavItem {
  label: string;
  href: string;
}

/** A menu entry that is a heading over other entries rather than a destination of its own.
 *
 *  It has no `href` on purpose. There is no `/oferta/` page and there should not be one - it
 *  would be a second copy of the home page's tiles - so the group's label is a `<summary>`,
 *  not a link. */
export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavEntry = NavItem | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

const home: NavItem = { label: "Strona główna", href: "/" };

/** The four category pages, in menu order.
 *
 *  That order is importance, not the calendar. It used to claim to be "the order of the
 *  growing year", which stopped being true when the owners moved the pansies to March alone
 *  and the balcony flowers to April: the year now opens with `Bratki`, which sits third. The
 *  year is told by the season cards on the home page instead - see `SeasonCards.astro` and
 *  `season.ts`. */
export const offerPages: NavItem[] = offer.map((page) => ({
  label: page.menuLabel,
  href: page.href,
}));

/** Written once because it appears twice: beside the offer in the footer's first column, and
 *  as its own top-level menu entry. It is not inside the "Oferta" group - the slideshow is
 *  plantings, not a category of plants for sale. */
const compositions: NavItem = { label: "Inspiracje", href: "/inspiracje/" };

/** The offer plus the gallery - the pages someone in the footer is most likely looking for. */
export const footerOfferLinks: NavItem[] = [...offerPages, compositions];

export const navigation: NavEntry[] = [
  home,
  { label: "Oferta", items: offerPages },
  compositions,
  { label: "O nas", href: "/o-nas/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Kontakt", href: "/kontakt/" },
];

/** Every destination in the menu, flattened, with the group's four folded back in and the
 *  home page dropped.
 *
 *  For `404.astro`, which lists where the visitor was probably trying to go and needs real
 *  addresses rather than the menu's shape - a `<details>` panel on the page that is supposed
 *  to be the way out of a dead end would be a poor joke. Home is left out because it is
 *  already the button above that list, and one address offered twice on one screen reads as
 *  two destinations.
 *
 *  Flattened here rather than in the page, so that adding a second group cannot silently drop
 *  four pages off the 404. */
export const allPages: NavItem[] = navigation
  .flatMap((entry) => (isNavGroup(entry) ? entry.items : [entry]))
  .filter((item) => item.href !== home.href);
