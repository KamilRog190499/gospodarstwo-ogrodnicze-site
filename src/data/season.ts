import { plantGroups, type PlantGroup } from "./offer";

/**
 * When each part of the offer is on sale, and what the site says about it today.
 *
 * Resolved while the site is built, not from a prop as in the prototype and not in the
 * browser: the pages are static, so what reaches a visitor is plain HTML.
 *
 * ## The trap worth knowing about
 *
 * **The season does not change by itself.** A build made in October keeps saying that
 * chrysanthemums are on sale until something pushes to `main` again, so the deploy workflow
 * needs a `schedule:` alongside `push:` - and it has to be a **daily** one, not the monthly
 * one CLAUDE.md used to call for. Four of the five transitions below fall on the first of a
 * month and a monthly cron would catch them; the fifth is 2 November, and missing it leaves
 * "CHRYZANTEMY - W TRAKCIE" standing for the whole month after the selling season ended,
 * exactly when people ring up after All Saints. The daily Facebook workflow does not cover
 * this: it commits only when there are new posts, so on a quiet November it never triggers
 * a build at all.
 *
 * ## The rule, in one sentence
 *
 * A window that covers today makes its groups **"now"**; when no window covers today, the
 * next one to open makes its groups **"soon"**, and everything else says nothing. So the
 * page carries at most one seasonal message at a time - never a "wkrótce" for October
 * standing beside a "w trakcie" for May, which is what a next-window-is-always-soon rule
 * would have produced.
 *
 * The resulting year:
 *
 * | Period                       | What the site says          | State  |
 * | ---------------------------- | --------------------------- | ------ |
 * | March                        | pansies and primroses       | `now`  |
 * | April - June                 | balcony and bedding flowers | `now`  |
 * | 1 July - 30 September        | chrysanthemums              | `soon` |
 * | 1 October - 1 November       | chrysanthemums              | `now`  |
 * | 2 November - end of February | pansies and primroses       | `soon` |
 *
 * Winter is no longer silent, and that is a change the owners have to want: CLAUDE.md records
 * that the handoff's "Sprzedaż wznawiamy w marcu" state **is not designed**, so nothing may be
 * invented there. A single word on a tile is not that banner, but it is still a message on the
 * page in December - listed in docs/inwentaryzacja.md for them to confirm.
 */

/** A selling window. Both bounds are inclusive and both are `MM-DD` - no year, because the
 *  window is the same every year.
 *
 *  Sorted by `from`, and every window must begin and end inside one calendar year: a window
 *  running from December into January would need splitting into two rows, because both the
 *  lookup and the "next to open" search compare `MM-DD` strings. Nothing here crosses. */
export interface SaleWindow {
  from: string;
  to: string;
  /** What the season card and the category page print - the months in the owners' own words. */
  months: string;
  groups: PlantGroup[];
}

/**
 * The calendar, and the only place selling dates are written down.
 *
 * The dates are the owners' own, corrected in September 2026: pansies and primroses sell in
 * March alone (not March and April), balcony and bedding flowers from April (not May) to the
 * end of June, chrysanthemums from 1 October to 1 November. Whatever the season cards, the
 * category pages and the home page tiles say about dates, they say it from here - which is
 * how `/bratki/` came to be describing a selling window it no longer had.
 */
export const saleWindows: SaleWindow[] = [
  { from: "03-01", to: "03-31", months: "Marzec", groups: ["Bratki"] },
  {
    from: "04-01",
    to: "06-30",
    months: "Kwiecień – czerwiec",
    groups: ["Balkonowe", "Rabatowe"],
  },
  {
    from: "10-01",
    to: "11-01",
    months: "Październik – 1 listopada",
    groups: ["Chryzantemy"],
  },
];

export type SaleState = "now" | "soon";

export interface SeasonState {
  /** The window covering the build date, or null between windows. */
  open: SaleWindow | null;
  /** The next window to open. Only set while nothing is open - see the rule above. */
  soon: SaleWindow | null;
  /** What each group prints, or null for the groups that say nothing today. */
  groups: Record<PlantGroup, SaleState | null>;
}

/** The build date as `MM-DD` **in Warsaw**, not on the runner.
 *
 *  The runner's clock is UTC, so a build at 23:30 UTC on 31 March is already 1 April here -
 *  and the boundary a customer cares about is the one on their own calendar. `en-CA` is used
 *  only because it formats as `YYYY-MM-DD`; nothing about the site is Canadian. */
export function monthDayInWarsaw(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .slice(5);
}

export function seasonOn(date: Date): SeasonState {
  const today = monthDayInWarsaw(date);

  const open = saleWindows.find((window) => today >= window.from && today <= window.to) ?? null;
  // Between windows: the first one that opens later this year, and after the last one has
  // closed, the first of next year - the table is sorted, so that is simply its first row.
  const soon = open
    ? null
    : (saleWindows.find((window) => window.from > today) ?? saleWindows[0] ?? null);

  const groups = Object.fromEntries(plantGroups.map((group) => [group, null])) as Record<
    PlantGroup,
    SaleState | null
  >;
  for (const group of open?.groups ?? []) groups[group] = "now";
  for (const group of soon?.groups ?? []) groups[group] = "soon";

  return { open, soon, groups };
}

/** Which window a group belongs to. Every group has exactly one; a group with none would
 *  simply never print a selling date, which is why this may return undefined rather than
 *  throwing - it is a lookup, not a validation. */
export function windowFor(group: PlantGroup): SaleWindow | undefined {
  return saleWindows.find((window) => window.groups.includes(group));
}

/** The state baked into this build. */
export const currentSeason: SeasonState = seasonOn(new Date());
