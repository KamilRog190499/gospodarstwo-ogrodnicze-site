/** The offer, as one table: four pages, four groups of plants, four tiles.
 *
 *  This exists because the same four pages were written down twice - once in `navigation.ts`
 *  as the menu's offer section, once inside `OfferOverview.astro` as the home page tiles -
 *  so `/rabatowe/` was in the repository as a string in two files that nothing kept in step.
 *  The rule in CLAUDE.md is one place per fact; this is that place, and `navigation.ts`
 *  derives `offerPages` from it rather than repeating it.
 *
 *  Three facts live here that used to have nowhere to live: which content groups a page
 *  covers, the tile's title (longer than the menu label - the menu has no room for
 *  "Rabatowe i wieloletnie"), and the fact that pansies and primroses share one shelf.
 *
 *  **The selling window is deliberately not here.** April-June covers two rows at once
 *  (balcony and bedding flowers), so a window is not a property of a page; it lives in
 *  `season.ts` and binds to the offer through the group name - the same name the content
 *  schema validates against.
 */

/** The `group` values in the plants' frontmatter. The content schema builds its `z.enum`
 *  from this array, so the union and the validator cannot drift apart. Order is the order of
 *  the menu and of the tiles. */
export const plantGroups = ["Balkonowe", "Rabatowe", "Bratki", "Chryzantemy"] as const;

export type PlantGroup = (typeof plantGroups)[number];

export interface OfferPage {
  /** Which content groups this page lists. An array because a page may cover more than one. */
  groups: PlantGroup[];
  href: string;
  /** The label in the menu's "Oferta" panel and in the footer's offer column.
   *
   *  It used to be the short one - "Rabatowe", "Bratki" - and the reason was width: the
   *  menu was a single centred row of eight items and there was no room for more. The
   *  panel removed that constraint, so the labels are now the ones a visitor would search
   *  for. `tileTitle` still differs where the tile says something the menu should not
   *  ("Rabatowe i wieloletnie"), which is why both fields are still here. */
  menuLabel: string;
  /** The home page tile heading, which has room for the fuller name. */
  tileTitle: string;
}

/**
 * The four pages, in menu order.
 *
 * **That order is importance, not the calendar** - and it used to claim otherwise. The
 * comment here read "in menu order - which is the order of the growing year", which stopped
 * being true when the owners moved the pansies to March alone and the balcony flowers to
 * April: the year now opens with `Bratki`, which sits third. The year is told by the season
 * cards in `SeasonCards.astro` (see `season.ts`), so the order does not have to tell it, and a menu
 * that leads with one plant instead of eleven would be a worse menu.
 *
 * `tileTitle` says "Bratki i prymulki" while the group is only `Bratki`: the owners sell
 * primroses in the same March window and off the same benches, but no description and no
 * photograph of one exists yet, so a primrose entry would be a placeholder promising a page
 * that cannot deliver. The word ships, the entry waits - and the tile's count still says one
 * plant, because one plant is what the page holds. See docs/inwentaryzacja.md.
 */
export const offer: OfferPage[] = [
  {
    groups: ["Balkonowe"],
    href: "/kwiaty-balkonowe/",
    menuLabel: "Kwiaty balkonowe",
    tileTitle: "Kwiaty balkonowe",
  },
  {
    groups: ["Rabatowe"],
    href: "/rabatowe/",
    menuLabel: "Kwiaty rabatowe",
    tileTitle: "Rabatowe i wieloletnie",
  },
  {
    groups: ["Bratki"],
    href: "/bratki/",
    menuLabel: "Bratki i prymulki",
    tileTitle: "Bratki i prymulki",
  },
  {
    groups: ["Chryzantemy"],
    href: "/chryzantemy/",
    menuLabel: "Chryzantemy",
    tileTitle: "Chryzantemy",
  },
];

/**
 * "1 roślina", "2 rośliny", "5 roślin" - the Polish plural, which is three forms and not two.
 *
 * The previous rule was `n < 5 ? "rośliny" : "roślin"`, correct for every count the site can
 * show today and wrong the moment a group passes twenty: 22 would read "22 roślin". The real
 * rule keys on the last digit, with the teens as the exception that swallows it.
 *
 * It lives here rather than in a module of its own because both callers - the home page tile
 * and the category page's count line - already import this file.
 */
/** "i 7 innych" - the tail of a truncated name list on the home page tiles. Three Polish
 *  forms like plantCount, and a fourth case for one, where the numeral reads worse than the
 *  word: "i jeszcze jedna" rather than "i 1 inna". */
export function otherPlants(n: number): string {
  if (n === 1) return "i jeszcze jedna";
  const lastTwo = n % 100;
  const last = n % 10;
  const few = last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14);
  return `i ${n} ${few ? "inne" : "innych"}`;
}

export function plantCount(n: number): string {
  if (n === 1) return "1 roślina";
  const lastTwo = n % 100;
  const last = n % 10;
  const few = last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14);
  return `${n} ${few ? "rośliny" : "roślin"}`;
}
