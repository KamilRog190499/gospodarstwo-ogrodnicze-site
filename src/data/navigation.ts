/** The main menu.
 *
 *  Eight real pages, eight real addresses. Before this, five entries pointed at anchors on one
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
 *  `/o-nas/` likewise keeps its old address rather than becoming `/historia/`; the label
 *  is the one from the old menu.
 *
 *  "Strona główna" is a departure from the handoff, which lists the menu without it
 *  (docs/design/README.md, section 1). There the menu pointed at anchors on a single page, so
 *  an entry leading back to the top of that page would have meant nothing. Now that the offer
 *  lives on four separate addresses, someone arriving from search straight on `/rabatowe/`
 *  has no visible way back to the entrance: the masthead is a link to `/`, but nothing about
 *  it says so.
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

const home: NavItem = { label: "Strona główna", href: "/" };

/** The four category pages, in menu order.
 *
 *  That order is importance, not the calendar. It used to claim to be "the order of the
 *  growing year", which stopped being true when the owners moved the pansies to March alone
 *  and the balcony flowers to April: the year now opens with `Bratki`, which sits third. The
 *  year is told by the state marker on the home page tiles instead - see `season.ts`. */
export const offerPages: NavItem[] = offer.map((page) => ({
  label: page.menuLabel,
  href: page.href,
}));

/** The offer plus the gallery - the pages someone in the footer is most likely looking for. */
export const footerOfferLinks: NavItem[] = [
  ...offerPages,
  { label: "Inspiracje", href: "/inspiracje/" },
];

export const navigation: NavItem[] = [
  home,
  ...footerOfferLinks,
  { label: "Historia gospodarstwa", href: "/o-nas/" },
  { label: "Kontakt", href: "/kontakt/" },
];
