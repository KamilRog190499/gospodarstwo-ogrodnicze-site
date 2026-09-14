/** The offer, as one table: three pages, three groups of plants, three tiles.
 *
 *  This exists because the same pages were written down twice - once in `navigation.ts`
 *  as the menu's offer section, once inside `OfferOverview.astro` as the home page tiles -
 *  so a category address was in the repository as a string in two files that nothing kept in
 *  step. The rule in CLAUDE.md is one place per fact; this is that place, and `navigation.ts`
 *  derives `offerPages` from it rather than repeating it.
 *
 *  Three facts live here that used to have nowhere to live: which content groups a page
 *  covers, the tile's title (which may differ from the menu label, where the menu has no
 *  room for the longer name), and the fact that pansies and primroses share one shelf.
 *
 *  **The selling window is deliberately not here.** A window is not a property of a page; it
 *  lives in `season.ts` and binds to the offer through the group name - the same name the
 *  content schema validates against.
 *
 *  ## Why there are three groups and not four
 *
 *  `Rabatowe` was the fourth, at `/rabatowe/`, and the owners had it folded into `Balkonowe`
 *  in September 2026. The two had been one thing in the data for a while without anyone
 *  saying so: they shared a single selling window in `season.ts` (April to June) and a single
 *  season card on the home page, and the comment in `SeasonCards.astro` recorded that the card
 *  "could not tell the truth anyway", because one window led to two pages. It now leads to one.
 *
 *  What that cost: `/rabatowe/` was a WordPress address with search positions, so it needs a
 *  301 to `/kwiaty-balkonowe/` in the server configuration - docs/przekierowania.md carries
 *  the row. The merged page is named "Kwiaty balkonowe" on the owners' instruction, which is
 *  a name wider than the plants under it: marigolds, hostas, hydrangeas, columbine, red-hot
 *  poker, lupin and heather are not balcony flowers. They were told, they chose it, and the
 *  phrase "rabatowe i wieloletnie" survives in the page's meta description, which is where it
 *  does its work in search. docs/inwentaryzacja.md has the argument and the open question.
 */

/** The `group` values in the plants' frontmatter. The content schema builds its `z.enum`
 *  from this array, so the union and the validator cannot drift apart. Order is the order of
 *  the menu and of the tiles.
 *
 *  **Dropping a value here is how a group is merged away**, and the schema is the safety net:
 *  `content.config.ts` rebuilds its enum from this list, so any `.md` left behind on the old
 *  value fails the build by name rather than shipping a plant onto no page at all. */
export const plantGroups = ["Balkonowe", "Bratki", "Chryzantemy"] as const;

export type PlantGroup = (typeof plantGroups)[number];

export interface OfferPage {
  /** Which content groups this page lists.
   *
   *  Still an array although every page now covers exactly one group. It is what let the home
   *  page tiles keep working unchanged through the September 2026 merge - `OfferOverview`
   *  already flattened this field and already resolved a season state across several groups -
   *  and it is the shape a page covering two groups would need again. */
  groups: PlantGroup[];
  href: string;
  /** The label in the menu's "Oferta" panel and in the footer's offer column.
   *
   *  It used to be the short one - "Rabatowe", "Bratki" - and the reason was width: the
   *  menu was a single centred row of eight items and there was no room for more. The
   *  panel removed that constraint, so the labels are now the ones a visitor would search
   *  for. `tileTitle` is still a separate field for the page that wants a fuller name on the
   *  tile than the menu has room for. */
  menuLabel: string;
  /** The home page tile heading, which has room for the fuller name. */
  tileTitle: string;
}

/**
 * The three pages, in menu order.
 *
 * **That order is importance, not the calendar** - and it used to claim otherwise. The
 * comment here read "in menu order - which is the order of the growing year", which stopped
 * being true when the owners moved the pansies to March alone and the balcony flowers to
 * April: the year now opens with `Bratki`, which sits second. The year is told by the season
 * cards in `SeasonCards.astro` (see `season.ts`), so the order does not have to tell it, and a
 * menu that leads with two plants instead of thirty-four would be a worse menu.
 *
 * `tileTitle` says "Bratki i prymulki" while the group is only `Bratki`: the owners sell
 * primroses in the same March window and off the same benches. Both now have an entry, so the
 * tile and the page agree; the wording of that shared window is still open in
 * docs/inwentaryzacja.md.
 */
export const offer: OfferPage[] = [
  {
    groups: ["Balkonowe"],
    href: "/kwiaty-balkonowe/",
    menuLabel: "Kwiaty balkonowe",
    tileTitle: "Kwiaty balkonowe",
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
