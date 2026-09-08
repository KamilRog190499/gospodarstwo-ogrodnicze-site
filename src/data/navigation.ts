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

export interface NavItem {
  label: string;
  href: string;
}

const home: NavItem = { label: "Strona główna", href: "/" };

/** The four category pages, in menu order - which is the order of the growing year. */
export const offerPages: NavItem[] = [
  { label: "Kwiaty balkonowe", href: "/kwiaty-balkonowe/" },
  { label: "Rabatowe", href: "/rabatowe/" },
  { label: "Bratki", href: "/bratki/" },
  { label: "Chryzantemy", href: "/chryzantemy/" },
];

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
